// ---------------------------------------------------------------- topic fields: requirements follow the form's Topic
// A control with data-ii-required-for="quote subcontracting" is required only while the
// form's Topic select (name="topic") holds one of those values; its label's
// [data-ii-optional-note] shows "(optional)" otherwise. Without JavaScript every such
// control stays required, so the form never accepts less than the quote needs.

type TopicControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/** Wires every form with a Topic select under root; returns how many forms were wired. */
export function topicFields(root: ParentNode = document): number {
  let wired = 0;
  root.querySelectorAll<HTMLFormElement>('form').forEach(form => {
    const topic = form.querySelector<HTMLSelectElement>('select[name="topic"]');
    const controls = Array.from(form.querySelectorAll<TopicControl>('[data-ii-required-for]'));
    if (!topic || !controls.length || form.dataset.iiReadyTopic) return;
    form.dataset.iiReadyTopic = '1';
    const apply = (): void => {
      controls.forEach(control => {
        const needed = (control.getAttribute('data-ii-required-for') ?? '').split(/\s+/).includes(topic.value);
        if (control.required === needed) return;
        control.required = needed;
        const note = control.id ? form.querySelector<HTMLElement>(`label[for="${control.id}"] [data-ii-optional-note]`) : null;
        if (note) note.hidden = needed;
        // Lets the form runtime clear an error that no longer applies.
        control.dispatchEvent(new Event('change', { bubbles: true }));
      });
    };
    topic.addEventListener('change', apply);
    apply();
    wired++;
  });
  return wired;
}
