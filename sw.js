/* KOSME 일정 PWA 서비스워커 — 네트워크 우선(항상 최신), 오프라인 시 캐시 폴백 */
const CACHE = 'kosme-cal-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        const cp = r.clone();
        caches.open(CACHE).then(c => c.put(req, cp));
        return r;
      }).catch(() => caches.match(req).then(m => m || caches.match('./index.html')))
    );
  }
});
