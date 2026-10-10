// Service worker de Tests del Máster.
// IMPORTANTE: sube VERSION en cada cambio (tests-v1 → tests-v2…) para que los usuarios reciban la versión nueva.
const VERSION = 'tests-v3';
const FONTS = 'tests-fonts';   // caché de Google Fonts y de supabase-js (versión fija), se conserva entre versiones

const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './js/config.js',
  './js/cloud.js',
  './js/online-ui.js',
  './js/app.js',
  './data/sif.js',
  './data/inst.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Google Fonts y supabase-js (CDN con versión fija): se guardan en caché la primera vez que se usan.
  // Las llamadas a Supabase (*.supabase.co) no se tocan: van siempre a la red y nunca se cachean.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com' ||
      (url.hostname === 'cdn.jsdelivr.net' && url.pathname.startsWith('/npm/@supabase/supabase-js@'))) {
    event.respondWith(
      caches.open(FONTS).then(cache =>
        cache.match(req).then(hit => {
          const net = fetch(req).then(res => {
            if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
            return res;
          }).catch(() => hit || Response.error());
          return hit || net;
        })
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Navegación: la app es una sola página
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html', {cacheName: VERSION}).then(hit => hit || fetch(req))
    );
    return;
  }

  // Archivos propios: primero la caché, si no la red (y se guarda)
  event.respondWith(
    caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(res => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(VERSION).then(cache => cache.put(req, copy));
      }
      return res;
    }))
  );
});
