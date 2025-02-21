
#  React 基础

###  在HTML页面中直接引入React

-  引入react.js
-  引入react-dom.js
-  引入babel.js

在页面使用React的简单示例：

```html
<head>
    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone/babel.min.js"></script>
</head>

<body>
    <div id="root"></div>

    <script type="text/babel">
        const container = document.getElementById('root')
        const root = ReactDOM.createRoot(container)
        root.render(<h1>hello</h1>)
    </script>

</body>
```




###  新建并启动React项目

运行如下三行命令即可快速新建并启动一个React 项目：

```sh
npx create-react-app my-app
cd my-app
npm run start
```

这会初始化一个新项目，my-app就是项目和文件夹的名称，然后下载相关的依赖，运行 npm run start 命令会自动打开浏览器，呈现React项目默认页面。

React主要的入口文件包括：
- ./src/App.js ：这个文件是根组件，其它的组件都会被导入到这里。
- ./src/index.js： 入口脚本。作用是导入react包，挂载和渲染根组件到页面的某个元素上。
- ./public/index.html： 入口页面。有一个id为root的div，React将会挂载到这个元素下面。

现在，编辑./src/App.js文件内容如下：

```js
export default ()=> <h1>Hello, React !</h1>
```

浏览器会自动刷新为新的内容。

###  控制样式

对于图形界面来说，样式也不可或缺。要为元素定义样式，可以在标签中添加style属性，这与HTML语法类似，但是，有几点不同的是：
1、属性值必须用引号包裹，单双引号都可以；
2、类似background-color包含连字符的属性名，必须写成backgroundColor这种小驼峰；
3、原生的CSS各属性之间是分号，现在必须改成逗号，因为是JS对象。

定义样式的示例如下：

```js
export default ()=> 
        <div style={{backgroundColor: 'red', width: '50%', height: '200px'}}>
                Hello, React !
        </div>
```

###  使用 React 实现表单双向绑定

```js
import { useState } from 'react'

export default ()=> {
    const [msg, setMsg] = useState('')
    // 处理输入框的Change事件
    // event.target 表示事件发生的源头，这里就是输入框
    function handler(event) {
        setMsg(event.target.value)
    }

  return <>
    {/* 输入框内容改变时会不断触发Change事件 */}
    <input onInput={handler} />
    <div>输入的内容是：{msg}</div>
  </>
}
```
