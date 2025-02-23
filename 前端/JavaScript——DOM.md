<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [相关的对象和类型](#相关的对象和类型)
  - [HTMLElement类型](#htmlelement类型)
  - [区分文档、页面、窗口](#区分文档页面窗口)
  - [document对象](#document对象)
- [窗口](#窗口)
  - [窗口尺寸](#窗口尺寸)
  - [窗口事件](#窗口事件)
- [操作节点](#操作节点)
  - [元素、节点的区别](#元素节点的区别)
  - [节点属性](#节点属性)
  - [使用document获取节点](#使用document获取节点)
  - [使用innerHTML属性设置元素内容](#使用innerhtml属性设置元素内容)
  - [添加节点](#添加节点)
  - [复制节点](#复制节点)
  - [删除节点](#删除节点)



DOM，Document Object Model，文档对象模型。DOM把JavaScript与HTML联系起来，使用DOM，你可以使用JavaScript获取、添加、移除和操作各种元素。你还可以使用事件（event）来响应用户的交互操作，例如鼠标的单击、键盘的按键。你还可以完全控制CSS。

##  相关的对象和类型


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


### HTMLElement类型

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


### 区分文档、页面、窗口

很多时候不会刻意区分这三个概念，不过还是有必要说明一下。

页面一般指由body元素包裹的实际内容区域。

文档包括页面、标题、链接、cookie、相关的浏览器设置等等。

窗口指用户此时正在交互的图形界面。我们可以获取窗口的大小、与屏幕的边距等信息。

###   document对象

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



##  窗口

###   窗口尺寸

关于窗口尺寸，window对象有如下属性：
- innerHeight： 获取窗口内容区域的高度，返回一个数值。
- innerWidth： 获取窗口内容区域的宽度。
- outerHeight： 获取窗口的高度，包括边框和菜单栏等。
- outerWidth： 获取窗口的宽度，包括边框和菜单栏等。
- screenLeft、SreenX： 获取从窗口左边缘到屏幕左边缘的像素数。返回一个数值。
- screenTop、SreenY： 获取从窗口上边缘到屏幕上边缘的像素数。

###   窗口事件

window对象定义了许多与资源加载或变化相关的事件，包括：
- onabort： 在资源加载过程中被终止时触发。
- onerror： 在资源加载出错时触发。
- onload： 在资源加载完成后触发。
- onresize： 在窗口缩放时触发。
- onunload： 在窗口从浏览器卸载时触发。

在发生交互行为时，会传递一个event对象，如下是该对象的一些表示窗口位置的相关属性：
- event.pageX 表示页面内的位置。
- event.scrollTop 表示滚动条的位置。
- event.scrillTo(x,y) 的作用是滚动一定的位置。

##  操作节点

###   元素、节点的区别

元素一定是节点，节点不一定是元素，带有尖括号标签的是HTML元素，例如`<body>`、`<head>`、`<div>`等，HTML元素是一种节点，除了HTML元素以外，还有Text节点、Comment节点、Document对象，这些都不是HTML元素。

不再包含下一级元素的纯文本就是节点，而非元素。

###  节点属性
nodeType数值	|节点类型
|---|---|
Document|	9
Element|	1
Text	|3
Comment	|8


属性   | 说明
|---|---|
parentNode	|父节点
children	|包含所有子元素的类数组对象，不包括非元素节点
childNodes|	包含所有子节点的类数组对象
firstElementChild|	第一个子元素
firstChild	|第一个子节点
lastElementChild	|最后一个子元素
lastChild	|最后一个子节点
previousElementSibling|	前一个紧邻同辈元素
nextElementSibling	|后一个紧邻同辈元素
nodeType|	节点类型
nodeValue	|Text或Comment节点的文本内容
nodeName	|作为元素的HTML标签名，全部大写，例如'DIV'、'IMG'

上面，如果没有子节点或者子元素，则返回null。

```js
const element1 = document.body.children[0]
const element2 = document.body.firstElementChild

const element3 = document.body.children.at(-1)
const element4 = document.body.lastElementChild
```

###  使用document获取节点

【预置元素】

document对象有一些预置元素成员，可以直接定位到该元素，包括：
-  document.head：	head元素
-  document.body：	body元素
-  document.title： 文档标题
-  document.images：文档中的img元素组成的类数组
-  document.links：文档中的a元素组成的类数组

使用document获取对象元素主要包括两类方法：getElement系列和querySelector系列。
getElement 系列方法比较古老，已经被querySelector系列方法替代，实际中应该优先使用querySelector()和querySelectorAll()两种方法。

【document.querySelector()】

document.querySelector()返回一个Element对象，表示找到的第一个节点。下面的例子中，样式包含title的元素可能有多个，但该方法只返回找到的第一个。

```js
const element1 = document.querySelector('.title')
```

【document.querySelectorAll()】

document.querySelectorAll()方法返回Element对象数组，表示所有找到的节点组成的类数组对象。下面的例子中，样式包含title的元素可能有多个，该方法找到所有匹配的元素并返回一个类数组。

```js
const elements = document.querySelectorAll('.title')
console.log(elements.length)
```

【document.getElementById()】

document.getElementById()方法返回指定id值的元素，由于id是唯一的，因此返回的是一个元素对象。如下示例得到一个id值为title的元素。注意，不要在id值前面加 # 。

```js
const element1 = document.getElementById('title')
```

【document.getElementsByTagName()】

document.getElementsByTagName()方法通过元素标签查找元素，一般会找到多个元素，返回的结果是HTMLElement对象组成的集合。例如如下代码返回所有div元素的集合。

```js
const divs = document.getElementsByTagName('div')
console.log(divs.length)
```

【getElementsByClassName()】

getElementsByClassName()方法返回指定class值的元素对象，无论找到0个、1个还是多个，始终返回`HTMLCollection []`，这是一个类数组对象。


### 使用innerHTML属性设置元素内容

元素对象的innerHTML属性的作用是读取或设置元素的内容，元素的内容本质上是一个字符串，但是可以使用HTML标签，浏览器会按照HTML语法渲染出内容。

如下示例分别读取body和head的内容：

```
console.log(document.body.innerHTML)
console.log(document.head.innerHTML)
```

innerHTML元素既可以读，也可以写，如下示例表示覆盖原有内容，使用新内容：

```
document.body.innerHTML='<h1>new content</h1>'
```

许多时候并不想要覆盖原内容，而只是想追加新的内容，则应该使用+=：

```
document.body.innerHTML += '<h1>appended new content</h1>'
```

### 添加节点

添加元素要针对具体的情况选择合适的方法，主要有五种方式：
-  innerHTML ： 通过+=的方式设置新的HTML内容，达到添加元素的目的
-  append()： 添加到父元素的末尾
-  prepend()： 添加到父元素的开头
-  before()： 添加到元素的前面
-  after()： 添加到元素的后面

另外，appendChild()方法和insertBefore()方法已经过时，应该弃用。

添加子元素最简单的方式就是使用innerHTML。innerHTML的值是符合HTML语法的字符串。如下示例将新的段落添加到页面的末尾：

```html
<body>
        <p>原始内容</p>
</body> 

<script>
      // 注意是+= ，表示追加，如果是 = 则会覆盖原内容
        document.body.innerHTML +=  '<p>new content</p> '
</script>
```

append()和prepend()这两个方法用于为父元素挂载新的子元素。前者挂载到末尾，后者挂载到开头。示例如下：

```html
<body>
        <p>other content</p>
</body> 

<script>
        
        const p1 = document.createElement('p')
        p1.innerHTML='p1 content'
        
        const p2 = document.createElement('p')
        p2.innerHTML='p2 content'
        
        // 挂载到body的开头
        document.body.prepend(p1)
        
        // 挂载到body的末尾
        document.body.append(p2)
</script>
```

before()和after()分别在之前和之后添加同辈元素。示例如下：

```html
<body>
      <p id="old">old content</p>
</body> 

<script>
        const p= document.querySelector('#old')

        // 新建元素
        const p1 = document.createElement('p')
        p1.innerHTML='p1 content'
        
        // 新建元素
        const p2 = document.createElement('p')
        p2.innerHTML='p2 content'

        // 插入到前面
        p.before(p1)  
        // 添加到后面 
        p.after(p2)
</script>
```

### 复制节点
使用cloneNode()方法可以复制元素，该方法返回新的元素对象，使用true选项复制全部内容。

```
<body>
        <p id='old'>old content</p>
</body> 

<script>
        const p = document.querySelector('#old')
        const p2 = p.cloneNode(true)
        p.after(p2)
</script>
```

### 删除节点
元素对象调用remove()方法可以删除自己，例如：

```html
<body>
        <p>will be deleted content</p>
</body> 
<script> 
        const p = document.querySelector('p')
        p.remove()
</script>
```

replaceChild() 和removeChild()方法已经过时，不推荐使用。
