
在Node.js和浏览器环境中均可使用fetch()发送HTTP请求、接收服务器响应，语法相同。

基本示例如下：

```js
const url = 'http://localhost:8080/path1/path2/?key1=value1&key2=value2'

const req = {
    method: 'POST',
    headers: new Headers({}),
    body: 'req body'
}


fetch(url, req)
.then(res => res.text())  // 如果服务器返回JSON对象，则为json()
.then(result => console.log(result))
```

请求方法有两种：GET和POST，如果要携带正文（即请求体），应使用POST方法。

请求头使用new Headers()初始化，然后就可以传入对象了，例如：

```js
new Headers({'Content-Type' : 'text/plain'})
```

请求体是一个JavaScript对象，包括method、headers、body三个属性。其中，headers属性的是是一个Headers对象。

```js
const req = {
    method: 'POST',
    headers: new Headers({})
    body: 'req body'
}
```

fetch()函数返回的是一个期约对象，首先使用then()方法取出请求体，然后再使用then()方法打印请求体，如下示例：
```js
fetch(url, req)
.then(res => res.text())  
.then(result => console.log(result))
```

上面示例中的res对象还可以有如下属性和方法：
- status，取得返回码，如200。
- statusText，取得返回码状态，例如OK。
- headers，取得响应头。
- body， 取得响应体，这是一个ReadableStream对象。
- json()，如果响应体是一个JSON对象，使用该方法可以直接解析为JavaScript对象。
