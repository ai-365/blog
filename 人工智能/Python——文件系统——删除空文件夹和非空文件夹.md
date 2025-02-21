
使用rmdir()删除空文件夹：

```Python
os.rmdir(r'D:\Test')
```


如果文件夹不是空的，则会报错。

使用removedirs()递归删除空文件夹：

```
os.removedirs()
```

如果要删除非空文件夹，应使用shutil库的rmtree()方法。

```Python
import shutil
shutil.rmtree('目录')
```