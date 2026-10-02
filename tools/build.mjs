// One source, three outputs:
//   dist/                      tokens.css, integrity.css, integrity.js, fonts/   (what concept pages and Oxygen use)
//   design-system/project/     components/bundle.css|js, index.d.ts, <Comp>/preview.html  (the DS artifact)
//   concepts/, brandkit/       pages built from src/pages with partials, inline icons and asset paths
//   harness/                   every DS preview wrapped with local assets and a theme switcher (QA only)
// Zero dependencies. Run: node tools/build.mjs
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, copyFileSync, statSync } from 'node:fs';
import { join, dirname, basename, relative, posix } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const at = (...p) => join(ROOT, ...p);
const read = (p) => readFileSync(at(p), 'utf8');
const write = (p, s) => { mkdirSync(dirname(at(p)), { recursive: true }); writeFileSync(at(p), s); };
const walk = (dir) => (existsSync(at(dir)) ? readdirSync(at(dir)).flatMap((f) => {
  const p = posix.join(dir, f);
  return statSync(at(p)).isDirectory() ? walk(p) : [p];
}) : []);
const warnings = [];
const STAMP = Date.now().toString(36);

// ---------------------------------------------------------------- assets
// DS asset path (Group/file) -> local source file. Uploads land in design-system/asset-map.json.
const ASSETS = {
  'Logos/integrity-infrastructure-logo.png': 'src/img/logo/integrity-infrastructure-logo.png',
  'Logos/integrity-infrastructure-logo-reversed.png': 'src/img/logo/integrity-infrastructure-logo-reversed.png',
  'Photography/fleet-mountains.jpg': 'src/img/photos/fleet-mountains.jpg',
  'Photography/night-van-crew.jpg': 'src/img/photos/night-van-crew.jpg',
  'Photography/night-van-splicer.jpg': 'src/img/photos/night-van-splicer.jpg',
  'Photography/splice-tray.jpg': 'src/img/photos/splice-tray.jpg',
  'Photography/fiber-hands.jpg': 'src/img/photos/fiber-hands.jpg',
  'Photography/conduit-reel.jpg': 'src/img/photos/conduit-reel.jpg',
  'Icons-legacy/legacy-fiber-splicing.png': 'src/img/legacy-icons/legacy-fiber-splicing.png',
  'Icons-legacy/legacy-boring.png': 'src/img/legacy-icons/legacy-boring.png',
  'Icons-legacy/legacy-aerial-installations.png': 'src/img/legacy-icons/legacy-aerial-installations.png',
  'Icons-legacy/legacy-isp-installation.png': 'src/img/legacy-icons/legacy-isp-installation.png',
  'Icons-legacy/legacy-restoration.png': 'src/img/legacy-icons/legacy-restoration.png',
};
const assetMap = existsSync(at('design-system/asset-map.json')) ? JSON.parse(read('design-system/asset-map.json')) : {};

// ---------------------------------------------------------------- vendored libraries (Lit Fiber motion and scene)
// {{vendor:key}} in markup -> a relative path into dist/vendor on pages, the pinned cdnjs build in DS previews
// (previews may only load scripts from the artifact CDNs). GSAP also ships as DS libraries in components/lib.
const pkgVersion = (name) => JSON.parse(readFileSync(at('node_modules', name, 'package.json'), 'utf8')).version;
const VENDOR = {
  gsap: { src: 'node_modules/gsap/dist/gsap.min.js', dist: 'dist/vendor/gsap.min.js', lib: 'design-system/project/components/lib/gsap.min.js', cdn: `https://cdnjs.cloudflare.com/ajax/libs/gsap/${pkgVersion('gsap')}/gsap.min.js` },
  'gsap-scrolltrigger': { src: 'node_modules/gsap/dist/ScrollTrigger.min.js', dist: 'dist/vendor/ScrollTrigger.min.js', lib: 'design-system/project/components/lib/ScrollTrigger.min.js', cdn: `https://cdnjs.cloudflare.com/ajax/libs/gsap/${pkgVersion('gsap')}/ScrollTrigger.min.js` },
  three: { src: 'node_modules/three/build/three.module.js', dist: 'dist/vendor/three.module.js', cdn: `https://cdnjs.cloudflare.com/ajax/libs/three.js/${pkgVersion('three')}/three.module.min.js` },
  // three.module.js imports ./three.core.js beside it (the cdnjs build imports three.core.min.js the same way).
  'three-core': { src: 'node_modules/three/build/three.core.js', dist: 'dist/vendor/three.core.js', cdn: `https://cdnjs.cloudflare.com/ajax/libs/three.js/${pkgVersion('three')}/three.core.min.js` },
};
for (const v of Object.values(VENDOR)) {
  if (!existsSync(at(v.src))) { warnings.push(`vendor file missing: ${v.src} (run npm install)`); continue; }
  for (const out of [v.dist, v.lib].filter(Boolean)) { mkdirSync(dirname(at(out)), { recursive: true }); copyFileSync(at(v.src), at(out)); }
}

// ---------------------------------------------------------------- icons (Tabler outline, MIT)
const ICON_NAMES = [
  // UI
  'arrow-right', 'arrow-up-right', 'arrow-down', 'chevron-down', 'chevron-right', 'menu-2', 'x', 'plus', 'minus', 'check',
  'circle-check', 'alert-circle', 'alert-triangle', 'info-circle', 'upload', 'file-upload', 'file-text', 'external-link',
  'loader-2', 'search', 'phone', 'phone-call', 'mail', 'map-pin', 'map-2', 'clock', 'calendar',
  'brand-linkedin', 'brand-instagram', 'brand-facebook',
  // Services
  'plug-connected', 'backhoe', 'crane', 'building-broadcast-tower', 'road', 'route', 'home-signal', 'network',
  // Safety, careers, partners
  'shield-check', 'first-aid-kit', 'certificate', 'cone', 'clipboard-check', 'eye-check', 'users-group', 'user-check',
  'briefcase', 'school', 'trending-up', 'heart-handshake', 'steering-wheel', 'truck', 'tools', 'license', 'award', 'camera',
];
const ICONS = {};
for (const name of ICON_NAMES) {
  const file = at('node_modules/@tabler/icons/icons/outline', `${name}.svg`);
  if (!existsSync(file)) { warnings.push(`icon not found: ${name}`); continue; }
  const svg = readFileSync(file, 'utf8');
  const inner = /<svg[^>]*>([\s\S]*?)<\/svg>/.exec(svg)[1]
    .replace(/<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*\/>/, '')
    .replace(/\s+/g, ' ').trim();
  ICONS[name] = inner;
}
const iconSvg = (attrs, name) => {
  if (!ICONS[name]) { warnings.push(`unknown icon in markup: ${name}`); return `<svg${attrs}></svg>`; }
  const labelled = /aria-label=/.test(attrs);
  const a11y = labelled ? ' role="img"' : ' aria-hidden="true" focusable="false"';
  return `<svg${attrs} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"${a11y}>${ICONS[name]}</svg>`;
};

// ---------------------------------------------------------------- 1. tokens -> dist/tokens.css (mirrors the DS page compile)
const tokens = JSON.parse(read('design-system/project/tokens.json'));
const themes = tokens.color.themes.map((t) => t.id);
const first = themes[0];
const cssVal = (v) => { const m = /^\{(.+)\}$/.exec(v); return m ? `var(--${m[1]})` : v; };
const valueFor = (t, theme) => (typeof t.value === 'string' ? t.value : (t.value[theme] ?? t.value[first]));
const themedTokens = [...tokens.color.tokens, ...(tokens.shadow?.tokens || [])];

let tokensCss = '/* GENERATED by tools/build.mjs from design-system/project/tokens.json. Do not edit by hand. */\n';
for (const f of tokens.type.fonts) {
  tokensCss += `@font-face { font-family: "${f.family}"; src: url("fonts/${basename(f.file)}") format("woff2"); font-weight: ${f.weight}; font-style: ${f.style || 'normal'}; font-display: swap; }\n`;
}
tokensCss += `:root, [data-theme="${first}"] {\n${themedTokens.map((t) => `  --${t.name}: ${cssVal(valueFor(t, first))};`).join('\n')}\n}\n`;
for (const theme of themes.slice(1)) {
  const lines = themedTokens
    .filter((t) => typeof t.value !== 'string' || /^\{.+\}$/.test(t.value))
    .map((t) => `  --${t.name}: ${cssVal(valueFor(t, theme))};`);
  tokensCss += `[data-theme="${theme}"] {\n${lines.join('\n')}\n}\n`;
}
const plainFamilies = Object.entries(tokens).filter(([k, v]) => !['color', 'type', 'shadow'].includes(k) && v && Array.isArray(v.tokens));
tokensCss += ':root {\n'
  + plainFamilies.flatMap(([, f]) => f.tokens.map((t) => `  --${t.name}: ${t.value};`)).join('\n') + '\n'
  + Object.entries(tokens.type.families).map(([k, v]) => `  --font-${k}: ${v};`).join('\n') + '\n}\n';
for (const g of tokens.type.groups) {
  for (const s of g.styles) {
    const fam = s.family || g.family;
    tokensCss += `.${s.name} { font-family: var(--font-${fam}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight};${s.letterSpacing ? ` letter-spacing: ${s.letterSpacing};` : ''}${s.fontStyle ? ` font-style: ${s.fontStyle};` : ''} }\n`;
  }
}
write('dist/tokens.css', tokensCss);
for (const f of readdirSync(at('src/fonts'))) {
  mkdirSync(at('dist/fonts'), { recursive: true });
  copyFileSync(at('src/fonts', f), at('dist/fonts', f));
  copyFileSync(at('src/fonts', f), at('design-system/project/fonts', f));
}

// ---------------------------------------------------------------- 2. CSS bundle
const CSS_PARTS = ['src/css/base.css', 'src/css/concepts.css', 'src/css/components.css'];
const bundleCss = CSS_PARTS.map((p) => `/* ---- ${basename(p)} ---- */\n${read(p)}`).join('\n');
if (/<\/style/i.test(bundleCss)) throw new Error('bundle.css contains </style');
write('design-system/project/components/bundle.css', `/* Integrity Infrastructure design system. Built from src/css by tools/build.mjs. */\n${bundleCss}`);
write('dist/integrity.css', `${tokensCss}\n${bundleCss}`);

// ---------------------------------------------------------------- 3. JS bundle
const siteJs = read('src/js/site.js');
const iconsJs = `var ICONS = ${JSON.stringify(ICONS)};`;
const bundleJs = `/* @ds-bundle: {"format":4,"namespace":"IntegrityDS","components":[]} */\n(function () {\n${iconsJs}\n${siteJs}\n})();\n`;
if (/<\/script|<!--/i.test(bundleJs)) throw new Error('bundle.js contains </script or <!--');
write('design-system/project/components/bundle.js', bundleJs);
write('dist/integrity.js', bundleJs);
write('design-system/project/components/index.d.ts', read('src/types/index.d.ts'));

// ---------------------------------------------------------------- 4. HTML processing
function processHtml(html, { outFile, mode }) {
  // Partials: <!-- @include name.html key="value" -->  ->  src/partials/name.html with {{key}} / {{key|default}}
  for (let pass = 0; pass < 4; pass++) {
    html = html.replace(/<!--\s*@include\s+([\w./-]+)((?:\s+[\w-]+="[^"]*")*)\s*-->/g, (_, name, argStr) => {
      const args = Object.fromEntries([...argStr.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
      let part = read(`src/partials/${name}`);
      part = part.replace(/\{\{current:([\w-]+)\}\}/g, (_m, key) => (args.active === key ? ' aria-current="page"' : ''));
      return part.replace(/\{\{([\w-]+)(?:\|([^}]*))?\}\}/g, (m, key, def) => (key in args ? args[key] : def ?? m));
    });
  }
  // Asset paths
  html = html.replace(/\{\{asset:([^}]+)\}\}/g, (_, key) => {
    const local = ASSETS[key];
    if (!local) { warnings.push(`${outFile}: unknown asset ${key}`); return ''; }
    if (mode === 'ds') {
      const rec = assetMap[key];
      if (!rec) { warnings.push(`${outFile}: ${key} not uploaded yet`); return `/_blob/PENDING-${key}`; }
      return `/_blob/${rec.blob}`;
    }
    return relative(dirname(at(outFile)), at(local));
  });
  // Vendored scripts: {{vendor:three}}
  html = html.replace(/\{\{vendor:([\w-]+)\}\}/g, (_, key) => {
    const v = VENDOR[key];
    if (!v) { warnings.push(`${outFile}: unknown vendor ${key}`); return ''; }
    return mode === 'ds' ? v.cdn : relative(dirname(at(outFile)), at(v.dist));
  });
  // Root-relative helper for pages: {{root}} -> path from this file to the repo root
  html = html.replace(/\{\{root\}\}/g, relative(dirname(at(outFile)), ROOT) || '.');
  // Cache-bust dist stylesheets and scripts on pages (the local server sends no cache headers).
  if (mode === 'page') html = html.replace(/((?:\.\.\/)*dist\/[\w./-]+\.(?:css|js))(?=["'])/g, `$1?v=${STAMP}`);
  // Inline icons: <svg class="ii-icon" data-ii-icon="phone"></svg>
  html = html.replace(/<svg((?:\s+[\w:-]+(?:="[^"]*")?)*?\s+data-ii-icon="([\w-]+)"(?:\s+[\w:-]+(?:="[^"]*")?)*?)\s*><\/svg>/g,
    (_, attrs, name) => iconSvg(attrs, name));
  return html;
}

// Pages: src/pages/<path> -> <path>
for (const src of walk('src/pages').filter((p) => p.endsWith('.html'))) {
  const out = src.replace(/^src\/pages\//, '');
  write(out, processHtml(read(src), { outFile: out, mode: 'page' }));
}

// DS previews: src/ds/components/<Comp>/preview.html -> design-system/project/components/<Comp>/preview.html (+ harness)
const previews = walk('src/ds/components').filter((p) => p.endsWith('/preview.html'));
const harnessLinks = [];
for (const src of previews) {
  const comp = src.split('/').at(-2);
  const dsOut = `design-system/project/components/${comp}/preview.html`;
  const raw = read(src);
  const dsHtml = processHtml(raw, { outFile: dsOut, mode: 'ds' });
  if (!/^<!-- @dsCard /.test(dsHtml)) warnings.push(`${src}: line 1 must be the @dsCard marker`);
  write(dsOut, dsHtml);

  const hxOut = `harness/${comp}.html`;
  const local = processHtml(raw, { outFile: hxOut, mode: 'page' });
  const marker = /^<!-- @dsCard ([^>]*)-->/.exec(local)?.[1] || '';
  const height = /height=(\d+)/.exec(marker)?.[1] || '120';
  const headStyles = [...local.matchAll(/<head[\s\S]*?<\/head>/gi)].flatMap((m) => m[0].match(/<style[\s\S]*?<\/style>/gi) || []).join('\n');
  const body = /<body[^>]*>([\s\S]*)<\/body>/i.exec(local)?.[1] ?? local.replace(/^<!--[^>]*-->/, '');
  write(hxOut, `<!doctype html>
<html lang="en" data-theme="${first}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${comp} (harness)</title>
<link rel="stylesheet" href="../dist/integrity.css">
<script src="../dist/vendor/gsap.min.js"></script>
<script src="../dist/vendor/ScrollTrigger.min.js"></script>
<script src="../dist/integrity.js"></script>
${headStyles}
<style>.hx-bar{position:fixed;right:8px;bottom:8px;z-index:9999;display:flex;gap:4px;font:12px/1 system-ui,sans-serif}.hx-bar button{padding:6px 8px;border:1px solid #888;background:#fff;color:#111;cursor:pointer}.hx-bar button[aria-pressed="true"]{background:#111;color:#fff}</style>
</head>
<body>
${body}
<div class="hx-bar" role="group" aria-label="Theme">${themes.map((t) => `<button type="button" data-t="${t}" aria-pressed="${t === first}">${t}</button>`).join('')}</div>
<script>document.querySelector('.hx-bar').addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;document.documentElement.setAttribute('data-theme',t.dataset.t);this.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});});</script>
</body>
</html>
`);
  harnessLinks.push({ comp, height: Number(height), group: /group="([^"]+)"/.exec(marker)?.[1] || '' });
}
write('harness/index.html', `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>DS preview harness</title>
<style>body{margin:0;font:14px/1.4 system-ui,sans-serif;background:#ddd;color:#111}h1{margin:16px}section{margin:0 16px 24px}h2{font-size:14px;margin:0 0 6px}.row{display:grid;grid-template-columns:repeat(${themes.length},1fr);gap:8px}iframe{width:100%;border:1px solid #999;background:#fff}</style></head>
<body><h1>Design system previews, all themes</h1>
${harnessLinks.map(({ comp, height, group }) => `<section><h2>${group ? group + ' / ' : ''}${comp}</h2><div class="row">${themes.map((t) => `<iframe title="${comp} ${t}" loading="lazy" style="height:${Math.min(height + 24, 1400)}px" src="${comp}.html" data-theme="${t}" onload="try{this.contentDocument.documentElement.setAttribute('data-theme','${t}');var b=this.contentDocument.querySelector('.hx-bar');if(b)b.remove()}catch(e){}"></iframe>`).join('')}</div></section>`).join('\n')}
</body></html>
`);

console.log(`built: dist/, design-system/project/components/ (${previews.length} previews), pages, harness/`);
if (warnings.length) { console.log(`\n${warnings.length} warning(s):`); for (const w of [...new Set(warnings)]) console.log(`  - ${w}`); }
