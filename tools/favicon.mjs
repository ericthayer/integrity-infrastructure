// Favicon set cropped from the logo, pending a client-supplied compact mark (one-time asset step;
// outputs are committed, and building, testing and verifying the project do not run this script).
//
//   node tools/favicon.mjs
//
// Reads src/img/logo/integrity-infrastructure-logo.svg and keeps only the flame and the first "I"
// of the INTEGRITY wordmark (the flame is the dot of that "i"). Their path data, fills and
// transforms are copied unchanged: nothing is redrawn, recolored or stretched. The other glyph
// paths are left out, the viewBox is set to a square around the kept paths, and a rounded square
// in the site surface color (#080807, Lit Fiber neutral-1000) sits behind them so the white "I"
// reads on light browser tabs. The mark's exact bounds come from getBBox() in Chromium.
//
// Writes, in src/img/favicon/:
//   favicon.svg           rounded square, scalable (modern browsers)
//   favicon-32.png        32 x 32, transparent corners
//   apple-touch-icon.png  180 x 180, full square, no transparency (iOS applies its own mask)
//   favicon.ico           16, 32 and 48 px PNG entries
// and copies favicon.ico to public/favicon.ico for clients that request /favicon.ico directly.
//
// Rasterizing needs Playwright's Chromium, which is not a project dependency. Point PLAYWRIGHT at
// an installed playwright package directory (default: resolve "playwright" normally) and CHROMIUM
// at a browser binary if Playwright's own download is not present, for example:
//   PLAYWRIGHT=/path/to/node_modules/playwright CHROMIUM=/opt/pw-browsers/chromium node tools/favicon.mjs
//
// Brand note: design-system/project/README.md asks for clear space equal to the flame's width on
// every side. A 16 px tab icon cannot hold that and stay legible, so the mark keeps about 0.8 x
// the flame width above and below and more at the sides. Replace this set when the client
// supplies a compact mark; the WordPress build sets it as the Site Icon instead.
import { mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const LOGO = join(root, 'src/img/logo/integrity-infrastructure-logo.svg');
const OUT = join(root, 'src/img/favicon');
const SURFACE = '#080807';
// Share of the square's height the mark fills, and the corner radius as a share of the side.
const FILL = 0.82;
const RADIUS = 0.2;
// The first "I": its stem, and the short segment that sits inside the flame's cream core.
const I_PATHS = ['M45.51,269.699', 'M46.491,226.354'];

function crop(source) {
  const svgOpen = /<svg\b[^>]*>/.exec(source)?.[0];
  const rootStyle = /style="([^"]*)"/.exec(svgOpen ?? '')?.[1];
  // Outer transforms shared by the wordmark and the flame, in document order.
  const outer = [...source.matchAll(/<g transform="([^"]+)">/g)].slice(0, 2).map(match => match[1]);
  // The flame is the only <g> without attributes (orange, yellow, then the nested cream core).
  const flame = /\n([ \t]*)<g>\n[\s\S]*?\n\1<\/g>/.exec(source)?.[0].trim();
  const glyphs = I_PATHS.map(prefix => {
    const found = source.match(new RegExp(`<path d="${prefix.replace(/\./g, '\\.')}[^>]*/>`, 'g')) ?? [];
    if (found.length !== 1) throw new Error(`Expected one logo path starting ${prefix}, found ${found.length}`);
    return found[0];
  });
  if (!rootStyle || outer.length !== 2 || !flame || (flame.match(/<path\b/g) ?? []).length !== 3) {
    throw new Error('The logo SVG structure changed; update tools/favicon.mjs');
  }
  return { rootStyle, outer, inner: [flame, ...glyphs].join('\n') };
}

export function markup(source, box, { fill = FILL, radius = RADIUS, rounded = true } = {}) {
  const { rootStyle, outer, inner } = crop(source);
  const side = box.height / fill;
  const x = box.x + box.width / 2 - side / 2;
  const y = box.y + box.height / 2 - side / 2;
  const n = value => +value.toFixed(2);
  const rx = rounded ? ` rx="${n(side * radius)}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${n(x)} ${n(y)} ${n(side)} ${n(side)}" style="${rootStyle}">
<!-- Cropped from integrity-infrastructure-logo.svg by tools/favicon.mjs: flame and first "I", unmodified. -->
<rect x="${n(x)}" y="${n(y)}" width="${n(side)}" height="${n(side)}"${rx} fill="${SURFACE}"/>
<g transform="${outer[0]}"><g transform="${outer[1]}">
${inner}
</g></g>
</svg>
`;
}

// Bounds of the kept paths in the logo's root user space.
export async function measure(page, source) {
  const { rootStyle, outer, inner } = crop(source);
  await page.setContent(`<svg xmlns="http://www.w3.org/2000/svg" width="2617" height="1093" viewBox="0 0 2617 1093" style="${rootStyle}">
    <g id="mark"><g transform="${outer[0]}"><g transform="${outer[1]}">${inner}</g></g></g></svg>`);
  return page.evaluate(() => {
    const box = document.getElementById('mark').getBBox();
    return { x: box.x, y: box.y, width: box.width, height: box.height };
  });
}

export async function rasterize(page, svg, size, transparent) {
  await page.setViewportSize({ width: size, height: size });
  const data = Buffer.from(svg).toString('base64');
  await page.setContent(`<style>html,body{margin:0;background:transparent}img{display:block}</style>
    <img src="data:image/svg+xml;base64,${data}" width="${size}" height="${size}" alt="">`);
  await page.locator('img').evaluate(img => img.decode());
  return page.screenshot({ omitBackground: transparent, clip: { x: 0, y: 0, width: size, height: size } });
}

// ICO with PNG payloads (supported by every current browser and by Windows since Vista).
export function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, index) => {
    const entry = 6 + 16 * index;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map(image => image.png)]);
}

export async function launch() {
  const require = createRequire(import.meta.url);
  const { chromium } = process.env.PLAYWRIGHT ? require(process.env.PLAYWRIGHT) : await import('playwright');
  return chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
}

async function main() {
  const source = readFileSync(LOGO, 'utf8');
  const browser = await launch();
  try {
    const page = await browser.newPage();
    const box = await measure(page, source);
    const svg = markup(source, box);
    const square = markup(source, box, { rounded: false });
    mkdirSync(OUT, { recursive: true });
    writeFileSync(join(OUT, 'favicon.svg'), svg);
    writeFileSync(join(OUT, 'favicon-32.png'), await rasterize(page, svg, 32, true));
    writeFileSync(join(OUT, 'apple-touch-icon.png'), await rasterize(page, square, 180, false));
    const entries = [];
    for (const size of [16, 32, 48]) entries.push({ size, png: await rasterize(page, svg, size, true) });
    writeFileSync(join(OUT, 'favicon.ico'), ico(entries));
    copyFileSync(join(OUT, 'favicon.ico'), join(root, 'public/favicon.ico'));
    const n = value => value.toFixed(2);
    console.log(`mark bounds x ${n(box.x)} y ${n(box.y)} w ${n(box.width)} h ${n(box.height)} (logo user units)`);
    console.log('wrote src/img/favicon/{favicon.svg,favicon-32.png,apple-touch-icon.png,favicon.ico} and public/favicon.ico');
  } finally {
    await browser.close();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
