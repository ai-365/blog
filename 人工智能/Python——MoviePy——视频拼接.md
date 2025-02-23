
实际中经常需要将多个视频片段前后拼接成一个完整的视频，这时会用到concatenate_videoclips()方法。

脚本示例如下。

```Python
from moviepy.editor import *

# 加载多个视频文件
clip1 = VideoFileClip("input1.mp4")
clip2 = VideoFileClip("input2.mp4")

# 拼接视频
clips = concatenate_videoclips([clip1, clip2])

# 导出视频
clips.write_videofile("output.mp4")
```

