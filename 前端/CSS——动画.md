
## 定义关键帧

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

## 定义动画

animation主要包括如下细分属性：
- animation-name	|	动画名称
- animation-duration	|	播放时长
- animation-delay	|	延迟时间
- animation-direction	|	方向，默认正向，反向为reverse
- animation-timing-function	|	速度函数

一般情况下，将几个属性合在一起写，如同上述的例子一样。绝大多数情况会用到如下5个属性，依次指定即可。

```css
animation : 关键帧名称  时长  次数  过渡类型  方向
```

这5个属性中，必须设置的是前两个：关键帧名称、时长。因为时长默认为0s。

时长为播放一次动画的时间，单位为s或ms。

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
- alternate： 第一次正向，第二次反向，第三次正向，第四次反向，依此类推。
- alternate-reverse：与alternate类似，只不过反过来，奇数次反向，偶数次正向。


## 动画的组合

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
    @keyframes size-fade {
        from {
            width: 10px;
            height: 10px;
        }

        to {
            width: 200px;
            height: 200px;
        }
    }

    @keyframes color-fade {
        from {
            background: lightblue;
        }

        to {
            background: lightcoral;
        }
    }

    div {
        animation: size-fade 3s infinite ease, color-fade 3s  infinite ease;

    }
</style>

<div></div>
```