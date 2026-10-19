# Authoring the website pages

How to write and change the seven website pages. The contract is `tasks/website-spec.md`; `tests/website.test.mjs` enforces most of it.

## Files you edit

| What | Where |
|---|---|
| Page content | Inside `<main id="main" tabindex="-1">` of `index.html`, `about/`, `services/`, `safety/`, `careers/`, `subcontractors/`, `contact/` (`index.html` in each) |
| Page layout glue | `src/css/site/pages/<page>.css`, classes prefixed `ii-<page>-` (already imported by `src/website.ts`) |
| Shared site components | `src/css/site/*.css`, canonical markup in `src/partials/site/*.html` |

Never edit the skip link, header, drawer or footer on one page only: they must stay byte-identical across pages except `aria-current="page"`. Never edit `src/css/components.css` or `src/css/concepts.css` for the website; extend in `src/css/site/`.

## Rules

- Theme: Lit Fiber only. Semantic tokens (`--surface`, `--text`, `--text-muted`, `--accent`, `--accent-text`, `--on-accent`, `--border`) and Lit Fiber expression tokens (`--glass-*`, `--shell-*`, `--card-*`, `--radius-*`, `--label-*`, `--motion-*`). No hex values, no `--neutral-*` or `--orange-*`. No inline `style` attributes; add a class.
- Inner pages: no `data-ii-words`, `data-ii-magnetic`, `data-ii-stack`, `data-ii-rail` or `data-ii-scene` (they load GSAP or three.js). Use `data-ii-reveal` / `data-ii-reveal="stagger"`, `ii-shell` and `data-ii-glow`.
- One `h1` per page (the page header). Section titles `h2.ii-h2`, cards `h3`. No skipped levels. Every `<section>` has `aria-labelledby` pointing to its heading (or `aria-label`).
- Eyebrows (`ii-eyebrow`): at most one per three `<section>`s on the page.
- Links are root-absolute (`/services/#boring`, `/contact/?topic=safety#quote`) and only to anchors in the contract below.
- Copy: `design-system/project/voice.md`. Sentence case, short sentences, no em or en dashes, no filler words, no invented numbers, names, dates or certifications; unknowns are `<span class="ii-pending">Client to provide</span>`. One label per intent: **Request a quote**, **Call (503) 502-5339**, **View open roles**, **Start an inquiry**, **Request our safety packet**.
- Never mention Integrity Corps, Integrity Traffic or Integrity Equipment Services; never use `fleet-mountains.jpg`; never say "ISP installation". The company builds long-haul fiber and the infrastructure that reaches residential locations; it does not install service inside homes.
- "Build by building people" appears only on Careers (page title) and About (mission section).

## Anchor contract

| Page | Anchors |
|---|---|
| `/` | `#services`, `#footprint` |
| `/services/` | `#route`, `#long-haul`, `#fiber-splicing`, `#boring`, `#aerial-installation`, `#restoration`, `#process`, `#coverage`, `#faq` |
| `/safety/` | `#record`, `#certifications`, `#practices`, `#safety-packet` |
| `/about/` | `#mission`, `#company`, `#history`, `#leadership`, `#offices` |
| `/careers/` | `#why`, `#roles`, `#open-roles`, `#hiring` |
| `/subcontractors/` | `#trades`, `#requirements`, `#inquiry` |
| `/contact/` | `#quote`, `#offices`, `#faq` |

Contact prefill: `?topic=` one of `quote`, `safety`, `subcontracting`, `careers`, `general`; `?service=` one of `long-haul`, `fiber-splicing`, `boring`, `aerial-installation`, `restoration`.

## Components to reuse

Look at `concepts/lit-fiber/index.html` (Home) for production markup, and `src/ds/components/<Name>/preview.html` with `src/partials/**` for the rest (DS previews use `<!-- @include -->` and `{{placeholders}}`; in pages, paste the resolved markup).

| Need | Markup |
|---|---|
| Inner page header | `header.ii-page-header.ii-page-header--lit` (add `--media` + `figure.ii-page-header__media` for a photo), `.ii-page-header__copy` holding breadcrumb, h1 `ii-display ii-display--lg` (an `<em>` lights the 300-weight orange words), `p.ii-lead`, optional `.ii-hero__actions`, optional `dl.ii-page-header__meta`. See `src/css/site/page-header.css` |
| Section | `section.ii-section` > `.ii-container` > `.ii-section-head` (`h2.ii-h2`, `p.ii-lead.ii-muted`) |
| Split | `.ii-split` / `.ii-split--reverse` with `.ii-split__media` and `.ii-split__content` (FeatureSplit) |
| Glass card | `.ii-shell` on a card element with `--card-*` styling (e.g. `.ii-reason.ii-shell`, `.ii-path.ii-shell`, `.ii-office`) |
| Facts / spec plate | `dl.ii-plate` > `.ii-plate__cell` > `dt.ii-plate__label` + `dd.ii-plate__value` |
| Checks list | `ul.ii-checks` with an icon per `li` |
| Benefits | `ul.ii-benefits` > `li.ii-benefit` (icon + text) |
| Timeline / steps | `ol.ii-timeline` > `li.ii-timeline__item` (`.ii-timeline__year` for the step label) |
| Leaders | `ul.ii-leaders` > `li.ii-leader` (`.ii-slot` portrait, `.ii-leader__name`, `.ii-leader__role`) |
| Missing photo | `.ii-slot` with `.ii-slot__label` "Photo needed" and `.ii-slot__brief` |
| Tags | `.ii-tag` list (see `src/ds/components/Tag/preview.html`) |
| Notice | `.ii-notice.ii-notice--info` (see Notice preview) |
| Testimonials | `ul.ii-quotes` > `li.ii-quotes__item.ii-shell` > `figure.ii-quote`; pending: `li.ii-quotes__item.ii-quotes__item--pending` |
| Offices | `ul.ii-offices` > `li.ii-office` (label, `address`, map link) |
| Anchor chips | `ul.ii-anchors` > `li` > `a` |
| Two-column head + body | `.ii-two-col` (sticky section head on desktop) |
| FAQ | `.ii-faq-layout` with `details.ii-faq__item[name="faq"]` |
| CTA band | `section.ii-section.ii-cta-band` (copy from the concept, without `data-ii-magnetic`) |
| Forms | `src/partials/forms/quote-form.html`, `subcontractor-form.html` (`data-ii-form`; website pages use `data-ii-netlify` plus the Netlify attributes, see `contact/index.html`; `data-ii-demo` is for previews only) |
| Jobs | `src/partials/careers/job-list.html` with `data-src="/data/jobs.json"` |
| Coverage map | `src/partials/site/coverage.html` |
| Route (scope) | `src/partials/site/route.html` |

Icons: `node tools/icon.mjs <name> [...]` prints inline SVG; `node tools/icon.mjs` lists names.

## Photos

Use `<picture>` with AVIF and WebP sources (640, 1024, 1600 widths) and the JPEG as `<img>`, with the JPEG's `width`/`height` (2000 x 1333). `loading="lazy" decoding="async"` below the fold; the one LCP image gets `fetchpriority="high"` and no `loading`. Available: `splice-tray`, `conduit-reel`, `night-van-splicer`, `night-van-crew`, `fiber-hands`.

```html
<div class="ii-media"><picture>
  <source type="image/avif" srcset="/src/img/photos/splice-tray-640.avif 640w, /src/img/photos/splice-tray-1024.avif 1024w, /src/img/photos/splice-tray-1600.avif 1600w" sizes="(min-width: 1024px) 50vw, 100vw">
  <source type="image/webp" srcset="/src/img/photos/splice-tray-640.webp 640w, /src/img/photos/splice-tray-1024.webp 1024w, /src/img/photos/splice-tray-1600.webp 1600w" sizes="(min-width: 1024px) 50vw, 100vw">
  <img src="/src/img/photos/splice-tray.jpg" alt="A technician routes spliced fibers through a splice tray" width="2000" height="1333" loading="lazy" decoding="async">
</picture></div>
```

## Verify

`node --test tests/website.test.mjs`, `npm run check`, then screenshots at 1280 and 390 px and an axe scan with zero violations. `npm run verify` before merging.
