# Website v1: phases and verification

Spec: `tasks/website-spec.md`. Authoring rules: `tasks/website-authoring.md`.

- [x] Phase 0. Spec: objectives, decisions, page stacks, components, a11y and performance rules, open client inputs.
- [x] Phase 1. Foundation: seven page shells at clean URLs (Home replaces the root redirect), `src/website.ts` entry, site CSS layer, URL prefill, AVIF/WebP photo variants and a 360px logo, icon helper, sample Paylocity feed, Vite inputs and test wiring, `tests/website.test.mjs`. Components built in parallel: CoverageMap and RouteDiagram.
- [x] Phase 2. Pages built in parallel: Home; Services; About and Safety; Careers; Subcontractors and Contact. Follow-ups folded in: two-col spacing, 44px breadcrumb targets, topic-aware required fields, scene pause control (WCAG 2.2.2), scroll-driven route pulse, capped map glow, responsive photos in the service sheet, empty favicon link.
- [ ] Phase 3. QA and independent review, then push.

## Verification (2026-10-15)

- `npm run verify`: 45 unit tests, design checks (contrast matrix, copy and eyebrow rules on all website pages and site partials), production build, 38 production tests. All pass.
- Production preview (`vite preview`), all seven pages at 390 and 1280 px:
  - axe (WCAG 2.0 to 2.2 A and AA tags): 0 violations on all 14 runs.
  - Horizontal overflow 0; no console errors; no failed requests.
  - Inner pages: 37 KB JS uncompressed on first load, no GSAP or three.js. Home loads GSAP and three.js as dynamic chunks after the page.
  - LCP is the H1, the header photo (`fetchpriority="high"`) or text on every page.
- Keyboard: skip link lands on `main`; the drawer takes focus, traps Tab, closes on Escape and returns focus to its toggle; no focused element in `main` is hidden under the island header.
- Behaviors in a real browser: `/contact/?topic=safety&service=boring#quote` preselects Safety documents and Boring; empty submits show and focus the error summary; demo submits show the success notice; the service sheet opens per tile and closes on Escape; the hero scene pauses and resumes; the job list renders the sample feed and its empty and error states.

## Follow-ups outside v1

- Design system: fold the website components (lit page header, coverage map, route diagram, testimonial set, offices, scene toggle, topic fields) into `src/ds/components/` previews and the Oxygen export.
- Partials: update `src/partials/forms/*.html` (Topic select, keyed service lines, fix-it errors), `src/partials/careers/job-list.html` (no inline style, neutral empty copy, root-absolute links) and `src/partials/sections/values-rail.html` (keyboard region) to match the pages.
- A shared `.ii-form-shell` for the Contact and Subcontractors form panels.
- Client inputs listed in the spec, section 9.
