

# 弹性布局——先考虑单行布局

在学习弹性布局时，笔者的经验的是：先把单行的情况弄明白，后面多行的情况就好办了。

在本文中，我们先假定父容器的宽度永远是够的。

## 将容器设置成弹性容器

要将容器设置成弹性容器，只需要指定如下样式：

```
display: flex
```

## 主轴方向

首先需要考虑的是水平布局还是垂直布局，正序还是逆序，是否能换行？这三个问题使用flex-flow属性指定。

flex-flow需要指定两个值：方向和是否换行。

方向有四个可选值：
- row： 主轴水平，正序
- row-reverse： 主轴水平，逆序
- column： 主轴垂直，正序
- column-reverse： 主轴垂直，逆序
## 单行或单列情况只需要考虑的三点

单行或单列情况只需要考虑如下三点：

- 横着写还是竖着写？正着写还是反着写？
- 主轴方向上怎么对齐？
- 侧轴方向上怎么对齐？

第一点使用flex-direction属性，这个属性规定了主轴方向。主轴方向很好理解，书写顺序有两种：从左往右写和从右往左写。

- row： 主轴水平，正着写
- row-reverse： 主轴水平，反着写
- column： 主轴垂直，正着写
- column-reverse： 主轴垂直，反着写

如下是一个示例，可以改变flex-direction的值测试效果：

```html
<style>
   #container {
        width: 100%;
        height: 100px;
        padding:10px;
        background: lightblue;
        display: flex;
        flex-direction: row;
    }

    #container div{
        width: 50px;
        height:50px;
        background: red;
        margin:10px;
    }
</style>
<div id="container">

    <div></div>
    <div></div>
    <div></div>
</div>
```
