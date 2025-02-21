
del不是函数而是语句，表示删除指针。

```
a = [1,2,3]

b = a  # b复制了a的指针
del a  # 删除a的指针
print(b)
# [1,2,3] b依然存在

print(a)
# NameError: name 'a' is not defined
# 因为a的指针被删了，所以a没有定义
```