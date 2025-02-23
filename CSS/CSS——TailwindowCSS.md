<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [背景颜色](#背景颜色)
- [文本样式](#文本样式)
- [宽度和高度](#宽度和高度)
- [弹性布局](#弹性布局)
- [媒体查询](#媒体查询)


###  背景颜色

背景使用bg开头，语法如下：

```
bg-颜色代号-饱和度
```

###  文本样式

文本使用text开头和font开头。

字号、颜色、居中： text-

字体、加粗： font-

text定义颜色和字号。

指定字号，例如text-2xl、text-sm，有几个在其它地方也会用到的指代词，这里汇总如下：
- xs： extra small  超小号 0.75rem
- sm： small 小号 0.875rem
- base：  基础 1rem
- md： medium ：常规，中号 
- lg： large，大号 1.125rem
- xl： extra large 加大号 1.25rem，常用
- 2xl： extra extra large 特大号 1.5rem
- 9xl ：能指定的最大字号

font-可以指定字体加粗，例如font-bold表示font-weight：bold

常见示例：

```
text-sm： 小号字体
text-slate-500 ： 颜色
```


如果要使文本居中，使用text-center

letter-wide、letter-winder可以是加大字符间距

line-clamp-表示指定文字最多显示的行数，超过的字符将使用三个点显示，例如line-clamp-3表示只显示3行文本。使用line-clamp-none取消限制，即展开所有文本。如下示例鼠标悬停展开所有内容：

```html
<p class="line-clamp-3 hover:line-clamp-none">
  <!-- ... -->
</p>
```

###  宽度和高度

宽度使用w（width）、高度使用h（height）

w-px-大小，例如w-px-

w-5表示 ，数字的单位是rem，即body的font-size（默认为16px）的倍数，w-1表示width：0.25rem，即width： 4px；

w-后面也可以接分数，表示占用容器宽度的比例，如w-1/2表示占据约一半的宽度，

w-full 表示占据全部宽度。

min-w-前缀表示最小宽度，max-w-前缀表示最大宽度。min-h-前缀表示最小高度，max-h-前缀表示最大高度。

常见的尺寸汇总：
- w-1 ： 4px
- w-2 ： 8px
- w-3： 12px
- w-4： 16px
- w-10： 40px
- w-20： 80px
- w-40： 160px
- w-80：320px
- w-1/2： 50%
- w-1/3： 33%
- w-full： 100%

###  弹性布局

要使用弹性布局，在容器元素上使用flex

要指定子元素的排列方向，在容器元素上使用 flex-row、flex-column、flex-row-reverse、flex-column-reverse。

假设默认为横向排列，可以指定每个子元素在宽度上占据的比例：basis-1/4，如下是一个示例：

```html
<div class="flex flex-row">
  <div class="basis-1/4">01</div>
  <div class="basis-1/4">02</div>
  <div class="basis-1/2">03</div>
</div>
```


###  媒体查询

在tailwindcss中，一般而言，默认是手机竖直状态下的屏幕宽度，如果要在手机横屏、大屏上使用不同样式，加前缀md：。

媒体查询一般会添加到样式表的底部，对css优先级的覆盖

移动端->pc端的适配规则：min-width从小到大

```
// 注意 700 和 1000 上下的顺序问题
@media (min-width:700px) {
    .box {
        background: green;
    }
}
 
@media (min-width:1000px) {
    .box {
        background: red;
    }
```



```
当宽度大于等于700px
@media (min-width: 700px) {
    .box {
        width: 200px;
        height: 200px;
        background-color: skyblue;
    }
}
当宽度小于等于960时
@media (max-width: 960px) {
    .box {
        width: 200px;
        height: 200px;
        background-color: skyblue;
    }
} */


```

```
当竖屏时
media (orientation: portrait) {
    .box {
        width: 200px;
        height: 200px;
        background-color: skyblue;
    }
}
当横屏时
@media (orientation: landscape) {
    .box {
        width: 1000px;
        height: 200px;
        background-color: red;
    }
```


```
@media screen and (orientation: landscape) {

  /* 横向样式定义 */

}

 

@media screen and (orientation: portrait) {

  /* 纵向样式定义 */

}
```



