


使用with语句，子句体结束后，文件会正确关闭，使用closed属性可以检查文件是否已关闭：

```Python
with open('file.txt',encoding='utf8') as f :
        print(f.read())
        
f.closed # True
```

如果不使用with，则需要手动关闭：

```Python
file = open('file.txt','r', encoding='utf8')

file.close()
```
