
严格来说，由于字典不可迭代，因此是不可遍历的。但是，可以使用items()先将字典转换为包含元组的序列，从而进行遍历。

```
di = {'a':1,'b':2}
for key,value in di.items():
    print(key,value)
```

