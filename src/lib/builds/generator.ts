import type {
  BuildConfig,
  BuildProfile,
  Category,
  CompatibilityRule,
  Product,
  QuoteItemSnapshot,
  ServiceItem,
} from '../db/types';
import { calculateTotals, type CalculatedTotals, type LineItem } from '../pricing/calculator';
import { validateCartConflicts } from '../compat/engine';
import type { ProductForCompat } from '../compat/types';

export interface CatalogSnapshot {
  products: Product[];
  categories: Category[];
  attributes: { key: string; categoryId: string; compatKey: boolean; label: string; type: string }[];
  rules: CompatibilityRule[];
  services: ServiceItem[];
  profiles: BuildProfile[];
  taxSettings: { shopStateCode: number; roundOff: boolean };
}

export interface BuildRequest {
  platform: 'intel' | 'ryzen';
  budgetPaise: number;
  customerStateCode?: number;
}

export interface GeneratedBuild {
  id: string;
  profileId: string;
  items: { productId: string; categoryId: string; qty: number }[];
  totals: CalculatedTotals;
  serviceLines: QuoteItemSnapshot[];
  budgetUsePct: number;
  isStretch: boolean;
  warnings: string[];
  score: number;
}

function isSellable(product: Product): boolean {
  return product.isActive &&
    product.isPublished === true &&
    (product.pricing.priceSet ?? true) &&
    product.pricing.pricePaise > 0 &&
    (product.stock.status === 'in_stock' || product.stock.status === 'low');
}

function asCompat(product: Product): ProductForCompat {
  return {
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    brandId: product.brandId,
    brandName: product.brandName || product.brandId,
    specs: product.specs,
    compat: product.compat,
    condition: product.condition,
  };
}

function snapshotService(service: ServiceItem): QuoteItemSnapshot {
  return {
    productId: `service:${service.id}`,
    sku: service.id,
    name: service.name,
    categoryName: 'Service',
    brandName: '',
    specsSummary: '',
    condition: 'new',
    warrantyMonths: 0,
    qty: 1,
    unitPricePaise: service.pricePaise,
    priceIncludesGst: service.priceIncludesGst,
    gstRateBps: service.gstRateBps,
    hsnCode: service.sacCode,
    taxablePaise: 0,
    cgstPaise: 0,
    sgstPaise: 0,
    igstPaise: 0,
    lineTotalPaise: 0,
  };
}

function chooseProfile(request: BuildRequest, profiles: BuildProfile[]): BuildProfile | undefined {
  return profiles
    .filter((profile) => profile.isActive &&
      request.budgetPaise >= profile.minBudgetPaise &&
      request.budgetPaise <= profile.maxBudgetPaise)
    .sort((a, b) => a.tier - b.tier || a.id.localeCompare(b.id))[0];
}

export function generateBuilds(
  request: BuildRequest,
  catalog: CatalogSnapshot,
  config: BuildConfig
): { builds: GeneratedBuild[]; reason?: 'NO_PARTS' | 'BUDGET_TOO_LOW' | 'NO_COMPATIBLE_SET' } {
  if (!Number.isSafeInteger(request.budgetPaise) || request.budgetPaise <= 0) {
    return { builds: [], reason: 'BUDGET_TOO_LOW' };
  }

  const profile = chooseProfile(request, catalog.profiles);
  if (!profile) return { builds: [], reason: 'BUDGET_TOO_LOW' };

  const products = catalog.products
    .filter((product) => isSellable(product) && product.buildEligible !== false)
    .filter((product) => !product.platform || product.platform === request.platform);
  if (products.length === 0) return { builds: [], reason: 'NO_PARTS' };

  const serviceItems = catalog.services.filter((service) =>
    service.isActive && config.autoServiceItemIds.includes(service.id)
  );
  const serviceTotal = serviceItems.reduce((sum, service) => {
    const line: LineItem = {
      productId: service.id,
      qty: 1,
      unitPricePaise: service.pricePaise,
      priceIncludesGst: service.priceIncludesGst,
      gstRateBps: service.gstRateBps,
      hsnCode: service.sacCode,
    };
    return sum + calculateTotals([line], {
      shopStateCode: catalog.taxSettings.shopStateCode,
      customerStateCode: request.customerStateCode ?? catalog.taxSettings.shopStateCode,
      roundOff: false,
    }).grandTotalPaise;
  }, 0);

  const byCategory = new Map<string, Product[]>();
  for (const product of products) {
    const list = byCategory.get(product.categoryId) || [];
    list.push(product);
    byCategory.set(product.categoryId, list);
  }
  for (const list of byCategory.values()) {
    list.sort((a, b) => a.id.localeCompare(b.id));
  }

  const cpuCandidates = (byCategory.get('processor') || [])
    .filter((product) => product.platform === request.platform)
    .sort((a, b) => a.pricing.pricePaise - b.pricing.pricePaise || a.id.localeCompare(b.id))
    .slice(0, 24);
  if (cpuCandidates.length === 0) return { builds: [], reason: 'NO_PARTS' };

  const builds: GeneratedBuild[] = [];
  for (const cpu of cpuCandidates) {
    const selected: Product[] = [cpu];
    const targetParts = [...profile.required];
    if (config.requireGpuWhenNoIgpu && !cpu.specs.graphics) {
      if (!targetParts.includes('graphics-card')) targetParts.push('graphics-card');
    }

    for (const categoryId of targetParts) {
      if (categoryId === 'processor') continue;
      const candidates = byCategory.get(categoryId) || [];
      const share = profile.shares[categoryId] ?? 0;
      const target = Math.max(0, Math.round(request.budgetPaise * share));
      const candidate = candidates
        .filter((product) => !product.platform || product.platform === request.platform)
        .sort((a, b) =>
          Math.abs(a.pricing.pricePaise - target) - Math.abs(b.pricing.pricePaise - target) ||
          a.id.localeCompare(b.id)
        )[0];
      if (candidate) selected.push(candidate);
    }

    const compatCart = selected.map((product) => ({ product: asCompat(product), qty: 1 }));
    const validation = validateCartConflicts(
      compatCart,
      catalog.categories,
      catalog.attributes,
      catalog.rules,
      { strict: true }
    );
    if (validation.hasConflicts) continue;

    const lineItems = selected.map((product): LineItem => ({
      productId: product.id,
      qty: 1,
      unitPricePaise: product.pricing.pricePaise,
      priceIncludesGst: product.pricing.priceIncludesGst,
      gstRateBps: product.pricing.gstRateBps,
      hsnCode: product.pricing.hsnCode,
    }));
    const serviceLines = serviceItems.map(snapshotService);
    const totals = calculateTotals(
      [...lineItems, ...serviceItems.map((service): LineItem => ({
        productId: service.id,
        qty: 1,
        unitPricePaise: service.pricePaise,
        priceIncludesGst: service.priceIncludesGst,
        gstRateBps: service.gstRateBps,
        hsnCode: service.sacCode,
      }))],
      {
        shopStateCode: catalog.taxSettings.shopStateCode,
        customerStateCode: request.customerStateCode ?? catalog.taxSettings.shopStateCode,
        roundOff: catalog.taxSettings.roundOff,
      }
    );
    const upper = Math.round(request.budgetPaise * (1 + config.stretchPct / 100));
    const lower = Math.round(request.budgetPaise * (1 - config.tolerancePct / 100));
    if (totals.grandTotalPaise < lower || totals.grandTotalPaise > upper) continue;

    const isStretch = totals.grandTotalPaise > request.budgetPaise;
    builds.push({
      id: `${profile.id}:${selected.map((product) => product.id).join(',')}`,
      profileId: profile.id,
      items: selected.map((product) => ({ productId: product.id, categoryId: product.categoryId, qty: 1 })),
      totals,
      serviceLines,
      budgetUsePct: (totals.grandTotalPaise / request.budgetPaise) * 100,
      isStretch,
      warnings: serviceTotal > 0 ? [] : ['No assembly or service charge is configured.'],
      score: Math.round((totals.grandTotalPaise / request.budgetPaise) * 10000),
    });
  }

  builds.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const unique = builds.filter((build, index) =>
    builds.findIndex((candidate) => candidate.items.map((item) => item.productId).join('|') ===
      build.items.map((item) => item.productId).join('|')) === index
  );
  return {
    builds: unique.slice(0, config.maxBuildsShown),
    ...(unique.length === 0 ? { reason: 'NO_COMPATIBLE_SET' as const } : {}),
  };
}
