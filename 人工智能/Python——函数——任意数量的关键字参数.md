
在参数前面加两个星号，就变成了任意数量的关键字参数。

此时，无论传递多少个关键字实参，都会打包成一个字典传给函数调用。

```python
def foo(**infos):
    print('welcome')
    for key,value in infos.items():
        print(f'- {key}:{value}')

# 此时infos={'mike':'manager'}
foo(mike='manager')

# 此时infos={'mike':'manager','bob'='programer','smith'='speaker'}
foo(mike='manager',bob='programer',smith='speaker')
```