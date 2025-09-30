// sw.js - Service Worker pour cache avancé
const CACHE_NAME = 'memento-v1';
const STATIC_CACHE = 'memento-static-v1';
const DYNAMIC_CACHE = 'memento-dynamic-v1';

// Assets critiques à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/fonts/BDMegalona-Italic.woff2',
  '/assets/index.css', // Vite génère ces noms
  '/assets/index.js'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((err) => console.log('Cache failed:', err))
  );
});

// Activation - nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Stratégie de cache : Cache First pour assets, Network First pour HTML
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Cache First pour assets statiques (CSS, JS, images, fonts)
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font' ||
    request.destination === 'image'
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((fetchResponse) => {
          return caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      }).catch(() => {
        // Fallback si offline
        if (request.destination === 'image') {
          return new Response('<svg>...</svg>', {
            headers: { 'Content-Type': 'image/svg+xml' }
          });
        }
      })
    );
  }
  
  // Network First pour HTML et API
  else if (
    request.destination === 'document' ||
    url.pathname.startsWith('/api')
  ) {
    event.respondWith(
      fetch(request).then((response) => {
        // Mettre en cache la réponse
        const responseClone = response.clone();
        caches.open(DYNAMIC_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => {
        // Fallback vers le cache si offline
        return caches.match(request);
      })
    );
  }
});