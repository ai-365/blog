

## slice()、substring()和substr()方法

要提取子字符串，有三种方法。slice()和substring()需要传入提取开始的位置和结束位置，而substr()需要传入开始位置和提取的字数量。

```js
let str='hello,world'
console.log(str.slice(4,7))  //=>'o,w' ，从索引4位置开始提取，到索引7位置之前结束（左闭右开原则）
console.log(str.slice(4))    //=> 'o,world'，从索引4位置开始提取，一直到结束
console.log(str.substr(4,3)) // =>'o,w'，从索引4位置开始提取，提取3个字符
```

