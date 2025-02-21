
## 安装

使用如下命令全局安装zx，以便在任何文件夹内使用：
```
npm i -g zx
```

## 第一个示例

新建一个文件例如ls.mjs。编辑内容如下：

```
import { $ } from "zx";
$.verbose = false;
const output = (await $`ls`).stdout.trim();
console.log(output);
```

然后运行：
	zx ls.mjs

## 代码解释

$.verbose默认为true，会输出被调用的shell命令本身，我们这里设置为false。

$符号的作用是调用shell命令，大多数命令的调用都是异步的，所以加上await。

有些命令是用于执行操作，没有输出，例如mkdir、rename等。而有些命令我们是需要得到其输出结果的，例如ls、cat等。对于需要得到结果的命令，使用stdout（）函数以字符串的形式取回命令的输出结果，这相当于shell的重定向操作。最后，由于命令输出结果可能会在最后一行包含空白行，所以我们使用trim（）方法去掉字符串的空白行。

