


创建（create）时间： os.path.getctime()

访问（access）时间：os.path.getatime()

修改（modify）时间： os.path.getctime()

皆传入文件的路径，如果是当前目录下的文件，则传入文件名即可。

```Python
import os
os.path.getctime('file.txt')
os.path.getatime('file.txt')
os.path.getmtime('file.txt')
```


上述方法返回的皆为时间戳。


