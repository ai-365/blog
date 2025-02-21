
# HTTP

###   快速启动静态文件服务器


快速起一个静态文件服务器：

```sh
python -m http.server 65000
```

###   使用FastAPI实现HTTP服务器

FastAPI是Python 的第三方库，用于实现HTTP服务器。如下是一个简单的示例：


```py
import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse 
import json

app = FastAPI()

@app.get("/")
async def get():
        return "Hello,World"

# 启动
if __name__ == "__main__":
    import uvicorn
    # 启动服务，注意app值为——入口文件:入口函数
    uvicorn.run(app='server:app', host="127.0.0.1", port=8080)

```

如下示例接收一个Post请求：
```py
import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse 
import json

app = FastAPI()

@app.post("/post")
# request形参表示请求体，会自动把json转为dict
async def post(request:dict):
        print(request)
        headers = {"Content-Type":"application/json"}
        # 内容为json格式，要与Content-Type 对应
        content = '{"key":"value"}'
        # 返回的消息要包括：状态码、响应头、响应体
        return JSONResponse(status_code=200, headers=headers, content=content)

# 启动
if __name__ == "__main__":
    import uvicorn
    # 启动服务，注意app值为——入口文件:入口函数
    uvicorn.run(app='server:app', host="127.0.0.1", port=8080)

```


###   使用requests模块发送请求

一个典型的HTTP请求包括如下四个组成部分：

-  Method
-  URL
-  headers
-  body

发送post请求：

```py
import requests

url = 'http://127.0.0.1:8080/post'
headers = {'Content-Type': 'application/json'}
body = '{"key":"value"}'

response = requests.post(url, headers=headers, data=body)

# 打印响应码
print(response.status_code)
# 200

print(response.json())
```

发送get请求：

```py
import requests

url = 'http://127.0.0.1:8080/post'
headers = {'Content-Type': 'application/json'}

response = requests.get(url, headers=headers)

# 打印响应码
print(response.status_code)
# 200

print(response.json())
```


###   在flask中构造json响应体

在Web开发中，我们经常需要将列表数据封装到HTTP响应中返回给客户端。假设有一个API端点负责返回用户列表：

```py
from flask import jsonify

users = [
    {'id': 1, 'name': 'Alice'},
    {'id': 2, 'name': 'Bob'},
]

@app.route('/users')
def get_users():
    return jsonify(users=users)
```

# Jinja2

Jinja2是一种模板语言，类似于 f 字符串或者format()函数，可以将包含变量的字符串或HTML模板文件渲染成最终的文本。

##   渲染模板字符串

```py
from jinja2 import Template
template = Template('Hello {{ name }}!')
template.render(name='John Doe')
# Hello，John Doe
```

通过创建一个 Template 的实例，你会得到一个新的模板对象，提供一 个名为 render() 的方法，该方法在有字典或关键字参数时调用 扩充模板。字典或关键字参数会被传递到模板，即模板“上下文”。

##  渲染模板HTML

首先创建一个HTML文件，将需要解析的变量使用双花括号包裹，示例如下：

```html
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
</body>
</html>

```

然后，传入变量的实际值，示例如下：

```py
# 创建一个 Environment 对象，指定模板文件的路径
env = Environment(loader=FileSystemLoader('templates'))
# 加载模板文件
template = env.get_template('example.html')
# 渲染模板，传入变量的值
html = template.render(title='Python Jinja2', content='This is a blog about Python Jinja2.')
# 打印渲染后的 HTML 字符串
print(html)

```

可以得到如下标准的HTML内容输出：

```html
<html>
<head>
    <title>Python Jinja2</title>
</head>
<body>
    <h1>Python Jinja2</h1>
    <p>This is a blog about Python Jinja2.</p>
</body>
</html>

```


##   使用flask和jinja2渲染模板HTML

在使用模板引擎（如Jinja2）构建动态网页时 ，列表数据常被用来生成表格、列表项等重复结构。例如下面的HTML模板文件：

```html
<!-- users.html -->
<ul>
{% for user in users %}
  <li>{{ user.name }} (ID: {{ user.id }})</li>
{% endfor %}
</ul>
```

在flask后端：

```py
from flask import render_template

@app.route('/users')
def show_users():
    users = [
        {'id': 1, 'name': 'Alice'},
        {'id': 2, 'name': 'Bob'},
    ]
    return render_template('users.html', users=users)
```
