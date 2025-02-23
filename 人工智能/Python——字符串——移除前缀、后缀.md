


```
str.removeprefix(prefix)
```

如果字符串以prefix开头，则返回删除了该前缀的新子串。如果不以该前缀开头，返回原字符串。

```Python
'TestHook'.removeprefix('Test')
# 'Hook'

'BaseTestCase'.removeprefix('Test')
# 'BaseTestCase'
#  虽然包含，但不是前缀
```

```
str.removesuffix(suffix)
```

如果字符串以 suffix 字符串结尾，则返回删除了该后缀的新子串。如果不以该后缀结尾，返回原字符串。

```Python
'MiscTests'.removesuffix('Tests')
# 'Misc'
```