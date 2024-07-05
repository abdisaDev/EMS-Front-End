if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.ts")
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
      cache.addAll([
        "/",
        "/index.html",
        "/favicon.ico",
        "/assets/images/logo192.png",
        "/assets/images/logo512.png",
      ]);
    })
  );
});
