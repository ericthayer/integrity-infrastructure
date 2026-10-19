// ---------------------------------------------------------------- netlify forms: submit without leaving the page
// A form marked data-ii-netlify is posted to Netlify Forms with fetch. Netlify detects the
// form from the built HTML (name, data-netlify, a hidden form-name field), so the markup
// stays in the page source and the form still works as a native POST when JavaScript is
// off. The form runtime in site.ts runs first: it validates and calls preventDefault()
// when a field is wrong, and this behavior then leaves the event alone. Otherwise it
// sends the form, then swaps in the [data-ii-success] notice next to the form, or shows
// the [data-ii-submit-error] notice and keeps the form so nothing the visitor typed is lost.
// A multipart form (file upload) is sent as FormData; any other form is URL-encoded.

function encodedBody(data: FormData): URLSearchParams {
  const body = new URLSearchParams();
  data.forEach((value, key) => {
    if (typeof value === 'string') body.append(key, value);
  });
  return body;
}

async function send(form: HTMLFormElement): Promise<Response> {
  const data = new FormData(form);
  if (form.getAttribute('enctype') === 'multipart/form-data') {
    // No Content-Type header: the browser adds the multipart boundary itself.
    return fetch('/', { method: 'POST', body: data });
  }
  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodedBody(data).toString(),
  });
}

/** Wires every form[data-ii-netlify] under root; returns how many forms were wired. */
export function netlifyForms(root: ParentNode = document): number {
  let wired = 0;
  root.querySelectorAll<HTMLFormElement>('form[data-ii-netlify]').forEach(form => {
    if (form.dataset.iiReadyNetlify) return;
    form.dataset.iiReadyNetlify = '1';
    const notices = form.parentElement;
    const success = notices?.querySelector<HTMLElement>('[data-ii-success]') ?? null;
    const failure = notices?.querySelector<HTMLElement>('[data-ii-submit-error]') ?? null;
    let sending = false;

    const fail = (button: HTMLButtonElement | null, reason: unknown): void => {
      console.error('Form submission failed.', reason);
      sending = false;
      if (button) {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }
      if (failure) {
        failure.hidden = false;
        failure.focus();
      }
    };

    form.addEventListener('submit', event => {
      // Validation in the form runtime already stopped this submit.
      if (event.defaultPrevented) return;
      event.preventDefault();
      if (sending) return;
      sending = true;
      const button = form.querySelector<HTMLButtonElement>('[type="submit"]');
      if (failure) failure.hidden = true;
      if (button) {
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
      }
      send(form).then(
        response => {
          if (!response.ok) {
            fail(button, new Error(`Netlify answered ${response.status}`));
            return;
          }
          sending = false;
          if (button) {
            button.disabled = false;
            button.removeAttribute('aria-busy');
          }
          if (success) {
            form.hidden = true;
            success.hidden = false;
            success.focus();
          }
        },
        (error: unknown) => fail(button, error),
      );
    });
    wired++;
  });
  return wired;
}
