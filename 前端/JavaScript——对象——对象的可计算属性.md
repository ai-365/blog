对象的可计算属性是ES6新增的特性。有些情况下，属性名是一个变量，无法使用点号语法得到属性值，此时可以使用方括号的方式读取属性，例如：

```js
const key1 = 'a'
const key2 = 'b'
const obj = {}

obj[key1] = 1
obj[key2] = 2

console.log(obj)   // {a:1, b:2}
```

使用中括号的优势是可以通过变量访问属性。

对于一个确定的属性名称，除了使用点号外，也可以使用中括号读取属性，但此时需要使用引号：

```js
const obj = {}

obj['a'] = 1
obj['b'] = 2
console.log(obj)  // {a:1, b:2}
```
