
# 特效

##  线性渐变

线性渐变使用如下函数：

```css
linear-gradient(角度, 起始颜色, 终止颜色)
```

```css
<style>
    div {
        width: 300px;
        height: 300px;
        background: linear-gradient(45deg,red,blue);
    }
</style>

<div></div>
```

角度单位是deg。0表示从下到上，45deg从左下到右上。


##  过渡

过渡表示当某个属性发生变化时，应该在一定的时间内以动画的形式展现。

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

为了直观地呈现过渡，通常使用:hover定义鼠标悬停时的样式。

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

##  动画

-  定义关键帧
-  定义动画
-  定义动画组合

为某个属性定义一个动画帧：

```html
<style>
@keyframes color-fade
{
    from {background:lightblue;}
    to {background:lightgreen;}
}

div{
        width: 100px;
        height: 100px;
        background: lightblue;
        animation: color-fade 0.5s ;
}
</style>

<div></div>
```

### 定义动画

animation主要包括如下细分属性：
- animation-name： 动画名称
- animation-duration： 播放时长
- animation-delay： 延迟时间
- animation-direction： 方向，默认正向，反向为reverse
- animation-timing-function： 速度函数

一般情况下，将几个属性合在一起写，如同上述的例子一样。绝大多数情况会用到如下5个属性，依次指定即可。

```css
animation : 关键帧名称  时长  次数  过渡类型  方向
```

这5个属性中，大多数情况设置的是前三个个：关键帧名称、时长、次数。

时长为播放一次动画的时间，单位为s或ms。默认为0，如果不设置就看不到动画。

次数是一个整数值，如果需要一直播放，设为infinite。

过渡的意思是淡入淡出等效果，主要的过渡类型如下：

- linear	：	动画从开始到结束的速度是相同的
- ease	 ：	默认值，动画以低速开始，然后加快，在结束前变慢
- ease-in	：	 动画以低速开始
- ease-out	 ：	动画以低速结束
- ease-in-out	：	动画以低速开始，并以低速结束

方向有四个值：
- norma： 默认，从0%到100%
- reverse： 反向，每次都从100%到0%
- alternate： 第一次正向，第二次反向，第三次正向，第四次反向，依此类推，此选项可以模拟动画的呼吸效果。
- alternate-reverse：与alternate类似，只不过反过来，奇数次反向，偶数次正向。


### 动画的组合

动画的组合分有两种方式：
- 在一个关键帧定义中，写多个属性，用分号分隔
- 在animation值中，写多个关键帧，用逗号分隔

可以将强关联的属性组合起来，比如：

```html
<style>
    @keyframes fade{
        from{width:10px; height:10px; background: lightblue;}
        to{width:200px; height:200px; background: lightcoral;}
    }
    div{
        animation: fade 3s infinite ease;
    }
    </style>
    
    <div></div>
```

也可以将多个关键帧组合，例如：

```html
<style>
    @keyframes 尺寸{
        from {
            width: 10px;
            height: 10px;
        }

        to {
            width: 200px;
            height: 200px;
        }
    }

    @keyframes 颜色 {
        from {background: lightblue;}
        to {background: lightcoral;}
    }

    div {
        animation: 尺寸 3s infinite ease, 颜色  3s infinite ease;
    }
</style>

<div></div>
```

##  图片阴影

```css
filter:drop-shadow( offset-x offset-y blur-radius spread-radius color )
```

- ffset-x：此参数设置图像的水平偏移。正值将创建右侧的偏移量，负值将创建左侧的偏移量。
- offset-y：此参数设置图像的垂直偏移。正值创建到底部的偏移量，负值创建到顶部的偏移量。
- blur-radius：设置模糊半径的值。它是一个可选参数。
- spread-radius：设置扩散半径的值。它是一个可选参数。
- color:它设置阴影的颜色。它的可选参数。


```html
<style>
    img{
        filter: drop-shadow(0 0 5em #646cffaa)
    }
</style>

<img src="1.png">
```

##  利用border-radius属性实现裁剪

大多数情况下，我们需要将div或者图片裁剪成圆角矩形或圆形，此时，可以很使用如下属性：

```css
border-radius: 50%;
```

如下示例将div裁剪成圆角矩形：

```html
<style>
   div{
    width:100px;
    height:100px;
    background: lightblue;
    border-radius: 25%;
   }
</style>

<div></div>
```

如下示例将图片裁剪成圆形：

```html
<style>
   img{
    border-radius: 50%;
   }
</style>

<img src="1.png" alt="">
```

##  块阴影box-shadow

之前介绍过text-shadow，这个属性为文本创建阴影。

对于块元素，有一个类似地属性，叫做box-shadow。

box-shadow接受三个值：向下的偏移量、向右的偏移量、阴影颜色。顺序不强制要求。示例如下：

```css
<style>
    div {
        width: 100px;
        height: 100px;
        background: lightblue;
        box-shadow: orange 10px 10px;
    }
</style>

<div></div>
```

