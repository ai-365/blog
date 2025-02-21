
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

