
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


