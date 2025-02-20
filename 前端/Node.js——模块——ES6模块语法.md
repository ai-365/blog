ESM，即ES Module，在2015年的ES6版本中被推出，这种语法同时支持Nodejs和浏览器环境。

要使用ESM语法，有两种方式：
- 将扩展名改为.mjs。
- 在同目录下的package.json中，添加一行："type" : "module"。


**具名导出**

要导出变量，使用export 关键字加上花括号，填入要导出的对象，用逗号隔开，例如：

```
// export.mjs
const a = 1;
const str = "hello";
const arr = [1,2,3];
const foo = ()=>console.log("hello,world");

export {a,str,arr,foo}
```

请注意，这里的花括号不是对象，这个语法也不是对象简写，只是语法规则规定将要导出的对象写在export {} 中而已。

**具名导入**

如果要导入，使用import关键字和花括号，填入需要导入的对象，用逗号隔开，例如：

```js
// import.mjs
import {a,str,arr,fun} from "./export.js"
console.log(str)
console.log(arr)
foo()
```

如果需要导入所有对象，则可以使用如下语法。

```js
// import.mjs
import * as vars from "./export.js"

console.log(vars.str)
console.log(vars.arr)
vars.foo()
```

有些时候从不同的文件导入同名变量，这时候就发生了命名冲突，可以使用as起个别名：

```js
// import.mjs
import { data as data1 } from "./export1.js"
import { data as data2} from "./export2.js"
 ```


**默认导出**

使用具名导入时，需要查看源文件中导出了哪些对象，需要在import{} 中填入准确的变量名，虽然可以使用as重命名，但终归不是很方便。

为了解决这个问题，可以使用默认导出，使用export default 关键字加上花括号，例如：

```js
// export.mjs
const a = 1;
const b = 2;
const str = "hello";
const arr = [1,2,3];
const foo = ()=>console.log("hello,world");

export default {a,b,str,arr,foo}
```

**默认导入**

在导入时，可以在本文件中使用一个自定义的名称，例如：

```js
import  datas  from './export.js'

console.log(datas.a)
console.log(datas.arr)
datas.foo()
```

在实践中，具名导出导入、默认导出导入均有使用，应熟练掌握。
