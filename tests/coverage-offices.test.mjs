import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { test } from 'node:test';
import { build } from 'esbuild';
import { ROOT, tags } from './lib/site-files.mjs';

// Coverage map offices: office tiles and key rows are linked both ways, and every row
// carries the confirmed address, a map link and the company phone and email.
async function loadBehavior(file) {
  const bundle = await build({
    entryPoints: [fileURLToPath(new URL(`../src/behaviors/${file}`, import.meta.url))],
    bundle: true, write: false, format: 'esm', platform: 'neutral',
  });
  return import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
}

class FakeElement {
  constructor(attrs = {}) {
    this.attrs = new Map(Object.entries(attrs));
    this.listeners = new Map();
    this.dataset = {};
    this.children = [];
    this.focusVisible = false;
  }
  getAttribute(name) { return this.attrs.has(name) ? this.attrs.get(name) : null; }
  hasAttribute(name) { return this.attrs.has(name); }
  setAttribute(name, value) { this.attrs.set(name, String(value)); }
  removeAttribute(name) { this.attrs.delete(name); }
  toggleAttribute(name, force) {
    const on = force ?? !this.attrs.has(name);
    if (on) this.attrs.set(name, ''); else this.attrs.delete(name);
    return on;
  }
  addEventListener(type, handler) { this.listeners.set(type, [...(this.listeners.get(type) ?? []), handler]); }
  emit(type, extra = {}) {
    const event = { type, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...extra };
    for (const handler of this.listeners.get(type) ?? []) handler(event);
    return event;
  }
  matches(selector) { return selector === ':focus-visible' && this.focusVisible; }
}

function officeMap(codes = ['OR', 'CO']) {
  const map = new FakeElement({ 'data-ii-offices': '' });
  const pins = codes.map(code => new FakeElement({ 'data-ii-office-pin': code }));
  const entries = codes.map(code => {
    const entry = new FakeElement({ 'data-ii-office-entry': code });
    entry.open = false;
    const summary = new FakeElement();
    summary.focused = null;
    summary.scrolled = null;
    summary.focus = options => { summary.focused = options; };
    summary.scrollIntoView = options => { summary.scrolled = options; };
    entry.summary = summary;
    entry.querySelector = selector => (selector === 'summary' ? summary : null);
    return entry;
  });
  map.querySelectorAll = selector => (selector.includes('data-ii-office-pin') ? pins : selector.includes('data-ii-office-entry') ? entries : []);
  return { map, pins, entries, root: { querySelectorAll: () => [map] } };
}

async function withElement(run) {
  globalThis.Element = FakeElement;
  try { await run(); } finally { delete globalThis.Element; }
}

test('clicking an office tile opens its row, closes the others, and toggles closed again', async () => {
  const { coverageOffices } = await loadBehavior('coverage-offices.ts');
  const { pins: [oregon, colorado], entries: [orRow, coRow], root } = officeMap();
  assert.equal(coverageOffices(root), 1);

  coRow.open = true;
  const click = oregon.emit('click');
  assert.ok(click.defaultPrevented, 'The in-page jump is replaced by opening the row in place');
  assert.equal(orRow.open, true);
  assert.equal(coRow.open, false, 'One row open at a time');
  assert.ok(oregon.hasAttribute('data-ii-open') && !colorado.hasAttribute('data-ii-open'), 'The open row is mirrored on its tile');
  assert.deepEqual(orRow.summary.focused, { preventScroll: true }, 'Focus moves to the row without a page jump');
  assert.deepEqual(orRow.summary.scrolled, { block: 'nearest' });

  oregon.emit('click');
  assert.equal(orRow.open, false, 'A second click closes the row');
  assert.ok(!oregon.hasAttribute('data-ii-open'));

  coRow.open = true;
  coRow.emit('toggle');
  assert.ok(colorado.hasAttribute('data-ii-open'), 'Opening a row from its summary marks its tile');
});

test('hovering a tile or row, or keyboard focus in a row, marks the matching pair', async () => {
  await withElement(async () => {
    const { coverageOffices } = await loadBehavior('coverage-offices.ts');
    const { map, pins: [oregon, colorado], entries: [orRow, coRow], root } = officeMap();
    coverageOffices(root);

    oregon.emit('pointerenter');
    assert.equal(map.getAttribute('data-ii-office-active'), 'OR');
    assert.ok(oregon.hasAttribute('data-ii-active') && orRow.hasAttribute('data-ii-active'), 'Tile hover marks its row');
    assert.ok(!colorado.hasAttribute('data-ii-active') && !coRow.hasAttribute('data-ii-active'));
    oregon.emit('pointerleave');
    assert.equal(map.getAttribute('data-ii-office-active'), null);

    coRow.emit('pointerenter');
    assert.ok(colorado.hasAttribute('data-ii-active'), 'Row hover marks its tile');
    coRow.emit('pointerleave');

    const summary = new FakeElement();
    summary.focusVisible = true;
    coRow.emit('focusin', { target: summary });
    assert.equal(map.getAttribute('data-ii-office-active'), 'CO', 'Keyboard focus marks the tile');
    oregon.emit('pointerenter');
    assert.equal(map.getAttribute('data-ii-office-active'), 'OR', 'Hover wins while it lasts');
    oregon.emit('pointerleave');
    assert.equal(map.getAttribute('data-ii-office-active'), 'CO', 'Focus resumes after the pointer leaves');
    coRow.emit('focusout');
    assert.equal(map.getAttribute('data-ii-office-active'), null);

    summary.focusVisible = false;
    coRow.emit('focusin', { target: summary });
    assert.equal(map.getAttribute('data-ii-office-active'), null, 'Focus from a tile click does not leave the map dimmed');
  });
});

test('coverageOffices skips maps without pins or rows and wires each map once', async () => {
  const { coverageOffices } = await loadBehavior('coverage-offices.ts');
  const { root } = officeMap();
  assert.equal(coverageOffices(root), 1);
  assert.equal(coverageOffices(root), 0, 'Already wired');
  const empty = new FakeElement({ 'data-ii-offices': '' });
  empty.querySelectorAll = () => [];
  assert.equal(coverageOffices({ querySelectorAll: () => [empty] }), 0);
  assert.equal(coverageOffices({ querySelectorAll: () => [] }), 0);
});

test('every coverage map links its office tiles to rows with the address, map link, phone and email', () => {
  const sources = ['index.html', 'services/index.html', 'src/partials/site/coverage.html'];
  const offices = { OR: '13565 SW Tualatin Sherwood Road, Suite 800<br>Sherwood, OR 97140', CO: '8085 S Chester St, Suite 220<br>Centennial, CO 80112' };
  for (const file of sources) {
    const html = readFileSync(join(ROOT, file), 'utf8').replace(/<!--[\s\S]*?-->/g, ' ');
    const figure = /<figure class="ii-coverage"[\s\S]*?<\/figure>/.exec(html)?.[0] ?? '';
    const all = tags(figure);
    assert.ok(all.some(tag => tag.name === 'figure' && 'data-ii-offices' in tag.attrs), `${file}: map is wired`);
    const officeTiles = all.filter(tag => tag.name === 'li' && tag.attrs['data-status'] === 'office').map(tag => tag.attrs['data-state']);
    const pins = all.filter(tag => tag.name === 'a' && 'data-ii-office-pin' in tag.attrs);
    assert.deepEqual(pins.map(pin => pin.attrs['data-ii-office-pin']), officeTiles, `${file}: one pin per office tile`);
    for (const pin of pins) {
      const code = pin.attrs['data-ii-office-pin'];
      assert.equal(pin.attrs.tabindex, '-1', `${file}: ${code} pin stays out of the tab order (the map is aria-hidden; the row is the control)`);
      const id = pin.attrs.href.slice(1);
      const row = new RegExp(`<details class="ii-coverage__office" name="ii-coverage-office" data-ii-office-entry="${code}">[\\s\\S]*?</details>`).exec(figure)?.[0] ?? '';
      assert.ok(row, `${file}: ${code} has a row`);
      assert.match(row, new RegExp(`id="${id}"`), `${file}: ${code} pin targets an element inside its row, so the browser opens it without JS`);
      assert.match(row, /<summary class="ii-coverage__summary">/, `${file}: ${code} row has a summary`);
      assert.ok(row.includes(`<address>${offices[code]}</address>`), `${file}: ${code} confirmed address`);
      assert.match(row, /href="https:\/\/www\.google\.com\/maps\/search\/\?api=1&amp;query=[^"]+" target="_blank" rel="noopener"/, `${file}: ${code} map link`);
      assert.match(row, /opens in a new tab/, `${file}: ${code} map link announces the new tab`);
    }
    const contact = /<dd class="ii-coverage__item ii-coverage__contact">[\s\S]*?<\/dd>/.exec(figure)?.[0] ?? '';
    assert.match(contact, /href="tel:\+15035025339"[^>]*>[\s\S]*?\(503\) 502-5339<\/a>/, `${file}: phone`);
    assert.match(contact, /href="mailto:info@integrityinfrastructure\.com"/, `${file}: email`);
  }
});
