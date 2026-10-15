import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { test } from 'node:test';
import { build } from 'esbuild';
import { ROOT, SITE_PAGES, tags } from './lib/site-files.mjs';

// Source-level contract for the seven website pages (tasks/website-spec.md).
const read = page => readFileSync(join(ROOT, page), 'utf8');
const pages = Object.fromEntries(SITE_PAGES.map(page => [page, read(page)]));
const urlFor = page => '/' + page.replace(/index\.html$/, '');
const visibleText = html => html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
const block = (html, pattern) => pattern.exec(html)?.[0] ?? '';
const shellOf = html => [/<a class="ii-skip"[\s\S]*?<\/header>/, /<div class="ii-drawer[\s\S]*?\n<\/div>/, /<footer class="ii-footer">[\s\S]*?<\/footer>/]
  .map(pattern => block(html, pattern).replace(/ aria-current="page"/g, ''));

test('all seven website pages exist on the Lit Fiber theme with the website entry', () => {
  for (const [page, html] of Object.entries(pages)) {
    assert.match(html, /<html lang="en" data-theme="lit-fiber">/, `${page}: theme`);
    assert.match(html, /<script type="module" src="\/src\/website\.ts"><\/script>/, `${page}: website entry`);
    assert.doesNotMatch(html, /src="\/src\/main\.ts"/, `${page}: must not load the concept entry directly`);
    assert.match(html, /<meta name="robots" content="noindex">/, `${page}: staging pages stay out of search`);
    const title = /<title>([^<]+)<\/title>/.exec(html)?.[1] ?? '';
    assert.match(title, /Integrity Infrastructure/, `${page}: title names the company`);
    const description = /<meta name="description" content="([^"]+)">/.exec(html)?.[1] ?? '';
    assert.ok(description.length > 50 && description.length <= 160, `${page}: description length ${description.length}`);
    assert.doesNotMatch(html, /data-concept-chrome|cx-bar/, `${page}: no concept presentation chrome`);
  }
});

test('header, drawer and footer are identical on every page, with the current page marked', () => {
  const [reference] = Object.values(pages).map(shellOf);
  for (const [page, html] of Object.entries(pages)) {
    shellOf(html).forEach((part, index) => {
      assert.ok(part.length > 200, `${page}: shell part ${index} missing`);
      assert.equal(part, reference[index], `${page}: shell part ${index} differs from Home`);
    });
    const current = tags(block(html, /<header[\s\S]*?<\/header>/)).filter(tag => tag.attrs['aria-current'] === 'page');
    assert.equal(current.length, 1, `${page}: one current link in the header`);
    assert.equal(current[0].attrs.href, urlFor(page), `${page}: header marks its own URL`);
    if (page !== 'index.html') {
      const drawer = tags(block(html, /<div class="ii-drawer[\s\S]*?\n<\/div>/)).filter(tag => tag.attrs['aria-current'] === 'page');
      assert.deepEqual(drawer.map(tag => tag.attrs.href), [urlFor(page)], `${page}: drawer marks its own URL`);
    }
  }
});

test('each page has one h1, no skipped heading levels and unique ids', () => {
  for (const [page, html] of Object.entries(pages)) {
    const main = block(html, /<main[\s\S]*<\/main>/);
    const headings = tags(main).filter(tag => /^h[1-6]$/.test(tag.name)).map(tag => Number(tag.name[1]));
    assert.equal(headings.filter(level => level === 1).length, 1, `${page}: exactly one h1 in main`);
    assert.equal(headings[0], 1, `${page}: main opens with its h1`);
    headings.forEach((level, index) => {
      if (index) assert.ok(level <= headings[index - 1] + 1, `${page}: heading jumps from h${headings[index - 1]} to h${level}`);
    });
    const ids = tags(html).map(tag => tag.attrs.id).filter(Boolean);
    const dupes = ids.filter((id, index) => ids.indexOf(id) !== index);
    assert.deepEqual(dupes, [], `${page}: duplicate ids`);
  }
});

test('images carry alt text and dimensions, and only the LCP candidate is prioritized', () => {
  for (const [page, html] of Object.entries(pages)) {
    const images = tags(html).filter(tag => tag.name === 'img');
    for (const img of images) {
      assert.ok('alt' in img.attrs, `${page}: ${img.attrs.src} needs alt`);
      assert.ok(img.attrs.width && img.attrs.height, `${page}: ${img.attrs.src} needs width and height`);
      assert.ok(!(img.attrs.loading === 'lazy' && img.attrs.fetchpriority === 'high'), `${page}: lazy LCP image ${img.attrs.src}`);
      assert.doesNotMatch(img.attrs.src, /fleet-mountains/, `${page}: the fleet photo shows sister-company trucks`);
    }
    assert.ok(images.filter(img => img.attrs.fetchpriority === 'high').length <= 1, `${page}: at most one high-priority image`);
  }
});

test('internal links and anchors resolve to website pages', () => {
  const ids = Object.fromEntries(Object.entries(pages).map(([page, html]) =>
    [urlFor(page), new Set(tags(html).map(tag => tag.attrs.id).filter(Boolean))]));
  for (const [page, html] of Object.entries(pages)) {
    for (const { attrs } of tags(html).filter(tag => tag.name === 'a' && tag.attrs.href)) {
      const href = attrs.href;
      if (/^(?:https?:|mailto:|tel:)/.test(href)) continue;
      assert.match(href, /^(?:\/|#)/, `${page}: internal links are root-absolute or in-page (${href})`);
      const [path, hash] = href.startsWith('#') ? [urlFor(page), href.slice(1)] : href.split('#');
      const target = path.split('?')[0];
      assert.ok(target in ids, `${page}: link to unknown page ${href}`);
      if (hash) assert.ok(ids[target].has(hash), `${page}: missing anchor ${href}`);
    }
  }
});

test('copy reflects the separation from Integrity Corps and the real service scope', () => {
  for (const [page, html] of Object.entries(pages)) {
    const text = visibleText(html);
    assert.doesNotMatch(text, /integrity corps|integrity traffic|integrity equipment/i, `${page}: names a sister company`);
    assert.doesNotMatch(html, /facebook\.com\/IntegrityTraffic/i, `${page}: Facebook link belongs to Integrity Traffic`);
    assert.doesNotMatch(text, /ISP installation/i, `${page}: ISP installation is retired`);
    assert.doesNotMatch(text, /[–—]/, `${page}: em or en dash`);
  }
  assert.match(visibleText(pages['services/index.html']), /long-haul/i, 'Services names long-haul construction');
  assert.ok(/class="ii-route"/.test(pages['services/index.html']), 'Services shows the route (scope) diagram');
  for (const page of ['index.html', 'services/index.html']) {
    assert.ok(/class="ii-coverage"/.test(pages[page]), `${page}: shows the coverage map`);
  }
});

test('inner pages stay free of GSAP and three.js hooks', () => {
  for (const [page, html] of Object.entries(pages)) {
    if (page === 'index.html') continue;
    assert.doesNotMatch(html, /data-ii-(?:words|magnetic|stack|rail|scene)\b/, `${page}: motion hooks load GSAP or three.js`);
  }
});

test('careers lists open roles from the Paylocity integration point', () => {
  const html = pages['careers/index.html'];
  const jobs = tags(html).find(tag => 'data-ii-jobs' in tag.attrs);
  assert.ok(jobs, 'Careers has a JobList');
  assert.equal(jobs.attrs['data-src'], '/data/jobs.json');
  assert.ok(existsSync(join(ROOT, 'public/data/jobs.json')), 'Sample feed ships from public/');
  assert.match(html, /recruiting\.paylocity\.com/, 'A direct Paylocity link is always available');
});

test('prefill selects a topic and checks a keyed service from the query string', async () => {
  const bundle = await build({
    entryPoints: [fileURLToPath(new URL('../src/behaviors/prefill.ts', import.meta.url))],
    bundle: true, write: false, format: 'esm', platform: 'neutral',
  });
  const { prefill } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
  const control = (tagName, attrs, extra = {}) => ({ tagName, getAttribute: name => attrs[name] ?? null, ...extra });
  const select = control('SELECT', { 'data-ii-prefill-from': 'topic' },
    { options: [{ value: 'quote' }, { value: 'safety' }], value: 'quote' });
  const boring = control('INPUT', { 'data-ii-prefill-from': 'service', 'data-ii-key': 'boring' }, { type: 'checkbox', checked: false });
  const aerial = control('INPUT', { 'data-ii-prefill-from': 'service', 'data-ii-key': 'aerial' }, { type: 'checkbox', checked: false });
  const root = { querySelectorAll: () => [select, boring, aerial] };
  assert.equal(prefill(root, '?topic=Safety&service=boring'), 2);
  assert.equal(select.value, 'safety');
  assert.equal(boring.checked, true);
  assert.equal(aerial.checked, false);
  assert.equal(prefill(root, '?topic=unknown'), 0, 'Unknown values are ignored');
  assert.equal(select.value, 'safety');
});
