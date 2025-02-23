Node.js 可以很方便的自定义事件，如下示例：

```js
const events = require('events');

const myevent = new events();
myevent.on('event', () => {
  console.log('an event occurred!');
});
myevent.emit('event');
```