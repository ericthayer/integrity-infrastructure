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
