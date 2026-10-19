# Website v1 spec: Lit Fiber, seven pages

Status: approved direction (client chose Lit Fiber). First pass, static HTML/CSS/TS on the existing Vite pipeline. Target review: Bradley Eigenberg and Alec Archer-Bishop now; Jeff joins at about 90% with BugHerd.

Production: WordPress, built by another developer team from this static build (theme or page builder not decided; Oxygen is not assumed). This build is the design and front-end reference; [`HANDOFF.md`](../HANDOFF.md) is the developer brief.

## 1. Objective

Ship the Integrity Infrastructure website as seven real pages in the Lit Fiber concept, presenting the company as a credible, independent fiber and utility construction contractor. The bar is North Sky Communications on content and professionalism; v1 should beat it on safety evidence, footprint and third-party proof (North Sky shows none of the three on its home page).

### Success criteria

| # | Criterion | How it is checked |
|---|---|---|
| S1 | Seven pages live at clean URLs: `/`, `/about/`, `/services/`, `/safety/`, `/careers/`, `/subcontractors/`, `/contact/` | `tests/website.test.mjs`, production build |
| S2 | No site copy or link presents Integrity Infrastructure as part of Integrity Corps | test: no "Integrity Corps" text, no Integrity Traffic links, fleet photo with sister-company trucks not used |
| S3 | Service copy says long-haul fiber construction and infrastructure brought to residential locations; never in-home installation | test: no "ISP installation"; Services page carries the route (scope) diagram |
| S4 | A U.S. map shows licensed and expansion states, with a text equivalent | Services `#coverage` and Home `#footprint`; list of states per status in HTML |
| S5 | Safety, certifications and diligence documents get a dedicated page and a Home teaser | Safety page sections 3 to 6 |
| S6 | Careers is a dedicated landing page with a Paylocity integration point | JobList fed from a same-origin JSON stub; fallback link to the Paylocity board |
| S7 | Testimonials carry the integrity pillar with named third-party sources | Home proof section; slots for further reviews |
| S8 | WCAG 2.2 AA | axe scan of all seven pages at 390 and 1280 px: zero violations; keyboard pass; `npm run check` contrast matrix |
| S9 | Performance | Inner pages load no GSAP and no three.js; responsive AVIF/WebP images with dimensions; LCP image (if any) `fetchpriority="high"`, never lazy; initial JS for inner pages under 50 KB gzip |
| S10 | `npm run verify` passes | CI gate on Netlify (review deploy) |
| S11 | The handoff is builder-neutral | `HANDOFF.md`: sources, behavior contracts, review-only scaffolding, content model; no Oxygen dependency |

## 2. Decisions (opinionated, flagged where the client must confirm)

1. **URLs and files.** Pages are authored at `index.html`, `about/index.html`, `services/index.html`, `safety/index.html`, `careers/index.html`, `subcontractors/index.html`, `contact/index.html`. Root `/` becomes Home (it no longer redirects); the concept hub stays at `/concepts/`, boards at `/brandkit/`, the original site at `/reference/`. Slugs match the WordPress page slugs in `design-system/project/page-blueprints.md`.
2. **Links** are root-absolute (`/services/`, `/contact/#quote`). Assets are root-absolute (`/src/img/...`); Vite rewrites them to hashed `/assets/` URLs.
3. **One theme**: `<html lang="en" data-theme="lit-fiber">` on every page. No concept bar on website pages.
4. **One entry**: `<script type="module" src="/src/website.ts">`. It imports the same shared runtime modules as `main.ts` (not `main.ts` itself, so each page ships one entry script), the site CSS layer and the website behaviors. Concept pages keep `main.ts` and are not touched.
5. **Motion budget.** Home keeps the full Lit Fiber stack (scene, word masks, magnetic pills, card stack, values rail, service sheet). Inner pages are GSAP-free and three.js-free: no `data-ii-words`, `data-ii-magnetic`, `data-ii-stack`, `data-ii-rail`, `data-ii-scene`. They use CSS reveals (`data-ii-reveal`), glass shells, pointer glow and cross-document view transitions only.
6. **Corps separation.** Remove "An Integrity Corps company" everywhere, remove the Facebook link (it points to Integrity Traffic), drop the "Integrity Corps family" About section from the blueprint, and do not use `fleet-mountains.jpg` (it shows Integrity Traffic and Integrity Equipment Services trucks). About states the company is independent, with its own leadership, crews and offices, without naming the former parent.
   - **Logo**: the site uses the vector reversed lockup `src/img/logo/integrity-infrastructure-logo.svg`, which drops the "an integrity corps company" line (added 2026-10-19). The PNG lockups still carry the line and are not used on the site. Client to approve the vector lockup; `conduit-reel.jpg` still shows the old line on a crew shirt.
7. **Service scope.** Two layers:
   - *Where we build* (the route): Long-haul backbone, Middle mile, Neighborhood distribution, To the home. A fifth, muted node, "In-home installation: not our scope", makes the boundary explicit.
   - *How we build it* (five service lines, the bento and the Services page sections): **Long-haul fiber construction** (`#long-haul`, new, lead tile), **Fiber splicing** (`#fiber-splicing`), **Boring** (`#boring`), **Aerial installations** (`#aerial-installation`), **Concrete and asphalt restoration** (`#restoration`).
   - "ISP installation" is retired: the live copy ("residential and commercial ISP installation") describes exactly the indoor work the client says it does not do. Old anchor `#isp-installation` is not kept.
   - Client to confirm: where the build stops (for example, drop to an exterior terminal).
8. **Coverage map** is a tile-grid cartogram (one equal tile per state, postal code inside), not geographic paths: every state is legible at 375 px including the Northeast, no map data dependency, about 4 KB of HTML. Status per tile via `data-status="office|licensed|expansion"`; statuses are shown by fill **and** a glyph pattern plus legend, never by color alone. The visual grid is `aria-hidden`; the accessible content is a visible list of states per status beside it.
   - Known: Oregon and Colorado have offices. Licensed and expansion states are client inputs, rendered as `ii-pending` until supplied. Data is authored in the HTML (attributes and list), documented in the component comment.
9. **Paylocity.** Careers uses the existing JobList (`[data-ii-jobs][data-src]`). v1 points it at a same-origin stub `/data/jobs.json` (Vite `public/`, sample roles labeled "(sample)"). Production options, in order: the WordPress Paylocity plugin's markup styled with `ii-job*` classes; a server-side proxy of the Recruiting job feed (the feed is customer-provisioned and authenticated, so never fetched from the browser); last resort an iframe in `ii-embed`. A direct link to the company's Paylocity board (`recruiting.paylocity.com/Recruiting/Jobs/All/<companyId>`, client to provide) is always visible. Production wiring is owned by the WordPress developers.
10. **Tagline.** "Build by building people" appears on Careers (page title) and About (mission section) only; not in the footer or on Home. Working copy until Bradley confirms with Jeff.
11. **Brand pillars to copy.** Mission-oriented, top-quality execution, honest, professional, integrity. Differentiators, in this order: accurate billing, quality execution, investment in people. The Home card stack carries them.
12. **Pending data** never gets a plausible guess: `ii-pending` "Client to provide". Applies to metrics, license numbers, licensed states, leadership, history, benefits, insurance minimums.
13. **Forms** (Contact quote, Subcontractor inquiry) submit through Netlify Forms on the review deploy (`data-netlify`, honeypot, `src/behaviors/netlify-forms.ts`); the concept pages and design-system previews keep demo mode (`data-ii-demo`). The production WordPress build replaces this with the chosen form plugin. Submissions reach people only after notifications are set per form in the Netlify UI. Contact preselects its topic and service from the URL (`/contact/?topic=safety#quote`, `?service=boring`).
14. **Staging.** All pages keep `<meta name="robots" content="noindex">`. BugHerd is added through Netlify snippet injection (site settings), not in source.
15. **Platform and handoff.** Production is WordPress; the theme or builder is open. Deliver static HTML, CSS and TypeScript that any WordPress approach can reuse: flat `ii-` classes, CSS custom properties, `data-ii-*` behavior hooks, no builder-specific markup. The developers own WordPress setup, hosting and deployment config, the form plugin, Paylocity, photography and content entry, indexing and redirects. `netlify.toml` (forms, 404 rules, headers) is review scaffolding and is left for them. The design-system export (`npm run build:ds`) covers the shared components only; `design-system/project/oxygen-handoff.md` is reference for one possible builder.
16. **Pattern.** Follow the repo's established progressive-enhancement architecture: semantic `ii-` classes, `data-ii-*` hooks, typed ES modules in `src/behaviors/`. New components get their own CSS file under `src/css/site/` (no edits to existing component rules), each file under 300 lines.

## 3. Site shell (identical on every page)

- Skip link, island header (`ii-header--island`), veil drawer, footer: copied from `concepts/lit-fiber/index.html`, then:
  - nav and drawer links point to clean URLs; the current page's nav and drawer links carry `aria-current="page"`; the brand link goes to `/`.
  - footer brand line: "Fiber and utility construction, from long-haul routes to residential locations." (no tagline, no Corps line).
  - footer columns: Company (Services, Safety, About, Careers, Subcontractors, Contact), Offices (two addresses), Contact (phone, email), social (LinkedIn, Instagram).
  - footer licenses row: "Contractor licenses:" with an `ii-pending` value (benchmark: North Sky lists state license numbers in its footer; Colorado has no statewide contractor license, so the row is not split by state until the client confirms).
- `<main id="main" tabindex="-1">`. Inner pages open with the page header (`ii-page-header ii-page-header--lit`, which clears the island itself).
- `<head>`: charset, viewport, `<title>{Page} | Integrity Infrastructure</title>` (Home: "Integrity Infrastructure | Fiber and utility construction"), meta description (under 160 chars), `noindex`, `theme-color`, the two font preloads, Open Graph title/description/type, favicon links (cropped from the vector lockup until the client supplies a compact mark), the entry module.
- `404.html` uses the same shell with no current nav item; `public/sitemap.xml` lists the seven URLs on the production domain.

## 4. Pages

Section stacks; component names in parentheses. Eyebrows at most one per three sections (`tools/check.mjs`). One H1 per page.

### Home `/`
1. Hero (`ii-hero--scene`, FiberScene). H1 "Built to carry the signal." Lead (20 words max) on long-haul plus residential reach. Actions: Request a quote, Our services.
2. Services (bento): five tiles, Long-haul first with photo and scope list. Section lead ends "We build to the home, never inside it."
3. Why partners choose Integrity (CardStack): Accurate billing, Quality execution, Straight answers (honest), Crews that grow.
4. Safety teaser (SafetyRecord glass + checks + link to `/safety/`).
5. Footprint `#footprint` (CoverageMap) + link to `/services/#coverage`.
6. Ways of BEING (ValuesRail) with the mantra title.
7. Work with Integrity (AudiencePaths).
8. What partners say (Testimonial set: Barbara Barbour, Google review; slots for further reviews).
9. FAQ (adds "Do you install service inside homes?").
10. CTA band.

### About `/about/`
1. Page header. H1: the mantra. Lead: independent fiber and utility construction company, own leadership, crews and offices.
2. Mission (FeatureSplit, photo): "Build by building people."
3. Company at a glance (SpecPlate): headquarters, offices, licensed states, founded, crew size, ownership; pending where unknown.
4. History (Timeline): founding, Colorado office, becomes an independent company; years pending.
5. Ways of BEING (static glass grid; no GSAP).
6. Leadership (LeaderCard x4, PhotoSlot portraits, pending names).
7. Offices (two office cards with map links).
8. AudiencePaths + CTA band.

### Services `/services/`
1. Page header: "From the long-haul route to the home."
2. The route (RouteDiagram, scope).
3. Service lines (five sections with the anchors above; FeatureSplit alternating with spec rows: method, typical scope, equipment pending; PhotoSlot where no photo exists).
4. How a project runs (Timeline as process: scope, plan, build, restore, close out with as-builts and billing that matches them).
5. Where we work `#coverage` (CoverageMap, full).
6. FAQ (scope questions).
7. CTA band.

### Safety `/safety/`
1. Page header: "Safety is our top priority."
2. Commitment (short statement, leadership sign-off pending).
3. Safety record (SafetyRecord: EMR, TRIR, DART, with the reporting year; pending).
4. Certifications and prequalification (plate cells by category; pending).
5. Field practices (checks: job hazard analysis, stop-work authority, 811 locates before any dig, traffic control).
6. Safety packet for bid and diligence reviews (list of documents, Notice, "Request our safety packet" to `/contact/?topic=safety#quote`).
7. CTA band.

### Careers `/careers/`
1. Page header (people-first, photo): "Build by building people."
2. Why Integrity (BenefitList: training and growth, safety, values, pay and benefits pending).
3. Roles we hire (trade tags + short descriptions).
4. Open roles `#open-roles` (JobList, Paylocity).
5. Hiring process (Timeline as steps; client to confirm).
6. Crew voice (Testimonial slot, crew quote with permission, pending).
7. FAQ + CTA band ("View open roles").

### Subcontractor Inquiry `/subcontractors/`
1. Page header: "Partner with Integrity."
2. Trades we partner with (Tag list).
3. Requirements (SpecPlate: insurance, safety record, licensing, prequalification; pending values).
4. Why partner (BenefitList: clear scopes, accurate billing, safety-first sites).
5. Inquiry `#inquiry` (SubcontractorForm).
6. What happens next (Timeline steps).

### Contact `/contact/`
1. Page header.
2. Contact methods (CallLink, email, emergency Notice with after-hours line pending).
3. Quote form `#quote` (QuoteForm with Topic select: Quote, Safety documents, Subcontracting, Careers, General; URL prefill).
4. Offices (two cards, map links).
5. FAQ.

## 5. New components (v1)

| Component | Classes | File | Notes |
|---|---|---|---|
| CoverageMap | `ii-coverage`, `ii-usmap`, `ii-usmap__tile[data-state][data-status]`, `ii-usmap__pin`, `ii-coverage__key`, `ii-coverage__list`, `ii-coverage__office`, `ii-coverage__contact` | `src/css/site/coverage.css`, `src/css/site/coverage-offices.css` | Tile grid, 11 x 8; tiles positioned by `data-state` in CSS; statuses by fill + glyph; reduced-motion safe pulse on office tiles; office rows are `<details>` with address and map link, opened from their tile (`coverage-offices.ts`), plus company phone and email |
| RouteDiagram | `ii-route`, `ii-route__stage`, `ii-route__stage--out` | `src/css/site/route.css` | Ordered list; hairline fiber with a CSS light pulse; vertical under 768 px; the out-of-scope node is dashed and muted |
| PageHeader, Lit | `ii-page-header--lit` | `src/css/site/page-header.css` | Glow veil, optional media column, eyebrow pill |
| Testimonial set | `ii-quotes` | `src/css/site/proof.css` | Grid of `ii-quote` cards in shells plus pending review slots |
| Office card, facts, misc. | `ii-office`, `ii-facts` | `src/css/site/site.css` | Site-level layout helpers only |

## 6. Accessibility rules (WCAG 2.2 AA)

- Landmarks: header, nav (labelled), main, footer; one H1; no skipped heading levels.
- Every interactive target 44 px or larger (2.5.8); focus ring from tokens; nothing hides focus (2.4.11) under the island header (`scroll-padding-top`).
- Color is never the only signal (map statuses, form errors, pending data).
- Images: meaningful alt text describes the work; decorative `alt=""`; all with `width`/`height`.
- Motion: every animation off under `prefers-reduced-motion`; view transitions only under `no-preference`.
- Forms: visible labels, hints, inline errors with icon and "Error", error summary focus (existing runtime).

## 7. Performance rules

- Photos ship as `<picture>` with AVIF and WebP at 640, 1024, 1600 and a JPEG fallback; `sizes` matches the layout. Generated by `tools/images.mjs` (Pillow) into `src/img/photos/`, committed.
- Below-the-fold images `loading="lazy" decoding="async"`; the LCP image `fetchpriority="high"`.
- No third-party requests on load. Map links, Paylocity and social links are plain links.
- CSS layer adds under 12 KB gzip.

## 8. Verification

- `npm run verify` (unit tests, typecheck, build, contrast and copy checks, production asset checks).
- `tests/website.test.mjs`: page set, shell parity, `aria-current`, one H1, image attributes, internal links and anchors resolve, Corps and ISP rules, no GSAP hooks on inner pages.
- Playwright + axe at 390 and 1280 px on all seven pages; keyboard pass of drawer, sheet, FAQ, forms.

## 9. Client inputs (open)

Licensed and expansion states; license numbers per state; EMR, TRIR, DART and year; certifications and prequalification memberships; insurance minimums and required documents; leadership names, titles, bios, portraits; founding year and milestones; crew size; Paylocity company ID, plugin and feed; hiring steps; benefits; additional reviews with permission; after-hours line; build demarcation at the home; approval of the tagline wording; approval of the vector reversed lockup, a vector full-color lockup and a compact mark; office addresses, phone and email after the separation; replacement for the fleet photo and for `conduit-reel.jpg`; master orange (#E87722 vs #F27C25).

Also open (found in the pages): headquarters; the safety commitment sign-off name; the safety packet contents; whether EMR, TRIR and DART are published or shared only in the packet; the trades the company subcontracts, inquiry review time and the five requirement values; equipment per service line; Careers answers on entry-level roles, training programs and CDL help; office hours and response times; which inbox each form Topic routes to.
