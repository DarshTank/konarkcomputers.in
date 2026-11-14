import fs from 'node:fs/promises';
import path from 'node:path';
import { getAdminDb } from '../../src/lib/firebase/admin';
import { PC_CATEGORY_ALLOWLIST } from '../../config/pc-categories';

async function main() {
const confirm = process.argv.find((arg) => arg.startsWith('--confirm='))?.split('=')[1];
const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT || '';
const db = getAdminDb();
if (!db && !confirm) {
  console.log('Dry run: Firestore is not configured, so no documents can be enumerated and no writes will occur.');
  process.exit(0);
}
if (!db) throw new Error('Firestore is not configured');

const snapshot = await db.collection('products').where('categoryId', 'in', [...PC_CATEGORY_ALLOWLIST]).get();
console.log(`Would delete ${snapshot.size} products in ${PC_CATEGORY_ALLOWLIST.length} allowlisted categories.`);
if (!confirm) {
  console.log('Dry run. Re-run with --confirm=<Firebase project id> to delete.');
  process.exit(0);
}
if (!projectId || confirm !== projectId) {
  throw new Error('Confirmation must exactly match the configured Firebase project id.');
}

const backupDir = path.resolve('backups');
await fs.mkdir(backupDir, { recursive: true });
const backupPath = path.join(backupDir, `pc-wipe-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
await fs.writeFile(backupPath, JSON.stringify(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })), null, 2));
for (let index = 0; index < snapshot.docs.length; index += 500) {
  const batch = db.batch();
  for (const doc of snapshot.docs.slice(index, index + 500)) batch.delete(doc.ref);
  await batch.commit();
}
await db.collection('adminAudit').add({
  action: 'pcdata-wipe',
  collection: 'products',
  docId: 'pcdata',
  backupPath,
  timestamp: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
});
console.log(`Deleted ${snapshot.size} products. Backup: ${backupPath}`);
}

void main();
