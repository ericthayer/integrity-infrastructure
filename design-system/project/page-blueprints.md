# Page blueprints

Seven pages, built from the components in this system. Each blueprint lists who the page is for, the sections in order (component names in parentheses), the one primary action, and the content the client still has to supply. Home is built in all three concepts; the other six follow the favored concept.

Site-wide: SiteHeader and SiteFooter on every page; one label per intent ("Request a quote", "Call (503) 502-5339", "View open roles", "Start an inquiry"); stable anchor IDs for deep links; 301 redirects from the live URLs (below).

## Home `/`

- **For**: every audience; route each to the right next step in one screen.
- **Sections**: Hero (concept variant) → services (ServiceIndex) → proof (FeatureSplit + reasons, or SpecPlate) → safety teaser (FeatureSplit or SafetyRecord) → Ways of BEING (ValuesBand) → hire, join, partner (AudiencePaths) → Testimonial → FAQ → CTABand.
- **Primary action**: Request a quote.
- **Client inputs**: confirm FAQ answers on coverage; any additional reviews with permission to publish.

## About `/about/`

- **For**: subcontractors, job seekers and PE buyers alike: who runs the company, how it works, where it is going.
- **Sections**: PageHeader → mission and mantra (FeatureSplit, "Build by Building People") → history (Timeline) → Ways of BEING (ValuesBand) → leadership (LeaderCard grid) → the Integrity Corps family (SpecPlate: Integrity Infrastructure, Integrity Traffic, Integrity Equipment Services) → offices in Sherwood, OR and Centennial, CO → AudiencePaths → CTABand.
- **Primary action**: Request a quote; secondary paths to Careers and Subcontractor Inquiry.
- **Client inputs**: founding year and milestones; leadership names, titles, short bios and portraits; how the Integrity Corps companies relate; crew and fleet figures if they want them published.

## Services `/services/`

- **For**: bid partners, utilities, carriers, builders and public agencies scoping work.
- **Sections**: PageHeader → overview (ServiceIndex) → one section per service with anchors `#fiber-splicing`, `#boring`, `#aerial-installation`, `#isp-installation`, `#restoration` (FeatureSplit alternating with full-width SpecPlate rows: method, equipment, typical scope, service area) → how a project runs (Timeline used as a process: scope, plan, build, restore, close out) → service areas → FAQ → CTABand.
- **Primary action**: Request a quote (the form preselects the service from the anchor).
- **Client inputs**: equipment list per service; typical project sizes; service area boundaries; photos of aerial, boring and restoration crews (the shot list).

## Safety `/safety/`

- **For**: contract and bid partners who ask for the safety record first; also crews and PE buyers.
- **Sections**: PageHeader ("Safety is our top priority") → commitment statement → SafetyRecord (EMR, TRIR, DART, OSHA training, certifications) → programs and training (BenefitList used as a checklist) → field practices (Checks: job hazard analysis, stop-work authority, 811 locates, traffic control) → "Request our safety packet" (Notice + link to Contact with topic preset) → CTABand.
- **Primary action**: Request our safety packet (Contact, topic "Safety documents").
- **Client inputs**: current EMR, TRIR and DART rates with the year; certifications and prequalification memberships; the programs they run; whether to publish the numbers or share on request.

## Careers `/careers/`

- **For**: field technicians, splicers, drill operators, lineworkers, CDL drivers and office staff, mostly on phones.
- **Sections**: PageHeader (people-first, crew photo) → why Integrity (BenefitList: growth, safety, values) → roles and paths (AudiencePaths variant listing trades) → open roles (JobList from the Paylocity plugin or feed; embed variant if the plugin only offers an iframe) → hiring process (Timeline as steps) → FAQ → CTABand variant "View open roles".
- **Primary action**: View open roles, then apply on Paylocity.
- **Client inputs**: which Paylocity plugin and whether it outputs markup or an iframe; the feed ID; benefits and pay practices; the hiring steps; crew photos and a short quote from a crew member (with permission).
- **Replace**: the live nav's Careers link points to CareerPlug; retire it.

## Subcontractor Inquiry `/subcontractors/`

- **For**: subcontractors who want to partner.
- **Sections**: PageHeader → who we partner with (Tag list of trades) → requirements (SpecPlate: insurance minimums, safety record, licensing, prequalification) → why partner with Integrity (BenefitList) → SubcontractorForm → what happens next (Timeline as steps) → contact block.
- **Primary action**: Start an inquiry.
- **Client inputs**: insurance minimums and required documents; prequalification steps; the trades they subcontract; who reviews inquiries and how fast.

## Contact `/contact/`

- **For**: anyone ready to talk; the quote form lives here.
- **Sections**: PageHeader → contact methods (CallLink, email, emergency repair Notice) → QuoteForm at `#quote` with a topic field (quote, safety documents, subcontracting, careers, general) → offices (Sherwood, OR and Centennial, CO with map links) → FAQ.
- **Primary action**: Request a quote.
- **Client inputs**: which inbox each topic routes to; office hours; whether there is an after-hours emergency line.

## Redirects from the live site

| Live URL | New URL |
|---|---|
| `/` | `/` |
| `/index.php/get-a-quote/` | `/contact/#quote` |
| Careers link to `integrity-infrastructure.careerplug.com` | `/careers/` |

## Open items for the client

- Master orange: the site CSS uses `#E87722`, the logo art `#F27C25`.
- Vector logo files, approval of the reversed variant, and a compact lockup for small sizes.
- The shot list: aerial bucket truck, drill rig, finished restoration, training, leadership portraits.
- The Facebook icon on the live site links to Integrity Traffic's page; confirm the right profile.
- Which WordPress form plugin will carry the three forms, and the Oxygen version (Classic 4.x or 6).
