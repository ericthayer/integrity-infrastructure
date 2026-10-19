import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { ROOT, SITE_PAGES, tags } from './lib/site-files.mjs';

// Source-level contract for the not-found page and the sitemap. 404.html is served at arbitrary
// paths, so it has no current nav item and every URL in it must be root-absolute.
const read = page => readFileSync(join(ROOT, page), 'utf8');
const notFound = read('404.html');
const home = read('index.html');
const urlFor = page => '/' + page.replace(/index\.html$/, '');
const block = (html, pattern) => pattern.exec(html)?.[0] ?? '';
const shellOf = html => [/<a class="ii-skip"[\s\S]*?<\/header>/, /<div class="ii-drawer[\s\S]*?\n<\/div>/, /<footer class="ii-footer">[\s\S]*?<\/footer>/]
  .map(pattern => block(html, pattern).replace(/ aria-current="page"/g, ''));

test('the 404 shell (skip link, header, drawer, footer) matches Home without a current page', () => {
  const reference = shellOf(home);
  shellOf(notFound).forEach((part, index) => {
    assert.ok(part.length > 200, `404.html: shell part ${index} missing`);
    assert.equal(part, reference[index], `404.html: shell part ${index} differs from Home`);
  });
  assert.doesNotMatch(notFound, /aria-current/, '404.html: no nav item is current');
});

test('the 404 page is a noindexed website page with one h1 and the website entry', () => {
  assert.match(notFound, /<html lang="en" data-theme="lit-fiber">/);
  assert.match(notFound, /<script type="module" src="\/src\/website\.ts"><\/script>/);
  assert.match(notFound, /<meta name="robots" content="noindex">/);
  assert.match(/<title>([^<]+)<\/title>/.exec(notFound)?.[1] ?? '', /^Page not found \| Integrity Infrastructure$/);
  const description = /<meta name="description" content="([^"]+)">/.exec(notFound)?.[1] ?? '';
  assert.ok(description.length >= 50 && description.length <= 160, `description length ${description.length}`);
  assert.equal(/<meta property="og:description" content="([^"]+)">/.exec(notFound)?.[1], description);
  const main = block(notFound, /<main[\s\S]*<\/main>/);
  const headings = tags(main).filter(tag => /^h[1-6]$/.test(tag.name)).map(tag => Number(tag.name[1]));
  assert.equal(headings.filter(level => level === 1).length, 1, 'exactly one h1 in main');
  assert.equal(headings[0], 1, 'main opens with its h1');
  assert.equal(tags(notFound).filter(tag => tag.name === 'h1').length, 1, 'exactly one h1 on the page');
});

test('the 404 head matches Home apart from title, description and Open Graph', () => {
  const head = html => block(html, /<head>[\s\S]*<\/head>/)
    .replace(/<title>[^<]*<\/title>|<meta (?:name="description"|property="og:(?:title|description)") content="[^"]*">/g, '');
  assert.equal(head(notFound), head(home));
});

test('every 404 link and asset is root-absolute and links resolve to website pages', () => {
  const known = new Set(SITE_PAGES.map(urlFor));
  const ids = Object.fromEntries(SITE_PAGES.map(page => [urlFor(page), new Set(tags(read(page)).map(tag => tag.attrs.id).filter(Boolean))]));
  const ownIds = new Set(tags(notFound).map(tag => tag.attrs.id).filter(Boolean));
  for (const { name, attrs } of tags(notFound)) {
    for (const key of ['href', 'src']) {
      const url = attrs[key];
      if (!url || /^(?:https?:|mailto:|tel:)/.test(url)) continue;
      if (url.startsWith('#')) {
        assert.ok(ownIds.has(url.slice(1)), `missing in-page anchor ${url}`);
        continue;
      }
      assert.match(url, /^\/(?!\/)/, `${name} ${key} must be root-absolute: ${url}`);
      if (name !== 'a') continue;
      const [path, hash] = url.split('#');
      const target = path.split('?')[0];
      assert.ok(known.has(target), `link to unknown page ${url}`);
      if (hash) assert.ok(ids[target].has(hash), `missing anchor ${url}`);
    }
  }
  const links = tags(block(notFound, /<main[\s\S]*<\/main>/)).filter(tag => tag.name === 'a').map(tag => tag.attrs.href);
  for (const href of ['/', '/contact/#quote', '/services/', '/safety/', '/about/', '/careers/', '/subcontractors/', '/contact/']) {
    assert.ok(links.includes(href), `main links to ${href}`);
  }
});

test('the 404 page has no motion hooks and no inline styles', () => {
  assert.doesNotMatch(notFound, /data-ii-(?:words|magnetic|stack|rail|scene)\b/, 'motion hooks load GSAP or three.js');
  assert.ok(!tags(notFound).some(tag => 'style' in tag.attrs), 'no inline style attributes');
});

test('the sitemap lists the seven website pages on the production domain', () => {
  const xml = read('public/sitemap.xml');
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  const active = xml.replace(/<!--[\s\S]*?-->/g, '');
  const entries = [...active.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1]);
  const locs = entries.map(entry => /<loc>([^<]+)<\/loc>/.exec(entry)?.[1]);
  assert.deepEqual(locs, SITE_PAGES.map(page => 'https://integrityinfrastructure.com' + urlFor(page)));
  for (const entry of entries) {
    assert.match(entry, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/, 'each URL has a W3C date lastmod');
    assert.doesNotMatch(entry, /changefreq|priority/);
  }
  assert.equal((active.match(/<url>/g) ?? []).length, (active.match(/<\/url>/g) ?? []).length, 'balanced url elements');
  assert.doesNotMatch(active.replace(/<\?xml[^>]*\?>/, '').replace(/<\/?(?:urlset|url|loc|lastmod)\b[^>]*>|[^<]+/g, ''), /\S/,
    'only sitemap elements');
});
