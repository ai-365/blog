<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [期约](#期约)
- [async](#async)
- [期约的实例方法和期约链](#期约的实例方法和期约链)
- [顶层await](#顶层await)



## 期约

期约是为了简化异步编程而设计的语言特性。

使用new Promise()构造函数可以新建一个期约，该函数接收一个函数作为参数，我们先传入一个空函数：

```js
const p=new Promise(()=>{})
console.log(p)
// 输出： Promise { <pending> }
```

上述输出表示期约的状态，目前为`<pending>`。

上面的函数参数又可以接收如下两个函数参数：

* resolve() : 可将期约的状态变为resolved

* reject() : 可将期约的状态变为rejected

示例如下：

```js
const p=new Promise((resolve,reject)=>resolve())
console.log(p)
// 输出：Promise { undefined }
```

这个表示期约的值是undefined，期越的状态是resolved（默认）。

现在，给定一个期约值：

```
const p=new Promise((resolve,reject)=>resolve(1))
console.log(p)
//输出： Promise { 1 }
```

将期约变为rejected状态：


```
const p=new Promise((resolve,reject)=>reject(1))
console.log(p)
// 输出： Promise { <rejected>  1 }
```

这个输出结果表示期约当前的状态是rejected，期约值是1。同时，此时控制台会输出一些错误信息，我们先不管它。

通过打印期约对象，我们可以发现，期约分为三种状态：

* pending 

* resolved

* rejected

期约的状态决定了后续的操作是调用then()还是调用catch()。期约值是期约链式操作的数据流转的第一步。

除了构造函数以外，可以使用如下方式快速创建期约：

```js
const  p1= Promise.resolve(1)
console.log(p1)
// 输出：Promise { 1 }

const  p2= Promise.reject(1)
console.log(p2)
//输出： Promise { <rejected> 1 }
```

## async

async是ES2017推出的异步函数关键字。

把函数声明为async意味着该函数的返回值将会是一个`<resolved>`状态的期约：

```js
async function test(){
      return 1 
      // 等价于：
     // return Promise.resolve(1)
}
console.log(test())  
//  输出：promise { 1 }
```

## 期约的实例方法和期约链

多层串联的回调函数本质上是多个函数的链式操作，上一个函数的返回值作为参数传递给下一个函数，使用期约对象的then()方法，就能实现链式操作，例如：

```js
const p = Promise.resolve(1)

p.then(x=>x+1)
.then(x=>x*2)
.then(x=>console.log(x))   //=>4
```

期约对象的链式操作有三个方法：then()、catch()、finally()。这三个方法都接收一个函数作为参数，表示下一步的操作。

当期约对象的状态变为resolved时，就可以调用then()，例如：

```js
const p = Promise.resolve(1)
p.then(x=>x+1)
           .then(x=>x*2)
           .then(x=>console.log(x))   //=>4
```


当期约对象的状态变为rejected时，就可以调用catch()，不过，一次正常的catch()之后，状态就会变为resolved，例如：

```js
const p= Promise.reject(1)
p.catch(x=>x+1)
             .then(x=>x*2)
             .then(x=>console.log(x))   //输出：4
```

期约对象无论是什么状态，都可以调用finally()。如下：

```js
const p= Promise.reject(1)
p.finally(()=>console.log('期约链开始'))
         .catch(x=>x+1)             
         .then(x=>x*2)
         .then(x=>console.log(x))
         .finally(()=>console.log('期约链停止'))  
```

期约链是一个串行操作，像流水线一样，每道工序可能包含：自己的操作、流转的数据，如果不显式或隐式地使用return为下一个操作提供数据，那么该步操作会直接将上一步的数据流转到下一步。

也就是说，每一步肯定有一个流转数据，就看你用不用、处不处理，每一步也肯定会输出流转数据到下一步。流转的数据就是每一步都回调函数的第一个参数，如下示例：

```js
const p= Promise.resolve(1)        
p.then((x)=>console.log('期约链开始'))
         .then(x=>{
               x=x+1                                
              return 3                    
          })
         .then(x=>x*2)                      
         .then((x)=>console.log(`现在流转的数          据是${x}`))
```

在上面这个例子中，由Promise.resolve()产生期约链条的流转数据1，每一步的操作其实就是一个箭头函数，箭头函数的第一个参数是流转的数据，函数体是对流转数据的处理或其它行为，第一个then()没有对流转数据进行处理，所以直接往下传递。第二个then()对流转数据进行处理，但是显式地return 3，此时流转数据就是3。第三个then()对流转数据乘以2，注意，根据箭头函数的规则，这一行其实隐式地return了6。最后一个then()是获取流转数据并输出。

由上面的几个例子还可以看出，期约的链式操作是打平的，解决了以往的回调函数层层嵌套的问题，写法上更直观，理解起来也更直接。不过，人们
对语法简洁性的追求是无限的，比起不断地使用then()，还有个更简洁的方式，那就是使用await。

## 顶层await

顶层await特性在ES2022标准中被推出。

async定义的函数依然是同步求值的，await关键字才是真正的异步。

以往，await只能写在async函数里面，ES2022新增了顶层await特性，允许await在函数外面书写。

要在node环境中测试最新(ES2022)的顶层await特性，需要将后缀名改为mjs。


           

