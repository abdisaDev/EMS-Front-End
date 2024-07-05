if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.ts") // Replace with the path to your service worker
      .then((registration) => {
        console.log("Service worker registered: ", registration.scope);
      })
      .catch((error) => {
        console.log("Service worker registration failed: ", error);
      });
  });
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("static-file-cache").then(function (cache) {
      cache.addAll(["/", "/index.html"]);
    })
  );
});
