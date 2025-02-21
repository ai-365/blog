本文内容：
- [相对定位](#相对定位)
- [绝对定位](#绝对定位)
- [固定定位](#固定定位)
- [粘滞定位](#粘滞定位)

## 相对定位

相对定位相对较容易理解。相对于本来所在的位置进行偏移、

相对定位元素偏移到新位置后，其原来的位置会产生一片空白，并不会被填充。同时，相对定位元素偏移后也可能叠加在其它元素的上方。

需要说明的是，设置position:relative后，要至少设置top、left、right、bottom中的一个属性，如果都没有设置，就不会产生任何偏移，相当于没有设置position：relative。

要真正理解相对定位，重点在于相对定位的形成过程，而非呈现结果：

- 元素在没有设置position的时候有一个初识位置。
- 设置了position:relative和偏移量后，相对自身进行了偏移。
- 原先的位置留下空白，不会被自动填充。
- 文档流元素的增减会改变该元素的初识位置，经过偏移之后位置也会改变。

```html
<style>
    .div {
        background: red;
        width: 300px;
        height: 300px;
        margin: 20px;
    }

    #p1 {
        position: relative;
        left: 100px;
        top: 100px;
    }
</style>

<div class="div">第一个div</div>
<div class="div">第二个div</div>
<div class="div">
    <p id="p1">此段落相对于本来的位置向右偏移100px、向下偏移100px</p>
</div>
```

## 绝对定位

要真正理解绝对定位，就要理解绝对定位最终形成的结果：

- 永远相对于容纳块保持恒定的偏移。
- 只要容纳块位置不变，不管容纳块的子元素如何增减，其位置不会改变。

需要注意的是，至少要设置一个偏移量，否则position：absolute无效，相当于没有设置。

这种定位相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于`<html>`。

absolute通常也叫做绝对定位，是因为使用这种定位的元素往往会覆盖后面的元素，可以形象的理解为在HTML页面上新建一个图层。

绝对定位用于将元素移出正常布局流 (normal flow)，以坐标的形式相对于它的容器定位到 web 页面的任何位置。

打个很简单的比方，拿一张A4纸，在纸上某一个位置画一个符号，以后你在纸上再怎么写都改变不了这个符号在这个纸上的位置。

```html
<style>
    .div1 {
        background: red;
        width: 300px;
        height: 300px;
        margin: 20px;
    }

    #p1 {
        position: absolute;
        left: 100px;
        top: 100px;
    }
</style>

<div class="div1"></div>
<div class="div1"></div>
<div class="div1"></div>
<div class="div1">
    <p id="p1">不管页面元素怎么增减，此段落的位置永远距离页面左边100px、右边100px</p>
</div>
```

## 固定定位

相对于视口位置，我们经常见到很多商城网站在顶部有一个悬浮导航栏，无论滑动条向下拉多远，这个导航栏一直存在与屏幕的顶部（假设不改变浏览器窗口大小和位置），我们一直看得见，这里就用了固定定位。

固定定位 (fixed positioning) 同绝对定位 (absolute positioning) 一样，将元素从文档流 (document flow) 当中移出了。而且还不受底下的页面滚动的影响。

```html
<style>
#div1{
    background-color: antiquewhite;
    width:50%;
    height:100px;
}
#p1{
    position: fixed;
    top: 0px;
}
</style>
<div class="div3">
    <p class='p3'>此段落相当于在电脑屏幕上新建了一个图层</p>
</div>
```

使用常见的案例更容易理解固定定位：

- 商城的导航栏，不论怎么滚动，导航栏永远处于屏幕的某个位置
- 长页面右下角通常有一个“一键回顶部”按钮，这个按钮永远都处于屏幕的右下角

## 粘滞定位

sticky 英文字面意思是粘，粘贴，所以可以把它称之为粘性定位。

当页面规定没有超出目标区域时，它的行为就像 position:relative；当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。