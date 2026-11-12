import { getAdminDb } from '../firebase/admin';
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
        db.collection('products').where('isActive', '==', true).get().catch(() => null),
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
