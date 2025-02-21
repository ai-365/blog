

大部分元素都可以设置边框，例如p、div、img等等。

## 边框样式

边框样式使用border-style制定，默认边框是透明的。因此，如果要设置宽度、颜色，一定一定要首先设置border-style为可见的一种属性，例如solid，这点切记。

大多数情况只需要使用下面这条属性即可：

```css
border-style: solid;
```

border-style可以取如下值：

-  solid  ：定义实线边框，这是最常见的，一般只需要记住这个即可，下面可以不记。
-  none   ： 默认，无边框                
-  dotted ： 定义一个点线边框                
-  dashed  ：  定义一个虚线边框               
-  double ： 定义两个边框。 两个边框的宽度和 border-width 的值相同 
-  groove ： 定义3D沟槽边框。效果取决于边框的颜色值               
-  ridge  ： 定义3D脊边框。效果取决于边框的颜色值          
-  inset  ： 定义一个3D的嵌入边框。效果取决于边框的颜色值        
-  outset ： 定义一个3D突出边框。 效果取决于边框的颜色值            

## 边框宽度

指定宽度值：

```css

    border-width:5px;
```

使用内置关键字： thick 、medium（默认值） 和 thin。

```css
p{
border-style:solid;
    border-width:medium;
}
```

## 边框颜色

border-color

颜色值、RGB、十六进制。

## 单独各边

在连字符中加入边的指代。left、right、top、bottom。

```css
p{
	border-top-style:dotted;
	border-left-style:solid;
	border-top-color:red;
	border-left-width: 5px;
}
```

## 合并样式

```
p{
	border:5px solid red;
}
h1{
	border-top:5px solid red;
	border-left:5px dotted green;
}
```

## 快速设置四边框数值

- 值1   值2   值3   值4	上->右->下->左
- 值1   值2   值3  	上->左右->下
- 值1   值2   	上下->左右
- 值1  	上下左右

```css
p{
	border-style : dashed;
	border-width: 5px 2px;  /* 上下宽5px，左右宽2px */
	border-color: red  green blue;  /*上边颜色红色、左右颜色绿色，下边颜色蓝色*/
}
```


## 边框汇总

对于边框需要考虑几点：
- 哪一边：分为top、bottom、left、right。如果不写，则为所有边。
- width： 宽度。
- style：样式。包括虚线、实现、单点划线、双点划线等。
- color：边框的颜色。
- image：边框的图像。图像与颜色只能选择一种。

边框包括如下属性：

- border： 为所有边界设置的简写属性，包括宽度、样式、颜色。
- border-top/bottom/left/right： 为上、下、左、右单独设置的属性。
- border-bottom-color： 为下边框设置的颜色，其它方向类似。
- border-bottom-left-radius： 将边框左下角设置为圆角，属性值为圆角值，其它方向为bottom-right、top-left、top-right。
- border-bottom-style： 设置下边框的样式，其它方向类似。
- border-bottom-width： 设置下边框的宽度，其它方向类似。
- border-color： 统一设置四边的颜色。
- border-image： 设置四边的图像
- border-image-outset：指定图像向边框盒外部扩展的区域。
- border-image-repeat： 指定边框图像的缩放和重复方式。
- border-style： 统一设置四边的样式。
- border-top-style：设置上边框的样式，其它方向类似。
- border-width：统一设置四边的宽度。
- box-shadow：设置元素的一个或多个阴影效果。

## 圆角边框

要定义圆角边框，使用border-radius属性。

```
border-radius: 10px;
```

单独一个角：

```
border-top-left-radius: 10px;
```

类似地，还有右上：top-right，坐下：bottom-left，右下：bottom-right。
