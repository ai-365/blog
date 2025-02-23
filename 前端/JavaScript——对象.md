<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [对象特性](#对象特性)
  - [新建对象实例](#新建对象实例)
  - [对象的简写属性](#对象的简写属性)
  - [对象的可计算属性](#对象的可计算属性)
  - [对象的枚举](#对象的枚举)
  - [对象的属性名和属性值](#对象的属性名和属性值)
  - [对象的属性特性](#对象的属性特性)
  - [对象的数据属性](#对象的数据属性)
  - [对象的属性的特性使用](#对象的属性的特性使用)
  - [对象的访问器属性](#对象的访问器属性)
  - [对象的拖尾逗号](#对象的拖尾逗号)
- [对象方法](#对象方法)
  - [对象的for in方法](#对象的for-in方法)
  - [对象的toString()方法](#对象的tostring方法)
  - [对象的valueOf()方法](#对象的valueof方法)
  - [对象方法的简写](#对象方法的简写)
  - [对象属性的读取和赋值](#对象属性的读取和赋值)
  - [对象属性名的简写](#对象属性名的简写)
  - [使用Object.assign()合并对象](#使用objectassign合并对象)
  - [使用三点操作符合并对象](#使用三点操作符合并对象)

##  对象特性

###  新建对象实例

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



###  对象的简写属性


Ecamscript 6为对象新增了简写特性，这并没有改变对象本身的行为，但极大地提升了编码和阅读的效率。

上面这个例子演示的是属性值是变量的情况，但是又有一个特征，就是：属性名和属性值的标识符是一样的，例如：

```js
const a=1
const b=2
const obj={a:a,b:b} 
console.log(obj)  // {a:1, b:2}
```

这时候，就可以使用简写方式：

```js
const a=1
const b=2
const obj={a,b} // 等价于 const obj = {a:a, b:b}
console.log(obj)  // {a:1, b:2}
```

除了属性可以简写以外，方法也有简写的方式，就是去掉冒号和function关键字，例如：

```js
const obj = {
	a:1,
   	b:2,
   	sum(){
    	return a+b
	}
}

console.log(obj.sum())
```

在有些场景中，可以看到对象的最后一个属性值后面还留有一个逗号，这种逗号叫做拖尾逗号。拖尾逗号可用在需要经常增加、删除对象属性的情况，可以保证每次操作的一致性，避免发生低级的语法错误。

不过，要特别注意的是，JSON格式不支持拖尾逗号。

###  对象的可计算属性

对象的可计算属性是ES6新增的特性。有些情况下，属性名是一个变量，无法使用点号语法得到属性值，此时可以使用方括号的方式读取属性，例如：

```js
const key1 = 'a'
const key2 = 'b'
const obj = {}

obj[key1] = 1
obj[key2] = 2

console.log(obj)   // {a:1, b:2}
```

使用中括号的优势是可以通过变量访问属性。

对于一个确定的属性名称，除了使用点号外，也可以使用中括号读取属性，但此时需要使用引号：

```js
const obj = {}

obj['a'] = 1
obj['b'] = 2
console.log(obj)  // {a:1, b:2}
```

### 对象的枚举

对象是一组名/值对，可以使用如下方法枚举属性名、属性值、名/值对：

```js
const obj =  {a:1, b:2, c:3}

const keys = Object.keys(obj)
console.log(keys)  //   [ 'a', 'b', 'c' ]

const values = Object.values(obj)
console.log(values)  //  [ 1, 2, 3 ]

const entries = Object.entries(obj)
console.log(entries)  // [ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]
```


###  对象的属性名和属性值


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


###  对象的属性特性


对象的属性的特性属于比较复杂但不是很难的知识点。

对象的成员分为属性和方法，而对象的属性又分为：
- 数据属性
- 访问器属性

### 对象的数据属性

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

### 对象的属性的特性使用

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

### 对象的访问器属性

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

### 对象的拖尾逗号

一个对象往往有多个名/值对，各个名/值对之间使用逗号隔开，需要说明的是，最后一个名/值对后面的逗号也是允许的，并不会报错：

```js
const obj = {
	a:1,
	b:2,
	c:3,
}
```

这个宽松的语法特性在需要频繁复制粘贴追加的属性时非常有用，因为格式是统一的，我们不需要频繁的增减逗号。

不过，需要特别说明的是，JSON的写法类似于对象，不过，JSON的写法与对象有两个最大的不同：
* JSON字符串中的对象的属性名必须加引号。
* JSON字符串中，对象不允许使用拖尾逗号，使用会报错。

##  对象方法

###  对象的for in方法


可迭代对象可以使用for of 循环遍历，而Object类型并非可迭代对象，不过可以使用for in 方法遍历其属性名和属性值，例如：

```js
const obj = {a:1, b:2, c:3}

for (let key in obj){
	console.log(key)  // a  b  c
}
```

从这里可以看出，如果只有一个参数，那么只遍历属性名称。




### 对象的toString()方法

所有对象实例的toString()方法会返回一个固定的字符串`[object Object]`，例如：

```js
console.log({}.toString())  // [object Object]

console.log({a:1, b:2}.toString())  // [object Object]
```

当对象与对象相加，对象与字符串相加时，会隐式调用toString()，如下：

```js
console.log({}+{})  //   [object Object][object Object]
console.log(({}+{}).length)  // 30

console.log({}+'Hello')  // [object Object]Hello
```

### 对象的valueOf()方法

对象示例的valueOf()返回对象本身，例如：

```js
console.log({}.valueOf())  //  {}
console.log({a:1, b:2}.valueOf())  //  { a: 1, b: 2 }
```


###  对象方法的简写

对象往往具备多个方法，方法其实就是函数，只不过在对象的命名空间中我们称之为方法，例如：

```js
const obj = {
	a:1,
  	b:2,
  	say:function(){
    	console.log('Hello,World!')
    }
}

obj.say()
```

此时可以省略方法名称后面的冒号和function关键字：

```js
const obj = {
  a:1,
  b:2,
  say(){
    console.log('Hello,World!')
  }
}

obj.say()
```

### 对象属性的读取和赋值

通常情况下，对象的属性名是明确的字面量，这时候时候点号选取对象属性，读取或写入属性的值，例如：

```js
const obj = {a:1, b:2}
console.log(obj.a)

obj.a = 2
console.log(obj.a)
```

使用点号可以连续读取属性，例如：

```js
const obj = {a:{a:1,b:2}, b:2}

console.log(obj.a.a)
```

这里的两个属性名a并不冲突，因为它们从属于不同的对象命名空间。


###  对象属性名的简写

在很多时候，对象的属性值是一个变量标识符，而这个标识符和属性名是一样的，例如：

```js
const a = 1
const b = 2

const obj = {a:a, b:b}
console.log(obj)  // {a:1, b:2}
```

这种情况下，可以使用一种简化的语法，如下：

```js
const a = 1
const b = 2

const obj = {a , b}
console.log(obj)  // {a:1, b:2}
```


### 使用Object.assign()合并对象

可以使用Object.assign()合并对象，例如：

```js
const obj1 = {a:1, b:2}
const obj2 = {a:2, c:3}

const obj = Object.assign(obj1,obj2)
console.log(obj)  // { a: 2, b: 2, c: 3 }
```

合并对象时，如果存在同名属性，则后边的对象属性值会覆盖前面的属性值。

### 使用三点操作符合并对象

作为一种语法糖，可以使用三点操作符合并对象：

```js
const obj1 = {a:1, b:2}
const obj2 = {a:2, c:3}

const obj = {...obj1,...obj2}
console.log(obj)  // { a: 2, b: 2, c: 3 }
```

最后，要特别说明的是，无论使用Object.assign()，还是使用三点运算符，只推荐源对象不包括嵌套属性、并且属性值是原始值的时候使用，此时新对象对于源对象是独立的，不存在深浅拷贝的问题。如果源对象包括嵌套属性、或者属性值存在非原始值（其实嵌套属性本身也意味着属性值非原始值了），那么新对象的某些属性可能还引用着源对象，这里面有一些“语法陷阱”需要避免，建议先使用其它方式将对象打平，再进行合并。

