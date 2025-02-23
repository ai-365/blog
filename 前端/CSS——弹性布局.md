<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;top:60vh;font-size:1.5rem ">🔼</a>

- [将容器设置为弹性容器](#将容器设置为弹性容器)
- [相关属性一览](#相关属性一览)
- [子元素的flex属性](#子元素的flex属性)
- [主轴方向flex-direction](#主轴方向flex-direction)
- [单行或单列情况只需要考虑的三点](#单行或单列情况只需要考虑的三点)

###  将容器设置为弹性容器

使用如下两种方式：
-  display: flex;
-  display: inline-flex; 

###  相关属性一览

- justify-content：子项目作为一个整体，相对于父级的主轴线对齐的方式。
- align-items ：子项目作为一个整体，相对于父级容器的交叉轴线对齐的方式。
- align-content ： 设置子项目在各个行内部之间在主轴线上的对齐方式。请注意，该选项只有在存在多行元素的时候才有效，如果只有一行，此选项无效。
- align-self ：设置弹性元素内部之间在交叉轴线方向上的对齐方式。

### 子元素的flex属性

可以在我们的所有子元素上添加flex 属性，并赋值为相同的数值比如1，这会使得所有的子元素都伸展并填充容器，而不是在尾部留下空白，如果有更多空间，那么子元素们就会变得更宽，反之，他们就会变得更窄。

flex值对应着该子元素相对于父元素占用宽度的比例，例如两个子元素的flex值分别为2和1，这表示这两个子元素的宽度为2：1。

### 主轴方向flex-direction

首先需要考虑的是水平布局还是垂直布局，正序还是逆序，是否能换行？这三个问题使用flex-flow属性指定。

flex-flow需要指定两个值：方向和是否换行。

方向有四个可选值：
- row： 主轴水平，正序
- row-reverse： 主轴水平，逆序
- column： 主轴垂直，正序
- column-reverse： 主轴垂直，逆序
  


  
### 单行或单列情况只需要考虑的三点

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
