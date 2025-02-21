
##  主进程监听消息

ipcRenderer是Node.js EventEmitter的实例。

在预加载脚本中暴露API：

```js
const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  // foo是页面可以直接调用的函数
  // 通过window.electronAPI.foo()的形式调用
  // data消息形参
  // channel1表示频道，主进程就监听这个频道
  foo : (msg1,msg2) => ipcRenderer.invoke('channel1',msg1,msg2)
})
```

data表示传递的参数。参数的个数可以是任意的，因为在主进程的handle函数中，都会被收集成一个数组。

然后，在renderer.js中，点击页面中的按钮触发，传递实际的参数，通过预加载脚本发送消息给主进程，获取回应：

```js
document.querySelector('#button').onclick = () => {
  // 传入实际参数，
  // 数量不限，但是数量要与preload.js定义的一致
   window.electronAPI.foo('消息内容1','消息内容2')
  // window.electronAPI.foo()返回的是期约
  // 通过then()获取结果
   .then(result=>alert(result))

}
```

ipcRenderer.invoke()和ipcMain.handle()是在electron7之后使用的双向通信api，官方推荐使用。

同时，应该减少使用ipcRenderer.send()和ipcMain.on()
