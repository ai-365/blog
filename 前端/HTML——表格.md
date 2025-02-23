<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [换行](#换行)
- [表头](#表头)
- [边框](#边框)

要建立一个表格，有三个标签必不可少：`table`、`tr` 、`td`。这三个元素是嵌套的关系：tr必须是table的子元素，td必须是tr的子元素。

table 表示一个表格。子元素是tr。

tr表示一行。子元素是td。

td表示一个单元格。

示例如下：

```html
<table>
	<tr>
		<td>1</td><td>2</td>
	<tr>	
	<tr>
		<td>3</td><td>4</td>
	</tr>
</table>
```

每一个表格的内容都包含在`<table></table>`这两个标签中。

在表格中，最小的内容容器是单元格，是通过 `<td>` 元素创建的，“td”代表“table data”。

下面是只有一个单元格的表格实例：

```html
<table border="1">
  <tr>
    <td>100</td>
  </tr>
</table>
```

注意，这里我们使用border属性为表格显示边框，如果没有这个属性，表格将没有边框。

下面是一行四个单元格的表格示例：

```html
<table border="1">
<td>Hi, I'm your first cell.</td>
<td>I'm your second cell.</td>
<td>I'm your third cell.</td>
<td>I'm your fourth cell.</td>
</table>
```

## 换行

如果想让这一行停止增加，并让单元格从第二行开始，我们需要使用 `<tr> `元素（其中“tr”代表“table row”）。

下面是2行2列的表格示例：

```html
<table border="1">
    <tr>
        <td>Hi, I'm your first cell.</td>
        <td>I'm your second cell.</td>
    </tr>
    <tr>
        <td>I'm your third cell.</td>
        <td>I'm your fourth cell.</td>
    </tr>
</table>
```

## 表头

很多时候，我们希望有个表头指明每一列的含义，表头使用`<th>`标签，表示“table header”。`<th>`依然是一行，包裹在`<tr>`中。

```html
<table border="1">
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>
```

## 边框

默认每个单元格是不太好看的，一方面，表格最外边存在一个外边框，另一方面，每个单元格中间是有空隙的，这导致单元格之间有两条边框。为了让表格好看一点，建议设置如下的样式：

```css
table{
     border-collapse:collapse;   /* 取消表格和单元格的重复外边框 */
}
```

还可以为单元格边框设置一些样式：

```css	
tr td,th{
	    border:2px solid red;
}
```