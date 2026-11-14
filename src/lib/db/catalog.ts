import { getAdminDb } from '../firebase/admin';
import { unstable_cache } from 'next/cache';
import {
  SEED_CATEGORIES,
  SEED_BRANDS,
  SEED_ATTRIBUTES,
  SEED_COMPATIBILITY_RULES,
  SEED_PRODUCTS,
  SEED_SERVICES,
  SEED_TAX_SETTINGS,
  SEED_COMPANY_SETTINGS,
  SEED_QUOTE_SETTINGS,
} from './seed-data';
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
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Catalog database is unavailable');
    }
    return {
      categories: SEED_CATEGORIES as unknown as Category[],
      brands: SEED_BRANDS as unknown as Brand[],
      attributes: SEED_ATTRIBUTES as unknown as AttributeDefinition[],
      products: (SEED_PRODUCTS as unknown as Product[]).filter((product) => product.isPublished === true),
      rules: SEED_COMPATIBILITY_RULES as unknown as CompatibilityRule[],
      services: SEED_SERVICES as unknown as ServiceItem[],
      taxSettings: await getTaxSettings(),
      companySettings: await getCompanySettings(),
      quoteSettings: await getQuoteSettings(),
      catalogVersion: 'seed',
    };
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
 * Checks Firestore with fallback to seed data.
 * Settings (tax, company, quote) are always loaded via the multi-tier settings store.
 */
export async function getActiveCatalog(): Promise<CatalogData> {
  // Always load settings using the unified multi-tier settings loader
  const [taxSettings, companySettings, quoteSettings] = await Promise.all([
    getTaxSettings().catch(() => SEED_TAX_SETTINGS),
    getCompanySettings().catch(() => SEED_COMPANY_SETTINGS),
    getQuoteSettings().catch(() => SEED_QUOTE_SETTINGS),
  ]);

  let db = null;
  try {
    db = getAdminDb();
  } catch {
    db = null;
  }

  if (!db) {
    return {
      categories: SEED_CATEGORIES as unknown as Category[],
      brands: SEED_BRANDS as unknown as Brand[],
      attributes: SEED_ATTRIBUTES as unknown as AttributeDefinition[],
      products: SEED_PRODUCTS as unknown as Product[],
      rules: SEED_COMPATIBILITY_RULES as unknown as CompatibilityRule[],
      services: SEED_SERVICES as unknown as ServiceItem[],
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

    const categories = catSnap && !catSnap.empty
      ? catSnap.docs
          .map((d) => ({ id: d.id, ...(d.data() as any) }))
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      : (SEED_CATEGORIES as unknown as Category[]);

    const brands = brandSnap && !brandSnap.empty
      ? brandSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_BRANDS as unknown as Brand[]);

    const attributes = attrSnap && !attrSnap.empty
      ? attrSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_ATTRIBUTES as unknown as AttributeDefinition[]);

    const products = prodSnap && !prodSnap.empty
      ? prodSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_PRODUCTS as unknown as Product[]);

    const rules = ruleSnap && !ruleSnap.empty
      ? ruleSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_COMPATIBILITY_RULES as unknown as CompatibilityRule[]);

    const services = srvSnap && !srvSnap.empty
      ? srvSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_SERVICES as unknown as ServiceItem[]);

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
      categories: SEED_CATEGORIES as unknown as Category[],
      brands: SEED_BRANDS as unknown as Brand[],
      attributes: SEED_ATTRIBUTES as unknown as AttributeDefinition[],
      products: SEED_PRODUCTS as unknown as Product[],
      rules: SEED_COMPATIBILITY_RULES as unknown as CompatibilityRule[],
      services: SEED_SERVICES as unknown as ServiceItem[],
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
    getTaxSettings().catch(() => SEED_TAX_SETTINGS),
    Promise.resolve(getAdminDb()),
  ]);

  if (!db) {
    return {
      categories: SEED_CATEGORIES as unknown as Category[],
      attributes: SEED_ATTRIBUTES as unknown as AttributeDefinition[],
      rules: SEED_COMPATIBILITY_RULES as unknown as CompatibilityRule[],
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
      categories: SEED_CATEGORIES as unknown as Category[],
      attributes: SEED_ATTRIBUTES as unknown as AttributeDefinition[],
      rules: SEED_COMPATIBILITY_RULES as unknown as CompatibilityRule[],
      taxSettings,
    };
  }
}
