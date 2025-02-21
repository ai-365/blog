
## 读写文件内容

**读取文件内容**

比较常见的就是使用utf8编码读取文件，返回字符串，例如：

```js
const content = fs.readFileSync('file.txt', 'utf8')  
console.log(content)
```

当然还有fs.readFile()和fs.promise.readFile()这两种异步读取方式，还有更低级的read()方法，这几种方式的代码更复杂一些。对于大部分数据量不大的文本文件，只需要使用readFileSync()这种同步方式即可。

**写入文件内容**

```js
const content = '一些字符串'
fs.writeFileSync('file.txt' ,  content ,  'utf8')
```

与读取文件类似，写文件操作也有对应的异步方法和低级API，大部分情况下使用同步方式即可。

**追加文件内容**

```js
const content = '新增字符串\n'
fs.appendFileSync('file.txt' ,  content ,  'utf8')
```

使用zx多次运行上面的代码，每一次都会向文件中增加一行内容，这里的`\n`是换行符，有些时候是`\r\n`，取决于操作系统。

## 复制、删除、移动和重命名文件

**复制文件**

```js
fs.copyFileSync('old.txt' ,  'new.txt')
fs.copyFileSync('old.txt' ,  'new.txt')
```

**删除文件**

```js
fs.rmSync('1.txt' )
fs.unlinkSync('2.txt' )
```

**移动和重命名文件**

```js
fs.renameSync('1.txt' , '11.txt' )  // 重命名
fs.renameSync('2.txt' , '2/2.txt' )  // 移动
fs.renameSync('3.txt' , '3/33.txt' )  // 移动且重命名
```





## 使用fs模块读写目录内容


**读取目录下的文件列表**

fs.readDirSync()方法用于读取目录下的文件列表，类似于ls命令，返回一个字符串数组，每个元素就是文件名。

如下示例读取当前目录下的文件列表。

```js
console.log(fs.readdirSync('.'))
```

**新建和删除目录**

```js
fs.mkdirSync('新目录')
fs.rmdirSync('新目录')
```

注意，如果目录已经存在，会报错。

**检查文件或目录是否存在**

```js
console.log(fs.existsSync('file.txt'))  // 检查文件是否存在
console.log(fs.existsSync('目录'))  // 检查目录是否存在
```

**分析文件或目录的元数据**

fs.statSync()返回文件或目录的属性，包括修改时间、创建时间、文件大小等元数据。

```js
console.log(fs.statSync('file.txt')) 
```




