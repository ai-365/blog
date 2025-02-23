
相对路径到绝对路径的转化，使用：

```
os.path.abspath(r'Test')
# 'D:\\Test'
```

如下为获取路径的基础路径：
```
os.path.basename(r"D:\Test\file.txt")
# 'file.txt'
```

如下获取路径所在的文件夹，即去掉最后一个路径部分：
```
os.path.dirname(r"D:\Test\file.txt")
# 'D:\\Test'
```

使用join()合并多段路径：

```
os.path.join(r"D:\Test", r"Test\file.txt")
# 'D:\\Test\\Test\\file.txt'
```


如下将拆分文件名和后缀，返回一个元组：

```
os.path.splitext(r"D:\Test\file.txt")
# ('D:\\Test\\file', '.txt')
```