

要写入文件内容，需要将open()的第二个参数设置为w。

如下示例先删除原有的内容，替换为新内容。如果文件不存在，则创建新文件。

```Python
file= open('file.txt', 'w' ,encoding='utf8')
file.write('写入的新内容')
file.close()
```

