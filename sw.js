/* ═══════════════════════════════════════════════════════════════════════
   THE CHRONICLES — service worker

   HOW UPDATES REACH EVERY PHONE
   The app is the website. Every page is fetched from the live site (thechronicles.live) first
   ("network-first"), revalidated against the server on every open, so the
   moment a new version is deployed to the repository, the next time anyone
   opens the app they get it. Nothing needs to be reinstalled, and this file
   does not need to change when the content does.

   The copies kept on the phone are only a fallback: they are what the app
   shows when there is no connection, or when the network is too slow to
   answer within a few seconds (and even then the fresh copy is fetched in the
   background, so the following open is current).

   Only bump VERSION if the caching logic or the PRECACHE list changes.
   v2 (30 Sep 2026): the header panels (hub.js) and the tracker settings are
   kept for offline use.
   v3 (6 Oct 2026): the language globe (lang.js) is kept for offline use.
   Translated pages come from Google's translate.goog, another site, so this
   worker never caches or alters them.
   ═══════════════════════════════════════════════════════════════════════ */

const VERSION = 'v3';
const CORE    = 'chronicles-core-'    + VERSION;   // pages + app shell
const FONTS   = 'chronicles-fonts-'   + VERSION;   // Google Fonts (CSS + files)
const KEEP    = [CORE, FONTS];

// Pages and app-shell files kept for offline reading. Individually fault-
// tolerant: one missing file must never stop the app installing.
const PRECACHE = [
  './',
  'index.html',
  'before_adam.html',
  'karbala.html',
  'comparative_religion.html',
  'AboutMe.html',
  'manifest.json',
  'app/app.js',
  'app/hub.js',
  'app/lang.js',
  'app/tracker-config.js',
  'app/icon-96.png',
  'app/icon-192.png',
  'app/icon-512.png',
  'app/apple-touch-icon.png',
  'app/favicon.svg',
  'app/favicon-16.png',
  'app/favicon-32.png',
  'app/favicon-48.png'
];

const NETWORK_TIMEOUT_MS = 6000;

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE);
    await Promise.all(PRECACHE.map(async url => {
      try {
        const res = await fetch(new Request(url, { cache: 'reload' }));
        if (res.ok) await cache.put(url, await clean(res));
      } catch (e) { /* offline or missing — skip, it will be cached on first visit */ }
    }));
    await self.skipWaiting();      // a new worker takes over at once
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n.startsWith('chronicles-') && !KEEP.includes(n))
                           .map(n => caches.delete(n)));
    await self.clients.claim();    // and controls every open window immediately
  })());
});

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;                           // HEAD checks go straight to the network
  const url = new URL(req.url);

  // Google Fonts: the stylesheet changes rarely, the font files never.
  if (url.hostname === 'fonts.gstatic.com') {
    event.respondWith(cacheFirst(req, FONTS));
    return;
  }
  if (url.hostname === 'fonts.googleapis.com') {
    event.respondWith(staleWhileRevalidate(req, FONTS, event));
    return;
  }

  // Everything else outside this site (LinkedIn, Natural Earth, the tracker's
  // database, the country lookup, …) is left alone — live figures are never cached.
  if (url.origin !== self.location.origin) return;
  const scope = new URL(self.registration.scope);
  if (!url.pathname.startsWith(scope.pathname)) return;

  event.respondWith(networkFirst(event));
});


/* ── strategies ─────────────────────────────────────────────────────────── */

async function networkFirst(event) {
  const req = event.request;
  const cache = await caches.open(CORE);
  const key = cacheKey(req.url);

  // Revalidate with the server on every request. If the file is unchanged the
  // server answers 304 and nothing is re-downloaded; if it has changed, the new
  // version comes straight through. This is what makes updates immediate.
  const network = fetch(req.url, { cache: 'no-cache', credentials: 'same-origin', redirect: 'follow' })
    .then(async res => {
      if (res && res.ok) {
        const copy = await clean(res.clone());
        event.waitUntil(cache.put(key, copy));
      }
      return res;
    });

  let timer;
  const timeout = new Promise(resolve => { timer = setTimeout(resolve, NETWORK_TIMEOUT_MS, 'timeout'); });

  try {
    const winner = await Promise.race([network, timeout]);
    if (winner !== 'timeout') {
      clearTimeout(timer);
      // Any real answer from the server wins (including a 404 for a page that
      // was removed); only a server error falls back to the kept copy.
      if (winner.status < 500 || !(await cache.match(key))) return await answer(req, winner);
    }
    // Slow network: show the kept copy now, let the fresh one land for next time.
    event.waitUntil(network.catch(() => {}));
    const kept = await matchKept(cache, req, key);
    if (kept) return kept;
    return await answer(req, await network);
  } catch (err) {
    clearTimeout(timer);
    const kept = await matchKept(cache, req, key);
    if (kept) return kept;
    if (req.mode === 'navigate') return offlinePage();
    return Response.error();
  }
}

async function cacheFirst(req, name) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  try {
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
    return res;
  } catch (e) { return Response.error(); }
}

async function staleWhileRevalidate(req, name, event) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  const fresh = fetch(req).then(res => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
    return res;
  }).catch(() => null);
  if (hit) { event.waitUntil(fresh); return hit; }
  return (await fresh) || Response.error();
}


/* ── helpers ────────────────────────────────────────────────────────────── */

// One cache entry per page regardless of ?query or #hash; the folder URL and
// index.html are the same page.
function cacheKey(href) {
  const u = new URL(href);
  u.search = ''; u.hash = '';
  const scope = new URL(self.registration.scope);
  if (u.pathname === scope.pathname) u.pathname = scope.pathname + 'index.html';
  return u.href;
}

async function matchKept(cache, req, key) {
  // Only the page that was asked for — an unknown address offline gets the
  // offline screen, never a different page wearing its URL.
  return (await cache.match(key)) || (await cache.match(req, { ignoreSearch: true })) || null;
}

// A navigation that was redirected (e.g. a folder URL without its trailing
// slash) must be answered with a real redirect, so the page lands on the
// final URL and its relative links resolve correctly.
async function answer(req, res) {
  if (res && res.redirected && req.mode === 'navigate') return Response.redirect(res.url, 302);
  return clean(res);
}

// A response that followed a redirect cannot be handed back to a navigation.
// Re-wrapping it drops the redirect flag while keeping body and headers.
async function clean(res) {
  if (!res || !res.redirected) return res;
  const body = await res.blob();
  return new Response(body, { status: res.status, statusText: res.statusText, headers: res.headers });
}

function offlinePage() {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Chronicles — offline</title>
<style>html,body{margin:0;height:100%;background:#0E0503;color:#E8D6B0;font-family:Georgia,serif}
.w{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;text-align:center}
img{width:96px;height:96px;border-radius:22px}h1{font-size:22px;letter-spacing:.14em;color:#E6C265;margin:0}
p{max-width:320px;line-height:1.6;color:#CDB78C;margin:0}button{margin-top:6px;background:none;border:1px solid #C9A84C;
color:#E6C265;border-radius:20px;padding:10px 22px;font:inherit;letter-spacing:.08em}</style></head>
<body><div class="w"><img src="app/icon-192.png" alt=""><h1>THE CHRONICLES</h1>
<p>You're offline, and this page hasn't been saved on your phone yet. Connect to the internet and it will open.</p>
<button onclick="location.reload()">Try again</button></div></body></html>`;
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
