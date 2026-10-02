# QuoteForm

The quote request, the site's one conversion form: contact details, services needed, location, timeline and project details.

## Use
- Lives on Contact at `#quote`; every "Request a quote" links there. `data-ii-form` turns on validation and the error summary; `data-ii-demo` (concepts only) shows the success panel without sending.
- Fields: name, company (optional), email, phone, services (at least one), project location, timeline, project details (20 characters minimum). Add a topic field on Contact to route safety documents, subcontracting, careers and general questions.

## Consumer provides
The form action and routing; which inbox each topic reaches.

## Oxygen
Build in the chosen form plugin with the Field classes; remove `data-ii-demo`.

## Avoid
Asking for budget up front, CAPTCHAs that block keyboard users, and more than one quote form per page.
