export interface RateLimitPolicy { limit: number; windowMs: number }
export interface RateLimitResult { allowed: boolean; remaining: number; resetAt: number }

const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, policy: RateLimitPolicy, now = Date.now()): RateLimitResult {
  const current = buckets.get(key);
  if (!current || now >= current.resetAt) {
    const resetAt = now + policy.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: Math.max(0, policy.limit - 1), resetAt };
  }
  if (current.count >= policy.limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }
  current.count += 1;
  return { allowed: true, remaining: policy.limit - current.count, resetAt: current.resetAt };
}

export function rateLimitKey(request: Request, scope: string): string {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return `${scope}:${forwarded || request.headers.get('x-real-ip') || 'anonymous'}`;
}

/** Uses Firestore transactions when configured, with the deterministic local
 * implementation retained for development and single-instance deployments. */
export async function checkSharedRateLimit(key: string, policy: RateLimitPolicy): Promise<RateLimitResult> {
  const db = getAdminDb();
  if (!db) return checkRateLimit(key, policy);
  const id = crypto.createHash('sha256').update(key).digest('hex');
  const ref = db.collection('rateLimits').doc(id);
  const now = Date.now();
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref);
    const current = snapshot.exists ? snapshot.data() as { count?: number; resetAt?: number } : undefined;
    if (!current || !current.resetAt || now >= current.resetAt) {
      const result = { allowed: true, remaining: Math.max(0, policy.limit - 1), resetAt: now + policy.windowMs };
      transaction.set(ref, { count: 1, resetAt: result.resetAt, updatedAt: new Date() });
      return result;
    }
    if ((current.count || 0) >= policy.limit) {
      return { allowed: false, remaining: 0, resetAt: current.resetAt };
    }
    const count = (current.count || 0) + 1;
    transaction.set(ref, { count, resetAt: current.resetAt, updatedAt: new Date() }, { merge: true });
    return { allowed: true, remaining: Math.max(0, policy.limit - count), resetAt: current.resetAt };
  });
}

export const PUBLIC_API_POLICY: RateLimitPolicy = { limit: 30, windowMs: 10 * 60 * 1000 };
export const QUOTE_API_POLICY: RateLimitPolicy = { limit: 10, windowMs: 10 * 60 * 1000 };
import crypto from 'crypto';
import { getAdminDb } from './firebase/admin';
