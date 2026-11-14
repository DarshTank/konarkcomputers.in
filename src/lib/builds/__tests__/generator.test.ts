import { describe, expect, it } from 'vitest';
import { generateBuilds } from '../generator';
import { DEFAULT_BUILD_CONFIG, DEFAULT_BUILD_PROFILES } from '../config';

const catalog = {
  products: [],
  categories: [],
  attributes: [],
  rules: [],
  services: [],
  profiles: DEFAULT_BUILD_PROFILES,
  taxSettings: { shopStateCode: 24, roundOff: true },
} as any;

describe('build generator invariants', () => {
  it('rejects invalid and out-of-profile budgets deterministically', () => {
    expect(generateBuilds({ platform: 'intel', budgetPaise: 0 }, catalog, DEFAULT_BUILD_CONFIG).reason)
      .toBe('BUDGET_TOO_LOW');
    expect(generateBuilds({ platform: 'intel', budgetPaise: 3500000 }, catalog, DEFAULT_BUILD_CONFIG).reason)
      .toBe('BUDGET_TOO_LOW');
  });

  it('handles a representative empty catalog without throwing', () => {
    const result = generateBuilds({ platform: 'ryzen', budgetPaise: 10000000 }, catalog, DEFAULT_BUILD_CONFIG);
    expect(result.builds).toEqual([]);
    expect(result.reason).toBe('NO_PARTS');
  });
});
