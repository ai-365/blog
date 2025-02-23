<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:30vh;left:5vw;font-size:1.5rem ">🔼</a>


- [新建项目](#新建项目)
  - [使用npm新建项目](#使用npm新建项目)
  - [在浏览器环境中使用](#在浏览器环境中使用)
- [定义Style样式](#定义style样式)
- [组件](#组件)
  - [组件是什么？](#组件是什么)
  - [React组件的生命周期](#react组件的生命周期)
- [表单双向绑定](#表单双向绑定)
- [React Hooks](#react-hooks)
  - [useEffect()](#useeffect)
  - [useState()](#usestate)
- [组件传值](#组件传值)
  - [Props](#props)
  - [任意组件间通过Redux传值](#任意组件间通过redux传值)
- [服务端渲染SSR框架：Next.js](#服务端渲染ssr框架nextjs)
  - [基本用法](#基本用法)
  - [动态路由](#动态路由)



##  新建项目

###  使用npm新建项目

运行如下三行命令即可快速新建并启动一个React 项目：

```
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



###  在浏览器环境中使用

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

##  定义Style样式

对于图形界面来说，样式也不可或缺。要为元素定义样式，可以在标签中添加style属性，这与HTML语法类似，但是，有几点不同的是：
1、属性值必须用引号包裹，单双引号都可以；
2、类似background-color包含连字符的属性名，必须写成backgroundColor这种小驼峰；
3、原生的CSS各属性之间是分号，现在必须改成逗号，因为是JS对象。

定义样式的示例如下：

```
export default ()=> 
        <div style={{backgroundColor: 'red', width: '50%', height: '200px'}}>
                Hello, React !
        </div>
```


##  组件

###  组件是什么？

废话少说，重要的事情说三遍，React 组件是什么？
- React 组件是 *返回标签* 的  *JavaScript 函数* 
- React 组件是 *返回标签* 的  *JavaScript 函数* 
- React 组件是 *返回标签* 的  *JavaScript 函数* 

这句话应该背下来，是React组件最精简准确的定义。牢牢记住两个关键词：
- 第一，返回标签
- 第二，JavaScript 函数

也可以用类来定义组件，这类组件被称为类组件。不过，自React Hooks推出后，React官方推荐只使用函数组件，类组件将来可能会被弃用。


可以将应用程序的UI界面拆分成独立可复用的代码片段，即组件，并对每个组件进行开发。组件名称必须以大写字母开头。React会将以小写字母开头的组件视为原生DOM标签。例如，`<div/>`代表HTML标签div，而`<Welcome/>`则代表组件Welcome。

组件从概念上类似与JavaScript函数。它接收任意的入参（props），并返回用于描述页面显示内容的React元素。React元素可以是DOM标签（元素），也可以是用户自定义的组件。当React元素为用户自定义组件时，它会将JSX所接收的属性以及子组件转换为单个对象传递给组件，这个对象被称为props。

定义组件最简单的方式就是编写JavaScript函数，这类组件被称为函数组件。

组件既可以在同一个文件内定义，也可以使用import引入，因为组件是函数，所以导入导出组件遵循导入导出函数的规则。

例如：

```jsx
function Welcome(){
    return (<h1>Hello,World!</h1>)
}

const element = (<Welcome />)
```


接收参数props：


```jsx
function Welcome(props){
    return (<h1>Hello,{props.name} !</h1>)
}

const element = (<Welcome name="张三"/>)
```


组件和组件实例的区别
- 函数是一个组件，应该返回一个DOM结构
- 通过使用尖括号包裹组件名创建一个组件实例
- 组件实例是一个变量，在传递给render函数的参数的定义中，应该使用花括号将该变量包裹

大致步骤为：
1. 声明要挂载的div节点
2. 声明要用到的变量
3. 定义函数组件
4. 声明组件实例化的变量。也可以暂时不实例化
5. 指定要渲染的内容，在其中使用组件实例。也可以在这里直接实例化。
6. 渲染

组件可以在其输出中引用其它组件，于是，可以用同一组件与其他组件组合来抽象出任意层次的细节。



### React组件的生命周期

组件第一次被渲染到DOM中的过程被称为挂载。删除dom中的组件的过程被成为卸载。组件从挂载到卸载及其他环节成为组件的生命周期。可以为组件声明一些特殊的方法，在挂载、卸载组件或组件生命周期中其他时间节点让组件去执行这些方法。这些方法叫做生命周期方法。生命周期方法由React主动调用。每个组件都包含一些默认生命周期方法，也可以重写这些方法，以便在组件的执行过程中执行这些方法。


组件挂载时生命周期方法的调用顺序为：
1. constructor()方法（构造方法）
2. getDerivedStateFromProps()方法
3. render()方法
4. componentDidMount()方法

当组件的参数或状态发生变化时会触发组件进行更新。组件更新时生命周期方法调用顺序为：
1. getDerivedStateFromProps()方法
2. shouldComponentUpdate()方法
3. render()方法
4. getSnapshotBeforeUpdate()方法
5. componentDidUpdate()。

组件卸载时会调用componentWillUnmount()方法。

在渲染过程、生命周期或子组件的构造方法中抛出错误时，会调用getDerivedStateFromProps()方法和componentDidCatch()方法。

**constructor()方法**

如果不需要初始化state和进行方法绑定，就不需要为组件实现构造方法constructor(props)。构造方法constructor(props)可简称为constructor()方法。

Rract组件挂载前会调用它的构造方法。在实现构造方法时，应在其他语句之前调用父类React.Component的super(props)。构造方法通常用于初始化内部state或进行事件处理两种情况。

如果组件需要使用内部state，可直接在构造方法中将this.state赋值初始化为state即可。要避免将props的值赋给state。如果需要在其它方法中为state赋值，应使用setState()方法。

**componentDidMount()方法**

componentDidMount()方法会在组件挂载后被立即调用。依赖于dom节点的初始化代码应该放在此方法中。例如，需要通过网络请求获取数据时，实例化请求的代码就可以放在此方法中。添加订阅功能的代码也适合放在此方法中。如果在此方法中添加了订阅功能，就要在componentWillUnmount()方法中取消订阅。

可以在componentDidMount()方法中调用setState()方法。它将触发额外渲染，此渲染会发生在浏览器更新UI界面之前。如果渲染依赖于其大小或位置的dom节点时，可以使用此方式处理。但须谨慎使用此种编码方式，因为它会导致性能问题。


**componentDidUpdate()方法**

componentDidUpdate()(prevProps, prevState, sanpshot)方法可以简称为componentDidUpdate()方法。componentDidUpdate()方法会在组件更新后被立即调用。首次渲染不会执行此方法。组件更新后，可以在此方法中对dom进行操作。如果需要对更新前后的props进行比较，也可以选择在此方法中进行。

可以在componentDidUpdate()方法中直接调用setState()方法。注意，setState()方法必须被包裹在一个条件语句里：否则，不仅会导致死循环，还会导致额外的重新渲染，影响组件性能。

如果组件实现了getSnapshotBeforeUodate()方法，那么它的返回值将作为componentDidUpdate()的第三个参数snapshot传入。否则，componentDidUpdate()的第三个参数为undefined。如果shouldcomponentUpdate()方法的返回值为false，就不会调用componentDidUpdate()方法。


**componentWillUnmount()方法**

componentWillUnmount()方法会在组件卸载及销毁之前直接调用。可以在此方法中执行必要的清理操作。例如，清除timer、取消网络请求或清除在componentDidMount()方法中添加的订阅等。

注意，不要在componentWillUnmount()中调用setState()方法，因为此时的组件将永远不会重新渲染，且组件被卸载后将永远无法再挂载它。


##  表单双向绑定

表单双向绑定的示例代码如下。注意监听input事件，应该写出onInput。

```JavaScript
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


##  React Hooks

### useEffect()

useEffect()表示在挂载和重新渲染之后执行某些操作。

```js
import { useState, useEffect } from 'react'

export default () => {

    let [count, setCount] = useState(0)

    useEffect(() => console.log('count值已更新为'+ count ))

    return <button onClick={()=>setCount(count + 1)}>点了 {count} 次 ！</button>

}
```



### useState()

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



##  组件传值

###  Props

子组件的示例代码如下：

```
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


###  任意组件间通过Redux传值

首先，定义store仓库：

```
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
```
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
```
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


##  服务端渲染SSR框架：Next.js

### 基本用法

一个页面就导出的react组件，也可以说，一个页面就是一个js、jsx、ts、tsx文件。

每个页面都使用其文件名作为路由。

如果在pages目录下创建了demo.js，内容如下：

```js
export default function Demo(){
    return <h1>Demo Page</h1>
}

```

那么该页面就可以通过/about访问。

### 动态路由

用方括号封装文件夹名，

```
// pages/users/[name].js
 
import { useRouter } from 'next/router'
 
export default function User() {
  const router = useRouter()
  const { name } = router.query
 
  return <h1>hello, {name}</h1>
}

```

这样一来，就会根据URL具体路径动态的返回页面内容。例如访问/users/zhangsan，就会返回`<h1>hello, zhangsan</h1>`，访问/users/lisi，就会返回`<h1>hello, lisi</h1>`。