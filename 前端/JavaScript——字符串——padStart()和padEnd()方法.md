
## padStart()和padEnd()方法

有时候需要保证字符串的长度是固定的，就需要在左右使用字符进行填充。

```js
let str='hello'
console.log(str.padStart(10))  //=> '     hello'，在左侧填充默认的5个空格
console.log(str.padEnd(10))    //=>'hello     '，在右侧填充5个空格
console.log(str.padStart(3))   //=>'hello'，长度足够，原样返回
console.log(str.padStart(10,',')) // =>',,,,,hello'，在左侧使用逗号填充
```
