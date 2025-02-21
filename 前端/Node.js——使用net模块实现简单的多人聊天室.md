

**服务端**

```js

const net = require('net');
const server = net.createServer();
const users = [];
server.on("connection", client => {
    // 有新连接时维护进列表，并群发消息
    users.push(client)
    console.log('有新连接')
    users.forEach(user => {
        if (user != client) {
            user.write('有新连接')
        }
    })
    // 有新的数据时，群发消息
    client.on("data", data => {
        console.log(data.toString().trim())
        users.forEach(user => {
            if (user != client) {
                user.write(data.toString())
            }
        })
    })
})
server.listen(8888, () => console.log('服务器已启动'))

```


**客户端**

```
const net = require('net');
const client = net.createConnection({host:'127.0.0.1',port:8888})
process.stdin.on('data',data=>client.write(data.toString()))
client.on('data',data=>console.log(data.toString().trim()))
```
