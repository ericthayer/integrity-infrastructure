# Page blueprints

Seven pages, built from the components in this system. Each blueprint lists who the page is for, the sections in order (component names in parentheses), the one primary action, and the content the client still has to supply. The website is built in Lit Fiber, the client's chosen concept, and the finished static pages in the repository (`index.html`, `about/`, `services/`, `safety/`, `careers/`, `subcontractors/`, `contact/`) are the reference for the WordPress build. Home was also explored in Work Light, As-Built and Crew; those concepts are archived.

Site-wide: SiteHeader (island) and SiteFooter on every page; one label per intent ("Request a quote", "Call (503) 502-5339", "View open roles", "Start an inquiry", "Request our safety packet"); stable anchor IDs for deep links; 301 redirects from the live URLs (below). The footer carries the brand line "Fiber and utility construction, from long-haul routes to residential locations.", company links, both offices, phone and email, LinkedIn and Instagram, and a contractor licenses line that stays pending until the client supplies the numbers. Inner pages load no GSAP and no three.js.

## Home `/`

- **For**: every audience; route each to the right next step in one screen.
- **Sections**: Hero (`ii-hero--scene`, FiberScene, "Built to carry the signal.") → services `#services` (ServiceIndex bento, five lines, long-haul first; the lead ends "We build to the home, never inside it.") → why partners choose Integrity (CardStack: accurate billing, quality execution, straight answers, crews that grow) → safety teaser (SafetyRecord beside checks, link to Safety) → footprint `#footprint` (CoverageMap) → Ways of BEING (ValuesBand rail, the mantra as title) → hire, join, partner (AudiencePaths) → what partners say (Testimonial set) → FAQ, including "Do you install internet service inside homes?" → CTABand.
- **Primary action**: Request a quote.
- **Client inputs**: licensed and expansion states for the map; any additional reviews with permission to publish.

## About `/about/`

- **For**: subcontractors, job seekers and PE buyers alike: who runs the company, how it works, where it is going.
- **Sections**: PageHeader (the mantra as title; lead: an independent fiber and utility construction company, with its own leadership, crews and offices) → mission `#mission` (FeatureSplit, "Build by building people") → company at a glance `#company` (SpecPlate: ownership, headquarters, offices, licensed states, founded, crew size, pending where unknown) → history `#history` (Timeline: founding, the Colorado office, an independent company; years pending) → Ways of BEING (static grid, no GSAP) → leadership `#leadership` (LeaderCard grid with PhotoSlot portraits) → offices `#offices` → AudiencePaths → CTABand.
- **Primary action**: Request a quote; secondary paths to Careers and Subcontractor Inquiry.
- **Client inputs**: founding year and milestones; leadership names, titles, short bios and portraits; headquarters; crew size if they want it published; office addresses after the separation.

## Services `/services/`

- **For**: bid partners, utilities, carriers, builders and public agencies scoping work.
- **Sections**: PageHeader ("From the long-haul route to the home.") → where we build `#route` (RouteDiagram: long-haul backbone, middle mile, neighborhood distribution, to the home, and a muted "In-home installation: Not our scope" node) → one section per service line with anchors `#long-haul`, `#fiber-splicing`, `#boring`, `#aerial-installation`, `#restoration` (FeatureSplit alternating with spec rows: method, typical scope, equipment pending; PhotoSlot where no photo exists) → how a project runs `#process` (Timeline as a process: scope, plan, build, restore, close out with as-builts and billing that matches them) → where we work `#coverage` (CoverageMap) → FAQ `#faq` → CTABand.
- **Primary action**: Request a quote (`/contact/?service=<anchor>#quote` preselects the service).
- **Client inputs**: equipment list per service; where the build stops at the home; licensed and expansion states; photos of aerial, boring and restoration crews (the shot list).

## Safety `/safety/`

- **For**: contract and bid partners who ask for the safety record first; also crews and PE buyers.
- **Sections**: PageHeader ("Safety is our top priority.") → commitment statement (leadership sign-off pending) → safety record `#record` (SafetyRecord: EMR, TRIR, DART with the reporting year) → certifications and prequalification `#certifications` (plate cells by category) → field practices `#practices` (checks: job hazard analysis, stop-work authority, 811 locates before any dig, traffic control) → safety packet `#safety-packet` (document list, Notice, "Request our safety packet") → CTABand.
- **Primary action**: Request our safety packet (`/contact/?topic=safety#quote`).
- **Client inputs**: current EMR, TRIR and DART rates with the year; certifications and prequalification memberships; insurance minimums; whether to publish the numbers or share on request.

## Careers `/careers/`

- **For**: field technicians, splicers, drill operators, lineworkers, CDL drivers and office staff, mostly on phones.
- **Sections**: PageHeader (people-first, crew photo, "Build by building people.") → why Integrity `#why` (BenefitList: training and coaching, safety, values, pay and benefits pending) → roles we hire `#roles` (trade tags and short descriptions) → open roles `#open-roles` (JobList from the Paylocity feed, with a direct link to the Paylocity board) → hiring process `#hiring` (Timeline as steps) → crew voice (Testimonial slot, pending) → FAQ → CTABand "View open roles".
- **Primary action**: View open roles, then apply on Paylocity.
- **Client inputs**: the Paylocity company ID, plugin and feed; benefits and pay practices; the hiring steps; crew photos and a short quote from a crew member (with permission).
- **Replace**: the live nav's Careers link points to CareerPlug; retire it.

## Subcontractor Inquiry `/subcontractors/`

- **For**: subcontractors who want to partner.
- **Sections**: PageHeader ("Partner with Integrity.") → trades we partner with `#trades` (Tag list) → requirements `#requirements` (SpecPlate: insurance, safety record, licensing, prequalification; values pending) → why partner with Integrity (BenefitList: clear scopes, accurate billing, a safety-first site, steady communication) → inquiry `#inquiry` (SubcontractorForm) → what happens next (Timeline as steps).
- **Primary action**: Start an inquiry.
- **Client inputs**: insurance minimums and required documents; prequalification steps; the trades they subcontract; who reviews inquiries and how fast.

## Contact `/contact/`

- **For**: anyone ready to talk; the quote form lives here.
- **Sections**: PageHeader → contact methods (CallLink, email, emergency repair Notice with the after-hours line pending) → QuoteForm at `#quote` with a Topic select first (Request a quote, Safety documents, Subcontracting, Careers, General question), preset from `?topic=` and `?service=` → offices `#offices` (Sherwood, OR and Centennial, CO with map links) → FAQ `#faq`.
- **Primary action**: Request a quote.
- **Client inputs**: which inbox each topic routes to; office hours; whether there is an after-hours emergency line.

## Redirects from the live site

| Live URL | New URL |
| --- | --- |
| `/` | `/` |
| `/index.php/get-a-quote/` | `/contact/#quote` |
| Careers link to `integrity-infrastructure.careerplug.com` | `/careers/` |

## Open items for the client

- Master orange: the site CSS uses `#E87722`, the logo art `#F27C25`.
- Logo: approval of the vector reversed lockup the website uses, a vector full-color lockup without the old third line, and a compact lockup for small sizes.
- The shot list: aerial bucket truck, drill rig, finished restoration, training, leadership portraits, and a fleet photo of the company's own trucks.
- Approval of the working tagline "Build by building people".
- Social profiles: the website links LinkedIn and Instagram only. The live site's Facebook icon pointed to another company's page and is removed.
- Which WordPress theme or page builder will carry the site, and which form plugin will carry the two forms (quote with topics, subcontractor inquiry).
