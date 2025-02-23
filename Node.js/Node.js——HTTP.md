<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [HTTP协议理论](#http协议理论)
  - [HTTP协议简介](#http协议简介)
  - [请求与响应报文](#请求与响应报文)
- [服务端](#服务端)
  - [使用内置http模块实现一个简单的服务器](#使用内置http模块实现一个简单的服务器)
  - [一个较为典型的示例](#一个较为典型的示例)
  - [response的end和write区别](#response的end和write区别)
  - [request对象](#request对象)
  - [serverResponse对象上定义的事件和方法](#serverresponse对象上定义的事件和方法)
  - [使用express实现](#使用express实现)
  - [使用Koa.js实现](#使用koajs实现)
  - [一个简单的静态文件服务器](#一个简单的静态文件服务器)
  - [live server插件](#live-server插件)
- [客户端](#客户端)
  - [使用内置的Fetch()函数](#使用内置的fetch函数)
  - [使用URL()内置函数解析链接](#使用url内置函数解析链接)
  - [对链接中的中文字符进行编解码](#对链接中的中文字符进行编解码)
  - [使用axios发送http请求](#使用axios发送http请求)
- [Net模块：一个简单的多人聊天室案例](#net模块一个简单的多人聊天室案例)
  - [服务端](#服务端-1)
  - [客户端](#客户端-1)
- [Socket](#socket)
  - [服务端](#服务端-2)
  - [客户端](#客户端-2)
- [WebSocket](#websocket)
  - [HTTP协议的问题](#http协议的问题)
  - [服务端](#服务端-3)
  - [客户端](#客户端-3)

##  HTTP协议理论

###  HTTP协议简介
一般而言，网络传输的两端分为客户端和服务器。请求数据的叫做客户端，浏览器就是典型的客户端。接收请求，处理请求，将数据返回的机器叫做服务器。

客户端请求资源，就要用到资源定位符URI，URI是一个明确的地址，通过这个地址就能去到响应的服务器请求资源。

至于这中间是怎么从我们面前的浏览器到达世界另一个地方的服务器的过程比较复杂，包括数据的编码、打包、IP地址查询、路由、DNS轮询、握手、解包等，我们只需要知道有网络基础设施无时无刻都在为我们服务即可。

例如，我们访问百度。在浏览器地址栏输入`https://www.baidu.com`，这就是全球唯一的地址，通过这个地址就可以到达百度的服务器，然后服务器立即响应将HTML页面发回本地，我们就看到了百度的首页。



### 请求与响应报文


客户端发送请求报文，服务器返回响应报文，报文有一定的格式约定，将格式约定好以便于发送和解析，这既是协议。

要查看报文实例，最好的方法是使用浏览器。

使用Edge浏览器，打开百度首页，按F12进入开发者工具，切换到网络选项卡，这时候应该有很多网络传输记录。

在右边的表头选项卡，我们能看到“常规”、“响应标头”、“请求标头”。这就是报文的内容。

我们解释几个典型的参数。

* 请求URL：这就是我们常说的链接，只有通过链接才能拿到资源如HTML页面、文件、图片、视频。
* 请求方法：一般为GET，表示向服务器拿资源。开发中会用到POST表示携带正文向服务器发送。
* 状态代码：表示是成功还是错误，如果是200 OK表示成功返回了正确的资源。如果是4或5开头的代码，表示有错误。
* 远程地址：服务器的IP地址，这个地址是DNS系统通过解析之后得到的机器能够理解的地址。
* 请求标头：请求报文的头部，是对请求报文的概括和描述，如协议版本、能接受的编码等。
* 响应标头：响应报文的头部，是对响应报文的概括和描述，如字节大小等。




- [HTTP协议理论](#http协议理论)
  - [HTTP协议简介](#http协议简介)
  - [请求与响应报文](#请求与响应报文)
- [服务端](#服务端)
  - [使用内置http模块实现一个简单的服务器](#使用内置http模块实现一个简单的服务器)
  - [一个较为典型的示例](#一个较为典型的示例)
  - [response的end和write区别](#response的end和write区别)
  - [request对象](#request对象)
  - [serverResponse对象上定义的事件和方法](#serverresponse对象上定义的事件和方法)
  - [使用express实现](#使用express实现)
  - [使用Koa.js实现](#使用koajs实现)
  - [一个简单的静态文件服务器](#一个简单的静态文件服务器)
  - [live server插件](#live-server插件)
- [客户端](#客户端)
  - [使用内置的Fetch()函数](#使用内置的fetch函数)
  - [使用URL()内置函数解析链接](#使用url内置函数解析链接)
  - [对链接中的中文字符进行编解码](#对链接中的中文字符进行编解码)
  - [使用axios发送http请求](#使用axios发送http请求)
- [Net模块：一个简单的多人聊天室案例](#net模块一个简单的多人聊天室案例)
  - [服务端](#服务端-1)
  - [客户端](#客户端-1)
- [Socket](#socket)
  - [服务端](#服务端-2)
  - [客户端](#客户端-2)
- [WebSocket](#websocket)
  - [HTTP协议的问题](#http协议的问题)
  - [服务端](#服务端-3)
  - [客户端](#客户端-3)


## 服务端

### 使用内置http模块实现一个简单的服务器

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

### 一个较为典型的示例


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


### response的end和write区别

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



### request对象


request.url  路由，排除了https、主机名剩下的部分 例如/ /login  

request.method  请求方法

内置URL模块解析各个部分。

// req.url 是客户端的请求url地址

通过on事件监听来获取数据

### serverResponse对象上定义的事件和方法


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



### 使用express实现

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



###  使用Koa.js实现


Koa -- 基于 Node.js 平台的下一代 web 开发框架。Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

一个简单的web示例如下：

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```


### 一个简单的静态文件服务器



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

###  live server插件

不过在实际生成环境中，更可靠的做法时是在需要开启静态文件服务器的文件夹下打开VSCode，安装live server插件，然后按Ctrl+Shift+P，运行Live Server: Open with Live Server。


##  客户端

### 使用内置的Fetch()函数

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
###  使用URL()内置函数解析链接

浏览器和Node.js都有一个全局类型URL，使用new URL可以新建一个url实例，便于对链接进行解析。

new URL()的第一个参数可以是绝对路径或相对路径，如下是一个绝对路径示例：

```
let url = new URL("https://example.com:8000/path/file.txt?key=value")
```

如果是相对路径，则必须将主机名和端口作为第二个参数：

```
let url = new URL("/path/file.txt?key=value", "https://example.com:8000")
```

生成了url对象后，就可以得到各个部分了，包括：

- url.href： 完整链接，例如https://example.com:8000/path/file.txt?key=value。
- url.host：主机名和端口，例如example.com:8000。
- url.protocol： 协议，例如https。
- url.port：端口，例如8000。
- url.host：主机名，例如example.com。
- url.pathname：路径，例如/path/file.txt。
- url.searchParams：查询参数对象。

查询参数对象url.searchParams是一个包含键值对的对象，可以获取、设置、添加、删除键值对。例如：

```js
// 获取键对应的值：
url.searchParams.get("key")

// 修改键的值：
url.searchParams.set("key","newValue")

// 查看是否存在某个键：
url.searchParams.has("key")

// 添加一个键值对：
url.searchParams.append("ke2","value2")

// 删除一个键值对：
url.searchParams.delete("ke2","value2")
```

###  对链接中的中文字符进行编解码

另外，很多时候需要对链接中的中文字符或空格字符进行编解码，这主要用到两个内置函数：

- encodeURI()	：	将非ASCII字符编码成机器可读的字符。
- decodeURI()	：	将ASCII反转成人类可读的字符。

这两个函数的用法示例如下：

```js
console.log(encodeURI('你好 世界'))  
// out： %E4%BD%A0%E5%A5%BD%20%E4%B8%96%E7%95%8C
//  20%表示空格

console.log(decodeURI('%E4%BD%A0%E5%A5%BD%20%E4%B8%96%E7%95%8C'))
// out： 你好 世界
```

### 使用axios发送http请求

首先引入axios库：

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

如下是一个简单的用法：

```js
axios
      .get("/data.json")
      .then((result) => {
        // result不是直接的返回结果
        console.log(result);
        // result.data才是真正的返回结果
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
```

如下是一个post用法：

```JavaScript
axios.post("/date.json",qs.stringify({ data }))
    .then(res=>{
        console.log(res);            
    })
```


## Net模块：一个简单的多人聊天室案例

###  服务端

```js

const net = require('net');
const server = net.createServer();
const users = [];
server.on("connection", client => {
    // 有新连接时维护进列表，并群发消息
    users.push(client)
    console.log('有新连接')
    users.forEach(user => {
        if (user != client) {
            user.write('有新连接')
        }
    })
    // 有新的数据时，群发消息
    client.on("data", data => {
        console.log(data.toString().trim())
        users.forEach(user => {
            if (user != client) {
                user.write(data.toString())
            }
        })
    })
})
server.listen(8888, () => console.log('服务器已启动'))

```


###  客户端

```JavaScript
const net = require('net');
const client = net.createConnection({host:'127.0.0.1',port:8888})
process.stdin.on('data',data=>client.write(data.toString()))
client.on('data',data=>console.log(data.toString().trim()))
```


##  Socket

###  服务端

Socket通信的服务端代码示例如下：

```JavaScript
const net = require('net')
const server = net.createServer()

// 监听客户端的连接
server.on("connection", client => {

    // 监听客户端的消息：data事件
    client.on("data", data => {
        console.log(data.toString().trim())

        // 发送给客户端
        client.write('服务器已收到')
    })
})
server.listen(8888, () => console.log('服务器已启动'))
```

###  客户端

Socket通信的客户端使用Node.js实现，代码如下：

```JavaScript
const net = require('net')
const client = net.createConnection({host:'127.0.0.1',port:8888})

// 监听客户端命令行的输入：data事件，发送给服务端
process.stdin.on('data',data=>client.write(data.toString()))

// 监听服务端的消息：data事件
client.on('data',data=>console.log(data.toString().trim()))
```



##  WebSocket

###  HTTP协议的问题

HTTP协议有两大特点：
- 无状态的：不保存之前请求的数据。
- 被动的： 服务器被动的接受客户端的请求。

所以，HTTP协议只适用于请求网页、Web API这类情况，不适用于聊天这种情况，因为聊天需要服务器和客户端保持长时间的连接，且要让服务器可以主动向客户端发送数据。

虽然有些方法可以让HTTP协议实现聊天功能，就是轮询。客户端每隔一段时间（例如1秒中）就发送一次请求，看有没有新的消息，这种方式有点取巧，不够直接。

为了实现长连接和双向通信，WebSocket标准应运而生，目前大多数浏览器都能很好的支持WebSocket。


###  服务端

我们使用Nodejs的ws模块实现WebSocket服务器。首先安装ws模块：

```
npm i ws
```

然后编写server.js：

```js
const ws = require('ws')

const wss = new ws.Server({port: 3000})

// 监听connection事件
wss.on('connection', client => {
        
         // 监听message事件
    client.on('message', msg => {
            console.log(`from client:${msg}`)
       client.send(`from server:${msg} has been received`)
    })
})
```

首先导入ws模块，使用Server类指定端口即可开启一个WebSocket Server，一般命名为wss。

wss有一个connection事件，表示监听客户端的连接，当有新的客户端连接时触发。回调函数会传入一个client参数，表示特定的客户端对象。

每个客户端对象都有一个message事件，表示监听客户端的消息。回调函数会传入一个msg参数，表示该客户端发过来的消息。

客户端对象还有一个send()方法，表示发送消息给该客户端。

wss对象还有一个clients成员，这是一个类数组对象，表示所有的客户端对象。利用这个类数组对象的forEach()方法可以实现广播功能，即发消息给所有的客户端，进而实现群聊的功能。

运行 node server.js 就可以开启一个简单的WebSocket服务器。

###  客户端

WebSocket客户端使用浏览器实现，示例如下：

```html
<span>消息输入框：</span>
<input id="input" />

<button onclick="send()">发送</button>
<p>消息列表：</p>
<div id="lists"></div>

<script>

    const client = new WebSocket('ws://localhost:3000')

    // 输入框元素对象
    const input = document.querySelector('#input')
        
         // 发送消息给服务端
    function send() {
        client.send(input.value)
    }

    // 监听message，接收服务器的消息
    client.onmessage = msg => {
        document.querySelector("#lists").innerHTML += msg.data+'<br />'
    }

</script>
```

使用new WebSocket()传入ws协议地址加端口即可连接ws服务器，前提是ws服务器已开启。

示例中的ws是客户端对象，ws.send()表示发送数据到服务器。ws.onmessage监听服务器的消息，并指定如何处理消息。

