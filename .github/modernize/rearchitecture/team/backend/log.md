## [pc-parts-overhaul] PC parts pipeline and quote safeguards
- Added pure category normalizers, deterministic seed identity, dry-run reseeding,
  shared rate-limit policy, quote budget/swap/refresh state, tests, and runbook.
- Build initially conflicted with orphaned Next processes holding `.next/trace`;
  isolated build succeeded after stopping those build/dev processes.
- Learnings consumed: none.
