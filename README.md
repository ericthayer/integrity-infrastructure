# Integrity Infrastructure redesign

Website, brand kit, design system and concept prototypes for the integrityinfrastructure.com redesign. The production target is WordPress + Oxygen; the app uses vanilla HTML, CSS and TypeScript with Vite, with a separate standalone CSS/JS export for Oxygen.

- **Website (v1, first pass)**: seven pages in the client-approved **Lit Fiber** concept: Home `/`, `/about/`, `/services/`, `/safety/`, `/careers/`, `/subcontractors/`, `/contact/`. Spec: [`tasks/website-spec.md`](tasks/website-spec.md); authoring rules: [`tasks/website-authoring.md`](tasks/website-authoring.md).
- **Design System artifact**: [open the artifact](https://claude.ai/artifact/Kpu4F3WUqjDfFScsB2xRra) (source in `design-system/project/`)
- **Concepts**: Work Light, As-Built, Crew and Lit Fiber (chosen). One brand core, one component set; a concept is a `data-theme`. The concept prototypes stay at `/concepts/` for reference.

## Run it

Use **Node.js 24 (recommended)**. Vite requires Node.js 20.19+ or 22.12+; older versions are unsupported. Python is not required to develop, build or verify the project.

```bash
npm install
npm run dev
```

Vite opens `http://127.0.0.1:5173/concepts/` (hub). The website is at `/` (Home) and `/about/`, `/services/`, `/safety/`, `/careers/`, `/subcontractors/`, `/contact/`. The concept pages are at `/concepts/work-light/`, `/concepts/as-built/`, `/concepts/crew/`, `/concepts/lit-fiber/`; boards are at `/brandkit/`; the saved original site is under `/reference/`.

| Command | What |
| --- | --- |
| `npm run dev` | Development server on port 5173, opening `/concepts/` |
| `npm run typecheck` | Prepare token/icon data and check TypeScript without emitting app code |
| `npm run build` | Typecheck and build the production website into `dist/` |
| `npm run preview` | Inspect the existing production build at `http://127.0.0.1:4173/concepts/`; build first, not a production hosting server |
| `npm test` | Run automated tests |
| `npm run check` | Check contrast, tokens and copy rules |
| `npm run test:build` | Check the built production website |
| `npm run verify` | Full gate: `npm test && npm run build && npm run check && npm run test:build` |
| `npm run build:ds` | Generate the separate Oxygen/design-system handoff and QA harness under `exports/` |

Edit the website pages (`index.html`, `<page>/index.html`), `concepts/**/*.html` and `brandkit/index.html` directly; all are Vite inputs. Website pages load `src/website.ts` (shared runtime plus the `src/css/site/` layer and URL form prefill); concept pages load `src/main.ts`. Manual page edits are permanent: neither build regenerates or overwrites them. `src/partials/` is **only design-system preview source**, not an app HTML auto-include system. Changing a partial does not update the app pages; edit their HTML manually when making a shared markup change.

In development, HTML changes trigger a full page reload and imported CSS changes use HMR. Editing `design-system/project/tokens.json` regenerates token CSS and triggers a full reload. `src/generated/` contains ignored token CSS and icon data; edit the token JSON or icon/type source, not generated files.

`npm run build` writes production website output only to `dist/` (with shared preparation in `src/generated/`). `npm run build:ds` writes the separate handoff under `exports/`. The concepts are frozen prototypes: their Contact, About and Services links are not wired to the website. Files in `public/` (the sample Paylocity feed at `/data/jobs.json`) are copied to the site root as is.

Photo variants (AVIF and WebP at 640, 1024 and 1600px) and the 360px header logo are generated once with `python3 tools/images.py` (Pillow with AVIF) and committed; builds never run it. `node tools/icon.mjs <name>` prints inline icon markup for authoring.

## Deploy the concepts to Netlify

The root `netlify.toml` configures Git-based deployments. Connect this repository to the Netlify project and deploy `main` with these settings:

| Setting | Value |
| --- | --- |
| Base directory | Repository root (`.`) |
| Package directory | Leave unset |
| Build command | `npm run verify` |
| Publish directory | `dist` |
| Node.js version | `24` (set in `netlify.toml`) |

Netlify installs the npm dependencies before running the build. Leave `NODE_ENV` unset and do not omit dev dependencies: the build needs Tabler icons, GSAP and three.js from `devDependencies`. File-based settings override the corresponding Netlify UI settings.

`dist/` is intentionally gitignored and is the complete deployment unit: generated HTML, hashed CSS/JS and assets, plus the original snapshot and its assets under `dist/reference/`. Publish its contents as the site root, not the repository, `concepts/` alone or `exports/`. The website does not depend on the repository's source layout or standalone Oxygen bundles at runtime.

After a Git-based deploy succeeds, check the seven website pages, `/concepts/`, all four concept home pages, `/brandkit/` and `/reference/`. Pages carry `noindex` while the site is in review. For page-by-page review in BugHerd, add its script through Netlify snippet injection (site settings) rather than in source. Confirm the referenced `/assets/` resources load without browser console errors, including Lit Fiber's optional motion/scene chunks. No SPA catch-all rewrite is needed for these static HTML pages.

For a manual upload to the existing site's Deploys dropzone, run `npm ci` and `npm run verify` locally, then upload the complete `dist/` folder as the publish root. No separate source, harness or asset folders are needed. Do not upload `node_modules/`, `.git/`, environment files or credentials.

## Layout

| Path | What |
| --- | --- |
| `design-system/project/tokens.json` | **Source of truth** for tokens (the Design System type's format): brand primitives, four concept themes, type, spacing, radius, shadows, layout, breakpoints, z-index |
| `src/css/base.css` | Reset, fluid type scale, layout primitives |
| `src/css/concepts.css` | Concept expression layer (corners, type treatment, rhythm, image grade, motion) keyed on `data-theme` |
| `src/css/components.css` | All `ii-` components, written once against semantic tokens |
| `src/css/site/` | Website layer: lit page header, coverage map, route diagram, testimonial set, offices, page glue (`pages/`); loaded only by `src/website.ts` |
| `src/partials/site/` | Canonical markup for the website components (coverage map, route diagram) |
| `index.html`, `about/` ... `contact/` | The seven authored website pages |
| `src/behaviors/site.ts` | Typed `window.IntegrityDS` behaviors: icons, sticky header, drawer, marquee, forms and optional GSAP/three.js motion |
| `src/partials/` | Header, footer, section, form and brand-board partials for DS previews only; not automatically included in app HTML |
| `src/ds/components/<Comp>/preview.html` | Design System previews (built under `exports/design-system/project/components/`) |
| `src/main.ts` | Concept and board entry with imported CSS and optional motion/scene modules |
| `src/website.ts` | Website entry: the same runtime plus the site layer and `behaviors/prefill.ts` |
| `src/generated/` | Ignored token CSS and icon data generated during typecheck/build |
| `src/img/`, `src/fonts/`, `src/data/` | Web photos and logo variants, self-hosted Montserrat and Michroma, sample job feed |
| `tools/build.mjs` | Builds the separate Oxygen/design-system export in `exports/`; does not generate app pages |
| `tools/check.mjs` | Contrast matrix per concept, token notes, dash and eyebrow and CTA-label rules |
| `tools/lib/build-data.mjs` | Shared token compiler, icon loader and generated-data preparation |
| `dist/` | Vite production HTML, hashed CSS/JS, fonts, images and optional motion/scene chunks |
| `exports/` | Standalone Oxygen CSS/JS, tokens, fonts, vendor files, artifact and local QA harness |
| `concepts/`, `brandkit/` | Authored concept and board HTML; edit in place |
| `reference/`, `integrity-infrastructure_files/` | Saved snapshot of the original live site |
| `harness/`, `design-system/project/components/` | Tracked historical preview/bundle snapshots; current generated output is under `exports/` |

The app HTML is authored in place and is never generated by either build command. Only `dist/`, `exports/`, and ignored `src/generated/` files are build outputs.

## Updating the Design System artifact

Edit sources, run `npm run build:ds` and `npm run check`, then upload the generated `exports/design-system/project/` files to the original Design System artifact linked above. Images are uploads: their blob ids live in `design-system/asset-map.json`, and the export builder rewrites artifact preview image paths to them. Artifact previews retain blob/CDN references for that host; they are not standalone browser pages.

For local QA, serve `exports/` as a static HTTP root and open `/harness/` (the generated `exports/harness/`, not the historical root harness). The export includes the images and sample data these previews need; it does not need `dist/`.

For Oxygen, use `exports/integrity.css`, `exports/integrity.js`, `exports/tokens.css`, `exports/fonts/` and `exports/vendor/`. Keep the sibling relative paths intact. `integrity.css` already includes tokens and font declarations, so do not also load `tokens.css` when using the complete stylesheet. The exported JS is a dependency-free, self-initializing classic IIFE; optional GSAP/three.js libraries remain separate vendor files. These are handoff assets, not Vite website output. Follow [the Oxygen handoff](design-system/project/oxygen-handoff.md) for artifact bundles, variables and optional library setup.

## Adding a concept

See `design-system/project/concepts.md`: one theme in `tokens.json`, one expression block in `src/css/concepts.css`, section variant choices, an authored Home page and a brand board. Reuse existing markup manually in app HTML; partial includes are resolved only for DS previews.

## Open client inputs

The website list is in `tasks/website-spec.md` section 9 (licensed and expansion states, license numbers, safety metrics and certifications, leadership, history, Paylocity company ID and feed, hiring steps, insurance minimums, reviews, a logo lockup without "an integrity corps company", and more). Design-system items are in `design-system/project/page-blueprints.md`: master orange (#E87722 vs the logo's #F27C25), vector logo files and approval of the reversed variant, the shot list, the form plugin and the Oxygen version.
