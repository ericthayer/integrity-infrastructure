import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { build } from 'esbuild';

// First-screen reveals: elements already on screen at load must not sit mid-animation.
async function loadBehavior(file) {
  const bundle = await build({
    entryPoints: [fileURLToPath(new URL(`../src/behaviors/${file}`, import.meta.url))],
    bundle: true, write: false, format: 'esm', platform: 'neutral',
  });
  return import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
}

const reveal = (name, top, bottom) => {
  const attrs = new Map();
  return { name, attrs, getBoundingClientRect: () => ({ top, bottom }), setAttribute: (key, value) => attrs.set(key, value) };
};

test('reveal elements that intersect the first viewport are marked, the rest keep animating', async () => {
  const { revealSeen } = await loadBehavior('reveal-seen.ts');
  const inView = reveal('in view', 100, 300);
  const straddlesBottom = reveal('straddles the bottom edge', 800, 1200);
  const straddlesTop = reveal('straddles the top edge', -50, 40);
  const below = reveal('below', 900, 1100);
  const above = reveal('above', -400, -1);
  const touchingBottom = reveal('starts exactly at the bottom edge', 900, 1000);
  const touchingTop = reveal('ends exactly at the top edge', -200, 0);
  const all = [inView, straddlesBottom, straddlesTop, below, above, touchingBottom, touchingTop];
  const queried = [];
  const root = { querySelectorAll: selector => { queried.push(selector); return all; } };

  assert.equal(revealSeen(root, 900), 3, 'Counts only the marked elements');
  assert.deepEqual(queried, ['[data-ii-reveal]']);
  for (const element of [inView, straddlesBottom, straddlesTop]) {
    assert.ok(element.attrs.has('data-ii-reveal-seen'), `${element.name}: marked`);
  }
  for (const element of [below, above, touchingBottom, touchingTop]) {
    assert.ok(!element.attrs.has('data-ii-reveal-seen'), `${element.name}: left to animate`);
  }
});

test('revealSeen reads the window height by default and is idempotent', async () => {
  const { revealSeen } = await loadBehavior('reveal-seen.ts');
  const near = reveal('near', 600, 700);
  const far = reveal('far', 700, 800);
  const root = { querySelectorAll: () => [near, far] };
  globalThis.window = { innerHeight: 650 };
  try {
    assert.equal(revealSeen(root), 1, 'The viewport height defaults to window.innerHeight');
    assert.equal(revealSeen(root), 1, 'A second call marks the same element again, without side effects');
    assert.equal(near.attrs.get('data-ii-reveal-seen'), '');
    assert.ok(!far.attrs.has('data-ii-reveal-seen'));
  } finally {
    delete globalThis.window;
  }
  assert.equal(revealSeen({ querySelectorAll: () => [] }, 900), 0, 'No reveal elements, nothing marked');
});
