// Compatibility Engine Types
// Used by both client (for instant UI feedback) and server (for verification)

export type CompatStatus = 'compatible' | 'incompatible' | 'neutral' | 'check';

export interface CompatResult {
  status: CompatStatus;
  reasons: CompatReason[];
}

export interface CompatReason {
  message: string;
  severity: 'block' | 'warn' | 'info';
  sourceProductId?: string;
  sourceProductName?: string;
  ruleId?: string;
}

export interface DeviceContext {
  deviceType?: 'desktop' | 'laptop';
  brand?: string;
  model?: string;
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface ProductForCompat {
  id: string;
  name: string;
  categoryId: string;
  brandId: string;
  brandName?: string;
  specs: Record<string, string | number | boolean | string[]>;
  compat: {
    deviceType?: 'desktop' | 'laptop' | 'both';
    compatibleBrands?: string[];
    compatibleModels?: string[];
    [key: string]: unknown;
  };
  condition: string;
}

export interface CategoryForCompat {
  id: string;
  name: string;
  deviceScope: 'desktop' | 'laptop' | 'both';
}

export interface AttributeForCompat {
  key: string;
  categoryId: string;
  compatKey: boolean;
  label: string;
  type: string;
}

export interface CompatRuleForEngine {
  id: string;
  sourceCategoryId: string;
  targetCategoryId: string;
  constraints: {
    sourceField: string;
    targetField: string;
    operator: 'eq' | 'in' | 'intersects' | 'lte' | 'gte';
  }[];
  severity: 'block' | 'warn';
  message: string;
  isActive: boolean;
}

export interface CompatEngineData {
  categories: CategoryForCompat[];
  attributes: AttributeForCompat[];
  rules: CompatRuleForEngine[];
}
