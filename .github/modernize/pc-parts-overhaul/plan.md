# Modernization Plan: PC Parts Overhaul

**Project**: konarkcomputers.in
**Scope**: PC-part catalog data, seeding, administration, quote/build generation,
and operational readiness.

## Technical Framework

- **Language**: TypeScript / React
- **Framework**: Next.js 15
- **Build Tool**: npm
- **Database**: Firebase Firestore (with local/static seed fallbacks)
- **Key Dependencies**: Firebase Admin/Client, Zod, Vitest, pdf-lib, Next.js

## Overview

The application will receive a coordinated overhaul of its PC-parts data
pipeline and quote/build experience. Existing catalog, quote, and admin
capabilities remain available while the work improves data correctness,
repeatable seeding, operational safety, and user-facing budget feedback.

The work is intentionally scoped to the eight requested areas. It must preserve
unrelated worktree changes, avoid destructive database operations (including
blind wipes), and retain ownership-managed catalog fields during seed/reseed.

## Migration Impact Summary

| Area | Current Surface | Target Outcome | Validation |
|---|---|---|---|
| Catalog data | Seed data and catalog loader | Category-specific normalized parts | Fixtures and unit tests |
| Data operations | Firestore seed/reseed scripts | Idempotent ownership-safe writes | Dry-run and repeat runs |
| Admin | Admin catalog pages/APIs | Server pagination, bulk, CSV, settings | Focused route/UI tests |
| API protection | Route handlers | Shared rate-limit policy | Deterministic limit tests |
| Quotes | Quote context and builder | Budget, swaps, refresh, over-budget state | Component/API tests |
| Builds/PDF | Generator and PDF route | Consistent build context | Generator/PDF tests |
| Quality | Existing Vitest suites | Property, performance, integration coverage | npm test/typecheck/build |
| Operations | Scripts and deployment behavior | Safe runbook and recovery guidance | Runbook review |

## Delivery Sequence

1. Establish a frozen baseline and focused validation commands.
2. Normalize category data and formalize derivation rules.
3. Make seed/reseed repeatable and split storage responsibilities safely.
4. Improve admin catalog operations and build settings.
5. Add shared rate limiting.
6. Deliver quote budget/swap/refresh behavior.
7. Align quote/build/PDF context and complete generator test coverage.
8. Document operations, rollback/recovery, and verification.

## Guardrails and Validation

- Do not run `pcdata:wipe` or introduce destructive database migrations.
- Use deterministic IDs/upserts and preserve admin-owned pricing, publishing,
  stock, images, descriptions, overrides, and other manually maintained fields.
- Keep unrelated worktree changes untouched; modify only files required by the
  selected task.
- Add fixtures/tests for each changed normalizer, route contract, and
  user-visible quote state.
- Focused validation must include `npm test`, `npx tsc --noEmit`, and
  `npm run build`; document any required environment variables or unavailable
  external services.

## Open Questions & Questionnaire

- [ ] Confirm the production rate-limit backing store and limits per route.
- [ ] Confirm whether CSV exports/imports are admin-only and the maximum upload
  size.
- [ ] Confirm the desired quote budget currency/rounding policy if it differs
  from the existing paise-based pricing model.
- [ ] Confirm the production PDF asset/font requirements.
