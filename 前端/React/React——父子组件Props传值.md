
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
