

归并操作是对数组的元素进行叠加运算，例如累加或累积，涉及reduce()和reduceRight()，这两个方法的区别只是叠加运算的方向相反。

reduce()方法接收一个函数参数，这个函数与前面的函数参数有所不同，它期待4个参数：
* prev：叠加运算的初始值，默认为第一项
* cur：迭代的当前元素，第一次迭代为第二项
* index：索引位置
* array：数组本身

来看下面的示例——数组累加求和。

```js
const arr = [1, 2, 3, 4]
const result = arr.reduce( (prev, cur)=> prev + cur )
console.log(result)
```
该归并操作的细分步骤如下：

* 第一次归并：`prev=1，cur=2`
* 第二次归并：`prev = prev+cur=1+2=3，cur = 3`
* 第三次归并：`prev=prev+cur=3+3=6 ，cur=4`
* 第四次归并：`prev=prev+cur=6+4=10`
