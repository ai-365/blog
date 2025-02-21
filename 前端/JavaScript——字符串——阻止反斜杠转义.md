
## 阻止反斜杠转义

Windows平台下的路径字符串带有反斜杠，反斜杠在字符串中会进行转义，这并不是我们期待的现象。为了阻止转义，可以使用`String.raw` 函数，这个函数返回反引号中未经处理的文本，示例如下：

```js
// 反斜杠默认转义
const path1 = "D:\test"
console.log(path1)  // D:  est （\t表示一个Tab空格）

// 阻止转义

const path2 = String.raw`D:\test`
console.log(path2)  // D:\test
```