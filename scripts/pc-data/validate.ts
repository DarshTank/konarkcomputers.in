import fs from 'node:fs/promises';
import path from 'node:path';
import { PC_DATA_CONTRACT } from './contract';

const root = path.resolve(process.env.PCDATA_DIR || 'pc-part-dataset/data-staging');
const inputDir = path.join(root, 'json');

async function findInput(file: string): Promise<string | undefined> {
  for (const directory of [root, inputDir]) {
    try {
      await fs.access(path.join(directory, file));
      return path.join(directory, file);
    } catch {
      // Try the alternate supported layout.
    }
  }
  return undefined;
}

async function main() {
let failures = 0;
let warnings = 0;
for (const entry of PC_DATA_CONTRACT) {
  const filePath = await findInput(entry.file);
  if (!filePath) {
    const message = `${entry.critical ? 'ERROR' : 'WARN'} ${entry.file}: file is missing`;
    console.log(message);
    if (entry.critical) failures++;
    else warnings++;
    continue;
  }

  let rows: unknown;
  try {
    rows = JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch (error) {
    console.log(`ERROR ${entry.file}: invalid JSON (${error instanceof Error ? error.message : 'unknown error'})`);
    failures++;
    continue;
  }
  if (!Array.isArray(rows)) {
    console.log(`ERROR ${entry.file}: expected an array`);
    failures++;
    continue;
  }

  const missing = new Set<string>();
  let dropped = 0;
  for (const row of rows) {
    if (!row || typeof row !== 'object') {
      dropped++;
      continue;
    }
    for (const key of entry.requiredKeys) {
      if (!(key in row)) missing.add(key);
    }
  }
  if (missing.size > 0) {
    console.log(`${entry.critical ? 'ERROR' : 'WARN'} ${entry.file}: missing keys ${[...missing].join(', ')}`);
    if (entry.critical) failures++;
    else warnings++;
  }
  console.log(`${entry.file}: ${rows.length} rows, ${dropped} malformed rows`);
}

console.log(`Validation complete: ${failures} errors, ${warnings} warnings`);
if (failures > 0) process.exitCode = 1;
}

void main();
