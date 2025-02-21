

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

