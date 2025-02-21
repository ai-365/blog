

如果文字被放置在div中，要让文字在横向上居中很简单，只需要设置text-align： center即可。

但是，要让文字纵向居中却没有直接的样式了，在弹性布局出现之前，已经有一些方案。不过，弹性布局出现之后，这个问题变得简单了。

只需要对父容器div的样式做3行设置即可保持文字横向、纵向的居中：

```
display: flex;
justify-content: center;
align-itmes: center;
```

示例如下：

```html
<style>
    div {
        width: 50%;
        height: 300px;
        background: lightblue;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<div>我是文字 </div>
```