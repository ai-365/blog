
zx.js有一些内置函数，名称和作用基本和Linux的Shell命令类似。内置函数不需要使用import关键字导入，可以直接使用。

## cd（）

该函数允许更改当前的工作目录，类似于Linux的cd命令。

```
cd('/tmp')
await $`pwd` // outputs /tmp
```

## fetch（）
该函数用于执行http网络请求，具体用法可参考JavaScript内置的fetch API用法。

```
let response = await fetch('https://wttr.in'){  console.log(await response.text())}
```



## question（）

该函数用于提示用户输入，以便为变量取得用户设定的值，类似于Linux的read命令。
```
const name = question('请输入你的名字：')
```
	

## chalk()
该函数用于修改终端输出的文字颜色。

```
console.log(chalk.blue('This is blue'));
```
