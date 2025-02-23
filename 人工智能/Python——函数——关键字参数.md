

```
def foo(first,last='Baiden'):
    print(f'hello,{first} {last}')

# last参数没传递实参，使用默认值
foo('John')
# hello,John Baiden 

# last参数传递了实参，覆盖默认值
foo('John','Smith')
# hello,John Smith 
```