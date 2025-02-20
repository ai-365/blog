Python中的字典包含一个或多个键值对。这些键值对是没有顺序的，因此不能通过索引访问。

因为字典的键值对没有顺序，Python字典不是可迭代对象。

通常通过一对花括号新建一个字典：

```
di= {'a': 1, 'b': 2}
```

键需要使用单引号或双引号包裹。

通过len()方法得到字典的键值对的数量，即字典的长度：

```
di = {'a': 1, 'b': 2, 'name': 'bob'}
print(len(di))
```

通过中括号和引号包裹键名称可以访问对应的值。注意，与JavaScript不同，不支持使用点号语法。

```
di = {'a': 1, 'b': 2}
print(di['a']) 
```

为键名称赋值即可添加键值对，如果键本来就存在，则会覆盖原来的值。

```
di = {'a': 1, 'b': 2}
di['c'] = 3
di['a'] = 10
print(di) 
```

使用del语句加上键名称可以删除对应的键值对。

```
di = {'a': 1, 'b': 2}
del di['b']
print(di)
```
