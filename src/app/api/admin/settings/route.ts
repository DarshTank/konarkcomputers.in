import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { SEED_TAX_SETTINGS, SEED_COMPANY_SETTINGS } from '@/lib/db/seed-data';
import type { TaxSettings, CompanySettings } from '@/lib/db/types';

export async function GET() {
  try {
    let tax: TaxSettings = SEED_TAX_SETTINGS;
    let company: CompanySettings = SEED_COMPANY_SETTINGS;

    try {
      const db = getAdminDb();
      if (db) {
        const taxSnap = await db.collection('settings').doc('tax').get();
        if (taxSnap.exists) tax = taxSnap.data() as TaxSettings;

        const compSnap = await db.collection('settings').doc('company').get();
        if (compSnap.exists) company = compSnap.data() as CompanySettings;
      }
    } catch {}

    return NextResponse.json({ tax, company });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();
    const { tax, company } = body;

    const nowSec = Math.floor(Date.now() / 1000);

    try {
      const db = getAdminDb();
      if (db) {
        if (tax) {
          await db.collection('settings').doc('tax').set(tax, { merge: true });
          await db.collection('adminAudit').add({
            who: user?.email || 'admin',
            action: 'update_tax_settings',
            collection: 'settings',
            docId: 'tax',
            after: tax,
            timestamp: { seconds: nowSec, nanoseconds: 0 },
          });
        }

        if (company) {
          await db.collection('settings').doc('company').set(company, { merge: true });
          await db.collection('adminAudit').add({
            who: user?.email || 'admin',
            action: 'update_company_settings',
            collection: 'settings',
            docId: 'company',
            after: company,
            timestamp: { seconds: nowSec, nanoseconds: 0 },
          });
        }
      }
    } catch (e) {
      console.warn('Firestore settings write warning:', e);
    }

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
