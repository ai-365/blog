
## 线性渐变

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

