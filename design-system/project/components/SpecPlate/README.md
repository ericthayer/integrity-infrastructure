# SpecPlate

A title block of facts, set like an as-built drawing: labeled cells separated by 1px rules.

## Use
- `dl.ii-plate` of `div.ii-plate__cell` with `dt.ii-plate__label` and `dd.ii-plate__value`. Columns via `--plate-cols` (default 2); `ii-plate__cell--wide` spans the row.
- Values the client has not confirmed render as `<span class="ii-pending">Client to provide</span>`, never as a guess.
- Labels use the concept's label face (Michroma in Lit Fiber and As-Built).

## Consumer provides
Label and value pairs; links where a value is actionable (the phone).

## WordPress
A reusable block bound to custom fields (ACF, Meta Box or the theme's own), so pending cells fill in without layout changes.

## Avoid
Invented figures, more than eight cells, and long sentences in cells.
