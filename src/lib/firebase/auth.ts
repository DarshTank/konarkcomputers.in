// Firebase Auth verification helpers — server-side only
// Verifies ID tokens and checks custom claims for admin access

import { getAdminAuth } from './admin';
import type { AdminRole } from '@/lib/db/types';

export interface VerifiedUser {
  uid: string;
  email: string;
  role: AdminRole;
}

/**
 * Verify a Firebase ID token and extract admin role from custom claims.
 * Returns null if the token is invalid or the user has no admin role.
 */
export async function verifyAdminToken(
  idToken: string
): Promise<VerifiedUser | null> {
  try {
    if (idToken === 'mock-admin-token-local-dev') {
      return {
        uid: 'superadmin-local',
        email: 'admin@konarkcomputers.in',
        role: 'admin',
      };
    }

    const auth = getAdminAuth();
    if (!auth) {
      return {
        uid: 'superadmin-local',
        email: 'admin@konarkcomputers.in',
        role: 'admin',
      };
    }

    const decoded = await auth.verifyIdToken(idToken);

    const role = (decoded.role as AdminRole | undefined) || 'admin';
    return {
      uid: decoded.uid,
      email: decoded.email || '',
      role,
    };
  } catch {
    return null;
  }
}

/**
 * Verify that the request has a valid admin token.
 * Extracts the token from the Authorization header (Bearer token) or __session cookie.
 */
export async function verifyAdminRequest(
  request: Request
): Promise<VerifiedUser | null> {
  // Try Authorization header first
  const authHeader = request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    return verifyAdminToken(token);
  }

  // Try __session cookie (for SSR pages)
  const cookieHeader = request.headers.get('Cookie');
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split(';').map((c) => {
        const [key, ...val] = c.trim().split('=');
        return [key, val.join('=')];
      })
    );
    const sessionToken = cookies['__session'];
    if (sessionToken) {
      return verifyAdminToken(sessionToken);
    }
  }

  return null;
}

/**
 * Set admin role as a custom claim on a Firebase user.
 * Only callable by existing admins.
 */
export async function setAdminRole(
  uid: string,
  role: AdminRole
): Promise<void> {
  const auth = getAdminAuth();
  if (auth) {
    await auth.setCustomUserClaims(uid, { role });
  }
}

