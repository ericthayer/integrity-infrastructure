# CallLink

The phone number as a primary action: a small label over the number, set in tabular figures.

## Use
- `a.ii-call[href="tel:+15035025339"]` with `ii-call__label` ("Call for a quote") and `ii-call__number`. It sits beside the primary button in CTA bands and at the foot of the mobile drawer.
- Works on orange fields inside `ii-on-accent`, where the number turns ink.

## Consumer provides
The label, the formatted number and the `tel:` href.

## WordPress
Link element with the classes; bind the number to a site option so it changes in one place.

## Avoid
Breaking the number across lines (it is `nowrap`), and more than one call link per section.
