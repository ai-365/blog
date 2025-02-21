

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