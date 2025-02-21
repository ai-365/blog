
要在浏览器本地存储数据，可以使用cookie、local storage、session storage，这三种对象的区别如下：
- cookie： 最古老的方式，使用特定的格式字符串存储和传输本地数据。
- local storage： 持久化的本地存储，在关闭浏览器后依然有效。
- session storage： 临时的本地存储，在关闭窗口后删除。

下面讲解localStorage对象的使用方法。

要存储键值对，使用setItem()方法：

```
localStorage.setItem(key, value)
```

也可以直接使用点号语法：

```
localStorage.key = value
```

要读取键对应的值，使用getItem()方法：

```
localStorage.getItem(key)
```

也可以直接使用点号语法：

```
console.log(localStorage.key)
```

要删除键值对，使用removeItem()方法：

```
localStorage.removeItem(key)
```

使用clear()方法可以清空所有本地存储的键值对：

```
localStorage.clear()
```
