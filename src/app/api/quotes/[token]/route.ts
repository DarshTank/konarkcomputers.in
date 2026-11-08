import { NextRequest, NextResponse } from 'next/server';
import { getQuoteByToken } from '@/lib/db/quotes';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    if (!token) {
      return NextResponse.json({ error: 'Token missing' }, { status: 400 });
    }

    const quote = await getQuoteByToken(token);

    if (!quote) {
      return NextResponse.json({ error: 'Quotation not found or link expired.' }, { status: 404 });
    }

    return NextResponse.json({ quote });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
