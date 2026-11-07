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
} from './seed-data';
import type {
  Category,
  Brand,
  AttributeDefinition,
  Product,
  CompatibilityRule,
  ServiceItem,
  TaxSettings,
  CompanySettings,
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
}

/**
 * Get active catalog data.
 * Checks Firestore with fallback to seed data.
 */
export async function getActiveCatalog(): Promise<CatalogData> {
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
      taxSettings: SEED_TAX_SETTINGS,
      companySettings: SEED_COMPANY_SETTINGS,
    };
  }

  try {
    const [catSnap, brandSnap, attrSnap, prodSnap, ruleSnap, srvSnap, taxSnap, compSnap] =
      await Promise.all([
        db.collection('categories').where('isActive', '==', true).orderBy('sortOrder', 'asc').get(),
        db.collection('brands').where('isActive', '==', true).get(),
        db.collection('attributeDefinitions').orderBy('displayOrder', 'asc').get(),
        db.collection('products').where('isActive', '==', true).get(),
        db.collection('compatibilityRules').where('isActive', '==', true).get(),
        db.collection('services').where('isActive', '==', true).get(),
        db.collection('settings').doc('tax').get(),
        db.collection('settings').doc('company').get(),
      ]);

    const categories = !catSnap.empty
      ? catSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_CATEGORIES as unknown as Category[]);

    const brands = !brandSnap.empty
      ? brandSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_BRANDS as unknown as Brand[]);

    const attributes = !attrSnap.empty
      ? attrSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_ATTRIBUTES as unknown as AttributeDefinition[]);

    const products = !prodSnap.empty
      ? prodSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_PRODUCTS as unknown as Product[]);

    const rules = !ruleSnap.empty
      ? ruleSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_COMPATIBILITY_RULES as unknown as CompatibilityRule[]);

    const services = !srvSnap.empty
      ? srvSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
      : (SEED_SERVICES as unknown as ServiceItem[]);

    const taxSettings = taxSnap.exists ? (taxSnap.data() as TaxSettings) : SEED_TAX_SETTINGS;
    const companySettings = compSnap.exists ? (compSnap.data() as CompanySettings) : SEED_COMPANY_SETTINGS;

    return {
      categories,
      brands,
      attributes,
      products,
      rules,
      services,
      taxSettings,
      companySettings,
    };
  } catch (error) {
    console.warn('Error fetching catalog from Firestore, falling back to seed data:', error);
    return {
      categories: SEED_CATEGORIES as unknown as Category[],
      brands: SEED_BRANDS as unknown as Brand[],
      attributes: SEED_ATTRIBUTES as unknown as AttributeDefinition[],
      products: SEED_PRODUCTS as unknown as Product[],
      rules: SEED_COMPATIBILITY_RULES as unknown as CompatibilityRule[],
      services: SEED_SERVICES as unknown as ServiceItem[],
      taxSettings: SEED_TAX_SETTINGS,
      companySettings: SEED_COMPANY_SETTINGS,
    };
  }
}

