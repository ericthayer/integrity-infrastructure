# Website v1: phases and verification

Spec: `tasks/website-spec.md`. Authoring rules: `tasks/website-authoring.md`.

- [x] Phase 0. Spec: objectives, decisions, page stacks, components, a11y and performance rules, open client inputs.
- [x] Phase 1. Foundation: seven page shells at clean URLs (Home replaces the root redirect), `src/website.ts` entry, site CSS layer, URL prefill, AVIF/WebP photo variants and a 360px logo, icon helper, sample Paylocity feed, Vite inputs and test wiring, `tests/website.test.mjs`. Components built in parallel: CoverageMap and RouteDiagram.
- [x] Phase 2. Pages built in parallel: Home; Services; About and Safety; Careers; Subcontractors and Contact. Follow-ups folded in: two-col spacing, 44px breadcrumb targets, topic-aware required fields, scene pause control (WCAG 2.2.2), scroll-driven route pulse, capped map glow, responsive photos in the service sheet, empty favicon link.
- [x] Phase 3. QA and an independent final review against the spec. Fixed from review: Topic-dependent fields after back/forward navigation, `fetchpriority` on Safety's LCP photo, the one-crew claim (now one contractor), an unsourced fifth safety practice, required documents and headquarters stated as fact, an unenforced file limit, a missing pending marker, the map how-to comment, the new-tab announcement on rendered job links. Tests now also cover markup (alt, labels, metadata) for sister-company names, the fleet photo in `srcset`, prefill link values, the no-JS required fallback and tagline placement.

## Verification (2026-10-15)

- `npm run verify`: 47 unit tests, design checks (contrast matrix, copy and eyebrow rules on all website pages and site partials), production build, 38 production tests. All pass.
- Production preview (`vite preview`), all seven pages at 390 and 1280 px:
  - axe (WCAG 2.0 to 2.2 A and AA tags): 0 violations on all 14 runs.
  - Horizontal overflow 0; no console errors; no failed requests.
  - Inner pages: 37 KB JS uncompressed on first load, no GSAP or three.js. Home loads GSAP and three.js as dynamic chunks after the page.
  - LCP is the H1, the header photo (`fetchpriority="high"`) or text on every page.
- Keyboard: skip link lands on `main`; the drawer takes focus, traps Tab, closes on Escape and returns focus to its toggle; no focused element in `main` is hidden under the island header.
- Behaviors in a real browser: `/contact/?topic=safety&service=boring#quote` preselects Safety documents and Boring; empty submits show and focus the error summary; demo submits show the success notice; the service sheet opens per tile and closes on Escape; the hero scene pauses and resumes; the job list renders the sample feed and its empty and error states.

## Review prep (2026-10-19)

- Review deploy hides `/concepts/*` and `/brandkit/*` with 404 rules in `netlify.toml` (they still carry the Corps lockup line and the fleet photo); `/reference/` stays. Check on the deploy preview that `/concepts/lit-fiber/` returns the 404 page: not testable locally. A custom `404.html` does not exist yet, so Netlify's default 404 shows.
- Contact and Subcontractor forms submit through Netlify Forms. Needs a deploy to register the forms, then an email notification per form in the Netlify UI. Not verifiable until deployed.
- Elements visible at load skip the scroll reveal (`reveal-seen.ts`): unscrolled axe at default motion is clean on all seven pages at 390 and 1280.
- Client note: `tasks/client-review-note.md`.
- `npm run verify`: 58 unit tests and 38 production tests pass; production QA clean on 14 runs.

## Phase 4: handoff prep (2026-10-19)

Decisions: production is WordPress, built by another developer team; the theme or builder is not decided and Oxygen is not assumed. The static HTML/CSS/TS is the handoff. Paylocity production wiring, photography and deployment configuration belong to the developers; `netlify.toml` stays as review scaffolding.

- [x] Vector reversed logo (no Corps line) on every page's shell; drawer puts the call link above the quote button.
- [x] `HANDOFF.md`: builder-neutral developer brief (sources, behavior contracts, review-only scaffolding, content model, requirements). README and spec updated for the WordPress target.
- [x] Design-system cleanup: Corps line, ISP installation, the fleet photo and tagline-as-footer removed from DS docs, all 38 component guidelines ("Oxygen" sections now builder-neutral "WordPress"), previews and partials; form, footer, services, hero, FAQ, reasons and job-list partials match the pages; the DS header and footer use the vector logo.
- [x] Favicon (cropped from the vector logo, `tools/favicon.mjs`), `public/sitemap.xml`, `404.html` (covered by `tests/not-found.test.mjs` and the production tests).
- [ ] Design-system artifact upload (site owner, before handoff): run `npm run build:ds`, upload `exports/design-system/project/`, and upload the new `Logos/integrity-infrastructure-logo.svg` so its blob id lands in `design-system/asset-map.json` (until then `build:ds` warns and the header and footer previews show a pending image).

Verification (2026-10-19): `npm run verify` passes (64 unit tests, design checks, 39 production tests); production QA on the seven pages and the 404 at 390 and 1280: 0 axe violations, no overflow, no console errors, no failed requests.

## Owned by the WordPress developers

- Theme or builder, hosting, deployment and indexing config (remove `noindex` and the review `netlify.toml` rules; the concept prototypes, brand boards and `/reference/` are not part of the site).
- Form plugin and per-Topic routing; Paylocity integration; WordPress sitemap, Site Icon and 404 template; 301 redirects from the live site.
- Photography from the client during the WordPress build; content entry for every `ii-pending` value.

## Follow-ups (optional)

- Fold the website components (lit page header, coverage map, route diagram, testimonial set, offices, scene toggle, topic fields, reveal-seen) into `src/ds/components/` previews and the design-system export, if the developers want classic bundles that include the website layer.
- A shared `.ii-form-shell` for the Contact and Subcontractors form panels.
- Client inputs listed in the spec, section 9.
