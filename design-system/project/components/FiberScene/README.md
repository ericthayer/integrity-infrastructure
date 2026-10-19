# FiberScene

The Lit Fiber hero background: glass strands carrying orange and flame-yellow light pulses, drawn with three.js and driven by scroll and pointer.

## Use
- Markup: `div.ii-hero__scene[data-ii-scene][aria-hidden="true"]` inside `ii-hero--scene` (or any positioned host). The CSS glow behind it (`::before`) is the fallback and the first paint.
- Mount from the page with an ES module import so the bundle stays dependency-free: `import * as THREE from '<three.module.min.js>'; IntegrityDS.scene.mountAll(THREE)`. Load the module after the bundle; three.js 0.186 ships `three.module.min.js` plus `three.core.min.js` beside it.
- Colors come from the tokens at mount time (`--brand-orange`, `--flame-yellow`, `--neutral-300`, `--surface` for fog), so the scene follows the theme.
- Budget: 16 tube strands (10 under 768px), 48 point sprites, pixel ratio capped at 2 (1.5 on phones), one draw per strand plus one for the pulses. It pauses when the host leaves the viewport or the tab hides.
- Reduced motion renders one still frame and ignores the pointer. Without WebGL `mount()` returns null and nothing is added.

## Consumer provides
Nothing but the module import. `mount(el, THREE, { strands, pulses })` for a custom count; the handle has `start()`, `stop()` and `dispose()`.

## WordPress
Enqueue the three.js module (script module) on the Home template only, after the bundle, with a code block that calls `mountAll`. The canvas is decorative; the headline stays the LCP element.

## Avoid
Mounting on inner pages, text over the moving part of the scene, and raising the counts without checking a mid-range phone.
