
## 去除字符串的首尾空格

有三种方法去除字符串的首尾空格，如下所示：

```js
let str='  hello,world  '  // 首尾各有两个空格
console.log(str.trim())      //=>'hello,world'，同时去除首尾空格
console.log(str.trimLeft())  //=>'hello,world  '，只去除左边的空格
console.log(str.trimRight()) //=>'  hello,world'，只去除右边的空格
```

