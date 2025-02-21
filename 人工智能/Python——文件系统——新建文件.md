
没有直接的方式新建文件，可以通过open()的方式新建。因为open()的原则是不存在就新建。

```Python
# 注意，一定要加上'w'或'a'参数
file = open('file.txt', 'w', encoding='utf-8')
file.write('内容')
file.close()
```