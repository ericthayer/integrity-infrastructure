// Prints inline icon markup for authoring app HTML, matching IntegrityDS.icon() output.
//   node tools/icon.mjs phone arrow-right          -> decorative (aria-hidden) SVGs, one per line
//   node tools/icon.mjs --class ii-icon--trail arrow-up-right
// Names come from ICON_NAMES in tools/lib/build-data.mjs; add a name there (and to IconName) first.
import { loadIcons } from './lib/build-data.mjs';

const args = process.argv.slice(2);
const classIndex = args.indexOf('--class');
const extra = classIndex === -1 ? '' : ' ' + args.splice(classIndex, 2)[1];
const icons = loadIcons();
if (!args.length) {
  console.log(Object.keys(icons).join('\n'));
  process.exit(0);
}
for (const name of args) {
  if (!icons[name]) {
    console.error(`Unknown icon "${name}". Available: ${Object.keys(icons).join(', ')}`);
    process.exit(1);
  }
  console.log(`<svg class="ii-icon${extra}" data-ii-icon="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor"`
    + ` stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[name]}</svg>`);
}
