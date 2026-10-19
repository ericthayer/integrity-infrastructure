# PhotoSlot

A framed photo (`ii-media`) with the concept's grade, and the slot (`ii-slot`) that stands in for a shot the client still needs.

## Use
- Photo: `div.ii-media` with a ratio modifier and `--focus`. Slot: `div.ii-slot` with the `camera` icon, "Photo needed" and a one-line brief (subject, framing, ratio), sized with `--ratio` like the photo it replaces.
- Collect every slot's brief into the shot list for the client.

## Consumer provides
The photo or, until it exists, the brief.

## WordPress
Image element in a div with `ii-media`; slots never ship to production.

## Avoid
Leaving slots on a launched page, and filling them with stock.
