

**一些重要的路径**

下面列出了一些重要的路径：

- `process.cwd()`	：当前工作目录的绝对路径
- `__filename` ：	当前代码文件的绝对路径
- `__dirname`	：当前代码文件所在目录的绝对路径
- `os.homedir()`  ：	家目录
- `path.sep`	： 文件路径分隔符，斜杠`/`或反斜杠`\`，取决于操作系统

**提取路径中的元素**

可以使用一些方法提前一个完整路径里面的元素，例如文件名、后缀名、所在目录等，包括：
- basename() ：路径的最后一个部分
- extname()：后缀名
- dirname ()：所在目录

需要注意的是，由于Windows中的路径是使用反斜杠隔开的，而反斜杠在字符串中起到转义的作用，因此在表示路径的字符串中需要使用两个反斜杠`\\`。

提取路径中的元素的示例方法如下：

```js
const path = require('path')

const p = "D:\\Test\\example.js"
console.log(path.basename(p))  // example.js，含后缀的文件名
console.log(path.extname(p))  // .js ， 后缀名
console.log(path.basename(p, path.extname(p))) // example，不含后缀的文件名
console.log(path.dirname(p)) //  D:\Test ，所在目录
```


**path.join()**

path.join()组合多个路径，会自己处理路径中存在的'/'、'//'、'..'。

```js
const path = require('path')

console.log(path.join('a','//b','./c')) // a\b\c
console.log(path.join('a',  '.',  'b',  '..',  'c')) // a\c ，会自动解析相对路径符号
```


**path.normalize()**

path.normalize()规范化路径为当前操作系统的格式。

```js
console.log(path.normalize('a/b/c')) // a\b\c

'/foo/bar/baz/asdf'
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'))  // '/foo/bar/baz/asdf'

```


**path.resolve()**

path.resolve()从最后一个路径开始，反向处理。

```js
path.resolve('/foo/bar', './baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', 'baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', '/baz')   // returns '/baz'
path.resolve('/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','./foo/bar', '../baz')   // returns '/home/foo/baz'
path.resolve('home','foo/bar', '../baz')   // returns '/home/foo/baz'
path.resolve('home', 'foo', 'build','aaaa','aadada','../../..', 'asset') //return '/home/foo/asset'
```

