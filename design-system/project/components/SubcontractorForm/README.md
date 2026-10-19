# SubcontractorForm

The subcontractor inquiry: company and contact, trades, crew size, service area, certificate of insurance and EMR.

## Use
- Lives on the Subcontractor Inquiry page at `#inquiry`; submit label "Start an inquiry". File upload accepts PDF or images, up to 8 MB, and shows the chosen file name in the hint.
- Trades: boring, aerial construction, fiber splicing, concrete and asphalt restoration, traffic control, locating, hydro excavation, other.
- Required: company, contact, email, phone, at least one trade, crew size, service area. COI, EMR and notes are optional. Errors say how to fix it ("Enter your company name", "Choose at least one trade", "Enter the states or metro areas you cover").
- Design-system previews use `data-ii-demo` (nothing is sent); the review website submits through Netlify Forms on the Netlify deploy only.

## Consumer provides
The form action, the review owner, insurance minimums (shown on the page above the form).

## WordPress
Build in the chosen form plugin with file uploads stored privately; drop `data-ii-demo` and the Netlify attributes.

## Avoid
Asking for documents the team will not review, and public file URLs for uploads.
