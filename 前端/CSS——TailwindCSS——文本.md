
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

