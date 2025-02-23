<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [背景](#背景)
  - [关于背景的属性总览](#关于背景的属性总览)
  - [背景颜色background-color](#背景颜色background-color)
  - [常见的颜色名称参考](#常见的颜色名称参考)
  - [背景图片background-image](#背景图片background-image)
  - [背景图片固定](#背景图片固定)
  - [背景图片尺寸](#背景图片尺寸)
- [边框](#边框)
  - [边框线条的类型](#边框线条的类型)
  - [边框宽度](#边框宽度)
  - [边框颜色](#边框颜色)
  - [单独设置每个边框](#单独设置每个边框)
  - [组合设置](#组合设置)
  - [边框属性汇总](#边框属性汇总)
  - [圆角边框](#圆角边框)
- [轮廓](#轮廓)
- [阴影](#阴影)
  - [块元素的阴影：box-shadow](#块元素的阴影box-shadow)
  - [图片阴影：filter](#图片阴影filter)


## 背景

### 关于背景的属性总览
背景一般包括背景颜色或背景图片。属性如下：
- background： 设置所有背景值的简写属性
- background-attchment： 设置元素的背景附着属性，决定背景图片是否随页面一起滚动。
- background-clip： 设置背景颜色和图像的裁剪区域
- background-color： 设置背景颜色
- background-image： 设置元素背景图像
- background-origin： 设置背景图像绘制的起始位置
- background-position： 设置背景图像在元素盒子中的位置
- background-repeat： 设置背景图像的重复方式
- background-size： 设置背景图像的绘制尺寸

背景包括背景颜色和背景图像。

###  背景颜色background-color

背景颜色使用background-color，不过，一般可以简写为background。

### 常见的颜色名称参考
<br>

<script setup>
        const  items = [
                {text:'蔚蓝', color:'azure'},
                {text:'淡蓝', color:'lightblue'},
                {text:'爱丽丝蓝', color:'AliceBlue'},
                {text:'薰衣草', color:'lavender'},
                {text:'淡紫红', color:'LavenderBlush'},
                {text:'薄荷奶油', color:'MintCream'},
                {text:'白色烟雾', color:'WhiteSmoke'},
                {text:'薄雾玫瑰', color:'MistyRose'},
                {text:'蓟', color:'Thistle'},
                {text:'薄雾玫瑰', color:'MistyRose'},
                {text:'贝壳', color:'SeaShell'},
                {text:'桃', color:'PeachPuff'},
                {text:'兰花草', color:'Orchid'},
                {text:'旧蕾丝', color:'OldLace'},
                {text:'雪白', color:'Snow'},
                {text:'亚麻布', color:'Linen'},
                {text:'蜜露', color:'HoneyDew'},
                {text:'玉米色', color:'Cornsilk'},
                {text:'浅褐色', color:'Beige'},
        ]
</script>

<div  id="container" >
    <div v-for="item in items"  :style="{background: item.color}" class="item"><span>{{item.text}}</span> <span> {{item.color}}</span></div>
</div>

<style scoped>
        #container{
                display: flex;
                gap: 20px;
                flex-wrap: wrap;
        }

        .item{
                border-radius: 20px;
                min-width: 150px;
                min-height: 150px;
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
        }
</style>





###  背景图片background-image

使用网络链接可以设置背景图片。注意，不是直接写链接，而是作为参数传入url()。例如：

```html
<style>

    div {
        width: 700px;
        height: 500px;
        background-image: url(https://www.baidu.com/img/24lianghui_3fa64faa4dd8496d4ab2a1d411a93dad.gif);

}
</style>

<div></div>
```

不过，如果图片比div小，则默认会重复，使用background-repeat设置重复方式：

- space： 完全填充
- no-repeat ： 不重复
- around：

有时候设置背景图片不重复后，还希望背景图片能在容器的正中间显示，此时做如下设置：

```css
background-image: url("https://example.com/example.png");
background-repeat: no-repeat;
background-position: center;
background-attachment: fixed;
```

### 背景图片固定

有时候，我们希望把背景图片固定到页面中，不随之滚动。

```css
body{
	background-image: url("https://example.com/example.png");
	background-repeat: no-repeat;
	background-position: center;
	background-attachment: fixed;
}
```

### 背景图片尺寸

使用background-size手动设置背景图片尺寸，可以是绝对尺寸：

```css
background-size: 400px 500px;
```


也可以是相对尺寸,相对的是容器的宽度和高度:

```css
background-size: 50% 50%;
```

还可以是相对容器的文本字号:

```css
background-size: 2em 4em;
```

上面几个属性值也可以混着使用。

##  边框

大部分元素都可以设置边框，例如p、div、img等等。

### 边框线条的类型

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

### 边框宽度

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

### 边框颜色

border-color

颜色值、RGB、十六进制。

### 单独设置每个边框

在连字符中加入边的指代。left、right、top、bottom。

```css
p{
	border-top-style:dotted;
	border-left-style:solid;
	border-top-color:red;
	border-left-width: 5px;
}
```


###   组合设置

```
- 值1   值2   值3   值4	上->右->下->左
- 值1   值2   值3  	上->左右->下
- 值1   值2   	上下->左右
- 值1  	上下左右
```

```css
p{
	border-style : dashed;
	border-width: 5px 2px;  /* 上下宽5px，左右宽2px */
	border-color: red  green blue;  /*上边颜色红色、左右颜色绿色，下边颜色蓝色*/
}
```


### 边框属性汇总

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

### 圆角边框

要定义圆角边框，使用border-radius属性。

```css
border-radius: 10px;
```

单独一个角：

```css
border-top-left-radius: 10px;
```

类似地，还有右上：top-right，坐下：bottom-left，右下：bottom-right。



## 轮廓

轮廓与边框类似，区别如下：

- 轮廓不占空间
- 无法为一边单独设置轮廓

轮廓包括如下属性：

- outline-color： 设置元素边框外围轮廓线的颜色
- outline-offset： 设置轮廓距离元素边框边缘的偏移量
- outline-style： 设置轮廓的样式
- outline-width： 设置轮廓的宽度
- outline： 轮廓的简写属性。


##  阴影

###  块元素的阴影：box-shadow

之前介绍过text-shadow，这个属性为文本创建阴影。

对于块元素，有一个类似地属性，叫做box-shadow。

box-shadow接受三个值：向下的偏移量、向右的偏移量、阴影颜色。顺序不强制要求。示例如下：

```css
<style>
    #shadow {
        width: 100px;
        height: 100px;
        background: lightblue;
        box-shadow: hsla(90,50%,50%,0.1) 10px 10px;

    }
</style>

<div id='shadow'></div>
```

效果：

<style>
    #shadow {
        width: 100px;
        height: 100px;
        background: lightblue;
        box-shadow: hsla(90,50%,50%,0.1) 10px 10px;
    }
</style>

<div id='shadow'></div>


###  图片阴影：filter

设置图片阴影的公式如下：
```css
filter:drop-shadow( 水平偏移  垂直偏移   模糊半径  扩散半径  阴影颜色 )
```
参数解释：
- 水平偏移：此参数设置图像的水平偏移。正值将创建右侧的偏移量，负值将创建左侧的偏移量。
- 垂直偏移：此参数设置图像的垂直偏移。正值创建到底部的偏移量，负值创建到顶部的偏移量。
- 模糊半径：类似于“羽化”效果，可让图片边缘变得柔和。它是一个可选参数。
- 阴影颜色 : 设置阴影的颜色，可选参数。

示例代码：

```html
<img id="filter" style="width:50vw; position:relative; left:15vw; filter:drop-shadow(0 0 5em  #646cffaa);" 
src="https://img2.baidu.com/it/u=825432673,3258450758&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1740416400&t=d8a017f18348c9a889fdf7601c033f63">
```

效果：

<img id="filter" style="width:50vw;position:relative;left:15vw;filter:drop-shadow(0 0 5em  #646cffaa);" 
src="https://img2.baidu.com/it/u=825432673,3258450758&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1740416400&t=d8a017f18348c9a889fdf7601c033f63">
