
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


