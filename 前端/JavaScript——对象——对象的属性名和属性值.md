
使用点号可以访问或者设置对象的属性值：

```js
const obj = {a:1,b:2}
console.log(obj.a)
obj.a=2
comsole.log(obj)
```

除了点号，还可以使用中括号访问或设置对象的属性值，注意需要对属性名使用引号：

```js
const obj = {a:1,b:2}
console.log(obj["a"])  
``` 

以上两种方式适用于属性名是字面量的情况下，如果属性名是个变量标识符，那么只能使用中括号，且不能加引号，例如：

```js
const key1='a'
const key2='b'
const  obj = {}
obj[key1]=1   // 解析为obj["a"]=1
obj[key2]=2 // 解析为obj["b"]=2
```

对象的属性值也可以是变量，例如：

```
const a=1
const b=2
const obj={a:a,b:b}
// 解析为 const obj={a:1,b:2}
```

对象的成员不仅可以是变量，也可以是函数。按照习惯，在对象中，变量被称呼为属性，函数被称呼为方法。例如：

```js
const obj = {
  a:1 ,
  b:2,
  c:function(){
    console.log('hello,world')
  }
}
```

在上面的代码中，对象实例obj有两个属性a和b，有一个方法c()。
