
如果对象obj不存在属性c，则obj.c返回undefined。而如果继续对obj.c读取属性，例如obj.c.d，则此时会报错，使用EcmaScript 2020新增的可选链(?.)特性， 可以解决这个报错的问题。如下示例：

```js
const obj = {a:1,b:2}
console.log(obj.c)  // undefined
console.log(obj.c.d)  // 报错，因为obj.c为undefined
console.log(obj?.c?.d)  // 存在属性则返回，不存在则会返回undefined，而不会报错 
```

可选链加强了程序的健壮性，无需开发者手动处理潜在的报错问题。

