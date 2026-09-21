/* ============================================================
   NutriApp - Service Worker
   Cache dei file dell'app per il funzionamento offline.
   Aggiorna CACHE_VERSION quando cambi i file per forzare
   il refresh della cache sui dispositivi.
   ============================================================ */

const CACHE_VERSION = "nutriapp-v5";
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

// Fetch: strategia "network first, poi cache".
// Così quando c'è rete si vede SEMPRE l'ultima versione (niente app "vecchia"),
// e offline si usa la copia in cache. Le richieste non-GET vanno dirette alla rete.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((resp) => {
        // aggiorna la cache con l'ultima versione (solo same-origin valide)
        if (resp && resp.status === 200 && resp.type === "basic") {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
        }
        return resp;
      })
      .catch(() => caches.match(event.request)) // offline: usa la cache
  );
});

