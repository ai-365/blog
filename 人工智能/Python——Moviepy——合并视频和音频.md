
如果需要合并和音频，使用如下脚本。

```Python
# 导入包，注意是moviepy.editor
from moviepy.editor  import *

# 加载视频片段
audio = AudioFileClip("input_video")

# 加载音频片段
video = VideoFileClip("input_audio")

# 设置视频的音频属性为音频片段
video.audio = audio

video.write_videofile("output.mp4", fps=24)
```