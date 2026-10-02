# Motion

The Lit Fiber choreography: GSAP 3 hooks that read `data-ii-*` attributes, and a pointer glow that needs no library. Everything degrades to a CSS-only state.

## Hooks
- `data-ii-words` on a plain-text headline: the words rise out of masks on load (1.15s, expo-out, 70ms stagger). Without GSAP the headline rises with the CSS `ii-rise` animation instead.
- `data-ii-magnetic` on a button: it leans toward the pointer and springs back. Hover devices only.
- `data-ii-stack` on a CardStack: scale and fade driven by ScrollTrigger.
- `data-ii-rail` on a ValuesBand rail at 1024px and up: the section pins and vertical scroll drives the track. Below that, and without ScrollTrigger, the rail is a native scroll-snap track.
- `data-ii-glow` on a host of `.ii-shell` panels: the orange glow follows the pointer (`--mx`, `--my` on the panel).
- `data-ii-sheet-host="<dialog id>"` around a ServiceIndex: a tile morphs into the ServiceSheet dialog through a same-document view transition (`IntegrityDS.sheet`, no GSAP).
- Cross-document view transitions: each page adds `@view-transition { navigation: auto; }`; the island header carries `view-transition-name: ii-header`, so it stays put while the page swaps beneath it.

## Use
- Load `gsap.min.js` and `ScrollTrigger.min.js` (GSAP 3.13 and later are free for commercial use) before the bundle; `IntegrityDS.motion()` runs on init and is a no-op without `window.gsap` or under `prefers-reduced-motion: reduce`.
- Animate only `transform`, `opacity` and the reveal blur. No scroll listeners: ScrollTrigger and the CSS scroll-driven reveal (`data-ii-reveal`, with the soft blur variant in this concept) do the work.
- Durations and easing come from the concept: 700ms, `cubic-bezier(0.32, 0.72, 0, 1)`.

## Consumer provides
The attributes above on the elements they describe.

## Oxygen
Enqueue GSAP core and ScrollTrigger, then the bundle, on every Lit Fiber page. Nothing else changes: the hooks are attributes on ordinary elements.

## Avoid
Smooth-scroll libraries that take over the wheel, motion on inner-page text, parallax on photographs, and any hook on an element that also carries `data-ii-reveal`.
