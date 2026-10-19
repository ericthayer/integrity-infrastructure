import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { test } from 'node:test';
import { build } from 'esbuild';
import { ROOT, tags } from './lib/site-files.mjs';

// Unit tests for src/behaviors/netlify-forms.ts with hand-made DOM mocks, plus the markup
// contract Netlify needs to detect and accept the two website forms.
async function loadBehavior() {
  const bundle = await build({
    entryPoints: [fileURLToPath(new URL('../src/behaviors/netlify-forms.ts', import.meta.url))],
    bundle: true, write: false, format: 'esm', platform: 'neutral',
  });
  return import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
}

class FakeFormData {
  constructor(form) { this.entries = form.fields; }
  forEach(fn) { this.entries.forEach(([key, value]) => fn(value, key)); }
}

function setup({ enctype = null, fields = [], withSuccess = true } = {}) {
  const attrs = {};
  const button = {
    disabled: false,
    attrs,
    getAttribute: name => attrs[name] ?? null,
    setAttribute: (name, value) => { attrs[name] = value; },
    removeAttribute: name => { delete attrs[name]; },
  };
  const focused = [];
  const notice = name => ({ name, hidden: true, focus() { focused.push(name); } });
  const success = notice('success');
  const failure = notice('failure');
  const listeners = [];
  const form = {
    dataset: {}, hidden: false, fields,
    getAttribute: name => (name === 'enctype' ? enctype : null),
    addEventListener: (type, fn) => { if (type === 'submit') listeners.push(fn); },
    querySelector: selector => (selector === '[type="submit"]' ? button : null),
    parentElement: {
      querySelector: selector => (selector === '[data-ii-success]' ? (withSuccess ? success : null) : selector === '[data-ii-submit-error]' ? failure : null),
    },
  };
  const root = { querySelectorAll: selector => (selector === 'form[data-ii-netlify]' ? [form] : []) };
  const submit = (defaultPrevented = false) => {
    let prevented = defaultPrevented;
    const event = { get defaultPrevented() { return prevented; }, preventDefault() { prevented = true; } };
    listeners.forEach(fn => fn(event));
    return event;
  };
  return { form, button, success, failure, focused, root, submit };
}

const settle = () => new Promise(resolve => setTimeout(resolve, 0));

async function withMocks(fetchImpl, run) {
  const calls = [];
  const realFetch = globalThis.fetch;
  const realFormData = globalThis.FormData;
  const realError = console.error;
  globalThis.fetch = (url, init) => { calls.push({ url, init }); return fetchImpl(); };
  globalThis.FormData = FakeFormData;
  console.error = () => {};
  try {
    await run(calls);
  } finally {
    globalThis.fetch = realFetch;
    globalThis.FormData = realFormData;
    console.error = realError;
  }
}

const okResponse = () => Promise.resolve({ ok: true, status: 200 });

test('netlify forms are wired once', async () => {
  const { netlifyForms } = await loadBehavior();
  const page = setup();
  assert.equal(netlifyForms(page.root), 1);
  assert.equal(netlifyForms(page.root), 0, 'A second call wires nothing');
});

test('netlify forms leave a submit that validation already stopped', async () => {
  const { netlifyForms } = await loadBehavior();
  const page = setup({ fields: [['name', 'Pat']] });
  await withMocks(okResponse, async calls => {
    netlifyForms(page.root);
    page.submit(true);
    await settle();
    assert.equal(calls.length, 0, 'No request while the form is invalid');
    assert.equal(page.button.disabled, false);
    assert.equal(page.form.hidden, false);
  });
});

test('the quote form posts urlencoded fields with its form name', async () => {
  const { netlifyForms } = await loadBehavior();
  const page = setup({ fields: [['form-name', 'quote'], ['bot-field', ''], ['name', 'Pat Lee'], ['services', 'Boring'], ['services', 'Fiber splicing']] });
  await withMocks(okResponse, async calls => {
    netlifyForms(page.root);
    const event = page.submit();
    assert.equal(event.defaultPrevented, true, 'The native navigation is cancelled');
    assert.equal(page.button.disabled, true, 'The button is disabled while sending');
    assert.equal(page.button.attrs['aria-busy'], 'true');
    await settle();
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, '/');
    assert.equal(calls[0].init.method, 'POST');
    assert.equal(calls[0].init.headers['Content-Type'], 'application/x-www-form-urlencoded');
    const body = new URLSearchParams(calls[0].init.body);
    assert.equal(body.get('form-name'), 'quote');
    assert.equal(body.get('name'), 'Pat Lee');
    assert.deepEqual(body.getAll('services'), ['Boring', 'Fiber splicing']);
  });
});

test('the multipart form posts FormData without setting a content type', async () => {
  const { netlifyForms } = await loadBehavior();
  const page = setup({ enctype: 'multipart/form-data', fields: [['form-name', 'subcontractor'], ['company', 'Acme']] });
  await withMocks(okResponse, async calls => {
    netlifyForms(page.root);
    page.submit();
    await settle();
    assert.equal(calls.length, 1);
    assert.ok(calls[0].init.body instanceof FakeFormData, 'The body is the FormData itself');
    assert.equal(calls[0].init.headers, undefined, 'The browser sets the multipart boundary');
  });
});

test('a sent form is replaced by the success notice, which takes focus', async () => {
  const { netlifyForms } = await loadBehavior();
  const page = setup();
  await withMocks(okResponse, async () => {
    netlifyForms(page.root);
    page.submit();
    await settle();
    assert.equal(page.form.hidden, true);
    assert.equal(page.success.hidden, false);
    assert.equal(page.failure.hidden, true);
    assert.deepEqual(page.focused, ['success']);
    assert.equal(page.button.attrs['aria-busy'], undefined);
  });
});

for (const [label, fetchImpl] of [
  ['a non-ok response', () => Promise.resolve({ ok: false, status: 500 })],
  ['a network failure', () => Promise.reject(new TypeError('Failed to fetch'))],
]) {
  test(`${label} re-enables the button and shows the error notice`, async () => {
    const { netlifyForms } = await loadBehavior();
    const page = setup();
    await withMocks(fetchImpl, async () => {
      netlifyForms(page.root);
      page.submit();
      await settle();
      assert.equal(page.button.disabled, false);
      assert.equal(page.button.attrs['aria-busy'], undefined);
      assert.equal(page.form.hidden, false, 'The form and its answers stay');
      assert.equal(page.success.hidden, true);
      assert.equal(page.failure.hidden, false);
      assert.deepEqual(page.focused, ['failure']);
      // Retrying hides the notice again, and a good answer then succeeds.
      globalThis.fetch = () => okResponse();
      page.submit();
      assert.equal(page.failure.hidden, true);
      await settle();
      assert.equal(page.form.hidden, true);
    });
  });
}

test('a second submit while one is in flight sends nothing', async () => {
  const { netlifyForms } = await loadBehavior();
  const page = setup();
  let resolve;
  await withMocks(() => new Promise(r => { resolve = r; }), async calls => {
    netlifyForms(page.root);
    page.submit();
    page.submit();
    assert.equal(calls.length, 1);
    resolve({ ok: true, status: 200 });
    await settle();
  });
});

test('the contact and subcontractor forms carry the markup Netlify needs', () => {
  for (const [page, name, multipart] of [['contact/index.html', 'quote', false], ['subcontractors/index.html', 'subcontractor', true]]) {
    const html = readFileSync(join(ROOT, page), 'utf8');
    const all = tags(html);
    const form = all.find(tag => tag.name === 'form' && tag.attrs['data-ii-form'] !== undefined);
    assert.ok(form, `${page}: form`);
    assert.equal(form.attrs.name, name, `${page}: form name`);
    assert.equal(form.attrs.method, 'post', `${page}: method`);
    assert.equal(form.attrs['data-netlify'], 'true', `${page}: data-netlify`);
    assert.equal(form.attrs['data-netlify-honeypot'], 'bot-field', `${page}: honeypot`);
    assert.ok('data-ii-netlify' in form.attrs, `${page}: behavior hook`);
    assert.ok(!('data-ii-demo' in form.attrs), `${page}: no demo success`);
    assert.ok(!('action' in form.attrs), `${page}: no action, a native POST goes to the page`);
    assert.equal(form.attrs.enctype === 'multipart/form-data', multipart, `${page}: enctype`);
    const hidden = all.find(tag => tag.name === 'input' && tag.attrs.name === 'form-name');
    assert.equal(hidden?.attrs.type, 'hidden', `${page}: hidden form-name`);
    assert.equal(hidden?.attrs.value, name, `${page}: form-name value`);
    assert.ok(all.some(tag => tag.name === 'input' && tag.attrs.name === 'bot-field'), `${page}: honeypot field`);
    const error = all.find(tag => 'data-ii-submit-error' in tag.attrs);
    assert.equal(error?.attrs.role, 'alert', `${page}: error notice`);
    assert.ok('hidden' in error.attrs, `${page}: error notice starts hidden`);
    assert.ok(html.includes('tel:+15035025339') && html.includes('mailto:info@integrityinfrastructure.com'), `${page}: fallbacks`);
    assert.ok(all.some(tag => 'data-ii-success' in tag.attrs), `${page}: success notice`);
  }
});
