
DOM，Document Object Model，文档对象模型。DOM把JavaScript与HTML联系起来，使用DOM，你可以使用JavaScript获取、添加、移除和操作各种元素。你还可以使用事件（event）来响应用户的交互操作，例如鼠标的单击、键盘的按键。你还可以完全控制CSS。

## HTMLElement类型

使用DOM时，打交道最多的应该是HTMLElement类型。document就是HTMLElement类型的实例。

## 有关的对象类型

在DOM中，有关对象类型如下：

- Node类型： 这表示文档中的节点，是所有类型的基类。不仅仅是HTML元素对象（HTMLElement），文本类型（Text）、注释（Comment）都是Node类型的子类。因此，元素、文本、注释都可以统一称呼为节点。
- HTMLElement：元素对象类型。大部分元素例如div、p、form都是该类型的实例。经常用到的内置document对象就是该类型的实例，不过浏览器为document添加了很多属性和方法。所有HTML元素都是HTMLElement类型或子类型的实例。
- Text： 被标签包裹的文本对应的类型就是Text类型。
- Commet： DOM中的注释对应Commet类型。

当然还有其它类型，我们重点关注三个类型及其用法：Node、HTMLElement、Text。

我们会用到DOM中的许多属性和方法，这些成员大致可分为两类：
- 与节点层级相关的，例如appendChild()、insertBefore()、lastChild等，这些通常是Node类型中定义的成员。
- 专注于单个元素内部属性的设置，setAttribute()、onclick、className、style等，这些通常是HTMLElement类型中定义的成员。
- document对象，这个对象用的最多。如使用“getElementBy”系列方法查找元素，使用createElement()创建元素，获取body、title等预置属性。
- window对象。全局对象。

## 区分文档、页面、窗口

很多时候不会刻意区分这三个概念，不过还是有必要说明一下。

页面一般指由body元素包裹的实际内容区域。

文档包括页面、标题、链接、cookie、相关的浏览器设置等等。

窗口指用户此时正在交互的图形界面。我们可以获取窗口的大小、与屏幕的边距等信息。

