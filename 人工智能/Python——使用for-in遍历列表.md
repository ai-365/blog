

使用for in 语句可以遍历序列，示例如下：

```Python
li = [1,2,3]
for item in li:
    print(li)
```

推而广之，只要是序列，均可以使用 for in 遍历。包括列表、元组、字符串、以及range()返回的序列。 

```
for item in range(1,4):
        print(item**2)
```


```
tur = (1,2,3)
for item in tur:
        print(item)
```

```
for x in 'abc'
	print(x)
```