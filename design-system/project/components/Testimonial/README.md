# Testimonial

A client quote of three lines at most, with name and source.

## Use
- `figure.ii-quote` with the decorative quote mark (`aria-hidden`), `blockquote.ii-quote__text`, and `figcaption` with name and source.
- Current quote: Barbara Barbour, Google review, in full.
- The website shows a set: `ul.ii-quotes` of `li.ii-quotes__item.ii-shell` holding `figure.ii-quote`, plus pending review slots (`li.ii-quotes__item--pending`). Its CSS lives in the site layer, `src/css/site/proof.css`.

## Consumer provides
Quote text (trimmed honestly), name, source; permission to publish.

## WordPress
Bind to a Testimonials post type; one quote per section.

## Avoid
Invented quotes, first-name-only attribution, carousels of quotes on Home.
