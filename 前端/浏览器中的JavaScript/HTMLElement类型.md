# HTMLElement类型
所有HTML元素都是HTMLElement类型或子类型的实例。

每个HTML元素都有的标准属性如下：
- id ：id属性，唯一标识元素。
- title：元素的额外信息。
- tagName：标签名。注意，返回的是大写，例如"DIV"、"P"。
- dir：书写方向。
- className： 元素的class属性值。因为class是Ecmascript类定义的关键字，所以不能用这个名字。

可以通过三个方法读写元素的属性：
- getAttribute()
- setAttribute()
- removeAttribute()

很多常见的元素属性就可以使用`对象.属性名`的方式读写，也可以使用`对象.setAttribute()`的方式读写，例如可以用两种方式设置元素的id属性：

```
mydiv.id = "new-id"
mydiv.setAttribute("new-id")
```