

系统的所有环境变量都存储在os.environ中，这是一个字典。

要获取特定的环境变量，使用对应的键。例如获取Path环境变量：

```python
import os
os.environ['path']
```

经常需要为path添加条目，在Windows平台上，path的本质是分号分隔的字符串，此时可以通过+=添加一个路径。

```Python
os.environ['path'] += ';'+r'D:\Test'
```