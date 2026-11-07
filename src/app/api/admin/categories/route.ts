import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { categoryInputSchema } from '@/lib/db/schemas';
import { SEED_CATEGORIES } from '@/lib/db/seed-data';
import type { Category } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    let categories: Category[] = [];
    try {
      const db = getAdminDb();
      if (db) {
        const snap = await db.collection('categories').orderBy('sortOrder', 'asc').get();
        if (!snap.empty) {
          categories = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        }
      }
    } catch {}

    if (categories.length === 0) {
      categories = SEED_CATEGORIES as unknown as Category[];
    }

    return NextResponse.json({ categories });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();
    const parsed = categoryInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const newId = body.id || parsed.data.slug;
    const nowSec = Math.floor(Date.now() / 1000);
    const categoryDoc: Category = {
      ...parsed.data,
      id: newId,
      createdAt: { seconds: nowSec, nanoseconds: 0 },
      updatedAt: { seconds: nowSec, nanoseconds: 0 },
    };

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('categories').doc(newId).set(categoryDoc);
        await db.collection('adminAudit').add({
          who: user?.email || 'admin',
          action: 'create',
          collection: 'categories',
          docId: newId,
          after: categoryDoc,
          timestamp: { seconds: nowSec, nanoseconds: 0 },
        });
      }
    } catch {}

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true, category: categoryDoc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();
    const { id, ...rest } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('categories').doc(id).set(rest, { merge: true });
        await db.collection('adminAudit').add({
          who: user?.email || 'admin',
          action: 'update',
          collection: 'categories',
          docId: id,
          after: rest,
          timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
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
