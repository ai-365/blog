
```
from moviepy.editor import *

clip = VideoFileClip('./input.mp4')

#画幅裁切
clip.crop(x1=0,y1=100,x2=400,y2=600) 
clip.write_videofile('output.mp4')
```