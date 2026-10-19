# PageHeader

The inner-page title block: breadcrumb, page title in `ii-display ii-display--lg`, and one lead sentence.

## Use
- One per inner page, directly under the SiteHeader. Breadcrumb in `nav.ii-breadcrumb` with `aria-current="page"` on the last item.
- Lead is one sentence in `ii-lead ii-muted`.
- The website uses the Lit Fiber form, `header.ii-page-header.ii-page-header--lit.ii-under-island` (add `--media` and `figure.ii-page-header__media` for a photo, an `<em>` in the title for the 300-weight orange words, optional `dl.ii-page-header__meta`). Its CSS lives in the site layer, `src/css/site/page-header.css`, not in this bundle.

## Consumer provides
Title, lead, breadcrumb trail.

## WordPress
A reusable block with title, lead and breadcrumb properties (or the breadcrumb from an SEO plugin mapped to the classes).

## Avoid
Hero-scale photography on every inner page, and eyebrows above the title.
