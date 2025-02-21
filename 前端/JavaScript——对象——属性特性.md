
对象的属性的特性属于比较复杂但不是很难的知识点。

对象的成员分为属性和方法，而对象的属性又分为：
- 数据属性
- 访问器属性

## 对象的数据属性

一般情况下，对象的属性就是数据属性，例如：

```js
const obj = {a:1,b:2}
```

这里，a、b均为数据属性。

对象的数据属性有4个特性：

- **value**：表示该属性的值
- **writable**：表示该属性的值是否可以被修改
- **enumerable**：表示该属性是否可以通过for-in 循环遍历，默认情况下为true，如果将该特性设置为false，则for-in循环时将遍历不到该属性。
- **configurable**：表示是否可以通过delet删除该属性，或者是否可以修改其特性。

这里要注意的是writable和configurable的区别，writable侧重于能不能修改属性的值，而configurable侧重于能不能配置该属性的特性。

## 对象的属性的特性使用

Object.defineProperty()方法来定义：

```js
const obj = {}

Object.defineProperty(obj,'a',{
	value:1,
  	writable:false,   // 不能修改该属性的值
  	enumerable:true,
  	configurable:true
})

console.log(obj.a)    // 1
obj.a = 2
console.log(obj.a)  //  1 ： 不会报错，但是静默失败
```

## 对象的访问器属性

对象的访问器属性有4个特性：

- **get**：获取函数，在读取该属性时调用。
- **set**：获取函数，在写入属性时被调用。
- **enumerable**：与数据属性的作用相同。
- **configurable**：与数据属性的作用相同。

这里的难点是get和set，如果对属性只定义了get函数，那么该属性就是只读的，必须同时定义get和set函数才说明该属性是可写的，例如：

```js
const obj = {a:1}

Object.defineProperty(obj,'b',{
	get(){return this.a},
  	set(value){this.a = value}
})

console.log(obj.b)    // 1
obj.b = 2
console.log(obj.a)  //   2
```

这里a是数据属性，b是a的访问器属性，可读可写。再来看一个只读访问器的例子：

```js
const obj = {a:1}

Object.defineProperty(obj,'b',{
	get(){return this.a},
})

console.log(obj.b)    // 1
obj.b = 2
console.log(obj.a)  //   1 ： 不会报错，但是静默失败
```
