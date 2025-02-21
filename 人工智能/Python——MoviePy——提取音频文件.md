
视频片段的audio属性即为音频片段，然后使用write_audiofile()导出为音频文件。

```Python
from moviepy.editor import *

clip = VideoFileClip("video.mp4")

audio = clip.audio #提取音频文件

audio.write_audiofile("audio.mp3")
```