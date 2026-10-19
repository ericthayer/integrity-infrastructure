// ---------------------------------------------------------------- line art draw-on
// Decorative trade linework (`svg.ii-line-art[data-ii-line-art]`, see
// src/partials/site/line-art.html) draws itself on the first time each piece scrolls into
// view. The markup ships fully drawn, so the art is complete without JavaScript, without
// IntersectionObserver and under prefers-reduced-motion (none of those arm it). Arming sets
// data-ii-draw="armed" (line-art.css hides every stroke with a dash offset); entering the
// viewport sets data-ii-draw="drawn" and the strokes draw on. Pieces that enter together are
// staggered through --ii-draw-delay. Once per piece; wiring twice changes nothing.

/** Delay between pieces that enter the viewport in the same observer callback. */
export const LINE_ART_STAGGER_MS = 140;
/** Share of a piece that must be visible before it draws. */
export const LINE_ART_THRESHOLD = 0.35;

type ObserverFactory = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit,
) => Pick<IntersectionObserver, 'observe' | 'unobserve'>;

export interface LineArtEnvironment {
  /** True when the viewer asked for reduced motion; the art then stays drawn. */
  reducedMotion: boolean;
  /** Creates the observer; null when IntersectionObserver is unavailable. */
  createObserver: ObserverFactory | null;
}

function browserEnvironment(): LineArtEnvironment {
  const reducedMotion = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const createObserver: ObserverFactory | null = typeof window.IntersectionObserver === 'function'
    ? (callback, options) => new window.IntersectionObserver(callback, options)
    : null;
  return { reducedMotion, createObserver };
}

/**
 * Arms every line-art piece under root and draws each one as it scrolls into view.
 * Returns how many pieces were armed (0 when motion is reduced or unsupported).
 */
export function lineArt(root: ParentNode = document, env: LineArtEnvironment = browserEnvironment()): number {
  if (env.reducedMotion || !env.createObserver) return 0;
  const pieces = Array.from(root.querySelectorAll<SVGSVGElement>('svg[data-ii-line-art]'))
    .filter(piece => !piece.hasAttribute('data-ii-draw'));
  if (!pieces.length) return 0;

  const observer = env.createObserver(entries => {
    const entering = entries
      .filter(entry => entry.isIntersecting && entry.intersectionRatio >= LINE_ART_THRESHOLD)
      .map(entry => entry.target as SVGSVGElement)
      .sort((a, b) => pieces.indexOf(a) - pieces.indexOf(b));
    entering.forEach((piece, index) => {
      piece.style.setProperty('--ii-draw-delay', `${index * LINE_ART_STAGGER_MS}ms`);
      piece.setAttribute('data-ii-draw', 'drawn');
      observer.unobserve(piece);
    });
  }, { threshold: [0, LINE_ART_THRESHOLD] });

  pieces.forEach(piece => {
    piece.setAttribute('data-ii-draw', 'armed');
    observer.observe(piece);
  });
  return pieces.length;
}
