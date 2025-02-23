<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [变换](#变换)
  - [一个平移示例](#一个平移示例)
  - [变换函数汇总](#变换函数汇总)
- [渐变](#渐变)
  - [线性渐变](#线性渐变)
  - [径向渐变](#径向渐变)



##  变换

### 一个平移示例
如下是一个平移示例：

```html
<body>
    <style>
        h1:hover {
            transform: translateX(50px)
        }
    </style>
    <h1>平移示例</h1>
</body>
```

### 变换函数汇总

-  translate(x, y)	向右向下平移
-  translateX(x)	向右平移
-  translateX(y)	向下平移
-  scale(x,y)	x为宽的缩放比例，y为高的缩放比例
-  scaleX(x)	宽的缩放比例为x
-  scaleY(y)	高的缩放比例为y
-  rotate(ndeg)	顺时针旋转n度
-  rotateX(ndeg)	绕x轴旋转n度
-  rotateY(ndeg)	绕y轴旋转n度
-  skew(ndeg,mdeg)	绕x轴倾斜n度，绕y轴倾斜m度
-  skewX(ndeg)	绕x轴倾斜n度
-  skewY(ndeg)	绕y轴倾斜n度



##  渐变


### 线性渐变

线性渐变使用如下函数：

```
linear-gradient()
```

线性渐变需要指定：

- 方向
- 起始颜色
- 终止颜色


方向可以有两种方式，第一种方法是使用to关键字搭配一个方向，分别是：

- to right： （从左）到右
- to bottom： （从上）到下
- to left： （从右）到左
- to top： （从下）到上

```html
<style>
    div {
        width: 300px;
        height: 300px;
        background: linear-gradient(to right, red, blue);
    }
</style>

<div></div>
```

第二种方法是使用deg角度，其主要值如下：

- 0deg： 从下到上，等同于to top
- 45deg： 从左下到右上。
- 90deg： 从左到右。
- 依此规律，按顺时针改变。

例如：

```html
<style>
    div {
        width: 300px;
        height: 300px;
        background: linear-gradient(45deg, red, blue);
    }
</style>

<div></div>
```

大多数情况只需要指定起始和终止颜色即可，当然，也可以多设置几个值，方法是在每个颜色值后面附带上百分数，表示渐变的位置，例如：

```html
<style>
    div {
        width: 500px;
        height: 100px;
        background: linear-gradient(to right, red 0%, blue 25%, orange 50%, green 75%, purple 100%);
    }
</style>

<div></div>
```


###  径向渐变
径向渐变使用如下函数:

```css
radial-gradient()
```

下面是一个最简单的径向渐变：

```html
<style>
    div {
        width: 100px;
        height: 100px;
        background: radial-gradient( red, orange);
    }
</style>

<div></div>
```

径向渐变默认以中心作为起始位置开始向四周发散，也可以使用其它位置，如下示例以右上角为中心发散：

```html
<style>
    div {
        width: 100px;
        height: 100px;
        background: radial-gradient(at top right, red, orange);
    }
</style>

<div></div>
```