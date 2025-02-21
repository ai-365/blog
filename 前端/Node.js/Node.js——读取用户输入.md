
很多时候需要从控制台读取用户输入，这时候需要用到readline模块，示例如下：

```js
const readline = require("readline")
// 创建一个读取对象rl
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
rl.question("请输入： ", data => {
        console.log('你输入的是：' + data)
        rl.close() // 关闭rl
    })
```

也可以读取多个值，方法是嵌套调用rl.question()，示例如下：

```js
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
rl.question("请输入a的值： ", a => {
    rl.question("请输入b的值：", b => {
        console.log('a的值是：' + a)
        console.log('b的值是：' + b)
        rl.close()
    })
})
```