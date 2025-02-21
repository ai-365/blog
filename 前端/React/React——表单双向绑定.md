
```

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