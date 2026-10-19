# Logo

The Integrity Infrastructure lockup, used exactly as supplied. The website uses the vector reversed lockup; the PNG lockups serve archived concept material.

## Use
- Website: `src/img/logo/integrity-infrastructure-logo.svg`, a vector reversed lockup (light wordmark, orange INFRASTRUCTURE, the flame) without the old third line under INFRASTRUCTURE, as `img.ii-logo.ii-logo--for-dark` on Lit Fiber's dark grounds.
- The PNGs in `assets/Logos`, full color (`integrity-infrastructure-logo.png`) and reversed (`integrity-infrastructure-logo-reversed.png`), still carry that third line. Use them only in archived concept material and design-system previews. A vector full-color lockup without it is a client input.
- Where a page can switch between light and dark grounds, render both files as `img.ii-logo.ii-logo--for-light` and `img.ii-logo.ii-logo--for-dark`; the concept's `--logo-on-light` / `--logo-on-dark` shows the right one, and the overlay header switches to the reversed file automatically.
- Clear space equals the flame's width. Header height 44px mobile, 52px desktop; the small INFRASTRUCTURE line is hard to read there, so the wordmark carries recognition.

## Consumer provides
The link target (home) and alt text "Integrity Infrastructure home" on the header link's image; decorative repeats use `alt=""`.

## WordPress
An image element with the classes above, pointing at the SVG.

## Avoid
Redrawing, re-typesetting, stretching, outlines, shadows, or recoloring beyond the supplied files. Placing the full-color file on dark grounds, and using the PNG lockups on the website.
