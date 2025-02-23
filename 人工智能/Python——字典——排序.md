
在某些情况下，我们可能需要按照元素的某个属性或自定义规则进行排序。这时 ，可通过key参数传入一个函数，该函数用于提取待排序元素的关键属性。

```Python
people = [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 30}, {'name': 'Charlie', 'age': 20}]
people.sort(key=lambda person: person['age'])  # 按年龄从小到大排序
print(people)
```