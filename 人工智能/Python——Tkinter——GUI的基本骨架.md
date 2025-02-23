
Tkinter的基本骨架是新建窗口对象，然后以此为基础新建其它元素，然后使用mainloop()显示窗口。

```Python
import tkinter as tk

# 新建窗口对象
window=tk.Tk()
window.title='my window'
window.geometry('800x600+500+200')


# 新建一些其它元素，注意一定要使用pack()


# 显示窗口
window.mainloop()
```