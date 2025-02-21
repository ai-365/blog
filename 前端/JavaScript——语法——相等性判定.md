
## 原始值的相等判定

JavaScript原始值的相等性判定有两种情况：严格相等、不严格相等。分别使用两个和三个等号。

这两种相等性判定的区别只有一个：

```
是否进行类型转换
```

用一个示例可以很好的进行说明：

```js
console.log(1==true)  // true ，进行了类型转换，true转换成了1，相等

console.log(1===true)  // false 不进行类型转换
```

## 引用值的相等判定

引用值的相等性判定不区分严格与否，两个和三个等号是等价的。引用值的相等判定只有一个依据：

```
比较两个引用值的指针是否指向同一处
```

例如，如下两个对象，虽然内容上看起来一样，但是它们实际的内容却存储在内存的不同地方，即指针的指向不一样，因此永远不会相等：

```
const objA = {name:"bob"}
const objB = {name:"bob"}
console.log(objA==objB)  // false 
console.log(objA===objB)  // false 
```

由于对象使用等号拷贝值时，默认使用浅拷贝，即只拷贝指针，那么这两个对象的指针指向同一处，因此相等，如下示例：

```
const objC = {name:"bob"}
objD = objC // 此时只拷贝了指针
console.log(objC==objD)  // true
console.log(objC===objD) // true
```