csv第一行表示字段名，从第二行开始，每一行代表一条记录，字段之间用逗号分隔。

如下是读取CSV的示例：
```python
import csv

# 取得文件句柄
with open('file.csv') as f:

	# reader是个迭代器
	# 使用next()每次读取一行
	reader = csv.reader(f)
	
	# 第一次是字段
	next(reader)

	# 第二次是第一个记录
	row1= next(reader)
	print('第一个记录',row1)

	# 第三次是第二个记录，以此类推
	row2 = next(reader)
	print('第二个记录:',row2)
```

reader是一个可迭代对象，可使用for in 语句遍历。
