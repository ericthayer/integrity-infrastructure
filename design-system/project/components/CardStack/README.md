# CardStack

Reasons or steps as glass cards that stick and pile up as the page scrolls; each stuck card scales back and dims when the next one arrives (Lit Fiber).

## Use
- `ul.ii-reasons.ii-reasons--stack[data-ii-stack]` of `li.ii-reason.ii-shell` with an icon, an `h3` and one paragraph. Three to five cards.
- The stacking is CSS (`position: sticky` with a 16px step per card, below `--stack-top`, which defaults to the island header's height); `IntegrityDS.motion` adds the GSAP ScrollTrigger scale-back and dimming (brightness, never opacity, so stacked text never shows through). Without GSAP the cards still stack; under reduced motion nothing moves. Each card shows an outline numeral that stays out of the heading's accessible name.
- Leave `data-ii-reveal` off the list: a reveal animation on the cards would fight the scroll-driven transform.

## Consumer provides
Three to five cards, one idea each, at most 44 characters of title.

## Oxygen
A repeater of cards with the classes; the bundle handles the rest. Enqueue GSAP and ScrollTrigger before the bundle.

## Avoid
More than five cards (the pile gets taller than the viewport), links inside the cards (they scroll under the next card), and using the stack twice on a page.
