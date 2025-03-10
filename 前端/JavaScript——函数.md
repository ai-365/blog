<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [箭头函数](#箭头函数)
- [立执行函数](#立执行函数)
- [默认参数值](#默认参数值)
- [函数的arguments对象](#函数的arguments对象)
- [函数内部的this对象](#函数内部的this对象)
- [参数收集和参数扩展](#参数收集和参数扩展)
- [函数的call()和apply()方法](#函数的call和apply方法)
- [函数的暂时性死区](#函数的暂时性死区)


###  箭头函数


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

### 立执行函数


匿名立执行函数


```
(function() {

  console.log(1)

})()
```


具名立执行函数
```
(function log() {

  console.log(1)

})()

```

传参

```
(function add(a, b) {

  console.log(a + b)

})(1, 2)
```


###  默认参数值


在定义函数时，可以为参数赋予一个默认值。如果调用该函数时没有传递实参，那么就会使用默认值传递，这比以往的默认undefined值更方便了一步。

```js
function  sum(a=0,b=0){
  return a+b
}

console.log(sum())    // => 0
console.log(sum(1))   //=> 1
console.log(sum(1,2)) //=>3
```



###  函数的arguments对象


对于使用了function关键字的函数声明或函数表达式，函数内部有一个arguments对象，这是一个类数组对象，可以通过Array.from(arguments)将其转化为数组。arguments.length表示实参的个数。`arguments[n]`表示第n个参数。

注意，箭头函数没有arguments对象。

有了arguments对象，即便是不写形参，也可以定义函数，例如：

```js
function sum(){
	const result=Array.from(arguments).reduce((prev,cur)=>prev+cur)
	return result
}
 
console.log(sum(1,2))
console.log(sum(1,2,3))
```




### 函数内部的this对象

this，顾名思义，就是“这个”。

this被用在对象的方法中，表示“这个对象”。

函数可以被用作对象的方法。同一个函数，被不同对象调用时，上下文是不一样的，this指代调用的上下文对象。

```js
function sayName(){
	console.log(`I am ${this.name}`)   
}

const zhangsan = {
	name: 'Zhang San',
	sayName: sayName
}
const lisi = {
	name : 'Li Si',
	sayName : sayName
}

zhangsan.sayName()   // I am Zhang San  
lisi.sayName()   // I am Li Si   
```


###  参数收集和参数扩展


定义函数时，如果不确定参数的个数，可以进行参数收集。参数收集的意思是只定义一个参数列表，未来传递实参时，无论参数有多少个，都会作为一个数组传递进来。这样我们就解决了参数个数不确定的问题，例如定义一个求和函数：

```js
functionsum(...values){
     constresult = values.reduce((prev,cur)=>prev+cur)
     console.log(result)
}
```

这里将参数打包成一个数组，函数只针对数组进行处理，规避了参数个数不确定的问题。调用函数时，使用sum(1,2)或者sum(1,2,3,4)都是能进行求和的，因为总是会打包成一个数组处理：

```js
[1,2].reduce((prev,cur)=>prev+cur)
[1,2,3,4].reduce((prev,cur)=>prev+cur)
```

现在，假设有一个现成的数组：

```js
constarr = [1,2,3,4]
```

我们想调用上面定义的sum()函数对其元素进行求和，我们就需要先将这些元素一一取出，再依次传参，就像这样：

```js
sum(arr[0],arr[1],arr[2],arr[3])
```

这无疑是麻烦的，使用扩展操作符，可以自动将数组解包：

```js
sum(...arr)
```

这一行将会被解析为：

```js
sum(1,2,3,4)
```

这就是参数扩展。

另外，请注意，大家可能会跟上面的参数收集搞混，认为直接传数组是可以的，实际上，如果直接传递数组sum(arr)，那么函数体中就会是这样的操作：

```js
[[1,2,3,4]].reduce((prev,cur)=>prev+cur)
```

这是无法求出结果的。

可以看到，参数收集和参数扩展分别用于函数定义和函数调用。一个将形参列表打包，一个用于实参的快速解包。



### 函数的call()和apply()方法

函数的call()方法是另一种形式的函数调用，例如`a.b(1,2)`等价于`b.call(a,1,2)`。

再比如Symbol.iterator.call(arr)。由于这个例子中被调用的函数是System.iterator，中间有个句点，所有只能写成这种形式。

apply()与call()相比只是传参的形式不同。


###  函数的暂时性死区

参数是按顺序被赋值的，因此，前面的参数不可以引用后面的参数的默认值，也不能引用函数体中的成员值，这就是“暂时性死区”规则，例如：

```js
function  example(a=b,  b=1,c=data){
    const data=1
}
```

这段代码有两处错误：
* 参数a不能引用后面的参数b的值
* 参数c不能引用后面的函数体成员data的值

而下面这个例子是正确的：

```js
function  example(a=1 , b=a){
    const data=b
    console.log(data)
}
example()      //=>1
```

其实，简单来讲，所谓**暂时性死区**，不过也遵循了局部作用域的声明规则。使用let和const声明的时候，声明和引用是按顺序来的，即只能先声明后引用，后面的引用前面的，反过来不可以，不存在声明提升。


