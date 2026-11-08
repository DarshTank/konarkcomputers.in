import { NextRequest, NextResponse } from 'next/server';
import { getQuoteByToken } from '@/lib/db/quotes';
import { getCompanySettings } from '@/lib/db/settings';
import { generateQuotePdf } from '@/lib/pdf/quote-pdf';
import type { Quote } from '@/lib/db/types';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    if (!token) {
      return new NextResponse('Token missing', { status: 400 });
    }

    const quote = await getQuoteByToken(token);

    if (!quote) {
      return new NextResponse('Quotation not found', { status: 404 });
    }

    // Merge live company settings so admin edits to Terms & Conditions or Header immediately reflect
    const companySettings = await getCompanySettings();
    const effectiveQuote: Quote = {
      ...quote,
      companySnapshot: {
        ...companySettings,
        ...(quote.companySnapshot || {}),
        termsAndConditions: companySettings.termsAndConditions || quote.companySnapshot?.termsAndConditions,
        footerNote: companySettings.footerNote || quote.companySnapshot?.footerNote,
      },
    };

    const pdfBytes = await generateQuotePdf(effectiveQuote);

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
