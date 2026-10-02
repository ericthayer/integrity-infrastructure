# Iconography

Tabler outline icons at 1.5 stroke, inlined as SVG and colored with `currentColor`.

## Use
- Markup: `<svg class="ii-icon" data-ii-icon="phone"></svg>`; the build (or `IntegrityDS.hydrateIcons()`) fills the paths and adds `aria-hidden`. Add `aria-label` only when the icon stands alone and carries meaning.
- Services: `plug-connected` fiber splicing, `backhoe` boring, `crane` aerial, `building-broadcast-tower` ISP installation, `road` restoration. Safety `shield-check`, people `users-group`, partners `heart-handshake`.
- Sizes: default 1.25em inline, `ii-icon--lg` 2rem, `ii-icon--xl` 2.75rem. Service icons take `accent-text`.

## Consumer provides
The icon name from `IconName` in `index.d.ts`.

## Oxygen
Upload the Tabler outline set (or the used subset) as an Oxygen icon set, or keep the inline SVGs.

## Avoid
Mixing icon families, emoji, the retired PNG service icons, and hand-drawn icons.
