

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


