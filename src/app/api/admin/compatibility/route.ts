import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { compatibilityRuleInputSchema } from '@/lib/db/schemas';
import { SEED_COMPATIBILITY_RULES, SEED_CATEGORIES, SEED_ATTRIBUTES } from '@/lib/db/seed-data';
import type { CompatibilityRule, Product } from '@/lib/db/types';
import { evaluateProductCompatibility } from '@/lib/compat/engine';

export async function GET() {
  try {
    let rules: CompatibilityRule[] = [];
    try {
      const db = getAdminDb();
      if (db) {
        const snap = await db.collection('compatibilityRules').get();
        if (!snap.empty) {
          rules = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        }
      }
    } catch {}

    if (rules.length === 0) {
      rules = SEED_COMPATIBILITY_RULES as unknown as CompatibilityRule[];
    }

    return NextResponse.json({ rules });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();

    // Check if this is a "test_pair" sandbox call
    if (body.action === 'test_pair') {
      const { sourceProduct, candidateProduct, rules } = body;
      const res = evaluateProductCompatibility({
        cart: [{ product: sourceProduct, qty: 1 }],
        candidate: candidateProduct,
        categories: SEED_CATEGORIES as any,
        attributes: SEED_ATTRIBUTES as any,
        rules: rules || SEED_COMPATIBILITY_RULES,
      });
      return NextResponse.json({ testResult: res });
    }

    const parsed = compatibilityRuleInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const newId = body.id || `rule-${Date.now()}`;
    const nowSec = Math.floor(Date.now() / 1000);
    const ruleDoc: CompatibilityRule = {
      ...parsed.data,
      id: newId,
      createdAt: { seconds: nowSec, nanoseconds: 0 },
      updatedAt: { seconds: nowSec, nanoseconds: 0 },
    };

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('compatibilityRules').doc(newId).set(ruleDoc);
      }
    } catch {}

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true, rule: ruleDoc });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const body = await request.json();
    const { id, ...rest } = body;

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('compatibilityRules').doc(id).set(rest, { merge: true });
      }
    } catch {}

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyAdminRequest(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
      const db = getAdminDb();
      if (db) {
        await db.collection('compatibilityRules').doc(id).delete();
      }
    } catch {}

    try {
      revalidateTag('catalog');
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
