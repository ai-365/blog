
## 数组的拖尾逗号

有些时候，我们会看到数组元素的结尾也存在一个逗号，这种逗号叫做拖尾逗号，通常是为了在频繁地增减数组元素的时候同时保证语法的正确，拖尾逗号不占用数组的长度，例如：

```js
// 下面两种写法的结果是一样的
const arr1 = [1,2,3]
const arr2 = [1,2,3,]
console.log(arr1.length, arr2.length)  // 3  3
```
