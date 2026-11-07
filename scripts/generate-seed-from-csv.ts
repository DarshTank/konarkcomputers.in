import fs from 'fs';
import path from 'path';

function parseCsv(content: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        // ignore carriage return
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        if (currentRow.some(f => f.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(f => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function run() {
  const categoriesCsvPath = path.resolve(process.cwd(), 'Data/konark_categories.csv');
  const productsCsvPath = path.resolve(process.cwd(), 'Data/konark_products.csv');

  console.log('Reading CSV files...');
  const catRaw = fs.readFileSync(categoriesCsvPath, 'utf-8');
  const prodRaw = fs.readFileSync(productsCsvPath, 'utf-8');

  const catRows = parseCsv(catRaw);
  const prodRows = parseCsv(prodRaw);

  console.log(`Parsed ${catRows.length - 1} categories and ${prodRows.length - 1} products from CSV.`);
  
  const catHeaders = catRows[0];
  const prodHeaders = prodRows[0];
  console.log('Product columns:', prodHeaders.length);
}

run().catch(console.error);

