
可以将编辑好的片段导出为视频，使用write_videofile()。

```Python
# fps为帧率
clip.write_videofile("my_animation.mp4", fps=24)
```

默认导出的编码为h264，24fps。