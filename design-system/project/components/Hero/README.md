# Hero

The Home hero in four variants, one per concept: cinematic (full-bleed photo), split (copy beside a framed photo and title block), editorial (headline over two photos), scene (copy over the FiberScene).

## Use
- `ii-hero--cinematic` (Work Light): photo in `ii-hero__media` with the scrim gradient, content low-left, `ii-btn--on-photo` for the secondary action. Pair with the overlay header.
- `ii-hero--split` (As-Built): `ii-hero__grid` of `ii-hero__content` and `ii-hero__aside` (a framed photo over a SpecPlate).
- `ii-hero--editorial` (Crew): headline first, then `ii-hero__grid` of copy and `ii-hero__photos`.
- `ii-hero--scene` (Lit Fiber): full viewport, `ii-hero__scene[data-ii-scene]` behind `ii-hero__content`, the headline carrying `data-ii-words`, the primary action with the orb and `data-ii-magnetic`. Pair with the island header.
- Rules for all: headline two lines at most on desktop, subtext 20 words or fewer, one primary and one secondary action, eyebrow optional, nothing below the actions.

## Consumer provides
Title, lead, actions, photos with alt text and focal points; SpecPlate cells for the split variant.

## Oxygen
One Component with a "variant" property mapped to the modifier; build only the chosen concept's variant. The hero image is the LCP element: no lazy loading, `fetchpriority="high"`.

## Avoid
Trust strips, logo walls or taglines inside the hero, scroll cues, and more than two actions.
