
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

