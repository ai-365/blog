
要调整视频速度，使用speedx()方法。

```Python
from moviepy.editor import VideoFileClip

# 加载视频文件
video = VideoFileClip("video.mp4")

# 调整视频速度为原来的2倍
speedup_clip = video.speedx(2.0)

# 保存调整速度后的视频
speedup_clip.write_videofile("output.mp4")
```