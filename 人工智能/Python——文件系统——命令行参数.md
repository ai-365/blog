
一些Python脚本需要处理命令行参数。这些参数以列表形式存储在sys模块的argv属性中。

一个脚本demo.py内容：

```Python
import sys
print(sys.argv)
```


在终端调用：

```sh
python demo.py one two three
```

输出结果：

```sh
['demo.py', 'one', 'two', 'three']
```

第一个元素是脚本文件名，后面的元素为依次传入的参数。