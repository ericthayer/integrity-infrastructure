# Migration tasks

- [x] Tooling: Vite/TypeScript configuration, token/icon generation, scripts and tests. Verify hub builds.
- [x] Runtime: typed behavior module and npm-based optional motion/scene imports. Verify strict typecheck and interactions.
- [x] Pages: convert hub/Work Light/As-Built, then Crew/Lit Fiber/boards; remove duplicate templates. Verify page content survives build.
- [x] Reference and exports: archive root snapshot, separate DS/harness export. Verify export never writes app pages.
- [x] Deployment/docs: publish `dist/`, document editable paths and commands. Verify clean checkout build.
- [x] Final QA: tests, design checks, browser comparisons, production asset checks, and an independent code review.

## Final verification (2026-10-02)

- `npm run verify` passed in the workspace and in an isolated source copy without `src/generated/`, `dist/` or `exports/` (using the installed dependencies).
- 32 regression tests and 31 production tests passed, along with TypeScript, token/contrast/copy checks and `git diff --check`.
- Regression tests protect 240 authored files against changes by either build and verify that the standalone export leaves production output unchanged.
- Final review found and resolved a cold-start test dependency: `pretest` now prepares token/icon data before test discovery. Follow-up review approved the fix.
- Production browser smoke: hub, all four concepts and brand boards at 1280px and 390px; no horizontal overflow, console warnings/errors or HTTP resource failures. Scene canvases mounted on Lit Fiber and the boards; `/` redirected to `/concepts/`.
- Non-blocking warning: the dynamically loaded Three.js chunk exceeds Vite's 500 kB advisory threshold. It remains separate from the hub's initial bundle; the threshold was not raised.
- Migration remains on `feat/vite-setup`; no commit, push, merge or deployment performed during final wrap-up.
