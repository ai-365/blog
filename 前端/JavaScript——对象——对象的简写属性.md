
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
