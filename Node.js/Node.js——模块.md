<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [NPM的使用](#npm的使用)
- [模块查找规则：无歧义的路径](#模块查找规则无歧义的路径)
- [import 和 require](#import-和-require)
  - [使用import](#使用import)
  - [使用require()](#使用require)
- [模块语法](#模块语法)
  - [CommanJS模块语法](#commanjs模块语法)
  - [ESM模块语法](#esm模块语法)
  - [注意：应该使用明确的相对路径](#注意应该使用明确的相对路径)


## NPM的使用

npm是Node.js官方的包管理器工具，默认随着node一起安装，无需单独安装。可以运行npm -v确认是否已安装。

在确认npm安装后，一般需要更换镜像源以加速下载，运行如下命令更换为阿里云的npm镜像源：

```sh
npm config set registry https://registry.npmmirror.com/ 
```

运行如下命令，如果输出新的镜像地址则表示镜像源更换成功：

```sh
npm config get registry
```

通常，在项目根目录下，有一个package.json文件，文件中有scripts项，使用如下命令运行脚本：

```sh
npm run 脚本名称
```

在scripts之下，可以添加一个条目，条目的属性名为脚本名称，属性值为要运行的命令，例如：

```sh
"hello":"echo hello"
```

此时，运行 npm run hello，命令行会执行echo hello。

有些比较大的npm包会自带二进制命令，如果是本地安装的（本地安装的意思是将文件下载到当前目录下），二进制命令会被放在./node_modules/.bin目录下，无需将该目录下的命令添加到系统PATH环境变量，直接使用如下命令运行二进制程序：

```sh
npx 二进制命令名称
```

上述命令只能在二进制命令所在的项目目录内运行。如果是经常需要使用的命令，那么推荐全局安装，此时在任意目录内都可以运行。
## 模块查找规则：无歧义的路径

例如，下面这种方式是没有歧义的，就表示当前目录下的xxx.js。
require('./xxx.js');

如果是require(‘./xxx’)呢？

- 第一步，在同目录找同名js文件，就是找有没有xxx.js，如果没有，进行下一步。不过，要说明的是，有些工具会找同名的其它文件，如xxx.css等。
- 找xxx文件夹，如果有文件夹，看里面有没有有package.json，根据main属性得到入口文件，如果没有，则找index.js。
- 以上都没成功，就会报错。



require('xxx')

第一步，找内置模块 xxx

第二步，找同目录node_modules文件夹下的xxx文件夹，找到了就下一步

第三步，在xxx文件夹里找package.json，根据main获取入口文件，如果没有main属性则找index.js，如果都不存在，这个文件夹就不是的。

第三步，往上递归到父文件夹，重读第二第三步。不成功就继续往上递归，一直递归到磁盘根目录。

如果磁盘根目录也找不到，则找用户文件夹下的node-modules，重复第三步。

以上就是node会去依次查找的node_moudules文件夹，node在名字匹配的文件夹内会按package.json-main属性-index.js的顺序排查。

如果所有的node_modules文件夹都找遍了，都没成功，则报错。



## import 和 require

由于历史遗留原因，目前在Node环境中，如果要导入模块或其它文件，有两种方式。

require() ：早期方法，也叫cjs（CommanJS）。这种方式在ES6推出之前解决了Node端JavaScript文件模块化问题，当时浏览器还不支持模块化。这种方式，只适用于Node环境，不能用于浏览器，可能会被废弃，官方现在已经不推荐了。

import： ES6语法，也叫ejs（ES Module）。在ES6推出以后，Nodejs也积极拥抱新语法，这种语法通用于Node和浏览器，官方推荐。

还有一种方式叫UMD（Universal Module Definition），试图兼顾cjs和ejs，然而增加了一些复杂度，使得读写变得更加困难。

### 使用import

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

### 使用require()

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
## 模块语法

###   CommanJS模块语法

CommanJS语法也叫cjs。这种方式在ES6推出之前解决了Node端JavaScript文件模块化问题，当时浏览器还不支持模块化。这种方式，只适用于Node环境，不能用于浏览器。

要使用CommanJS语法，有两种方式：
- 使用.js或.cjs扩展名。
- 在本目录下的package.json中，添加一行：`  "type" : "commonjs" ` 。

要使用CommanJS语法，将需要导出的值用逗号分隔、花括号包裹，然后赋给module.exports，示例如下：

```js
const a =1 
const foo=()=>console.log('hello,world')

module.exports = {a,foo}
```

导入时，可以作为一个整体对象导入，其成员就是被导入文件导出的对象。如下示例：

```js
const datas = require('./export.js')
datas.foo()
```

也可以只导入部分变量，如下示例：

```js
const {foo} = require('./export.js')
fun()
```

###   ESM模块语法

ESM，即ES Module，在2015年的ES6版本中被推出，这种语法同时支持Nodejs和浏览器环境。

要使用ESM语法，有两种方式：
- 将扩展名改为.mjs。
- 在同目录下的package.json中，添加一行：` "type" : "module" ` 。

ESM语法主要包括：
-  具名导出
-  具名导入
-  默认导出
-  默认导入

要导出变量，使用export 关键字加上花括号，填入要导出的对象，用逗号隔开，例如export.mjs文件：

```js
const a = 1;
const str = "hello";
const arr = [1,2,3];
const foo = ()=>console.log("hello,world");

export {a,str,arr,foo}
```

请注意，这里的花括号不是对象，这个语法也不是对象简写，只是语法规则规定将要导出的对象写在export {} 中而已。

如果要导入，使用import关键字和花括号，填入需要导入的对象，用逗号隔开，例如// import.mjs：

```js
import {a,str,arr,fun} from "./export.js"
console.log(str)
console.log(arr)
foo()
```

如果需要导入所有对象，则可以使用如下import.mjs文件中的语法。

```js
import * as vars from "./export.js"

console.log(vars.str)
console.log(vars.arr)
vars.foo()
```

有些时候从不同的文件导入同名变量，这时候就发生了命名冲突，可以使用as起个别名，如下import.mjs文件：

```js
import { data as data1 } from "./export1.js"
import { data as data2} from "./export2.js"
 ```

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

在默认导入时，可以在本文件中使用一个自定义的名称，例如：

```js
import  datas  from './export.js'

console.log(datas.a)
console.log(datas.arr)
datas.foo()
```

在实践中，具名导出导入、默认导出导入均有使用，应熟练掌握。

### 注意：应该使用明确的相对路径

很多人在导入模块的时候，文件路径可能会写成“export.js”，而不是“./export.js”，这是错误的。无论使用ES6语法，还是使用CommanJS语法，在导入具体的同目录文件时，应该始终带上“./”，不能省略！

原因就在于Node.js的一个重要特性：

```
如果没有明确的相对和绝对路径，Node.js会识别为模块，自动递归往上查找node_modules目录。
```

这里的“明确”的意思是，使用./ ../开头表示相对路径，使用/（Linux平台）、`D:\`（Windows）开头表示绝对路径。 

其它很多技术如HTML中的相对文件路径可以省略“./”，这不会有问题。像下面这样：

```html
<img src="1.png"/>
```

但是在Node中却有歧义，Node并不知道你指的是同目录文件还是node_modules下的文件。

现在做个测试，假设当前目录结构如下：

```js
import.js
export.js
node_modules
	export.js
```

./export.js文件内容是：

```js
const str = "我来自./export.js"

module.exports = {str}
```

./node_module/export.js 文件内容是：
```js
const str =  "我来自./node_modules/export.js"

module.exports = {str}
```

./import.js文件内容是：

```js
const {str} = require('export.js')
console.log(str)
```

你认为会输出什么？许多人可能直观感受是导入了本目录下的文件，其实不是！Node不会认为这是这是本目录文件！Node会从node_modules开始查找，所以输出的结果是：

```
我来自./node_modules/export.js
```

另外，很多时候也省略了.js 后缀，这是允许的，Node会优先补全.js然后查找，如果找不到，则会任务是模块的文件夹，然后根据模块的规则引入。