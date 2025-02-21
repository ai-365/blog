

复制下面代码保存到文件如1.js，然后运行`node 1.js`即可启动一个静态文件服务器。

```js

const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((request,response)=>{
        
        const filepath = path.join(__dirname, request.url=='/'?'index.html':request.url)

        if(!fs.existsSync(filepath)){    // 文件不存在返回'no file'
                response.end('no file')
        }else{
                const file= fs.createReadStream(filepath)
                file.on('open',()=>file.pipe(response))
        }
})
.listen(8080,()=>{
    console.log('running on http://localhost:8080')
})

```



首先准备一些文件如1.md、2.png、3.mp4等，依次在浏览器打开`http://localhost/1.md`、`http://localhost/2.png`、`http://localhost/3.mp4`等，可以看到均能在浏览器中预览内容，这表示这个静态文件服务器正在运行。

准备下面代码中用到的图片和视频，然后复制下面的代码并保存到文件如1.html，然后使用Edge打开。即可看到标题、图片和视频都显示在了网页上。

```html
<h1>Hello</h1>
<img src="2.png">
<video src="3.mp4" controls></video>
```

**live server**

不过在实际生成环境中，更可靠的做法时是在需要开启静态文件服务器的文件夹下打开VSCode，安装live server插件，然后按Ctrl+Shift+P，运行Live Server: Open with Live Server。