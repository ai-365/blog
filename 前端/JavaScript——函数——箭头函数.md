
箭头函数省去了function关键字，改而使用胖箭头来隔开参数列表和函数体：

```js
let fun = (arg1,arg2,...) =>{ 
    // statements
}
```

箭头函数通常被当作参数传递给其它函数使用，例如：

```js
const  arr=[1,2,3]
arr.forEach(x=>x*2)
console.log(arr)  //=>[2,4,6]
```

使用箭头函数有几个注意事项。

第一，当参数只有一个参数时，可不加圆括号。没有参数或者多于1个参数，都需要加圆括号，例如：

```js
const  fun1 = x=>x+1  // 只有一个参数
const  fun2 = ()=>1   // 没有参数
const  fun3 = (x,y)=>x+y  // 多于一个参数
```

第二，当箭头函数的函数体只有一行，并且这一行是赋值、打印、返回值的时候，不能加花括号，也不能写return，例如：

```js
// 这两种写法都是错的：
const  fun1= x => return x+1
const  fun2= x => {return x+1}

// 这三种写法是对的：
const  fun3= x =>x+1
const  fun4= x =>console.log(x)
const  fun5= x =>x.a=1
```

第三，当箭头函数的函数体只有一行，并且这一行返回一个对象时，需要在花括号两边加上圆括号，例如：

```js
const fun = () => ({a:1,b:2})
console.log(fun())  // {a:1,b:2}
```

