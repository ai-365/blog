


## 过渡

过渡表示当某个属性发生**变化**时，应该在一定的时间内以动画的形式展现。

过渡使用transition属性 ，该属性是一种简写方式，同时接收三个值：
- 过渡的属性，如果有多个属性，使用逗号隔开。
- 过渡时间，单位为s或ms。
- 过渡的渐变方式。

过渡的渐变方式主要有：
- linear： 线性过渡
- ease：中间较慢，两端较快
- ease-in-out： 中间较快，两端较慢
- ease-in： 慢速开始，然后加速
- ease-out： 快速开始，然后减速

为了直观的呈现过渡，一般使用:hover定义鼠标悬停的样式。

```html
<style>
    div {
        width: 100px;
        height: 100px;
        background: lightblue;
        transition: background 0.5s ease-in-out;
    }

    div:hover {
        background: lightgreen;
    }
</style>
<div></div>
```
