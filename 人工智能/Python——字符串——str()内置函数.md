

使用str()可将其它数据类型转换为字符串。下面是一些示例：

```python
str1 = str(123)

str2 = str([1,2,3])

str3 = str({"a":1,"b":2})

```

str()可以避免字符串和数字合并时发生的错误，例如下面的例子，你可能期望输出 'I am 40 years old'，但实际会发生语法错误：

```Python
age = 40
print('I am ' + age + ' years old')
# TypeError: can only concatenate str (not "int") to str
```

此时，str()就派上用场了，将整数转为字符串：

```Python
age = 40
print('I am ' + str(age) + ' years old')
# I am 40 years old
```


