
绘制Tkinter图形界面，首先需要新建窗口，然后才能新建文本、按钮等元素。

```Python
import tkinter as tk

# 新建窗口对象
window=tk.Tk()

# 窗口标题
window.title='my window'

# 窗口大小为800x600，位置为(500,200)
window.geometry('800x600+500+200')


# 显示窗口
window.mainloop()
```


注意，loop因为是循环的意思，window.mainloop就会让window不断的刷新，如果没有mainloop,就是一个静态的window,传入进去的值就不会有循环，mainloop就相当于一个很大的while循环，有个while，每点击一次就会更新一次，所以我们必须要有循环。

所有的窗口文件都必须有类似的mainloop函数，mainloop是窗口文件的关键的关键。

窗口的大小的位置的写法是：

```
window.geometry('wxh+x+y')
```

x是小写字母，（x,y）相对于屏幕左上角。