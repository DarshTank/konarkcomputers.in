import { describe, expect, it } from 'vitest';
import { checkRateLimit } from '../rate-limit';

describe('shared rate-limit policy', () => {
  it('enforces limits and resets at the window boundary', () => {
    const policy = { limit: 2, windowMs: 1000 };
    expect(checkRateLimit('test-rate-limit', policy, 1000).allowed).toBe(true);
    expect(checkRateLimit('test-rate-limit', policy, 1001).allowed).toBe(true);
    expect(checkRateLimit('test-rate-limit', policy, 1002).allowed).toBe(false);
    expect(checkRateLimit('test-rate-limit', policy, 2000).allowed).toBe(true);
  });
});
