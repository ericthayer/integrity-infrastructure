# FormFeedback

The error summary shown on a failed submit and the success panel shown after a good one; both take focus so screen readers announce them.

## Use
- Error summary: `div.ii-notice.ii-notice--danger[data-ii-error-summary][tabindex="-1"]` inside the form, with `ul[data-ii-error-list]` that the bundle fills with links to each invalid field.
- Success: `div.ii-notice.ii-notice--success[data-ii-success][tabindex="-1"]` beside the form; it replaces the form on success.

## Consumer provides
Titles and the success message (what happens next, and the phone number for urgent work).

## Oxygen
Map to the form plugin's validation and confirmation messages.

## Avoid
Toasts for form errors, and success messages that do not say what happens next.
