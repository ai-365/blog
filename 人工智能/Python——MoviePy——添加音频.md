
```
from moviepy.editor import *

# 加载音频文件
audio = AudioFileClip("music.mp3").subclip(0, 5)

# 添加音频
clip.set_audio(audio)

# 导出视频
```