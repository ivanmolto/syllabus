const CACHE_NAME = `SyllabusWeave_cache_${1598713865331}`;
self.addEventListener('install', event => {
  event.waitUntil(
    caches
    .open(CACHE_NAME)
    .then(cache => cache.addAll(shell))
    .then(() => {
      self.skipWaiting();
    })
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(async keys => {
      for (const key of keys) {
        if (key !== CACHE_NAME) await caches.delete(key);
      }
      self.clients.claim();
    })
  );
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin !== location.origin || request.method.toLowerCase() !== 'get') {
    return;
  }
  event.respondWith(
    caches
      .open(CACHE_NAME)
      .then(async cache => {
        try {
          const response = await fetch(event.request);
          cache.put(event.request, response.clone());
          return response;
        } catch(err) {
          const response = await cache.match(event.request);
          if (response) return response;
          throw err;
        }
      })
    );
});
