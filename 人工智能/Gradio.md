
# Gradio

## 安装gradio

```
pip install gradio
```

## 导入gradio

```py
import gradio as gr
```

 ##  一个简单的示例

```py
import gradio as gr

def greet(name, intensity):  # 参数列表对应输入 name文本框、intensity滑块
    return "Hello, " + name + "!" * int(intensity)   # 输出对应，文本框

demo = gr.Interface(
    fn=greet ,   # 指定函数
    inputs=  ["text", "slider"] ,  # 指定输入类型： 一个文本框、一个滑块
    outputs = ["text"], # 指定输出类型
)

demo.launch()
```

## gr.Interface()的三大重要参数

Gradio的核心是Interface类，它允许用户定义输入和输出类型，创建交互式的Web界面。gr.Interface()有三大重要参数： 

-  fn处理函数： 用于定义如何根据输入返回输出。
-  inputs输入列表： 输入可以有一个或多个（列表）。每个元素支持多种输入类型，如gr.Text()用于文本输入，gr.Image()用于图像上传，gr.Audio()用于音频输入等。
-  outputs输出列表：输出使用函数的return指定，可以输出一个或多个。

## Interface()的其它参数

-  title ：标题
-  description ：描述
-  layout： 输入输出组件的布局
-  theme 界面主题风格，如dark
-  css ： css样式
-  layout： 使用layout="grouped"或layout="stacked"来更改组件的排列方式，使界面更加紧凑或分散。


##  数据类型

文本类：

类型	|	简写	|	含义	|	参数列表
---	|	---	|	---	|	---
gr.Text()	|	text	|	单行文本输入框	|	
gr.Textbox()	|	textbox	|	单行文本输入框	|	default：默认文本;placeholder：占位符文本
gr.Textarea()	|	textarea	|	多行文本输入框	|	lines：显示行数，整数值;placeholder： 占位符文本
gr.Number()	|	number	|	数字输入框	|	default：默认数字;label：标签文本
gr.Time()	|	time	|	输入时间	|	label：标签文本
gr.Slider()	|	slider	|	滑动条，用于选择一定范围的数值	|	minimum： 最小值;maximum：最大;step：步长;label：标签文本
gr.Radio()	|	radio	|	单选框	|	choices：字符串数组;label： 标签文本
gr.Checkbox()	|	checkbox	|	复选框，布尔类型	|	label：复选框旁边的文本
gr.ColorPicker()	|	colorpicker	|	选择颜色，十六进制颜色代码	|	default：默认颜色值
gr.Dropdown()	|	dropdown	|	下拉菜单	|	choices：字符串数组

附件类：

类型	|	简写	|	含义	|	参数列表
---	|	---	|	---	|	---
gr.File()	|	file	|	上传任意文件	|	file_count： 允许上传的数量，取值single（只能传一个）、multiple（可以传多个）; type： 数据类型，如file、audio
gr.Dataframe()	|	dataframe	|	上传csv文件或输入dataframe	|	headers: 列标题数组; row_count: 初始显示的行数
gr.Data()	|	data	|	上传二进制数据，用于上传音频或视频的原始字节	|	type：类型，可以是 auto 自动推断
gr.Image()	|	image	|	上传图片，支持多种图像格式	|	type： 图像类型，如pil
gr.Video()	|	video	|	上传视频	|	label：标签文本
gr.Audio()	|	audio	|	上传音频	|	source：指定音频来源;type：指定返回类型;label：标签文本


## 输出组件的类型

输出组件的类型除了包括上面表格中的类型以外，还包括：

-  Carousel：以轮播方式展示多个输出，适用于图像集多个数据点。参数：item_type 设置轮播项目类型。例：gr.Carousel(item_type="image")
-  Gallery：以画廊形式展示一系列图像。
-  HTML：展示HTML内容，适用于富文本或网页布局。
-  Image：展示图像。参数：type 指定图像格式。 例：gr.Image(type="pil")
-  JSON：以JSON格式展示数据，便于查看结构化数据。
-  KeyValues：以键值对形式展示数据。
-  Label：展示文本标签，适用于简单的文本输出。
-  Markdown：支持Markdown格式的文本展示。
-  Plot：展示图表，如matplotlib生成的图表。
-  Text：用于显示文本，适合较长的输出。

## Gradio集成大模型

如下代码集成了HuggingFace的图像分类模型：

```py
import gradio as gr
from transformers import pipeline

# 加载Huggingface上的预训练模型
model = pipeline('image-classification')

# 定义处理函数
def classify_image(img):
    return {i['label']: i['score'] for i in model(img)}

# 创建Gradio界面
iface = gr.Interface(
    fn=classify_image,
    inputs=gr.Image(type="pil"),   ## 图片类型
    outputs=gr.Label(num_top_classes=5))
iface.launch()

```

![Gradio](img/Gradio.png)

