<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [视频元素](#视频元素)
  - [视频控件](#视频控件)
  - [视频设置](#视频设置)
- [音频元素](#音频元素)
  - [音频](#音频)
  - [字幕](#字幕)


##  视频元素

如下是一个视频原生示例：
```html
<video src="rabbit320.webm" controls>
  <p>你的浏览器不支持 HTML5 视频。可点击<a href="rabbit320.mp4">此链接</a>观看</p>
</video>
```

### 视频控件

使用 controls 来包含浏览器提供的控件界面，包含开始、停止以及调整音量。

### 视频设置

- autoplay	这个属性会使音频和视频内容立即播放。不过，用户可能会比较反感自动播放的设定。
- loop	循环
- muted	默认静音
- poster	播放前显示的图片


##  音频元素

###  音频

`<audio>`不支持设置width和height。

### 字幕

以 .vtt 后缀名保存文件。

用` <track>`标签链接 .vtt 文件， `<track> `标签需放在 `<audio>` 或 `<video>` 标签当中，同时需要放在所有 `<source> `标签之后。使用 kind 属性来指明是哪一种类型，如 subtitles、captions、descriptions。然后，使用 srclang 来告诉浏览器你是用什么语言来编写的 subtitles。

```html
<video controls>
    <source src="example.mp4" type="video/mp4">
    <source src="example.webm" type="video/webm">
    <track kind="subtitles" src="subtitles_en.vtt" srclang="en">
</video>
```