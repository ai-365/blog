# document对象

document对象有三大用途：
- 获取和设置文档元信息： 如document.title、document.location。
- 查找元素： 使用“getElementBy”和“querySelector”系列方法查找元素，或者查找特定元素例如document.body。
- 创建元素。


以下总结了document对象的大多数成员：

- activeElement： 当前获得焦点的对象。
- body ： 返回body元素对象
- characterSet： 返回文档的字符集编码。这是一个只读属性。
- charset： 返回或设置文档的字符集编码。
- childNodes： 返回子元素的集合
- compatMode： 获取文档的兼容性模式。
- cookie： 获取或设置当前文档的cookie。
- defaultCharset： 获取浏览器使用的默认字符编码
- defaultView： 返回文档的window对象。
- dir：获取或设置文档的文本方向。
- domain：获取或设置文档的域名。
- embeds、plugins： 返回所有代表文档embeds元素的对象。
- firstChild： 返回第一个子元素
- forms： 返回文档中的form元素
- getElementById("idName") : 返回指定id值的元素
- getElementsByClassName("class") ：返回指定class值的元素对象，无论找到0个、1个还是多个，始终返回`HTMLCollection []`，这是一个类数组对象。
- getElementsByName("name")：返回指定name值的元素，如果有多个，则返回数组。无论找到0个、1个还是多个，始终返回`NodeList []`对象，这是一个类数组对象。
- getElementsByTagName("tag") ：返回带有指定tag的元素。无论找到0个、1个还是多个，始终返回`HTMLCollection []`类型的对象，这是一个类数组对象。
- hasChildNodes()：如果当前元素有子元素则返回true。

**document.writeln()**

该方法会使用传入的内容覆盖文档。请谨慎使用该方法。

**document.getElementsByTagName()**

该方法通过元素标签查找元素，一般会找到多个元素，返回的结果是HTMLElement对象组成的集合。得到这个集合后，可以使用for循环对每个找到的元素进行操作。
