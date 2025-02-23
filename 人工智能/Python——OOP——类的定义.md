
使用class关键字创建类，类名习惯上首字母大写。注意，类名后面一定要跟上括号和冒号。



```Python
class Dog():
	"""一次模拟小狗的简单尝试"""

	def __init__(self, name, age):
		self.name = name
		self.age = age

	def sit(self):
		print(self.name + ' is now sitting.')
```

类定义中的所有方法，包括`__init__`构造方法，第一个参数一定是self，表示对应的实例。

`__init__`为构造方法，用于实例的各个属性成员。在实例化时，依次传入实例的实际属性。




