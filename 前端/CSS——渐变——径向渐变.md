
## 径向渐变

径向渐变使用如下函数:

```css
radial-gradient()
```

下面是一个最简单的径向渐变：

```html
<style>
    div {
        width: 100px;
        height: 100px;
        background: radial-gradient( red, orange);
    }
</style>

<div></div>
```

径向渐变默认以中心作为起始位置开始向四周发散，也可以使用其它位置，如下示例以右上角为中心发散：

```html
<style>
    div {
        width: 100px;
        height: 100px;
        background: radial-gradient(at top right, red, orange);
    }
</style>

<div></div>
```