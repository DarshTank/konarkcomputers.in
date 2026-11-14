import { describe, expect, it } from 'vitest';
import { normalizePcPart } from '../normalizers';

describe('PC part normalizers', () => {
  it('derives stable processor fields and identity', () => {
    const row = { name: ' Ryzen 7 7800X3D ', core_count: 8, core_clock: 4.2, boost_clock: 5, graphics: 'None' };
    const first = normalizePcPart('processor', row);
    const second = normalizePcPart('processor', row);
    expect(first.externalKey).toBe(second.externalKey);
    expect(first.name).toBe('Ryzen 7 7800X3D');
    expect(first.specs).toMatchObject({ cores: 8, baseClockGhz: 4.2, boostClockGhz: 5 });
    expect(first.derivedFields).toContain('cores');
  });

  it('normalizes category-specific motherboard socket', () => {
    const result = normalizePcPart('motherboard', { name: 'Board', socket: 'am5', form_factor: 'ATX' });
    expect(result.specs.socket).toBe('AM5');
    expect(result.specs.formFactor).toBe('ATX');
  });

  it('rejects malformed rows without a name', () => {
    expect(() => normalizePcPart('processor', { price: 99 })).toThrow(/name is required/);
  });
});
