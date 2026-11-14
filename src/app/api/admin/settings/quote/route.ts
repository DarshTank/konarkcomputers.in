import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { getQuoteSettings, setQuoteSettings } from '@/lib/db/settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getQuoteSettings();
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const body = await request.json();
    const { enabled } = body;

    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'Invalid payload: "enabled" (boolean) is required' }, { status: 400 });
    }

    const nowSec = Math.floor(Date.now() / 1000);
    const quoteSettings = {
      enabled,
      updatedAt: { seconds: nowSec, nanoseconds: 0 },
      updatedBy: user.email || 'admin',
    };

    // Save using persistent storage (memory + local file + Firestore)
    await setQuoteSettings(quoteSettings);

    // Audit log in Firestore if available
    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('adminAudit').add({
          who: user.email || 'admin',
          action: enabled ? 'enable_quote_system' : 'disable_quote_system',
          collection: 'settings',
          docId: 'quote',
          after: quoteSettings,
          timestamp: { seconds: nowSec, nanoseconds: 0 },
        });
      }
    } catch (e) {
      console.warn('Firestore settings/quote audit write warning:', e);
    }

    // Revalidate paths & tags across the application
    try {
      revalidateTag('catalog');
      revalidatePath('/', 'layout');
      revalidatePath('/quote');
      revalidatePath('/sitemap');
      revalidatePath('/sitemap.xml');
      revalidatePath('/admin');
      revalidatePath('/admin/settings');
      revalidatePath('/products');
      revalidatePath('/services');
      revalidatePath('/');
    } catch {}

    return NextResponse.json({ success: true, ...quoteSettings });
  } catch (error: any) {
    console.error('Error updating quote settings:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

