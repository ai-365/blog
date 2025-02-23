
一个常见的场景是要筛选出序列中的元素，此时推导式很有用。

如下示例返回当前目录下以 .py 结尾的文件。

```
import os
files = os.listdir('.')

[x for x in file if x.endswith('.py')]

```