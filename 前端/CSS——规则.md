<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>


- [样式优先级](#样式优先级)
- [!important标记](#important标记)


### 样式优先级

可以在多处为同一个元素多次设置样式，这需要基于某种规则进行优先级排序，优先级高的会覆盖掉优先级低的属性。CSS样式的优先级从高到底排序如下：

- 元素内嵌样式： 使用style属性写在标签内。
- 文档内嵌样式： 定义在`<style></style>`中的样式。
- 外部样式： link元素的ref属性链接的样式。


###  !important标记

如果在属性值结尾带上!important标记，那么就表示此处的优先级最高。例如下面的例子中，根据优先级规则，h1标题的文本应该为蓝色，但是由于style中使用了!important，此时style中的那个属性优先级最高，最终结果为红色。

```html
<style>
h1{color: red !important;}
</style>

<h1 style="color:blue;">Hello,CSS</h1>
```
