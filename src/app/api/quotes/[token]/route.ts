import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import type { Quote } from '@/lib/db/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    if (!token) {
      return NextResponse.json({ error: 'Token missing' }, { status: 400 });
    }

    let quote: Quote | null = null;

    try {
      const db = getAdminDb();
      if (db) {
        const snapshot = await db
          .collection('quotes')
          .where('publicToken', '==', token)
          .limit(1)
          .get();

        if (!snapshot.empty) {
          quote = snapshot.docs[0].data() as Quote;
        }
      }
    } catch (e) {
      console.warn('Error reading quote from Firestore:', e);
    }

    if (!quote) {
      return NextResponse.json({ error: 'Quotation not found or link expired.' }, { status: 404 });
    }

    return NextResponse.json({ quote });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
