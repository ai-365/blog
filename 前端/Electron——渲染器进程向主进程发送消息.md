
##  渲染器进程向主进程发送消息

preload.js暴露变量或函数：

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('msg', {
        
  ping: () => ipcRenderer.invoke('ping')
})
```

主进程监听消息：

```js
const {app, BrowserWindow, ipcMain} = require('electron')

app.whenReady().then(()=>{
        ipcMain.handle('ping',()=>'pong')
})
```
