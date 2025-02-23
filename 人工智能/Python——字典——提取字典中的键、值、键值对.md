
- keys() ：提取键
- values() ：提取值
- items() ：提取键值对

得到的均为可迭代对象。

通过list()转化为标准列表。


使用keys()方法得到包含键的一种可迭代对象，可以使用list()包装：

```python
dict1 = {'a': 1, 'b': 2, 'name': 'bob'}
print(dict1.keys())    # dict_keys(['a', 'b', 'name'])

list1 = list(dict1.keys())
print(list1)  # ['a', 'b', 'name']
```

使用values()方法得到包含值的一种可迭代对象，可以使用list()包装：

```python
dict1 = {'a': 1, 'b': 2, 'name': 'bob'}
print(dict1.values())    # dict_values([1, 2, 'bob'])

list2 = list(dict1.values())
print(list2)  # [1, 2, 'bob']
```

使用items()方法得到包含键值对的一种可迭代对象，可以使用list()包装：

```python
dict1 = {'a': 1, 'b': 2, 'name': 'bob'}
print(dict1.items())    # dict_items([('a', 1), ('b', 2), ('name', 'bob')])

list3 = list(dict1.values())
print(list3)  # [('a', 1), ('b', 2), ('name', 'bob')]
```