const CACHE_NAME = 'phantom-blade-cache-v1';
const urlsToCache = [
    '/',
    'index.html'
    // NOTA: No podemos cachear los scripts de tailwind/fonts 
    // porque vienen de otro dominio (CDN). Pero la app principal funcionará offline.
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Estrategia de "Cache Primero"
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si está en cache, lo devuelve
                if (response) {
                    return response;
                }
                // Si no, va a la red a buscarlo
                return fetch(event.request);
            }
        )
    );
});
