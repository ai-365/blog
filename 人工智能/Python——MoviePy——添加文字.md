
可以为视频添加文字，使用如下脚本。



```Python
from moviepy.editor import *

clip = VideoFileClip("myHolidays.mp4")

# 生成文字，并设置字体、颜色
txt_clip = TextClip("My Holidays2013",fontsize=70,color='white')

# 调整位置和显示时长
txt_clip = txt_clip.set_pos('center').set_duration(10)

# 合并视频和文字clip
video = CompositeVideoClip([clip, txt_clip])

# 导出
video.write_videofile("myHolidays_edited.webm")
```