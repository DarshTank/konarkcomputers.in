import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/firebase/auth';
import { getAdminDb } from '@/lib/firebase/admin';
import {
  SEED_CATEGORIES,
  SEED_BRANDS,
  SEED_ATTRIBUTES,
  SEED_COMPATIBILITY_RULES,
  SEED_PRODUCTS,
  SEED_SERVICES,
  SEED_TAX_SETTINGS,
  SEED_COMPANY_SETTINGS,
} from '@/lib/db/seed-data';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const admin = await verifyAdminRequest(request);
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
  }

  let db = null;
  try {
    db = getAdminDb();
  } catch {
    db = null;
  }

  if (!db) {
    return NextResponse.json({
      success: false,
      mode: 'client_required',
      message: 'Firebase Admin private key not found on server. Proceeding with client-side seeding.',
    });
  }

  try {
    console.log('Starting server-side Firestore seeding...');
    const allOperations: Array<{ ref: any; data: any }> = [];

    // Settings
    allOperations.push({ ref: db.collection('settings').doc('tax'), data: SEED_TAX_SETTINGS });
    allOperations.push({ ref: db.collection('settings').doc('company'), data: SEED_COMPANY_SETTINGS });
    allOperations.push({
      ref: db.collection('counters').doc('quotes'),
      data: { currentYear: new Date().getFullYear(), lastNumber: 0 },
    });

    // Categories
    for (const cat of SEED_CATEGORIES) {
      allOperations.push({ ref: db.collection('categories').doc(cat.id), data: cat });
    }

    // Brands
    for (const b of SEED_BRANDS) {
      allOperations.push({ ref: db.collection('brands').doc(b.id), data: b });
    }

    // Attributes
    for (const a of SEED_ATTRIBUTES) {
      allOperations.push({ ref: db.collection('attributeDefinitions').doc(a.id), data: a });
    }

    // Rules
    for (const r of SEED_COMPATIBILITY_RULES) {
      allOperations.push({ ref: db.collection('compatibilityRules').doc(r.id), data: r });
    }

    // Services
    for (const s of SEED_SERVICES) {
      allOperations.push({ ref: db.collection('services').doc(s.id), data: s });
    }

    // Products
    for (const p of SEED_PRODUCTS) {
      allOperations.push({ ref: db.collection('products').doc(p.id), data: p });
    }

    // Commit in chunks of 200 (Firestore limit is 500)
    const CHUNK_SIZE = 200;
    for (let i = 0; i < allOperations.length; i += CHUNK_SIZE) {
      const chunk = allOperations.slice(i, i + CHUNK_SIZE);
      const batch = db.batch();
      for (const op of chunk) {
        batch.set(op.ref, op.data, { merge: true });
      }
      await batch.commit();
      console.log(`Committed chunk ${i / CHUNK_SIZE + 1} (${chunk.length} docs)`);
    }

    return NextResponse.json({
      success: true,
      mode: 'server',
      message: `Successfully seeded ${allOperations.length} items to Firestore!`,
      counts: {
        categories: SEED_CATEGORIES.length,
        brands: SEED_BRANDS.length,
        attributes: SEED_ATTRIBUTES.length,
        products: SEED_PRODUCTS.length,
        rules: SEED_COMPATIBILITY_RULES.length,
        services: SEED_SERVICES.length,
      },
    });
  } catch (err: any) {
    console.error('Server seed error:', err);
    return NextResponse.json({
      success: false,
      mode: 'client_required',
      error: err.message || 'Server-side seeding failed',
    });
  }
}

