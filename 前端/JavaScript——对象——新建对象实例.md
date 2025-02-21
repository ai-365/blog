Object是JavaScript中最常见的数据类型，也是其它引用类型的基类。一个对象实例由一个或多个名 / 值对组成。

创建对象的方法有多种，第一种是使用对象字面量的方式新建一个对象实例：

```js
const obj = {a:1,b:2}
```

第二种方式是使用new Object()创建对象，如下：

```js
const obj = new Object({a:1, b:2})
```
第三种方式是使用Object.fromEntites()创建对象，这个方法接受一个可迭代对象，例如一个二维数组：

```js
const arr = [ ['a',1],['b',2] ]

const obj = Object.fromEnties(arr)

console.log(obj)  // {a:1, b:2}
```

也可以接收一个Map类型的实例，例如：

```js
const map = new Map([ ['a',1],['b',2] ])

const obj = Object.fromEnties(map)

console.log(obj)  // {a:1, b:2}
```

第五种方式是读取一个JSON字符串创建对象，该字符串包裹的是一个对象字面量，也可以是通过Node.js的fs模块的readFileSync()方法从本地某个.json文件读取的。

通过JSON字符串创建对象的示例如下所示：

```js
const str = '{'a':1,'b':2}'

const obj = JSON.parse(str)

console.log(obj)  // {a:1, b:2}
```
