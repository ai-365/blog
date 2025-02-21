
// 安装时执行的操作，对于网页来说，“打开即安装”

// 在service-worker中，self就相当于window全局对象
// self.oninstall = event => {
//     event.waitUntil(
//       caches.open('cache-v1').then(cache => {
//         // 注意这里很关键，缓存资源以便断网使用：
//         cache.addAll(['index.md']);
//       })
//     );
//   }

  
// 拦截并处理所有网络请求
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // 检查响应是否在缓存中，如果不在，尝试从网络获取并缓存它
        return response || fetch(event.request).then(function(networkResponse) {
          caches.open('my-cache-v1').then(function(cache) {
            cache.put(event.request, networkResponse.clone()); // 缓存响应副本（克隆以避免污染原始响应）
          });
          return networkResponse; // 返回网络响应给页面
        });
      })
    );
  });