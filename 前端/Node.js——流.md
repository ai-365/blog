
可读流可以简单理解为源文件，往往需要从这里读取一些数据。

可写流可以简单理解为目标文件，往往要把源文件的数据写入到这里。

## 用流复制二进制文件

如下示例，将图片1.png复制成2.png：

```js
const fs = require('fs')

const readable = fs.createReadStream('./1.png')
const writeable = fs.createWriteStream('./2.png')

readable.pipe(writeable)
```

## 用流实现静态文件服务器

http模块中的响应对象是一个可写流，因此，通过文件创建的可读流可以写入其中，返回给客户端。

如下示例用http模块和流实现了一个简单的静态文件服务器，不过还比较粗糙，没有实现错误处理。

```js
const server = require('http').createServer()
const fs = require('fs');

server.on('request', (request, response) => {
    const filename = request.url.substring(1)  //去掉url前面的'/'
    const readstream = fs.createReadStream(filename)  
    readstream.pipe(response)
})

server.listen(8000)

```


