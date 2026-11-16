import { getAdminDb } from '../firebase/admin';
import { unstable_cache } from 'next/cache';
import {
  getQuoteSettings,
  getCompanySettings,
  getTaxSettings,
} from './settings';
import type {
  Category,
  Brand,
  AttributeDefinition,
  Product,
  CompatibilityRule,
  ServiceItem,
  TaxSettings,
  CompanySettings,
  QuoteSettings,
} from './types';

export interface CatalogData {
  categories: Category[];
  brands: Brand[];
  attributes: AttributeDefinition[];
  products: Product[];
  rules: CompatibilityRule[];
  services: ServiceItem[];
  taxSettings: TaxSettings;
  companySettings: CompanySettings;
  quoteSettings: QuoteSettings;
}

export interface CatalogSnapshot extends CatalogData {
  catalogVersion: string;
}

function timestampValue(value: unknown): number {
  if (!value || typeof value !== 'object') return 0;
  const timestamp = value as { seconds?: number; _seconds?: number };
  return timestamp.seconds ?? timestamp._seconds ?? 0;
}

async function loadCatalogSnapshot(): Promise<CatalogSnapshot> {
  const db = getAdminDb();
  if (!db) {
    throw new Error('Catalog database is unavailable');
  }

  const [catSnap, brandSnap, attrSnap, prodSnap, ruleSnap, srvSnap] = await Promise.all([
    db.collection('categories').where('isActive', '==', true).get(),
    db.collection('brands').where('isActive', '==', true).get(),
    db.collection('attributeDefinitions').orderBy('displayOrder', 'asc').get(),
    db.collection('products').where('isPublished', '==', true).get(),
    db.collection('compatibilityRules').where('isActive', '==', true).get(),
    db.collection('services').where('isActive', '==', true).get(),
  ]);
  const products = prodSnap.docs
    .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, 'id'>) }))
    .filter((product) => product.isActive && product.pricing.priceSet !== false && product.pricing.pricePaise > 0);
  const versions = prodSnap.docs.map((doc) => timestampValue(doc.get('updatedAt')));
  const [taxSettings, companySettings, quoteSettings] = await Promise.all([
    getTaxSettings(),
    getCompanySettings(),
    getQuoteSettings(),
  ]);

  return {
    categories: catSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Category, 'id'>) })),
    brands: brandSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Brand, 'id'>) })),
    attributes: attrSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<AttributeDefinition, 'id'>) })),
    products,
    rules: ruleSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<CompatibilityRule, 'id'>) })),
    services: srvSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<ServiceItem, 'id'>) })),
    taxSettings,
    companySettings,
    quoteSettings,
    catalogVersion: String(Math.max(0, ...versions)),
  };
}

const getCachedCatalogSnapshot = unstable_cache(
  loadCatalogSnapshot,
  ['catalog-snapshot'],
  { tags: ['catalog'], revalidate: 60 }
);

export async function getCatalogSnapshot(): Promise<CatalogSnapshot> {
  return getCachedCatalogSnapshot();
}

/**
 * Get active catalog data.
 * Reads catalog data from Firestore.
 * Settings (tax, company, quote) are always loaded via the multi-tier settings store.
 */
export async function getActiveCatalog(): Promise<CatalogData> {
  // Always load settings using the unified multi-tier settings loader
  const [taxSettings, companySettings, quoteSettings] = await Promise.all([
    getTaxSettings(),
    getCompanySettings(),
    getQuoteSettings(),
  ]);

  let db = null;
  try {
    db = getAdminDb();
  } catch {
    db = null;
  }

  if (!db) {
    return {
      categories: [],
      brands: [],
      attributes: [],
      products: [],
      rules: [],
      services: [],
      taxSettings,
      companySettings,
      quoteSettings,
    };
  }

  try {
    const [catSnap, brandSnap, attrSnap, prodSnap, ruleSnap, srvSnap] =
      await Promise.all([
        // Query categories without composite index requirement, sort in JS
        db.collection('categories').where('isActive', '==', true).get().catch(() => null),
        db.collection('brands').where('isActive', '==', true).get().catch(() => null),
        db.collection('attributeDefinitions').orderBy('displayOrder', 'asc').get().catch(() => null),
        db.collection('products')
          .where('isActive', '==', true)
          .where('isPublished', '==', true)
          .get()
          .catch(() => null),
        db.collection('compatibilityRules').where('isActive', '==', true).get().catch(() => null),
        db.collection('services').where('isActive', '==', true).get().catch(() => null),
      ]);

    const categories = catSnap
      ? catSnap.docs
          .map((d) => ({ id: d.id, ...(d.data() as any) }))
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      : [];

    const brands = brandSnap ? brandSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) : [];

    const attributes = attrSnap ? attrSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) : [];

    const products = prodSnap ? prodSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) : [];

    const rules = ruleSnap ? ruleSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) : [];

    const services = srvSnap ? srvSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) : [];

    return {
      categories,
      brands,
      attributes,
      products,
      rules,
      services,
      taxSettings,
      companySettings,
      quoteSettings,
    };
  } catch (error) {
    console.warn('Error fetching catalog collections from Firestore, falling back to seed data:', error);
    return {
      categories: [],
      brands: [],
      attributes: [],
      products: [],
      rules: [],
      services: [],
      taxSettings,
      companySettings,
      quoteSettings,
    };
  }
}

export async function getQuoteCatalogMetadata(): Promise<{
  categories: Category[];
  attributes: AttributeDefinition[];
  rules: CompatibilityRule[];
  taxSettings: TaxSettings;
}> {
  const [taxSettings, db] = await Promise.all([
    getTaxSettings(),
    Promise.resolve(getAdminDb()),
  ]);

  if (!db) {
    return {
      categories: [],
      attributes: [],
      rules: [],
      taxSettings,
    };
  }

  try {
    const [catSnap, attrSnap, ruleSnap] = await Promise.all([
      db.collection('categories').where('isActive', '==', true).get(),
      db.collection('attributeDefinitions').orderBy('displayOrder', 'asc').get(),
      db.collection('compatibilityRules').where('isActive', '==', true).get(),
    ]);

    return {
      categories: catSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Category, 'id'>) })),
      attributes: attrSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<AttributeDefinition, 'id'>) })),
      rules: ruleSnap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<CompatibilityRule, 'id'>) })),
      taxSettings,
    };
  } catch {
    return {
      categories: [],
      attributes: [],
      rules: [],
      taxSettings,
    };
  }
}
