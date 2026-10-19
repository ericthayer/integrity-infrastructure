# Logos

- `src/img/logo/integrity-infrastructure-logo.svg` (repository source): **vector reversed lockup** for dark grounds and photography: wordmark in white, "INFRASTRUCTURE" in logo-orange, the flame untouched. It has no "an integrity corps company" line, so it is the lockup the website uses in the header, drawer and footer. Client to approve. Upload it to this artifact (key `Logos/integrity-infrastructure-logo.svg` in `design-system/asset-map.json`) so previews can show it.
- `integrity-infrastructure-logo.png`: full color raster, trimmed from the live site's 3300 x 2550 artboard (flame in logo-orange #f27c25 and flame-yellow, wordmark in logo-ink #040707, "INFRASTRUCTURE" in logo-orange). Use on light grounds. It still carries the "an integrity corps company" line: a vector full-color lockup without it is a client input.
- `integrity-infrastructure-logo-reversed.png`: the same raster with the wordmark and tagline recolored to neutral-50 #f5f4f2. Superseded by the SVG on the website; it also carries the old third line.

The browser-tab icon (`src/img/favicon/`) is cropped from the SVG by `tools/favicon.mjs` until the client supplies a compact mark.

Clear space equals the flame's width on every side. Never redraw, stretch, outline, add effects or recolor beyond these files.
