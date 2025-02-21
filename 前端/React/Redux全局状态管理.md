
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


