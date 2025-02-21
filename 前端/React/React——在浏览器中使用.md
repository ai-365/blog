
## 在浏览器环境中使用

React 也可以直接在HTML页面中引入，适用于测试与学习场景。首先需要引入三个js文件
- react.js
- react-dom.js
- babel.js： 用于处理JSX语法

这需要通过在页面前面引入如下三个script，这一步非常关键，React仓库有不同的文件，一定要引入适用于浏览器的正确文件，检验方式是在浏览器中输入脚本地址，看打开的是否直接是js源代码，如果不是，则脚本引入错误。

```js
<script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
```

这样就可以直接使用ReactDom这个对象了。在body中写入一个div作为根元素，然后写一个script脚本，注意type一定要设为“text/babel”，否则不会解析JSX语法。示例如下：

```html
<div id="root"></div>
<script type="text/babel">
  const root = document.getElementById("root") // 获取要挂载React应用的根div
  function App(){return (<div><h1>Hello,React</h1></div>)} // 根组件
  ReactDOM.createRoot(root).render(<App />) // 挂载
</script>
```

需要提醒的是，ReactDom.createElement()方法即将取消，推荐使用新语法ReactDom.createRoot()。

在浏览器引入React18的完整代码示例如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>浏览器引入React18代码示例</title>
    <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>

</head>

<body>
    <div id="root"></div>
    <script type="text/babel">
        const root = document.getElementById("root") // 获取要挂载React应用的根div
        function App(){return (<div><h1>Hello,React</h1></div>)} // 根组件
        ReactDOM.createRoot(root).render(<App />) // 挂载
    </script>
</body>

</html>
```