
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