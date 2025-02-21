
有些时候，需要改变标签的文字内容。此时可以设置textvariable参数为一个动态文本变量类型。

```Python
import tkinter as tk

# 新建窗口对象
window=tk.Tk()
window.title='my window'
window.geometry('800x600+500+200')

# 新建标签，设置动态文本属性
my_text = tk.StringVar()
label = tk.Label(window, textvariable=my_text)
label.pack()

def onclick():
	my_text.set('new text')

# 新建按钮
button = tk.Button(window, text='click me', command=onclick)
button.pack()

window.mainloop()
```

