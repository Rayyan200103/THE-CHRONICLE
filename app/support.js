/* ═══════════════════════════════════════════════════════════════════════
   THE CHRONICLES — Help me run The Chronicles (Patreon, Gumroad) · The Chronicles Shop

   THE ONLY LINES YOU EVER EDIT ARE IN "SETTINGS" BELOW:
     PATREON     the Patreon page address, exactly as Patreon shows it
     GUMROAD     the Gumroad "give once" page, and the amounts offered on it
     SUPPORTERS  names of supporters who agreed to be listed (oldest first)
     LOCAL_EMAIL the Chronicles email: enquiries, and screenshots of direct transfers
     LOCAL_PAY   the NayaPay account (encoded), its QR code and the rupee prices
   The tier prices and benefits under TIERS must always say exactly what the
   Patreon page says.

   What this file does, on every page that loads it:
     · opens the two header cells on the timeline, "Help me run The
       Chronicles" and "The Chronicles Shop" (their markup is in index.html);
     · adds "Help me run The Chronicles" to every footer, and a small
       floating button on the companion pages once the reader scrolls in;
     · the Help panel: why the site is free, then a bar that stays at the top
       while the panel scrolls, with three ways to help, each a section below:
         1 · Monthly   the three Patreon tiers, paying from any country, free
                       and gift options, and what to do if a payment fails;
         2 · Once      any amount through Gumroad, as often as a reader likes;
         3 · Pakistan  any amount in rupees by NayaPay QR or account transfer,
                       and the rupee memberships;
       then the Founding Supporters, the email for collaborations, and Share;
     · the Shop panel: "coming soon";
     · one gentle invitation, at most once a week, only to readers who have
       clearly been reading, and never over anything else on the screen;
     · thechronicles.live/?support opens the Help panel and ?shop the Shop
       panel: use those links in posts, messages and emails.
   No cookies. Two small notes are kept on the reader's own device (when the
   invitation was last shown, and whether they opened Patreon or Gumroad), so the
   invitation is not repeated. Nothing is sent anywhere, except a Google
   Analytics event where the reader has allowed Analytics.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.ChroniclesSupport) return;

  /* ── SETTINGS ─────────────────────────────────────────────────────────── */
  var PATREON = 'https://www.patreon.com/TheChroniclesLive';
  // One-time gifts of any amount, as often as a reader likes. The minimum and
  // suggested amount are set on Gumroad; keep ONCE in step with that minimum.
  var GUMROAD = 'https://thechronicleslive.gumroad.com/l/give';
  var ONCE = [3, 5, 12, 25];      // US dollars; each opens Gumroad's checkout at that amount
  var ONCE_PICK = 5;              // the amount shown as suggested
  var SUPPORTERS = [];            // e.g. ['Ahmed K.', 'Sara M.'] — only with their permission
  var LOCAL_EMAIL = 'thechronicleslive@gmail.com';
  // Readers in Pakistan can pay directly in rupees. Set LOCAL_PAY to null to hide it.
  // The IBAN and account number are stored encoded, so bots that read the
  // page's code cannot collect them; they appear only when a reader taps
  // "Tap for payment details". To change them, paste this into a browser
  // console with the new values, and copy the result into "details":
  //   btoa(JSON.stringify({iban:'PK.. .... ....', account:'03.........'})).split('').reverse().join('')
  var LOCAL_PAY = {
    bank: 'NayaPay',
    name: 'Chaudhry Muhammad Rayyan Shahid',
    details: '==QfiYTMxcjN2UzMzMDMiojI05WdvN2YhJCLiYTMxcDI2YTNzAyMzATNgQzMyEDIBlVQOBCM2sEUiojIuFmYpJye',
    qr: 'app/pay-qr.png',                                            // the NayaPay QR, scannable by banking apps
    prices: { reader: '800', scholar: '1,200', patron: '1,500' }   // PKR a month
  };
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
  function payDetails() {
    try { return JSON.parse(atob(String(LOCAL_PAY.details || '').split('').reverse().join(''))); } catch (e) { return null; }
  }
  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function inPakistan() {
    try { if (/^Asia\/Karachi$/.test(Intl.DateTimeFormat().resolvedOptions().timeZone || '')) return true; } catch (e) {}
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) if (/[-_]PK\b/i.test(langs[i] || '')) return true;
    return false;
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
    '.sp-how.three{grid-template-columns:repeat(3,1fr)}',
    /* paying from Pakistan */
    '.sp-pk{position:relative;border:1px solid rgba(201,168,76,.5);border-radius:16px;padding:18px 20px 16px;margin:0 0 18px;background:linear-gradient(180deg,rgba(20,90,60,.16),rgba(0,0,0,.22));box-shadow:inset 0 1px 0 rgba(255,236,180,.06)}',
    '.sp-pk-h{font:700 18px/1.25 Cinzel,Georgia,serif;letter-spacing:.06em;color:#E8C97A;margin:3px 0 4px}',
    '.sp-pk p{margin:0 0 12px;font:400 15.5px/1.5 "EB Garamond",Georgia,serif;color:#DCCDAA}',
    '.sp-pk p b{color:#E8C97A;font-weight:600}',
    '.sp-acct{border:1px solid rgba(201,168,76,.32);border-radius:12px;background:rgba(0,0,0,.28);padding:12px 14px;margin:0 0 14px}',
    '.sp-acct-k{font:700 10px/1.3 "JetBrains Mono",monospace;letter-spacing:.2em;text-transform:uppercase;color:#7FD3A6;margin-bottom:8px}',
    '.sp-acct dl{margin:0;display:grid;gap:8px}',
    '.sp-acct dl > div{display:grid;grid-template-columns:200px 1fr;gap:4px 14px;align-items:center}',
    '.sp-acct dt{font:600 9.5px/1.35 "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#B89A5A}',
    '.sp-acct dd{margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;font:600 16px/1.35 "EB Garamond",Georgia,serif;color:#F5E3A8}',
    '.sp-acct dd .mono{font:600 14.5px/1.35 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.04em;color:#F5E3A8;word-break:normal;overflow-wrap:anywhere}',
    '.sp-copy{cursor:pointer;border:1px solid rgba(201,168,76,.5);background:rgba(0,0,0,.25);color:#E8C97A;border-radius:12px;padding:4px 10px;font:600 9.5px/1.2 "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase}',
    '.sp-copy:hover{background:rgba(201,168,76,.14)}.sp-copy.ok{border-color:#2EAA6E;color:#BFE8CF}',
    '.sp-copy:focus-visible{outline:2px solid #E8C97A;outline-offset:2px}',
    '.sp-pkr{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:0 0 12px}',
    '.sp-pkr div{border:1px solid rgba(201,168,76,.32);border-radius:12px;padding:10px 12px;background:rgba(0,0,0,.22);text-align:center}',
    '.sp-pkr div.pick{border-color:#C9A84C;background:rgba(201,168,76,.1)}',
    '.sp-pkr b{display:block;font:700 12px/1.3 Cinzel,Georgia,serif;letter-spacing:.12em;text-transform:uppercase;color:#E8C97A}',
    '.sp-pkr span{display:block;font:600 21px/1.2 "EB Garamond",Georgia,serif;color:#F5E3A8;margin-top:3px}',
    '.sp-pkr small{font:400 12px/1 "EB Garamond",Georgia,serif;color:#BFAE8A}',
    '.sp-pk p.sp-pk-note{font-size:14.5px;color:#CDBC97;margin-bottom:8px}',
    '.sp-pk p.sp-pk-note:last-child{margin-bottom:0}',
    /* section labels, and the one-time gift */
    '.sp-nav{position:sticky;top:-20px;z-index:4;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:4px -22px 20px;padding:10px 22px;',
    'background:linear-gradient(180deg,rgba(38,9,15,.98),rgba(31,7,12,.98));border-top:1px solid rgba(201,168,76,.2);border-bottom:1px solid rgba(201,168,76,.3);box-shadow:0 10px 18px -12px rgba(0,0,0,.8)}',
    '.sp-nav button{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:2px;min-width:0;min-height:48px;text-align:left;cursor:pointer;border:1px solid rgba(201,168,76,.32);background:rgba(0,0,0,.25);border-radius:12px;padding:8px 12px;color:#E8C97A;transition:background .2s,border-color .2s,box-shadow .2s;-webkit-tap-highlight-color:transparent}',
    '.sp-nav button:hover{border-color:rgba(232,201,122,.7);background:rgba(201,168,76,.1)}',
    '.sp-nav button[aria-current="true"]{border-color:#C9A84C;background:linear-gradient(180deg,rgba(201,168,76,.24),rgba(201,168,76,.08));box-shadow:0 0 0 1px rgba(201,168,76,.28)}',
    '.sp-nav button:focus-visible{outline:2px solid #E8C97A;outline-offset:2px}',
    '.sp-nav small{display:block;font:600 9px/1.2 "JetBrains Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:#B89A5A;white-space:nowrap}',
    '.sp-nav b{display:block;font:700 14px/1.2 Cinzel,Georgia,serif;letter-spacing:.06em;color:#E8C97A;white-space:nowrap}',
    '.sp-nav em{display:block;font:italic 400 13.5px/1.2 "EB Garamond",Georgia,serif;color:#CDBC97;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}',
    '.sp-nav .pkn small{color:#7FD3A6}',
    '.sp-sec{margin:0 0 14px}',
    '.sp-sec-t{display:block;font:700 18px/1.25 Cinzel,Georgia,serif;letter-spacing:.06em;color:#E8C97A;margin:3px 0 4px}',
    '.sp-sec p{margin:0;font:400 15.5px/1.5 "EB Garamond",Georgia,serif;color:#DCCDAA}',
    '.sp-part{margin:0 0 22px}',
    '.sp-any{display:flex;gap:14px;align-items:center;border:1px solid rgba(46,170,110,.55);background:rgba(20,90,60,.22);border-radius:12px;padding:12px 14px;margin:2px 0 14px}',
    '.sp-any > i{flex:none;font-style:normal;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(180deg,#EBC873,#B98A2C);color:#1E0A05;font:700 15px/1 Cinzel,Georgia,serif;box-shadow:0 3px 10px rgba(0,0,0,.4)}',
    '.sp-any b{display:block;font:700 16px/1.25 Cinzel,Georgia,serif;letter-spacing:.05em;color:#E8C97A;margin-bottom:2px}',
    '.sp-any span{display:block;font:400 15px/1.45 "EB Garamond",Georgia,serif;color:#DCCDAA}',
    '.sp-pk-sub{font:700 14px/1.3 Cinzel,Georgia,serif;letter-spacing:.06em;color:#E8C97A;margin:4px 0 4px}',
    '.sp-contact{border-top:1px solid rgba(201,168,76,.2);padding-top:14px;margin:0 0 16px;font:400 15px/1.5 "EB Garamond",Georgia,serif;color:#CDBC97}',
    '.sp-contact b{color:#E8C97A;font-weight:600}',
    '.sp-once{position:relative;border:1px solid rgba(201,168,76,.5);border-radius:16px;padding:18px 20px 16px;margin:0 0 18px;background:linear-gradient(180deg,rgba(201,168,76,.09),rgba(0,0,0,.22));box-shadow:inset 0 1px 0 rgba(255,236,180,.06)}',
    '.sp-once-h{font:700 18px/1.25 Cinzel,Georgia,serif;letter-spacing:.06em;color:#E8C97A;margin:3px 0 4px}',
    '.sp-once p{margin:0 0 14px;font:400 15.5px/1.5 "EB Garamond",Georgia,serif;color:#DCCDAA}',
    '.sp-amts{display:grid;grid-template-columns:minmax(0,1.5fr) repeat(4,minmax(0,1fr));gap:10px;margin:0 0 12px}',
    '.sp-amt{display:flex;align-items:center;justify-content:center;min-height:48px;padding:8px 6px;box-sizing:border-box;border-radius:12px;border:1px solid rgba(201,168,76,.45);background:rgba(0,0,0,.25);color:#F5E3A8;text-decoration:none;font:600 21px/1 "EB Garamond",Georgia,serif;transition:transform .15s,background .15s,border-color .15s;-webkit-tap-highlight-color:transparent}',
    '.sp-amt{position:relative}.sp-amt-flag{position:absolute;top:-8px;left:50%;transform:translateX(-50%);font:600 8.5px/1 "JetBrains Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#1E0A05;background:linear-gradient(180deg,#F3D78E,#C99A3A);border:1px solid #1E0A05;border-radius:9px;padding:3px 7px;white-space:nowrap}',
    '.sp-amt:hover{transform:translateY(-1px);border-color:#E8C97A;background:rgba(201,168,76,.14)}',
    '.sp-amt.pick{border-color:#C9A84C;background:linear-gradient(180deg,#EBC873,#B98A2C);color:#1E0A05;box-shadow:0 4px 16px rgba(0,0,0,.4)}',
    '.sp-amt.any{font:700 10.5px/1.2 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#E8C97A}',
    '.sp-amt:focus-visible{outline:2px solid #E8C97A;outline-offset:2px}',
    '.sp-once p.sp-once-note{margin:0;font-size:14.5px;color:#BFAE8A}',
    '.sp-help{display:flex;gap:12px;align-items:flex-start;border:1px solid rgba(201,168,76,.3);border-radius:12px;padding:12px 14px;margin:-4px 0 18px;background:rgba(0,0,0,.2);font:400 14.5px/1.5 "EB Garamond",Georgia,serif;color:#CDBC97}',
    '.sp-help b{color:#E8C97A;font-weight:600}',
    '.sp-help i{flex:none;font-style:normal;width:22px;height:22px;border-radius:50%;border:1px solid rgba(201,168,76,.55);color:#E8C97A;display:flex;align-items:center;justify-content:center;font:700 12px/1 Georgia,serif;margin-top:1px}',
    '.sp-ways{display:grid;grid-template-columns:minmax(0,230px) minmax(0,1fr);gap:14px;margin:0 0 14px;align-items:start}',
    '.sp-steps{list-style:none;counter-reset:st;margin:0 0 12px;padding:0}',
    '.sp-steps li{counter-increment:st;position:relative;padding:0 0 0 30px;margin:0 0 8px;font:400 14.5px/1.45 "EB Garamond",Georgia,serif;color:#CDBC97}',
    '.sp-steps li::before{content:counter(st);position:absolute;left:0;top:1px;width:20px;height:20px;border-radius:50%;border:1px solid rgba(127,211,166,.6);color:#BFE8CF;font:700 11px/20px "JetBrains Mono",monospace;text-align:center}',
    '.sp-steps b{color:#E8C97A;font-weight:600}',
    '.sp-way{border:1px solid rgba(201,168,76,.32);border-radius:12px;background:rgba(0,0,0,.28);padding:12px 14px}',
    '.sp-way-k{font:700 10px/1.3 "JetBrains Mono",monospace;letter-spacing:.18em;text-transform:uppercase;color:#7FD3A6;margin-bottom:8px}',
    '.sp-way p{font-size:14.5px;line-height:1.45;color:#CDBC97;margin:0 0 8px}',
    '.sp-qr{display:block;width:100%;max-width:200px;margin:0 auto 8px;background:#fff;border-radius:12px;padding:10px;box-sizing:border-box;box-shadow:0 0 0 1px rgba(201,168,76,.4)}',
    '.sp-qr img{display:block;width:100%;height:auto;image-rendering:pixelated}',
    '.sp-qr-n{text-align:center;font:600 14.5px/1.3 "EB Garamond",Georgia,serif;color:#F5E3A8;margin:0 0 2px}',
    '.sp-qr-b{text-align:center;font:600 9.5px/1.3 "JetBrains Mono",monospace;letter-spacing:.16em;text-transform:uppercase;color:#B89A5A;margin:0 0 10px}',
    '.sp-save{display:flex;justify-content:center;margin:6px 0 0}',
    '.sp-save a{text-decoration:none}',
    '.sp-reveal{width:100%;margin:2px 0 10px}',
    '.sp-reveal[aria-expanded="true"]{background:rgba(0,0,0,.22);color:#E8C97A;border-color:rgba(201,168,76,.5);box-shadow:none}',
    '.sp-way .sp-acct{margin:0 0 6px}',
    '.sp-way .sp-acct dl > div{grid-template-columns:1fr;gap:2px}',
    '.sp-issue{margin:0 0 12px;padding:10px 14px;border-radius:12px;border:1px dashed rgba(201,168,76,.45);font:400 15px/1.45 "EB Garamond",Georgia,serif;color:#DCCDAA}',
    '.sp-issue b{color:#E8C97A;font-weight:600}',
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
    /* the floating language globe on the companion pages would sit on the panel's close button */
    'html.sp-open .chl-at-float{visibility:hidden!important}',
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
    '@media (max-width:760px){.sp-ways{grid-template-columns:1fr}.sp-tiers{grid-template-columns:1fr}.sp-how,.sp-how.three{grid-template-columns:1fr}.sp-acct dl > div{grid-template-columns:1fr;gap:2px}.sp-pk{padding:16px 14px 14px}}',
    '@media (max-width:560px){.sp-amts{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.sp-amt.any{grid-column:1/-1}.sp-once{padding:16px 14px 14px}',
    '.sp-nav{gap:6px}.sp-nav button{align-items:center;text-align:center;padding:7px 4px;min-height:50px}.sp-nav em{display:none}.sp-nav b{font-size:13px;letter-spacing:.03em}.sp-nav small{font-size:8.5px;letter-spacing:.1em}.sp-any{padding:11px 12px;gap:12px}.sp-any > i{width:40px;height:40px;font-size:13px}}',
    '@media (max-width:340px){.sp-nav b{font-size:12px;letter-spacing:0}.sp-nav small{letter-spacing:.04em}}',
    '@media (max-width:420px){.sp-pkr{gap:6px}.sp-pkr div{padding:8px 4px}.sp-pkr b{font-size:10.5px;letter-spacing:.06em}.sp-pkr span{font-size:18px}}',
    '@media (max-width:420px){.sp-acct dd .mono{font-size:13.5px;letter-spacing:.02em}}',
    '@media (max-width:360px){.sp-pkr span{font-size:15.5px}.sp-acct dd .mono{font-size:12.5px}}',
    '@media (max-width:640px){.sp-ov{padding:0;align-items:stretch}.sp-sheet,.sp-sheet.mid{width:100%;max-height:none;height:100%;border-radius:0;border:none}',
    '.sp-body{padding:16px 16px calc(24px + env(safe-area-inset-bottom,0px))}.sp-nav{top:-16px;margin:2px -16px 18px;padding:8px 16px}.sp-t{font-size:16px}.sp-lead{font-size:16px}',
    '.sp-sheet.mid .sp-body{display:flex;flex-direction:column;justify-content:center}.sp-sheet.mid .sp-shop{padding-bottom:8vh}}',
    /* phone held sideways: tiers side by side again, tighter */
    '@media (max-height:500px) and (min-width:480px){.sp-ov{padding:0;align-items:stretch}.sp-sheet,.sp-sheet.mid{width:100%;max-height:none;height:100%;border-radius:0;border:none}',
    '.sp-tiers{grid-template-columns:repeat(3,1fr);gap:10px}.sp-tier{padding:14px 12px 12px}.sp-price{font-size:24px;margin:6px 0 8px}.sp-perks li{font-size:14px}',
    '.sp-head{padding:9px 14px}.sp-logo{width:34px;height:34px}.sp-body{padding:12px 16px 18px}.sp-how,.sp-how.three{grid-template-columns:repeat(3,1fr)}',
    '.sp-acct dl > div{grid-template-columns:190px 1fr}.sp-amts{grid-template-columns:minmax(0,1.5fr) repeat(4,minmax(0,1fr))}.sp-amt.any{grid-column:auto}.sp-amt{min-height:42px}',
    '.sp-nav{top:-12px;margin:2px -16px 14px;padding:6px 16px}.sp-nav button{min-height:40px;padding:5px 10px;flex-direction:row;align-items:baseline;gap:8px}.sp-nav em{display:none}.sp-nav b{font-size:13px}',
    '.sp-shop{padding:0}.sp-shop-k{margin:10px 0 8px}.sp-shop ul{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:none}.sp-shop li{margin:0;font-size:14.5px;padding:9px 10px 9px 30px}.sp-shop li::before{left:11px}}',
    /* the timeline on a phone held sideways is laid out 1280 wide and shown shrunk (see zoomFix): scale the
       buttons by that factor, --spk, so they stay about 46px tall on the phone's screen */
    '.sp-zoom .sp-amt{min-height:calc(46px * var(--spk,1));font-size:calc(17px * var(--spk,1))}.sp-zoom .sp-amt.any{font-size:calc(9.5px * var(--spk,1))}.sp-zoom .sp-amt-flag{font-size:calc(7px * var(--spk,1));top:calc(-8px * var(--spk,1))}',
    '.sp-zoom .sp-nav button{min-height:calc(46px * var(--spk,1));flex-direction:column;align-items:center;text-align:center}.sp-zoom .sp-nav b{font-size:calc(11.5px * var(--spk,1))}.sp-zoom .sp-nav small{font-size:calc(7.5px * var(--spk,1))}.sp-zoom .sp-nav em{display:none}',
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

  function onceHtml() {
    var amt = function (n) {
      var pick = n === ONCE_PICK;
      return '<a class="sp-amt' + (pick ? ' pick' : '') + '" href="' + GUMROAD + '?wanted=true&amp;price=' + n + '" target="_blank" rel="noopener" data-sp-once="' + n + '" aria-label="Give $' + n + ' once' + (pick ? ' (suggested)' : '') + '">' +
        (pick ? '<span class="sp-amt-flag" aria-hidden="true">Suggested</span>' : '') + '$' + n + '</a>';
    };
    return '<section class="sp-once" id="spOnce" aria-labelledby="spOnceH">' +
      '<div class="sp-k">2 \u00B7 Once \u00B7 Gumroad \u00B7 no account needed</div>' +
      '<div class="sp-once-h" id="spOnceH" role="heading" aria-level="3">Prefer to give once?</div>' +
      '<p>Give any amount from $' + ONCE[0] + ', as often as you like. Every gift goes into hosting and the research behind new entries.</p>' +
      '<div class="sp-amts" role="group" aria-label="Choose an amount to give once">' +
        '<a class="sp-amt any" href="' + GUMROAD + '" target="_blank" rel="noopener" data-sp-once="any" aria-label="Give any amount once">Any amount</a>' +
        ONCE.map(amt).join('') + '</div>' +
      '<p class="sp-once-note">Secure checkout on Gumroad, by card or PayPal. It opens in a new tab.</p>' +
    '</section>';
  }
  function mail(subject) {
    return '<a class="sp-a" href="mailto:' + esc(LOCAL_EMAIL) + '?subject=' + encodeURIComponent(subject) + '">' + esc(LOCAL_EMAIL) + '</a>';
  }
  function pakistanHtml() {
    var L = LOCAL_PAY, P = L.prices || {};
    return '<section class="sp-pk" id="spPk" aria-labelledby="spPkH">' +
      '<div class="sp-k">' + (GUMROAD ? 3 : 2) + ' \u00B7 In Pakistan \u00B7 ' + esc(L.bank) + '</div>' +
      '<div class="sp-pk-h" id="spPkH" role="heading" aria-level="3">Paying from Pakistan?</div>' +
      '<p>No need to go to Patreon: send rupees straight to my ' + esc(L.bank) + ' account.</p>' +
      '<div class="sp-any"><i aria-hidden="true">Rs</i><div><b>Any amount, once or every month</b>' +
        '<span>You choose the amount yourself, in your own banking or wallet app. Use whichever way below is easier.</span></div></div>' +
      '<div class="sp-ways">' +
        (L.qr ? '<div class="sp-way sp-way-qr"><div class="sp-way-k">A \u00B7 Scan the QR code</div>' +
          '<div class="sp-qr"><img src="' + esc(L.qr) + '" width="200" height="200" alt="' + esc(L.bank) + ' QR code for ' + esc(L.name) + '" loading="lazy"></div>' +
          '<div class="sp-qr-n" translate="no">' + esc(L.name) + '</div><div class="sp-qr-b">' + esc(L.bank) + '</div>' +
          '<p>Open your banking or wallet app, choose <b>Scan QR</b>, and enter the amount.</p>' +
          '<p>On this phone? Save the QR, then choose <b>scan from gallery</b> in your app.</p>' +
          '<div class="sp-save"><a class="sp-btn ghost" href="' + esc(L.qr) + '" download="The-Chronicles-' + esc(L.bank) + '-QR.png" data-sp-save>Save QR</a></div>' +
        '</div>' : '') +
        '<div class="sp-way sp-way-bank"><div class="sp-way-k">' + (L.qr ? 'B \u00B7 ' : '') + 'Transfer by account</div>' +
          '<p>Send from any bank or wallet app to this ' + esc(L.bank) + ' account:</p>' +
          '<ol class="sp-steps"><li>Tap below to see the account details.</li>' +
            '<li>Tap <b>Copy</b> beside the IBAN.</li>' +
            '<li>In your banking or wallet app, choose <b>send money</b> or <b>bank transfer</b>, paste the IBAN, and enter the amount.</li></ol>' +
          '<button type="button" class="sp-btn sp-reveal" aria-expanded="false" aria-controls="spPayD" data-sp-reveal>Tap for payment details</button>' +
          '<div id="spPayD" hidden aria-live="polite"></div>' +
        '</div>' +
      '</div>' +
      '<div class="sp-pk-sub" role="heading" aria-level="4">Prefer a membership in rupees?</div>' +
      '<p>Transfer the amount for a tier each month, and you will be added under it with its benefits:</p>' +
      '<div class="sp-pkr">' +
        '<div><b>Reader</b><span>' + esc(P.reader) + ' PKR</span><small>a month</small></div>' +
        '<div class="pick"><b>Scholar</b><span>' + esc(P.scholar) + ' PKR</span><small>a month</small></div>' +
        '<div><b>Patron</b><span>' + esc(P.patron) + ' PKR</span><small>a month</small></div>' +
      '</div>' +
      '<p class="sp-pk-note">The benefits of each tier are on the Patreon cards above. After you transfer, email a screenshot with your name and the tier you chose to ' + mail('Membership by transfer') + ', so you can be added.</p>' +
      '<p class="sp-issue"><b>Any issues during payment?</b> Email ' + mail('Issue with a payment') + '.</p>' +
    '</section>';
  }
  // Built only when the reader asks for it, from the encoded settings.
  function payDetailsHtml() {
    var L = LOCAL_PAY, D = payDetails();
    if (!D) return '<p>Payment details could not be shown here. Please email ' + mail('Payment details') + '.</p>';
    var raw = function (v) { return String(v).replace(/\s+/g, ''); };
    var row = function (k, v, copy) {
      return '<div><dt>' + k + '</dt><dd><span class="' + (copy ? 'mono' : '') + '" translate="no">' + esc(v) + '</span>' +
        (copy ? '<button type="button" class="sp-copy" data-sp-copy="' + esc(raw(v)) + '" aria-label="Copy ' + k + '">Copy</button>' : '') + '</dd></div>';
    };
    return '<div class="sp-acct"><div class="sp-acct-k">' + esc(L.bank) + ' account</div><dl>' +
      row('Name', L.name, false) +
      (D.iban ? row(esc(L.bank) + ' IBAN', D.iban, true) : '') +
      (D.account ? row('Account number for direct transfers', D.account, true) : '') +
      '</dl></div>';
  }


  function buildSupport() {
    var ov = shell('support', 'Keep it free \u00B7 Monthly or once', 'Help me run The Chronicles', false);
    var founders = SUPPORTERS.length
      ? '<p>' + SUPPORTERS.map(esc).join(' · ') + '</p>'
      : '<p>The first 20 Readers will be thanked here by name, and so will anyone who gives once and writes to ' + mail('Please thank me by name') + ' asking to be named.</p>';
    ov.querySelector('.sp-body').innerHTML =
      '<p class="sp-lead">The Chronicles is free to read and <b>will stay free</b>: no advertising, no paywall, no entry ever locked. I write and build it myself, and every entry is sourced. If it has been useful to you, a membership or a one-time gift helps me keep it running and growing.</p>' +
      '<p class="sp-pays">Your support pays for the domain and hosting, new regions and chapters, and the research time behind every source.</p>' +
      '<nav class="sp-nav" aria-label="Ways to help">' +
        '<button type="button" data-sp-goto="spMonthly" aria-current="true"><small>1 \u00B7 Monthly</small><b>Patreon</b><em>from $3.99 a month</em></button>' +
        (GUMROAD ? '<button type="button" data-sp-goto="spOnce"><small>2 \u00B7 Once</small><b>Any amount</b><em>from $' + ONCE[0] + ' on Gumroad</em></button>' : '') +
        (LOCAL_PAY ? '<button type="button" class="pkn" data-sp-goto="spPk"><small>' + (GUMROAD ? 3 : 2) + ' \u00B7 Pakistan</small><b>Rupees</b><em>any amount, ' + esc(LOCAL_PAY.bank) + '</em></button>' : '') +
      '</nav>' +
      '<section class="sp-part" id="spMonthly" aria-labelledby="spMonH">' +
      '<div class="sp-sec"><div class="sp-k">1 \u00B7 Every month \u00B7 Patreon</div><div class="sp-sec-t" id="spMonH" role="heading" aria-level="3">Become a member</div>' +
        '<p>Three tiers, from $3.99 a month, payable from any country.</p></div>' +
      '<div class="sp-tiers">' + TIERS.map(tierHtml).join('') + '</div>' +
      '<div class="sp-how' + (LOCAL_PAY ? ' three' : '') + '">' +
        '<div><b>Any country, your currency</b><span>' + currencyLine() + '</span></div>' +
        '<div><b>How you pay</b><span>Visa, Mastercard or PayPal, through Patreon\u2019s secure checkout. Cancel at any time; one month counts just the same.</span></div>' +
        (LOCAL_PAY ? '' : '<div><b>Paying from Pakistan</b><span>Most debit cards need <i>international online payments</i> switched on in your banking app first.' +
          (LOCAL_EMAIL ? ' For a local way to pay, write to ' + mail('Helping run The Chronicles') + '.' : '') + '</span></div>') +
        '<div><b>Free, or as a gift</b><span><a class="sp-a" href="' + BASE + '" target="_blank" rel="noopener" data-sp-free>Join free on Patreon</a> to follow new chapters, or gift a membership to someone who would enjoy it.</span></div>' +
      '</div>' +
      '<div class="sp-help" role="note"><i aria-hidden="true">i</i><span><b>Patreon is the most convenient option.</b> If you are having trouble with a payment, write to ' + mail('Trouble paying through Patreon') + ' and the office will send you bank details in your own country, for a safer and simpler transfer.</span></div>' +
      '</section>' +
      (GUMROAD ? onceHtml() : '') +
      (LOCAL_PAY ? pakistanHtml() : '') +
      '<div class="sp-founders"><div class="sp-k">Founding supporters</div>' + founders + '</div>' +
      '<p class="sp-contact"><b>Business collaborations, feedback and exclusive sessions:</b> please write to ' + mail('The Chronicles: collaboration') + '.</p>' +
      '<div class="sp-share"><p>Cannot support right now? <b>Sharing The Chronicles helps just as much.</b></p>' +
        '<button type="button" class="sp-btn ghost" data-sp-share>Share the site</button></div>';

    ov.querySelectorAll('[data-sp-tier]').forEach(function (a) {
      a.addEventListener('click', function () {
        set(K_JOIN, String(Date.now()));
        track('support_tier_click', { tier: a.getAttribute('data-sp-tier') });
      });
    });
    var wireCopy = function (scope) { scope.querySelectorAll('[data-sp-copy]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-sp-copy'), label = b.textContent;
        var done = function () { b.textContent = 'Copied \u2713'; b.classList.add('ok'); setTimeout(function () { b.textContent = label; b.classList.remove('ok'); }, 2000); };
        var fallback = function () {   // select the shown text so it can be copied by hand
          try { var r = document.createRange(); r.selectNodeContents(b.previousElementSibling); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); } catch (e) {}
        };
        try { navigator.clipboard.writeText(v).then(done, fallback); } catch (e) { fallback(); }
        track('support_pk_copy', { field: b.getAttribute('aria-label') });
      });
    }); };
    var rv = ov.querySelector('[data-sp-reveal]'), pd = ov.querySelector('#spPayD');
    if (rv && pd) rv.addEventListener('click', function () {
      var openNow = rv.getAttribute('aria-expanded') !== 'true';
      if (openNow && !pd.firstChild) { pd.innerHTML = payDetailsHtml(); wireCopy(pd); }
      pd.hidden = !openNow;
      rv.setAttribute('aria-expanded', openNow ? 'true' : 'false');
      rv.textContent = openNow ? 'Hide payment details' : 'Tap for payment details';
      if (openNow) track('support_pk_reveal');
    });
    var sv = ov.querySelector('[data-sp-save]');
    if (sv) sv.addEventListener('click', function () { track('support_pk_save_qr'); });
    var body = ov.querySelector('.sp-body'), nav = ov.querySelector('.sp-nav');
    var navBtns = nav ? [].slice.call(nav.querySelectorAll('[data-sp-goto]')) : [];
    var navGap = function () { return nav ? nav.getBoundingClientRect().height + 12 : 12; };
    var lock = 0;
    var mark = function (id) { navBtns.forEach(function (b) { b.setAttribute('aria-current', b.getAttribute('data-sp-goto') === id ? 'true' : 'false'); }); };
    var spy = function () {
      if (!navBtns.length || Date.now() < lock) return;
      var top = body.getBoundingClientRect().top + navGap() + 24, cur = navBtns[0].getAttribute('data-sp-goto');
      navBtns.forEach(function (b) { var sec = ov.querySelector('#' + b.getAttribute('data-sp-goto')); if (sec && sec.getBoundingClientRect().top <= top) cur = b.getAttribute('data-sp-goto'); });
      if (body.scrollTop + body.clientHeight >= body.scrollHeight - 4) { var last = navBtns[navBtns.length - 1].getAttribute('data-sp-goto'), ls = ov.querySelector('#' + last); if (ls && ls.getBoundingClientRect().top < body.getBoundingClientRect().bottom - 60) cur = last; }
      mark(cur);
    };
    var spyT = null;
    body.addEventListener('scroll', function () {
      if (lock && Date.now() < lock) lock = Math.max(lock, Date.now() + 140);   // a slow smooth scroll keeps its target lit
      if (spyT) return; spyT = requestAnimationFrame(function () { spyT = null; spy(); });
    }, { passive: true });
    body.addEventListener('scrollend', function () { if (lock) { lock = 0; spy(); } });
    // keyboard focus is never left hidden under the bar
    var pad = function () { body.style.scrollPaddingTop = navGap() + 'px'; };
    ov._spPad = pad;
    window.addEventListener('resize', pad);
    body.addEventListener('focusin', function (e) {
      if (!nav || nav.contains(e.target)) return;
      var r = e.target.getBoundingClientRect(), nb = nav.getBoundingClientRect().bottom;
      if (r.top < nb + 4) body.scrollTop -= (nb + 12 - r.top);
    });
    window.addEventListener('resize', function () { zoomFix(ov); });
    ov._spReset = function () { try { body.scrollTo({ top: 0, behavior: 'instant' }); } catch (e) {} body.scrollTop = 0; lock = 0; mark(navBtns.length ? navBtns[0].getAttribute('data-sp-goto') : ''); };
    navBtns.forEach(function (jp) {
      jp.addEventListener('click', function () {
        var id = jp.getAttribute('data-sp-goto'), t = ov.querySelector('#' + id);
        if (t && body) {
          var y = body.scrollTop + t.getBoundingClientRect().top - body.getBoundingClientRect().top - navGap();
          mark(id); lock = Date.now() + (reduced() ? 50 : 900);
          body.scrollTo({ top: Math.max(0, y), behavior: reduced() ? 'auto' : 'smooth' });
        }
        track(id === 'spPk' ? 'support_pk_jump' : id === 'spOnce' ? 'support_once_jump' : 'support_monthly_jump');
      });
    });
    ov.querySelectorAll('[data-sp-once]').forEach(function (a) {
      a.addEventListener('click', function () {
        set(K_JOIN, String(Date.now()));
        track('support_once_click', { amount: a.getAttribute('data-sp-once') });
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
          '<li>Exclusive tickets for The Chronicles global talk sessions (online and in person)</li>' +
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

  // A phone held sideways shows the timeline's 1280-wide layout shrunk to fit; mark the panel so its buttons scale up.
  function zoomFix(ov) {
    var sw = Math.max(screen.width || 0, screen.height || 0), sh = Math.min(screen.width || 0, screen.height || 0);
    var k = sw ? innerWidth / sw : 1, on = sh > 0 && sh <= 500 && innerWidth >= 1000 && k > 1.15;
    ov.classList.toggle('sp-zoom', on);
    if (on) ov.style.setProperty('--spk', Math.min(2.4, k).toFixed(3)); else ov.style.removeProperty('--spk');
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
    if (!switching && ov._spReset) ov._spReset();
    zoomFix(ov);
    document.documentElement.classList.add('sp-open');
    // The phone's back gesture closes the panel instead of leaving the page.
    if (!switching) { try { history.pushState({ chxSupport: 1 }, ''); pushed = true; } catch (e) { pushed = false; } }
    requestAnimationFrame(function () { ov.classList.add('on'); if (ov._spPad) ov._spPad(); });
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
    if (joined && Date.now() - joined < 60 * 864e5) return false;     // went to Patreon or Gumroad recently: leave them be
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
      '<p>Enjoying The Chronicles? It is free, with no ads. <b>Help me run it</b>, once or monthly, from $3.</p>' +
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
