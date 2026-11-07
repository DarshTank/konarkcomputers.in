/**
 * Firestore document types for Konark Computers quotation system.
 *
 * Monetary convention:
 *   - Money is stored as INTEGER PAISE (1 rupee = 100 paise). NEVER use floats.
 *   - GST rate stored as basis points (BPS): 1800 = 18%.
 */

// ---------------------------------------------------------------------------
// Firestore Timestamp
// ---------------------------------------------------------------------------

/** Firestore Timestamp representation (seconds + nanoseconds since epoch). */
export type FirestoreTimestamp = { seconds: number; nanoseconds: number };

// ---------------------------------------------------------------------------
// Category
// ---------------------------------------------------------------------------

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  deviceScope: 'desktop' | 'laptop' | 'both';
  iconKey: string; // Lucide icon name
  description?: string;
  group?: string;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------

export interface Brand {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  logoImage?: ProductImage;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

// ---------------------------------------------------------------------------
// Attribute Definitions
// ---------------------------------------------------------------------------

export type AttributeType = 'enum' | 'number' | 'boolean' | 'text' | 'multi';

export interface AttributeDefinition {
  id: string;
  categoryId: string;
  key: string;
  label: string;
  type: AttributeType;
  options: string[]; // for enum/multi types
  unit?: string; // e.g. "GB", "MHz", "W", "mm"
  filterable: boolean;
  compatKey: boolean; // used in compatibility engine
  displayOrder: number;
  required: boolean;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

// ---------------------------------------------------------------------------
// Product Image
// ---------------------------------------------------------------------------

export interface ProductImage {
  id: string;
  url: string;
  pathname: string; // Vercel Blob pathname
  alt: string;
  isPrimary: boolean;
  sortOrder: number;
  width?: number;
  height?: number;
  contentType: string;
  sizeBytes: number;
  uploadedAt: FirestoreTimestamp;
  uploadedBy: string;
}

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

export type ProductCondition = 'original' | 'compatible' | 'new' | 'refurbished';
export type StockStatus = 'in_stock' | 'low' | 'out_of_stock' | 'on_order';

export interface ProductPricing {
  pricePaise: number; // integer paise
  priceIncludesGst: boolean;
  gstRateBps: number; // basis points, e.g. 1800 = 18%
  hsnCode: string;
}

export interface ProductStock {
  status: StockStatus;
  qty?: number;
}

export interface ProductCompat {
  deviceType?: 'desktop' | 'laptop' | 'both';
  compatibleBrands?: string[]; // lowercase
  compatibleModels?: string[]; // lowercase tokens
  [key: string]: unknown; // dynamic compat keys from attributeDefinitions
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  categoryId: string;
  brandId: string;
  description: string;
  specs: Record<string, string | number | boolean | string[]>;
  compat: ProductCompat;
  condition: ProductCondition;
  warrantyMonths: number;
  pricing: ProductPricing;
  stock: ProductStock;
  images: ProductImage[];
  isActive: boolean;
  searchKeywords: string[];
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
  createdBy: string;
}

// ---------------------------------------------------------------------------
// Service Item
// ---------------------------------------------------------------------------

export interface ServiceItem {
  id: string;
  name: string;
  sacCode: string; // SAC code e.g. "998713"
  pricePaise: number;
  priceIncludesGst: boolean;
  gstRateBps: number;
  isActive: boolean;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

// ---------------------------------------------------------------------------
// Compatibility Rules
// ---------------------------------------------------------------------------

export type ConstraintOperator = 'eq' | 'in' | 'intersects' | 'lte' | 'gte';
export type ConstraintSeverity = 'block' | 'warn';

export interface CompatConstraint {
  sourceField: string;
  targetField: string;
  operator: ConstraintOperator;
}

export interface CompatibilityRule {
  id: string;
  sourceCategoryId: string;
  targetCategoryId: string;
  constraints: CompatConstraint[];
  severity: ConstraintSeverity;
  message: string;
  isActive: boolean;
  createdAt?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export interface TaxSettings {
  shopStateCode: number; // 24 for Gujarat
  defaultGstRateBps: number; // 1800 = 18%
  displayMode: 'inclusive' | 'exclusive';
  roundOff: boolean;
  quoteValidityDays: number;
}

export interface CompanySettings {
  legalName: string;
  gstin: string;
  address: string;
  phone: string;
  email: string;
  bankName?: string;
  bankAccountNo?: string;
  bankIfsc?: string;
  upiId?: string;
  termsAndConditions: string;
  footerNote: string;
}

// ---------------------------------------------------------------------------
// Quote
// ---------------------------------------------------------------------------

export type QuoteStatus = 'new' | 'contacted' | 'converted' | 'expired' | 'cancelled';

export interface QuoteCustomer {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  stateCode: number; // GST state code
  stateName: string;
  company?: string;
  gstin?: string;
}

export interface QuoteItemSnapshot {
  productId: string;
  sku: string;
  name: string;
  categoryName: string;
  brandName: string;
  specsSummary: string;
  condition: ProductCondition;
  warrantyMonths: number;
  qty: number;
  unitPricePaise: number;
  priceIncludesGst: boolean;
  gstRateBps: number;
  hsnCode: string;
  taxablePaise: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  lineTotalPaise: number;
}

export interface QuoteTotals {
  subtotalPaise: number;
  taxablePaise: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  roundOffPaise: number;
  grandTotalPaise: number;
}

export interface QuoteDeviceContext {
  deviceType?: 'desktop' | 'laptop';
  brand?: string;
  model?: string;
}

export interface QuoteStatusEntry {
  status: QuoteStatus;
  timestamp: FirestoreTimestamp;
  changedBy?: string;
  note?: string;
}

export interface Quote {
  id: string;
  quoteNumber: string; // KQ-{YYYY}-{0001}
  publicToken: string; // unguessable token for public access
  status: QuoteStatus;
  customer: QuoteCustomer;
  items: QuoteItemSnapshot[];
  serviceItems?: QuoteItemSnapshot[];
  taxSnapshot: TaxSettings;
  companySnapshot: CompanySettings;
  totals: QuoteTotals;
  deviceContext?: QuoteDeviceContext;
  warnings: string[];
  validUntil: FirestoreTimestamp;
  pdfBlobPathname?: string;
  notes?: string; // customer notes
  internalNotes?: string; // admin notes
  createdAt: FirestoreTimestamp;
  statusHistory: QuoteStatusEntry[];
}

// ---------------------------------------------------------------------------
// Counter
// ---------------------------------------------------------------------------

export interface QuoteCounter {
  currentYear: number;
  lastNumber: number;
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

export interface AdminAuditEntry {
  id: string;
  who: string; // admin email
  action: string; // e.g. "update", "create", "delete"
  collection: string;
  docId: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  timestamp: FirestoreTimestamp;
}

// ---------------------------------------------------------------------------
// Admin User
// ---------------------------------------------------------------------------

export type AdminRole = 'admin' | 'staff';

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: FirestoreTimestamp;
  lastLoginAt?: FirestoreTimestamp;
}
