
在参数前面加上星号，就变成了任意数量的实参。

在传递实参时，把后面的所有参数均打包为一个列表。

```
def foo(*names):
    print('welcome:')
    for name in names:
        print(f'- {name}\r')

# 此时names=['mike']
foo('mike')

# 此时names=['mike','bob','smith']
foo('mike','bob','smith')
```