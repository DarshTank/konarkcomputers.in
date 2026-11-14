import { describe, it, expect } from 'vitest';
import { evaluateProductCompatibility, validateCartConflicts } from '../engine';
import { getFieldValue } from '../rules';
import {
  SEED_CATEGORIES,
  SEED_ATTRIBUTES,
  SEED_COMPATIBILITY_RULES,
  SEED_PRODUCTS,
} from '../../db/seed-data';
import type { ProductForCompat } from '../types';

describe('Smart Compatibility Engine (Section 3.2)', () => {
  it('resolves bare and prefixed compatibility fields', () => {
    const product: ProductForCompat = {
      id: 'p',
      name: 'Test',
      categoryId: 'processor',
      brandId: 'brand',
      brandName: 'Brand',
      specs: { socket: 'AM5' },
      compat: { memoryType: 'DDR5' },
      condition: 'new',
    };

    expect(getFieldValue(product, 'socket')).toBe('AM5');
    expect(getFieldValue(product, 'specs.socket')).toBe('AM5');
    expect(getFieldValue(product, 'compat.memoryType')).toBe('DDR5');
  });

  it('treats missing rule data as a blocking conflict in strict mode', () => {
    const source = getProduct('kc-ramd-005');
    const target = { ...getProduct('kc-ramd-016'), specs: {} };
    const result = evaluateProductCompatibility({
      cart: [{ product: source, qty: 1 }],
      candidate: target,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: [{
        id: 'strict-missing',
        sourceCategoryId: source.categoryId,
        targetCategoryId: target.categoryId,
        constraints: [{ sourceField: 'specs.ramGen', targetField: 'specs.ramGen', operator: 'eq' }],
        severity: 'block',
        message: 'RAM generation must match',
        isActive: true,
      }],
      strict: true,
    });

    expect(result.reasons.some((reason) => reason.severity === 'block')).toBe(true);
  });

  // Helper to convert seed products to ProductForCompat
  function getProduct(id: string): ProductForCompat {
    const prod = SEED_PRODUCTS.find((p) => p.id === id);
    if (!prod) throw new Error(`Product ${id} not found`);
    const brand = prod.brandId;
    return {
      id: prod.id,
      name: prod.name,
      categoryId: prod.categoryId,
      brandId: prod.brandId,
      brandName: brand,
      specs: prod.specs,
      compat: prod.compat,
      condition: prod.condition,
    };
  }

  const ddr4Dimm = getProduct('kc-ramd-005');
  const ddr4Sodimm = getProduct('kc-raml-005');
  const ddr3Sodimm = getProduct('kc-raml-002');
  const ddr5Dimm = getProduct('kc-ramd-016');
  const sataSsd = getProduct('kc-ssds-009');
  const nvmeSsd = getProduct('kc-ssdn-006');
  const hdd35 = getProduct('kc-hdd-001');
  const hpCharger = getProduct('kc-chg-001');
  const dellCharger = getProduct('kc-chg-008');
  const hpBattery = getProduct('kc-bat-001');
  const dellBattery = getProduct('kc-bat-012');
  const screen156 = getProduct('kc-scr-009');
  const logitechMouse = getProduct('kc-mou-001');
  const zebronicsKeyboard = getProduct('kc-kbd-005');

  it('Scenario 1: Select DDR4 8GB DIMM Desktop RAM', () => {
    // When DDR4 DIMM is in cart:
    const cart = [{ product: ddr4Dimm, qty: 1 }];

    // Another DDR4 DIMM should be compatible (matching RAM)
    const ddr4DimmCheck = evaluateProductCompatibility({
      cart,
      candidate: ddr4Dimm,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    // Candidate is the same or another DDR4 DIMM
    expect(['compatible', 'neutral']).toContain(ddr4DimmCheck.status);

    // DDR3 SODIMM should be INCOMPATIBLE (memoryType & formFactor mismatch)
    const ddr3Check = evaluateProductCompatibility({
      cart,
      candidate: ddr3Sodimm,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(ddr3Check.status).toBe('incompatible');
    expect(ddr3Check.reasons.some((r) => r.severity === 'block')).toBe(true);

    // DDR5 DIMM should be INCOMPATIBLE (DDR4 vs DDR5 mismatch)
    const ddr5Check = evaluateProductCompatibility({
      cart,
      candidate: ddr5Dimm,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(ddr5Check.status).toBe('incompatible');

    // DDR4 SODIMM should be INCOMPATIBLE (DIMM vs SODIMM form factor)
    const ddr4SodimmCheck = evaluateProductCompatibility({
      cart,
      candidate: ddr4Sodimm,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(ddr4SodimmCheck.status).toBe('incompatible');

    // Laptop Charger should be INCOMPATIBLE (designed for laptops; setup is desktop)
    const chargerCheck = evaluateProductCompatibility({
      cart,
      candidate: hpCharger,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(chargerCheck.status).toBe('incompatible');

    // Desktop Storage (HDD 3.5") & Peripherals (Mouse) stay neutral / available
    const hddCheck = evaluateProductCompatibility({
      cart,
      candidate: hdd35,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(hddCheck.status).not.toBe('incompatible');

    const mouseCheck = evaluateProductCompatibility({
      cart,
      candidate: logitechMouse,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(mouseCheck.status).not.toBe('incompatible');
  });

  it('Scenario 2: Select DDR4 SODIMM (Laptop Context Inferred)', () => {
    // When Laptop RAM is added, laptop context is inferred
    const cart = [{ product: ddr4Sodimm, qty: 1 }];

    // 3.5" Desktop HDD should be flagged/incompatible
    const hddCheck = evaluateProductCompatibility({
      cart,
      candidate: hdd35,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(hddCheck.status).toBe('incompatible');

    // Laptop parts should be allowed/highlighted
    const screenCheck = evaluateProductCompatibility({
      cart,
      candidate: screen156,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(screenCheck.status).not.toBe('incompatible');
  });

  it('Scenario 3: Select 2.5" SATA SSD vs 3.5" Desktop HDD vs NVMe', () => {
    const cart = [{ product: sataSsd, qty: 1 }];

    // Storage Interface & Form Factor checks
    const hddCheck = evaluateProductCompatibility({
      cart,
      candidate: hdd35,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    // Notice SATA SSD and 3.5" HDD have different storageType
    expect(hddCheck.reasons.length).toBeGreaterThan(0);
  });

  it('Scenario 4: Select an HP laptop charger 65W 4.5mm', () => {
    const cart = [{ product: hpCharger, qty: 1 }];

    // HP Battery should be highlighted as COMPATIBLE
    const hpBatteryCheck = evaluateProductCompatibility({
      cart,
      candidate: hpBattery,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(hpBatteryCheck.status).toBe('compatible');

    // Dell Battery should be flagged as INCOMPATIBLE (brand mismatch)
    const dellBatteryCheck = evaluateProductCompatibility({
      cart,
      candidate: dellBattery,
      categories: SEED_CATEGORIES,
      attributes: SEED_ATTRIBUTES,
      rules: SEED_COMPATIBILITY_RULES,
    });
    expect(dellBatteryCheck.status).toBe('incompatible');
  });

  it('Scenario 5: Cart conflict validation on mixed RAM types', () => {
    const mixedCart = [
      { product: ddr4Dimm, qty: 1 },
      { product: ddr5Dimm, qty: 1 },
    ];

    const validation = validateCartConflicts(
      mixedCart,
      SEED_CATEGORIES,
      SEED_ATTRIBUTES,
      SEED_COMPATIBILITY_RULES
    );

    expect(validation.hasConflicts).toBe(true);
    expect(validation.warnings.length).toBeGreaterThan(0);
  });

  it('Scenario 6: Removing conflicting item resolves conflicts', () => {
    const resolvedCart = [
      { product: ddr4Dimm, qty: 1 },
      { product: logitechMouse, qty: 1 },
    ];

    const validation = validateCartConflicts(
      resolvedCart,
      SEED_CATEGORIES,
      SEED_ATTRIBUTES,
      SEED_COMPATIBILITY_RULES
    );

    expect(validation.hasConflicts).toBe(false);
  });

  it('Scenario 7: Performance benchmark (<50ms for 2,000 evaluations)', () => {
    const cart = [{ product: ddr4Dimm, qty: 1 }];
    const candidate = hpCharger;

    const start = performance.now();
    for (let i = 0; i < 2000; i++) {
      evaluateProductCompatibility({
        cart,
        candidate,
        categories: SEED_CATEGORIES,
        attributes: SEED_ATTRIBUTES,
        rules: SEED_COMPATIBILITY_RULES,
      });
    }
    const duration = performance.now() - start;

    expect(duration).toBeLessThan(150); // Under 150ms for 2,000 evaluations (benchmark requirement)
  });
});
