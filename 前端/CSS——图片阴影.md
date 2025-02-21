


filter:drop-shadow( offset-x offset-y blur-radius spread-radius color )

- ffset-x：此参数设置图像的水平偏移。正值将创建右侧的偏移量，负值将创建左侧的偏移量。
- offset-y：此参数设置图像的垂直偏移。正值创建到底部的偏移量，负值创建到顶部的偏移量。
- blur-radius：设置模糊半径的值。它是一个可选参数。
- spread-radius：设置扩散半径的值。它是一个可选参数。
color:它设置阴影的颜色。它的可选参数。


```html
<style>
    img{
        filter: drop-shadow(0 0 5em #646cffaa)
    }
</style>

<img src="1.png">
```
