


要在文件末尾追加内容，需要将第二个参数设置为a。

如下示例将新内容追加到文件末尾，如果文件不存在，则创建新文件。

```
file = open('file.txt','a',encoding='utf8'):
file.write('追加的新内容')
file.close()
```

如果要多次追加，多次调用write()即可。

