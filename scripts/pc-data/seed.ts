import fs from 'node:fs/promises';
import path from 'node:path';
import { getAdminDb } from '../../src/lib/firebase/admin';
import { normalizePcPart, type PcPartCategory } from '../../src/lib/pcdata/normalizers';

async function main() {
const root = path.resolve(process.env.PCDATA_DIR || 'pc-part-dataset/data-staging');
const db = getAdminDb();
const dryRun = process.env.PCDATA_DRY_RUN === '1' || process.argv.includes('--dry-run');
if (!db && !dryRun) throw new Error('Firestore is not configured (use --dry-run to validate locally)');

const files: Record<string, string> = {
  'cpu.json': 'processor',
  'motherboard.json': 'motherboard',
  'memory.json': 'ram-desktop',
  'video-card.json': 'graphics-card',
  'power-supply.json': 'power-supply',
  'case.json': 'cabinet',
  'cpu-cooler.json': 'cpu-cooler',
  'case-fan.json': 'cabinet-fan',
  'internal-hard-drive.json': 'internal-hard-drive',
  'monitor.json': 'monitor',
};
const now = { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 };
let written = 0;
const batchSize = Math.min(400, Math.max(25, Number(process.env.PCDATA_BATCH_SIZE || 100)));
for (const [file, categoryId] of Object.entries(files)) {
  let content: string;
  try {
    content = await fs.readFile(path.join(root, file), 'utf8');
  } catch {
    try { content = await fs.readFile(path.join(root, 'json', file), 'utf8'); }
    catch { continue; }
  }
  const rows = JSON.parse(content);
  if (!Array.isArray(rows)) throw new Error(`${file} must contain an array`);
  const normalizedRows: Array<{ id: string; row: Record<string, unknown>; normalized: ReturnType<typeof normalizePcPart> }> = [];
  for (const row of rows) {
    if (!row || typeof row.name !== 'string' || !row.name.trim()) continue;
    let normalized;
    try {
      normalized = normalizePcPart(categoryId as PcPartCategory, row);
    } catch {
      continue;
    }
    const externalKey = normalized.externalKey;
    const resolvedCategoryId = normalized.categoryId;
    const id = `${resolvedCategoryId}-${externalKey.replace('pcpp:', '')}`;
    normalizedRows.push({ id, row, normalized });
  }

  if (dryRun) {
    written += normalizedRows.length;
    continue;
  }

  if (!db) throw new Error('Firestore is not configured');
  for (let offset = 0; offset < normalizedRows.length; offset += batchSize) {
    const chunk = normalizedRows.slice(offset, offset + batchSize);
    const refs = chunk.map(({ id }) => db.collection('products').doc(id));
    const existingDocs = await db.getAll(...refs);
    const batch = db.batch();
    chunk.forEach(({ id, row, normalized }, index) => {
    const ref = refs[index];
    const old = existingDocs[index].exists ? existingDocs[index].data() || {} : {};
    const imported = {
      id, sku: id.slice(0, 50).toUpperCase(), name: normalized.name, slug: id,
      categoryId: normalized.categoryId, brandId: normalized.brand || 'unknown',
      description: old.description || '', specs: normalized.specs, compat: old.compat || {},
      condition: old.condition || 'new', warrantyMonths: old.warrantyMonths || 0,
      pricing: old.pricing || { pricePaise: 0, priceIncludesGst: true, gstRateBps: 1800, hsnCode: '8473' },
      stock: old.stock || { status: 'out_of_stock' }, images: old.images || [],
      isActive: old.isActive !== false, isPublished: old.isPublished === true,
      buildEligible: old.buildEligibleOverride ?? false, searchKeywords: normalized.name.toLowerCase().split(/\s+/),
      externalKey: normalized.externalKey, source: { provider: 'pcpartpicker', rawName: normalized.name, scrapedAt: now, lastSeenAt: now, derivedFields: normalized.derivedFields },
      createdAt: old.createdAt || now, updatedAt: now, createdBy: old.createdBy || 'pcdata',
    };
    batch.set(ref, imported, { merge: true });
    });
    let attempts = 0;
    while (true) {
      try {
        await batch.commit();
        break;
      } catch (error) {
        const code = (error as { code?: number }).code;
        if (![4, 8, 14].includes(code || 0) || attempts >= 5) throw error;
        await new Promise((resolve) => setTimeout(resolve, 2 ** attempts * 2000));
        attempts++;
      }
    }
    written += chunk.length;
    if (process.env.PCDATA_THROTTLE_MS) {
      await new Promise((resolve) => setTimeout(resolve, Number(process.env.PCDATA_THROTTLE_MS)));
    }
  }
}
console.log(`${dryRun ? 'Seed dry-run' : 'Seed complete'}: ${written} rows processed. Admin-owned pricing, publish, stock, and images were preserved.`);
}

void main();
