import { NextResponse } from 'next/server';
import { isQuoteEnabled } from '@/lib/db/settings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const enabled = await isQuoteEnabled();
    return NextResponse.json(
      { enabled },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          Pragma: 'no-cache',
          Expires: '0',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ enabled: true, error: error.message }, { status: 200 });
  }
}

