- 窗口
- text 显示文本
- 宽度width
- 高度height
- command 执行的函数，不加括号

```Python
import tkinter as tk
import tkinter.messagebox

# 新建窗口对象
window=tk.Tk()
window.title='my window'
window.geometry('800x600+500+200')

def onclick():
	tkinter.messagebox.showinfo(title='Hi', message='你好！')

button = tk.Button(window, text='click', command=onclick)
button.pack()

# 显示窗口
window.mainloop()
```
