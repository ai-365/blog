

数组有五个迭代函数，它们都接收一个函数作为参数，传入的函数接收三个参数：元素、索引位置、数组本身。这五个迭代函数分别是：
* **Array.prototype.map()**：返回对每个元素进行操作后的新数组。
* **Array.prototype.filter()**：返回回调函数返回值为true的元素组成的新数组。
* **Array.prototype.every()**：如果回调函数返回值均为true，则返回true，否则返回false。
* **Array.prototype.some()**：只要有一个或以上的回调函数返回值为true，则返回true，否则返回false。
* **Array.prototype.forEach()**：不返回新数组，而是直接在原来的数组上对每个元素执行回调函数定义的操作。

来看几个例子：

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9 ]
const arr2 = arr.map((element,index,array)=>element*2)  
// 对每个元素乘以2，存储到新数组中，arr2=[2,4,6,8,10,12,14,16,18]

const arr3 = arr.filter((element,index,array)=>element > 5) 
// 找出大于5的值，存储到新数组中，arr3=[6,7,8,9]

const arr4=arr.every((element,index,array)=>element%2==0) 
// 所有元素都是偶数吗？显然不是，arr4 = false
const arr5=arr.some((element,index,array)=>element%2==0)  
// 存在元素是偶数吗？arr5=true

arr.forEach((element,index,array)=>element**2)  
// 直接修改原数组，对每个元素进行平方，arr=[1,4,9,16,25,36,49,64,81]
```
