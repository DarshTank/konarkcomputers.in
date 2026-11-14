import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { productInputSchema } from '@/lib/db/schemas';
import type { Product } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json(
        { error: 'Product database is unavailable. Configure Firebase Admin credentials and restart the server.' },
        { status: 503 }
      );
    }
    const params = request.nextUrl.searchParams;
    const page = Math.max(1, Number(params.get('page') || 1));
    const pageSize = Math.min(100, Math.max(1, Number(params.get('pageSize') || 25)));
    const search = (params.get('search') || '').trim().toLowerCase();
    const category = params.get('category') || 'all';
    const stock = params.get('stock') || 'all';
    let query = db.collection('products');
    if (category !== 'all') query = query.where('categoryId', '==', category) as typeof query;
    if (stock !== 'all') query = query.where('stock.status', '==', stock) as typeof query;

    let filtered: Product[];
    let total: number;
    if (search || params.get('format') === 'csv') {
      const snap = await query.get();
      const products: Product[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      filtered = products.filter((product) => {
        const haystack = `${product.name} ${product.sku} ${product.brandName || ''}`.toLowerCase();
        return !search || haystack.includes(search);
      });
      total = filtered.length;
    } else {
      const [countSnap, pageSnap] = await Promise.all([
        query.count().get(),
        query.offset((page - 1) * pageSize).limit(pageSize).get(),
      ]);
      filtered = pageSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      total = countSnap.data().count;
    }

    if (params.get('format') === 'csv') {
      const csvEscape = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
      const csv = [
        'id,sku,name,categoryId,brandId,priceRupees,gstRate,hsnCode,condition,warranty,status',
        ...filtered.map((p) => [
          p.id, p.sku, p.name, p.categoryId, p.brandId, (p.pricing.pricePaise / 100).toFixed(2),
          `${p.pricing.gstRateBps / 100}%`, p.pricing.hsnCode, p.condition, p.warrantyMonths, p.stock.status,
        ].map(csvEscape).join(',')),
      ].join('\r\n');
      return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="konark-products.csv"' } });
    }
    return NextResponse.json({
      products: search || params.get('format') === 'csv'
        ? filtered.slice((page - 1) * pageSize, page * pageSize)
        : filtered,
      pagination: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    // Staff and Admin are permitted to create products

    const body = await request.json();
    if (body.action === 'bulk') {
      const ids = Array.isArray(body.ids) ? body.ids.filter((id: unknown): id is string => typeof id === 'string').slice(0, 500) : [];
      if (!ids.length || !['activate', 'deactivate', 'publish', 'unpublish', 'delete'].includes(body.operation)) {
        return NextResponse.json({ error: 'A valid bulk operation and product IDs are required' }, { status: 400 });
      }
      const db = getAdminDb();
      const nowSec = Math.floor(Date.now() / 1000);
      if (db) {
        const batch = db.batch();
        for (const id of ids) {
          const ref = db.collection('products').doc(id);
          if (body.operation === 'publish') {
            const snapshot = await ref.get();
            const product = snapshot.data() as Product | undefined;
            if (!product || !product.pricing?.priceSet || product.pricing.pricePaise <= 0 ||
              !['in_stock', 'low'].includes(product.stock?.status || '')) {
              return NextResponse.json({
                error: `Product ${id} must have an INR price and in-stock status before publishing`,
              }, { status: 400 });
            }
          }
          if (body.operation === 'delete') batch.delete(ref);
          else batch.set(ref, {
            ...(body.operation === 'activate' ? { isActive: true } :
              body.operation === 'deactivate' ? { isActive: false } :
              body.operation === 'publish' ? { isPublished: true } : { isPublished: false }),
            updatedAt: { seconds: nowSec, nanoseconds: 0 },
          }, { merge: true });
        }
        await batch.commit();
        await db.collection('adminAudit').add({ who: user?.email || 'admin', action: `bulk_${body.operation}`, collection: 'products', docIds: ids, timestamp: { seconds: nowSec, nanoseconds: 0 } });
      }
      try { revalidateTag('catalog'); } catch {}
      return NextResponse.json({ success: true, affected: ids.length });
    }
    if (body.action === 'import') {
      const csv = typeof body.csv === 'string' ? body.csv : '';
      if (!csv || csv.length > 2_000_000) return NextResponse.json({ error: 'CSV is required and must be smaller than 2 MB' }, { status: 400 });
      const lines = csv.split(/\r?\n/).filter(Boolean);
      if (lines.length < 2 || lines.length > 1001) return NextResponse.json({ error: 'CSV must contain 1-1000 data rows' }, { status: 400 });
      const headers = lines[0].split(',').map((header: string) => header.trim());
      const index = (name: string) => headers.indexOf(name);
      if (index('id') < 0 || index('sku') < 0 || index('name') < 0) return NextResponse.json({ error: 'CSV requires id, sku, and name columns' }, { status: 400 });
      const db = getAdminDb();
      let imported = 0;
      if (db) {
        const batch = db.batch();
        for (const line of lines.slice(1)) {
          const values = line.match(/("([^"]|"")*"|[^,]*)/g)?.slice(0, headers.length).map((value: string) => value.replace(/^"|"$/g, '').replace(/""/g, '"')) || [];
          const id = values[index('id')];
          if (!id) continue;
          const ref = db.collection('products').doc(id);
          const update: Record<string, unknown> = { sku: values[index('sku')], name: values[index('name')] };
          if (index('priceRupees') >= 0 && values[index('priceRupees')]) update['pricing'] = { pricePaise: Math.round(Number(values[index('priceRupees')]) * 100) };
          batch.set(ref, { ...update, updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } }, { merge: true });
          imported++;
        }
        await batch.commit();
      }
      try { revalidateTag('catalog'); } catch {}
      return NextResponse.json({ success: true, imported });
    }
    const parsed = productInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const nowSec = Math.floor(Date.now() / 1000);
    const newId = body.id || `prod-${Date.now()}`;

    const newProduct: Product = {
      ...(data as any),
      id: newId,
      createdAt: { seconds: nowSec, nanoseconds: 0 },
      updatedAt: { seconds: nowSec, nanoseconds: 0 },
      createdBy: user?.email || 'admin',
    };

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('products').doc(newId).set(newProduct);

        // Audit Log Entry
        await db.collection('adminAudit').add({
          who: user?.email || 'admin',
          action: 'create',
          collection: 'products',
          docId: newId,
          after: newProduct,
          timestamp: { seconds: nowSec, nanoseconds: 0 },
        });
      }
    } catch (e) {
      console.warn('Firestore write warning:', e);
    }

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);

    const body = await request.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }

    const nowSec = Math.floor(Date.now() / 1000);

    try {
      const db = getAdminDb();
      if (db) {
        const ref = db.collection('products').doc(id);
        const existingDoc = await ref.get();
        const beforeData = existingDoc.exists ? existingDoc.data() : undefined;
        const nextData = { ...(beforeData || {}), ...rest } as Product;
        if (rest.isPublished === true &&
          (!nextData.pricing?.priceSet || nextData.pricing.pricePaise <= 0 ||
            !['in_stock', 'low'].includes(nextData.stock?.status || ''))) {
          return NextResponse.json({
            error: 'Publishing requires an INR price and stock status of in_stock or low',
          }, { status: 400 });
        }

        await ref.set(
          {
            ...rest,
            updatedAt: { seconds: nowSec, nanoseconds: 0 },
          },
          { merge: true }
        );

        // Audit Log Entry (price/stock changes)
        await db.collection('adminAudit').add({
          who: user?.email || 'admin',
          action: 'update',
          collection: 'products',
          docId: id,
          before: beforeData,
          after: rest,
          timestamp: { seconds: nowSec, nanoseconds: 0 },
        });
      }
    } catch (e) {
      console.warn('Firestore write warning:', e);
    }

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    const nowSec = Math.floor(Date.now() / 1000);

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('products').doc(id).delete();

        await db.collection('adminAudit').add({
          who: user?.email || 'admin',
          action: 'delete',
          collection: 'products',
          docId: id,
          timestamp: { seconds: nowSec, nanoseconds: 0 },
        });
      }
    } catch {}

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
