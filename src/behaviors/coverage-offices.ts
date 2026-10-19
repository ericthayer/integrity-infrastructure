// ---------------------------------------------------------------- coverage map offices
// Links the office tiles on the coverage map (`a[data-ii-office-pin]`) to their rows in the
// key (`details[data-ii-office-entry]`), matched by state code, inside `[data-ii-offices]`.
// Without JS a tile is an in-page link to its row's body, which the browser reveals by
// opening the <details>. With JS:
// - hovering a tile or row, or keyboard focus in a row, marks the tile and row with
//   data-ii-active and the map with data-ii-office-active (CSS dims the other tiles);
// - clicking a tile opens its row (closing the others) or closes it if open, then moves
//   focus to the row's summary without scrolling the page more than needed;
// - data-ii-open on a tile mirrors whether its row is open.

const PIN = 'data-ii-office-pin';
const ENTRY = 'data-ii-office-entry';

/** Wires every office map under root; returns how many were wired. Safe to call twice. */
export function coverageOffices(root: ParentNode = document): number {
  let wired = 0;
  root.querySelectorAll<HTMLElement>('[data-ii-offices]').forEach(map => {
    if (map.dataset.iiReadyOffices) return;
    const pins = Array.from(map.querySelectorAll<HTMLAnchorElement>(`a[${PIN}]`));
    const entries = Array.from(map.querySelectorAll<HTMLDetailsElement>(`details[${ENTRY}]`));
    if (!pins.length || !entries.length) return;
    map.dataset.iiReadyOffices = '1';

    const entryFor = (code: string): HTMLDetailsElement | undefined =>
      entries.find(entry => entry.getAttribute(ENTRY) === code);
    let hovered: string | null = null;
    let focused: string | null = null;

    const sync = (): void => {
      const active = hovered ?? focused;
      if (active) map.setAttribute('data-ii-office-active', active);
      else map.removeAttribute('data-ii-office-active');
      for (const pin of pins) {
        const code = pin.getAttribute(PIN);
        pin.toggleAttribute('data-ii-active', code === active);
        pin.toggleAttribute('data-ii-open', code !== null && entryFor(code)?.open === true);
      }
      for (const entry of entries) entry.toggleAttribute('data-ii-active', entry.getAttribute(ENTRY) === active);
    };
    const hover = (code: string | null): void => {
      hovered = code;
      sync();
    };

    for (const pin of pins) {
      const code = pin.getAttribute(PIN) ?? '';
      const entry = entryFor(code);
      if (!entry) continue;
      pin.addEventListener('pointerenter', () => hover(code));
      pin.addEventListener('pointerleave', () => hover(null));
      pin.addEventListener('click', (event: Event) => {
        event.preventDefault();
        const opening = !entry.open;
        if (opening) for (const other of entries) if (other !== entry) other.open = false;
        entry.open = opening;
        sync();
        const summary = entry.querySelector<HTMLElement>('summary');
        if (!summary) return;
        summary.focus({ preventScroll: true });
        summary.scrollIntoView({ block: 'nearest' });
      });
    }

    for (const entry of entries) {
      const code = entry.getAttribute(ENTRY) ?? '';
      entry.addEventListener('pointerenter', () => hover(code));
      entry.addEventListener('pointerleave', () => hover(null));
      // Keyboard focus only: a tile click focuses the summary too, and should not leave the
      // map dimmed afterwards.
      entry.addEventListener('focusin', (event: Event) => {
        const target = event.target;
        focused = target instanceof Element && target.matches(':focus-visible') ? code : null;
        sync();
      });
      entry.addEventListener('focusout', () => {
        focused = null;
        sync();
      });
      entry.addEventListener('toggle', sync);
    }

    sync();
    wired++;
  });
  return wired;
}
