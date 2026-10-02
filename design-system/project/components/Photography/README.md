# Photography

The company's own shoot photography, framed in `ii-media` and graded per concept by `--media-filter`.

## Use
- Frame every photo in `<div class="ii-media">` (or `figure.ii-media`); pick a ratio modifier (`--portrait` 4:5, `--tall` 3:4, `--wide` 16:9, `--square`, default 4:3) and set the crop with `style="--focus: 50% 30%"`.
- Work Light grades dark and contrasty; As-Built cool and slightly desaturated; Crew warm and close. The grade comes from the theme; never bake it into the file.
- Captions sit below the frame in `ii-caption`. Missing shots use PhotoSlot.

## Consumer provides
The image, its alt text (what the crew is doing), width and height attributes, and a focal point.

## Oxygen
Image element inside a div with `ii-media`; set focal points in the media library to match `--focus`.

## Avoid
Stock photos of generic workers, AI imagery, tags or text overlaid on photos, and more than one hero-scale photo per section.
