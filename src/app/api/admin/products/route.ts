import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { productInputSchema } from '@/lib/db/schemas';
import { SEED_PRODUCTS } from '@/lib/db/seed-data';
import type { Product } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    // In local dev without credentials, allow read
    let products: Product[] = [];

    try {
      const db = getAdminDb();
      if (db) {
        const snap = await db.collection('products').get();
        if (!snap.empty) {
          products = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        }
      }
    } catch {}

    if (products.length === 0) {
      products = SEED_PRODUCTS as unknown as Product[];
    }

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    // Staff and Admin are permitted to create products

    const body = await request.json();
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
