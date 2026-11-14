import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { getAdminDb } from '../../src/lib/firebase/admin';
import { normalizePcPart, type PcPartCategory } from '../../src/lib/pcdata/normalizers';
import type { Firestore, WriteBatch } from 'firebase-admin/firestore';

const DATA_ROOT = path.resolve(process.env.GUJARAT_DATA_DIR || 'Data/gujarat-dataset/data');
const BATCH_SIZE = Math.min(400, Math.max(25, Number(process.env.GUJARAT_BATCH_SIZE || 100)));
const FILES: Record<string, string> = {
  'case.json': 'cabinet',
  'case-fan.json': 'cabinet-fan',
  'cpu.json': 'processor',
  'cpu-cooler.json': 'cpu-cooler',
  'external-hard-drive.json': 'external-drive',
  'fan-controller.json': 'fan-controller',
  'internal-hard-drive.json': 'internal-hard-drive',
  'keyboard.json': 'keyboard',
  'memory.json': 'ram-desktop',
  'monitor.json': 'monitor',
  'motherboard.json': 'motherboard',
  'mouse.json': 'usb-mouse',
  'optical-drive.json': 'optical-drive',
  'power-supply.json': 'power-supply',
  'speakers.json': 'speakers',
  'thermal-paste.json': 'thermal-paste',
  'video-card.json': 'graphics-card',
  'webcam.json': 'webcam',
};

const now = { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 };

function stableId(categoryId: string, row: Record<string, unknown>, index: number): string {
  const identity = JSON.stringify([categoryId, row.name, row.brand, row.price, row]);
  return `${categoryId}-${crypto.createHash('sha1').update(identity).digest('hex').slice(0, 20)}-${index}`;
}

function normalizedSpecs(row: Record<string, unknown>, categoryId: string): Record<string, unknown> {
  try {
    if (['processor', 'motherboard', 'ram-desktop', 'graphics-card', 'power-supply', 'cabinet', 'cpu-cooler', 'cabinet-fan', 'internal-hard-drive'].includes(categoryId)) {
      return normalizePcPart(categoryId as PcPartCategory, row).specs;
    }
  } catch {
    // Generic dataset rows still remain seedable with their raw fields.
  }
  return { ...row };
}

function toProduct(categoryId: string, row: Record<string, unknown>, index: number) {
  const id = stableId(categoryId, row, index);
  const name = String(row.name || `${categoryId} ${index + 1}`).trim();
  const brand = typeof row.brand === 'string' ? row.brand.trim().toLowerCase() : 'unknown';
  return {
    id,
    sku: id.slice(0, 50).toUpperCase(),
    name,
    slug: id,
    categoryId,
    brandId: brand || 'unknown',
    brandName: typeof row.brand === 'string' ? row.brand : undefined,
    description: '',
    specs: normalizedSpecs(row, categoryId),
    compat: {},
    condition: 'new',
    warrantyMonths: 0,
    pricing: { pricePaise: 0, priceIncludesGst: true, gstRateBps: 1800, hsnCode: '8473', priceSet: false },
    stock: { status: 'out_of_stock' },
    images: [],
    isActive: true,
    isPublished: false,
    buildEligible: false,
    searchKeywords: name.toLowerCase().split(/\s+/).filter(Boolean),
    externalKey: `gujarat:${id}`,
    source: {
      provider: 'pcpartpicker' as const,
      rawName: name,
      scrapedAt: now,
      lastSeenAt: now,
      derivedFields: Object.keys(row).filter((key) => key !== 'name'),
    },
    createdAt: now,
    updatedAt: now,
    createdBy: 'gujarat-dataset',
  };
}

async function commitWithRetry(db: Firestore, operations: (batch: WriteBatch) => void) {
  let attempt = 0;
  while (true) {
    try {
      const batch = db.batch();
      operations(batch);
      await batch.commit();
      return;
    } catch (error) {
      const code = (error as { code?: number }).code;
      if (![4, 8, 14].includes(code || 0) || attempt >= 5) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 2000));
      attempt++;
    }
  }
}

async function main() {
  const confirm = process.argv.find((arg) => arg.startsWith('--confirm='))?.split('=')[1];
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT || '';
  if (!projectId || confirm !== projectId) {
    throw new Error(`Destructive confirmation required: --confirm=${projectId || '<FIREBASE_PROJECT_ID>'}`);
  }
  const db = getAdminDb();
  if (!db) throw new Error('Firestore Admin credentials are unavailable');

  const existing = await db.collection('products').get();
  const backupPath = path.resolve('backups', `gujarat-products-before-reseed-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  await fs.mkdir(path.dirname(backupPath), { recursive: true });
  await fs.writeFile(backupPath, JSON.stringify(existing.docs.map((doc) => ({ id: doc.id, ...doc.data() })), null, 2));
  console.log(`STEP 1 backup: ${existing.size} products -> ${backupPath}`);

  for (let offset = 0; offset < existing.docs.length; offset += BATCH_SIZE) {
    const chunk = existing.docs.slice(offset, offset + BATCH_SIZE);
    await commitWithRetry(db, (batch) => chunk.forEach((doc) => batch.delete(doc.ref)));
    console.log(`STEP 2 delete: ${Math.min(offset + chunk.length, existing.docs.length)}/${existing.docs.length}`);
  }

  let total = 0;
  for (const [file, categoryId] of Object.entries(FILES)) {
    const rows = JSON.parse(await fs.readFile(path.join(DATA_ROOT, file), 'utf8')) as Record<string, unknown>[];
    for (let offset = 0; offset < rows.length; offset += BATCH_SIZE) {
      const chunk = rows.slice(offset, offset + BATCH_SIZE);
      await commitWithRetry(db, (batch) => {
        chunk.forEach((row, index) => {
          batch.set(db.collection('products').doc(stableId(categoryId, row, offset + index)), toProduct(categoryId, row, offset + index));
        });
      });
      total += chunk.length;
      console.log(`STEP 3 seed: ${file} ${Math.min(offset + chunk.length, rows.length)}/${rows.length} (total ${total})`);
    }
  }

  await db.collection('adminAudit').add({
    action: 'gujarat-products-reseed',
    collection: 'products',
    deletedCount: existing.size,
    seededCount: total,
    backupPath,
    timestamp: now,
  });
  console.log(`STEP 4 complete: deleted ${existing.size}; seeded ${total}.`);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
