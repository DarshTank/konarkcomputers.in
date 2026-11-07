/**
 * Whitelist of authorized administrators for Konark Computers Backoffice.
 * Only these Google accounts are permitted to authenticate and access /admin.
 */
export const ALLOWED_ADMIN_EMAILS = [
  'darshtank05@gmail.com',
  'omni1715@gmail.com',
] as const;

export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return ALLOWED_ADMIN_EMAILS.some((allowed) => allowed.toLowerCase() === normalized);
}

