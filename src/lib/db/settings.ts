import fs from 'fs';
import path from 'path';
import { getAdminDb } from '../firebase/admin';
import type { QuoteSettings, CompanySettings, TaxSettings } from './types';
import {
  SEED_QUOTE_SETTINGS,
  SEED_COMPANY_SETTINGS,
  SEED_TAX_SETTINGS,
} from './seed-data';

// Global memory cache shared across route executions in the same Node process
declare global {
  // eslint-disable-next-line no-var
  var __KONARK_QUOTE_SETTINGS__: QuoteSettings | undefined;
  // eslint-disable-next-line no-var
  var __KONARK_COMPANY_SETTINGS__: CompanySettings | undefined;
  // eslint-disable-next-line no-var
  var __KONARK_TAX_SETTINGS__: TaxSettings | undefined;
}

const QUOTE_SETTINGS_FILE = path.join(process.cwd(), '.next', 'konark-quote-settings.json');
const COMPANY_SETTINGS_FILE = path.join(process.cwd(), '.next', 'konark-company-settings.json');
const TAX_SETTINGS_FILE = path.join(process.cwd(), '.next', 'konark-tax-settings.json');

function ensureDir(filePath: string) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {}
}

// ---------------------------------------------------------------------------
// Quote Settings (Visibility /quote)
// ---------------------------------------------------------------------------

function readLocalQuoteSettings(): QuoteSettings | null {
  try {
    if (globalThis.__KONARK_QUOTE_SETTINGS__) {
      return globalThis.__KONARK_QUOTE_SETTINGS__;
    }
    if (fs.existsSync(QUOTE_SETTINGS_FILE)) {
      const content = fs.readFileSync(QUOTE_SETTINGS_FILE, 'utf8');
      const data = JSON.parse(content);
      if (typeof data.enabled === 'boolean') {
        globalThis.__KONARK_QUOTE_SETTINGS__ = data;
        return data;
      }
    }
  } catch {}
  return null;
}

function writeLocalQuoteSettings(settings: QuoteSettings) {
  try {
    globalThis.__KONARK_QUOTE_SETTINGS__ = settings;
    ensureDir(QUOTE_SETTINGS_FILE);
    fs.writeFileSync(QUOTE_SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
  } catch {}
}

export async function getQuoteSettings(): Promise<QuoteSettings> {
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
        globalThis.__KONARK_QUOTE_SETTINGS__ = settings;
        return settings;
      }
    }
  } catch (e) {
    console.warn('Error reading quote settings from Firestore:', e);
  }

  const local = readLocalQuoteSettings();
  if (local) return local;

  return SEED_QUOTE_SETTINGS;
}

export async function setQuoteSettings(settings: QuoteSettings): Promise<void> {
  writeLocalQuoteSettings(settings);

  try {
    const db = getAdminDb();
    if (db) {
      await db.collection('settings').doc('quote').set(settings, { merge: true });
    }
  } catch (e) {
    console.warn('Firestore setQuoteSettings warning:', e);
  }
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
    if (fs.existsSync(COMPANY_SETTINGS_FILE)) {
      const content = fs.readFileSync(COMPANY_SETTINGS_FILE, 'utf8');
      const data = JSON.parse(content);
      if (data && typeof data.legalName === 'string') {
        globalThis.__KONARK_COMPANY_SETTINGS__ = data;
        return data;
      }
    }
  } catch {}
  return null;
}

function writeLocalCompanySettings(settings: CompanySettings) {
  try {
    globalThis.__KONARK_COMPANY_SETTINGS__ = settings;
    ensureDir(COMPANY_SETTINGS_FILE);
    fs.writeFileSync(COMPANY_SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
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
    console.warn('Error reading company settings from Firestore:', e);
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

  // 2. Firestore persistence (if available)
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
    if (fs.existsSync(TAX_SETTINGS_FILE)) {
      const content = fs.readFileSync(TAX_SETTINGS_FILE, 'utf8');
      const data = JSON.parse(content);
      if (data && typeof data.shopStateCode === 'number') {
        globalThis.__KONARK_TAX_SETTINGS__ = data;
        return data;
      }
    }
  } catch {}
  return null;
}

function writeLocalTaxSettings(settings: TaxSettings) {
  try {
    globalThis.__KONARK_TAX_SETTINGS__ = settings;
    ensureDir(TAX_SETTINGS_FILE);
    fs.writeFileSync(TAX_SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');
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
    console.warn('Error reading tax settings from Firestore:', e);
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

  // 2. Firestore persistence (if available)
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

  return merged;
}
