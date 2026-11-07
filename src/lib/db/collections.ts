import { getAdminDb } from '../firebase/admin';

export const COLLECTIONS = {
  categories: 'categories',
  brands: 'brands',
  attributeDefinitions: 'attributeDefinitions',
  products: 'products',
  services: 'services',
  compatibilityRules: 'compatibilityRules',
  quotes: 'quotes',
  counters: 'counters',
  adminAudit: 'adminAudit',
  settings: 'settings',
  users: 'users',
} as const;

export type CollectionName = keyof typeof COLLECTIONS;

/**
 * Helper to get a Firestore collection reference
 */
export function getCollection(name: CollectionName) {
  const db = getAdminDb();
  if (!db) return null;
  return db.collection(COLLECTIONS[name]);
}
