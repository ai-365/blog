
parentNode	父节点
children	包含所有子元素的类数组对象，不包括非元素节点
childNodes	包含所有子节点的类数组对象
firstElementChild	第一个子元素
firstChild	第一个子节点
lastElementChild	最后一个子元素
lastChild	最后一个子节点
previousElementSibling	前一个紧邻同辈元素
nextElementSibling	后一个紧邻同辈元素
nodeType	节点类型
nodeValue	Text或Comment节点的文本内容
nodeName	作为元素的HTML标签名，全部大写，例如'DIV'、'IMG'

上面，如果没有子节点或者子元素，则返回null。

```js
const element1 = document.body.children[0]
const element2 = document.body.firstElementChild

const element3 = document.body.children.at(-1)
const element4 = document.body.lastElementChild
```
