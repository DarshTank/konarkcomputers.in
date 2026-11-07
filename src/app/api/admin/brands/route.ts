import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { brandInputSchema } from '@/lib/db/schemas';
import { SEED_BRANDS } from '@/lib/db/seed-data';
import type { Brand } from '@/lib/db/types';

export async function GET() {
  try {
    let brands: Brand[] = [];
    try {
      const db = getAdminDb();
      if (db) {
        const snap = await db.collection('brands').get();
        if (!snap.empty) {
          brands = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        }
      }
    } catch {}

    if (brands.length === 0) {
      brands = SEED_BRANDS as unknown as Brand[];
    }

    return NextResponse.json({ brands });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();
    const parsed = brandInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const newId = body.id || parsed.data.slug;
    const nowSec = Math.floor(Date.now() / 1000);
    const brandDoc: Brand = {
      ...parsed.data,
      id: newId,
      createdAt: { seconds: nowSec, nanoseconds: 0 },
      updatedAt: { seconds: nowSec, nanoseconds: 0 },
    };

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('brands').doc(newId).set(brandDoc);
      }
    } catch {}

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true, brand: brandDoc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
