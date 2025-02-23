
# FFmpeg


## 基础使用

### 音视频基础知识
-r  1 每1秒1帧（1张图片）
-r 25 1秒25张图

%05d.jpg   00001~99999.jpg

-preset  编码速度，越快，画质越低

-tune  film为偏静态的视频，animation偏动态的视频。


影响画质的三大参数：编码格式、分辨率、码率。
码率的意思是每秒钟的比特数量，分辨率要和码率匹配。
对于h264 1080p来说，中码率6M，高码率8M，再大对画质提升不明显，过低会导致画质模糊。

帧率是影响流畅度的，跟画质无关。一般的视频为25或30帧，60帧的视频就已经非常流畅了，高于80帧则提升意义不大。

webp，网络传输的图片格式，由谷歌推出，优点是同等画质下，webp比jpg、png的体积更小。
webp还支持动图，最大分辨率可达到16383x16383，而gif只达到1024x1024。


###   安装

ffmpeg是一个免费轻巧的视频编辑命令行神器，可以使用一条命令转换格式、合并视频、剪辑片段、裁切画面、提取音频、添加字幕等。

去官网下载ffmpeg Windows程序，会在安装目录的bin下看到三个可执行文件：ffmpeg.exe、ffplay.exe、ffprobe.exe，将该目录添加到Path环境变量，就可以在命令行中使用命令了。使用`ffmpeg -version`检查是否安装设置成功。使用`ffmpeg -h`查看帮助。

### 音视频基本概念

- 编码器encoder、解码器decoder
- 比特率（帧率）bitrates
- 采样率 


-  -vcodec ：指定视频编码方式，为copy表示不重新编码。
-  -acodec ：指定音频编码方式，为copy表示不重新编码。
-  -codec copy ： 音视频都不重新编码


## 能力集列表


###  ffmpeg命令汇总

    
（1）通用参数： 
-  -fortmats ： 列出支持的文件格式
-  -codecs： 列出支持的编解码器
-  -f： 指定封装格式
-  -i  filename： 输入文件名
-  -y： 覆盖已有文件
-  -t： 指定时长，以秒为单位，精确到毫秒
-  -map：指定映射关系。例如 `-map 1:0 -map 1:1` 表示将input1的第一个流和input2的第2个流输出。

（2）视频参数

* -r ： 指定帧速率
* -s  size ：指定分辨率
* -aspect aspect：指定长宽比。例如 4:3、16:9。
* -croptop/cropbottom/cropleft/cropright   size：设置顶部/底部/左边/右边切除尺寸，例如`-croptop 20px`。
* -padtop/padbottom/padleft/padright  size ： 设置顶部/底部/左边/右边补齐尺寸，例如`-padtop 20px`。
* -padcolor color：补齐带颜色，范围000000-FFFFFF。例如`-pad #ff0000`
* -vn：取消视频
* -an：取消音频输出

    
###  格式转换

格式转换是最常使用的需求，如下示例将1.mp4转换成2.avi ：

```
ffmpeg -i  1.mp4  2.avi
```

如果指定编码可以更快的完成格式转换： 

```
ffmpeg -i 1.mp4 -c copy 2.avi
```

说明，所有相关的操作中，加上 `-codec copy` 不会重新编解码所以会加快执行速度。

###   截取视频片段

截取视频片段主要涉及三个选项：

-   -ss ：设置起始时间，格式为 `时:分:秒.毫秒 或秒数`，默认为开始00:00:00.000
-   -to ：设置结束时间，格式为`时:分:秒.毫秒 或秒数`，默认为视频结束。
-   -t ： 设置持续时间，单位为秒，精确到毫秒。

注意：-to 和-t 不能同时使用。

例如，指定起始和终止时间：
 
```sh
ffmpege -i  1.mp4  -ss 00:01:02.056 -to 00:02:02.056 -codec copy 2.mp4  
```

指定起始时间和持续时间段：

```sh
ffmpege  -i  1.mp4   -ss 01:02:03.568  -t  80.098   -codec copy 2.mp4
```

### 去掉音频或去掉视频

`-an`选项表示取消音频输出：

```sh
ffmpeg  -i  input.mp4  -an  -vcodec  copy  output.mp4
```

`-vn` 选项表示去掉音频。
使用-vn选项取消视频输出，就可以提取音频了：
```sh
ffmpeg  -i  1.mp4  -vn  -acodec copy   2.mp3
```


### 合并视频

合并视频分两步。首先准备1个文本文件如1.txt存放要合并的文件名，内容示例如下：

```
file '1.mp4'
file '2.mp4'
file '3.mp4'
```

然后执行如下命令：

```
ffmpeg  -f  concat  -i 1.txt  -c copy output.mp4
```

output.mp4就是合并后的文件。


### 裁剪画面尺寸

裁剪视频画面的语法如下：

```sh
ffmpeg -i  1t.mp4   -vf  crop=w:h:x:y  2.mp4 
```
crop的参数，分表代表宽，高，起始x，起始y。 起点是视频的左上角。

示例如下；

```sh
ffmpeg  -i  1.mp4  -vf   crop=2560:1440:0:0   2.mp4
```




### 合并多个音频

合并音频示例如下：
```sh
ffmpeg -i input1.mp3  -i input2.mp3 -filter_complex  amix=inputs=2:duration=shortest  output.wav
```

duration=shortest表示按照长度较短的音频文件的长度作为输出的长度。

### 调整音量

将音量减半然后输出：

```sh
ffmpeg  -i 1.wav -af  "volume=0.5" 2.wav
```

### 音频淡入淡出

音频淡入示例如下，`afade=t=in:ss:0:d=5`表示前5秒淡入音频：

```sh
ffmpeg  -i  1.wav  -filter_complex  afade=t=in:ss:0:d=5  2.wav
```

音频淡出示例如下，`afade=t:out:st=200:d=5`表示从200秒开始，做5秒的淡出效果：

```sh
ffmpeg  -i  input.wav  -filter_complex  afade=t=out:st=200:d=5  output.wav
```

### 声音变速不变调

如下示例中，atempo=0.5表示按照0.5的速度输出，结果是长度将变为2倍。
```sh
ffmpeg  -i  1.mp3  -filter_complex   atempo=0.5   2.wav
```

### ffplay的用法

播放

* 播放视频：ffplay  input.mp4。   按下s进入帧模式，按一次s就往前播放一帧。
* 播放音频：ffplay  input.mp3 。
* 指定播放音量:  ffplay -volumn  60  -i input.mp4
* 全屏播放：ffplay -i input.mp4 -fs

设置播放窗口

* -window_title ：指定标题
* -noborder：窗口无边框
* -alwaysontop：窗口置顶
* `-left/top <size>`：播放窗口的位置
* `-x/y <size>`：设置播放窗口的宽度/高度


    
## 水印

###   文字水印

```
ffmpeg -i  input.mp4 -vf "drawtext=text='示例文本':fontsize=100:x=w/2:y=h/2:fontcolor=white@0.5:shadowy=2"  output.mp4
```

用冒号把参数都隔开。

-  -vf： 表示设置视频滤镜（vf即video filter得缩写）
-  text： 文字内容
-  fontfile： 字体位置(C\\:/windows/fonts/simhei.ttf)，汉字可以使用系统字体
-  fontcolor=white@0.5 ： 文字颜色，0.5表示不透明度
-  box=1： 添加白色背景的文本框，默认值0
-  boxcolor=black@0.5 ： 文字框背景颜色为黑色，0.5是不透明度
-  x、y：横纵坐标，以左上角为顶点，可使用t、w、h作为参数
- enable='between(t,10,20)' ： 表示第10秒到第20秒内显示

如果要设置时间水印，设置text 的值：

```
text='%{localtime\:%Y-%M-%d %H:%m:%S}
```

###   图片水印

```
ffmpeg -i inputfile -vf  "movie=marklogo.png,scale= 100:100[watermask]; [in] [watermask] overlay=x=50:y=50 [out]" -y outfile
```

-  movie：添加滤镜，值为图片的路径
-  scale：水印图片大小，水印长度＊水印的高度
-  overlay：表示滤镜位置，从左上角开始计算

```
ffmpeg -i input.mp4 -vf "movie=input2.mp4,scale=200x200[inner];[in][inner]overlay=x=10:y=10[out]" output.mp4
```

movie=input2.mp4[inner] 用于设置过滤器，并命名为inner，可以随意命名。

movie的值可以是图片，也可以是视频。

scale用于设置画中画的宽高。

[in][inner]overlay=x=10:y=10[out] 将输入视频和名为inner的视频进行叠加，位置为（10,10）。in表示输入视频，out表示输出视频。

对于位置，如果要根据画面的宽高设置，可以使用如下内置变量：
-  main_w : 表示输入视频的画面宽度 
-  main_h : 表示输入视频的画面高度 
-  overlay_w : 表示叠加视频的宽度
-  overlay_h : 表示叠加视频的高度 

文字跑马灯

```
ffmpeg -i input.mp4 -vf "movie=input2.mp4,scale=200x200[vedio_inner];[in][vedio_inner]overlay=x=mod(50*t,main_w):y=abs(sin(t))*main_h*0.7[out]" output.mp4
```

将 x 的值设置为 mod(50*t,main_w) 实现的是 每秒 向右移动 50 像素的执行效果。

设置 y 的值为 abs(sin(t))*main_h*0.7 , 这是在 y 方向以正弦函数进行运动。


    
    
    
    
    
##  字幕


###   字幕

载入ass字幕播放：

```
ffplay -vf  subtitles=1.ass  1.mp4
```

载入srt字幕播放：

```
ffmpeg -i input.mp4  -vf  " subtitles=1.srt:force_style='Fontsize=20,PrimaryColour=&HFFFFFF&,marginV=50' " 1.mp4
```

-  subtites： 指定字幕文件
-  FontName：字体名称
-  FontSize：字体大小
-   Alignment：以数值表示的对齐方式。常见的中下为2、正中为10
-   PrimaryColour=&HFFFFFF&：字幕颜色，主要两边加&
-  OutlineColor：边框颜色，&后面的两位为透明度
-  MarginV：字幕距离底部的距离

提取字幕文件（视频有字幕的前提下）：

```
ffmpeg -i  1.mp4   -vf  subtitles=1.srt
```

force_style常用参数如下：



##  复杂滤镜

###  常见的复杂滤镜

-  trim： 时间切片
-  drawtext：文字
-  subtitles： 字幕
-  crop： 画面裁切
-  scale： 	画面缩放
-  concat： 前后拼接
-  rotate： 旋转画面
-  overlay	： 图片或视频水印-  movie： 加载第三方视频



###  复杂滤镜的语法

- 分号： 操作大步骤
- 等号： 属性和值
- 冒号： 细分属性和值

对于分号分隔的步骤，给一个自定义名称，指代中间步骤

[1:v]scale=176:144[logo] ; [0:v][logo]overlay=x=0:y=0

分成3个拷贝，分别操作
[0:v]split=3[tmp1][tmp2][tmp3]; 

[0:v] 第一个文件的视频流
[0:v:0] 第一个文件的第一个视频流

在滤镜的每一步之后，通常会指定一个步骤名称，便于map选取。

ffmpeg -i video.mkv -i image.png -filter_complex '[0:v][1:v]overlay[out]' -map
'[out]' out.mkv


###  subtitles字幕滤镜
- filename
- force_style

movie贴图滤镜

amovie 音频滤镜

###   drawtext 文字滤镜

参数：

基本参数：

text: 必须。要绘制的文本内容。可以包含特殊字符和转义序列，如换行符 \n。

fontfile: 字体文件的路径。如果要使用非系统默认字体，需要指定此选项。

font: 字体名称。使用系统内建字体时，直接指定字体名称。可以包含样式信息，如 Arial Bold。

fontsize: 字体大小（单位：像素）。

fontcolor: 字体颜色。可以使用 0xRRGGBB、rgb(R,G,B)、rgba(R,G,B,A)、hexcolor、[0-100%]gray 或颜色名称（如 red）。

shadowcolor: 文本阴影的颜色。设置方式同 fontcolor。

shadowx, shadowy: 文本阴影相对于文本的横向和纵向偏移量（单位：像素）。

x, y: 文本在视频帧上的起始位置。可以使用绝对像素值，也可以使用相对表达式（如 w/2 表示视频宽度的一半）。

文本样式：

text_shaping: 开启（1）或关闭（0）文本形状优化，适用于阿拉伯语、希伯来语等从右向左书写系统的语言。

bordercolor, borderw: 边框颜色和宽度（单位：像素）。为文本添加边框。

boxcolor, box: 绘制背景矩形的颜色和是否开启（1）背景矩形。当开启时，可以配合 boxborderw（边框宽度）和 boxpadding（内部填充）使用。

alpha: 文本的透明度（0.0 - 1.0）。

shadowopacity: 文本阴影的透明度（0.0 - 1.0）。

动态效果：

timecode: 使用时间码作为文本内容。可以指定格式，如 `%{pts}` 或` %{localtime}`。

rate: 文本更新速率（帧率）。默认为视频帧率。

fixed_linesize: 固定行高，使多行文本保持一致的高度。

reload: 是否实时重载文本文件（当 textfile 参数用于指定文本文件时）。

高级选项：

expansion: 控制字符串的扩展方式，如 none、strftime（时间戳格式化）或 normal（默认，支持简单变量替换）。

textfile: 从文件中读取文本内容。支持按行读取，每行对应视频帧中的一个文本实例。

eof_action: 当文本文件读取到末尾时的行为，如 endall（停止播放）、repeat（从头开始循环读取）或 pause（暂停播放）。

text_length: 文本的最大长度。超过此长度的文本将被截断。

tabsize: 制表符宽度（单位：像素）。

wrapwidth: 自动换行的宽度限制（单位：像素）。超出此宽度的文本将被折行。

line_spacing: 行间距（单位：像素）。

kerning, letterspacing: 字间距调整（单位：像素）。

fontconfig_match: 使用 fontconfig 库进行字体匹配。对于复杂的字体配置，可以提高匹配准确度。

ass: 将 drawtext 参数解析为 ASS 字幕格式，支持更丰富的文本样式和动画效果。

表达式与函数：

许多参数（如 x, y, fontsize 等）支持使用数学表达式，可以包含以下函数：

rand(min,max): 返回指定范围内的随机数。

gte(a,b): 检查 a 是否大于等于 b，返回 1（真）或 0（假）。

lte(a,b): 检查 a 是否小于等于 b，返回 1（真）或 0（假）。

eq(a,b): 检查 a 是否等于 b，返回 1（真）或 0（假）。

if cond val_true val_false: 根据条件 cond 返回 val_true 或 val_false。

between(val,min,max): 检查 val 是否在 min 和 max 之间（包含边界），返回 1（真）或 0（假）。

isnan(val): 检查 val 是否为 NaN（Not-a-Number），返回 1（真）或 0（假）。

isinf(val): 检查 val 是否为无穷大或无穷小，返回 1（真）或 0（假）。

isnan_or_inf(val): 检查 val 是否为 NaN 或无穷大/小，返回 1（真）或 0（假）。

max(a,b,...), min(a,b,...): 返回一组数值中的最大值或最小值。

hypot(a,b): 计算直角三角形两条边长 a 和 b 的斜边长度。

round(val): 将 val 四舍五入到最接近的整数。

trunc(val): 截断 val 到整数部分，去掉小数点后的部分。

ceil(val): 向上取整，将 val 转换为大于或等于它的最小整数。

floor(val): 向下取整，将 val 转换为小于或等于它的最大整数。

rint(val): 朝最接近的整数取整，遵循 IEEE 754 规范。

sqrt(val): 计算 val 的平方根。

log(val[,base]): 计算 val 的自然对数（默认）或以 base 为底的对数。

exp(val): 计算 e（自然对数的底数）的 val 次幂。


overlay贴图滤镜
x
y
可使用main_w、main_h、overlay_w、overlay_h


concat拼接

ffmpeg -i 1.mp4 -i 2.mp4 -i 3.mp4 -filter_complex '[0:0] [0:1] [1:0] [1:1] [2:0] [2:1] concat=n=3:v=1:a=1 [v] [a]' -map '[v]' -map '[a]’  output.mp4

[0:0] [0:1] [1:0] [1:1] [2:0] [2:1] 分别表示第一个输入文件的视频、音频、第二个输入文件的视频、音频、第三个输入文件的视频、音频。

concat=n=3:v=1:a=1 表示有三个输入文件，输出一条视频流和一条音频流。[v] [a] 就是得到的视频流和音频流的名字。

movie=part1.mp4, scale=512:288 [v1] ; amovie=part1.mp4 [a1] ;
movie=part2.mp4, scale=512:288 [v2] ; amovie=part2.mp4 [a2] ;
[v1] [v2] concat [outv] ; [a1] [a2] concat=v=0:a=1 [outa]

part1.mp4缩放，步骤v1； part1.mp4 提取音频，步骤a1； part2.mp4缩放，步骤v2； part2.mp4提取音频，步骤a2；
v2贴到v1上面，步骤outv； a2衔接到a1后面，输出0条视频流，1条音频流，步骤outa。

scale
w 宽度
h 高度
iw、ih、

###  crop
w
h
x
y
crop=w=100:h=100:x=12:y=34
也可以直接写 w:h:x:y  crop=100:100:12:34
使用in_w、in_h、out_w、out_h内置变量

crop=in_w/2:in_h/2:(in_w-out_w)/2+((in_w-out_w)/2)*sin(n/10):(in_h-out_h)/2 +((in_h-out_h)/2)*sin(n/7)

###   select

select=between(t\,10\,20)

ffmpeg -i   input.mp4  -vf "select=between(t\,10\,20)" output.mp4 -y

## 录屏


```
ffmpeg  -f gdigrab -video_size 1920x1080 -i desktop -c:v h264  -b:v 10M -preset slower  -qscale 0.01 output.mp4 -y
```

-f gdigrab
- framerate 帧率
- -offset_x
- -offset_y
- -video_size 
- -i desktop
- -i  title=Calculator ：步骤标题为Calculator 的窗口
-preset slower 质量，slower表示质量较好
-qscale 0.01 压缩

列出可用的音视频设备：

```
ffmpeg -list_devices true -f dshow -i dummy
```

摄像头： ov9734_azurewave_camera
麦克风： Microphone (2- High Definition Audio Device)
扬声器： virtual-audio-capturer
桌面： desktop

```
ffmpeg -f dshow -i video=“UScreenCapture”：audio=“Stereo Mix （Realtek High Definition Audio）” “C：\videos\out.mp4”
```

如果要停止录制，请在 FFmpeg 命令提示符窗口中输入 q。

录音：

ffmpeg -f dshow -i audio="Microphone (2- High Definition Audio Device)" output.wav

同时录屏与录音：

ffmpeg -f gdigrab -framerate 30 -i desktop -f dshow -i audio="Microphone (2- High Definition Audio Device)" output.mp4

ffmpeg -f gdigrab -framerate 30 -i desktop -f dshow -i audio="Microphone (2- High Definition Audio Device)"  -i audio="virtual-audio-capturer"  output.mp4 -y

ffmpeg -f dshow -i audio="Microphone (2- High Definition Audio Device)" -f dshow -i audio="virtual audio capturer" -filter_complex
amix=inputs=2:duration=first:dropout_transition=2 -f dshow -i video="screen-capture-recorder" -y av-out.flv
