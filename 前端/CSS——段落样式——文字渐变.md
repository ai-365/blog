## 文字渐变

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