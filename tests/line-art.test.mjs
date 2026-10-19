import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { test } from 'node:test';
import { build } from 'esbuild';
import { ROOT } from './lib/site-files.mjs';

// LineArt: decorative card linework that ships drawn and draws on once as it scrolls in.
async function loadBehavior(file) {
  const bundle = await build({
    entryPoints: [fileURLToPath(new URL(`../src/behaviors/${file}`, import.meta.url))],
    bundle: true, write: false, format: 'esm', platform: 'neutral',
  });
  return import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
}

const piece = name => {
  const attrs = new Map();
  const props = new Map();
  return {
    name, attrs, props,
    hasAttribute: key => attrs.has(key),
    setAttribute: (key, value) => attrs.set(key, value),
    style: { setProperty: (key, value) => props.set(key, value) },
  };
};

function fakeObserver() {
  const state = { observed: [], unobserved: [], callback: null, options: null };
  const createObserver = (callback, options) => {
    state.callback = callback;
    state.options = options;
    return { observe: el => state.observed.push(el), unobserve: el => state.unobserved.push(el) };
  };
  return { state, createObserver };
}

const rootOf = pieces => ({ querySelectorAll: selector => (selector === 'svg[data-ii-line-art]' ? pieces : []) });

test('line art stays drawn under reduced motion or without IntersectionObserver', async () => {
  const { lineArt } = await loadBehavior('line-art.ts');
  const art = piece('art');
  const { state, createObserver } = fakeObserver();
  assert.equal(lineArt(rootOf([art]), { reducedMotion: true, createObserver }), 0);
  assert.equal(lineArt(rootOf([art]), { reducedMotion: false, createObserver: null }), 0);
  assert.equal(art.attrs.size, 0, 'Never armed, so every stroke stays visible');
  assert.equal(state.callback, null, 'No observer is created');
});

test('pieces arm, then draw once each as they enter, staggered in document order', async () => {
  const { lineArt, LINE_ART_STAGGER_MS, LINE_ART_THRESHOLD } = await loadBehavior('line-art.ts');
  const [a, b, c, d] = ['a', 'b', 'c', 'd'].map(piece);
  const { state, createObserver } = fakeObserver();
  assert.equal(lineArt(rootOf([a, b, c, d]), { reducedMotion: false, createObserver }), 4);
  assert.deepEqual(state.observed, [a, b, c, d]);
  assert.ok(state.options.threshold.includes(LINE_ART_THRESHOLD));
  for (const p of [a, b, c, d]) assert.equal(p.attrs.get('data-ii-draw'), 'armed', `${p.name}: armed`);

  // c and a enter together (reported out of order); b is barely visible; d is off screen.
  state.callback([
    { target: c, isIntersecting: true, intersectionRatio: 0.6 },
    { target: b, isIntersecting: true, intersectionRatio: 0.1 },
    { target: a, isIntersecting: true, intersectionRatio: 1 },
    { target: d, isIntersecting: false, intersectionRatio: 0 },
  ]);
  assert.equal(a.attrs.get('data-ii-draw'), 'drawn');
  assert.equal(c.attrs.get('data-ii-draw'), 'drawn');
  assert.equal(a.props.get('--ii-draw-delay'), '0ms', 'First in document order draws first');
  assert.equal(c.props.get('--ii-draw-delay'), `${LINE_ART_STAGGER_MS}ms`);
  assert.equal(b.attrs.get('data-ii-draw'), 'armed', 'Below the threshold it waits');
  assert.equal(d.attrs.get('data-ii-draw'), 'armed');
  assert.deepEqual(state.unobserved, [a, c], 'Drawn pieces are no longer observed');

  state.callback([{ target: b, isIntersecting: true, intersectionRatio: LINE_ART_THRESHOLD }]);
  assert.equal(b.attrs.get('data-ii-draw'), 'drawn');
  assert.equal(b.props.get('--ii-draw-delay'), '0ms', 'A piece entering alone draws at once');
});

test('wiring twice arms nothing new', async () => {
  const { lineArt } = await loadBehavior('line-art.ts');
  const art = piece('art');
  const first = fakeObserver();
  assert.equal(lineArt(rootOf([art]), { reducedMotion: false, createObserver: first.createObserver }), 1);
  const second = fakeObserver();
  assert.equal(lineArt(rootOf([art]), { reducedMotion: false, createObserver: second.createObserver }), 0);
  assert.equal(second.state.callback, null, 'No second observer');
  assert.equal(lineArt(rootOf([]), { reducedMotion: false, createObserver: second.createObserver }), 0);
});

test('Home cards carry decorative line art that every path can draw', () => {
  const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
  const pieces = [...html.matchAll(/<svg class="ii-line-art ii-line-art--(reason|rail)"([^>]*)>([\s\S]*?)<\/svg>/g)];
  assert.equal(pieces.filter(m => m[1] === 'reason').length, 4, 'One drawing per reason card');
  assert.equal(pieces.filter(m => m[1] === 'rail').length, 6, 'One drawing per Way of BEING');
  for (const [, , attrs, body] of pieces) {
    assert.match(attrs, /data-ii-line-art/);
    assert.match(attrs, /aria-hidden="true"/, 'Decorative: hidden from assistive technology');
    assert.match(attrs, /focusable="false"/);
    const children = [...body.matchAll(/<(\w+)\b([^>]*)\/>/g)];
    assert.ok(children.length >= 4, 'Each drawing has several strokes');
    for (const [, name, childAttrs] of children) {
      assert.equal(name, 'path', 'Only paths, so pathLength applies everywhere');
      assert.match(childAttrs, /pathLength="1"/);
    }
  }
  const css = readFileSync(join(ROOT, 'src/css/site/line-art.css'), 'utf8');
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*stroke-dashoffset: 0/, 'Reduced motion shows the art drawn');
  assert.doesNotMatch(css, /#[0-9a-f]{3,8}\b|--(?:neutral|orange)-/i, 'Semantic tokens only');
});
