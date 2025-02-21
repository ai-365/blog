在很多时候，对象的属性值是一个变量标识符，而这个标识符和属性名是一样的，例如：

```js
const a = 1
const b = 2

const obj = {a:a, b:b}
console.log(obj)  // {a:1, b:2}
```

这种情况下，可以使用一种简化的语法，如下：

```js
const a = 1
const b = 2

const obj = {a , b}
console.log(obj)  // {a:1, b:2}
```
