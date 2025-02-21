
数值类型是最常见的原始类型，包括整数、浮点数、无穷大（小）、NaN。

使用如下方式新建数值类型的变量：

```js
let num = 1     // 整数
let floatNum = 0.1   // 浮点数
let num=1.0  // 虽然跟了小数点，但依然会被处理成整数
```

NaN是一种特殊的数值，表示运算错误，但不会报错。Infinity表示无穷大，-Infinity表示无穷小，例如：

```js
console.log(0/0)   //=> NaN
console.log(5/0)   // => Infinity，很多语言会报错，但是这里为无穷大
console.log(5/-0)  // => -Infinity
```

有三种函数用于将其它形式的值转为数值，Number()是通用的，可将类似数值的字符串或单数值元素的数组转换为数组。parseInt()和parseFloat()用于将开头是数字而存在非数字的字符串提取成数值，例如：

```js
console.log(Number(true))  // 遇布尔值转为1或0
console.log(Number(null))  // 0
console.log(Number(undefined))  // NaN
console.log(Number('123'))           // =>123
console.log(Number('123 456'))    // => NaN
console.log(Number('123hello'))   // => NaN
console.log(Number(''))  //=>0
console.log(parseInt('123hello'))  //=> 123
console.log(parseFloat('1.23hello')) //=> 1.23
```

由于乘法运算和减法运算在碰到数值时会隐式调用Number()，因此可以使用此方法快速调用Number()，可以看作一种语法糖，例如：

```js
console.log(true * 1)    //=>1，等同于Number(true) 
console.log('123' * 2)   // => 246，等同于Number('123')
```

