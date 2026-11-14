# Shared catalog normalization and quote policy

The catalog pipeline should normalize source rows before identity/upsert, while quote state should derive budget status from server-priced totals.

## What Happened

For the PC parts overhaul, category-specific derivation was isolated in
`src/lib/pcdata/normalizers.ts`; the seed script uses its stable external key
and merges imported fields without replacing administrator-owned values.
Rate-limit policy was also isolated from route handlers so routes share limits
and retry behavior.

## Takeaway

Keep normalization pure and deterministic, and keep quote budget state derived
from calculated totals rather than client-provided prices. A process-local
limiter is suitable for local fallback only; production should provide a
shared store behind the same result contract.

## History

- 2026-11-13 (konarkcomputers.in/pc-parts-overhaul): initial
