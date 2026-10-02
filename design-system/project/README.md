Integrity Infrastructure splices fiber, bores, installs aerial and ISP networks, and restores concrete and asphalt, with offices in Sherwood, Oregon and Centennial, Colorado. It is an Integrity Corps company. This system serves one site with seven pages (Home, About, Services, Safety, Careers, Subcontractor Inquiry, Contact) and four design concepts that share one brand core. The site ships in WordPress with the Oxygen builder, so every component is plain HTML with `ii-` classes and every value is a CSS custom property.

## How the system is built

- **The brand core never changes**: Montserrat, `brand-orange`, `ink`, the flame logo and the crew's own photography.
- **Concepts are themes.** The color themes `work-light`, `as-built`, `crew` and `lit-fiber` are the four concepts. Set `data-theme` on `<html>` (or on any element, for side-by-side boards) and every component repaints: colors from `tokens.json`, and corners, type treatment, rhythm, image grade and motion from the expression layer at the top of `components/bundle.css`.
- **Components are written once.** Variants are modifier classes (`ii-hero--cinematic`, `ii-services--plates`), never theme checks. A concept is a choice of variants per section plus its theme; `concepts.md` has the recipe for adding a fourth.
- **Semantic tokens only in components.** Paint surfaces with `surface`, `surface-raised`, `surface-sunken`; text with `text`, `text-muted`, `accent-text`. Never reference `neutral-*` or `orange-*` steps from a component; they exist for the semantic layer and for documentation.

## Voice and content

- Plain, direct and specific. Name the service, the place and the outcome: "Underground utility installation with boring methods that limit disruption."
- Reuse the company's own words first: **Build by Building People**, the mantra **"Doing what's right when nobody is looking"**, and the six **Ways of BEING**: generous, accountable, coachable, safe, caring, always better. Keep BEING in capitals when it names the values.
- One label per intent, everywhere: **Request a quote**, **Call (503) 502-5339**, **View open roles**, **Start an inquiry**. Buttons are verb first, sentence case in copy (Work Light sets them uppercase with CSS, not in the text).
- No em dashes or en dashes in site copy; use a period, a comma or a colon. No invented numbers: metrics the client has not supplied render as `ii-pending` ("Client to provide"). Details in `voice.md`.

## Color

- `brand-orange` is the only accent. Use it as a fill (`accent`) for the one primary action in view, key figures and the active nav marker. **Text on orange is always `on-accent` (ink, 6.06:1).** White on `brand-orange` measures 2.96:1 and fails WCAG AA; the live site's white-on-orange bands are retired.
- Orange text on light surfaces is `accent-text` (`orange-700`, 4.96:1 or better); on Work Light's dark surfaces `accent-text` is `brand-orange` itself (6.0:1 or better).
- `logo-orange` (#f27c25), `logo-ink` and `flame-cream` live inside the logo art only; never use them as UI colors. The logo orange differs from `brand-orange`; the client should confirm one master value.
- `flame-yellow` is Work Light's focus ring and a small highlight on dark grounds. It never carries text on a light surface.
- Status colors always come with an icon and a word: `danger` for errors, `success` (blue, never green) for confirmations, so they are never told apart by hue alone.
- Photography under text sits on `scrim` (82% ink); `text-on-photo` over it holds 10.3:1 even on a white sky.

## Type

- Montserrat for everything, from the self-hosted variable files in `fonts/` (weights 100 to 900, roman and italic). Michroma, already on the live site, is allowed only for labels: As-Built's spec plates (`wide-label`) and Lit Fiber's instrument labels and eyebrow pills. Averia Sans Libre, the live site's global body default, is retired.
- Display: `display-xl` for the Home hero, `display-lg` for inner page headers. Concepts change weight, case and tracking through the expression layer (Work Light 800 uppercase, As-Built 650, Crew 700 with 300 for contrast, Lit Fiber 500 with 300 for the orange words), never the family.
- Headings: `heading-xl` section titles, `heading-lg` sub-sections, `heading-md` card titles, `heading-sm` FAQ questions and job titles. Body: `body-md` default, `body-lg` for leads, `body-sm` for captions and helper text. Labels: `label-md` for buttons, nav and field labels; `label-sm` uppercase for tags.
- Sizes in `tokens.json` are desktop sizes; pages scale them between 375px and 1280px with the `--fs-*` clamps in the bundle.
- Hero headlines run two lines at most on desktop; hero subtext is 20 words or fewer. Phone numbers and figures use tabular numerals (`ii-tabular`, `figure-lg`).
- Eyebrows (`ii-eyebrow`) are rationed: one per three sections at most.

## Spacing and layout

- 4px base: `space-2` icon gaps, `space-5` between form fields, `space-6` card padding on mobile, `space-8` desktop gutter and card padding, `space-10` between a section title and its content.
- Sections breathe by concept: Work Light up to `space-24`, As-Built up to `space-20`, Crew and Lit Fiber up to `space-32`.
- Content sits in `ii-container` (`container-max` 1320px plus the gutter: `gutter-mobile` 16px, 24px at 768px, `gutter` 32px at 1024px). Long text caps at `container-text`.
- Breakpoints are min-width: `bp-md` 768px starts multi-column sections, `bp-lg` 1024px swaps the drawer for the one-line desktop nav.
- Every multi-column layout collapses to one column under 768px. No section layout family repeats on a page, and no more than two image-and-text splits run in a row.

## Shape, borders and elevation

- Each concept locks one corner system: Work Light `radius-none` everywhere, plus a notch cut from the wordmark's stencil breaks on primary buttons and photo frames; As-Built `radius-xs` everywhere; Crew `radius-pill` for buttons and tags, `radius-lg` for cards and media, `radius-md` for fields; Lit Fiber `radius-2xl` glass shells around `radius-xl` cores (an 8px inset keeps the curves concentric), `radius-pill` actions and `radius-lg` fields.
- Separate with `border` hairlines; use `border-strong` only where rules organize data (spec plates, table heads, the footer). Control borders are `field-border` (3.2:1 or better everywhere).
- Work Light and As-Built use no shadows (`shadow-raised` is `none`). Crew uses one soft ink-tinted `shadow-raised`. Lit Fiber's `shadow-raised` is a deep, diffuse shadow plus a 1px inner highlight, the glass panel's top edge. `shadow-overlay` is for the drawer, the island header and the service sheet.

## Imagery

- Use the company's own photography. Six shoot photos ship in `assets/Photography`; each concept grades them through `--media-filter` (Work Light dark and contrasty, As-Built cool and slightly desaturated, Crew warm and close, Lit Fiber cool, desaturated and contrasty, night work first).
- Never stock photos of generic workers, never AI imagery, never text or pills over a photo. Captions go below the image.
- A shot that does not exist yet is an `ii-slot` ("Photo needed" plus a one-line brief) sized like the photo it replaces. The slots are the client shot list: aerial bucket truck, drill rig, finished restoration, training, leadership portraits.
- Every meaningful image has alt text that says what the crew is doing; decorative crops use `alt=""`.

## Logo

- Use the files in `assets/Logos` as they are; never redraw, stretch, recolor or re-typeset the mark. The full-color lockup goes on light grounds; the reversed variant (wordmark in `neutral-50`, flame untouched) goes on dark grounds and photography and is **provisional** until the client approves it and supplies vector files.
- Keep clear space equal to the flame's width on every side. The header uses the full lockup at 44px tall on mobile and 52px on desktop, where the INTEGRITY wordmark carries recognition; the two smaller lines ("INFRASTRUCTURE" and "an integrity corps company") are not legible at that size. Ask the client for a horizontal or compact lockup for small placements.

## Iconography

- One family: Tabler outline, 1.5 stroke, `currentColor`, inlined as SVG (`<svg class="ii-icon" data-ii-icon="phone"></svg>`; the build or `IntegrityDS.hydrateIcons()` fills the paths). Service icons: `plug-connected` fiber splicing, `backhoe` boring, `crane` aerial, `building-broadcast-tower` ISP, `road` restoration.
- Icons are decorative (`aria-hidden`) unless they stand alone; a standalone icon button carries a visible or visually hidden label. No emoji.
- The five 150px PNG service icons from the live site are archived in `assets/Icons-legacy` and retired.

## Motion

- Motion only shows hierarchy, sequence or feedback. Heroes rise in once on load; sections reveal with CSS scroll-driven animation (`data-ii-reveal`, no JavaScript); the Work Light values ticker has a Pause button. Lit Fiber is the motion-led concept: a three.js strand scene behind its hero (paused off screen and in hidden tabs, one still frame under reduced motion), GSAP word-mask and scroll choreography, and a view transition that morphs a service tile into its sheet. Every piece is optional: without the libraries the page is complete and static.
- Durations and easing come from each concept (`--motion-duration`: 560ms Work Light, 280ms As-Built, 440ms Crew, 700ms Lit Fiber on `cubic-bezier(0.32, 0.72, 0, 1)`). Animate only `transform` and `opacity`. `prefers-reduced-motion` turns all of it off.

## Accessibility

- Every text pair meets 4.5:1 in every theme (3:1 for 24px and larger, control borders and focus rings); `tools/check.mjs` in the source repo tests the matrix on every build.
- Keyboard focus is a solid 2px `focus-ring` 3px outside the control (`focus-ring-on-accent` on orange fields). A skip link leads every page; the drawer traps focus, closes on Esc and returns focus to its toggle.
- Forms: label above the control, hint below the label, error below the control with an icon and the word "Error", an error summary that takes focus on submit. Never placeholder-only labels.
- Touch targets are 44px or larger.

## Components and pages

- Components live in `components/` with a guideline and a live preview each; behavior ships in `components/bundle.js` as `window.IntegrityDS` and needs no framework. Previews for Hero, ServiceIndex and ValuesBand follow the theme switcher and show the variant each concept uses.
- `concepts.md` holds each concept's dials, expression tokens and section choices. `page-blueprints.md` holds the section stack, audience, CTAs and client inputs for all seven pages. `oxygen-handoff.md` maps tokens, classes, components, forms, the Paylocity job feed and fonts into Oxygen.
