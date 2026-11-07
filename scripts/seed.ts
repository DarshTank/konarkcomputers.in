/**
 * Seed script for Konark Computers Quotation System.
 * Run with: npx tsx scripts/seed.ts
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import {
  SEED_CATEGORIES,
  SEED_BRANDS,
  SEED_ATTRIBUTES,
  SEED_COMPATIBILITY_RULES,
  SEED_PRODUCTS,
  SEED_SERVICES,
  SEED_TAX_SETTINGS,
  SEED_COMPANY_SETTINGS,
} from '../src/lib/db/seed-data';

function initDb() {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      console.warn('⚠️ Firebase credentials not configured in env! Running seed dry-run.');
      return null;
    }

    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }
  return getFirestore(getApps()[0], process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || 'default');
}

export async function runSeed() {
  const db = initDb();
  if (!db) {
    console.log('Seed summary (dry-run mode):');
    console.log(`- Categories: ${SEED_CATEGORIES.length}`);
    console.log(`- Brands: ${SEED_BRANDS.length}`);
    console.log(`- Attribute Definitions: ${SEED_ATTRIBUTES.length}`);
    console.log(`- Products: ${SEED_PRODUCTS.length}`);
    console.log(`- Rules: ${SEED_COMPATIBILITY_RULES.length}`);
    console.log(`- Services: ${SEED_SERVICES.length}`);
    return;
  }

  console.log('Seeding Firestore collections in chunked batches...');
  const allOps: Array<{ ref: any; data: any }> = [];

  allOps.push({ ref: db.collection('settings').doc('tax'), data: SEED_TAX_SETTINGS });
  allOps.push({ ref: db.collection('settings').doc('company'), data: SEED_COMPANY_SETTINGS });
  allOps.push({
    ref: db.collection('counters').doc('quotes'),
    data: { currentYear: new Date().getFullYear(), lastNumber: 0 },
  });

  for (const cat of SEED_CATEGORIES) {
    allOps.push({ ref: db.collection('categories').doc(cat.id), data: cat });
  }
  for (const b of SEED_BRANDS) {
    allOps.push({ ref: db.collection('brands').doc(b.id), data: b });
  }
  for (const a of SEED_ATTRIBUTES) {
    allOps.push({ ref: db.collection('attributeDefinitions').doc(a.id), data: a });
  }
  for (const r of SEED_COMPATIBILITY_RULES) {
    allOps.push({ ref: db.collection('compatibilityRules').doc(r.id), data: r });
  }
  for (const s of SEED_SERVICES) {
    allOps.push({ ref: db.collection('services').doc(s.id), data: s });
  }
  for (const p of SEED_PRODUCTS) {
    allOps.push({ ref: db.collection('products').doc(p.id), data: p });
  }

  const CHUNK_SIZE = 200;
  for (let i = 0; i < allOps.length; i += CHUNK_SIZE) {
    const chunk = allOps.slice(i, i + CHUNK_SIZE);
    const batch = db.batch();
    for (const op of chunk) {
      batch.set(op.ref, op.data, { merge: true });
    }
    await batch.commit();
    console.log(`Committed chunk ${Math.floor(i / CHUNK_SIZE) + 1} (${chunk.length} docs)`);
  }

  console.log(`✅ Firestore database seeded successfully with all ${allOps.length} items!`);
}

runSeed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
