import type {
  CompatResult,
  CompatStatus,
  CompatReason,
  DeviceContext,
  ProductForCompat,
  CategoryForCompat,
  AttributeForCompat,
  CompatRuleForEngine,
} from './types';
import { getFieldValue, evaluateConstraint } from './rules';

export interface CompatEngineOptions {
  cart: { product: ProductForCompat; qty: number }[];
  candidate: ProductForCompat;
  categories: CategoryForCompat[];
  attributes: AttributeForCompat[];
  rules: CompatRuleForEngine[];
  deviceContext?: DeviceContext;
  strict?: boolean;
}

/**
 * Normalizes string or array of strings into lowercase trimmed tokens
 */
function toTokens(val: unknown): string[] {
  if (!val) return [];
  const rawList = Array.isArray(val) ? val : [val];
  return rawList
    .flatMap((item) =>
      String(item)
        .toLowerCase()
        .split(/[\s,|/]+/)
    )
    .filter(Boolean);
}

function isUniversal(tokens: string[]): boolean {
  return tokens.includes('universal') || tokens.includes('all') || tokens.includes('any');
}

/**
 * Evaluates candidate product against the current cart and device context.
 */
export function evaluateProductCompatibility(options: CompatEngineOptions): CompatResult {
  const { cart, candidate, categories, attributes, rules, deviceContext, strict = false } = options;

  const reasons: CompatReason[] = [];
  const compatKeys = attributes.filter((a) => a.compatKey).map((a) => a.key);

  // Determine candidate category device scope
  const candidateCat = categories.find((c) => c.id === candidate.categoryId);
  const candidateDeviceScope = candidateCat?.deviceScope || 'both';
  const candidateDeviceType = candidate.compat.deviceType || (candidateDeviceScope !== 'both' ? candidateDeviceScope : undefined);

  // Inferred or specified device context
  let activeDeviceType: 'desktop' | 'laptop' | undefined = deviceContext?.deviceType;

  // If device context wasn't explicitly chosen, infer from cart items!
  if (!activeDeviceType) {
    for (const item of cart) {
      const p = item.product;
      const cat = categories.find((c) => c.id === p.categoryId);
      if (cat?.deviceScope === 'laptop' || p.compat.deviceType === 'laptop') {
        activeDeviceType = 'laptop';
        break;
      }
      if (cat?.deviceScope === 'desktop' || p.compat.deviceType === 'desktop') {
        activeDeviceType = 'desktop';
        break;
      }
    }
  }

  // --- DEVICE CONTEXT / SCOPE CHECK ---
  if (activeDeviceType) {
    if (candidateDeviceType && candidateDeviceType !== 'both' && candidateDeviceType !== activeDeviceType) {
      reasons.push({
        message: `Designed for ${candidateDeviceType}s; your setup is ${activeDeviceType}`,
        severity: 'block',
      });
    }
  }

  // --- LAYER 3: BRAND & MODEL COMPATIBILITY (especially laptops) ---
  const activeBrand = deviceContext?.brand?.toLowerCase().trim();
  const activeModel = deviceContext?.model?.toLowerCase().trim();

  // If candidate has brand/model constraints and active brand is set:
  if (activeBrand && candidate.compat.compatibleBrands && candidate.compat.compatibleBrands.length > 0) {
    const compatBrands = toTokens(candidate.compat.compatibleBrands);
    const matchesBrand = isUniversal(compatBrands) || compatBrands.includes(activeBrand);
    if (!matchesBrand) {
      reasons.push({
        message: `Not compatible with ${deviceContext?.brand} laptops`,
        severity: 'block',
      });
    } else {
      // Model check if model is given and candidate has model constraints
      if (activeModel && candidate.compat.compatibleModels && candidate.compat.compatibleModels.length > 0) {
        const compatModels = toTokens(candidate.compat.compatibleModels);
        const matchesModel = compatModels.some((m) => activeModel.includes(m) || m.includes(activeModel));
        if (!matchesModel) {
          reasons.push({
            message: `Verify model compatibility for "${deviceContext?.model}"`,
            severity: 'warn',
          });
        }
      }
    }
  }

  // Also check if any cart item specifies a brand (like an HP Charger)
  for (const item of cart) {
    const cartProd = item.product;
    // If cart item is brand-specific (e.g. HP charger, Dell battery)
    if (cartProd.compat.compatibleBrands && cartProd.compat.compatibleBrands.length > 0) {
      const cartBrands = toTokens(cartProd.compat.compatibleBrands);
      if (candidate.compat.compatibleBrands && candidate.compat.compatibleBrands.length > 0) {
        const candBrands = toTokens(candidate.compat.compatibleBrands);
        const hasOverlap =
          isUniversal(cartBrands) ||
          isUniversal(candBrands) ||
          cartBrands.some((b) => candBrands.includes(b));
        if (!hasOverlap) {
          reasons.push({
            message: `Brand mismatch with selected ${cartProd.name}`,
            severity: 'block',
            sourceProductId: cartProd.id,
            sourceProductName: cartProd.name,
          });
        }
      }
    }
  }

  // --- LAYER 1: GENERIC COMPATKEY MATCHING ---
  for (const item of cart) {
    const cartProd = item.product;

    for (const attr of attributes.filter((a) => a.compatKey)) {
      const key = attr.key;
      const appliesToCartProd = attr.categoryId === cartProd.categoryId;
      const appliesToCandidate = attr.categoryId === candidate.categoryId;

      // Only evaluate if both products share this concept (e.g. both RAMs, or both have the spec key defined)
      const bothDefineKey = (appliesToCartProd && appliesToCandidate) || 
        (cartProd.specs[key] !== undefined && candidate.specs[key] !== undefined);

      if (bothDefineKey) {
        const sourceVal = cartProd.specs[key] ?? cartProd.compat[key];
        const targetVal = candidate.specs[key] ?? candidate.compat[key];

        if (sourceVal !== undefined && targetVal !== undefined) {
          const sTokens = toTokens(sourceVal);
          const tTokens = toTokens(targetVal);

          const hasOverlap = sTokens.some((s) => tTokens.includes(s));
          if (!hasOverlap) {
            reasons.push({
              message: `${attr.label || key} mismatch: "${targetVal}" (your item has "${sourceVal}")`,
              severity: 'block',
              sourceProductId: cartProd.id,
              sourceProductName: cartProd.name,
            });
          }
        }
      }
    }
  }

  // --- LAYER 2: EXPLICIT FIRESTORE RULES ---
  for (const item of cart) {
    const cartProd = item.product;

    // Check rules where cart item is source and candidate is target
    const directRules = rules.filter(
      (r) => r.isActive && r.sourceCategoryId === cartProd.categoryId && r.targetCategoryId === candidate.categoryId
    );

    // Also check symmetric rules where candidate is source and cart item is target
    const reverseRules = rules.filter(
      (r) => r.isActive && r.sourceCategoryId === candidate.categoryId && r.targetCategoryId === cartProd.categoryId
    );

    for (const rule of directRules) {
      for (const constraint of rule.constraints) {
        const pass = evaluateConstraint(cartProd, candidate, constraint);
        if (pass === false) {
          reasons.push({
            message: rule.message || 'Incompatible with selected product',
            severity: rule.severity,
            sourceProductId: cartProd.id,
            sourceProductName: cartProd.name,
            ruleId: rule.id,
          });
        } else if (pass === undefined) {
          // Data is missing
          reasons.push({
            message: `Specification details missing to verify ${rule.message || 'compatibility'}`,
            severity: strict ? 'block' : 'info',
            sourceProductId: cartProd.id,
            sourceProductName: cartProd.name,
            ruleId: rule.id,
          });
        }
      }
    }

    for (const rule of reverseRules) {
      for (const constraint of rule.constraints) {
        const pass = evaluateConstraint(candidate, cartProd, constraint);
        if (pass === false) {
          reasons.push({
            message: rule.message || 'Incompatible with selected product',
            severity: rule.severity,
            sourceProductId: cartProd.id,
            sourceProductName: cartProd.name,
            ruleId: rule.id,
          });
        }
      }
    }
  }

  // --- DETERMINE OVERALL STATUS ---
  let status: CompatStatus = 'neutral';

  const hasBlockingIncompat = reasons.some((r) => r.severity === 'block');
  const hasWarning = reasons.some((r) => r.severity === 'warn');
  const hasInfo = reasons.some((r) => r.severity === 'info');

  if (hasBlockingIncompat) {
    status = 'incompatible';
  } else if (cart.length > 0) {
    // If not incompatible, did it actively match or complement something in cart?
    let activelyComplements = false;

    // Matches device context or related category
    for (const item of cart) {
      const cartProd = item.product;
      // 1. Same category (e.g. matching RAM stick)
      if (cartProd.categoryId === candidate.categoryId && candidate.id !== cartProd.id) {
        activelyComplements = true;
        reasons.unshift({
          message: `Matching memory for ${cartProd.name}`,
          severity: 'info',
          sourceProductId: cartProd.id,
          sourceProductName: cartProd.name,
        });
        break;
      }

      // 2. Cross-category match (e.g. laptop charger + laptop battery of same brand)
      if (
        cartProd.compat.compatibleBrands &&
        candidate.compat.compatibleBrands &&
        toTokens(cartProd.compat.compatibleBrands).some((b) =>
          toTokens(candidate.compat.compatibleBrands).includes(b)
        )
      ) {
        activelyComplements = true;
        reasons.unshift({
          message: `Compatible with your ${cartProd.name}`,
          severity: 'info',
          sourceProductId: cartProd.id,
          sourceProductName: cartProd.name,
        });
        break;
      }

      // 3. Matched common compat keys (e.g. DDR4 or SATA)
      for (const key of compatKeys) {
        if (cartProd.specs[key] && candidate.specs[key] && cartProd.specs[key] === candidate.specs[key]) {
          activelyComplements = true;
          break;
        }
      }
    }

    if (activelyComplements) {
      status = 'compatible';
    } else if (hasWarning) {
      status = 'check';
    } else if (hasInfo) {
      status = 'check';
    } else {
      status = 'neutral';
    }
  } else {
    // Cart is empty, but device context might be set
    if (activeDeviceType) {
      if (candidateDeviceType === activeDeviceType) {
        status = 'compatible';
      } else if (candidateDeviceScope === 'both') {
        status = 'neutral';
      }
    }
  }

  return { status, reasons };
}

/**
 * Validates whole cart for internal conflicts (e.g. two conflicting RAM types or mixed laptop/desktop).
 */
export function validateCartConflicts(
  cart: { product: ProductForCompat; qty: number }[],
  categories: CategoryForCompat[],
  attributes: AttributeForCompat[],
  rules: CompatRuleForEngine[],
  options: { strict?: boolean } = {}
): { hasConflicts: boolean; warnings: string[] } {
  const warnings: string[] = [];

  for (let i = 0; i < cart.length; i++) {
    for (let j = i + 1; j < cart.length; j++) {
      const p1 = cart[i].product;
      const p2 = cart[j].product;

      // Evaluate p2 against cart containing just p1
      const res = evaluateProductCompatibility({
        cart: [{ product: p1, qty: cart[i].qty }],
        candidate: p2,
        categories,
        attributes,
        rules,
        strict: options.strict,
      });

      if (res.status === 'incompatible') {
        const blockReason = res.reasons.find((r) => r.severity === 'block')?.message;
        warnings.push(`Conflict between "${p1.name}" and "${p2.name}": ${blockReason || 'Incompatible'}`);
      }
    }
  }

  return {
    hasConflicts: warnings.length > 0,
    warnings,
  };
}
