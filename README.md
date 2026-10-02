# Integrity Infrastructure redesign

Brand kit, design system and concept prototypes for the integrityinfrastructure.com redesign. The production target is WordPress + Oxygen; everything here is vanilla HTML, CSS and JS so it ports 1:1.

- **Design System artifact**: https://claude.ai/artifact/Kpu4F3WUqjDfFScsB2xRra (source in `design-system/project/`)
- **Concepts**: Work Light and As-Built (primary), Crew and Lit Fiber (backups; Lit Fiber is the motion-led one). One brand core, one component set; a concept is a `data-theme`.

## Run it

```bash
npm install
```

```bash
npm run build
```

```bash
npm run check
```

```bash
npm run serve
```

Then open http://localhost:4174/concepts/ (hub), `/concepts/work-light/`, `/concepts/as-built/`, `/concepts/crew/`, `/concepts/lit-fiber/`, `/brandkit/` (concept boards) and `/harness/` (every design system preview in all four themes). The server root (`/`) is the saved copy of the live site, kept for comparison.

## Deploy the concepts to Netlify

The root `netlify.toml` configures Git-based deployments. Connect this repository to the Netlify project and deploy `main` with these settings:

| Setting | Value |
| --- | --- |
| Base directory | Repository root (`.`) |
| Package directory | Leave unset |
| Build command | `npm run build && npm run check` |
| Publish directory | Repository root (`.`), **not** `dist/` or `concepts/` |
| Node.js version | `24` (set in `netlify.toml`) |

Netlify installs the npm dependencies before running the build. Leave `NODE_ENV` unset and do not omit dev dependencies: the build needs Tabler icons, GSAP and three.js from `devDependencies`. File-based settings override the corresponding Netlify UI settings.

`dist/` is intentionally gitignored. Deploying the committed HTML without running the build leaves `/dist/integrity.css`, `/dist/integrity.js`, fonts and vendored scripts missing. The browser then shows unstyled content and the interactions do not run. Publishing only `concepts/` also drops the shared assets; publishing only `dist/` drops the pages. The current build requires the repository's static directory layout, including `src/img/`.

Publishing the repository root also exposes ordinary source, tooling and design-system files, the QA harness and the saved original homepage. This is a prototype deployment, not a private source archive; `.gitignore` is not a deployment allowlist. Keep confidential files out of the published tree. Use the limited staging layout below if you only want the concepts and brand boards online.

Commit and push `netlify.toml`, then trigger a new Git-based deploy. After it succeeds, open `/concepts/` and each of the four concept home pages. Check that `/dist/integrity.css`, `/dist/integrity.js`, `/dist/fonts/` files and, for Lit Fiber, `/dist/vendor/` scripts return HTTP 200 with no browser console errors. No SPA catch-all rewrite is needed for these static HTML pages.

For a manual upload of prebuilt output to the existing site's Deploys dropzone, run `npm ci` and `npm run build && npm run check` locally first, then upload a staging folder containing `concepts/`, `brandkit/`, `dist/` and `src/img/` at their existing relative paths. Include `harness/` only if you want the QA previews, and `index.html` plus `integrity-infrastructure_files/` only if you want the saved original site at `/`. Do not upload `node_modules/`, `.git/`, environment files or credentials. Uploading only the `concepts/` folder will not work. Logged-in Netlify Drop can detect and build supported framework projects, but this custom builder should use the explicit Git-based build settings or prebuilt output rather than relying on framework detection.

## Layout

| Path | What |
|---|---|
| `design-system/project/tokens.json` | **Source of truth** for tokens (the Design System type's format): brand primitives, three concept themes, type, spacing, radius, shadows, layout, breakpoints, z-index |
| `src/css/base.css` | Reset, fluid type scale, layout primitives |
| `src/css/concepts.css` | Concept expression layer (corners, type treatment, rhythm, image grade, motion) keyed on `data-theme` |
| `src/css/components.css` | All `ii-` components, written once against semantic tokens |
| `src/js/site.js` | `window.IntegrityDS`: icons, sticky header, drawer, marquee, forms, Paylocity job list; for Lit Fiber the pointer glow, the tile-to-sheet view transition, GSAP choreography and the three.js fiber scene |
| `src/partials/` | Header, footer, section, form and brand-board partials shared by pages and DS previews |
| `src/pages/` | Concept Home pages, the hub and the brand boards (built to `concepts/` and `brandkit/`) |
| `src/ds/components/<Comp>/preview.html` | Design System previews (built to `design-system/project/components/`) |
| `src/img/`, `src/fonts/`, `src/data/` | Web photos and logo variants, self-hosted Montserrat and Michroma, sample job feed |
| `tools/build.mjs` | Builds `dist/`, the DS bundle and previews, pages and the harness |
| `tools/check.mjs` | Contrast matrix per concept, token notes, dash and eyebrow and CTA-label rules |
| `tools/png.py` | Trims the logo and makes the provisional reversed variant (pure Python) |
| `dist/` | `tokens.css`, `integrity.css`, `integrity.js`, fonts, and `vendor/` (GSAP, ScrollTrigger, three.js copied from `node_modules` at build time): what pages and Oxygen consume |
| `index.html`, `integrity-infrastructure_files/` | Snapshot of the live site, kept as reference |

Generated folders (`dist/`, `concepts/`, `brandkit/`, `harness/`, DS `components/*/preview.html`, `bundle.*`, `index.d.ts`) are rebuilt by `npm run build`; edit `src/` and `tokens.json` instead.

## Updating the Design System artifact

Edit sources, run `npm run build && npm run check`, then publish only the changed files under `design-system/project/` to the artifact URL. Images are uploads: their blob ids live in `design-system/asset-map.json` and the build rewrites preview image paths to them.

## Adding a concept

See `design-system/project/concepts.md`: one theme in `tokens.json`, one expression block in `src/css/concepts.css`, section variant choices, a Home page and a board built from existing partials.

## Open client inputs

Listed in `design-system/project/page-blueprints.md`: master orange (#E87722 vs the logo's #F27C25), vector logo files and approval of the reversed variant, the shot list, safety metrics, leadership and history, benefits, the Paylocity plugin output and feed ID, subcontractor requirements, the form plugin, the Oxygen version, and the Facebook link.
