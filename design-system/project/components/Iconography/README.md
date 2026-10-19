# Iconography

Tabler outline icons at 1.5 stroke, inlined as SVG and colored with `currentColor`.

## Use
- Markup: `<svg class="ii-icon" data-ii-icon="phone"></svg>`; the build (or `IntegrityDS.hydrateIcons()`) fills the paths and adds `aria-hidden`. Add `aria-label` only when the icon stands alone and carries meaning.
- Services: `route` long-haul fiber construction, `plug-connected` fiber splicing, `backhoe` boring, `crane` aerial installations, `road` concrete and asphalt restoration. `building-broadcast-tower` is retired with the old in-home service line. Safety `shield-check`, people `users-group`, partners `heart-handshake`.
- Sizes: default 1.25em inline, `ii-icon--lg` 2rem, `ii-icon--xl` 2.75rem. Service icons take `accent-text`.

## Consumer provides
The icon name from `IconName` in `index.d.ts`.

## WordPress
Keep the inline SVGs (the website ships them inline), or load the used Tabler subset as the builder's icon set.

## Avoid
Mixing icon families, emoji, the retired PNG service icons, and hand-drawn icons.
