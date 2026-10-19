# Developer handoff: Integrity Infrastructure website

For the developers building the production site. This repository holds the approved design (the **Lit Fiber** concept) built as a static website in HTML, CSS and TypeScript on Vite. It is the visual and behavioral reference, and a source of production-ready markup, CSS and small dependency-free modules you can reuse or rebuild.

- **Production target:** WordPress. The theme or page builder is **not decided**. Oxygen was discussed and is not assumed; nothing in the website layer depends on a builder.
- **Your scope:** the WordPress build, hosting and deployment configuration, the form plugin, the Paylocity integration, photography, content entry, indexing and redirects.
- **Contract:** [`tasks/website-spec.md`](tasks/website-spec.md) (decisions, page stacks, accessibility and performance rules). Page authoring rules and the anchor contract: [`tasks/website-authoring.md`](tasks/website-authoring.md). Open client inputs: spec section 9 and [`tasks/client-review-note.md`](tasks/client-review-note.md).

## Run it

Node.js 24. `npm ci`, then `npm run dev` (the site is at `/`, `/about/`, `/services/`, `/safety/`, `/careers/`, `/subcontractors/`, `/contact/`). `npm run build` writes the complete static site to `dist/`: the quickest way to see the exact output markup and hashed assets. `npm run verify` is the full gate (unit tests, build, contrast and copy checks, production tests).

## What to take

| Layer | Source | Notes |
|---|---|---|
| Pages | `index.html`, `<page>/index.html`, `404.html` | One template per page. The section order and markup are the reference; the content inside them is the client-approved first pass |
| Shell | Skip link, island header, veil drawer, footer (identical on every page apart from `aria-current="page"`) | Becomes the theme header and footer. The current page's nav and drawer links carry `aria-current="page"` |
| Tokens | `design-system/project/tokens.json`, compiled to `src/generated/tokens.css` by `npm run prepare:data` | Every color, space, radius, type size and shadow is a CSS custom property. Only the `lit-fiber` theme values are used |
| CSS | In load order: `src/generated/tokens.css`, `src/css/base.css`, `src/css/concepts.css`, `src/css/components.css`, `src/css/site/*.css`, `src/css/site/pages/*.css` (the order in `src/website.ts`) | Flat `ii-` classes, no nesting, no `@layer`. Only the `[data-theme="lit-fiber"]` block of `concepts.css` is needed. `site/` is the website layer (lit page header, coverage map, route diagram, testimonials, offices, scene toggle, first-screen reveals); `pages/` is per-page layout glue |
| JS | `src/website.ts` boots `src/behaviors/*.ts` | Strict TypeScript, no framework, no runtime dependencies except GSAP and three.js on Home (loaded by dynamic import only when their hooks are present) |
| Fonts | `src/fonts/` | Self-hosted Montserrat (variable, roman and italic) and Michroma (labels only). Preload the roman Montserrat file |
| Images | `src/img/photos/` (JPEG plus AVIF and WebP at 640, 1024, 1600), `src/img/logo/integrity-infrastructure-logo.svg`, `src/img/favicon/` | WordPress can regenerate responsive sizes from the 2000px JPEGs. Do not use `fleet-mountains.jpg` (sister-company trucks) or the PNG lockups (they carry the "an integrity corps company" line) |
| Data | `public/data/jobs.json` | Sample job feed in the Paylocity shape, labelled "(sample)" |

`npm run build:ds` builds a separate design-system export (`exports/`: `integrity.css`, `integrity.js`, tokens, fonts, previews). It covers the shared component library only, **not** the website layer above (`src/css/site/` and the website behaviors), so take the website from the sources or from `dist/`. `design-system/project/oxygen-handoff.md` describes one possible Oxygen setup, for reference only.

## Behavior contracts

Behaviors attach to `data-ii-*` attributes, so they work with markup rendered by any template system. Keep the attributes and the markup structure.

| Hook | Module | What it does |
|---|---|---|
| `data-ii-header`, `data-ii-header-offset` | `site.ts` | Stuck state of the island header |
| `data-ii-nav-toggle`, `data-ii-drawer`, `data-ii-drawer-close` | `site.ts` | Full-screen menu: focus trap, Escape, focus return |
| `data-ii-icon` | `site.ts` | Fills empty `<svg>` icons (pages ship them inline already) |
| `data-ii-reveal`, `data-ii-reveal="stagger"` | CSS only | Scroll-driven reveal; off under reduced motion |
| `data-ii-reveal-seen` | `reveal-seen.ts` | Elements on screen at load skip the reveal |
| `data-ii-glow` | `site.ts` | Pointer glow on glass cards (fine pointers only) |
| `data-ii-sheet-host` + `<dialog class="ii-sheet">` | `site.ts` | Home: service tile opens a sheet (native dialog, view transition) |
| `data-ii-words`, `data-ii-magnetic`, `data-ii-stack`, `data-ii-rail` | `site.ts` + GSAP | Home only: headline word masks, magnetic buttons, card stack, values rail |
| `data-ii-offices`, `data-ii-office-pin`, `data-ii-office-entry` (sets `data-ii-office-active`, `data-ii-active`, `data-ii-open`) | `coverage-offices.ts` | Coverage map: an office tile opens its key row (address, map link) and tiles and rows highlight each other. Without JS the tile is an in-page link that opens the row |
| `data-ii-scene`, `data-ii-scene-toggle`, `data-ii-scene-paused` | `site.ts` + three.js, `scene-toggle.ts` | Home hero strand scene and its pause control (WCAG 2.2.2) |
| `data-ii-form`, `data-ii-error-summary`, `data-ii-success`, `data-ii-error` | `site.ts` | Inline validation, error summary that takes focus, fix-it messages |
| `data-ii-prefill-from`, `data-ii-key` | `prefill.ts` | `/contact/?topic=safety&service=boring#quote` preselects the Topic and a service |
| `data-ii-required-for`, `data-ii-optional-note` | `topic-fields.ts` | Location and Timeline are required only when the Topic is a quote |
| `data-ii-netlify`, `data-ii-submit-error` | `netlify-forms.ts` | Review deploy only: posts to Netlify Forms. Replace in WordPress |
| `data-ii-jobs`, `data-src`, `data-ii-jobs-empty`, `data-ii-jobs-error` | `site.ts` | Renders a JSON job feed with loading, empty and error states |
| `data-ii-year` | `site.ts` | Current year in the footer |

## Review-only scaffolding to replace

| In this build | For production |
|---|---|
| Forms post to Netlify Forms (`data-netlify`, honeypot, `netlify-forms.ts`) | The chosen form plugin, mapped to the field classes (`ii-field`, `ii-field__label`, `ii-field__hint`, `ii-input`, `ii-select`, `ii-textarea`, `ii-field__error`, the `ii-notice` summary). Route each Topic (quote, safety, subcontracting, careers, general) to its inbox. Keep the Topic and service keys so prefill links keep working |
| Careers reads `public/data/jobs.json` (sample roles) | The Paylocity plugin's markup styled with the `ii-job*` classes, or a server-side proxy of the company's Recruiting feed (it is authenticated: never call it from the browser). Point both Paylocity links at the company board (`recruiting.paylocity.com/Recruiting/Jobs/All/<companyId>`). Remove the sample note |
| "Client to provide" chips (`ii-pending`) | Real content. They are counted by page in `tasks/client-review-note.md` |
| Photo slots (`ii-slot`, "Photo needed") | Client photography: aerial bucket truck, drill rig, finished restoration, training, leadership portraits |
| `noindex` on every page, `X-Robots-Tag` and the 404 rules for `/concepts` and `/brandkit` in `netlify.toml` | Your indexing and hosting setup. The concept prototypes, brand boards and `/reference/` are not part of the site |
| `public/sitemap.xml` (static URL list) | WordPress's generated sitemap |
| `src/img/favicon/` (cropped from the vector logo) | The WordPress Site Icon, until the client supplies a compact mark |
| `404.html` | The theme's 404 template |

Also carry over: 301 redirects from the live site (`/index.php/get-a-quote/` to `/contact/#quote`; the CareerPlug careers link is retired in favor of `/careers/`), the `@view-transition` rule in `src/css/site/site.css` (cross-page header continuity), and BugHerd only as a review tool, never in source.

## Content model

Suggested editable content, whatever the builder:

| Content | Fields | Used on |
|---|---|---|
| Service lines (5) | Name, anchor, icon, short description, scope list, method, typical scope, equipment, photo | Home bento and sheet, Services sections, quote form services |
| Coverage | Per state: status (office, licensed, expansion); office city, address and map link (shared with Offices); company phone and email | Home `#footprint`, Services `#coverage` (tile map and its state lists must stay in sync) |
| Safety record | EMR, TRIR, DART, OSHA recordables, reporting year; certification categories | Home teaser, Safety |
| Leaders | Name, title, short bio, portrait | About |
| Testimonials | Quote, name, source (for example "Google review"), permission confirmed | Home |
| FAQ items | Question, answer, page | Home, Services, Careers, Contact |
| Offices | Label, address, map link | Footer, About, Contact, coverage map key |
| Jobs | From Paylocity: title, location, department, posted date, apply URL | Careers |

## Requirements to preserve

- **WCAG 2.2 AA.** The current build has zero axe violations on all seven pages at 390 and 1280 px, with default and reduced motion. Keyboard: skip link, menu focus trap and Escape, no focus hidden under the island header. Statuses are never shown by color alone. Every animation stops under `prefers-reduced-motion`.
- **Performance.** Inner pages load no GSAP and no three.js. The LCP image gets `fetchpriority="high"` and is never lazy; every image has `width` and `height`. Self-hosted fonts.
- **Copy rules.** `design-system/project/voice.md`: no em or en dashes, one label per action ("Request a quote", "Call (503) 502-5339", "View open roles", "Start an inquiry", "Request our safety packet"), no invented numbers.
- **Separation from Integrity Corps.** No copy, link or image presents the company as part of Integrity Corps. `tests/website.test.mjs` encodes this and the other page rules; run it against any static export of the WordPress pages if you can.

## Open items that affect the build

- Client approval of the vector reversed lockup (no "an integrity corps company" line). A vector full-color lockup and a compact mark are still client inputs.
- `conduit-reel.jpg` (Home, Services, Subcontractors) shows the old lockup line on a crew shirt; replace it when new photos arrive.
- Where the build stops at the home, the tagline wording, the hiring steps, and whether safety figures are published or shared only in the safety packet.
