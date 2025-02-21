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
