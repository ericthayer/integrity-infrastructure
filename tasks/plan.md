# Vanilla TypeScript + Vite migration

Approved by the user on `feat/vite-setup`.

## Objective and architecture

- Keep the existing designs and URLs; no framework, SPA router or redesign.
- `concepts/**/*.html` and `brandkit/index.html` become directly editable Vite HTML entries. Remove the duplicate `src/pages/` templates after migration.
- `/` opens the concepts hub; preserve the saved original homepage at `/reference/`.
- TypeScript owns the shared behaviors. GSAP and three.js are npm module imports, loaded only when their hooks are present.
- Generate only token CSS and icon data under ignored `src/generated/`. Token JSON remains authoritative. Vite watches token changes.
- Vite writes only `dist/`; Netlify publishes `dist/`, not the repository root.
- Keep the Oxygen/artifact export and component harness available through a separate `npm run build:ds`, writing legacy assets to `exports/`, never overwriting editable app pages.

## Commands and conventions

- Development: `npm run dev` (Vite, port 5173).
- Production: `npm run build` (prepare data, strict type check, Vite build).
- Preview: `npm run preview` (port 4173).
- Tests: `npm test` (Node test runner); design quality: `npm run check`.
- Design-system export: `npm run build:ds`.
- Keep existing semantic CSS classes, accessible markup and content. TypeScript uses explicit DOM types and guards, not suppressions or `any`.

## Verification and boundaries

- Test page input routes, token/icon generation, and build non-mutation of authored HTML/CSS/TS.
- Verify production output contains all pages and only publishable assets; no `/src/` or old `/dist/` references.
- Browser-test hub, four concepts and boards at desktop/mobile; test drawer, marquee, FAQ and Lit Fiber dialog/scene, including reduced motion.
- Compare screenshots and heading/label/radius values before/after.
- Preserve user edits and Git staging; do not commit, push, merge or deploy without a separate request.
- Existing unimplemented prototype links such as `contact.html` remain outside migration scope and must be documented.

## Risks

- Duplicate source/generated HTML caused edit loss: promote current editable pages and remove the page generation path entirely.
- Browser runtime depends on initialization order: module entry initializes shared behaviors before optional scene/motion loading.
- Design-system consumers require a classic global bundle: export the same typed runtime as a standalone IIFE using esbuild.
- Archived snapshot contains classic scripts: preserve it as a static reference, not a Vite application entry.