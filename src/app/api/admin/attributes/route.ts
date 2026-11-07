import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { attributeDefinitionInputSchema } from '@/lib/db/schemas';
import { SEED_ATTRIBUTES } from '@/lib/db/seed-data';
import type { AttributeDefinition } from '@/lib/db/types';

export async function GET() {
  try {
    let attributes: AttributeDefinition[] = [];
    try {
      const db = getAdminDb();
      if (db) {
        const snap = await db.collection('attributeDefinitions').orderBy('displayOrder', 'asc').get();
        if (!snap.empty) {
          attributes = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        }
      }
    } catch {}

    if (attributes.length === 0) {
      attributes = SEED_ATTRIBUTES as unknown as AttributeDefinition[];
    }

    return NextResponse.json({ attributes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();
    const parsed = attributeDefinitionInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const newId = body.id || `${parsed.data.categoryId}-${parsed.data.key}`;
    const nowSec = Math.floor(Date.now() / 1000);
    const attrDoc: AttributeDefinition = {
      ...parsed.data,
      id: newId,
      createdAt: { seconds: nowSec, nanoseconds: 0 },
      updatedAt: { seconds: nowSec, nanoseconds: 0 },
    };

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('attributeDefinitions').doc(newId).set(attrDoc);
      }
    } catch {}

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true, attribute: attrDoc });
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
        await db.collection('attributeDefinitions').doc(id).set(rest, { merge: true });
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
