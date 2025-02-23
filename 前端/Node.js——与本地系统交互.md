<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [读取用户输入](#读取用户输入)
- [文件读写](#文件读写)
  - [引入fs模块](#引入fs模块)
  - [读取文本文件](#读取文本文件)
  - [写入文本文件](#写入文本文件)
  - [追加文本文件](#追加文本文件)
- [目录读写](#目录读写)
  - [复制文件](#复制文件)
  - [删除文件](#删除文件)
  - [重命名文件](#重命名文件)
  - [移动文件](#移动文件)
  - [创建和删除目录](#创建和删除目录)
  - [检查文件或目录是否存在](#检查文件或目录是否存在)
- [路径处理](#路径处理)
  - [引入path模块](#引入path模块)
  - [内置路径](#内置路径)
  - [路径提取](#路径提取)
  - [合并路径：join()](#合并路径join)
  - [解析路径：normalize()、resolve()](#解析路径normalizeresolve)
- [调用系统命令](#调用系统命令)
  - [spawn](#spawn)
  - [exec](#exec)
  - [execFile](#execfile)
- [多进程：chilid\_process模块](#多进程chilid_process模块)
  - [开启多进程](#开启多进程)
  - [多进程之间的通信](#多进程之间的通信)

##  读取用户输入

很多时候需要从控制台读取用户输入，这时候需要用到readline模块，示例如下：

```js
const readline = require("readline")
// 创建一个读取对象rl
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
rl.question("请输入： ", data => {
        console.log('你输入的是：' + data)
        rl.close() // 关闭rl
    })
```

也可以读取多个值，方法是嵌套调用rl.question()，示例如下：

```js
const readline = require("readline")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
rl.question("请输入a的值： ", a => {
    rl.question("请输入b的值：", b => {
        console.log('a的值是：' + a)
        console.log('b的值是：' + b)
        rl.close()
    })
})
```

## 文件读写

### 引入fs模块


使用如下代码引入fs模块：

```js
const fs = require('fs')
```

###  读取文本文件

比较常见的就是使用utf8编码读取文件，返回字符串，例如：

```js
const content = fs.readFileSync('file.txt', 'utf8')  
console.log(content)
```

当然还有fs.readFile()和fs.promise.readFile()这两种异步读取方式，还有更低级的read()方法，这几种方式的代码更复杂一些。对于大部分数据量不大的文本文件，只需要使用readFileSync()这种同步方式即可。

### 写入文本文件

要写入文件内容，使用writeFileSync()方法：

```js
fs.writeFileSync('file.txt', 'some content', 'utf8')
```

与读取文件类似，写文件操作也有对应的异步方法和低级API，大部分情况下使用同步方式即可。

### 追加文本文件

要追加文件内容，使用appendFileSync()方法：

```js
fs.appendFileSync('file.txt','new content','utf8')
```

##  目录读写

### 复制文件

要复制文件，使用copyFileSync()方法：

```js
fs.copyFileSync('old.txt' ,  'new.txt')
fs.copyFileSync('old.txt' ,  'new.txt')
```

### 删除文件

要删除文件，使用rmSync()方法，如下命令删除当前工作目录下的old.txt文件：

```js
fs.rmSync('old.txt')
```

### 重命名文件

要重命名文件，使用renameSync()方法，例如：

```js
fs.renameSync('old.txt','new.txt')  // 重命名
```

### 移动文件

值得一提的是，移动文件的本质也是重命名文件——对文件的路径进行重命名，fs模块并没有类似moveSync()的方法，仍然是使用renameSync()以重命名路径的方式完成文件的移动，如下示例将old.txt移动到文件夹dir下：

```js
fs.renameSync('old.txt','dir/old.txt')
```

如下示例移动且重命名文件：

```js
fs.renameSync('old.txt','dir/new.txt') 
```

fs.readDirSync()方法用于列举文件或目录下的文件列表，类似于ls命令，如下示例读取当前目录下的文件列表：

```js
console.log(fs.readdirSync('.'))
```

这会输出一个由字符串组成的数组，每个元素就是文件或目录名。

### 创建和删除目录

使用mkdirSync()新建目录，使用rmdirSync()删除目录，例如：

```js
fs.mkdirSync('newdir')
fs.rmdirSync('newdir')
```

注意，如果目录已经存在，则会报错。

### 检查文件或目录是否存在

existsSync()方法检查文件或目录是否存在，传入相对或绝对路径：

```js
console.log(fs.existsSync('file.txt'))  // 检查文件是否存在
console.log(fs.existsSync('dir'))  // 检查目录是否存在
```

fs.statSync()返回文件或目录的属性，包括修改时间、创建时间、文件大小等元数据。

```js
console.log(fs.statSync('file.txt')) 
```

## 路径处理

### 引入path模块

如果需要处理路径，则需要用到path模块。首先使用如下代码引入path模块：

```js
const path = require('path')
```

### 内置路径

下面列出了一些常用的内置路径：
- process.cwd() 当前工作目录的绝对路径。
- __filename  当前代码文件的绝对路径。
-  __dirname 当前代码文件所在目录的绝对路径。
- os.homedir() 家目录，需要先引入os模块。
- path.sep  /或\，取决于操作系统。

### 路径提取

如下是使用path模块进行路径解析的示例代码：

```js
const p = "D:\\Test\\example.js"
console.log(path.basename(p))  // example.js，含后缀的文件名
console.log(path.extname(p))  // .js ， 后缀名
console.log(path.basename(p, path.extname(p))) // example，不含后缀的文件名
console.log(path.dirname(p)) //  D:\Test ，所在目录
```

### 合并路径：join()

path.join()用于组合多个路径，它会自己处理路径中存在的'/'、'//'、'..'。
```js
console.log(path.join('a','//b','./c')) // a\b\c

// 自动解析相对路径符号
console.log(path.join('a',  '.',  'b',  '..',  'c')) // a\c 
```

### 解析路径：normalize()、resolve()

path.normalize()规范化路径为当前操作系统的格式。

```js
console.log(path.normalize('a/b/c')) // a\b\c

'/foo/bar/baz/asdf'
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'))  // '/foo/bar/baz/asdf'

```

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



##  调用系统命令


### spawn

使用child_process模块的spawn()方法示例如下：

```
const { spawn } = require('child_process');
const ls = spawn('powershell',['ls','.']);

ls.stdout.on('data', (data) => {
  console.log(data.toString());
});
```

spawn()方法的第一个参数应该指定一个shell，例如Windows平台的powersh、Linux平台的bash。第二个参数是一个数组，包含以空格分隔的具体命令的各个部分。

### exec

使用process_childprocess模块的exec()方法的示例如下：

```js
const { exec } = require('child_process')
exec('powershell ls .', (error, stdout, stderr) => {
  console.log(stdout)
})
```
### execFile


```js
const { execFile } = require('node:child_process')
const child = execFile('powershell', ['ls'], (error, stdout, stderr) => {
  console.log(stdout)
})
```


不过，值得注意的是，在Windows平台上运行上面三个示例时，如果路径存在中文，则会有乱码。

##  多进程：chilid_process模块

###  开启多进程
讲解多进程的最简单的例子是写两个无限循环：

```js
while (true) { console.log(1) }

while (true) { console.log(2) }
```

当进入第一个无限循环后，终端就会一直输出1，第二个无限循环不会被执行。

此时，多进程就派上用场了。使用child_process模块的fork()方法可以创建子进程。child_process，顾名思义，就是子进程的意思。

如下main.js就开启了两个进程：

```js
// main.js
const child_process = require('child_process');

const child1 = child_process.fork('./child1.js');
const child2 = child_process.fork('./child2.js');
```

child1.js的内容为：

```js
while (true) { console.log(1) }
```

child2.js的内容为：

```js
while (true) { console.log(2) }
```

执行node main.js 就能在控制台看到1和2都有输出。

当然，实际情况比这复杂，子进程主要用来处理计算量较大的任务。


### 多进程之间的通信


Node.js可以使用child_process模块的fork方法新建一个子进程。该方法接收一个脚本文件。

主进程和子进程通过事件触发和监听的方式进行通信，分别用到send()和on()方法。下面是一个示例。

主进程main.js内容如下：

```js
// main.js
const child_process = require('child_process');

const child = child_process.fork('./child.js');

// 监听子进程的消息
child.on('message', event =>console.log(event))

// 向子进程发送消息
child.send('你好，子进程，我是父进程');
```

子进程child.js内容如下：

```js
// 向父进程发送消息
process.send('你好，父进程，我是子进程')

// 监听父进程的消息
process.on('message',event=>console.log(event))
```


