
如果属性名称是一个单词，在HTML元素中的style属性名称就是JavaScript设置的style属性名称。

```js
document.querySelector('p').color='red'
document.querySelector('p').display='inline'
```

如果在HTML中，元素的style属性里面的样式名称是用两个单词用连字符连接，例如background-color，那么在JavaScript中的style属性名称为backgroundColor，而不是background-color。例如：

```js
document.querySelector('p').backgroundColor='red'
document.querySelector('p').fontSize='20px'
```

还有一点要注意，JavaScript操作的样式值都必须是字符串，例如颜色值是'#ffffff'，而不是#ffffff。再比如字体大小应该写成'20px'，写成20px、20、'20'都是错误的。

## 操作样式表

```js
const link = document.createElement('link')
link.rel='stylesheet'
link.href='custom.css'
document.head.append(link)
```


## classList
className	设置或返回HTML中class属性的值，是一个字符串。

classList	包含class名称的类数组对象。





```html

<p class="aaa bbb">

```



```js

const p = document.querySelector('p')

console.log(p.className)  // 'aaa bbb'



p.classList.add('ccc')

p.classList.remove('aaa')

console.log(p.className)  // 'bbb ccc'



console.log(p.classList.length)

console.log(…p)

```


className	设置或返回HTML中class属性的值，是一个字符串
classList	包含class名称的类数组对象

比起className，我们经常使用的是classList。

```html
<p class="aaa bbb">
```

```js
const p = document.querySelector('p')
console.log(p.className)  // 'aaa bbb'

p.classList.add('ccc')
p.classList.remove('aaa')
console.log(p.className)  // 'bbb ccc'

console.log(p.classList.length)
console.log(…p)
```


