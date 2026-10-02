/* @ds-bundle: {"format":4,"namespace":"IntegrityDS","components":[]} */
(function () {
var ICONS = {"arrow-right":"<path d=\"M5 12l14 0\" /> <path d=\"M13 18l6 -6\" /> <path d=\"M13 6l6 6\" />","arrow-up-right":"<path d=\"M17 7l-10 10\" /> <path d=\"M8 7l9 0l0 9\" />","arrow-down":"<path d=\"M12 5l0 14\" /> <path d=\"M18 13l-6 6\" /> <path d=\"M6 13l6 6\" />","chevron-down":"<path d=\"M6 9l6 6l6 -6\" />","chevron-right":"<path d=\"M9 6l6 6l-6 6\" />","menu-2":"<path d=\"M4 6l16 0\" /> <path d=\"M4 12l16 0\" /> <path d=\"M4 18l16 0\" />","x":"<path d=\"M18 6l-12 12\" /> <path d=\"M6 6l12 12\" />","plus":"<path d=\"M12 5l0 14\" /> <path d=\"M5 12l14 0\" />","minus":"<path d=\"M5 12l14 0\" />","check":"<path d=\"M5 12l5 5l10 -10\" />","circle-check":"<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M9 12l2 2l4 -4\" />","alert-circle":"<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /> <path d=\"M12 8v4\" /> <path d=\"M12 16h.01\" />","alert-triangle":"<path d=\"M12 9v4\" /> <path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\" /> <path d=\"M12 16h.01\" />","info-circle":"<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /> <path d=\"M12 9h.01\" /> <path d=\"M11 12h1v4h1\" />","upload":"<path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\" /> <path d=\"M7 9l5 -5l5 5\" /> <path d=\"M12 4l0 12\" />","file-upload":"<path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /> <path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\" /> <path d=\"M12 11v6\" /> <path d=\"M9.5 13.5l2.5 -2.5l2.5 2.5\" />","file-text":"<path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /> <path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\" /> <path d=\"M9 9l1 0\" /> <path d=\"M9 13l6 0\" /> <path d=\"M9 17l6 0\" />","external-link":"<path d=\"M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6\" /> <path d=\"M11 13l9 -9\" /> <path d=\"M15 4h5v5\" />","loader-2":"<path d=\"M12 3a9 9 0 1 0 9 9\" />","search":"<path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\" /> <path d=\"M21 21l-6 -6\" />","phone":"<path d=\"M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2\" />","phone-call":"<path d=\"M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2\" /> <path d=\"M15 7a2 2 0 0 1 2 2\" /> <path d=\"M15 3a6 6 0 0 1 6 6\" />","mail":"<path d=\"M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10\" /> <path d=\"M3 7l9 6l9 -6\" />","map-pin":"<path d=\"M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\" /> <path d=\"M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0\" />","map-2":"<path d=\"M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5\" /> <path d=\"M9 4v13\" /> <path d=\"M15 7v5.5\" /> <path d=\"M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879\" /> <path d=\"M19 18v.01\" />","clock":"<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\" /> <path d=\"M12 7v5l3 3\" />","calendar":"<path d=\"M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12\" /> <path d=\"M16 3v4\" /> <path d=\"M8 3v4\" /> <path d=\"M4 11h16\" /> <path d=\"M11 15h1\" /> <path d=\"M12 15v3\" />","brand-linkedin":"<path d=\"M8 11v5\" /> <path d=\"M8 8v.01\" /> <path d=\"M12 16v-5\" /> <path d=\"M16 16v-3a2 2 0 1 0 -4 0\" /> <path d=\"M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10\" />","brand-instagram":"<path d=\"M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8\" /> <path d=\"M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\" /> <path d=\"M16.5 7.5v.01\" />","brand-facebook":"<path d=\"M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3\" />","plug-connected":"<path d=\"M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5\" /> <path d=\"M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5\" /> <path d=\"M3 21l2.5 -2.5\" /> <path d=\"M18.5 5.5l2.5 -2.5\" /> <path d=\"M10 11l-2 2\" /> <path d=\"M13 14l-2 2\" />","backhoe":"<path d=\"M2 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M11 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M13 19l-9 0\" /> <path d=\"M4 15l9 0\" /> <path d=\"M8 12v-5h2a3 3 0 0 1 3 3v5\" /> <path d=\"M5 15v-2a1 1 0 0 1 1 -1h7\" /> <path d=\"M21.12 9.88l-3.12 -4.88l-5 5\" /> <path d=\"M21.12 9.88a3 3 0 0 1 -2.12 5.12a3 3 0 0 1 -2.12 -.88l4.24 -4.24\" />","crane":"<path d=\"M6 21h6\" /> <path d=\"M9 21v-18l-6 6h18\" /> <path d=\"M9 3l10 6\" /> <path d=\"M17 9v4a2 2 0 1 1 -2 2\" />","building-broadcast-tower":"<path d=\"M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /> <path d=\"M16.616 13.924a5 5 0 1 0 -9.23 0\" /> <path d=\"M20.307 15.469a9 9 0 1 0 -16.615 0\" /> <path d=\"M9 21l3 -9l3 9\" /> <path d=\"M10 19h4\" />","road":"<path d=\"M4 19l4 -14\" /> <path d=\"M16 5l4 14\" /> <path d=\"M12 8v-2\" /> <path d=\"M12 13v-2\" /> <path d=\"M12 18v-2\" />","route":"<path d=\"M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4\" /> <path d=\"M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5\" />","home-signal":"<path d=\"M15 22v-2\" /> <path d=\"M18 22v-4\" /> <path d=\"M21 22v-6\" /> <path d=\"M19 12.494v-.494h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h4\" /> <path d=\"M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v.5\" />","network":"<path d=\"M6 9a6 6 0 1 0 12 0a6 6 0 0 0 -12 0\" /> <path d=\"M12 3c1.333 .333 2 2.333 2 6s-.667 5.667 -2 6\" /> <path d=\"M12 3c-1.333 .333 -2 2.333 -2 6s.667 5.667 2 6\" /> <path d=\"M6 9h12\" /> <path d=\"M3 20h7\" /> <path d=\"M14 20h7\" /> <path d=\"M10 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M12 15v3\" />","shield-check":"<path d=\"M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06\" /> <path d=\"M15 19l2 2l4 -4\" />","first-aid-kit":"<path d=\"M8 8v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2\" /> <path d=\"M4 10a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -8\" /> <path d=\"M10 14h4\" /> <path d=\"M12 12v4\" />","certificate":"<path d=\"M12 15a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\" /> <path d=\"M13 17.5v4.5l2 -1.5l2 1.5v-4.5\" /> <path d=\"M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73\" /> <path d=\"M6 9l12 0\" /> <path d=\"M6 12l3 0\" /> <path d=\"M6 15l2 0\" />","cone":"<path d=\"M21 17.998v-.5l-8.13 -14.99a1 1 0 0 0 -1.74 0l-8.13 14.989v.5c0 1.659 4.03 3.003 9 3.003s9 -1.344 9 -3.002\" />","clipboard-check":"<path d=\"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2\" /> <path d=\"M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2\" /> <path d=\"M9 14l2 2l4 -4\" />","eye-check":"<path d=\"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032\" /> <path d=\"M15 19l2 2l4 -4\" />","users-group":"<path d=\"M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1\" /> <path d=\"M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M17 10h2a2 2 0 0 1 2 2v1\" /> <path d=\"M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M3 13v-1a2 2 0 0 1 2 -2h2\" />","user-check":"<path d=\"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0\" /> <path d=\"M6 21v-2a4 4 0 0 1 4 -4h4\" /> <path d=\"M15 19l2 2l4 -4\" />","briefcase":"<path d=\"M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9\" /> <path d=\"M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2\" /> <path d=\"M12 12l0 .01\" /> <path d=\"M3 13a20 20 0 0 0 18 0\" />","school":"<path d=\"M22 9l-10 -4l-10 4l10 4l10 -4v6\" /> <path d=\"M6 10.6v5.4a6 3 0 0 0 12 0v-5.4\" />","trending-up":"<path d=\"M3 17l6 -6l4 4l8 -8\" /> <path d=\"M14 7l7 0l0 7\" />","heart-handshake":"<path d=\"M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572\" /> <path d=\"M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25\" /> <path d=\"M12.5 15.5l2 2\" /> <path d=\"M15 13l2 2\" />","steering-wheel":"<path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M10 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M12 14l0 7\" /> <path d=\"M10 12l-6.75 -2\" /> <path d=\"M14 12l6.75 -2\" />","truck":"<path d=\"M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5\" />","tools":"<path d=\"M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4\" /> <path d=\"M14.5 5.5l4 4\" /> <path d=\"M12 8l-5 -5l-4 4l5 5\" /> <path d=\"M7 8l-1.5 1.5\" /> <path d=\"M16 12l5 5l-4 4l-5 -5\" /> <path d=\"M16 17l-1.5 1.5\" />","license":"<path d=\"M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11\" /> <path d=\"M9 7l4 0\" /> <path d=\"M9 11l4 0\" />","award":"<path d=\"M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0\" /> <path d=\"M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889\" /> <path d=\"M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889\" />","camera":"<path d=\"M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2\" /> <path d=\"M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\" />"};
// Integrity Infrastructure behaviors. Dependency-free, ES2017, hooks are data-ii-* attributes.
// tools/build.mjs wraps this file in an IIFE after `var ICONS = {...}` and ships it as
// dist/integrity.js (pages, Oxygen) and components/bundle.js (the design system).
'use strict';

var doc = document;
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function escapeHtml(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function safeUrl(url) {
  return /^https?:\/\//i.test(String(url || '')) ? String(url) : '#';
}
function once(el, key) {
  var flag = 'iiReady' + key;
  if (el.dataset[flag]) return false;
  el.dataset[flag] = '1';
  return true;
}

// ---------------------------------------------------------------- icons
function icon(name, opts) {
  opts = opts || {};
  var inner = ICONS[name];
  if (!inner) return '';
  var a11y = opts.label
    ? ' role="img" aria-label="' + escapeHtml(opts.label) + '"'
    : ' aria-hidden="true" focusable="false"';
  return '<svg class="ii-icon' + (opts.className ? ' ' + opts.className : '') + '" viewBox="0 0 24 24" fill="none"'
    + ' stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"' + a11y + '>' + inner + '</svg>';
}
function hydrateIcons(root) {
  (root || doc).querySelectorAll('svg[data-ii-icon]').forEach(function (el) {
    if (el.childElementCount) return;
    var inner = ICONS[el.getAttribute('data-ii-icon')];
    if (!inner) return;
    el.setAttribute('viewBox', '0 0 24 24');
    el.setAttribute('fill', 'none');
    el.setAttribute('stroke', 'currentColor');
    el.setAttribute('stroke-linecap', 'round');
    el.setAttribute('stroke-linejoin', 'round');
    if (!el.hasAttribute('aria-label')) { el.setAttribute('aria-hidden', 'true'); el.setAttribute('focusable', 'false'); }
    el.innerHTML = inner;
  });
}

// ---------------------------------------------------------------- header: stuck state from a sentinel
function header(root) {
  var el = (root || doc).querySelector('[data-ii-header]');
  if (!el || !once(el, 'Header') || !('IntersectionObserver' in window)) return;
  var offset = parseInt(el.getAttribute('data-ii-header-offset') || '8', 10);
  var sentinel = doc.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:' + offset + 'px;pointer-events:none;';
  doc.body.insertBefore(sentinel, doc.body.firstChild);
  new IntersectionObserver(function (entries) {
    el.classList.toggle('is-stuck', !entries[0].isIntersecting);
  }).observe(sentinel);
}

// ---------------------------------------------------------------- mobile nav drawer: focus trap, Esc, backdrop
function nav(root) {
  (root || doc).querySelectorAll('[data-ii-nav-toggle]').forEach(function (toggle) { navOne(toggle); });
}
function navOne(toggle) {
  var drawer = doc.getElementById(toggle.getAttribute('aria-controls') || '') || doc.querySelector('[data-ii-drawer]');
  if (!drawer || !once(toggle, 'Nav')) return;
  var lastFocus = null;
  var desktop = window.matchMedia('(min-width: 1024px)');
  function focusables() {
    return Array.prototype.filter.call(
      drawer.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]'),
      function (n) { return n.getAttribute('tabindex') !== '-1' && n.offsetParent !== null; }
    );
  }
  function onKey(e) {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    var f = focusables();
    if (!f.length) return;
    var first = f[0];
    var last = f[f.length - 1];
    if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function open() {
    lastFocus = doc.activeElement;
    drawer.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    doc.documentElement.style.overflow = 'hidden';
    var closeBtn = drawer.querySelector('button[data-ii-drawer-close]:not([tabindex="-1"])');
    (closeBtn || focusables()[0] || drawer).focus();
    doc.addEventListener('keydown', onKey);
  }
  function close() {
    if (drawer.hidden) return;
    drawer.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    doc.documentElement.style.overflow = '';
    doc.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  toggle.addEventListener('click', function () { if (drawer.hidden) open(); else close(); });
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('[data-ii-drawer-close]') || e.target.closest('a[href^="#"]')) close();
  });
  var onChange = function (e) { if (e.matches) close(); };
  if (desktop.addEventListener) desktop.addEventListener('change', onChange); else desktop.addListener(onChange);
}

// ---------------------------------------------------------------- marquee pause control (WCAG 2.2.2)
function marquee(root) {
  (root || doc).querySelectorAll('[data-ii-marquee]').forEach(function (m) {
    var btn = m.querySelector('[data-ii-marquee-toggle]');
    if (!btn || !once(m, 'Marquee')) return;
    var label = btn.querySelector('[data-ii-label]');
    btn.addEventListener('click', function () {
      var paused = m.classList.toggle('is-paused');
      btn.setAttribute('aria-pressed', String(paused));
      if (label) label.textContent = paused ? 'Play' : 'Pause';
    });
  });
}

// ---------------------------------------------------------------- forms: inline errors + error summary, demo success
function labelFor(control) {
  var field = control.closest('.ii-field, .ii-fieldset');
  var label = field && field.querySelector('.ii-field__label, .ii-fieldset__legend');
  return label ? label.childNodes[0].textContent.trim() : (control.name || 'this field');
}
function messageFor(control) {
  if (control.getAttribute('data-ii-error')) return control.getAttribute('data-ii-error');
  var v = control.validity;
  var label = labelFor(control);
  if (v.valueMissing) {
    if (control.type === 'file') return 'Attach ' + label.toLowerCase();
    if (control.type === 'checkbox' || control.type === 'radio' || control.tagName === 'SELECT') return 'Choose ' + label.toLowerCase();
    return 'Enter ' + label.toLowerCase();
  }
  if (v.typeMismatch && control.type === 'email') return 'Enter an email address like name@company.com';
  if (v.patternMismatch && control.type === 'tel') return 'Enter a phone number like (503) 502-5339';
  if (v.tooShort) return label + ' must be at least ' + control.minLength + ' characters';
  return 'Check ' + label.toLowerCase();
}
function setError(host, control, message) {
  var err = host.querySelector(':scope > .ii-field__error');
  var errId = (control.id || control.name) + '-error';
  if (!message) {
    host.classList.remove('is-invalid');
    control.removeAttribute('aria-invalid');
    if (err) err.remove();
    control.setAttribute('aria-describedby', (control.getAttribute('aria-describedby') || '').replace(errId, '').trim());
    if (!control.getAttribute('aria-describedby')) control.removeAttribute('aria-describedby');
    return;
  }
  if (!err) {
    err = doc.createElement('p');
    err.className = 'ii-field__error';
    err.id = errId;
    var anchor = host.querySelector('.ii-select-wrap, .ii-choices') || control;
    anchor.insertAdjacentElement('afterend', err);
  }
  err.innerHTML = icon('alert-circle') + '<span><span class="ii-visually-hidden">Error: </span>' + escapeHtml(message) + '</span>';
  host.classList.add('is-invalid');
  control.setAttribute('aria-invalid', 'true');
  var described = (control.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
  if (described.indexOf(errId) === -1) described.push(errId);
  control.setAttribute('aria-describedby', described.join(' '));
}
function validate(host) {
  var control = host.querySelector('input, select, textarea');
  if (!control) return null;
  if (host.classList.contains('ii-fieldset')) {
    var boxes = host.querySelectorAll('input');
    var needs = host.hasAttribute('data-ii-required');
    var any = Array.prototype.some.call(boxes, function (b) { return b.checked; });
    var bad = needs && !any;
    setError(host, boxes[0], bad ? (host.getAttribute('data-ii-error') || 'Choose at least one ' + labelFor(boxes[0]).toLowerCase()) : '');
    return bad ? { host: host, control: boxes[0] } : null;
  }
  var ok = control.checkValidity();
  setError(host, control, ok ? '' : messageFor(control));
  return ok ? null : { host: host, control: control };
}
function forms(root) {
  (root || doc).querySelectorAll('form[data-ii-form]').forEach(function (form) {
    if (!once(form, 'Form')) return;
    form.setAttribute('novalidate', '');
    var summary = form.querySelector('[data-ii-error-summary]');
    var success = form.parentElement.querySelector('[data-ii-success]');
    var hosts = function () { return form.querySelectorAll('.ii-field, .ii-fieldset[data-ii-required]'); };
    form.addEventListener('submit', function (e) {
      var errors = [];
      hosts().forEach(function (h) { var r = validate(h); if (r) errors.push(r); });
      if (errors.length) {
        e.preventDefault();
        if (summary) {
          summary.querySelector('[data-ii-error-list]').innerHTML = errors.map(function (r) {
            var text = (r.host.querySelector('.ii-field__error') || {}).textContent || '';
            return '<li><a href="#' + escapeHtml(r.control.id) + '">' + escapeHtml(text.trim().replace(/^Error:\s*/, '')) + '</a></li>';
          }).join('');
          summary.hidden = false;
          summary.focus();
        } else {
          errors[0].control.focus();
        }
        return;
      }
      if (summary) summary.hidden = true;
      if (form.hasAttribute('data-ii-demo')) {
        e.preventDefault();
        var btn = form.querySelector('[type="submit"]');
        if (btn) btn.setAttribute('aria-busy', 'true');
        window.setTimeout(function () {
          if (btn) btn.removeAttribute('aria-busy');
          if (success) { form.hidden = true; success.hidden = false; success.focus(); }
        }, 600);
      }
    });
    if (summary) {
      summary.addEventListener('click', function (e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;
        e.preventDefault();
        var target = doc.getElementById(link.getAttribute('href').slice(1));
        if (target) { target.focus(); target.scrollIntoView({ block: 'center', behavior: reduceMotion.matches ? 'auto' : 'smooth' }); }
      });
    }
    var recheck = function (e) {
      var host = e.target.closest('.ii-field, .ii-fieldset');
      if (host && host.classList.contains('is-invalid')) validate(host);
      if (e.target.type === 'file') {
        var hint = host && host.querySelector('[data-ii-file-names]');
        if (hint) hint.textContent = Array.prototype.map.call(e.target.files, function (f) { return f.name; }).join(', ') || hint.getAttribute('data-ii-file-names');
      }
    };
    form.addEventListener('input', recheck);
    form.addEventListener('change', recheck);
  });
}

// ---------------------------------------------------------------- jobs: Paylocity Recruiting feed -> job rows
function formatDate(value) {
  var d = new Date(value);
  return isNaN(d) ? '' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function renderJobs(el, data) {
  var list = el.querySelector('.ii-jobs__list');
  var empty = el.querySelector('[data-ii-jobs-empty]');
  var failed = el.querySelector('[data-ii-jobs-error]');
  var jobsArr = Array.isArray(data) ? data : ((data && (data.jobs || data.Jobs)) || []);
  if (failed) failed.hidden = true;
  list.setAttribute('aria-busy', 'false');
  if (!jobsArr.length) {
    list.innerHTML = '';
    list.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;
  list.hidden = false;
  list.innerHTML = jobsArr.map(function (j) {
    var loc = j.JobLocation ? [j.JobLocation.City, j.JobLocation.State].filter(Boolean).join(', ') || j.JobLocation.Name : '';
    var meta = [
      loc ? '<span>' + icon('map-pin') + escapeHtml(loc) + '</span>' : '',
      j.HiringDepartment ? '<span>' + icon('briefcase') + escapeHtml(j.HiringDepartment) + '</span>' : '',
      j.PublishedDate ? '<span>' + icon('calendar') + 'Posted ' + escapeHtml(formatDate(j.PublishedDate)) + '</span>' : '',
    ].join('');
    return '<li class="ii-job"><div class="ii-stack" style="--stack-gap: var(--space-2)">'
      + '<h3 class="ii-job__title"><a href="' + escapeHtml(safeUrl(j.ApplyUrl || j.DisplayUrl)) + '" target="_blank" rel="noopener">'
      + escapeHtml(j.Title) + '<span class="ii-visually-hidden">, opens the application on Paylocity</span></a></h3>'
      + '<p class="ii-job__meta">' + meta + '</p></div>'
      + '<span class="ii-job__apply" aria-hidden="true">View and apply' + icon('arrow-up-right') + '</span></li>';
  }).join('');
}
function renderJobsError(el) {
  var list = el.querySelector('.ii-jobs__list');
  var failed = el.querySelector('[data-ii-jobs-error]');
  list.setAttribute('aria-busy', 'false');
  list.hidden = true;
  if (failed) failed.hidden = false;
}
function jobs(root) {
  (root || doc).querySelectorAll('[data-ii-jobs][data-src]').forEach(function (el) {
    var src = el.getAttribute('data-src');
    if (!src || !once(el, 'Jobs')) return;
    fetch(src, { headers: { Accept: 'application/json' } })
      .then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function (data) { renderJobs(el, data); })
      .catch(function () { renderJobsError(el); });
  });
}

// ---------------------------------------------------------------- pointer glow on glass shells
// Sets --mx / --my on a hovered .ii-shell so its ::after glow follows the pointer. Hover devices only.
function glow(root) {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  (root || doc).querySelectorAll('[data-ii-glow]').forEach(function (host) {
    if (!once(host, 'Glow')) return;
    host.addEventListener('pointermove', function (e) {
      var shell = e.target.closest('.ii-shell');
      if (!shell || !host.contains(shell)) return;
      var r = shell.getBoundingClientRect();
      shell.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      shell.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    }, { passive: true });
  });
}

// ---------------------------------------------------------------- motion choreography (GSAP, optional)
// Runs only when window.gsap is present and motion is not reduced. Every element keeps a
// CSS-only state without it: the headline rises with ii-rise, the stack stacks with sticky,
// the rail scrolls natively, buttons hover with CSS.
function motion(root) {
  var g = window.gsap;
  if (!g || reduceMotion.matches) return;
  var ST = window.ScrollTrigger;
  if (ST && g.registerPlugin) g.registerPlugin(ST);
  var scope = root || doc;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Headline: words rise out of masks. Plain-text headlines only (markup inside is flattened).
  scope.querySelectorAll('[data-ii-words]').forEach(function (el) {
    if (!once(el, 'Words')) return;
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w) { return '<span class="ii-word"><span class="ii-word__in">' + escapeHtml(w) + '</span></span>'; }).join(' ');
    el.style.animation = 'none';
    g.from(el.querySelectorAll('.ii-word__in'), { yPercent: 112, duration: 1.15, ease: 'expo.out', stagger: 0.07, delay: 0.15 });
  });

  // Magnetic pills: the button leans toward the pointer and springs back.
  if (fine) scope.querySelectorAll('[data-ii-magnetic]').forEach(function (el) {
    if (!once(el, 'Magnetic')) return;
    var xTo = g.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    var yTo = g.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.26);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.26);
    }, { passive: true });
    el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
  });

  if (!ST) return;

  // Card stack: each stuck card scales down and dims as the next one arrives.
  scope.querySelectorAll('[data-ii-stack]').forEach(function (list) {
    if (!once(list, 'Stack')) return;
    var cards = Array.prototype.slice.call(list.children);
    cards.forEach(function (card, i) {
      var next = cards[i + 1];
      if (!next) return;
      g.to(card, {
        scale: 0.965, ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top+=' + (140 + i * 16), scrub: true, invalidateOnRefresh: true },
      });
    });
  });

  // Values rail: on wide screens the section pins and vertical scroll drives the track.
  if (window.matchMedia('(min-width: 1024px)').matches) scope.querySelectorAll('[data-ii-rail]').forEach(function (section) {
    if (!once(section, 'Rail')) return;
    var track = section.querySelector('[data-ii-rail-track]');
    var rail = track && track.parentElement;
    if (!track) return;
    var distance = function () {
      var cs = getComputedStyle(rail);
      var inner = rail.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      return Math.max(0, track.scrollWidth - inner);
    };
    if (distance() <= 0) return;
    section.classList.add('is-pinned');
    g.to(track, {
      x: function () { return -distance(); }, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: function () { return '+=' + distance(); }, pin: true, scrub: 0.4, anticipatePin: 1, invalidateOnRefresh: true },
    });
  });
}

// ---------------------------------------------------------------- sheet: a tile morphs into a detail dialog
// [data-ii-sheet-host="<dialog id>"] wraps a ServiceIndex. Clicking a service opens the native
// <dialog> (focus, Esc and inert page for free), filled from the tile, and the tile morphs into the
// panel with a same-document view transition. Without view transitions, or under reduced motion,
// the dialog simply opens. Modified clicks (new tab) keep the link.
function sheet(root) {
  (root || doc).querySelectorAll('[data-ii-sheet-host]').forEach(function (host) {
    if (!once(host, 'Sheet')) return;
    var dialog = doc.getElementById(host.getAttribute('data-ii-sheet-host'));
    if (!dialog || typeof dialog.showModal !== 'function') return;
    var panel = dialog.querySelector('.ii-sheet__panel') || dialog;
    var slot = function (name) { return dialog.querySelector('[data-ii-sheet-' + name + ']'); };
    var current = null;
    var transition = function (update) {
      if (!doc.startViewTransition || reduceMotion.matches) { update(); return null; }
      return doc.startViewTransition(update);
    };
    var fill = function (tile, link) {
      var pick = function (sel) { return tile.querySelector(sel); };
      var items = Array.prototype.slice.call(tile.parentNode.children);
      var pad = function (n) { return (n < 10 ? '0' : '') + n; };
      if (slot('index')) slot('index').textContent = pad(items.indexOf(tile) + 1) + ' / ' + pad(items.length);
      slot('title').textContent = link.textContent.trim();
      var desc = pick('.ii-service__desc');
      slot('desc').textContent = desc ? desc.textContent.trim() : '';
      var scope = pick('.ii-service__scope');
      slot('scope').innerHTML = scope ? scope.innerHTML : '';
      slot('scope').hidden = !scope;
      var media = slot('media');
      var img = pick('.ii-service__media img');
      var glyph = pick('.ii-service__icon');
      media.innerHTML = '';
      media.classList.toggle('is-icon', !img);
      if (img) { var copy = img.cloneNode(); copy.removeAttribute('loading'); media.appendChild(copy); }
      else if (glyph) media.appendChild(glyph.cloneNode(true));
      if (slot('link')) slot('link').href = link.href;
    };
    var open = function (tile, link) {
      current = { tile: tile, link: link };
      fill(tile, link);
      tile.style.viewTransitionName = 'ii-sheet';
      var t = transition(function () {
        tile.style.viewTransitionName = '';
        panel.style.viewTransitionName = 'ii-sheet';
        doc.documentElement.style.overflow = 'hidden';
        dialog.showModal();
      });
      var done = function () { panel.style.viewTransitionName = ''; tile.style.viewTransitionName = ''; };
      if (t) t.finished.then(done, done); else done();
    };
    var close = function () {
      if (!dialog.open) return;
      var was = current;
      panel.style.viewTransitionName = 'ii-sheet';
      var t = transition(function () {
        panel.style.viewTransitionName = '';
        if (was) was.tile.style.viewTransitionName = 'ii-sheet';
        dialog.close();
        doc.documentElement.style.overflow = '';
      });
      var done = function () {
        panel.style.viewTransitionName = '';
        if (was) { was.tile.style.viewTransitionName = ''; was.link.focus({ preventScroll: true }); }
      };
      if (t) t.finished.then(done, done); else done();
    };
    host.addEventListener('click', function (e) {
      var link = e.target.closest('.ii-service__link');
      if (!link || e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var tile = link.closest('.ii-service');
      if (!tile) return;
      e.preventDefault();
      open(tile, link);
    });
    dialog.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog || e.target.closest('[data-ii-sheet-close]')) close();
    });
    host.iiSheet = { open: open, close: close };
  });
}

// ---------------------------------------------------------------- fiber scene (three.js, injected)
// mountScene(el, THREE): strands of glass carrying light pulses behind the Lit Fiber hero.
// THREE is passed in by the page (an ES module import), so the bundle stays dependency-free.
// Pauses off screen and when the tab is hidden; renders one still frame under reduced motion;
// does nothing without WebGL (the CSS glow stays).
function mountScene(el, THREE, opts) {
  if (!el || !THREE || !once(el, 'Scene')) return null;
  opts = opts || {};
  var css = getComputedStyle(doc.documentElement);
  var cssColor = function (name, fallback) { return (css.getPropertyValue(name) || '').trim() || fallback; };
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) { return null; }
  var still = reduceMotion.matches;
  var narrow = el.clientWidth < 768;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, narrow ? 1.5 : 2));
  var canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  el.appendChild(canvas);

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(new THREE.Color(cssColor('--surface', '#080807')), 5, 15);
  var camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
  camera.position.set(0, 0, 7.5);
  var group = new THREE.Group();
  scene.add(group);

  // Deterministic layout so the scene looks the same on every visit.
  var seed = 7;
  var rand = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  var strandCount = opts.strands || (narrow ? 10 : 16);
  var curves = [];
  var strandMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(cssColor('--neutral-300', '#bfbdbb')), transparent: true, opacity: 0.11, blending: THREE.AdditiveBlending, depthWrite: false });
  for (var i = 0; i < strandCount; i++) {
    var pts = [];
    var y0 = (rand() - 0.5) * 5.5;
    var z0 = (rand() - 0.5) * 5;
    for (var k = 0; k < 6; k++) {
      pts.push(new THREE.Vector3(-11 + k * 4.4 + (rand() - 0.5) * 1.2, y0 + Math.sin(k * 1.3 + i) * (0.6 + rand() * 0.9), z0 + (rand() - 0.5) * 1.6));
    }
    var curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
    curves.push(curve);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 96, 0.012 + rand() * 0.022, 6, false), strandMat));
  }

  // Pulses: additive point sprites moving along the strands.
  var sprite = doc.createElement('canvas');
  sprite.width = sprite.height = 64;
  var ctx = sprite.getContext('2d');
  var grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.6)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  var pulseCount = opts.pulses || strandCount * 3;
  var positions = new Float32Array(pulseCount * 3);
  var colors = new Float32Array(pulseCount * 3);
  var orange = new THREE.Color(cssColor('--brand-orange', '#e87722'));
  var flame = new THREE.Color(cssColor('--flame-yellow', '#efd347'));
  var pulses = [];
  for (var p = 0; p < pulseCount; p++) {
    var c = rand() < 0.8 ? orange : flame;
    colors[p * 3] = c.r; colors[p * 3 + 1] = c.g; colors[p * 3 + 2] = c.b;
    pulses.push({ curve: curves[p % curves.length], t: rand(), speed: 0.03 + rand() * 0.09 });
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  var points = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.34, map: new THREE.CanvasTexture(sprite), vertexColors: true, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true }));
  group.add(points);

  var target = { x: 0, y: 0 };
  var pointer = { x: 0, y: 0 };
  var onMove = function (e) { target.x = e.clientX / window.innerWidth - 0.5; target.y = e.clientY / window.innerHeight - 0.5; };
  if (!still && window.matchMedia('(hover: hover)').matches) window.addEventListener('pointermove', onMove, { passive: true });

  var host = el.closest('.ii-hero') || el;
  var progress = function () {
    var r = host.getBoundingClientRect();
    return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
  };
  var placePulses = function (dt) {
    for (var q = 0; q < pulseCount; q++) {
      var pu = pulses[q];
      pu.t = (pu.t + pu.speed * dt) % 1;
      if (!(pu.t >= 0)) pu.t = 0;
      var v = pu.curve.getPointAt(pu.t);
      positions[q * 3] = v.x; positions[q * 3 + 1] = v.y; positions[q * 3 + 2] = v.z;
    }
    geo.attributes.position.needsUpdate = true;
  };
  var pose = function () {
    var pr = progress();
    group.rotation.y = pointer.x * 0.14 + pr * 0.4;
    group.rotation.x = -pointer.y * 0.1 + pr * 0.12;
    group.position.y = pr * 1.4;
    camera.position.z = 7.5 - pr * 3.2;
  };
  var resize = function () {
    var w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (still) { placePulses(0); pose(); renderer.render(scene, camera); }
  };
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(el);
  resize();

  var running = false, wanted = true, last = 0;
  var frame = function (now) {
    if (!running) return;
    var dt = Math.max(0, Math.min(0.05, (now - last) / 1000 || 0));
    last = now;
    pointer.x += (target.x - pointer.x) * 0.05;
    pointer.y += (target.y - pointer.y) * 0.05;
    placePulses(dt);
    pose();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };
  var start = function () { if (running || still || !wanted || doc.hidden) return; running = true; last = performance.now(); requestAnimationFrame(frame); };
  var stop = function () { running = false; };
  if (still) { placePulses(0); pose(); renderer.render(scene, camera); }
  else {
    if ('IntersectionObserver' in window) new IntersectionObserver(function (entries) { wanted = entries[0].isIntersecting; wanted ? start() : stop(); }, { threshold: 0.02 }).observe(el);
    doc.addEventListener('visibilitychange', function () { doc.hidden ? stop() : start(); });
    start();
  }
  return {
    renderer: renderer, scene: scene, camera: camera, start: start, stop: stop,
    dispose: function () { stop(); window.removeEventListener('pointermove', onMove); renderer.dispose(); canvas.remove(); },
  };
}
// Mounts every [data-ii-scene] on the page once THREE arrives: IntegrityDS.scene.mountAll(THREE).
function mountScenes(THREE, root) {
  return Array.prototype.map.call((root || doc).querySelectorAll('[data-ii-scene]'), function (el) { return mountScene(el, THREE); });
}

// ---------------------------------------------------------------- small things
function year(root) {
  (root || doc).querySelectorAll('[data-ii-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
}

function init(root) {
  hydrateIcons(root);
  header(root);
  nav(root);
  marquee(root);
  forms(root);
  jobs(root);
  glow(root);
  sheet(root);
  motion(root);
  year(root);
}

window.IntegrityDS = {
  version: '0.2.0',
  icons: ICONS,
  icon: icon,
  init: init,
  hydrateIcons: hydrateIcons,
  header: header,
  nav: nav,
  marquee: marquee,
  forms: forms,
  glow: glow,
  sheet: sheet,
  motion: motion,
  scene: { mount: mountScene, mountAll: mountScenes },
  jobs: { load: jobs, render: renderJobs, renderError: renderJobsError },
};

if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', function () { init(); });
else init();

})();
