
ES6标准新增的代理与反射为开发者提供了拦截并向基本操作嵌入额外行为的能力。比如我们在读取或设置一个Object的属性的值的时候，有时候需要加入额外操作，以提供响应式的能力。大受欢迎的Vue3.x就大量运用了这种特性，成为最受欢迎的响应式框架。

## 代理

代理就是目标对象的抽象，它拦截了外界对目标对象的直接访问，从而有效的保护了目标对象。拦截操作全部都定义在捕获器对象中。

虽然ES5时代的Object.defineProperty()方法也能实现类似的目标，但是它对于目标对象是破坏性的操作，而我们今天要说的代理是一种非破坏性的操作。

## 创建空代理

空代理就是什么操作也不拦截，这个时候的代理对象只是起到一个“传话筒”的作用。从代码表现来看，此时捕获器是一个空对象。

```js 
const target = {a:1, b:2}
const handler = {}    // 拦截操作是空的
const proxy = new Proxy(target,handler)
proxy.a // => 1  // 如实返回
proxy.b  // =>2
```

## get()捕获器、set()捕获器和反射API

实际上，使用代理最常见的就是在捕获器之中添加get()和set()方法。get()方法接收三个参数，分别是：目标对象，正在读取的目标对象的属性，代理对象。set()方法接收四个参数，分别是：目标对象，正在设置的目标对象的属性，设置的新值，代理对象。

同时，利用Reflect对象的API，可以快速将对代理的操作传递到目标对象上。

```js
const obj = {a:1, b:2}
const handler = {
    get(target,property,receiver){
        console.log(`你正在读取${property}属性`)
    },
    set(target,property,value,receiver){
        console.log(`你将${property}属性的值改成了${value}`)
        Reflect.set(...arguments)      // 将修改操作传递到目标对象上
    },
}
const proxy = new Proxy(obj,handler)
console.log(proxy.a)  // =>'你正在读取a属性'
proxy.b = 3    // => '你将b属性的值改成了3'
console.log(obj.b)  //=>3，目标对象的属性值也跟着改了
```
