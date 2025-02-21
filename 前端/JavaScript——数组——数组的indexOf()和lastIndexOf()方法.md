

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
