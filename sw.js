// ALWAYS CHANGE THIS VERSION WHEN YOU UPDATE YOUR HTML OR JS (e.g., mg-store-v2, v3)
const CACHE_NAME = 'mg-store-v1'; 

const FILES_TO_CACHE = [
  '/MG_ROUTINE_TEST_SMART_APP.html',
  '/MG_LOGO_WITH_NAME-removebg-preview.png',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Installs updates immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key); // Clears out old versions
        }
      }));
    })
  );
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
