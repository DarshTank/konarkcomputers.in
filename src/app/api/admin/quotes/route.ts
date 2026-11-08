import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import type { Quote } from '@/lib/db/types';
import { listQuotes, updateQuote } from '@/lib/db/quotes';

export async function GET(request: NextRequest) {
  try {
    await verifyAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let quotes: Quote[] = await listQuotes(100);

    if (status && status !== 'all') {
      quotes = quotes.filter((q) => q.status === status);
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

    const updated = await updateQuote(
      id,
      { status, internalNotes },
      user?.email || 'admin'
    );

    if (!updated) {
      return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, quote: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
