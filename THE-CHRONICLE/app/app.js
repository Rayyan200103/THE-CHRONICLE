/* ═══════════════════════════════════════════════════════════════════════
   THE CHRONICLES — app layer
   Shared by every page. Self-contained; touches nothing else on the page.

   1. Registers the service worker (offline reading + always-current content)
   2. Inside the installed app, keeps the companion documents inside the app
      instead of sending the reader out to a browser tab
   3. Gives About Me a way home when running as an app
   4. Notices when a new edition has been deployed while the app is open
   5. Invites visitors to install — Install button on Android, and the
      Share → Add to Home Screen steps on iPhone
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // The site root is the folder above this script: …/THE-CHRONICLE/
  var here = document.currentScript && document.currentScript.src;
  var ROOT = here ? new URL('../', here) : new URL('./', location.href);
  var ROOT_PATH = ROOT.pathname;
  var PAGE = location.pathname.split('/').pop() || 'index.html';
  var IS_MAIN = PAGE === '' || PAGE === 'index.html';

  var standalone = false;
  try {
    standalone = window.matchMedia('(display-mode: standalone)').matches ||
                 window.matchMedia('(display-mode: fullscreen)').matches ||
                 window.navigator.standalone === true;
  } catch (e) {}
  if (standalone) document.documentElement.classList.add('is-app');

  var ua = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }

  /* ── 1 · service worker ─────────────────────────────────────────────── */
  var swReg = null;
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      // Give the page its first frames before the worker starts caching.
      setTimeout(function () {
        navigator.serviceWorker.register(new URL('sw.js', ROOT).href,
          { scope: ROOT_PATH, updateViaCache: 'none' })
          .then(function (reg) { swReg = reg; })
          .catch(function () { /* the site works without it */ });
      }, 1500);
    });
  }

  /* ── 2 · keep the companion documents inside the app ─────────────────── */
  function inScope(href) {
    try {
      var u = new URL(href, location.href);
      return u.origin === location.origin && u.pathname.indexOf(ROOT_PATH) === 0 ? u : null;
    } catch (e) { return null; }
  }
  if (standalone) {
    // Links written with target="_blank" would open a browser tab and take the
    // reader out of the app. Inside the app they open in place.
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a || a.target !== '_blank' || a.hasAttribute('download')) return;
      var u = inScope(a.href);
      if (!u) return;                          // outside links still open outside
      e.preventDefault();
      location.href = u.href;
    }, true);
    // The Karbala cell and Ask Rayyan open pages with window.open().
    var nativeOpen = window.open;
    window.open = function (url) {
      var u = url ? inScope(url) : null;
      if (u) { location.href = u.href; return null; }
      return nativeOpen.apply(window, arguments);
    };
  }

  /* ── shared toast ───────────────────────────────────────────────────── */
  var css = document.createElement('style');
  css.textContent =
    '.chx-toast{position:fixed;left:50%;bottom:calc(76px + env(safe-area-inset-bottom,0px));z-index:9999;' +
    'transform:translate(-50%,16px);opacity:0;pointer-events:none;width:min(420px,calc(100vw - 24px));box-sizing:border-box;' +
    'display:flex;gap:12px;align-items:center;padding:12px 12px 12px 14px;border-radius:14px;' +
    'background:linear-gradient(160deg,#241008 0%,#170805 100%);border:1px solid rgba(201,168,76,.55);' +
    'box-shadow:0 14px 40px rgba(0,0,0,.65),inset 0 1px 0 rgba(255,236,190,.08);color:#E8D6B0;' +
    'font-family:"EB Garamond",Georgia,serif;transition:opacity .35s ease,transform .35s cubic-bezier(.2,.8,.2,1)}' +
    '.chx-toast.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}' +
    '.chx-ico{width:42px;height:42px;border-radius:10px;flex:none;box-shadow:0 2px 8px rgba(0,0,0,.6)}' +
    '.chx-txt{flex:1;min-width:0;line-height:1.35}' +
    '.chx-t{font-family:Cinzel,"EB Garamond",Georgia,serif;font-weight:700;font-size:13px;letter-spacing:.08em;color:#E6C265}' +
    '.chx-s{font-size:14px;color:#D9C7A2;margin-top:3px}' +
    '.chx-s b{color:#F0D98E;font-weight:600}' +
    '.chx-share{display:inline-block;width:13px;height:15px;vertical-align:-2px;margin:0 2px}' +
    '.chx-btns{display:flex;flex-direction:column;gap:6px;flex:none}' +
    '.chx-b{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;' +
    'border-radius:16px;padding:8px 13px;cursor:pointer;border:1px solid #C9A84C;background:linear-gradient(180deg,#E6C265,#B8862A);' +
    'color:#1A0A04;font-weight:700;-webkit-tap-highlight-color:transparent}' +
    '.chx-b.ghost{background:none;color:#CDB78C;border-color:rgba(201,168,76,.4);font-weight:500}' +
    '.chx-b:focus-visible{outline:2px solid #E6C265;outline-offset:2px}' +
    '@media (min-width:769px){.chx-toast{bottom:24px;left:24px;transform:translate(0,16px)}.chx-toast.on{transform:translate(0,0)}}' +
    '@media (max-height:500px) and (min-width:480px){.chx-toast{bottom:calc(52px + env(safe-area-inset-bottom,0px))}}' +
    '.chx-home{position:fixed;left:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:9990;display:flex;' +
    'align-items:center;gap:8px;padding:8px 14px 8px 8px;border-radius:22px;border:1px solid rgba(201,168,76,.6);' +
    'background:rgba(20,8,5,.92);color:#E6C265;font:600 11px/1 Cinzel,Georgia,serif;letter-spacing:.1em;' +
    'text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,.55);-webkit-tap-highlight-color:transparent}' +
    '.chx-home img{width:22px;height:22px;border-radius:6px}' +
    '@media (prefers-reduced-motion:reduce){.chx-toast{transition:none}}';
  (document.head || document.documentElement).appendChild(css);

  var toastEl = null;
  function toast(opts) {
    hideToast(true);
    var t = document.createElement('div');
    t.className = 'chx-toast';
    t.setAttribute('role', 'dialog');
    t.setAttribute('aria-live', 'polite');
    t.innerHTML =
      '<img class="chx-ico" alt="" src="' + new URL('app/icon-192.png', ROOT).href + '">' +
      '<div class="chx-txt"><div class="chx-t">' + opts.title + '</div><div class="chx-s">' + opts.text + '</div></div>' +
      '<div class="chx-btns"></div>';
    var box = t.querySelector('.chx-btns');
    opts.buttons.forEach(function (b) {
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'chx-b' + (b.ghost ? ' ghost' : '');
      el.textContent = b.label;
      el.addEventListener('click', function () { b.action(); });
      box.appendChild(el);
    });
    document.body.appendChild(t);
    toastEl = t;
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('on'); }); });
  }
  function hideToast(now) {
    var t = toastEl; toastEl = null;
    if (!t) return;
    if (now) { t.remove(); return; }
    t.classList.remove('on');
    setTimeout(function () { t.remove(); }, 400);
  }

  /* ── 3 · a way home from About Me, inside the app ────────────────────── */
  if (standalone && /^AboutMe\.html$/i.test(PAGE)) {
    document.addEventListener('DOMContentLoaded', function () {
      var a = document.createElement('a');
      a.className = 'chx-home';
      a.href = ROOT.href;
      a.setAttribute('aria-label', 'Back to The Chronicles');
      a.innerHTML = '<img alt="" src="' + new URL('app/icon-96.png', ROOT).href + '"><span>‹ THE CHRONICLES</span>';
      a.addEventListener('click', function (e) {
        if (document.referrer.indexOf(ROOT.href) === 0 && history.length > 1) { e.preventDefault(); history.back(); }
      });
      document.body.appendChild(a);
    });
  }

  /* ── 4 · notice a new edition deployed while the app is open ─────────── */
  // document.lastModified carries the Last-Modified date of the copy on screen
  // (from GitHub, or from the phone's kept copy when offline). A HEAD request
  // asks GitHub for the date of the current file without downloading it.
  var shown = Date.parse(document.lastModified);
  var lastCheck = 0, updateShown = false;
  function checkForEdition() {
    if (updateShown || !/^https?:$/.test(location.protocol) || !navigator.onLine || isNaN(shown)) return;
    lastCheck = Date.now();
    fetch(location.href.split('#')[0], { method: 'HEAD', cache: 'no-store', credentials: 'same-origin' })
      .then(function (r) {
        var lm = r.ok ? Date.parse(r.headers.get('last-modified') || '') : NaN;
        if (!isNaN(lm) && lm - shown > 2000) {
          updateShown = true;
          if (swReg) swReg.update().catch(function () {});
          toast({
            title: 'A NEW EDITION',
            text: 'The Chronicles has been updated since you opened it.',
            buttons: [
              { label: 'Refresh', action: function () { location.reload(); } },
              { label: 'Later', ghost: true, action: function () { hideToast(); } }
            ]
          });
        }
      })
      .catch(function () {});
  }
  window.addEventListener('load', function () { setTimeout(checkForEdition, 6000); });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && Date.now() - lastCheck > 4 * 60 * 1000) {
      checkForEdition();
      if (swReg) swReg.update().catch(function () {});
    }
  });
  window.addEventListener('online', checkForEdition);
  setInterval(function () { if (document.visibilityState === 'visible') checkForEdition(); }, 15 * 60 * 1000);

  /* ── 5 · invite visitors to install ─────────────────────────────────── */
  var DISMISS_KEY = 'chronicles-install-dismissed';
  var DISMISS_DAYS = 14;
  var deferredPrompt = null;

  function recentlyDismissed() {
    var t = parseInt(store(DISMISS_KEY) || '0', 10);
    return t && (Date.now() - t) < DISMISS_DAYS * 864e5;
  }
  function dismiss() { store(DISMISS_KEY, String(Date.now())); hideToast(); }

  var SHARE_ICON = '<svg class="chx-share" viewBox="0 0 13 15" aria-hidden="true"><path d="M6.5 1v8.6M3.6 3.8 6.5 1l2.9 2.8" fill="none" stroke="#F0D98E" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.4 6H2.2v7.8h8.6V6H8.6" fill="none" stroke="#F0D98E" stroke-width="1.3" stroke-linejoin="round"/></svg>';

  function invite() {
    if (standalone || updateShown || recentlyDismissed() || store('chronicles-installed')) return;
    if (deferredPrompt) {
      toast({
        title: 'INSTALL THE CHRONICLES',
        text: 'Add it to your home screen — opens full-screen, reads offline, and updates itself.',
        buttons: [
          { label: 'Install', action: function () {
              var p = deferredPrompt; deferredPrompt = null; hideToast();
              p.prompt();
              p.userChoice.then(function (c) { if (c && c.outcome === 'dismissed') store(DISMISS_KEY, String(Date.now())); })
               .catch(function () {});
          } },
          { label: 'Not now', ghost: true, action: dismiss }
        ]
      });
    } else if (isIOS) {
      toast({
        title: 'INSTALL ON YOUR iPHONE',
        text: 'Tap ' + SHARE_ICON + ' <b>Share</b>, then <b>Add to Home Screen</b>.',
        buttons: [{ label: 'Got it', ghost: true, action: dismiss }]
      });
    }
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();                  // hold it until the reader is in the timeline
    deferredPrompt = e;
  });
  window.addEventListener('appinstalled', function () {
    store('chronicles-installed', '1');
    deferredPrompt = null;
    hideToast();
  });

  // Only on the main page, and only once the reader has left the overture —
  // never over the opening screen.
  if (IS_MAIN && !standalone) {
    document.addEventListener('DOMContentLoaded', function () {
      var armed = false;
      function arm() {
        if (armed || document.body.classList.contains('overture-up')) return;
        armed = true;
        setTimeout(invite, 4500);
      }
      arm();
      try {
        new MutationObserver(arm).observe(document.body, { attributes: true, attributeFilter: ['class'] });
      } catch (e) {}
    });
  }
})();
