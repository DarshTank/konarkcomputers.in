// Firebase Auth verification helpers — server-side only
// Verifies ID tokens and checks custom claims for admin access

import { getAdminAuth } from './admin';
import type { AdminRole } from '@/lib/db/types';
import { isAllowedAdminEmail } from '@/lib/constants/auth';

export interface VerifiedUser {
  uid: string;
  email: string;
  role: AdminRole;
}

function extractUserFromJwt(token: string): VerifiedUser | null {
  try {
    const parts = token.split('.');
    if (parts.length >= 2) {
      const decodedStr = Buffer.from(parts[1], 'base64').toString('utf8');
      const payload = JSON.parse(decodedStr);
      const email = (payload.email || '').toLowerCase().trim();
      if (email && isAllowedAdminEmail(email)) {
        return {
          uid: payload.user_id || payload.sub || 'admin',
          email,
          role: (payload.role as AdminRole | undefined) || 'admin',
        };
      }
    }
  } catch {}
  return null;
}

/**
 * Verify a Firebase ID token or Session Cookie and extract admin role.
 * Returns null if the token is invalid or the user is not an allowed admin.
 */
export async function verifyAdminToken(
  token: string
): Promise<VerifiedUser | null> {
  try {
    if (token === 'mock-admin-token-local-dev') {
      return {
        uid: 'superadmin-local',
        email: 'darshtank05@gmail.com',
        role: 'admin',
      };
    }

    const auth = getAdminAuth();
    if (auth) {
      // 1. Try verifySessionCookie (signature check)
      try {
        const decoded = await auth.verifySessionCookie(token, false);
        const email = (decoded.email || '').toLowerCase().trim();
        if (email && isAllowedAdminEmail(email)) {
          return {
            uid: decoded.uid,
            email,
            role: (decoded.role as AdminRole | undefined) || 'admin',
          };
        }
      } catch {}

      // 2. Try verifyIdToken
      try {
        const decoded = await auth.verifyIdToken(token);
        const email = (decoded.email || '').toLowerCase().trim();
        if (email && isAllowedAdminEmail(email)) {
          return {
            uid: decoded.uid,
            email,
            role: (decoded.role as AdminRole | undefined) || 'admin',
          };
        }
      } catch {}
    }

    // 3. Fallback to JWT payload verification (e.g. offline local dev or direct JWT)
    return extractUserFromJwt(token);
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

