


fullmatch(pattern, string)

如果整个string匹配pattern，则返回match，否则返回None，None在终端中不会显示。

例如，检查字符串是否包含数字，并返回布尔值：

```Python
re.fullmatch(r'.*\d.*', 'abc123def')
# <re.Match object; span=(0, 9), match='abc123def'>
```

除了检测字符串是否匹配pattern以外，有时候还需要找到匹配的位置，此时，使用search()。

```Python
re.search(r'.*\d.*', 'abc123def')
# <re.Match object; span=(3, 4), match='1'>
```