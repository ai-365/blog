
// 安装时执行的操作，对于网页来说，“打开即安装”

// 在service-worker中，self就相当于window全局对象
self.oninstall = event => {
  event.waitUntil(
    caches.open('cache-v1').then(cache => {
      // 注意这里很关键，缓存资源以便断网使用：
      cache.addAll(['./测试文件1.html', './测试文件2.html']);
    })
  );
}

// 再次访问时先检查缓存，如果有直接返回缓存中的文件
self.onfetch = event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
}
