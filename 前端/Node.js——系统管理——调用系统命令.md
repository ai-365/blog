


## spawn

使用child_process模块的spawn()方法示例如下：

```
const { spawn } = require('child_process');
const ls = spawn('powershell',['ls','.']);

ls.stdout.on('data', (data) => {
  console.log(data.toString());
});
```

spawn()方法的第一个参数应该指定一个shell，例如Windows平台的powersh、Linux平台的bash。第二个参数是一个数组，包含以空格分隔的具体命令的各个部分。

## exec

使用process_childprocess模块的exec()方法的示例如下：

```js
const { exec } = require('child_process')
exec('powershell ls .', (error, stdout, stderr) => {
  console.log(stdout)
})
```
## execFile

```js
const { execFile } = require('node:child_process')
const child = execFile('powershell', ['ls'], (error, stdout, stderr) => {
  console.log(stdout)
})
```


不过，值得注意的是，在Windows平台上运行上面三个示例时，如果路径存在中文，则会有乱码。