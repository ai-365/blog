
# Electron

## Electron入门

### 安装

运行如下命令安装Electron：

```sh
npm i electron
```

### main.js文件

main.js是应用程序的入口文件。内容如下：

```js
const { app, BrowserWindow } = require('electron') 
 
const mainWindow = null
app.on('ready',()=>{
    mainWindow = new BrowserWindow({ 
        width:500,
        height:500,
        webPreferences:{ 
          nodeIntegration:true //设置为true就可以在这个渲染进程中调用Node.js
        }
    });
 
    mainWindow.loadFile('index.html'); // 加载本地文件
    // mainWindow.loadURL('https://zhuiyi.ai/'); // 加载远程文件
 
    mainWindow.webContents.openDevTools({ mode: 'bottom' }); // 控制台开关
  
    mainWindow.on('close',()=>{ 
        // 在窗口要关闭的时候触发
        e.preventDefault(); // 避免进程意外关闭导致进程销毁
    })
 
    mainWindow.on('closed',()=>{ 
       // 当窗口已经关闭的时候触发
    })
 
})
```

### index.html文件

main.js中使用的index.html就是第一个页面。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World!</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>
```

### Preload.js文件

preload.js 文件内容：

```js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
```


### 启动应用

运行如下命令启动应用：

```sh
npx electron .
```


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

## 新建窗口

###   新建基本窗口


首先新建一个文件window.js，表示新建窗口的脚本。

```js
// 引入BrowserWindow类用于新建窗口
// 引入ipcMain用于后续监听渲染进程的消息
const  {BrowserWindow, ipcMain} = require('electron')

// 新建窗口的函数
const createWindow=()=>{

  // 新建空白窗口
    const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreference:{
        preload: './preload.js'
    }
  })
  // 加载内容
  window.loadFile('index.html')

  // 处理渲染进程发过来的消息
    ipcMain.handle('channel1',(event,...args)=>{
        return args.toString() + ' have been received.'
    })
}

// 导出
module.exports = {createWindow}
```

然后，在main.js中引入createWindow()函数。

当app whenReady时调用新建窗口的函数。


```js
// 引入app作为主应用程序
const {app} = require('electron')
// 引入窗口
const createWindow = require('window.js')

// 当app就绪时才能新建窗口
appp.on('ready',createWindow)

// 当所有窗口关闭时程序退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 激活程序后，如果没有窗口，就使用第一个渲染器进程
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    第一个渲染器进程()
  }
```

###   新建窗口的详细配置

BrowerWindow类创建窗口。返回窗口对象，通常命名为window。

- width、height 宽度高度
- minWidth 最小宽度
- maxWidth 最大宽度
- minHeight 最小高度
- maxHeight 最大高度
- resizeable： 是否可以改变大小
- moveable： 是否可移动
- frame： 是否显示标题栏
- transparent： 是否透明
- x，y  位置
- title： 标题文本
- icon： 标题栏图标 传入路径


window的方法：
- loadFile() 加载内容，传入本地的HTML文件路径

on事件：
- close

BrowerWindow类的webPreferences

把这个属性单独拿出来，因为很关键。
 
有一个很重要的选项：preload，指定预加载脚本文件。



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
