
#  执行系统命令

使用os.system()可以执行系统的命令，例如：

```py
os.system('ls')

os.system('other.py')
```



#  命令行参数

一些Python脚本需要处理命令行参数。这些参数以列表形式存储在sys模块的argv属性中。

一个脚本demo.py内容：

```py
import sys
print(sys.argv)
```

在终端调用：

```py
python demo.py one two three
```

输出结果：

```py
['demo.py', 'one', 'two', 'three']
```

第一个元素是脚本文件名，后面的元素为依次传入的参数。


# 读写环境变量

系统的所有环境变量都存储在os.environ中，这是一个字典。

要获取特定的环境变量，使用对应的键。例如获取Path环境变量：

```py
import os
os.environ['path']
```

经常需要为path添加条目，在Windows平台上，path的本质是分号分隔的字符串，此时可以通过+=添加一个路径。

```py
os.environ['path'] += ';'+r'D:\Test'
```



# 桌面通知

使用plyer库，可以直接发送桌面通知。

安装plyer：

```py
pip install plyer
```


如下示例发送了一个桌面通知：

```py
from plyer import notification
notification.notify(
    title="test",		#标题
    message="aaaa",	#内容
    timeout=5,		#通知持续时间
)
```


