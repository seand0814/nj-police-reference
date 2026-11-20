/* NJ Police Reference service worker: lets the app open with no signal.
 * - Build files (/_next/static) never change once published: served from cache first.
 * - Pages: network first (so you get updates), falling back to the saved copy after a few seconds or when offline.
 * - Ask AI (/api) always needs a connection.
 * Cache names must match lib/offline.ts.
 */
const STATIC_CACHE = "njpr-static-v1";
const PAGES_CACHE = "njpr-pages-v1";
const KEEP = [STATIC_CACHE, PAGES_CACHE];
const CORE = ["/", "/search", "/more", "/search-index.json"];
const TIMEOUT_MS = 3500;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGES_CACHE).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("njpr-") && !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const OFFLINE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Offline</title><style>body{font-family:-apple-system,system-ui,sans-serif;background:#0c1834;color:#fff;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px;text-align:center}
a{display:inline-block;margin-top:18px;background:#e2b24a;color:#0c1834;padding:12px 20px;border-radius:12px;font-weight:700;text-decoration:none}p{opacity:.8;line-height:1.5}</style></head>
<body><div><h1>You're offline</h1><p>This page wasn't saved on this phone yet.<br>Pages you've opened before, and everything after you tap<br>"Download for offline" on the More screen, work with no signal.</p><a href="/">Go to Home</a></div></body></html>`;

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
}

async function pageFromNetwork(request, key) {
  const res = await fetch(request);
  if (res.ok && res.type === "basic") {
    const copy = res.clone();
    caches.open(PAGES_CACHE).then((c) => c.put(key, copy)).catch(() => {});
  }
  return res;
}

async function networkFirst(request) {
  const url = new URL(request.url);
  const key = url.origin + url.pathname;
  const network = pageFromNetwork(request, key);
  try {
    return await Promise.race([network, timeout(TIMEOUT_MS)]);
  } catch {
    const cached = await caches.match(key, { ignoreSearch: true, ignoreVary: true });
    if (cached) return cached;
    try {
      return await network; // slow connection and nothing saved: keep waiting
    } catch {
      return new Response(OFFLINE_HTML, { status: 503, headers: { "content-type": "text/html; charset=utf-8" } });
    }
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreVary: true });
  if (cached) return cached;
  const res = await fetch(request);
  if (res.ok) {
    const copy = res.clone();
    caches.open(STATIC_CACHE).then((c) => c.put(request, copy)).catch(() => {});
  }
  return res;
}

async function staleWhileRevalidate(request) {
  const url = new URL(request.url);
  const key = url.origin + url.pathname;
  const cached = await caches.match(key, { ignoreSearch: true, ignoreVary: true });
  const network = fetch(request)
    .then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(PAGES_CACHE).then((c) => c.put(key, copy)).catch(() => {});
      }
      return res;
    })
    .catch(() => cached || Response.error());
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname === "/offline-manifest.json" || url.pathname === "/version.json") return;
  // Next.js page data for in-app navigation: let it fail offline; Next then loads the full (saved) page instead.
  if (request.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) return;

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
  } else if (request.mode === "navigate" || (request.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(networkFirst(request));
  } else if (/\.(png|ico|webmanifest|json)$/.test(url.pathname) || url.pathname === "/manifest.webmanifest") {
    event.respondWith(staleWhileRevalidate(request));
  }
});
