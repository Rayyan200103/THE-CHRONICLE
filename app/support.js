/* ═══════════════════════════════════════════════════════════════════════
   THE CHRONICLES — Help me run The Chronicles (Patreon) · The Chronicles Shop

   THE ONLY LINES YOU EVER EDIT ARE IN "SETTINGS" BELOW:
     PATREON     the Patreon page address, exactly as Patreon shows it
     SUPPORTERS  names of supporters who agreed to be listed (oldest first)
     LOCAL_EMAIL where readers in Pakistan can ask for a local way to pay
   The tier prices and benefits under TIERS must always say exactly what the
   Patreon page says.

   What this file does, on every page that loads it:
     · opens the two header cells on the timeline, "Help me run The
       Chronicles" and "The Chronicles Shop" (their markup is in index.html);
     · adds "Help me run The Chronicles" to every footer, and a small
       floating button on the companion pages once the reader scrolls in;
     · the Help panel: the three Patreon tiers, what support pays for, how to
       pay from any country, the Founding Supporters, free and gift options,
       and a Share button;
     · the Shop panel: "coming soon";
     · one gentle invitation, at most once a week, only to readers who have
       clearly been reading, and never over anything else on the screen;
     · thechronicles.live/?support opens the Help panel and ?shop the Shop
       panel: use those links in posts, messages and emails.
   No cookies. Two small notes are kept on the reader's own device (when the
   invitation was last shown, and whether they opened Patreon), so the
   invitation is not repeated. Nothing is sent anywhere, except a Google
   Analytics event where the reader has allowed Analytics.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.ChroniclesSupport) return;

  /* ── SETTINGS ─────────────────────────────────────────────────────────── */
  var PATREON = 'https://www.patreon.com/TheChroniclesLive';
  var SUPPORTERS = [];            // e.g. ['Ahmed K.', 'Sara M.'] — only with their permission
  var LOCAL_EMAIL = 'thechronicleslive@gmail.com';
  /* ──────────────────────────────────────────────────────────────────────── */

  var BASE = PATREON.replace(/\/+$/, '');
  var JOIN = BASE + '/membership';
  var SITE = 'https://thechronicles.live/';
  var TIERS = [
    { id: 'reader', name: 'Reader', price: '$3.99', perks: [
      'Your name on the Founding Supporters list',
      'The first 20 Readers are thanked by name on the website'] },
    { id: 'scholar', name: 'Scholar', price: '$5.99', pick: true, perks: [
      'Everything in Reader',
      'A monthly research note: what was added, what was corrected, and the sources behind it',
      'A thank-you on The Chronicles’ Instagram',
      'The first 10 Scholars vote on the next links and research added'] },
    { id: 'patron', name: 'Patron', price: '$12.99', perks: [
      'Everything in Scholar',
      'Early previews of new chapters',
      'A vote on the next topic, research and links added across the whole timeline'] }
  ];

  var K_INV = 'chx-sup-invite', K_JOIN = 'chx-sup-joined';
  var WEEK = 7 * 864e5;
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function track(name, params) { try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {} }
  function esc(s) { return String(s).replace(/[<>&"]/g, function (c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; }); }

  var isIndex = !!document.getElementById('tlWrap') || !!document.getElementById('mobView');

  /* ── which currency the reader will pay in ────────────────────────────── */
  // Prices are set in US dollars. Patreon charges members in 16 currencies and
  // converts the price; anyone else pays in dollars and their bank converts.
  // The guess comes from the browser's language setting only.
  var EUR = 'AT BE CY DE EE ES FI FR GR HR IE IT LT LU LV MT NL PT SI SK'.split(' ');
  var CUR = { US: 'US dollars', GB: 'pounds', CA: 'Canadian dollars', AU: 'Australian dollars', NZ: 'New Zealand dollars',
    DK: 'Danish kroner', NO: 'Norwegian kroner', SE: 'Swedish kronor', HK: 'Hong Kong dollars', SG: 'Singapore dollars',
    CZ: 'Czech koruna', HU: 'Hungarian forint', PL: 'Polish złoty', MX: 'Mexican pesos', BR: 'Brazilian reais' };
  function region() {
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) { var m = /[-_]([A-Za-z]{2})\b/.exec(langs[i] || ''); if (m) return m[1].toUpperCase(); }
    try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; if (/Karachi/.test(tz)) return 'PK'; } catch (e) {}
    return '';
  }
  function currencyLine() {
    var r = region();
    var c = EUR.indexOf(r) >= 0 ? 'euros' : CUR[r];
    if (r === 'US') return 'Prices are in <b>US dollars</b>, the currency you pay in.';
    if (c) return 'Prices are in US dollars. Patreon shows and charges them in <b>' + c + '</b> for you.';
    return 'Prices are in US dollars. Patreon also charges in 15 other currencies, including euros and pounds; anywhere else, your card pays in dollars and your bank converts it.';
  }

  /* ── styles ───────────────────────────────────────────────────────────── */
  var CSS = [
    '.sp-ov{position:fixed;inset:0;z-index:10060;display:flex;align-items:center;justify-content:center;padding:22px;',
    'background:rgba(8,1,3,.82);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);opacity:0;transition:opacity .28s ease}',
    '.sp-ov[hidden]{display:none!important}.sp-ov.on{opacity:1}',
    '.sp-sheet{position:relative;display:flex;flex-direction:column;width:min(880px,100%);max-height:calc(100vh - 44px);max-height:calc(100dvh - 44px);',
    'background:radial-gradient(ellipse 80% 40% at 50% 0%,rgba(150,40,52,.24) 0%,transparent 70%),linear-gradient(172deg,#2B0A11 0%,#1F070C 46%,#170509 100%);',
    'border:1px solid rgba(201,168,76,.5);border-radius:18px;overflow:hidden;color:#F0E6CC;',
    'box-shadow:0 30px 90px rgba(0,0,0,.75),0 0 0 1px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,230,180,.08);',
    'transform:translateY(16px) scale(.985);transition:transform .34s cubic-bezier(.2,.8,.2,1)}',
    '.sp-sheet.mid{width:min(600px,100%)}',
    '.sp-ov.on .sp-sheet{transform:none}',
    '.sp-head{flex:none;display:flex;align-items:center;gap:14px;padding:15px 18px 14px 20px;border-bottom:1px solid rgba(201,168,76,.24);background:linear-gradient(180deg,rgba(0,0,0,.28),rgba(0,0,0,.08))}',
    '.sp-logo{width:44px;height:44px;border-radius:11px;flex:none;box-shadow:0 3px 12px rgba(0,0,0,.6),0 0 0 1px rgba(201,168,76,.35)}',
    '.sp-ht{flex:1;min-width:0}',
    '.sp-k{font:500 9.5px/1.2 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.22em;color:#B89A5A;text-transform:uppercase}',
    '.sp-t{font:700 19px/1.2 Cinzel,Georgia,serif;letter-spacing:.07em;color:#E8C97A;margin-top:3px;text-shadow:0 0 22px rgba(232,201,122,.25)}',
    '.sp-x{flex:none;width:36px;height:36px;border-radius:50%;border:1px solid rgba(201,168,76,.4);background:rgba(0,0,0,.25);color:#E8C97A;font-size:16px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s,border-color .2s,background .2s}',
    '.sp-x:hover{transform:rotate(90deg);border-color:#E8C97A;background:rgba(201,168,76,.14)}',
    '.sp-body{flex:1;overflow:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:20px 22px 24px;scrollbar-width:thin;scrollbar-color:#7A5F28 transparent}',
    '.sp-lead{font:400 17px/1.55 "EB Garamond",Georgia,serif;color:#E9DCBC;margin:0 0 6px;max-width:700px}',
    '.sp-lead b{color:#E8C97A;font-weight:600}',
    '.sp-pays{font:italic 400 15px/1.5 "EB Garamond",Georgia,serif;color:#BFAE8A;margin:0 0 18px;max-width:700px}',
    '.sp-tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:0 0 18px}',
    '.sp-tier{position:relative;display:flex;flex-direction:column;border:1px solid rgba(201,168,76,.32);border-radius:14px;padding:18px 16px 16px;background:rgba(0,0,0,.22)}',
    '.sp-tier.pick{border-color:#C9A84C;background:linear-gradient(180deg,rgba(201,168,76,.12),rgba(0,0,0,.2));box-shadow:0 0 0 1px rgba(201,168,76,.25),0 10px 30px rgba(0,0,0,.35)}',
    '.sp-flag{position:absolute;top:-10px;left:16px;font:600 9px/1 "JetBrains Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:#1E0A05;background:linear-gradient(180deg,#EBC873,#B98A2C);border-radius:10px;padding:5px 9px}',
    '.sp-name{font:700 15px/1.2 Cinzel,Georgia,serif;letter-spacing:.12em;color:#E8C97A;text-transform:uppercase}',
    '.sp-price{margin:8px 0 10px;font:600 30px/1 "EB Garamond",Georgia,serif;color:#F5E3A8}',
    '.sp-price small{font:400 13px/1 "EB Garamond",Georgia,serif;color:#BFAE8A;margin-left:4px}',
    '.sp-perks{list-style:none;margin:0 0 14px;padding:0;flex:1}',
    '.sp-perks li{position:relative;padding-left:16px;margin:0 0 7px;font:400 15px/1.4 "EB Garamond",Georgia,serif;color:#DCCDAA}',
    '.sp-perks li::before{content:"";position:absolute;left:2px;top:.55em;width:6px;height:6px;border-radius:50%;background:#C9A84C}',
    '.sp-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;border-radius:22px;font:700 11px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;padding:12px 16px;border:1px solid #C9A84C;background:linear-gradient(180deg,#EBC873,#B98A2C);color:#1E0A05;box-shadow:0 4px 16px rgba(0,0,0,.45);transition:transform .15s,filter .15s;text-decoration:none;-webkit-tap-highlight-color:transparent}',
    '.sp-btn:hover{filter:brightness(1.08);transform:translateY(-1px)}',
    '.sp-btn.ghost{background:rgba(0,0,0,.22);color:#E8C97A;border-color:rgba(201,168,76,.5);box-shadow:none;font-weight:500}',
    '.sp-x:focus-visible,.sp-btn:focus-visible,.sp-a:focus-visible,.sp-fab:focus-visible,.sp-inv button:focus-visible{outline:2px solid #E8C97A;outline-offset:2px}',
    '.sp-how{display:grid;grid-template-columns:1fr 1fr;gap:12px 22px;border-top:1px solid rgba(201,168,76,.2);padding-top:16px;margin-bottom:16px}',
    '.sp-how div{font:400 14.5px/1.45 "EB Garamond",Georgia,serif;color:#CDBC97}',
    '.sp-how div > b{display:block;font:600 9.5px/1.4 "JetBrains Mono",monospace;letter-spacing:.18em;text-transform:uppercase;color:#B89A5A;margin-bottom:3px}',
    '.sp-how span b{font-weight:600;color:#E8C97A}',
    '.sp-a{color:#E8C97A;text-decoration:underline;text-decoration-color:rgba(232,201,122,.4);text-underline-offset:2px}',
    '.sp-founders{border-top:1px solid rgba(201,168,76,.2);padding-top:14px;margin-bottom:16px}',
    '.sp-founders p{margin:4px 0 0;font:italic 400 15px/1.5 "EB Garamond",Georgia,serif;color:#DCCDAA}',
    '.sp-share{display:flex;flex-wrap:wrap;align-items:center;gap:12px;border-top:1px solid rgba(201,168,76,.2);padding-top:16px}',
    '.sp-share p{flex:1 1 260px;margin:0;font:400 15px/1.45 "EB Garamond",Georgia,serif;color:#CDBC97}',
    '.sp-share p b{color:#E8C97A;font-weight:600}',
    /* the Shop panel */
    '.sp-shop{text-align:center;padding:8px 4px 6px}',
    '.sp-shop-h{font:700 22px/1.25 Cinzel,Georgia,serif;letter-spacing:.06em;color:#E8C97A;margin:2px 0 4px;text-shadow:0 0 22px rgba(232,201,122,.25)}',
    '.sp-shop-k{font:600 10px/1.4 "JetBrains Mono",monospace;letter-spacing:.22em;text-transform:uppercase;color:#B89A5A;margin:18px 0 10px}',
    '.sp-shop ul{list-style:none;margin:0 auto 18px;padding:0;max-width:420px;text-align:left}',
    '.sp-shop li{position:relative;padding:11px 14px 11px 40px;margin:0 0 9px;border:1px solid rgba(201,168,76,.28);border-radius:12px;background:rgba(0,0,0,.22);font:400 16.5px/1.35 "EB Garamond",Georgia,serif;color:#E2D4B2}',
    '.sp-shop li::before{content:"";position:absolute;left:16px;top:50%;width:9px;height:9px;margin-top:-4.5px;transform:rotate(45deg);background:linear-gradient(135deg,#EBC873,#B98A2C)}',
    '.sp-shop-end{font:italic 400 17px/1.5 "EB Garamond",Georgia,serif;color:#DCCDAA;margin:0}',
    '.sp-shop-end b{display:block;font:700 13px/1.6 Cinzel,Georgia,serif;font-style:normal;letter-spacing:.16em;text-transform:uppercase;color:#E8C97A}',
    'html.sp-open,html.sp-open body{overflow:hidden!important}',
    /* the floating button on the companion pages */
    '.sp-fab{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:9980;display:flex;align-items:center;gap:7px;cursor:pointer;',
    'font:700 10px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:#1E0A05;',
    'background:linear-gradient(180deg,#EBC873,#B98A2C);border:1px solid #C9A84C;border-radius:22px;padding:10px 14px;',
    'box-shadow:0 6px 20px rgba(0,0,0,.55);opacity:0;transform:translateY(12px);pointer-events:none;transition:opacity .3s,transform .3s,bottom .25s}',
    '.sp-fab.on{opacity:1;transform:none;pointer-events:auto}',
    '.sp-fab span{font-size:13px;letter-spacing:0}',
    /* the weekly invitation */
    '.sp-inv{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:9995;width:min(540px,calc(100% - 24px));box-sizing:border-box;',
    'transform:translate(-50%,24px);opacity:0;transition:opacity .35s,transform .35s;display:flex;gap:14px;align-items:center;padding:14px 14px 14px 16px;',
    'background:linear-gradient(172deg,#2B0A11,#1A060A);border:1px solid rgba(201,168,76,.55);border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.7);color:#F0E6CC}',
    '.sp-inv.on{opacity:1;transform:translate(-50%,0)}',
    '.sp-inv img{width:40px;height:40px;border-radius:10px;flex:none}',
    '.sp-inv p{flex:1;margin:0;font:400 15px/1.4 "EB Garamond",Georgia,serif;color:#E2D4B2}',
    '.sp-inv p b{color:#E8C97A;font-weight:600}',
    '.sp-inv .sp-btn{padding:10px 13px;font-size:10px;white-space:nowrap}',
    '.sp-inv .sp-no{background:none;border:none;color:#9E8D6A;font-size:18px;cursor:pointer;padding:4px 6px;line-height:1}',
    '@media (max-width:900px),(max-height:500px){.sp-inv{top:calc(10px + env(safe-area-inset-top,0px));bottom:auto;transform:translate(-50%,-24px);padding:10px 10px 10px 12px;gap:10px}',
    '.sp-inv.on{transform:translate(-50%,0)}.sp-inv img{width:32px;height:32px}.sp-inv p{font-size:14px}.sp-inv .sp-btn{padding:9px 11px}}',
    '@media (max-width:760px){.sp-tiers{grid-template-columns:1fr}.sp-how{grid-template-columns:1fr}}',
    '@media (max-width:640px){.sp-ov{padding:0;align-items:stretch}.sp-sheet,.sp-sheet.mid{width:100%;max-height:none;height:100%;border-radius:0;border:none}',
    '.sp-body{padding:16px 16px calc(24px + env(safe-area-inset-bottom,0px))}.sp-t{font-size:16px}.sp-lead{font-size:16px}',
    '.sp-sheet.mid .sp-body{display:flex;flex-direction:column;justify-content:center}.sp-sheet.mid .sp-shop{padding-bottom:8vh}}',
    /* phone held sideways: tiers side by side again, tighter */
    '@media (max-height:500px) and (min-width:480px){.sp-ov{padding:0;align-items:stretch}.sp-sheet,.sp-sheet.mid{width:100%;max-height:none;height:100%;border-radius:0;border:none}',
    '.sp-tiers{grid-template-columns:repeat(3,1fr);gap:10px}.sp-tier{padding:14px 12px 12px}.sp-price{font-size:24px;margin:6px 0 8px}.sp-perks li{font-size:14px}',
    '.sp-head{padding:9px 14px}.sp-logo{width:34px;height:34px}.sp-body{padding:12px 16px 18px}.sp-how{grid-template-columns:1fr 1fr}',
    '.sp-shop{padding:0}.sp-shop-k{margin:10px 0 8px}.sp-shop ul{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:none}.sp-shop li{margin:0;font-size:14.5px;padding:9px 10px 9px 30px}.sp-shop li::before{left:11px}}',
    '@media (prefers-reduced-motion:reduce){.sp-ov,.sp-sheet,.sp-fab,.sp-inv{transition:none}}'
  ].join('');

  function addCSS() {
    if (document.getElementById('sp-css')) return;
    var s = document.createElement('style'); s.id = 'sp-css'; s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  /* ── the two panels ───────────────────────────────────────────────────── */
  var panels = {}, cur = null, lastFocus = null, pushed = false, hideT = {};
  function ovOf(kind) { return panels[kind] || null; }
  function isOpen() { return !!cur && !!panels[cur] && panels[cur].classList.contains('on'); }

  function tierHtml(t) {
    return '<div class="sp-tier' + (t.pick ? ' pick' : '') + '">' +
      (t.pick ? '<span class="sp-flag">Recommended</span>' : '') +
      '<div class="sp-name">' + esc(t.name) + '</div>' +
      '<div class="sp-price">' + esc(t.price) + ' <small>a month</small></div>' +
      '<ul class="sp-perks">' + t.perks.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
      '<a class="sp-btn' + (t.pick ? '' : ' ghost') + '" href="' + JOIN + '" target="_blank" rel="noopener" data-sp-tier="' + t.id + '">Join as ' + esc(t.name) + ' &rsaquo;</a>' +
      '</div>';
  }

  function shell(kind, kicker, title, mid) {
    var ov = document.createElement('div');
    ov.className = 'sp-ov';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-labelledby', 'spTitle-' + kind);
    ov.setAttribute('data-sp-panel', kind);
    ov.hidden = true;
    ov.innerHTML =
      '<div class="sp-sheet' + (mid ? ' mid' : '') + '">' +
        '<div class="sp-head"><img class="sp-logo" src="app/icon-96.png" alt="">' +
          '<div class="sp-ht"><div class="sp-k">' + kicker + '</div><div class="sp-t" id="spTitle-' + kind + '">' + title + '</div></div>' +
          '<button type="button" class="sp-x" aria-label="Close">&#x2715;</button></div>' +
        '<div class="sp-body"></div>' +
      '</div>';
    ov.querySelector('.sp-x').addEventListener('click', function () { close(); });
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    document.body.appendChild(ov);
    return ov;
  }

  function buildSupport() {
    var ov = shell('support', 'Keep it free · Patreon', 'Help me run The Chronicles', false);
    var founders = SUPPORTERS.length
      ? '<p>' + SUPPORTERS.map(esc).join(' · ') + '</p>'
      : '<p>The first 20 Readers will be thanked here by name.</p>';
    ov.querySelector('.sp-body').innerHTML =
      '<p class="sp-lead">The Chronicles is free to read and <b>will stay free</b>: no advertising, no paywall, no entry ever locked. I write and build it myself, and every entry is sourced. If it has been useful to you, a membership helps me keep it running and growing.</p>' +
      '<p class="sp-pays">Your membership pays for the domain and hosting, new regions and chapters, and the research time behind every source.</p>' +
      '<div class="sp-tiers">' + TIERS.map(tierHtml).join('') + '</div>' +
      '<div class="sp-how">' +
        '<div><b>Any country, your currency</b><span>' + currencyLine() + '</span></div>' +
        '<div><b>How you pay</b><span>Visa, Mastercard or PayPal, through Patreon’s secure checkout. Cancel at any time; one month counts just the same.</span></div>' +
        '<div><b>Paying from Pakistan</b><span>Most debit cards need <i>international online payments</i> switched on in your banking app first.' +
          (LOCAL_EMAIL ? ' For a local way to pay, write to <a class="sp-a" href="mailto:' + esc(LOCAL_EMAIL) + '?subject=Helping%20run%20The%20Chronicles">' + esc(LOCAL_EMAIL) + '</a>.' : '') + '</span></div>' +
        '<div><b>Free, or as a gift</b><span><a class="sp-a" href="' + BASE + '" target="_blank" rel="noopener" data-sp-free>Join free on Patreon</a> to follow new chapters, or gift a membership to someone who would enjoy it.</span></div>' +
      '</div>' +
      '<div class="sp-founders"><div class="sp-k">Founding supporters</div>' + founders + '</div>' +
      '<div class="sp-share"><p>Cannot support right now? <b>Sharing The Chronicles helps just as much.</b></p>' +
        '<button type="button" class="sp-btn ghost" data-sp-share>Share the site</button></div>';

    ov.querySelectorAll('[data-sp-tier]').forEach(function (a) {
      a.addEventListener('click', function () {
        set(K_JOIN, String(Date.now()));
        track('support_tier_click', { tier: a.getAttribute('data-sp-tier') });
      });
    });
    var fr = ov.querySelector('[data-sp-free]');
    if (fr) fr.addEventListener('click', function () { track('support_free_click'); });
    var sh = ov.querySelector('[data-sp-share]');
    sh.addEventListener('click', function () {
      var data = { title: 'The Chronicles', text: 'The Chronicles — an interactive, sourced history of the world, free to read.', url: SITE };
      track('support_share');
      if (navigator.share) { navigator.share(data).catch(function () {}); return; }
      var done = function () { sh.textContent = 'Link copied'; setTimeout(function () { sh.textContent = 'Share the site'; }, 2200); };
      try { navigator.clipboard.writeText(SITE).then(done, function () { prompt('Copy this link:', SITE); }); }
      catch (e) { prompt('Copy this link:', SITE); }
    });
    return ov;
  }

  function buildShop() {
    var ov = shell('shop', 'Coming soon', 'The Chronicles Shop', true);
    ov.querySelector('.sp-body').innerHTML =
      '<div class="sp-shop">' +
        '<div class="sp-shop-h">Shop at The Chronicles: coming soon</div>' +
        '<div class="sp-shop-k">What the hype will be about</div>' +
        '<ul>' +
          '<li>The Chronicles global talk sessions (online and in person)</li>' +
          '<li>The Chronicles bookmarks</li>' +
          '<li>The Chronicles exclusive memberships</li>' +
        '</ul>' +
        '<p class="sp-shop-end"><b>Stay tuned</b>It’s coming sooner than you expect.</p>' +
      '</div>';
    return ov;
  }

  function focusables(ov) {
    return Array.prototype.slice.call(ov.querySelectorAll('a[href],button:not([disabled])'))
      .filter(function (el) { return el.offsetParent !== null; });
  }
  function onKey(e) {
    if (!isOpen()) return;
    var ov = panels[cur];
    // Keys belong to the open panel: nothing behind it (the opening screen,
    // the timeline's own keys) may act on them. Their default actions, such
    // as following a focused link, scrolling or pressing a button, still happen.
    e.stopImmediatePropagation();
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') {
      var f = focusables(ov); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!ov.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  }

  function hideNow(kind) {
    var ov = panels[kind]; if (!ov) return;
    ov.classList.remove('on');
    clearTimeout(hideT[kind]);
    hideT[kind] = setTimeout(function () { ov.hidden = true; }, 280);
  }

  function open(kind, source) {
    kind = kind === 'shop' ? 'shop' : 'support';
    if (!panels[kind]) { addCSS(); panels[kind] = kind === 'shop' ? buildShop() : buildSupport(); }
    if (isOpen() && cur === kind) return;
    var switching = isOpen();
    if (switching) hideNow(cur);                // one panel at a time; keeps the same back step
    else lastFocus = document.activeElement;
    var ov = panels[kind];
    clearTimeout(hideT[kind]);
    hideInvite(true);
    cur = kind;
    ov.hidden = false;
    document.documentElement.classList.add('sp-open');
    // The phone's back gesture closes the panel instead of leaving the page.
    if (!switching) { try { history.pushState({ chxSupport: 1 }, ''); pushed = true; } catch (e) { pushed = false; } }
    requestAnimationFrame(function () { ov.classList.add('on'); });
    setTimeout(function () { var x = ov.querySelector('.sp-x'); if (x) x.focus({ preventScroll: true }); }, 60);
    track(kind === 'shop' ? 'shop_open' : 'support_open', { source: source || 'button' });
  }
  function close(fromPop) {
    if (!isOpen()) return;
    hideNow(cur);
    cur = null;
    document.documentElement.classList.remove('sp-open');
    if (pushed && !fromPop) { pushed = false; try { history.back(); } catch (e) {} }
    pushed = false;
    var back = (lastFocus && lastFocus.focus && lastFocus.offsetParent !== null) ? lastFocus
      : document.querySelector('#mBg.open #mX') || null;
    if (back) { try { back.focus({ preventScroll: true }); } catch (e) {} }
  }
  window.addEventListener('popstate', function () { if (isOpen()) close(true); });
  document.addEventListener('keydown', onKey, true);

  /* ── buttons on the page ──────────────────────────────────────────────── */
  function wire(el, kind, source) {
    if (el.getAttribute('data-sp-wired')) return;
    el.setAttribute('data-sp-wired', '1');
    el.addEventListener('click', function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;   // new tab / window: let the browser do it
      e.preventDefault(); open(kind, source);
    });
  }
  function placeButtons() {
    addCSS();
    // The header cells on the timeline (markup in index.html), and anything
    // else marked data-chx-support or data-chx-shop.
    document.querySelectorAll('[data-chx-support]').forEach(function (el) { wire(el, 'support', el.classList.contains('hc') ? 'header-cell' : 'link'); });
    document.querySelectorAll('[data-chx-shop]').forEach(function (el) { wire(el, 'shop', el.classList.contains('hc') ? 'header-cell' : 'link'); });

    // Every page: "Help me run The Chronicles" at the start of the footer's links.
    document.querySelectorAll('.chx-legal-links').forEach(function (s) {
      if (s.querySelector('.sp-foot')) return;
      var a = document.createElement('a');
      a.href = '?support'; a.className = 'sp-foot'; a.textContent = 'Help me run The Chronicles';
      s.insertBefore(a, s.firstChild);
      s.insertBefore(document.createTextNode(' · '), a);
      wire(a, 'support', 'footer');
    });

    // Companion pages: a small floating button once the reader is into the text.
    if (!isIndex) {
      var fab = document.createElement('button');
      fab.type = 'button'; fab.className = 'sp-fab';
      fab.setAttribute('aria-label', 'Help me run The Chronicles');
      fab.innerHTML = '<span aria-hidden="true">&#9829;</span>Help me run The Chronicles';
      document.body.appendChild(fab);
      wire(fab, 'support', 'floating');
      var shown = false;
      // Each companion page keeps its own controls in that corner (back to
      // top, the chapter dock...). Find whatever is fixed there and sit above it.
      var place = function () {
        var w = window.innerWidth, h = window.innerHeight, top = h;
        var xs = [w - 18, w - 40, w - 70, w - 110, w - 150], ys = [h - 18, h - 45, h - 75, h - 110];
        var seen = [];
        xs.forEach(function (x) { ys.forEach(function (y) {
          var list = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [];
          for (var i = 0; i < list.length; i++) {
            var el = list[i];
            if (el === fab || fab.contains(el) || el === document.body || el === document.documentElement) continue;
            if (inv && inv.contains(el)) continue;
            for (var a = el; a && a !== document.body; a = a.parentElement) {
              if (getComputedStyle(a).position !== 'fixed') continue;
              if (seen.indexOf(a) >= 0) break;
              seen.push(a);
              var r = a.getBoundingClientRect();
              if (r.height > 0 && r.height < h * 0.45 && r.width < w * 0.6 && r.bottom > h - 160) top = Math.min(top, r.top);
              break;
            }
          }
        }); });
        var gap = top < h ? Math.round(h - top + 10) : 14;
        fab.style.bottom = 'calc(' + gap + 'px + env(safe-area-inset-bottom,0px))';
      };
      var check = function () {
        var on = (window.scrollY || document.documentElement.scrollTop || 0) > Math.min(700, window.innerHeight * 0.8);
        if (on !== shown) { shown = on; if (on) place(); fab.classList.toggle('on', on); }
      };
      // Corner controls often fade in after scrolling stops: measure again then.
      var settle = null;
      window.addEventListener('scroll', function () {
        check();
        clearTimeout(settle);
        settle = setTimeout(function () { if (shown) place(); setTimeout(function () { if (shown) place(); }, 700); }, 450);
      }, { passive: true });
      window.addEventListener('resize', function () { if (shown) place(); check(); });
      check();
    }
  }

  /* ── the weekly invitation ────────────────────────────────────────────── */
  var inv = null, invited = false;
  function canInvite() {
    if (invited) return false;                                         // once per visit, even where storage is blocked
    var joined = +get(K_JOIN) || 0;
    if (joined && Date.now() - joined < 60 * 864e5) return false;     // went to Patreon recently: leave them be
    var last = +get(K_INV) || 0;
    if (last && Date.now() - last < WEEK) return false;                // at most once a week
    if (/\.translate\.goog$/.test(location.hostname)) return false;
    return true;
  }
  // Never on top of another panel, an open entry, Ask Rayyan, the install
  // invitation or the cookie banner: wait for it to go.
  function busy() {
    if (isOpen() || document.documentElement.classList.contains('sp-open')) return true;
    if (document.querySelector('.chx-toast.on, .chx-toast.show, .hx-ov.on, .chl-ov.on, #mBg.open, #arPanel.open')) return true;
    var cc = document.querySelector('.chx-cc');
    return !!(cc && cc.offsetParent !== null);
  }
  var tries = 0;
  function showInvite() {
    if (inv || !canInvite()) return;
    if (busy()) { if (++tries <= 6) setTimeout(showInvite, 8000); return; }
    invited = true;
    set(K_INV, String(Date.now()));
    addCSS();
    inv = document.createElement('div');
    inv.className = 'sp-inv';
    inv.setAttribute('role', 'status');
    inv.innerHTML = '<img src="app/icon-96.png" alt="">' +
      '<p>Enjoying The Chronicles? It is free, with no ads. <b>Help me run it</b> from $3.99 a month.</p>' +
      '<button type="button" class="sp-btn">Help</button>' +
      '<button type="button" class="sp-no" aria-label="Not now">&#x2715;</button>';
    document.body.appendChild(inv);
    inv.querySelector('.sp-btn').addEventListener('click', function () { open('support', 'invitation'); });
    inv.querySelector('.sp-no').addEventListener('click', function () { hideInvite(); });
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (inv) inv.classList.add('on'); }); });
    setTimeout(function () { hideInvite(); }, 20000);
    track('support_invite_shown');
  }
  function hideInvite(now) {
    if (!inv) return;
    var el = inv; inv = null;
    el.classList.remove('on');
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, now ? 0 : 400);
  }
  function watchReading() {
    if (isIndex) {
      // Three entries opened on the timeline, and the invitation waits until
      // the third one is closed again.
      var mBg = document.getElementById('mBg');
      if (!mBg || !window.MutationObserver) return;
      var opened = 0, wasOpen = false;
      new MutationObserver(function () {
        var isOpenNow = mBg.classList.contains('open');
        if (isOpenNow && !wasOpen) opened++;
        if (!isOpenNow && wasOpen && opened >= 3) setTimeout(showInvite, 900);
        wasOpen = isOpenNow;
      }).observe(mBg, { attributes: true, attributeFilter: ['class'] });
    } else {
      // Companion pages: three minutes of visible reading, a third of the way in.
      var seen = 0, t = setInterval(function () {
        if (document.visibilityState === 'visible') seen += 5;
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var depth = h > 0 ? (window.scrollY || 0) / h : 0;
        if (seen >= 180 && depth > 0.33) { clearInterval(t); showInvite(); }
      }, 5000);
    }
  }

  /* ── start ────────────────────────────────────────────────────────────── */
  function start() {
    placeButtons();
    watchReading();
    // thechronicles.live/?support (or #support) opens the Help panel, and
    // ?shop (or #shop) the Shop panel. The word is then taken out of the
    // address, so a reload or a copied link does not reopen it.
    var q = location.search || '', h = location.hash || '', kind = null;
    if (/[?&]support\b/.test(q) || h === '#support') kind = 'support';
    else if (/[?&]shop\b/.test(q) || h === '#shop') kind = 'shop';
    if (kind) {
      setTimeout(function () { open(kind, 'direct-link'); }, 700);
      try {
        var u = new URL(location.href);
        u.searchParams.delete('support'); u.searchParams.delete('shop');
        if (u.hash === '#support' || u.hash === '#shop') u.hash = '';
        history.replaceState(history.state, '', u.pathname + u.search + u.hash);
      } catch (e) {}
    }
  }
  window.ChroniclesSupport = {
    open: function (source) { open('support', source); },
    openShop: function (source) { open('shop', source); },
    close: function () { close(); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
