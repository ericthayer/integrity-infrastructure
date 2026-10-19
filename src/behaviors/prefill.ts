// ---------------------------------------------------------------- prefill: form controls from the URL query
// Links like /contact/?topic=safety&service=boring#quote preselect the Topic option
// whose value is "safety" and check the service box keyed "boring". Only controls that
// opt in with data-ii-prefill-from="<param>" are touched; checkboxes and radios match
// on data-ii-key. Unknown values are ignored, so a stale link never breaks the form.

type PrefillControl = HTMLSelectElement | HTMLInputElement;

function isSelect(el: Element): el is HTMLSelectElement {
  return el.tagName === 'SELECT';
}
function isCheckable(el: Element): el is HTMLInputElement {
  return el.tagName === 'INPUT' && ['checkbox', 'radio'].includes((el as HTMLInputElement).type);
}

/** Applies URL query values to opted-in controls; returns how many controls changed. */
export function prefill(root: ParentNode = document, search: string = window.location.search): number {
  const params = new URLSearchParams(search);
  let applied = 0;
  root.querySelectorAll<PrefillControl>('[data-ii-prefill-from]').forEach(control => {
    const from = control.getAttribute('data-ii-prefill-from');
    const wanted = from ? params.get(from)?.trim().toLowerCase() : undefined;
    if (!wanted) return;
    if (isSelect(control)) {
      const option = Array.from(control.options).find(o => o.value.toLowerCase() === wanted);
      if (option && !option.disabled) {
        control.value = option.value;
        applied++;
      }
    } else if (isCheckable(control) && control.getAttribute('data-ii-key')?.toLowerCase() === wanted) {
      control.checked = true;
      applied++;
    }
  });
  return applied;
}
