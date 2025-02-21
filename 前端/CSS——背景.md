
## 背景

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

## 背景颜色

背景颜色使用background-color，不过，一般可以简写为background。


## 背景图片

使用网络链接可以设置背景图片。注意，不是直接写链接，而是作为参数传入url()。例如：

```
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

## 背景图片固定

有时候，我们希望把背景图片固定到页面中，不随之滚动。

```css
body{
	background-image: url("https://example.com/example.png");
	background-repeat: no-repeat;
	background-position: center;
	background-attachment: fixed;
}
```

## 背景图片尺寸

使用background-size手动设置背景图片尺寸，可以是绝对尺寸：

```
background-size: 400px 500px;
```


也可以是相对尺寸,相对的是容器的宽度和高度:

```
background-size: 50% 50%;
```

还可以是相对容器的文本字号:

```
background-size: 2em 4em;
```

上面几个属性值也可以混着使用。

