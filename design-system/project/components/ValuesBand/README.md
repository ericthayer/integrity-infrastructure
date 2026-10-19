# ValuesBand

The Ways of BEING and the mantra, in four treatments: a pausable ticker (Work Light), a six-cell grid plate (As-Built), the page's one orange field (Crew), and a horizontal rail of glass cells (Lit Fiber).

## Use
- Values, in order: be generous, be accountable, be coachable, be safe, be caring, always be better. Mantra: "Doing what's right when nobody is looking."
- `ii-values--marquee`: the second list copy is `aria-hidden`; the Pause button (`data-ii-marquee-toggle`) meets WCAG 2.2.2; reduced motion shows a static list.
- `ii-values--grid`: a SpecPlate with three columns.
- `ii-values--field` inside `ii-on-accent`: ink on orange, weights alternating 700 and 300. Once per page.
- `ii-values--rail` with `data-ii-rail` on the section: six square cells (`ii-rail__item.ii-shell`, index plus word) on a native scroll-snap track; the scroller `div.ii-rail` carries `tabindex="0" role="region" aria-label="Ways of BEING"` so keyboard users can scroll it; at 1024px and up with GSAP the section pins and vertical scroll drives it.

## Consumer provides
Nothing new: the values and mantra are the company's own words.

## WordPress
Build only the rail (Lit Fiber) for Home; About uses a static glass grid with no GSAP.

## Avoid
Adding definitions the company has not written, a second marquee on the page, and a second orange field.
