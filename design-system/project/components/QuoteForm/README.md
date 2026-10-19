# QuoteForm

The quote request on Contact, the site's one conversion form: a topic, contact details, services needed, location, timeline and project details.

## Use
- Lives on Contact at `#quote`; every "Request a quote" links there. `data-ii-form` turns on validation and the error summary. Design-system previews and concept pages use `data-ii-demo` (shows the success panel, nothing is sent); the review website submits through Netlify Forms (`data-ii-netlify`) on the Netlify deploy only.
- Fields, in order: Topic (a select, first: Request a quote, Safety documents, Subcontracting, Careers, General question), name, company (optional), email, phone, services (optional checkboxes for the five service lines), project location, timeline, project details (20 characters minimum). Location and timeline are required only for the quote topic (`data-ii-required-for="quote"`).
- Prefill: the topic select carries `data-ii-prefill-from="topic"` and each service checkbox `data-ii-prefill-from="service"` with its `data-ii-key` (`long-haul`, `fiber-splicing`, `boring`, `aerial-installation`, `restoration`), so `/contact/?topic=safety#quote` and `?service=boring` preset them.
- Errors say how to fix it, through `data-ii-error`: "Enter your name", "Enter an email address like name@company.com", "Enter a phone number like (503) 502-5339", "Enter the project location, like Sherwood, OR", "Choose when the work needs to start", "Describe the work in at least 20 characters".

## Consumer provides
The form action and routing; which inbox each topic reaches.

## WordPress
Build in the chosen form plugin with the Field classes, the topic routing and the URL prefill; drop `data-ii-demo` and the Netlify attributes.

## Avoid
Asking for budget up front, CAPTCHAs that block keyboard users, and more than one quote form per page.
