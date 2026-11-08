import fs from 'fs';
import path from 'path';
import { getAdminDb } from '../firebase/admin';
import type { Quote, QuoteStatus, QuoteStatusEntry } from './types';

// In-memory quote store across requests
declare global {
  // eslint-disable-next-line no-var
  var __KONARK_QUOTES__: Map<string, Quote> | undefined;
}

if (!globalThis.__KONARK_QUOTES__) {
  globalThis.__KONARK_QUOTES__ = new Map<string, Quote>();
}

const QUOTES_DIR = path.join(process.cwd(), '.next', 'konark-quotes');

function ensureQuotesDir() {
  try {
    if (!fs.existsSync(QUOTES_DIR)) {
      fs.mkdirSync(QUOTES_DIR, { recursive: true });
    }
  } catch {}
}

function writeQuoteToDisk(quote: Quote) {
  try {
    ensureQuotesDir();
    const filePath = path.join(QUOTES_DIR, `${quote.publicToken}.json`);
    fs.writeFileSync(filePath, JSON.stringify(quote, null, 2), 'utf8');
  } catch (e) {
    console.warn('Error writing quote to disk:', e);
  }
}

function readQuoteFromDisk(token: string): Quote | null {
  try {
    const filePath = path.join(QUOTES_DIR, `${token}.json`);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return data as Quote;
    }
  } catch {}
  return null;
}

/**
 * Remove undefined values recursively so Firestore never complains about unsupported types.
 */
function sanitizeForFirestore(obj: any): any {
  if (obj === null || obj === undefined) return null;
  if (Array.isArray(obj)) return obj.map(sanitizeForFirestore);
  if (typeof obj === 'object') {
    const out: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) {
        out[key] = sanitizeForFirestore(value);
      }
    }
    return out;
  }
  return obj;
}

/**
 * Save a generated quotation:
 * 1. Memory cache (indexed by both publicToken and internal id)
 * 2. Persistent local disk file (.next/konark-quotes/<token>.json)
 * 3. Firestore collection('quotes')
 */
export async function saveQuote(quote: Quote): Promise<void> {
  // 1. In-memory
  globalThis.__KONARK_QUOTES__?.set(quote.publicToken, quote);
  globalThis.__KONARK_QUOTES__?.set(quote.id, quote);

  // 2. Disk
  writeQuoteToDisk(quote);

  // 3. Firestore
  try {
    const db = getAdminDb();
    if (db) {
      await db.collection('quotes').doc(quote.id).set(sanitizeForFirestore(quote));
    }
  } catch (e) {
    console.warn('Firestore quote save warning (saved locally):', e);
  }
}

/**
 * Retrieve a quote by its public token:
 * Checks Firestore -> In-memory -> Local Disk.
 */
export async function getQuoteByToken(token: string): Promise<Quote | null> {
  // 1. Try Firestore if configured
  try {
    const db = getAdminDb();
    if (db) {
      const snap = await db
        .collection('quotes')
        .where('publicToken', '==', token)
        .limit(1)
        .get();

      if (!snap.empty) {
        const quote = snap.docs[0].data() as Quote;
        globalThis.__KONARK_QUOTES__?.set(token, quote);
        globalThis.__KONARK_QUOTES__?.set(quote.id, quote);
        writeQuoteToDisk(quote);
        return quote;
      }
    }
  } catch (e) {
    console.warn('Error querying Firestore for quote token:', e);
  }

  // 2. Try In-memory
  const inMem = globalThis.__KONARK_QUOTES__?.get(token);
  if (inMem) return inMem;

  // 3. Try Local Disk
  const onDisk = readQuoteFromDisk(token);
  if (onDisk) {
    globalThis.__KONARK_QUOTES__?.set(token, onDisk);
    globalThis.__KONARK_QUOTES__?.set(onDisk.id, onDisk);
    return onDisk;
  }

  return null;
}

/**
 * Retrieve a quote by its internal document ID.
 */
export async function getQuoteById(id: string): Promise<Quote | null> {
  // 1. Firestore
  try {
    const db = getAdminDb();
    if (db) {
      const snap = await db.collection('quotes').doc(id).get();
      if (snap.exists) {
        const quote = snap.data() as Quote;
        globalThis.__KONARK_QUOTES__?.set(quote.publicToken, quote);
        globalThis.__KONARK_QUOTES__?.set(id, quote);
        writeQuoteToDisk(quote);
        return quote;
      }
    }
  } catch {}

  // 2. In-memory
  const inMem = globalThis.__KONARK_QUOTES__?.get(id);
  if (inMem) return inMem;

  // 3. Disk search
  try {
    ensureQuotesDir();
    const files = fs.readdirSync(QUOTES_DIR);
    for (const f of files) {
      if (f.endsWith('.json')) {
        const q = JSON.parse(fs.readFileSync(path.join(QUOTES_DIR, f), 'utf8')) as Quote;
        if (q.id === id) {
          globalThis.__KONARK_QUOTES__?.set(q.publicToken, q);
          globalThis.__KONARK_QUOTES__?.set(id, q);
          return q;
        }
      }
    }
  } catch {}

  return null;
}

/**
 * Update quote status and internal shop notes across memory, disk, and Firestore.
 */
export async function updateQuote(
  id: string,
  updates: { status?: QuoteStatus; internalNotes?: string },
  changedBy = 'admin'
): Promise<Quote | null> {
  const quote = await getQuoteById(id);
  if (!quote) return null;

  const nowSec = Math.floor(Date.now() / 1000);
  const history: QuoteStatusEntry[] = quote.statusHistory || [];

  if (updates.status && updates.status !== quote.status) {
    history.push({
      status: updates.status,
      timestamp: { seconds: nowSec, nanoseconds: 0 },
      changedBy,
      note: updates.internalNotes,
    });
  }

  const updated: Quote = {
    ...quote,
    status: updates.status || quote.status,
    internalNotes: updates.internalNotes !== undefined ? updates.internalNotes : quote.internalNotes,
    statusHistory: history,
  };

  // 1. Save in-memory
  globalThis.__KONARK_QUOTES__?.set(updated.publicToken, updated);
  globalThis.__KONARK_QUOTES__?.set(updated.id, updated);

  // 2. Save on disk
  writeQuoteToDisk(updated);

  // 3. Firestore
  try {
    const db = getAdminDb();
    if (db) {
      await db.collection('quotes').doc(id).set(sanitizeForFirestore(updated), { merge: true });
      await db.collection('adminAudit').add({
        who: changedBy,
        action: 'update_quote_status',
        collection: 'quotes',
        docId: id,
        after: { status: updated.status, internalNotes: updated.internalNotes },
        timestamp: { seconds: nowSec, nanoseconds: 0 },
      });
    }
  } catch (e) {
    console.warn('Firestore update error (saved locally):', e);
  }

  return updated;
}

/**
 * List quotes for admin backoffice across all layers.
 */
export async function listQuotes(limitCount = 50): Promise<Quote[]> {
  const map = new Map<string, Quote>();

  // 1. Firestore
  try {
    const db = getAdminDb();
    if (db) {
      const snap = await db
        .collection('quotes')
        .orderBy('createdAt', 'desc')
        .limit(limitCount)
        .get();

      for (const doc of snap.docs) {
        const q = doc.data() as Quote;
        map.set(q.id, q);
      }
    }
  } catch {}

  // 2. Disk quotes
  try {
    ensureQuotesDir();
    const files = fs.readdirSync(QUOTES_DIR);
    for (const f of files) {
      if (f.endsWith('.json')) {
        const q = JSON.parse(fs.readFileSync(path.join(QUOTES_DIR, f), 'utf8')) as Quote;
        if (!map.has(q.id)) {
          map.set(q.id, q);
        }
      }
    }
  } catch {}

  // 3. Memory
  if (globalThis.__KONARK_QUOTES__) {
    for (const q of globalThis.__KONARK_QUOTES__.values()) {
      if (!map.has(q.id)) {
        map.set(q.id, q);
      }
    }
  }

  const result = Array.from(map.values());
  result.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  return result.slice(0, limitCount);
}
