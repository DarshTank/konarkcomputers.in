import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import type { Quote, QuoteStatus } from '@/lib/db/types';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let quotes: Quote[] = [];

    try {
      const db = getAdminDb();
      if (db) {
        let query: any = db.collection('quotes');
        if (status && status !== 'all') {
          query = query.where('status', '==', status);
        }
        const snap = await query.orderBy('createdAt.seconds', 'desc').limit(50).get();
        quotes = snap.docs.map((d: any) => d.data() as Quote);
      }
    } catch (e) {
      console.warn('Error reading quotes list:', e);
    }

    return NextResponse.json({ quotes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();
    const { id, status, internalNotes } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const nowSec = Math.floor(Date.now() / 1000);

    try {
      const db = getAdminDb();
      if (db) {
        const quoteRef = db.collection('quotes').doc(id);
        const existing = await quoteRef.get();

        if (existing.exists) {
          const data = existing.data() as Quote;
          const history = data.statusHistory || [];

          if (status && status !== data.status) {
            history.push({
              status: status as QuoteStatus,
              timestamp: { seconds: nowSec, nanoseconds: 0 },
              changedBy: user?.email || 'admin',
              note: internalNotes || undefined,
            });
          }

          await quoteRef.set(
            {
              ...(status ? { status } : {}),
              ...(internalNotes !== undefined ? { internalNotes } : {}),
              statusHistory: history,
            },
            { merge: true }
          );

          await db.collection('adminAudit').add({
            who: user?.email || 'admin',
            action: 'update_quote_status',
            collection: 'quotes',
            docId: id,
            after: { status, internalNotes },
            timestamp: { seconds: nowSec, nanoseconds: 0 },
          });
        }
      }
    } catch (e) {
      console.warn('Firestore quote update error:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
