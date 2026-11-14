// Compatibility Rule Evaluation
// Pure functions for evaluating compatibility constraints

import type { CompatRuleForEngine, ProductForCompat } from './types';

/**
 * Get a field value from a product's specs or compat object.
 * Field paths: "specs.memoryType", "compat.deviceType", "compat.compatibleBrands".
 * Bare keys are accepted for compatibility with older seeded rules.
 */
export function getFieldValue(
  product: ProductForCompat,
  fieldPath: string
): unknown {
  const parts = fieldPath.split('.');
  const root = parts[0];
  const key = parts.slice(1).join('.');

  if (root === 'specs' && key) {
    return product.specs[key];
  }
  if (root === 'compat' && key) {
    return product.compat[key];
  }
  if (parts.length === 1) {
    return product.specs[fieldPath] ?? product.compat[fieldPath];
  }
  // Direct field access
  if (fieldPath in product) {
    return ((product as unknown) as Record<string, unknown>)[fieldPath];
  }
  return undefined;
}

/**
 * Normalize a value to lowercase string(s) for comparison.
 */
function normalizeValue(val: unknown): string | string[] | number | boolean | undefined {
  if (val === undefined || val === null || val === '') return undefined;
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val;
  if (typeof val === 'string') return val.toLowerCase().trim();
  if (Array.isArray(val)) {
    return val.map((v) => String(v).toLowerCase().trim());
  }
  return String(val).toLowerCase().trim();
}

/**
 * Evaluate a single constraint between a source and target product.
 * Returns true if the constraint is SATISFIED (products are compatible).
 * Returns false if the constraint is VIOLATED (products are incompatible).
 * Returns undefined if data is missing on either side.
 */
export function evaluateConstraint(
  source: ProductForCompat,
  target: ProductForCompat,
  constraint: CompatRuleForEngine['constraints'][0]
): boolean | undefined {
  const sourceRaw = getFieldValue(source, constraint.sourceField);
  const targetRaw = getFieldValue(target, constraint.targetField);

  const sourceVal = normalizeValue(sourceRaw);
  const targetVal = normalizeValue(targetRaw);

  // If either side is missing, we can't evaluate
  if (sourceVal === undefined || targetVal === undefined) {
    return undefined;
  }

  switch (constraint.operator) {
    case 'eq': {
      // Both should be equal (string or number comparison)
      const s = Array.isArray(sourceVal) ? sourceVal[0] : sourceVal;
      const t = Array.isArray(targetVal) ? targetVal[0] : targetVal;
      return s === t;
    }

    case 'in': {
      // Source value should be IN target array (or vice versa)
      const sArr = Array.isArray(sourceVal) ? sourceVal : [sourceVal];
      const tArr = Array.isArray(targetVal) ? targetVal : [targetVal];
      return sArr.some((s) => tArr.includes(s as string));
    }

    case 'intersects': {
      // Both arrays should have at least one common element
      const sArr = Array.isArray(sourceVal) ? sourceVal : [sourceVal];
      const tArr = Array.isArray(targetVal) ? targetVal : [targetVal];
      return sArr.some((s) => tArr.includes(s as string));
    }

    case 'lte': {
      // Source value <= target value (numeric)
      const s = typeof sourceVal === 'number' ? sourceVal : parseFloat(String(sourceVal));
      const t = typeof targetVal === 'number' ? targetVal : parseFloat(String(targetVal));
      if (isNaN(s) || isNaN(t)) return undefined;
      return s <= t;
    }

    case 'gte': {
      // Source value >= target value (numeric)
      const s = typeof sourceVal === 'number' ? sourceVal : parseFloat(String(sourceVal));
      const t = typeof targetVal === 'number' ? targetVal : parseFloat(String(targetVal));
      if (isNaN(s) || isNaN(t)) return undefined;
      return s >= t;
    }

    default:
      return undefined;
  }
}

/**
 * Evaluate a complete compatibility rule between two products.
 * All constraints must be satisfied for the rule to pass.
 * Returns: { passed: boolean, violations: string[], dataGaps: boolean }
 */
export function evaluateRule(
  source: ProductForCompat,
  target: ProductForCompat,
  rule: CompatRuleForEngine
): { passed: boolean; violations: string[]; dataGaps: boolean } {
  const violations: string[] = [];
  let hasDataGap = false;

  for (const constraint of rule.constraints) {
    const result = evaluateConstraint(source, target, constraint);
    if (result === undefined) {
      hasDataGap = true;
    } else if (!result) {
      // Format a human-readable violation message
      const sourceVal = getFieldValue(source, constraint.sourceField);
      const targetVal = getFieldValue(target, constraint.targetField);
      violations.push(
        `${constraint.sourceField.split('.').pop()}: "${sourceVal}" vs "${targetVal}"`
      );
    }
  }

  return {
    passed: violations.length === 0 && !hasDataGap,
    violations,
    dataGaps: hasDataGap,
  };
}
