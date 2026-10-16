// Service worker de Tests del Máster.
// IMPORTANTE: sube VERSION en cada cambio (tests-v1 → tests-v2…) para que los usuarios reciban la versión nueva.
const VERSION = 'tests-v12';

const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './css/fonts.css',
  './fonts/barlow-condensed-latin-79f19b.woff2',
  './fonts/barlow-condensed-latin-b57619.woff2',
  './fonts/barlow-condensed-latin-ext-477044.woff2',
  './fonts/barlow-condensed-latin-ext-93cdc0.woff2',
  './fonts/barlow-condensed-latin-ext-aaa351.woff2',
  './fonts/barlow-condensed-latin-f60870.woff2',
  './fonts/jetbrains-mono-latin-480c06.woff2',
  './fonts/jetbrains-mono-latin-ext-ba1653.woff2',
  './fonts/source-sans-3-latin-263ee0.woff2',
  './fonts/source-sans-3-latin-ext-7ee8ef.woff2',
  './js/config.js',
  './js/legal.js',
  './js/vendor/supabase-2.117.2.js',
  './js/qid.js',
  './js/legacy-map.js',
  './js/cloud.js',
  './js/online-ui.js',
  './js/learn.js',
  './js/app.js',
  './data/sif.js',
  './data/inst.js',
  './data/learn/pci.js',
  // figuras de Aprender (data/learn/pci.js)
  './assets/learn/pci/fig01.webp',
  './assets/learn/pci/fig02.webp',
  './assets/learn/pci/fig03.webp',
  './assets/learn/pci/fig04.webp',
  './assets/learn/pci/fig05.webp',
  './assets/learn/pci/fig06.webp',
  './assets/learn/pci/fig07.webp',
  './assets/learn/pci/fig08.webp',
  './assets/learn/pci/fig09.webp',
  './assets/learn/pci/fig10.webp',
  './assets/learn/pci/fig11.webp',
  './assets/learn/pci/fig12.webp',
  './assets/learn/pci/fig13.webp',
  './assets/learn/pci/fig14.webp',
  './assets/learn/pci/fig15.webp',
  './assets/learn/pci/fig16.webp',
  './assets/learn/pci/fig17.webp',
  './assets/learn/pci/fig18.webp',
  './assets/learn/pci/fig19.webp',
  './assets/learn/pci/fig20.webp',
  './assets/learn/pci/fig21.webp',
  './assets/learn/pci/fig22.webp',
  './data/learn/fontaneria.js',
  // figuras de Aprender (data/learn/fontaneria.js)
  './assets/learn/fontaneria/fig01.webp',
  './assets/learn/fontaneria/fig02.webp',
  './assets/learn/fontaneria/fig03.webp',
  './assets/learn/fontaneria/fig04.webp',
  './assets/learn/fontaneria/fig05.webp',
  './assets/learn/fontaneria/fig06.webp',
  './assets/learn/fontaneria/fig07.webp',
  './assets/learn/fontaneria/fig08.webp',
  './assets/learn/fontaneria/fig09.webp',
  './assets/learn/fontaneria/fig10.webp',
  './assets/learn/fontaneria/fig11.webp',
  './assets/learn/fontaneria/fig12.webp',
  './assets/learn/fontaneria/fig13.webp',
  './assets/learn/fontaneria/fig14.webp',
  './assets/learn/fontaneria/fig15.webp',
  './assets/learn/fontaneria/fig16.webp',
  './assets/learn/fontaneria/fig17.webp',
  './assets/learn/fontaneria/fig18.webp',
  './assets/learn/fontaneria/fig19.webp',
  './assets/learn/fontaneria/fig20.webp',
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
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Todo lo de la app se sirve desde aquí: no hay fuentes ni scripts de terceros. Las llamadas a Supabase
  // (*.supabase.co) no se tocan: van siempre a la red y nunca se cachean.
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
