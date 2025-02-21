
一个Node.js HTTP服务端的基本代码骨架如下：

```js

const http = require('http')

http.createServer((req, res) => {

    // url是完整路径
    const url = new URL(req.url, 'http://localhost:8080')
    
    // url.host  主机+端口
    // url.pathname: 路径
    // url.searchParams :  查询端口

    // POST请求触发data，参数data是请求体，使用toString()将二进制流转为字符串

    req.on('data',data=>console.log(data.toString()))

    // req.headers: 请求头对象
    // req.setHeader('name','value') // 设置响应头

        // 解决跨域问题
    res.setHeader("Access-Control-Allow-Origin", "*")     

    res.end('res body')  //  返回数据

}).listen('8080', () => console.log('running on http://localhost:8080'))
```

通常使用req，res表示请求对象和响应对象，这是惯用的写法。

请求的URL包括三大部分：主机名+端口、路径、查询参数。

req.url只包括路径和查询参数，而调用new URL()需要传入完整的URL，因此需要补上主机名+端口：

```js
const url = new URL(req.url, ' http://localhost:8080')
```

此时，就可以分别得到路径和查询参数了：

```
console.log(url.pathname)           //  路径
console.log(url.searchParams)  //  查询参数，是一个可迭代对象。
```

解析请求体需要监听req对象的data事件，得到请求体：

```js
req.on('data',data=>console.log(data.toString()))
```

由于安全原因，HTTP服务器默认不能跨域访问，如果在浏览器script脚本中使用fetch()方法会被拒绝访问。要解除这个限制，可以添加一行如下代码：

```js
res.setHeader("Access-Control-Allow-Origin", "*")
```

要返回数据，会用到两个方法：res.write()和res.end()。res.write()可以重复调用，表示不断开连接的情况下多次返回。而一旦遇到了res.end()，就会在返回这一次的数据后立即断开。如下示例表示返回了三次数据后断开连接：

```js
res.write('hello')
res.write('world')
res.end('res end')
```
