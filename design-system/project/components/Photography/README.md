# Photography

The company's own shoot photography, framed in `ii-media` and graded per concept by `--media-filter`.

## Use
- Frame every photo in `<div class="ii-media">` (or `figure.ii-media`); pick a ratio modifier (`--portrait` 4:5, `--tall` 3:4, `--wide` 16:9, `--square`, default 4:3) and set the crop with `style="--focus: 50% 30%"`.
- Lit Fiber, the website's concept, grades cool, desaturated and contrasty, night work first; the archived concepts grade Work Light dark and contrasty, As-Built cool and slightly desaturated, Crew warm and close. The grade comes from the theme; never bake it into the file.
- Captions sit below the frame in `ii-caption`. Missing shots use PhotoSlot.
- `fleet-mountains.jpg` is retired: it shows other companies' trucks. A fleet photo of the company's own trucks is on the shot list.
- On the website, photos ship as `<picture>` with AVIF and WebP at 640, 1024 and 1600 plus the JPEG, with `width` and `height`.

## Consumer provides
The image, its alt text (what the crew is doing), width and height attributes, and a focal point.

## WordPress
Image element inside a div with `ii-media`; set focal points in the media library to match `--focus`.

## Avoid
Stock photos of generic workers, AI imagery, tags or text overlaid on photos, and more than one hero-scale photo per section.
