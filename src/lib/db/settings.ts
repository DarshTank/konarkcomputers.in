import fs from 'fs';
import path from 'path';
import os from 'os';
import { put, list } from '@vercel/blob';
import { getAdminDb } from '../firebase/admin';
import type { QuoteSettings, CompanySettings, TaxSettings } from './types';
import {
  SEED_QUOTE_SETTINGS,
  SEED_COMPANY_SETTINGS,
  SEED_TAX_SETTINGS,
} from './seed-data';

// Global memory cache shared across route executions in the same Node process
declare global {
  var __KONARK_QUOTE_SETTINGS__: QuoteSettings | undefined;
  var __KONARK_QUOTE_SETTINGS_DB_RETRY_AFTER__: number | undefined;
  var __KONARK_COMPANY_SETTINGS__: CompanySettings | undefined;
  var __KONARK_TAX_SETTINGS__: TaxSettings | undefined;
}

const FIRESTORE_QUOTA_RETRY_DELAY_MS = 30_000;

// Local cache files (using os.tmpdir() which is safe in both serverless and local dev)
const TMP_QUOTE_FILE = path.join(os.tmpdir(), 'konark-quote-settings.json');
const TMP_COMPANY_FILE = path.join(os.tmpdir(), 'konark-company-settings.json');
const TMP_TAX_FILE = path.join(os.tmpdir(), 'konark-tax-settings.json');

const BLOB_QUOTE_KEY = 'konark-settings/quote.json';
const BLOB_COMPANY_KEY = 'konark-settings/company.json';
const BLOB_TAX_KEY = 'konark-settings/tax.json';

function formatSettingsError(error: unknown): string {
  if (!error || typeof error !== 'object') return String(error);
  const value = error as { code?: unknown; details?: unknown; message?: unknown };
  const code = value.code !== undefined ? `code=${String(value.code)}` : '';
  const details = value.details ? String(value.details) : '';
  const message = value.message ? String(value.message) : '';
  return [code, details || message].filter(Boolean).join(' ') || 'unknown error';
}

function safeWriteFile(filePath: string, data: any) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch {}
}

function safeReadFile(filePath: string): any | null {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch {}
  return null;
}

// ---------------------------------------------------------------------------
// Vercel Blob Cloud Storage Fallback Helpers
// ---------------------------------------------------------------------------

async function writeBlobSettings(pathname: string, data: any): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    await put(pathname, JSON.stringify(data), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });
  } catch (e) {
    console.warn(`[Blob Write Error] ${pathname}:`, e);
  }
}

async function readBlobSettings<T>(pathname: string): Promise<T | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: pathname });
    if (blobs && blobs.length > 0) {
      const match = blobs.find((b) => b.pathname === pathname) || blobs[0];
      const res = await fetch(match.url, { cache: 'no-store' });
      if (res.ok) {
        return (await res.json()) as T;
      }
    }
  } catch (e) {
    console.warn(`[Blob Read Error] ${pathname}:`, e);
  }
  return null;
}

// ---------------------------------------------------------------------------
// Quote Settings (Visibility /quote)
// ---------------------------------------------------------------------------

function readLocalQuoteSettings(): QuoteSettings | null {
  try {
    if (globalThis.__KONARK_QUOTE_SETTINGS__) {
      return globalThis.__KONARK_QUOTE_SETTINGS__;
    }
    const fromTmp = safeReadFile(TMP_QUOTE_FILE);
    if (fromTmp && typeof fromTmp.enabled === 'boolean') {
      globalThis.__KONARK_QUOTE_SETTINGS__ = fromTmp;
      return fromTmp;
    }
  } catch {}
  return null;
}

function writeLocalQuoteSettings(settings: QuoteSettings) {
  try {
    globalThis.__KONARK_QUOTE_SETTINGS__ = settings;
    safeWriteFile(TMP_QUOTE_FILE, settings);
  } catch {}
}

export async function getQuoteSettings(): Promise<QuoteSettings> {
  // 1. Check Firestore database
  const retryAfter = globalThis.__KONARK_QUOTE_SETTINGS_DB_RETRY_AFTER__ ?? 0;
  if (Date.now() >= retryAfter) {
    try {
      const db = getAdminDb();
      if (db) {
        const snap = await db.collection('settings').doc('quote').get();
        if (snap.exists) {
          const data = snap.data();
          const settings: QuoteSettings = {
            enabled: data?.enabled !== false,
            updatedAt: data?.updatedAt,
            updatedBy: data?.updatedBy,
          };
          globalThis.__KONARK_QUOTE_SETTINGS_DB_RETRY_AFTER__ = undefined;
          globalThis.__KONARK_QUOTE_SETTINGS__ = settings;
          writeLocalQuoteSettings(settings);
          return settings;
        }
      }
    } catch (e: any) {
      if (e?.code === 8 || e?.details === 'Quota exceeded.') {
        globalThis.__KONARK_QUOTE_SETTINGS_DB_RETRY_AFTER__ =
          Date.now() + FIRESTORE_QUOTA_RETRY_DELAY_MS;
        console.warn(
          `Firestore quote settings quota exceeded; using cached settings for ${FIRESTORE_QUOTA_RETRY_DELAY_MS / 1000}s.`
        );
      } else {
        console.warn(`Error reading quote settings from Firestore: ${formatSettingsError(e)}`);
      }
    }
  }

  // 2. Check Vercel Blob cloud persistence (works across all serverless lambdas)
  const fromBlob = await readBlobSettings<QuoteSettings>(BLOB_QUOTE_KEY);
  if (fromBlob && typeof fromBlob.enabled === 'boolean') {
    globalThis.__KONARK_QUOTE_SETTINGS__ = fromBlob;
    writeLocalQuoteSettings(fromBlob);
    return fromBlob;
  }

  // 3. Check memory & local disk cache
  const local = readLocalQuoteSettings();
  if (local) return local;

  // 4. Default fallback
  return SEED_QUOTE_SETTINGS;
}

export async function setQuoteSettings(settings: QuoteSettings): Promise<void> {
  // 1. Instant local & memory write
  writeLocalQuoteSettings(settings);

  // 2. Persist to Firestore database
  try {
    const db = getAdminDb();
    if (db) {
      await db.collection('settings').doc('quote').set(settings, { merge: true });
    }
  } catch (e) {
    console.warn('Firestore setQuoteSettings warning:', e);
  }

  // 3. Persist to Vercel Blob cloud storage (persists across all Vercel function instances)
  await writeBlobSettings(BLOB_QUOTE_KEY, settings);
}

export async function isQuoteEnabled(): Promise<boolean> {
  const settings = await getQuoteSettings();
  return settings.enabled !== false;
}

// ---------------------------------------------------------------------------
// Company Settings (Header details, logo, terms & conditions, footer note)
// ---------------------------------------------------------------------------

function readLocalCompanySettings(): CompanySettings | null {
  try {
    if (globalThis.__KONARK_COMPANY_SETTINGS__) {
      return globalThis.__KONARK_COMPANY_SETTINGS__;
    }
    const fromTmp = safeReadFile(TMP_COMPANY_FILE);
    if (fromTmp && typeof fromTmp.legalName === 'string') {
      globalThis.__KONARK_COMPANY_SETTINGS__ = fromTmp;
      return fromTmp;
    }
  } catch {}
  return null;
}

function writeLocalCompanySettings(settings: CompanySettings) {
  try {
    globalThis.__KONARK_COMPANY_SETTINGS__ = settings;
    safeWriteFile(TMP_COMPANY_FILE, settings);
  } catch {}
}

export async function getCompanySettings(): Promise<CompanySettings> {
  try {
    const db = getAdminDb();
    if (db) {
      const snap = await db.collection('settings').doc('company').get();
      if (snap.exists) {
        const data = snap.data() as CompanySettings;
        const merged: CompanySettings = { ...SEED_COMPANY_SETTINGS, ...data };
        globalThis.__KONARK_COMPANY_SETTINGS__ = merged;
        writeLocalCompanySettings(merged);
        return merged;
      }
    }
  } catch (e) {
    console.warn(`Error reading company settings from Firestore: ${formatSettingsError(e)}`);
  }

  const fromBlob = await readBlobSettings<CompanySettings>(BLOB_COMPANY_KEY);
  if (fromBlob && typeof fromBlob.legalName === 'string') {
    const merged = { ...SEED_COMPANY_SETTINGS, ...fromBlob };
    globalThis.__KONARK_COMPANY_SETTINGS__ = merged;
    writeLocalCompanySettings(merged);
    return merged;
  }

  const local = readLocalCompanySettings();
  if (local) return { ...SEED_COMPANY_SETTINGS, ...local };

  return SEED_COMPANY_SETTINGS;
}

export async function setCompanySettings(
  partial: Partial<CompanySettings>,
  updatedBy = 'admin'
): Promise<CompanySettings> {
  const current = await getCompanySettings();
  const merged: CompanySettings = { ...current, ...partial };

  // 1. Instant local persistence
  writeLocalCompanySettings(merged);

  // 2. Firestore persistence
  try {
    const db = getAdminDb();
    if (db) {
      await db.collection('settings').doc('company').set(merged, { merge: true });
      const nowSec = Math.floor(Date.now() / 1000);
      await db.collection('adminAudit').add({
        who: updatedBy,
        action: 'update_company_settings',
        collection: 'settings',
        docId: 'company',
        after: merged,
        timestamp: { seconds: nowSec, nanoseconds: 0 },
      });
    }
  } catch (e) {
    console.warn('Firestore setCompanySettings warning:', e);
  }

  // 3. Vercel Blob cloud persistence
  await writeBlobSettings(BLOB_COMPANY_KEY, merged);

  return merged;
}

// ---------------------------------------------------------------------------
// Tax Settings (GST calculation, state code, round off, validity days)
// ---------------------------------------------------------------------------

function readLocalTaxSettings(): TaxSettings | null {
  try {
    if (globalThis.__KONARK_TAX_SETTINGS__) {
      return globalThis.__KONARK_TAX_SETTINGS__;
    }
    const fromTmp = safeReadFile(TMP_TAX_FILE);
    if (fromTmp && typeof fromTmp.shopStateCode === 'number') {
      globalThis.__KONARK_TAX_SETTINGS__ = fromTmp;
      return fromTmp;
    }
  } catch {}
  return null;
}

function writeLocalTaxSettings(settings: TaxSettings) {
  try {
    globalThis.__KONARK_TAX_SETTINGS__ = settings;
    safeWriteFile(TMP_TAX_FILE, settings);
  } catch {}
}

export async function getTaxSettings(): Promise<TaxSettings> {
  try {
    const db = getAdminDb();
    if (db) {
      const snap = await db.collection('settings').doc('tax').get();
      if (snap.exists) {
        const data = snap.data() as TaxSettings;
        const merged: TaxSettings = { ...SEED_TAX_SETTINGS, ...data };
        globalThis.__KONARK_TAX_SETTINGS__ = merged;
        writeLocalTaxSettings(merged);
        return merged;
      }
    }
  } catch (e) {
    console.warn(`Error reading tax settings from Firestore: ${formatSettingsError(e)}`);
  }

  const fromBlob = await readBlobSettings<TaxSettings>(BLOB_TAX_KEY);
  if (fromBlob && typeof fromBlob.shopStateCode === 'number') {
    const merged = { ...SEED_TAX_SETTINGS, ...fromBlob };
    globalThis.__KONARK_TAX_SETTINGS__ = merged;
    writeLocalTaxSettings(merged);
    return merged;
  }

  const local = readLocalTaxSettings();
  if (local) return { ...SEED_TAX_SETTINGS, ...local };

  return SEED_TAX_SETTINGS;
}

export async function setTaxSettings(
  partial: Partial<TaxSettings>,
  updatedBy = 'admin'
): Promise<TaxSettings> {
  const current = await getTaxSettings();
  const merged: TaxSettings = { ...current, ...partial };

  // 1. Instant local persistence
  writeLocalTaxSettings(merged);

  // 2. Firestore persistence
  try {
    const db = getAdminDb();
    if (db) {
      await db.collection('settings').doc('tax').set(merged, { merge: true });
      const nowSec = Math.floor(Date.now() / 1000);
      await db.collection('adminAudit').add({
        who: updatedBy,
        action: 'update_tax_settings',
        collection: 'settings',
        docId: 'tax',
        after: merged,
        timestamp: { seconds: nowSec, nanoseconds: 0 },
      });
    }
  } catch (e) {
    console.warn('Firestore setTaxSettings warning:', e);
  }

  // 3. Vercel Blob cloud persistence
  await writeBlobSettings(BLOB_TAX_KEY, merged);

  return merged;
}
