/* ═══════════════════════════════════════════════════════════════════════
   THE CHRONICLES — analytics and cookie consent
   Shared by every page. Self-contained.

   WHAT IT DOES
   Loads Google Analytics 4 (traffic sources, pages read, time on page).
   Google Analytics sets cookies, so:
     · visitors whose device is set to a European time zone (the UK, the
       EU and the rest of Europe) are asked first, in a small panel at the
       bottom of the screen, and Analytics loads only if they accept;
     · Google applies the same rule by the visitor's location (the consent
       "region" defaults below), so a UK or EU visitor travelling with a
       non-European clock is still covered;
     · everyone else is counted from the first visit and can switch it off.
   The choice is kept on the device. "Cookie settings" in every page's
   footer reopens the panel, and declining deletes the Analytics cookies.

   Nothing runs on the old GitHub Pages address (it only forwards) or inside
   Google Translate's view of the site.

   TO SWITCH ANALYTICS ON OR CHANGE THE PROPERTY
   Put the Measurement ID from Google Analytics (Admin → Data streams →
   your stream) on the GA_ID line below. Until a real ID is there, this
   file does nothing: no panel, no Analytics, no "Cookie settings" link.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.ChroniclesConsent) return;

  var GA_ID = 'G-BKRDH90677';
  var KEY = 'chx-consent';                       // 'granted' | 'denied'

  var host = location.hostname;
  if (/\.github\.io$/i.test(host)) return;
  var PROXY = /\.translate\.goog$/i.test(host);
  var ON = /^G-[A-Z0-9]{4,}$/.test(GA_ID) && GA_ID !== 'G-XXXXXXXXXX' && !PROXY;

  // The EU, the rest of the European Economic Area, the UK and Switzerland.
  var REGION = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
    'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'];
  function zone() { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { return ''; } }
  var ASK = /^(Europe\/|Arctic\/Longyearbyen$|Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe|Faeroe)$)/.test(zone());

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function put(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  var loaded = false;
  function load() {
    if (loaded || !ON) return;
    loaded = true;
    window['ga-disable-' + GA_ID] = false;
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    (document.head || document.documentElement).appendChild(s);
  }

  // Delete the Analytics cookies on this host and its parent domains.
  function clearCookies() {
    var names = document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); })
      .filter(function (n) { return /^_ga(_|$)|^_gid$|^_gat/.test(n); });
    var parts = host.split('.'), domains = [''];
    for (var i = 0; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  /* ── the panel ───────────────────────────────────────────────────────── */
  var CSS = [
    '.chx-cc{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);',
    'z-index:2147483000;width:min(560px,calc(100% - 24px));box-sizing:border-box;background:#1B080D;color:#EADBB8;',
    'border:1px solid #8A6424;border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.55);padding:16px 18px 14px;',
    "font:16px/1.5 'EB Garamond',Georgia,'Times New Roman',serif;text-align:left}",
    ".chx-cc h2{margin:0 0 4px;font:600 12px/1.4 'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;letter-spacing:.14em;text-transform:uppercase;color:#E6C265}",
    '.chx-cc p{margin:0 0 12px}',
    '.chx-cc-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px}',
    ".chx-cc button{font:600 12px/1 'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;letter-spacing:.08em;text-transform:uppercase;",
    'border-radius:999px;padding:10px 18px;cursor:pointer;border:1px solid #C9A84C;min-height:38px}',
    '.chx-cc .chx-yes{background:#C9A84C;color:#1B080D}',
    '.chx-cc .chx-no{background:transparent;color:#E6C265}',
    '.chx-cc a{color:#E6C265;text-decoration:underline;text-underline-offset:2px;margin-left:auto;font-size:15px}',
    '.chx-cc button:focus-visible,.chx-cc a:focus-visible{outline:2px solid #FFF3D6;outline-offset:2px}',
    '@media (prefers-reduced-motion:no-preference){.chx-cc{animation:chxccIn .35s ease both}}',
    '@keyframes chxccIn{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}',
    '.chx-legal a,.chx-legal button{color:inherit;text-decoration:underline;text-underline-offset:2px}',
    '.chx-legal button{background:none;border:0;padding:0;margin:0;font:inherit;letter-spacing:inherit;cursor:pointer}',
    '.chx-legal a:focus-visible,.chx-legal button:focus-visible{outline:1px solid currentColor;outline-offset:2px}'
  ].join('');
  function style() {
    if (document.getElementById('chx-cc-css')) return;
    var s = document.createElement('style');
    s.id = 'chx-cc-css';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  var panel = null;
  function hide() { if (panel) { panel.remove(); panel = null; } }
  function show() {
    if (!ON || panel) return;
    style();
    panel = document.createElement('section');
    panel.className = 'chx-cc';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Cookie choice');
    var h = document.createElement('h2'); h.textContent = 'Cookies';
    var p = document.createElement('p');
    p.textContent = 'The Chronicles uses Google Analytics to count visits and see which pages are read. It sets cookies on your device. Nothing is used for advertising, and the site works the same either way.';
    var row = document.createElement('div'); row.className = 'chx-cc-row';
    var yes = document.createElement('button'); yes.type = 'button'; yes.className = 'chx-yes'; yes.textContent = 'Accept';
    var no = document.createElement('button'); no.type = 'button'; no.className = 'chx-no'; no.textContent = 'Decline';
    var a = document.createElement('a'); a.href = 'privacy.html'; a.textContent = 'Privacy policy';
    yes.addEventListener('click', accept);
    no.addEventListener('click', decline);
    // Keys pressed here belong to the panel, not to the page underneath.
    panel.addEventListener('keydown', function (e) { e.stopPropagation(); });
    row.appendChild(yes); row.appendChild(no); row.appendChild(a);
    panel.appendChild(h); panel.appendChild(p); panel.appendChild(row);
    document.body.appendChild(panel);
  }

  function accept() {
    put('granted');
    gtag('consent', 'update', { analytics_storage: 'granted' });
    window['ga-disable-' + GA_ID] = false;
    load();
    hide();
  }
  function decline() {
    put('denied');
    gtag('consent', 'update', { analytics_storage: 'denied' });
    window['ga-disable-' + GA_ID] = true;
    clearCookies();
    hide();
  }

  /* ── start ───────────────────────────────────────────────────────────── */
  function start() {
    if (!ON) return;
    style();
    var wraps = document.querySelectorAll('[data-chx-consent-wrap]');
    for (var i = 0; i < wraps.length; i++) wraps[i].hidden = false;
    document.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('[data-chx-consent]') : null;
      if (!b) return;
      e.preventDefault();
      show();
    });
    var choice = get();
    if (choice === 'granted') { gtag('consent', 'update', { analytics_storage: 'granted' }); load(); }
    else if (choice === 'denied') { window['ga-disable-' + GA_ID] = true; }
    else if (ASK) show();
    else load();
  }

  if (ON) {
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('consent', 'default', { analytics_storage: 'denied', region: REGION });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  window.ChroniclesConsent = {
    open: show,
    choice: function () { return get() || (ASK ? 'not asked yet' : 'default (on)'); },
    on: ON
  };
})();
