文本输入框也是非常常见的控件，用于接收用户的文字输入。

使用Entry()函数新建一个单行文本输入框。

使用get()方法可以获取输入的内容。

使用insert()方法，并传入位置和字符串两个参数，设置文本框的内容。

使用delete(0, tk.End)方法，清空文本框。

示例代码如下：

```python 
import tkinter as tk

# 新建窗口对象
window=tk.Tk()
window.title='my window'
window.geometry('800x600+500+200')


entry = tk.Entry(window)
entry.pack()

# 在终端打印文本框的值
def get_text():
	print(entry.get())

# 设置文本框的值
def set_text():
    entry.insert(0,'新的值')

# 清空文本框
def delete():
    entry.delete(0, tk.END)

button_get = tk.Button(window,text='获取文本框的值', command=get_text)
button_get.pack()

button_set = tk.Button(window,text='设置文本框的值', command=set_text)
button_set.pack()

button_delete = tk.Button(window,text='删除文本框的值', command=delete)
button_delete.pack()

# 显示窗口
window.mainloop()
```