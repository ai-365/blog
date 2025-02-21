

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