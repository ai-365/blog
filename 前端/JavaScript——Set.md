
Set数据类型类是ES6新增的集合引用类型，表示元素唯一的集合。结构上类似于数组，与数组的区别是Set的元素不能重复。

可以使用构造函数新建一个空的Set实例：

```js
const set = new Set()
```

该函数也接收一个可迭代对象：

```js
const set = new Set([1,2,3])
```

打印一个set实例会输出如下结果：

```js
const set = new Set([1,2,3]
console.log(set)  //=> Set(3) { 1, 2, 3 }
```

set实例的size属性返回set的元素个数：

```js
const set = new Set([1,2,3])
console.log(set.size)
```

使用add()方法添加元素，可使用链式操作：
```js
const set = new Set().add(1).add(2).add(3)
```

要查询是否包含某个元素，使用has()方法，该方法返回一个布尔值：

```js
const set = new Set([1,2,3])
console.log(set.has(2))
console.log(set.has(6))
```

要删除某个元素，使用delete()方法，可以选择接收返回值，返回值是一个布尔值，表示是否已删除成功:

```js
const set = new Set([1,2,3])
set.delete(1)
console.log(set.delete(2))  //=>true
console.log(set.delete(2))  //=> false
```

要清空set的所有严元素，使用clear()方法：

```js
const set = new Set([1,2,3])
set.clear()
console.log(set.size)  //=>0
```
