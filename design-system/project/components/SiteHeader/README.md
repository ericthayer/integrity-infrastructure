# SiteHeader

The site header in two forms: the sticky bar (logo, one-line nav from 1024px, phone, quote button, drawer below 1024px) and the Lit Fiber island, a fixed glass pill with a full-screen veil menu.

## Use
- Markup lives in `header.ii-header[data-ii-header]` plus a sibling `div.ii-drawer[data-ii-drawer]` (outside the header, so the stuck header's backdrop blur cannot trap it). A skip link `a.ii-skip` comes first.
- Nav items, in order: Services, Safety, About, Careers, Subcontractors, Contact. Mark the current page with `aria-current="page"`.
- `ii-header--overlay` with `data-ii-header-offset="80"` sits transparent over a full-bleed hero and turns solid after 80px of scroll (Work Light home).
- `ii-header--island` with the drawer as `ii-drawer--veil` (Lit Fiber): the pill floats 16px from the top, centered, with `view-transition-name: ii-header`; the burger is two CSS bars that cross while open; the veil's own pill sits in the same place, so the cross reads as the morphed burger; links stagger in. Inner pages under an island start with `ii-under-island`.
- Behavior: `IntegrityDS.header()` toggles `is-stuck` from a sentinel (no scroll listener); `IntegrityDS.nav()` opens the drawer, traps focus, closes on Esc or backdrop, and returns focus to the toggle.

## Consumer provides
Nav items and hrefs, the current page, the phone number and the quote link.

## Oxygen
Header template with the classes; the drawer as a sibling section; enqueue the bundle once.

## Avoid
A second nav row, more than six items, hiding the phone on desktop, and placing the drawer inside the header element.
