
##  桌面通知

可以直接调用Notification()函数即可创建一条通知，代码示例如下：

```html
<script>
        new Notification( 'Title', {body:'content', icon:'notice.png'} )
</script>
```

不过，需要注意两点：
-  不能直接以本地文件运行，要以服务器形式运行
-  需要手动允许通知权限

首先，点击浏览器链接左边的标记，点击“此网站的权限”。

![JavaScript——WebAPI——通知权限](https://s21.ax1x.com/2025/02/21/pEQz7m8.png)

找到通知那一栏，设置为“允许”。

![JavaScript——WebAPI——通知权限2](https://s21.ax1x.com/2025/02/21/pEQzbTg.png)

这样，就可以看到桌面通知了。
