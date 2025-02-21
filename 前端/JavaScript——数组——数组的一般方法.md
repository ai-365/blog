

## 数组的at()方法

ES2019新增了`at()`方法，该方法可以从倒数第一位开始访问数组元素，以往我们要找到数组的最后一个元素，使用的是：

```js
const arr = [1,2,3]
console.log(arr[arr.length-1])  // 3
```

现在，有了`at()`方法，便可以非常方便地返回最后一个元素值:
```js
const arr = [1,2,3]
console.log(arr.at(-1))  // 3
```

通过索引返回元素，`at()`方法比中括号形式更加通用，因为`at()`可以接收一个正整数或负整数，正整数就是正序索引，等同于中括号形式`([])`,而负整数就是逆序索引，例如：

```js
const arr = [1,2,3]
console.log(arr.at(0))  // 1 , 等价于arr[0]
console.log(arr.at(-1))  // 3 , 返回倒数第一个元素值
console.log(arr.at(-2)) // 2 , 返回倒数第二个元素值
```


## 数组的concat()方法
使用concat()方法可以合并数组，返回有原数组和实参组成的新数组：

```js
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3 =arr1.concat(arr2)
console.log(arr3)  // [1,2,3,4,5,6]
```

当然，也可以使用扩展运算符更便捷的操作：

```js
cosnt arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr3=[...arr1 , ...arr2 ]         
console.log(arr3)//[1,2,3,4,5,6]
```

需要特别注意的是，这两种方法只有在所有元素均为原始值的前提下，新数组与源数组是相互独立的。如果源数组中存在引用值元素，那么新数组与源数组同时关联着这些引用值元素。

这是由引用值自身的特性决定的，为了保险起见，建议只对所有元素都为原始值的数组使用这两种操作。


## 数组的fill()方法

数组的fill()可以让数组在指定的索引范围内填入相同的值，该方法接收三个参数： 要填充的值、起始索引(默认为0)、终止索引(默认为最后一个元素，可以用负整数表示倒数)。

fill()方法会修改源数组，来看下面的例子：

```js
const arr1 = [1,2,3,4,5,6]
const arr2=[...arr1]
const arr3=[...arr1]

arr1.fill(20)
console.log(arr1)
// [20,20,20,20,20,20]
// => 所有位置都填充为20

arr2.fill(20,2)
console.log(arr2)
// [1,2,20,20,20,20]
// 从第3个元素开始，一直到结尾

arr3.fill(20,1,-2)
// [1,20,20,20,5,6]
// 从第2个开始(包含)，到倒数第二个结束(不包含)
```




find()和findIndex()在找到第一个匹配的元素之后就不再往后迭代，因此，倘若要找到全部匹配的元素，则应该使用filter()方法。


## 数组的flat()方法

有些场景下，我们需要将具有嵌套结构的数组打平，ES2019新增了flat()方法用于数组的打平操作，例如：

```j
const arr1= [ 1, [2,3],4 ]
const arr2=arr.flat()
console.log(arr2)   //=>[1,2,3,4]
```

该方法还可以接收一个整数，表示打平的深度，默认情况下，打平一级嵌套，例如：

```js
const arr=[[[1]]]   // 三级嵌套
const arr1=arr.flat()  
console.log(arr1)    //=> [[1]]

const arr2=arr.flat(2)
console.log(arr2)  //=>[1]
```
  
注意，当打平深度高于嵌套层级时，永远只会返回一维数组：

```js
// const arr=[[[1]]]
const arr3=arr.flat(6)
console.log(arr)   //=>[1]
```

也就是说，打平的结果永远还是数组。


## 数组的includes()方法

仅仅是查看是否包含某个元素，可使用Array.prototype.includes()方法，该方法返回一个布尔值，例如：

```js
const arr = [1,2,3]
console.log(arr.includes(1)) // true
console.log(arr.includes(5)) // false
```


## 数组的indexOf()和lastIndexOf()方法

如果不仅要看是否包含某个元素，还要找出第一次出现的位置，则应该使用Array.prototype.indexOf()方法，如果能找到，则返回第一次出现的索引位置，如果没有，则返回-1。如果要返回最后一次出现的索引位置，则使用Array.prototype.lastIndexOf()，例如：

```js
cosnt arr = [1, 2, 3, 4, 2, 5]

const result1 = arr.indexOf(2)  // 第一次出现2的索引位置
console.log(result1)  // 1
const result2= arr.indexOf(6)  //第一次出现6的索引位置，没有找到
console.log(result2)  // -1

const result3 = arr.lastIndexOf(2)  // 最后一次出现2的索引位置
console.log(result3)  // 4
```

请注意indexOf()和lastIndexOf()只能找到第一次和最后一次出现的位置，如果需要将所有的位置都找到，则应该使用filter()方法。

## 数组的find()和findIndex()方法

上面的查找方法只能查看是否包含特定的元素，如果要查找符合某些要求的元素，则需要使用Array.prototype.find()和Array.prototype.findIndex()方法。find()方法返回第一个匹配的元素，findIndex()方法返回第一个匹配的元素的索引位置。

这两个方法都接收一个callback函数，该函数接收三个参数：元素、索引位置、数组本身。例如：

```js
const arr = [1, 2, 3, 4, 5, 6 ] 
const result1 = arr.find(item => item%2==0)  // 返回第一个偶数
console.log(result1)  // 2
const result2 = arr.findIndex(item => item%2==0)  // 返回第一个偶数的索引位置 
console.log(result2)  // 1
```


## 数组的join()方法

可以使用join()将数组元素用指定的符号拼接起来，再转换为字符串，例如：

```js
const arr = [1,2 ,3, 4 ]
const str = arr.join('&')
console.log(str)  // '1&2&3&4'
```

如果没有给定符号，则默认使用英文逗号拼接(,)，例如：

```js
const arr = [1,2 ,3, 4 ]
const str = arr.join()  // 等价于 arr.join('') 和 arr.join(',')
console.log(str)
```

注意，在开始拼接之前，每个元素会先隐式调用toString()方法转成字符串，然后用给定的符号拼接。例如：

```js
const arr = [1,2,{a:1},3]
const str = arr.join()
console.log(str) // '1,2,[object Object],3'
```

在上面的代码中，元素{a:1}是Object类型，任意Object类型使用toString()均会返回字符串`[object Object]`，所以会打印出上面的结果。


## 数组的slice()方法

数组实例的slice()用于返回一个子数组，也叫数组切片，该方法接收两个参数：
* 起点的索引位置(包含)
* 终点的索引位置(不包含)

例如：

```js
const arr1 = [1,2,3,4,5,6]
const arr2 = arr1.slice(1,3)
console.log(arr2)  // [2,3]
```

有一种简便的记忆方法：slice(n,m)返回第 n+1 到第 m 个元素组成的新数组。


## 数组的splice()方法

splice()方法可以在任意位置对数组插入、删除元素。一个完整的splice()方法依次接收如下参数：

* 插入或删除的起点索引位置
* 要删除的元素个数，如果不指定，那么从起点位置开始的后面的所有元素都被删除
* 后面的参数为要从起点位置之后开始填充的元素

例如，arr.splice(n,m,x,y)表示从arr的第n+1个元素开始删除m个元素，然后在此处插入x、y元素。

需要注意的是，splice()方法直接修改源数组，而不是返回新数组，来看下面的例子：

```js
const arr=[1,2,3,4,5,6]
arr.splice(1,3,20,30,40)
console.log(arr) // [ 1, 20, 30, 40, 5, 6 ]
// 从第2个位置开始删除3个元素，然后在第2个位置之后填充20，30，40
```

## 在数组首尾插入删除元素

在数组首尾插入/删除元素，有四种情况：
* push() :在数组尾部增加任意数量的元素，并选择性返回数组的新长度。
* pop(): 删除数组的最后一项，并选择性返回刚刚删除的最后一项。
* shift() :删除数组的第一项，并选择性返回刚刚删除的第一项。
* unshift():在数组开头添加任意数量的元素，并选择性返回数组的新长度。

上述"选择性返回"的意思是可以接收返回值，也可以不接收。例如：

```js
const arr1 = [1,2,3]
arr1.push(4)  // 不接收返回值，此时arr1=[1,2,3,4]

const arr2 = [4,5,6]
```

对数组的首尾进行增减元素的示例如下：

```js
const arr =[2,3]  
arr.push(4)  // 在尾部压入一个新元素，此时arr = [2,3,4]
arr.push(5,6,7)  // 在尾部一次性压入3个新元素，此时arr=[2,3,4,5,6,7]
arr.pop()   // 从尾部弹出最后一个元素，此时 arr = [2,3,4,5,6]
arr.unshift(1)  //从首部压入一个新元素，此时arr= [1,2,3,4,5,6]
arr.unshift(-3,-2,-1,0)  // 在首部一次性压入4个新元素，此时 arr= [-3,-2,-1,0,1,2,3,4,5,6]，注意压入的顺序
arr.shift()  // 从首部弹出第一个元素，此时arr =[-2,-1,0,1,2,3,4,5,6]
console.log(arr) // [-2,-1,0,1,2,3,4,5,6]
```