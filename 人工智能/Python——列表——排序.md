
列表的sort方法就地改变列表本身。

sorted()内置函数会返回一个新的列表。

sorted方法的语法如下：

```Python
sorted(list, reverse, key)
```

- list ：要排序的列表
- reverse： 值为True时逆序，默认为False，从小到大。可选关键字参数。
- key： 排序依据。 例如key=str.lower不按大小写排序。可选关键字参数。


排序有两种情况：

- 对数字列表的排序： 这会按照自然数从小到大排。
- 对字符串列表的排序： 这会按照字符串的ASCII码值排序。

数字列表排序：


```Python
digits = [345, 6, 22]
sorted(digits)
# [6, 22, 345]
# 默认从小到大
```

字符串列表排序：

```Python
fruits = ['grape', 'raspberry', 'apple', 'banana']

# 默认按字符串字符的ASCII码从小到大排
sorted(fruits)
# ['apple', 'banana', 'grape', 'raspberry']

# 根据字符串的长度排序
sorted(fruits, key=len)
# ['grape', 'apple', 'banana', 'raspberry']
```


key还可以是一个函数。

形参表示每个元素，返回一个值，表示排序依据。

如下示例，` [: :-1] `表示字符串逆序。

```Python
fruits = ['strawberry', 'fig', 'apple', 'cherry', 'raspberry', 'banana']
sorted(fruits, key=lambda word: word[::-1])
# ['banana', 'apple', 'fig', 'raspberry', 'strawberry', 'cherry']
```