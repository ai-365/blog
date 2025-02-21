
## 生成内部超链接

href属性值可以是井号加上id，这样，当用户点击这个链接时，浏览器会在页面中查找该id属性值对应的元素，并且滚动到视口中。

```html
<a href="#fruit">点我去目的地</a>

<div style="width:100px;height:2000px;background:azure"></div>

<p id="fruit">目的地</p>
```

## target：设置链接的打开方式

- `_blank` 在新窗口或标签页中打开链接
- `_parent`  在父窗框组中打开链接
- `_self`：在当前窗口打开链接（这是默认行为）
- `_top`：在顶层窗口打开链接
- `<frame>`：在制定窗框中打开链接