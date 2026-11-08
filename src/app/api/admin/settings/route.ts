import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import {
  getCompanySettings,
  setCompanySettings,
  getTaxSettings,
  setTaxSettings,
} from '@/lib/db/settings';

export async function GET() {
  try {
    const [tax, company] = await Promise.all([
      getTaxSettings(),
      getCompanySettings(),
    ]);

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

    let updatedTax;
    let updatedCompany;

    if (tax) {
      updatedTax = await setTaxSettings(tax, user?.email || 'admin');
    }

    if (company) {
      updatedCompany = await setCompanySettings(company, user?.email || 'admin');
    }

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({
      success: true,
      tax: updatedTax,
      company: updatedCompany,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
