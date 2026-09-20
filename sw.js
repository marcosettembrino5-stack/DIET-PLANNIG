/* ============================================================
   NutriApp - Service Worker
   Cache dei file dell'app per il funzionamento offline.
   Aggiorna CACHE_VERSION quando cambi i file per forzare
   il refresh della cache sui dispositivi.
   ============================================================ */

const CACHE_VERSION = "nutriapp-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./manifest.webmanifest",
  "./icon.svg"
];

// Installazione: pre-carica i file in cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Attivazione: elimina le cache vecchie
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: strategia "cache first, poi rete" per gli asset dell'app.
// Le richieste non-GET passano direttamente alla rete.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((resp) => {
          // salva in cache una copia delle risposte valide same-origin
          if (resp && resp.status === 200 && resp.type === "basic") {
            const copy = resp.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          }
          return resp;
        })
        .catch(() => cached); // offline e non in cache: fallisce silenziosamente
    })
  );
});
