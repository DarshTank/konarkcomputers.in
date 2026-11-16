import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import type { ServiceItem } from '@/lib/db/types';

export async function GET() {
  try {
    let services: ServiceItem[] = [];
    try {
      const db = getAdminDb();
      if (db) {
        const snap = await db.collection('services').get();
        services = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      }
    } catch (error) {
      console.warn('Could not read services from Firestore:', error);
    }

    return NextResponse.json({ services });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();

    const newId = body.id || `srv-${Date.now()}`;
    const nowSec = Math.floor(Date.now() / 1000);

    const srvDoc: ServiceItem = {
      id: newId,
      name: body.name,
      sacCode: body.sacCode || '998713',
      pricePaise: Number(body.pricePaise) || 0,
      priceIncludesGst: body.priceIncludesGst ?? true,
      gstRateBps: Number(body.gstRateBps) || 1800,
      isActive: body.isActive ?? true,
      createdAt: { seconds: nowSec, nanoseconds: 0 },
      updatedAt: { seconds: nowSec, nanoseconds: 0 },
    };

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('services').doc(newId).set(srvDoc);
      }
    } catch {}

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true, service: srvDoc });
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
        await db.collection('services').doc(id).set(rest, { merge: true });
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
