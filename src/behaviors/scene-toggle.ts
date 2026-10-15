// ---------------------------------------------------------------- scene pause control (WCAG 2.2.2)
// A toggle button `[data-ii-scene-toggle]` pauses and resumes the FiberScene it names with
// aria-controls (the `[data-ii-scene]` host) by setting data-ii-scene-paused, which the scene
// observes. The accessible name stays constant; aria-pressed carries the state.

/** Wires every scene toggle under root; returns how many were wired. */
export function sceneToggle(root: ParentNode = document): number {
  let wired = 0;
  root.querySelectorAll<HTMLButtonElement>('button[data-ii-scene-toggle]').forEach(button => {
    const id = button.getAttribute('aria-controls');
    const host = id ? document.getElementById(id) : null;
    if (!host || button.dataset.iiReadyToggle) return;
    button.dataset.iiReadyToggle = '1';
    const sync = (): void => {
      const paused = host.hasAttribute('data-ii-scene-paused');
      button.setAttribute('aria-pressed', String(paused));
    };
    button.addEventListener('click', () => {
      host.toggleAttribute('data-ii-scene-paused');
      sync();
    });
    sync();
    wired++;
  });
  return wired;
}
