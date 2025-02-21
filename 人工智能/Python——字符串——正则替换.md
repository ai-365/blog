
替换字符串的子串为新子串，使用字符串的replace()方法。

如果要对字符串进行正则替换，则使用re模块的sub()方法。

```Python
re.sub(pattern, replacement, string)
```

匹配到pattern的子串，使用replacement替代。

示例：

```Python
import re

re.sub(r'\d', '*', "123abb456")
# ***abb***
```