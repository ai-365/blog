- [单个文本样式](#单个文本样式)
  - [文本颜色](#文本颜色)
  - [字体](#字体)
  - [字号](#字号)
  - [字重（加粗）](#字重加粗)
  - [倾斜](#倾斜)
  - [文本阴影](#文本阴影)
  - [文字渐变](#文字渐变)
- [段落样式](#段落样式)
  - [首行缩进：text-indent](#首行缩进text-indent)
  - [文本对齐：text-align](#文本对齐text-align)
  - [行间距：line-height](#行间距line-height)
  - [单词间距：word-spacing、 字符间距：letter-spacing](#单词间距word-spacing-字符间距letter-spacing)
  - [段落中的空格和空行](#段落中的空格和空行)
  - [文字渐变](#文字渐变-1)
  - [使用弹性布局让文本纵向居中](#使用弹性布局让文本纵向居中)


##  单个文本样式

###  文本颜色

颜色使用color，如下定义段落的颜色：

```
p{color:red;}
```

###  字体

```css
p{font-family:Arial;}

```

一些字体名称：
- 微软雅黑："MicroSoft YaHei"
- 幼圆："YouYuan"
- 隶书："LiSu"
- 楷体："KaiTi"    
- 宋体："SimSun"
- 新宋体："NSimSun"

###   字号

字号，font-size，表示文字的大小。字号的大小有多种设置形式。

第一种方式是绝对大小。分为两类：像素值和单词形式。

像素值是最常见的形式，使用px（Pixel）作为单位。1像素约等于0.4毫米。例如：

```html
<style>
    p {
        font-size: 18px;
    }
</style>

<p>文字渐变示例</p>
```

单词形式包括：xx-small、x-small、small、medium、large、x-large、xx-large、smaller、larger。这些值是绝对大小，每个值对应一个绝对像素值，medium是默认值，相当于16px。

第二种方式是相对大小。分为两种：百分数、em和rem。

对应font-size属性，em和百分数都是相对于父元素的字号计算的。1em等价于100%，表示与父元素字号相等，1.5em等价于150%，表示父元素字号的1.5倍。例如：

```html
<style>
    div {
        font-size: 16px;
    }

    p {
        font-size: 2em;
    }
</style>

<div>父元素字号：16px
    <p>子元素字号：2em，即32px</p>
</div>
```

使用em需要特别注意的是，只有对于font-size来说，em才与百分比等价。但是，对于其它属性来说，em相对的是：

```
当前元素的font-size
```

举个例子可以说明这个问题，下面的例子中，子元素的边框宽度为0.5em，通过getComputedStyle()得到的结果约16px，这就说明除了font-size外的其它属性的em是相对于本元素的font-size计算的。

```html
<style>
    div {
        font-size: 16px;
    }

    p {
        font-size: 2em;
        border: black solid 0.5em;
    }
</style>

<div>父元素字号：16px
    <p>子元素字号：2em，即32px；边框宽度：0.5em，约16px</p>
</div>


<script>
	    const p = document.getElementsByTagName('p')[0] // 获取p元素
	    console.log(getComputedStyle(p).fontSize) // 获取p的字号
    console.log(getComputedStyle(p).border) // 获取p的边框宽度
</script>
```

rem是新增的标准，r 是 root 的意思，表示在em的基础上，相对于根元素即body的字号。body元素默认16px字号。所以，一般情况下，1rem即16px。如下示例：

```html
<style>
    div {
        font-size: 32px;
    }

    p {
        font-size: 0.5rem;
    }
</style>

<div>父元素字号：32px
    <p>子元素字号：0.5rem，相对于body的16px，结果是8px</p>
</div>


<script>
	const p = document.getElementsByTagName('p')[0] // 获取p元素
	console.log(getComputedStyle(p).fontSize) // 获取p的字号
</script>
```


###  字重（加粗）

字重，font-weight，也就是通常所说的加粗。

font-weight的属性值有两种写法。

第一种写法是单词。 包括lighter、normal、bold。

第二种写法是数字：100-900，取整百数，共有9个数。

这两种写法存在一种对应关系，不过，不同浏览器可能不同，笔者在 Edge(Chromium) 122 上测试的对应关系如下：
- 100、200、300对应lighter，细体。
- 400、500对应normal，正常粗细，这是默认值。
- 600、700、800、900对应bold，加粗。

###  倾斜

文本倾斜比较简单，一般只使用如下样式即可：

```css
font-style: italic;
```

默认值为normal。

###  文本阴影

有时候，你希望为文本加个阴影，此时可以使用text-shadow属性。需要指定三个值：阴影颜色、横向偏移距离、纵向偏移距离，顺序不强制要求。示例如下：

```html
<style>
    h1 {
        text-shadow: lightblue 0.5em 0.5em;
    }

</style>

<h1>
    文本阴影
</h1>
```

这表示阴影颜色为浅蓝，阴影向下向右均偏移半个字号。

### 文字渐变

```html
<style>
    h1 {
        background-image: linear-gradient(135deg, red 0%, green 100%);
        background-clip: text;
        color: transparent;
        display: inline;
    }
</style>

<h1>文字渐变示例</h1>
```

由于h1标题是块元素，会占用整行，此时渐变效果不太明显，所以将其设置为display:inline。

注意，某些浏览器可能不支持文字渐变。

##  段落样式

###  首行缩进：text-indent

我们经常在书本看到，每个段落的第一行是空了两个汉字的，这叫做段落缩进，也叫首行缩进，使用text-indent。text-indent的取值单位与font-size类似，既可以是使用px作为绝对值，也可以使用em和百分号作为相对值。

不过，需要特别注意的是，这里的em和百分比没有等价关系，em是相对于本元素的font-size，而百分比不是的。

由于标准格式是首行缩进2个汉字，因此不要使用px和百分比，直接使用如下样式即可：

```
text-indent: 2em;
```

这样，不管文字大小怎么变换，首行始终是缩进2个汉字。

### 文本对齐：text-align

如同文字编辑软件Word一样，文本对齐也是段落的基础设置，使用text-align，可取如下值：
- left：左对齐，默认
- right： 右对齐
- center ： 居中对齐
- justify： 两端对齐

### 行间距：line-height

行距控制行之间的距离，使用line-height。如果属性值是纯数字，则表示几倍行距，例如1.5表示1.5倍行距。这里的倍数是相对于font-size的倍数，因此纯数字与em是等效的。也就是说，如果要设置2倍行距，下面两种方式是一样的：

```css
line-height: 2;
line-height: 2em;
```

###  单词间距：word-spacing、 字符间距：letter-spacing

word-spacing 表示单词间的距离。对于英文文本来说，就是单词与单词间的距离。而对于中文文本来说，是标点符号隔开的两小串文本之间的距离。

letter-spacing表示字符间的距离。对于英文文本来说，就是字母间的距离。对于中文文本来说，就是汉字间的距离。

基于上面两种分析，可以发现，对于中英文夹杂的文章来说，没有哪一种是可以兼顾的。

###  段落中的空格和空行

默认情况下， 一段文本中，连续多个空格会被压缩成1个空格。同时，在一对`<p>`标签中永远只会输出一个段落，哪怕源代码中写了几段。

例如，下面两个段落在浏览器的呈现是一样的：

```html
<p>
    空白测试          空白测试 
    
    换行测试
</p>

<p>
    空白测试 空白测试 换行测试
</p>
```

第一个段落中，虽然有很多空白，虽然看似写了两段话，但是渲染结果与下面那个段落并无二致。

如果需要人为保留源码中的空白和换行，使用如下样式：

```
white-space: pre;
```

###  文字渐变

有些时候，需要对文字的颜色加上渐变效果，则可以使用如下的样式设置：

```html
<style>
    span {
        background-image: linear-gradient(45deg, red, green);
        background-clip: text;
        color: transparent;
        display: inline;
    }
</style>

<span>文字渐变示例</span>
```

注意，某些浏览器可能不支持文字渐变。

### 使用弹性布局让文本纵向居中

如果文字被放置在div中，要让文字在横向上居中很简单，只需要设置text-align： center即可。

但是，要让文字纵向居中却没有直接的样式了，在弹性布局出现之前，已经有一些方案。不过，弹性布局出现之后，这个问题变得简单了。

只需要对父容器div的样式做3行设置即可保持文字横向、纵向的居中：

```
display: flex;
justify-content: center;
align-itmes: center;
```

示例如下：

```html
<style>
    div {
        width: 50%;
        height: 300px;
        background: lightblue;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<div>我是文字 </div>
```