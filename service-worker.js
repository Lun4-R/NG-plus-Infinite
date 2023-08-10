const CACHE_NAME = 'version3';
const urlsToCache = [
  '/',
  'index.html',
  'css/',
  'images/',
  'fonts/',
  'js/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
