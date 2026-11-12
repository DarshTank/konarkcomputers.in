// Firebase Client SDK singleton — for client-side Firebase Auth in admin panel
// Uses NEXT_PUBLIC_FIREBASE_* env vars (safe to expose)

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getClientApp(): FirebaseApp {
  const existing = getApps();
  if (existing.length > 0) {
    return existing[0];
  }
  return initializeApp(firebaseConfig);
}

let _auth: Auth | null = null;
let _db: Firestore | null = null;

export function getClientAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getClientApp());
  }
  return _auth;
}

export function getClientFirestore(): Firestore {
  if (!_db) {
    const app = getClientApp();
    const dbId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID;
    if (dbId && dbId !== 'default' && dbId !== '(default)') {
      _db = getFirestore(app, dbId);
    } else {
      _db = getFirestore(app);
    }
  }
  return _db;
}

export { getClientApp };

/**
 * Safely get an ID token from the client Firebase Auth instance,
 * waiting for authentication state to resolve if it is initializing.
 */
export async function getAdminIdToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  try {
    const auth = getClientAuth();
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }

    // Wait for Firebase v9/v10 authStateReady if available
    if (typeof (auth as any).authStateReady === 'function') {
      try {
        await (auth as any).authStateReady();
        const readyUser = (auth as { currentUser: any }).currentUser;
        if (readyUser) {
          return await readyUser.getIdToken();
        }
      } catch {}
    }

    // Or wait up to 2.5s for onAuthStateChanged
    return await new Promise<string | null>((resolve) => {
      let resolved = false;
      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(null);
        }
      }, 2500);

      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          try {
            unsubscribe();
          } catch {}
          if (user) {
            try {
              const token = await user.getIdToken();
              resolve(token);
            } catch {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        }
      });
    });
  } catch {
    return null;
  }
}


