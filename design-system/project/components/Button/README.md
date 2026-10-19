# Button

Buttons trigger actions: the primary button is the one thing a view is for, usually Request a quote.

## Use
- `ii-btn ii-btn--primary` once per view: Request a quote, or the form's submit. `ii-btn--secondary` for alternatives, `ii-btn--ghost` for low emphasis, `ii-btn--on-photo` over hero photography (always on scrim).
- Sizes: `ii-btn--sm` (header), default, `ii-btn--lg` (hero, CTA band). `ii-btn--block` fills the width on mobile forms.
- Trailing arrow: `<svg class="ii-icon ii-icon--trail" data-ii-icon="arrow-right">`; it nudges on hover. Busy: `aria-busy="true"` shows the `loader-2` spinner (class `ii-icon--spin`). Disabled links use `aria-disabled="true"`.

## Markup
```html
<a class="ii-btn ii-btn--primary" href="/contact/#quote">Request a quote</a>
```

- `ii-btn--orb` (Lit Fiber pills) puts the trailing icon in its own disc, flush with the right padding; the disc nudges up and right on hover. Add `data-ii-magnetic` for the pointer lean.

## Consumer provides
The label (verb first, one line, one label per intent), the href or button type, optional icons.

## Concepts
Work Light: uppercase, sharp, with the notch cut into the fill's top-right corner (drawn on `::before` so the focus ring is never clipped). As-Built: 2px, sentence case. Crew: pill. Text on orange is always ink.

## WordPress
Button or link element with the classes; no per-element styling.

## Avoid
White text on orange (2.96:1), two primary buttons side by side, labels that wrap, and new labels for an existing intent.
