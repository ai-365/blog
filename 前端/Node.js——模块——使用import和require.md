
由于历史遗留原因，目前在Node环境中，如果要导入模块或其它文件，有两种方式。

require() ：早期方法，也叫cjs（CommanJS）。这种方式在ES6推出之前解决了Node端JavaScript文件模块化问题，当时浏览器还不支持模块化。这种方式，只适用于Node环境，不能用于浏览器，可能会被废弃，官方现在已经不推荐了。

import： ES6语法，也叫ejs（ES Module）。在ES6推出以后，Nodejs也积极拥抱新语法，这种语法通用于Node和浏览器，官方推荐。

还有一种方式叫UMD（Universal Module Definition），试图兼顾cjs和ejs，然而增加了一些复杂度，使得读写变得更加困难。

## 使用import

要使用import关键字，有两种方式：
- 将扩展名改为.mjs，而非.js
- 在同目录下的package.json中，添加一行：`"type" : "module"`。

例如如下 import-example.mjs示例：

```js
// import-example.mjs
import path from 'path'

const p = "D:\\Test\\example.js"
console.log(path.basename(p)) 
```

## 使用require()

要使用require，有两种方式：
- 使用.js扩展名，这是默认的，无需设置。
- 在本目录下的package.json中，添加一行：`"type" : "commonjs"`

例如如下require-example.js：

```js
// require-example.js
const path = require('path')

const p = "D:\\Test\\example.js"
console.log(path.basename(p))
```