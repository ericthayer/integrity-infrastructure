# ServiceIndex

The five services in one markup with four layouts: a typographic index (Work Light), spec plates (As-Built), photo cards (Crew) and a bento of glass tiles (Lit Fiber).

## Use
- `ol.ii-services.ii-services--index|plates|cards|bento` of `li.ii-service.ii-shell`, each with icon, name (a stretched link to the service anchor), description, a three-item scope list, an optional `ii-service__media` photo and an arrow.
- The layout decides what shows: index hides media and scope; plates show scope and media on the first two; cards show media and hide scope, with tinted tiles for services without a photo; bento gives fiber splicing the large photo tile with its scope and the other four glass tiles with icon, name and description. Put the bento in a `[data-ii-glow]` host for the pointer glow, and in a `[data-ii-sheet-host]` host with a ServiceSheet so a tile opens its detail sheet instead of leaving the page.
- Services and anchors: fiber splicing `#fiber-splicing`, boring `#boring`, aerial installations `#aerial-installation`, ISP installation `#isp-installation`, concrete and asphalt restoration `#restoration`.

## Consumer provides
Per service: name, icon, one-sentence description, three scope points, link, optional photo.

## Oxygen
Bind to a Services post type with a repeater; one Component with a variant property.

## Avoid
Three equal cards in a row, empty bento cells, and reordering services per page.
