
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