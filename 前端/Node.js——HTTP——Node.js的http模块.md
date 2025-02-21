
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