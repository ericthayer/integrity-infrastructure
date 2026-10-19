// ---------------------------------------------------------------- first-screen reveals
// Scroll reveals (`[data-ii-reveal]`) are CSS scroll-driven animations (components.css). An
// element already partly on screen at load sits mid-animation (partly transparent and
// translated) until the user scrolls, which reads as a half-faded heading and fails colour
// contrast. This marks every reveal element that intersects the first viewport with
// `data-ii-reveal-seen`; site.css turns the animation off for those. Elements below the
// first screen keep animating. Idempotent: marking an element twice changes nothing.

/**
 * Marks every `[data-ii-reveal]` under root whose box intersects the viewport right now.
 * Returns how many were marked. Safe to call more than once.
 */
export function revealSeen(root: ParentNode = document, viewportHeight: number = window.innerHeight): number {
  let marked = 0;
  root.querySelectorAll<HTMLElement>('[data-ii-reveal]').forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < viewportHeight && rect.bottom > 0) {
      element.setAttribute('data-ii-reveal-seen', '');
      marked++;
    }
  });
  return marked;
}
