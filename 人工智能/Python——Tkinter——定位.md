

元素的位置一般使用place()方法，传入x和y参数，以左上角为原点。

```Python
import tkinter as tk

# 新建窗口对象
window=tk.Tk()
window.title='my window'
window.geometry('800x600+500+200')


label= tk.Label(window, text='定位示例')
label.place(x=200,y=250)

# 显示窗口
window.mainloop()
```