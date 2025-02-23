
为什么有了列表还要使用元组？关键就在于元组的不可变性，我们可以修改列表的元素，但是无法对元组的元素。例如，如果要更改元组中某个位置的值：

```
turple8 = (1,2,3,4)
# 期望修改第1个元素
turple8[0] = 10 
```

解释器会报出如下错误：

```
TypeError: 'tuple' object does not support item assignment
语法错误： 元组对象不支持元素赋值
```

