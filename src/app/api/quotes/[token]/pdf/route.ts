import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import type { Quote } from '@/lib/db/types';
import { generateQuotePdf } from '@/lib/pdf/quote-pdf';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    if (!token) {
      return new NextResponse('Token missing', { status: 400 });
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
      console.warn('Error reading quote for PDF:', e);
    }

    if (!quote) {
      return new NextResponse('Quotation not found', { status: 404 });
    }

    const pdfBytes = await generateQuotePdf(quote);

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${quote.quoteNumber}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error('PDF generation error:', error);
    return new NextResponse('Error generating PDF', { status: 500 });
  }
}
