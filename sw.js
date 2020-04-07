const staticAssets = [
    './',
    'style.css',
    'script.js'
];
const cacheName = "App V1";
self.addEventListener('install', (e)=>{
    console.log("Service Worker: Installing");
    e.waitUntil(
        caches.open(cacheName)
            .then(cache=>{
                console.log("Service Worker: Caching Assets");
                return cache.addAll(staticAssets);
            })
    );
});
self.addEventListener('activate', e=>{
    console.log("Service Worker: Activating");
    e.waitUntil(
        caches.keys()
            .then(cacheNames=>{
                return Promise.all(cacheNames.map(key=>{
                    if(key!==cacheName){
                        console.log("Service Worker: Removing older caches",key);
                        return caches.delete(key);
                    }
                }))
            })
    );
    return self.clients.claim();
})
self.addEventListener('fetch',e=>{
    console.log("Service Worker: fetch",e.request.url);
    console.log("Url: ",e.request.url);
    e.respondWith(
        caches.match(e.request)
            .then(response=>{
                return response || fetch(e.request);
            })
    );
})