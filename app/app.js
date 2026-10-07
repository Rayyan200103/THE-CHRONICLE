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
   6. The Engagement Tracker — counts every opening of every page, in the
      browser and in the installed app, anonymously
   7. Opens the two header panels (The Chronicles App, the Engagement Tracker)
   The language globe in every header is app/lang.js.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // The site root is the folder above this script (thechronicles.live/).
  var here = document.currentScript && document.currentScript.src;
  var ROOT = here ? new URL('../', here) : new URL('./', location.href);
  var ROOT_PATH = ROOT.pathname;
  var PAGE = location.pathname.split('/').pop() || 'index.html';
  var IS_MAIN = PAGE === '' || PAGE === 'index.html';
  // Inside Google Translate's full-page view (chosen from the language globe,
  // app/lang.js) the page is served from translate.goog: the reader is
  // reading, not installing, so the worker, update notices and install
  // invitations stay with the real site.
  var PROXY = /\.translate\.goog$/i.test(location.hostname);

  var standalone = false;
  try {
    standalone = window.matchMedia('(display-mode: standalone)').matches ||
                 window.matchMedia('(display-mode: fullscreen)').matches ||
                 window.navigator.standalone === true;
  } catch (e) {}
  if (standalone) {
    document.documentElement.classList.add('is-app');
    document.addEventListener('DOMContentLoaded', function () {
      var l = document.querySelectorAll('.hc-app .hc-s .hc-l'), sh = document.querySelectorAll('.hc-app .hc-s .hc-sh');
      for (var i = 0; i < l.length; i++) l[i].textContent = 'You’re in the app ✓';
      for (var j = 0; j < sh.length; j++) sh[j].textContent = 'In app ✓';
    });
  }

  var ua = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function sstore(k, v) {
    try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; }
  }

  /* ── 1 · service worker ─────────────────────────────────────────────── */
  var swReg = null;
  if (!PROXY && 'serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
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
    'background:linear-gradient(160deg,#2A0B0F 0%,#1A0609 100%);border:1px solid rgba(201,168,76,.55);' +
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
    // On phones the bottom-right corner carries Ask Rayyan and the compass above it,
    // so the toast rises clear of both.
    '@media (max-width:768px){.chx-toast{bottom:calc(128px + env(safe-area-inset-bottom,0px))}}' +
    '@media (min-width:769px){.chx-toast{bottom:24px;left:24px;transform:translate(0,16px)}.chx-toast.on{transform:translate(0,0)}}' +
    '@media (max-height:500px) and (min-width:480px){.chx-toast{bottom:calc(12px + env(safe-area-inset-bottom,0px))}}' +
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
    if (PROXY || updateShown || !/^https?:$/.test(location.protocol) || !navigator.onLine || isNaN(shown)) return;
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
  var installListeners = [];
  function installChanged() { installListeners.forEach(function (f) { try { f(); } catch (e) {} }); }

  function recentlyDismissed() {
    var t = parseInt(store(DISMISS_KEY) || '0', 10);
    return t && (Date.now() - t) < DISMISS_DAYS * 864e5;
  }
  function dismiss() { store(DISMISS_KEY, String(Date.now())); hideToast(); }

  var SHARE_ICON = '<svg class="chx-share" viewBox="0 0 13 15" aria-hidden="true"><path d="M6.5 1v8.6M3.6 3.8 6.5 1l2.9 2.8" fill="none" stroke="#F0D98E" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.4 6H2.2v7.8h8.6V6H8.6" fill="none" stroke="#F0D98E" stroke-width="1.3" stroke-linejoin="round"/></svg>';

  // The browser's own install dialog, where the browser offers one (Chrome,
  // Edge, Samsung Internet). Resolves 'accepted', 'dismissed' or 'unavailable'.
  function promptInstall() {
    var p = deferredPrompt;
    if (!p) return Promise.resolve('unavailable');
    deferredPrompt = null;
    installChanged();
    try {
      p.prompt();
      return p.userChoice.then(function (c) {
        var o = (c && c.outcome) || 'dismissed';
        if (o === 'dismissed') store(DISMISS_KEY, String(Date.now()));
        return o;
      }).catch(function () { return 'dismissed'; });
    } catch (e) { return Promise.resolve('unavailable'); }
  }

  function invite() {
    if (PROXY || standalone || updateShown || recentlyDismissed() || store('chronicles-installed')) return;
    if (document.documentElement.classList.contains('chx-hub-open')) return;
    if (deferredPrompt) {
      toast({
        title: 'INSTALL THE CHRONICLES',
        text: 'Add it to your home screen — opens full-screen, reads offline, and updates itself.',
        buttons: [
          { label: 'Install', action: function () { hideToast(); promptInstall(); } },
          { label: 'Not now', ghost: true, action: dismiss }
        ]
      });
    } else if (isIOS) {
      toast({
        title: 'INSTALL ON YOUR iPHONE',
        text: 'In Safari tap <b>•••</b> then <b>Share</b> (on older iPhones, the ' + SHARE_ICON + ' button), then <b>Add to Home Screen</b>.',
        buttons: [
          { label: 'Show me', action: function () { store(DISMISS_KEY, String(Date.now())); hideToast(); if (window.ChroniclesHub) window.ChroniclesHub.open('app'); } },
          { label: 'Got it', ghost: true, action: dismiss }
        ]
      });
    }
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();                  // hold it until the reader is in the timeline
    deferredPrompt = e;
    installChanged();
  });
  window.addEventListener('appinstalled', function () {
    store('chronicles-installed', '1');
    deferredPrompt = null;
    hideToast();
    installChanged();
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

  /* ── 6 · the Engagement Tracker ─────────────────────────────────────────
     Every opening of every page — website or installed app, anywhere in the
     world, however often the same reader returns — adds one to the shared
     tally. One small anonymous write per opening: the time bucket (hour, day,
     week, month, year, all-time), the country, the page, how the reader
     arrived, the device class and whether it was the app. No cookies, no
     identifiers, no IP address is ever stored.

     The tally lives in the site owner's own Firebase Realtime Database (free
     Spark plan). Until its address is pasted into app/tracker-config.js the
     tracker is off and its header cell stays hidden.
     ─────────────────────────────────────────────────────────────────────── */
  var TZ = {"Africa":{"Abidjan":"CI","Accra":"GH","Addis_Ababa":"ET","Algiers":"DZ","Asmara":"ER","Asmera":"ER","Bamako":"ML","Bangui":"CF","Banjul":"GM","Bissau":"GW","Blantyre":"MW","Brazzaville":"CG","Bujumbura":"BI","Cairo":"EG","Casablanca":"MA","Ceuta":"ES","Conakry":"GN","Dakar":"SN","Dar_es_Salaam":"TZ","Djibouti":"DJ","Douala":"CM","El_Aaiun":"EH","Freetown":"SL","Gaborone":"BW","Harare":"ZW","Johannesburg":"ZA","Juba":"SS","Kampala":"UG","Khartoum":"SD","Kigali":"RW","Kinshasa":"CD","Lagos":"NG","Libreville":"GA","Lome":"TG","Luanda":"AO","Lubumbashi":"CD","Lusaka":"ZM","Malabo":"GQ","Maputo":"MZ","Maseru":"LS","Mbabane":"SZ","Mogadishu":"SO","Monrovia":"LR","Nairobi":"KE","Ndjamena":"TD","Niamey":"NE","Nouakchott":"MR","Ouagadougou":"BF","Porto-Novo":"BJ","Sao_Tome":"ST","Timbuktu":"ML","Tripoli":"LY","Tunis":"TN","Windhoek":"NA"},"America":{"Adak":"US","Anchorage":"US","Anguilla":"AI","Antigua":"AG","Araguaina":"BR","Argentina/Buenos_Aires":"AR","Argentina/Catamarca":"AR","Argentina/ComodRivadavia":"AR","Argentina/Cordoba":"AR","Argentina/Jujuy":"AR","Argentina/La_Rioja":"AR","Argentina/Mendoza":"AR","Argentina/Rio_Gallegos":"AR","Argentina/Salta":"AR","Argentina/San_Juan":"AR","Argentina/San_Luis":"AR","Argentina/Tucuman":"AR","Argentina/Ushuaia":"AR","Aruba":"AW","Asuncion":"PY","Atikokan":"CA","Atka":"US","Bahia":"BR","Bahia_Banderas":"MX","Barbados":"BB","Belem":"BR","Belize":"BZ","Blanc-Sablon":"CA","Boa_Vista":"BR","Bogota":"CO","Boise":"US","Buenos_Aires":"AR","Cambridge_Bay":"CA","Campo_Grande":"BR","Cancun":"MX","Caracas":"VE","Catamarca":"AR","Cayenne":"GF","Cayman":"KY","Chicago":"US","Chihuahua":"MX","Ciudad_Juarez":"MX","Coral_Harbour":"CA","Cordoba":"AR","Costa_Rica":"CR","Coyhaique":"CL","Creston":"CA","Cuiaba":"BR","Curacao":"CW","Danmarkshavn":"GL","Dawson":"CA","Dawson_Creek":"CA","Denver":"US","Detroit":"US","Dominica":"DM","Edmonton":"CA","Eirunepe":"BR","El_Salvador":"SV","Ensenada":"MX","Fort_Nelson":"CA","Fort_Wayne":"US","Fortaleza":"BR","Glace_Bay":"CA","Godthab":"GL","Goose_Bay":"CA","Grand_Turk":"TC","Grenada":"GD","Guadeloupe":"GP","Guatemala":"GT","Guayaquil":"EC","Guyana":"GY","Halifax":"CA","Havana":"CU","Hermosillo":"MX","Indiana/Indianapolis":"US","Indiana/Knox":"US","Indiana/Marengo":"US","Indiana/Petersburg":"US","Indiana/Tell_City":"US","Indiana/Vevay":"US","Indiana/Vincennes":"US","Indiana/Winamac":"US","Indianapolis":"US","Inuvik":"CA","Iqaluit":"CA","Jamaica":"JM","Jujuy":"AR","Juneau":"US","Kentucky/Louisville":"US","Kentucky/Monticello":"US","Knox_IN":"US","Kralendijk":"BQ","La_Paz":"BO","Lima":"PE","Los_Angeles":"US","Louisville":"US","Lower_Princes":"SX","Maceio":"BR","Managua":"NI","Manaus":"BR","Marigot":"MF","Martinique":"MQ","Matamoros":"MX","Mazatlan":"MX","Mendoza":"AR","Menominee":"US","Merida":"MX","Metlakatla":"US","Mexico_City":"MX","Miquelon":"PM","Moncton":"CA","Monterrey":"MX","Montevideo":"UY","Montreal":"CA","Montserrat":"MS","Nassau":"BS","New_York":"US","Nipigon":"CA","Nome":"US","Noronha":"BR","North_Dakota/Beulah":"US","North_Dakota/Center":"US","North_Dakota/New_Salem":"US","Nuuk":"GL","Ojinaga":"MX","Panama":"PA","Pangnirtung":"CA","Paramaribo":"SR","Phoenix":"US","Port-au-Prince":"HT","Port_of_Spain":"TT","Porto_Acre":"BR","Porto_Velho":"BR","Puerto_Rico":"PR","Punta_Arenas":"CL","Rainy_River":"CA","Rankin_Inlet":"CA","Recife":"BR","Regina":"CA","Resolute":"CA","Rio_Branco":"BR","Rosario":"AR","Santa_Isabel":"MX","Santarem":"BR","Santiago":"CL","Santo_Domingo":"DO","Sao_Paulo":"BR","Scoresbysund":"GL","Shiprock":"US","Sitka":"US","St_Barthelemy":"BL","St_Johns":"CA","St_Kitts":"KN","St_Lucia":"LC","St_Thomas":"VI","St_Vincent":"VC","Swift_Current":"CA","Tegucigalpa":"HN","Thule":"GL","Thunder_Bay":"CA","Tijuana":"MX","Toronto":"CA","Tortola":"VG","Vancouver":"CA","Virgin":"VI","Whitehorse":"CA","Winnipeg":"CA","Yakutat":"US","Yellowknife":"CA"},"Antarctica":{"Casey":"AQ","Davis":"AQ","DumontDUrville":"AQ","Macquarie":"AU","Mawson":"AQ","McMurdo":"AQ","Palmer":"AQ","Rothera":"AQ","South_Pole":"AQ","Syowa":"AQ","Troll":"AQ","Vostok":"AQ"},"Arctic":{"Longyearbyen":"SJ"},"Asia":{"Aden":"YE","Almaty":"KZ","Amman":"JO","Anadyr":"RU","Aqtau":"KZ","Aqtobe":"KZ","Ashgabat":"TM","Ashkhabad":"TM","Atyrau":"KZ","Baghdad":"IQ","Bahrain":"BH","Baku":"AZ","Bangkok":"TH","Barnaul":"RU","Beirut":"LB","Bishkek":"KG","Brunei":"BN","Calcutta":"IN","Chita":"RU","Choibalsan":"MN","Chongqing":"CN","Chungking":"CN","Colombo":"LK","Dacca":"BD","Damascus":"SY","Dhaka":"BD","Dili":"TL","Dubai":"AE","Dushanbe":"TJ","Famagusta":"CY","Gaza":"PS","Harbin":"CN","Hebron":"PS","Ho_Chi_Minh":"VN","Hong_Kong":"HK","Hovd":"MN","Irkutsk":"RU","Istanbul":"TR","Jakarta":"ID","Jayapura":"ID","Jerusalem":"IL","Kabul":"AF","Kamchatka":"RU","Karachi":"PK","Kashgar":"CN","Kathmandu":"NP","Katmandu":"NP","Khandyga":"RU","Kolkata":"IN","Krasnoyarsk":"RU","Kuala_Lumpur":"MY","Kuching":"MY","Kuwait":"KW","Macao":"MO","Macau":"MO","Magadan":"RU","Makassar":"ID","Manila":"PH","Muscat":"OM","Nicosia":"CY","Novokuznetsk":"RU","Novosibirsk":"RU","Omsk":"RU","Oral":"KZ","Phnom_Penh":"KH","Pontianak":"ID","Pyongyang":"KP","Qatar":"QA","Qostanay":"KZ","Qyzylorda":"KZ","Rangoon":"MM","Riyadh":"SA","Saigon":"VN","Sakhalin":"RU","Samarkand":"UZ","Seoul":"KR","Shanghai":"CN","Singapore":"SG","Srednekolymsk":"RU","Taipei":"TW","Tashkent":"UZ","Tbilisi":"GE","Tehran":"IR","Tel_Aviv":"IL","Thimbu":"BT","Thimphu":"BT","Tokyo":"JP","Tomsk":"RU","Ujung_Pandang":"ID","Ulaanbaatar":"MN","Ulan_Bator":"MN","Urumqi":"CN","Ust-Nera":"RU","Vientiane":"LA","Vladivostok":"RU","Yakutsk":"RU","Yangon":"MM","Yekaterinburg":"RU","Yerevan":"AM"},"Atlantic":{"Azores":"PT","Bermuda":"BM","Canary":"ES","Cape_Verde":"CV","Faeroe":"FO","Faroe":"FO","Jan_Mayen":"NO","Madeira":"PT","Reykjavik":"IS","South_Georgia":"GS","St_Helena":"SH","Stanley":"FK"},"Australia":{"ACT":"AU","Adelaide":"AU","Brisbane":"AU","Broken_Hill":"AU","Canberra":"AU","Currie":"AU","Darwin":"AU","Eucla":"AU","Hobart":"AU","LHI":"AU","Lindeman":"AU","Lord_Howe":"AU","Melbourne":"AU","NSW":"AU","North":"AU","Perth":"AU","Queensland":"AU","South":"AU","Sydney":"AU","Tasmania":"AU","Victoria":"AU","West":"AU","Yancowinna":"AU"},"Europe":{"Amsterdam":"NL","Andorra":"AD","Astrakhan":"RU","Athens":"GR","Belfast":"GB","Belgrade":"RS","Berlin":"DE","Bratislava":"SK","Brussels":"BE","Bucharest":"RO","Budapest":"HU","Busingen":"DE","Chisinau":"MD","Copenhagen":"DK","Dublin":"IE","Gibraltar":"GI","Guernsey":"GG","Helsinki":"FI","Isle_of_Man":"IM","Istanbul":"TR","Jersey":"JE","Kaliningrad":"RU","Kiev":"UA","Kirov":"RU","Kyiv":"UA","Lisbon":"PT","Ljubljana":"SI","London":"GB","Luxembourg":"LU","Madrid":"ES","Malta":"MT","Mariehamn":"AX","Minsk":"BY","Monaco":"MC","Moscow":"RU","Nicosia":"CY","Oslo":"NO","Paris":"FR","Podgorica":"ME","Prague":"CZ","Riga":"LV","Rome":"IT","Samara":"RU","San_Marino":"SM","Sarajevo":"BA","Saratov":"RU","Simferopol":"UA","Skopje":"MK","Sofia":"BG","Stockholm":"SE","Tallinn":"EE","Tirane":"AL","Tiraspol":"MD","Ulyanovsk":"RU","Uzhgorod":"UA","Vaduz":"LI","Vatican":"VA","Vienna":"AT","Vilnius":"LT","Volgograd":"RU","Warsaw":"PL","Zagreb":"HR","Zaporozhye":"UA","Zurich":"CH"},"Indian":{"Antananarivo":"MG","Chagos":"IO","Christmas":"CX","Cocos":"CC","Comoro":"KM","Kerguelen":"TF","Mahe":"SC","Maldives":"MV","Mauritius":"MU","Mayotte":"YT","Reunion":"RE"},"Pacific":{"Apia":"WS","Auckland":"NZ","Bougainville":"PG","Chatham":"NZ","Chuuk":"FM","Easter":"CL","Efate":"VU","Enderbury":"KI","Fakaofo":"TK","Fiji":"FJ","Funafuti":"TV","Galapagos":"EC","Gambier":"PF","Guadalcanal":"SB","Guam":"GU","Honolulu":"US","Johnston":"US","Kanton":"KI","Kiritimati":"KI","Kosrae":"FM","Kwajalein":"MH","Majuro":"MH","Marquesas":"PF","Midway":"UM","Nauru":"NR","Niue":"NU","Norfolk":"NF","Noumea":"NC","Pago_Pago":"AS","Palau":"PW","Pitcairn":"PN","Pohnpei":"FM","Ponape":"FM","Port_Moresby":"PG","Rarotonga":"CK","Saipan":"MP","Samoa":"AS","Tahiti":"PF","Tarawa":"KI","Tongatapu":"TO","Truk":"FM","Wake":"UM","Wallis":"WF","Yap":"FM"}};
  var NOT_COUNTRIES = { EU: 1, AP: 1, A1: 1, A2: 1, O1: 1, XX: 1, T1: 1, ZZ: 1 };
  // Crawlers and link-preview fetchers are not readers. Named individually: a
  // bare "bot" would also catch real phones (the Cubot brand, for one).
  var BOT = /googlebot|bingbot|duckduckbot|baiduspider|yandex(bot|images|mobilebot)|sogou|exabot|facebot|facebookexternalhit|ia_archiver|applebot|petalbot|semrushbot|ahrefsbot|mj12bot|dotbot|bytespider|gptbot|claudebot|ccbot|amazonbot|twitterbot|linkedinbot|slackbot|discordbot|telegrambot|skypeuripreview|pinterestbot|redditbot|embedly|quora link preview|outbrain|vkshare|w3c_validator|lighthouse|pagespeed|headlesschrome|phantomjs|google-inspectiontool|bingpreview|[a-z]bot\/|crawler|spider|slurp/i;

  var trk = {
    booted: false, configured: false, base: null, cfg: null, baseline: null,
    visit: null, lastTotal: null, error: null,
    listeners: []
  };
  function emit(ev, data) { trk.listeners.forEach(function (l) { if (l.ev === ev) { try { l.fn(data); } catch (e) {} } }); }

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function keysFor(t) {
    var d = new Date(t);
    var y = d.getUTCFullYear(), mo = pad(d.getUTCMonth() + 1), da = pad(d.getUTCDate()), h = pad(d.getUTCHours());
    return { hour: '' + y + mo + da + h, day: '' + y + mo + da, week: isoWeek(d), month: '' + y + mo, year: '' + y };
  }
  // ISO-8601 week, in UTC: weeks run Monday–Sunday; week 1 holds the first Thursday.
  function isoWeek(date) {
    var d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    var day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    var y = d.getUTCFullYear();
    var w = Math.ceil(((d - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7);
    return y + 'W' + pad(w);
  }

  function pageKey() {
    var p = PAGE.toLowerCase();
    if (p === '' || p === 'index.html') return 'timeline';
    if (p === 'before_adam.html') return 'before_adam';
    if (p === 'karbala.html') return 'karbala';
    if (p === 'comparative_religion.html') return 'comparative_religion';
    if (p === 'aboutme.html') return 'about';
    return null;
  }

  function sourceKey() {
    try {
      var qs = new URLSearchParams(location.search);
      var utm = (qs.get('utm_source') || qs.get('ref') || '').toLowerCase();
      if (utm) return classify(utm);
    } catch (e) {}
    var r = document.referrer || '';
    if (!r) {
      // In-app browsers often strip the referrer but name themselves.
      if (/Instagram/.test(ua)) return 'instagram';
      if (/FBAN|FBAV|FB_IAB/.test(ua)) return 'facebook';
      if (/LinkedInApp/.test(ua)) return 'linkedin';
      if (/musical_ly|BytedanceWebview|TikTok/i.test(ua)) return 'tiktok';
      if (/Snapchat/i.test(ua)) return 'other';
      return 'direct';
    }
    var host = '';
    try { var ru = new URL(r); host = ru.hostname.toLowerCase(); if (ru.origin === location.origin) return 'internal'; } catch (e) { return 'other'; }
    // The site's own addresses count as moving within the site: the official
    // domain, its www form, Google's translated view of it, the Netlify address
    // and the old GitHub Pages address (which forwards readers here).
    if (/^(www\.)?thechronicles\.live$|^thechronicles-live\.translate\.goog$|^thechronicleslive\.netlify\.app$|^rayyan200103\.github\.io$/.test(host)) return 'internal';
    return classify(host);
  }
  function classify(h) {
    if (/(^|\.)google\./.test(h) || h === 'google') return /gemini/.test(h) ? 'ai' : 'google';
    if (/(^|\.)bing\.com$|^bing$/.test(h)) return 'bing';
    if (/duckduckgo|yahoo\.|yandex\.|baidu\.|ecosia|brave\.com|startpage|qwant|naver\./.test(h)) return 'search';
    if (/(^|\.)(facebook\.com|fb\.com|fb\.me|messenger\.com)$|^facebook$|^fb$/.test(h)) return 'facebook';
    if (/(^|\.)instagram\.com$|^instagram$|^ig$/.test(h)) return 'instagram';
    if (/whatsapp|(^|\.)wa\.me$/.test(h)) return 'whatsapp';
    if (/(^|\.)(t\.co|twitter\.com|x\.com)$|^twitter$|^x$/.test(h)) return 'x';
    if (/(^|\.)(linkedin\.com|lnkd\.in)$|^linkedin$/.test(h)) return 'linkedin';
    if (/(^|\.)(youtube\.com|youtu\.be)$|^youtube$/.test(h)) return 'youtube';
    if (/(^|\.)tiktok\.com$|^tiktok$/.test(h)) return 'tiktok';
    if (/(^|\.)reddit\.com$|^reddit$/.test(h)) return 'reddit';
    if (/(^|\.)(t\.me|telegram\.org|telegram\.me)$|^telegram$/.test(h)) return 'telegram';
    if (/(^|\.)github\.com$|^github$/.test(h)) return 'github';
    if (/chatgpt\.com|openai\.com|claude\.ai|perplexity\.ai|copilot\.microsoft|gemini\.google/.test(h)) return 'ai';
    return 'other';
  }

  function deviceKey() {
    if (/iPad|Tablet|PlayBook|Silk/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'tablet';
    if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return 'tablet';
    if (/Mobi|iPhone|iPod|Android|Windows Phone|IEMobile|Opera Mini/i.test(ua)) return 'phone';
    return 'desktop';
  }

  function tzCountry() {
    try {
      var z = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      var i = z.indexOf('/');
      if (i < 0 || !TZ) return null;
      var reg = TZ[z.slice(0, i)];
      return (reg && reg[z.slice(i + 1)]) || null;
    } catch (e) { return null; }
  }

  function timed(url, ms, asText) {
    var ctl = ('AbortController' in window) ? new AbortController() : null;
    var t = setTimeout(function () { if (ctl) ctl.abort(); }, ms);
    return fetch(url, { cache: 'no-store', credentials: 'omit', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { clearTimeout(t); if (!r.ok) throw new Error('http ' + r.status); return asText ? r.text() : r.json(); })
      .catch(function (e) { clearTimeout(t); throw e; });
  }

  // The country, from the connection (GeoJS, then country.is — both free and
  // keyless), falling back to the device's time zone. Kept for the session so a
  // reader moving between pages is looked up once.
  function detectCountry(cb) {
    var cached = sstore('chx-cc');
    if (cached && /^[A-Z]{2}$/.test(cached)) return cb(cached, sstore('chx-cc-how') || 'cache');
    var done = false;
    function fin(cc, how) {
      if (done) return; done = true;
      cc = String(cc || '').trim().toUpperCase();
      if (!/^[A-Z]{2}$/.test(cc) || NOT_COUNTRIES[cc]) { cc = tzCountry() || 'ZZ'; how = cc === 'ZZ' ? 'unknown' : 'timezone'; }
      if (how !== 'unknown') { sstore('chx-cc', cc); sstore('chx-cc-how', how); }
      cb(cc, how);
    }
    var guard = setTimeout(function () { fin(null); }, 2600);
    if (!navigator.onLine) { clearTimeout(guard); return fin(null); }
    timed('https://get.geojs.io/v1/ip/country', 1500, true)
      .then(function (t) { if (!/^\s*[A-Za-z]{2}\s*$/.test(t)) throw 0; clearTimeout(guard); fin(t, 'connection'); })
      .catch(function () {
        return timed('https://api.country.is/', 1000, false)
          .then(function (j) { if (!j || !/^[A-Za-z]{2}$/.test(j.country || '')) throw 0; clearTimeout(guard); fin(j.country, 'connection'); });
      })
      .catch(function () { clearTimeout(guard); fin(null); });
  }

  function dbBase(cfg) {
    var u = String((cfg && cfg.databaseURL) || '').trim().replace(/\/+$/, '');
    return /^https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*\.(firebaseio\.com|firebasedatabase\.app)$/i.test(u) ? u : null;
  }

  function incBody(v) {
    var one = function () { return { '.sv': { increment: 1 } }; };
    var k = keysFor(v.t);
    var b = {};
    b.total = one();
    b['h/' + k.hour] = one();
    b['d/' + k.day] = one();
    b['w/' + k.week] = one();
    b['m/' + k.month] = one();
    b['y/' + k.year] = one();
    b['c/' + v.cc] = one();
    b['dc/' + k.day + '/' + v.cc] = one();
    if (v.page) b['p/' + v.page] = one();
    b['s/' + v.src] = one();
    b['a/' + (v.app ? 'app' : 'web')] = one();
    b['v/' + v.dev] = one();
    return b;
  }

  function send(v, leaving) {
    return fetch(trk.base + '/v1.json?print=silent', {
      method: 'PATCH',
      body: JSON.stringify(incBody(v)),
      cache: 'no-store',
      credentials: 'omit',
      keepalive: !!leaving
    }).then(function (r) {
      if (r.ok) return 'ok';
      // 401/403: the database refused (rules not published yet) — retrying won't help.
      return (r.status === 401 || r.status === 403) ? 'refused' : 'retry';
    }, function () { return 'retry'; });
  }

  // Openings made offline (reading the installed app on a plane) are kept on the
  // device and counted, at the time they happened, once a connection returns.
  var QKEY = 'chx-trk-queue';
  function queueRead() { try { return JSON.parse(store(QKEY) || '[]') || []; } catch (e) { return []; } }
  function queueWrite(q) { try { if (q.length) localStorage.setItem(QKEY, JSON.stringify(q.slice(-60))); else localStorage.removeItem(QKEY); } catch (e) {} }
  var flushing = false;
  // Only one tab may send the kept openings at a time, or two tabs could send the same one.
  function flushQueue() {
    if (flushing || !trk.base || !navigator.onLine || !queueRead().length) return;
    if (navigator.locks && navigator.locks.request) {
      navigator.locks.request('chx-trk-flush', { ifAvailable: true }, function (lock) {
        if (!lock) return;
        return new Promise(function (done) { flushNow(done); });
      }).catch(function () {});
      return;
    }
    var held = +(store('chx-trk-lock') || 0);
    if (held && Date.now() - held < 20000) return;
    store('chx-trk-lock', String(Date.now()));
    flushNow(function () { try { localStorage.removeItem('chx-trk-lock'); } catch (e) {} });
  }
  function flushNow(done) {
    var q = queueRead();
    if (!q.length) { done(); return; }
    flushing = true;
    var cutoff = Date.now() - 45 * 864e5;
    (function next() {
      var cur = queueRead();
      while (cur.length && !(cur[0] && cur[0].t > cutoff)) cur.shift();
      if (!cur.length) { queueWrite(cur); flushing = false; done(); return; }
      var v = cur[0];
      send(v).then(function (res) {
        if (res === 'retry') { flushing = false; done(); return; }
        var after = queueRead();
        if (after.length && after[0].t === v.t) after.shift();
        queueWrite(after);
        setTimeout(next, 250);
      });
    })();
  }

  function readTotal() {
    if (!trk.base) return Promise.resolve(null);
    return fetch(trk.base + '/v1/total.json', { cache: 'no-store', credentials: 'omit' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (n) {
        var live = typeof n === 'number' ? n : 0;
        var all = live + ((trk.baseline && +trk.baseline.sinceLaunch) || 0);
        trk.lastTotal = all;
        paintTotals(all);
        emit('total', all);
        return all;
      })
      .catch(function () { return null; });
  }
  function fmt(n) { try { return Number(n).toLocaleString('en-GB'); } catch (e) { return String(n); } }
  function paintTotals(all) {
    var els = document.querySelectorAll('[data-chx-total]');
    for (var i = 0; i < els.length; i++) {
      if (els[i].textContent !== fmt(all)) {
        els[i].textContent = fmt(all);
        els[i].classList.remove('chx-tick'); void els[i].offsetWidth; els[i].classList.add('chx-tick');
      }
    }
  }

  function startTracker(cfg) {
    trk.cfg = cfg || null;
    trk.base = dbBase(cfg);
    trk.baseline = (cfg && cfg.baseline) || {};
    trk.configured = !!trk.base;
    trk.booted = true;
    if (!trk.configured) { emit('ready', trk); return; }
    document.documentElement.classList.add('chx-trk-on');
    emit('ready', trk);

    var testing = window.__CHX_TEST__ === true;
    var isBot = !testing && (navigator.webdriver === true || BOT.test(ua));
    var v = {
      t: Date.now(),
      page: pageKey(),
      src: sourceKey(),
      dev: deviceKey(),
      app: standalone,
      cc: 'ZZ'
    };
    trk.visit = v;

    function afterWrite() {
      if (IS_MAIN) {
        readTotal();
        setInterval(function () { if (document.visibilityState === 'visible') readTotal(); }, 120000);
      }
      flushQueue();
    }

    if (isBot || !/^https?:$/.test(location.protocol)) { v.counted = false; afterWrite(); return; }

    var sent = false;
    function go(cc, how, leaving) {
      if (sent) return;
      sent = true;
      v.cc = cc; v.how = how;
      send(v, leaving).then(function (res) {
        v.counted = res === 'ok';
        if (res === 'retry') { var q = queueRead(); q.push(v); queueWrite(q); v.queued = true; }
        if (res === 'refused' && !trk.error) {
          trk.error = 'refused';
          try { console.warn('[The Chronicles] The engagement tracker database refused the write — check that the rules from the setup guide are published.'); } catch (e) {}
        }
        emit('visit', v);
        afterWrite();
      });
    }
    // A reader who leaves within the second or two the country lookup takes is
    // still counted: the opening goes out at once with the time-zone country.
    window.addEventListener('pagehide', function () { if (!sent) go(tzCountry() || 'ZZ', 'timezone', true); });
    detectCountry(function (cc, how) { go(cc, how, false); });
    window.addEventListener('online', flushQueue);
  }

  function boot() {
    var ready = function (cfg) { startTracker(cfg); };
    if (window.CHRONICLES_TRACKER_CONFIG) return ready(window.CHRONICLES_TRACKER_CONFIG);
    var s = document.createElement('script');
    s.src = new URL('app/tracker-config.js', ROOT).href;
    s.async = true;
    s.onload = function () { ready(window.CHRONICLES_TRACKER_CONFIG || null); };
    s.onerror = function () { ready(null); };
    (document.head || document.documentElement).appendChild(s);
  }
  // A page pre-rendered in the background is only counted if the reader actually opens it.
  if (document.prerendering) document.addEventListener('prerenderingchange', boot, { once: true });
  else boot();

  window.ChroniclesTracker = {
    get configured() { return trk.configured; },
    get base() { return trk.base; },
    get baseline() { return trk.baseline; },
    get visit() { return trk.visit; },
    get lastTotal() { return trk.lastTotal; },
    get error() { return trk.error; },
    keysFor: keysFor,
    isoWeek: isoWeek,
    readTotal: readTotal,
    on: function (ev, fn) { trk.listeners.push({ ev: ev, fn: fn }); if (ev === 'ready' && trk.booted) fn(trk); }
  };

  /* ── 7 · the two header panels ──────────────────────────────────────── */
  window.ChroniclesApp = {
    ROOT: ROOT.href,
    URL: 'https://thechronicles.live/',
    get standalone() { return standalone; },
    isIOS: isIOS,
    isAndroid: isAndroid,
    get canPrompt() { return !!deferredPrompt; },
    get installed() { return standalone || !!store('chronicles-installed'); },
    promptInstall: promptInstall,
    onInstallChange: function (fn) { installListeners.push(fn); }
  };

  var hubState = 0, hubWaiters = [];
  function loadHub(cb) {
    if (hubState === 2) return cb && cb();
    if (cb) hubWaiters.push(cb);
    if (hubState === 1) return;
    hubState = 1;
    var s = document.createElement('script');
    s.src = new URL('app/hub.js', ROOT).href;
    s.async = true;
    s.onload = function () { hubState = 2; var w = hubWaiters; hubWaiters = []; w.forEach(function (f) { f(); }); };
    s.onerror = function () { hubState = 0; hubWaiters = []; };
    (document.head || document.documentElement).appendChild(s);
  }
  window.ChroniclesHub = {
    open: function (which) { loadHub(function () { if (window.__chxHub) window.__chxHub.open(which); }); },
    preload: function () { loadHub(); }
  };
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest ? e.target.closest('[data-hub]') : null;
    if (!b) return;
    e.preventDefault();
    window.ChroniclesHub.open(b.getAttribute('data-hub'));
  });
  // Warm the panels the moment a reader reaches for one, and quietly after load.
  ['pointerenter', 'focusin', 'touchstart'].forEach(function (t) {
    document.addEventListener(t, function (e) {
      if (e.target && e.target.closest && e.target.closest('[data-hub]')) loadHub();
    }, { passive: true, capture: true });
  });
  // The site owner's one-click check after setting up the database:
  //   https://thechronicles.live/?tracker-check
  if (/[?&]tracker-check\b/.test(location.search)) {
    window.addEventListener('load', function () { setTimeout(function () { window.ChroniclesHub.open('check'); }, 1200); });
  }
  if (IS_MAIN) {
    window.addEventListener('load', function () {
      var go = function () { loadHub(); };
      if ('requestIdleCallback' in window) setTimeout(function () { requestIdleCallback(go, { timeout: 4000 }); }, 5000);
      else setTimeout(go, 6000);
    });
  }
})();
