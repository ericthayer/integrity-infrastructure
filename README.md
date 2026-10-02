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
