通常情况下，对象的属性名是明确的字面量，这时候时候点号选取对象属性，读取或写入属性的值，例如：

```js
const obj = {a:1, b:2}
console.log(obj.a)

obj.a = 2
console.log(obj.a)
```

使用点号可以连续读取属性，例如：

```js
const obj = {a:{a:1,b:2}, b:2}

console.log(obj.a.a)
```

这里的两个属性名a并不冲突，因为它们从属于不同的对象命名空间。
