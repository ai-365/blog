
# React

##  React 基础

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

##  组件间通信

### 父子组件间通过 Props 通信

子组件的示例代码如下：

```js
// Props 子组件
export default ({ count, handleClick }) => {

  return <>
    <button onClick={handleClick}>
      点了 {count} 次
    </button>

  </>
}
```

父组件的示例代码及注释如下：

```js
// Props 父组件
// 由于用到了组件状态，所以需要导入useState
import { useState } from 'react'

// 导入子组件
import Prop子组件 from './Prop子组件'

// 定义、默认导出组件
export default ()=> {

  // 组件函数内部
  // 定义变量
  const [count, setCount] = useState(1)

  // 定义处理函数
  function handleClick() {
    setCount(count + 1)
  }

  // 返回单标签包裹的JSX
  return <>
    <h1>使用Prop进行传值</h1>
    下面两个按钮都是子组件：<br/>
    <Prop子组件 count={count} handleClick={handleClick} />
    <Prop子组件 count={count} handleClick={handleClick} />
  </>

}
```


###   任意组件间通过 Redux 通信

首先，定义store仓库：

```js
// 引入createStore
import {createStore} from 'redux'

// 定义修改器
// state表示当前状态
// action表示携带通信数据的事件
function reduce(state,action){
    // 数据改变了，被赋予了事件的新值payload
    // payload命名只是习惯，可以是其它名称
    state.data = action.payload
    // 返回一个新的状态
    return state
} 

// 传入修改器定义中心仓库Store
// 第二个参数表示state初始值
// 注意，一定要定义初始值
const store = createStore(reduce,{data:''})

export default store

// Store和state的区别：
// Store是仓库对象
// state是仓库对象的某一时刻的数据快照

// Store的三大核心用法:
// dispatch()
// subscribe()
// getState()
```

然后，定义事件触发端：

```js
import Store from "./定义Store仓库";

export default ()=>{
    function handler(event){
        // 只要输入框内容改变就会触发，输入内容作为action的payload
        Store.dispatch({type:'msg',payload:event.target.value})
    }
    return <>
        <h2>事件触发端：</h2>
        请输入:<input autoFocus id="input" onInput={handler}/><br/>
    </>
}
```

然后，定义事件接收端：

```js
import { useState } from "react";
import Store from "./定义Store仓库";

const style={
    width:'300px',
    height:'100px',
    background:'hsl(90,50%,90%)',
    padding:'10px',
}

export default ()=>{
    const [info,setInfo] = useState('')

    // 中心仓库监听变化，一旦数据更新则执行函数
    // getState()方法获取最新的数据
    Store.subscribe(()=>setInfo(Store.getState().data))
    return <>
        <h2>事件接收端：</h2>
        <div style={style}>{info}</div>
    </>
}
```


##  React Hooks

###    useState()

useState()函数返回一个包含两个值的数组：变量和更新该变量的函数。变量的初始值就是useState()的第一个参数。

变量更新函数接收一个参数作为该变量的新的值，更新函数每执行一次，组件就重新渲染一次。

useState()的语法如下：

```js
let [some, setSome] = useState(initValue)
```

some 表示一个变量名。setSome表示更新该变量的函数，每触发一次该函数，组件就重新渲染一次。该函数名也可以是其它写法，不过一般是set小驼峰的形式。initValue表示初始值，应该根据变量赋一个对应类型的初始值。由于变量值会改变，所以不要使用const，而应该使用let。

如下示例定义多个变量：

```js
let [count,setCount] = useState(0)
let [name,setName] = useState("")
let [arr,setArr] = useState([])
```

一个使用useState的组件示例如下，当单击按钮时，调用变量更新函数，组件重新渲染，其中的内容改变。

```js
// 导入 useState，注意加花括号
import { useState } from 'react'
export default () => {

     let [count, setCount] = useState(0)

   return <button onClick={()=>setCount(count + 1)}>点了 {count} 次 ！</button>
    
}
```


有几个注意的点：

- 使用之前必须导入useState、useEffect；
- useState()和useEffect()必须写在组件的内部；
- 使用按钮点击事件时，必须写成onClick小驼峰形式，onclick写法在React中是错的；
- onClick的值是函数名称，一定不能加括号。

###  useEffect()


useEffect()表示在挂载和重新渲染之后执行某些操作。

```js
import { useState, useEffect } from 'react'

export default () => {

    let [count, setCount] = useState(0)

    useEffect(() => console.log('count值已更新为'+ count ))

    return <button onClick={()=>setCount(count + 1)}>点了 {count} 次 ！</button>

}
```


# Next.js

一个页面就导出的react组件，也可以说，一个页面就是一个js、jsx、ts、tsx文件。

每个页面都使用其文件名作为路由。

如果在pages目录下创建了demo.js，内容如下：

```js
export default function Demo(){
    return <h1>Demo Page</h1>
}
```

那么该页面就可以通过/about访问。

## 动态路由

用方括号封装文件夹名，

```js
// pages/users/[name].js
 
import { useRouter } from 'next/router'
 
export default function User() {
  const router = useRouter()
  const { name } = router.query
 
  return <h1>hello, {name}</h1>
}

```

这样一来，就会根据URL具体路径动态的返回页面内容。例如访问/users/zhangsan，就会返回 ` <h1>hello, zhangsan</h1> ` ，访问/users/lisi，就会返回 ` <h1>hello, lisi</h1> ` 。
