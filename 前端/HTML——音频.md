
`<audio>`不支持设置width和height。



## 字幕



以 .vtt 后缀名保存文件。



用` <track>`标签链接 .vtt 文件， `<track> `标签需放在 `<audio>` 或 `<video>` 标签当中，同时需要放在所有 `<source> `标签之后。使用 kind 属性来指明是哪一种类型，如 subtitles、captions、descriptions。然后，使用 srclang 来告诉浏览器你是用什么语言来编写的 subtitles。



```html

<video controls>

    <source src="example.mp4" type="video/mp4">

    <source src="example.webm" type="video/webm">

    <track kind="subtitles" src="subtitles_en.vtt" srclang="en">

</video>

```