/* TIC AI service worker.
 *
 * Goal is modest and honest: make the shell open instantly on a bad
 * connection and give a real page instead of the browser's dinosaur when
 * the network is gone. Video is never cached — a lesson recording would
 * blow the storage quota, so offline users get the page and a clear
 * message rather than a silently broken player.
 */

const VERSION = "v2";
const SHELL = `ticai-shell-${VERSION}`;
const ASSETS = `ticai-assets-${VERSION}`;
const PAGES = `ticai-pages-${VERSION}`;

const OFFLINE_URL = "/offline";

const PRECACHE = [
  "/",
  "/courses",
  OFFLINE_URL,
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL);
      // addAll fails the whole install if any single URL 404s, so fetch
      // them individually and keep whatever succeeds.
      await Promise.all(
        PRECACHE.map(async (url) => {
          try {
            const res = await fetch(url, { cache: "reload" });
            if (res.ok) await cache.put(url, res);
          } catch {
            /* offline at install time — the runtime caches will fill in */
          }
        }),
      );
      self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([SHELL, ASSETS, PAGES]);
      const names = await caches.keys();
      await Promise.all(names.map((n) => (keep.has(n) ? null : caches.delete(n))));
      await self.clients.claim();
    })(),
  );
});

const isStatic = (url) =>
  url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/");

const isFont = (url) =>
  url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";

/** Keep a cache from growing without bound. */
async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > max) {
    await Promise.all(keys.slice(0, keys.length - max).map((k) => cache.delete(k)));
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Third-party players and analytics: always straight to the network.
  if (url.origin !== self.location.origin && !isFont(url)) return;

  // Hashed build output and icons never change under the same URL.
  if (isStatic(url) || isFont(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(ASSETS);
        const hit = await cache.match(request);
        if (hit) return hit;
        const res = await fetch(request);
        if (res.ok || res.type === "opaque") cache.put(request, res.clone());
        return res;
      })(),
    );
    return;
  }

  // Pages: network first so lesson content stays fresh, cache as the
  // fallback, and a real offline page as the last resort.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(request);
          if (res.ok) {
            const cache = await caches.open(PAGES);
            cache.put(request, res.clone());
            trim(PAGES, 60);
          }
          return res;
        } catch {
          const cached =
            (await caches.match(request)) ?? (await caches.match(OFFLINE_URL));
          return (
            cached ??
            new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } })
          );
        }
      })(),
    );
  }
});

// Lets the page activate an update without a second reload.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
