<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;top:60vh;font-size:1.5rem ">🔼</a>

- [通用概念](#通用概念)
  - [触发器](#触发器)
  - [函数处理程序](#函数处理程序)
  - [event](#event)
- [运行时](#运行时)
  - [Node.js运行时](#nodejs运行时)
  - [Python运行时](#python运行时)
- [控制台操作](#控制台操作)
  - [新建一个阿里云函数](#新建一个阿里云函数)


##  通用概念

### 触发器

函数计算是事件驱动的云服务，因此要执行一个函数，就必须要有一个事件发生，这个事件叫做“触发器”。

- 云产品事件：例如存储桶中新增了一个文件。
- HTTP事件 ：使用浏览器、API、SDK发送HTTP请求时触发。

一个触发器加上一个请求处理程序就组成了一个可以提供服务的函数。

### 函数处理程序

一个触发器对应一个请求处理程序handler。handler包括一个文件名和方法名。

对于Python而言，请求处理程序格式为`文件名.方法名`，例如文件名是main.py，方法名为handler，那么请求处理程序为main.handler。

对于Node.js而言，请求处理程序为`文件名.方法名`，例如文件名是index.js，方法名为handler，那么请求处理程序为 index.handler。


###   event

event 为调用函数时传入的参数。即响应报文的body，用JSON格式表示。

通过json模块的loads()方法可以将JSON对象转化成Python对象：

```
eventObj = json.loads(event)
```
##  运行时

### Node.js运行时

```
// index.mjs
export const handler = async (event, context) => {
    const eventObj = JSON.parse(event)
    
    // 请求体
    const body = eventObj.body
    return body
}
```

关键信息说明如下：
- handler ： 方法名称。例如，为FC函数配置的请求处理程序为index.handler，那么函数计算的入口就是index.mjs中的handler函数。
- event ：请求信息，包含了请求头、请求体等关键信息，格式为JSON文本。 
- context ：函数的执行环境信息。例如运行时、内存大小等。
- return ： 作为响应报文的响应体返回给客户端。

### Python运行时

使用HTTP请求处理程序前，请确保已经为函数配置**HTTP触发器**。

一个简单的HTTP处理函数示例如下：

```
def handler(event, context):
    return 'hello world'
```



##  控制台操作

###  新建一个阿里云函数

登录阿里云后，来到函数计算控制台。

选择左侧的函数选项卡，点击右侧的“创建函数”：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1949a7204d2c43debbae20fa98406c1c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWkzNjU=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIxMzgwMTc4OTE2NTM1MSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1740839319&x-orig-sign=JMEFvLjB2P15wqOoFOMX5jqKnmI%3D)

选择Web函数，在“基本设置”中输入函数名称：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a0b593f033e3462f8626f051c3e3c278~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWkzNjU=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIxMzgwMTc4OTE2NTM1MSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1740839319&x-orig-sign=%2ForS7%2BjlA8alTsRMzPPmSEC%2FuG8%3D)

选择自定义运行时Node.js20。

注意内置运行时Node.js20和自定义运行时Node.js20的区别。

内置运行时会调用index.handler，代码编写方式遵循函数计算的习惯。而自定义运行时可以使用熟悉的Node.js http代码编写方式。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/92bc61f7b8e74dbf9e3be25c13a4312e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWkzNjU=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIxMzgwMTc4OTE2NTM1MSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1740839319&x-orig-sign=uKtx0gSl0Fam2jFmO4SLYdlj8Ok%3D)

点击“创建”，函数就创建好了，但还要继续配置。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/eb029511c269483fbc33473a676e35b9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWkzNjU=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIxMzgwMTc4OTE2NTM1MSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1740839319&x-orig-sign=PPqFcwRkVyvItrLrB6UEOjO%2BbNA%3D)

首先来到“配置”-“运行时”选项卡，点击编辑，将启动命令修改为“node server.mjs” ，文件名可以自己取，但要和将要编辑的文件名一致。

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/f02389a36bfd4fb0aef051e0cba1256a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWkzNjU=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIxMzgwMTc4OTE2NTM1MSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1740839319&x-orig-sign=3aBFqWarMxtMbGjW7tD5%2FXYeJ2s%3D)

编辑好后别忘了点击部署保存配置：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3edf42fa55854ddd989fd13b3869633e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWkzNjU=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIxMzgwMTc4OTE2NTM1MSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1740839319&x-orig-sign=PXFXxxrNLr6QwBOlzn3HeMOGU2k%3D)

现在，终于可以编辑代码了。删除所有默认的文件，新建一个文件，文件名称是我们刚刚在“运行时”选项卡里设定的server.mjs。然后，在编辑区中输入如下代码。

server.mjs的代码如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/bb14a9984fb04faeaa5f026c9a79c806~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgYWkzNjU=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDIxMzgwMTc4OTE2NTM1MSJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1740839319&x-orig-sign=RJ7sg5n3I%2FD2CNZ8ZJJ8aqv8F28%3D)

```JavaScript
import http from 'http'

http.createServer(async (req, res) => {
  
  // 允许跨域访问
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应体为纯文本，UTF8编码
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  
  res.write("你好")
  res.end()
  
}).listen(9000, () => console.log(`9000端口已启动`) )
```

客户端.html的代码如下

```html
<script type="module">
    const 响应 = await fetch('https://test-vmghpmpxoo.cn-hangzhou.fcapp.run')
    const 响应体 = await 响应.text()
    document.write(响应体)
</script>

```

注意type="module"标记以开启顶层await特性。
