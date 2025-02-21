
在定义函数时，可以为参数赋予一个默认值。如果调用该函数时没有传递实参，那么就会使用默认值传递，这比以往的默认undefined值更方便了一步。

```js
function  sum(a=0,b=0){
  return a+b
}

console.log(sum())    // => 0
console.log(sum(1))   //=> 1
console.log(sum(1,2)) //=>3
```

