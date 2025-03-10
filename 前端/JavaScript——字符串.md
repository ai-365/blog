<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [字符串简介](#字符串简介)
- [字符串的不可变性](#字符串的不可变性)
- [字符串的长度](#字符串的长度)
- [原始值引用类型](#原始值引用类型)
- [大小写转换](#大小写转换)
- [indexOf()和lastIndexOf()方法](#indexof和lastindexof方法)
- [includes()方法](#includes方法)
- [startWith()和endsWith()方法](#startwith和endswith方法)
- [去除字符串的首尾空格](#去除字符串的首尾空格)
- [重复字符串](#重复字符串)
- [padStart()和padEnd()方法](#padstart和padend方法)
- [slice()、substring()和substr()方法](#slicesubstring和substr方法)
- [阻止反斜杠转义](#阻止反斜杠转义)
- [字符串模板字面量](#字符串模板字面量)


###  字符串简介


字符串类型表示零个或多个16为Unicode字符序列，可以用三种符号包裹：单引号、双引号和反引号（ES6新增）。

双引号和单引号在Javascript中没有区别，这是与其它语言不同的地方。但是，引号必须成对使用。

有些时候，需要嵌套使用引号，这时候需要将使用一种引号包裹另一种引号，以区分不同的部分，例如：

```js
eval("console.log("hello,world")") // 语法错误
eval("console.log('hello,world')") // 正确
```

### 字符串的不可变性

字符串是不可变的，意思是一旦创建，就不能改变，例如：

```js
let str = "hello,world"
str.replace("h","H")
console.log(str)  // hello,world
```

在上面的例子中，我们本意是像将字符串"hello,world"中的“h"替换为“H”，但事与愿违了，因为字符串是不能改变的。

### 字符串的长度

字符串的长度可以通过length()方法获得，例如：

```js
let str = "hello,world"
console.log(str.length)  // 11
```

### 原始值引用类型

读者可能会纳闷儿，字符串不是原始类型吗？为什么它可以像引用类型一样可以调用方法？

其实，数值、字符串、布尔值这三种原始类型比较特殊，可以被包装成原始值引用类型，调用一些方法，不过，这个过程是系统帮我们自动完成的。例如，当调用str.length()时，系统会先为str生成一个对应的引用类型，这个引用类型包含各种方法供str调用。



### 大小写转换

可以使用如下两种方法对字符串进行大小写转换。

```js
let str='Hello'
console.log(str.toLowercase())   // =>'hello'
console.log(str.toUpperCase())   // =>'HELLO'
```

### indexOf()和lastIndexOf()方法

可以使用indexOf()返回字符或子串在字符串中第一次出现的索引位置，lastIndexOf()方法类型，只是从字符串的末尾开始查找。

```js
let str = 'hello,world'
console.log(str.indexOf('o'))  //=>4
console.log(str.lastIndexOf('o')) //=>7
console.log(str.indexOf('wo')) //=>6
```

### includes()方法

可以使用includes()方法确认字符串是否包含某个字符或子串，例如：

```js
let str='hello,world'
console.log(str.includes('hello'))    //=>true
```

### startWith()和endsWith()方法

startWith()方法用于确认字符串是否以某个字符或子串开头，而endsWith()方法用于确认字符串是否以某个字符或子串结尾。例如：

```js
let str='hello,world'
console.log(str.startsWith('hello'))  //=> true
console.log(str.endsWith('world'))    //=>true
```

### 去除字符串的首尾空格

有三种方法去除字符串的首尾空格，如下所示：

```js
let str='  hello,world  '  // 首尾各有两个空格
console.log(str.trim())      //=>'hello,world'，同时去除首尾空格
console.log(str.trimLeft())  //=>'hello,world  '，只去除左边的空格
console.log(str.trimRight()) //=>'  hello,world'，只去除右边的空格
```

### 重复字符串

使用repeat()方法对字符串进行重复，例如：

```js
let str='hello'
console.log(str.repeat(3))  //=>'hellohellohello'
```

### padStart()和padEnd()方法

有时候需要保证字符串的长度是固定的，就需要在左右使用字符进行填充。

```js
let str='hello'
console.log(str.padStart(10))  //=> '     hello'，在左侧填充默认的5个空格
console.log(str.padEnd(10))    //=>'hello     '，在右侧填充5个空格
console.log(str.padStart(3))   //=>'hello'，长度足够，原样返回
console.log(str.padStart(10,',')) // =>',,,,,hello'，在左侧使用逗号填充
```

### slice()、substring()和substr()方法

要提取子字符串，有三种方法。slice()和substring()需要传入提取开始的位置和结束位置，而substr()需要传入开始位置和提取的字数量。

```js
let str='hello,world'
console.log(str.slice(4,7))  //=>'o,w' ，从索引4位置开始提取，到索引7位置之前结束（左闭右开原则）
console.log(str.slice(4))    //=> 'o,world'，从索引4位置开始提取，一直到结束
console.log(str.substr(4,3)) // =>'o,w'，从索引4位置开始提取，提取3个字符
```

### 阻止反斜杠转义

Windows平台下的路径字符串带有反斜杠，反斜杠在字符串中会进行转义，这并不是我们期待的现象。为了阻止转义，可以使用`String.raw` 函数，这个函数返回反引号中未经处理的文本，示例如下：

```js
// 反斜杠默认转义
const path1 = "D:\test"
console.log(path1)  // D:  est （\t表示一个Tab空格）

// 阻止转义

const path2 = String.raw`D:\test`
console.log(path2)  // D:\test
```


### 字符串模板字面量

模板字面量取代了早期和其它语言的`%d`、`%f`等写法，使得变量化的字符串更容易书写，也更易阅读。模板字符串使用反单引号包容，它有最主要的两个特点：保留了换行符等不可见字符（以往只能用`\n`）；提供了变量解析和运算。

```js
let str = `第一行 (这里按回车) 
第二行`
console.log(str)   // =>'第一行\n第二行'

let a=1
let b=2
console.log(`a的值是${a}`)  // =>'a的值是1'
console.log(`a+b的结果是${a+b}`)    // => 'a+b的结果是3'
```

虽然string类型是原始值，但是表现出像对象一样使用属性和方法。

```js
let str='hello'
console.log(str.length)  // =>5， 字符串的长度
console.log([...str])  //=>[ 'h', 'e', 'l', 'l', 'o' ] ，将字符串快速打平为数组
```



