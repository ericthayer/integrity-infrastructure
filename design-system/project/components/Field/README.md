# Field

A form field with its label above, optional hint, the control, and the error below: text, email, tel, select, textarea, checkbox and radio groups, and file upload.

## Use
- `div.ii-field` with `label.ii-field__label`, `p.ii-field__hint` (linked by `aria-describedby`), and `ii-input`, `ii-select` (inside `ii-select-wrap` with a chevron icon) or `ii-textarea`. Optional fields say "(optional)" in `ii-field__opt`; required is the default.
- Groups: `fieldset.ii-fieldset` with `legend.ii-fieldset__legend` and `ii-choices` of `label.ii-choice`; add `data-ii-required` to require one choice. Files: `input.ii-file`.
- Errors: `IntegrityDS.forms()` adds `ii-field__error` below the control (icon + "Error:" for screen readers), sets `aria-invalid`, and clears it once fixed.

## Consumer provides
Label, name, type, autocomplete, hint, and any custom error message (`data-ii-error`).

## Oxygen
Map the form plugin's markup to these classes (see oxygen-handoff.md).

## Avoid
Placeholder-only labels, errors above the field, and red borders without a message.
