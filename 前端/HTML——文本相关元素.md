<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [p段落](#p段落)
- [a链接](#a链接)
  - [生成内部超链接](#生成内部超链接)
  - [target：设置链接的打开方式](#target设置链接的打开方式)
- [pre和code](#pre和code)


##  p段落

对于以文本为主的网页来说，最常见的就是段落了，包裹在`<p></p>`中。

一对标签中的内容就是一段，哪怕在源代码中换行，渲染出的页面也是没有换行的，任何换行、空白行渲染出来都只有一个空格。

```html
<p>你以为的第一段

你以为的第二段

你以为的第三段
</p>
```

实际上，渲染出来是：
```
你以为的第一段 你以为的第二段 你以为的第三段
```
要想将上面的内容分成真正的三段，只有使用三对`<p></p>`标签。

##  a链接

### 生成内部超链接

href属性值可以是井号加上id，这样，当用户点击这个链接时，浏览器会在页面中查找该id属性值对应的元素，并且滚动到视口中。

```html
<a href="#fruit">点我去目的地</a>

<div style="width:100px;height:2000px;background:azure"></div>

<p id="fruit">目的地</p>
```

### target：设置链接的打开方式

- `_blank` 在新窗口或标签页中打开链接
- `_parent`  在父窗框组中打开链接
- `_self`：在当前窗口打开链接（这是默认行为）
- `_top`：在顶层窗口打开链接
- `<frame>`：在制定窗框中打开链接

##  pre和code

在markdown中经常需要写代码块。

`<pre>`定义预格式文本，`<code>`定义代码。

如下是一个典型的代码块：

```html
    <pre>
        <code>
            console.log("Hello World")
        </code>
    </pre>
```

不过，这里没有语法高亮，市面上许多markdown编辑器都提供了语法高亮的方案。