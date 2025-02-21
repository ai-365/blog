
CSS中的单位用的最多的是长度单位，可以使用绝对长度和相对长度。

绝对长度使用一般只需要知道px即可，它是像素的单位。

相对长度使用百分号表示，表示相对于父级元素的同名属性的长度。

如下示例，#div2是#div1的子元素，其长宽均为#div1的一半：

```html

<style>
#div1{
    background-color: antiquewhite;
    width:200px;
    height:100px;
}
#div2{
    background-color: red;
    width:50%;   /*相对于.div1的长度的一半*/
    height:50%;   /*相对于.div1的宽度的一半*/
}
</style>

<div id="div1">
    <div id="div2">
</div>
</div>

```
