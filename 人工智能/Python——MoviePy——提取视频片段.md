
要提取视频一段时间内的片段，使用subclip()方法。

```Python
from moviepy.editor import *

# 加载视频
video = VideoFileClip("input.mp4")

# 提取10秒到30秒的片段
clip = video.subclip(10, 30)

# 导出
clip.write_videofile("output.mp4")
```
