// Firebase Admin SDK singleton — server-side only
// This module initializes firebase-admin with a service account from environment variables.
// NEVER import this file in client components.

import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';

export function isFirebaseAdminConfigured(): boolean {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}

function getAdminApp(): App | null {
  const existing = getApps();
  if (existing.length > 0) {
    return existing[0];
  }

  if (!isFirebaseAdminConfigured()) {
    return null;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID!;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n');

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

let _db: Firestore | null = null;
let _auth: Auth | null = null;

export function getAdminDb(): Firestore | null {
  if (!_db) {
    const app = getAdminApp();
    if (!app) return null;
    const dbId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID;
    // In Google Cloud Firestore, the default database is '(default)' (with parentheses).
    // Passing 'default' causes a 5 NOT_FOUND error. If unset or 'default' or '(default)',
    // call getFirestore(app) without databaseId so it connects to the standard default database.
    if (dbId && dbId !== 'default' && dbId !== '(default)') {
      _db = getFirestore(app, dbId);
    } else {
      _db = getFirestore(app);
    }
    try {
      _db.settings({ ignoreUndefinedProperties: true });
    } catch {}
  }
  return _db;
}

export function getAdminAuth(): Auth | null {
  if (!_auth) {
    const app = getAdminApp();
    if (!app) return null;
    _auth = getAuth(app);
  }
  return _auth;
}
