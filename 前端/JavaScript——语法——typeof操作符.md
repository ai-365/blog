
由于Javascript的类型是松散的，不像静态语言那样需要事先声明，Javascript会根据数据值本身去推导数据类型，typeof操作符就是为此而生的。

对一个值使用typeof操作符会返回如下结果之一：
* "undefined" : 未定义的值
* "boolean" : 布尔值
* "string" : 字符串 
* "number" : 数值
* "object" : 表示值为对象(非函数)或null
* "function" : 表示值为函数
* "symbol" ：表示值为符号

typeof更适合用来区分原始值的具体类型，它并不会区分一个引用值是数组还是对象，这两个类型都会返回object。

一些使用示例如下：

```js
console.log(typeof 1)  // number
console.log(typeof "hello") // string
console.log(typeof true) // boolean
console.log(typeof NaN)  // number
console.log(typeof [])  // object
console.log(typeof {})  // object
```

