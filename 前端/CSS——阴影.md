
之前介绍过text-shadow，这个属性为文本创建阴影。

对于块元素，有一个类似地属性，叫做box-shadow。

box-shadow接受三个值：向下的偏移量、向右的偏移量、阴影颜色。顺序不强制要求。示例如下：

```
<style>
    div {
        width: 100px;
        height: 100px;
        background: lightblue;
        box-shadow: orange 10px 10px;
    }
</style>

<div></div>
```