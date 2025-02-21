
## HTTP

### HTTP服务端实现：使用Node.js http模块

一个Node.js HTTP服务端的基本代码骨架如下：

```js
const http = require('http')

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.end('Hello, World!'); // 发送响应内容
})

// 让服务器监听 3000 端口
server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000/')
})
```

通常使用req，res表示请求对象和响应对象，这是惯用的写法。

请求的URL包括三大部分：主机名+端口、路径、查询参数。

req.url只包括路径和查询参数，而调用new URL()需要传入完整的URL，因此需要补上主机名+端口：

```js
const url = new URL(req.url, ' http://localhost:8080')
```

此时，就可以分别得到路径和查询参数了：

```js
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

### HTTP服务端实现：使用express库

express是非常流行的Node.js HTTP库，可以实现生产级的HTTP服务器。示例如下：

```js
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// 使用第三方库bodyParser处理json格式的请求体
app.use(bodyParser.json()) 

app.post('/post', (req, res) => {
    // 获取请求体，为对象类型
    console.log(req.body)

    res.status(200)
    res.header("Content-Type", "application/json")
    res.send('{"key":"value"}') // 返回json
})

app.listen(8080, () => {
    console.log('Example app listening on port 8080')
})
```

###  HTTP客户端实现：使用Fetch

在Node.js和浏览器环境中均可使用fetch()发送HTTP请求、接收服务器响应，语法相同。

基本示例如下：

```sh
//  请求四件套：method、url、headers、body
const method = 'post'
const url = 'http://127.0.0.1:8080/post'
const headers = new Headers({'Content-Type': 'application/json'})
const body = '{"key":"value"}'

async function request(){
    const response = await fetch(url, {method, headers,body})
    // 状态码
    const status = await response.status
    console.log(status)
    // 响应体，json格式
    const result = await response.json()
    console.log(result)
}

request()
```

请求方法有两种：GET和POST，如果要携带正文（即请求体），应使用POST方法。

请求头使用new Headers()初始化，传入一个JavaScript对象，每个键值对对应着HTTP请求报文的头部的键值对。

```js
new Headers({'Content-Type': 'application/json'})
```

请求体是一个JavaScript对象，包括method、headers、body三个属性。其中，headers属性的是是一个Headers对象。

```js
const req = {
    method: 'POST',
    headers: new Headers({})
    body: 'req body'
}
```

fetch()函数返回的是一个期约对象，使用await解析期约值。如上面示例代码。

上面示例中的res对象还可以有如下属性和方法：
- status，取得返回码，如200。
- statusText，取得返回码状态，例如OK。
- headers，取得响应头。
- body， 取得响应体，这是一个ReadableStream对象。
- json()，如果响应体是一个JSON对象，使用该方法可以直接解析为JavaScript对象。


## response的end和write区别

end向客户端发送消息然后终止响应，对于每个请求，都要调用end方法，否则客户端会一直陷入等待。

write 写入响应消息。

也就是说可以没有write，但是不能没有end。


```js

const http = require('http')
http.createServer((request,response)=>{
    response.writeHead(200)
	response.write('<h1>hello</h1>')
	response.write('<h1>hello</h1>')
    response.end()
}).listen(8080,()=>{
    console.log('running on http://localhost:8080')
})

```

## request对象


request.url  路由，排除了https、主机名剩下的部分 例如/ /login  

request.method  请求方法

内置URL模块解析各个部分。

// req.url 是客户端的请求url地址

通过on事件监听来获取数据

## http.serverResponse对象上定义的事件和方法

- Event:'close' : 如果在调用end方法前连接被关闭，则触发该事件
- Event:'finish' : 发送响应消息后触发
- response.addTrailers(headers) : 追加响应头
- response.connection  底层的socket对
- `response.end([data][,encoding][,callback])`  向客户端发送消息，然后终止响应
- response.finished 布尔值,响应是否结束
- response.getHeadeer(name)  获取已经设置的响应头
- response.getHeaderNames()  获取已设置的响应头列表键(键值)
- response. getHeaders 获取已设置的Header列表（完整内容）
- response. hasHeader(name)：判断是否设置了header
- response. headersSent 布尔值，是否已经发送了header
- response.removeHeader(name)  移除已经设置的header
- response. sendDate 布尔值，是否在header中增加date
- response. setHeader(name,value) 设置header
- `response.setHeader('Set-Cookie', ['key1=value1'    ,   'key2=value2'])` 设置cookie
- ` response. setTimeout(msecsp[,callback])`   设置socket 超时时间
- response. socket 底层的socket对象
- response. statusCode 设置状态码
- response. statusMessage 设置状态信息
- `response.write(chunk[,encoding][,callback]) ` 写入响应信息
- response.writeContinue() 发送HTTP/1.1 100 Continue
- `response.writeHead(statusCode[,statusMessage][,headers])` 向客户端发送响应头
- response.writeProcessing()  发送HTTP/1.1 102 Processing