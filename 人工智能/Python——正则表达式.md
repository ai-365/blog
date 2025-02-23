
# 正则表达


###  元字符

次数匹配： 
- `{m}` m次的匹配
- `{m,n}` m到n次匹配
- `*`0到多次
- `+` 1到多次
- ？ 0到1次

开头结尾匹配 ：
- ^  匹配开头
- $  匹配结尾

指代字符： 
- . 任意字符
- `\W` 非字母数字
- `\s` 空白字符
- `\d` 任意数字，即0-9


###  fullmatch()

正则匹配的意思是，一个字符串是否符合一个正则表达式。

如果要求整个字符串完全符合正则表达式，使用fullmatch()。

```py
re.fullmatch(pattern, string)
```

使用fullmatch()检测整个文本是否匹配pattern，如果匹配，则返回match，否则返回None，None在终端中不会显示。

例如，检查字符串是否包含数字，可以使用正则表达式 `r'.*\d.*'`。

除了检测字符串是否匹配pattern以外，有时候还需要找到匹配的位置，此时，使用search()。

```py
import re

# 检测字符串是否包含数字
text = 'abc123def'
pattern = re.compile(r'.*\d.*')

result = pattern.fullmatch(text)
print(result)
# <re.Match object; span=(0, 9), match='abc123def'>

pattern2 = re.compile(r'\d')
result2 = pattern2.search(text)
print(result2)
# <re.Match object; span=(3, 4), match='1'>
```


###   分组和回引

如果新子串需要保留旧子串的部分内容，则需要将这部分内容用圆括号包裹，表示一个组，并用特定的格式给这个组起个名字，然后再用特定的格式在新子串中引用。

```py
定义分组：?P<name>
回引： \g<name>
```

如下示例，书名使用中文粗括号包裹，希望改为书名号，此时书名就是需要保留的内容，使用括号包裹并定义为一个组：

```py
import re
 
# 示例文本
text = "这本书的名字叫【活着】。"
 
# 正则表达式，其中有命名组
pattern = re.compile(r"【(?P<book>.*)】")
 
# 替换文本中的命名组
result = pattern.sub(r"《\g<book>》", text)
print(result)  
# 这本书的名字叫《活着》。
```


### groups()

如果要检测多个子串，可以使用分组。用圆括号包裹即创建一个分组。结果中会返回包含每组结果的元组。

```py
# 导入re模块
import re

tel = "0755-98776754"

# 定义正则表达式
pattern = re.compile(r"(\\d{4})-(\\d{8})")

result = pattern.search(tel)

print(result)   
# <re.Match object; span=(0, 13), match='0755-98776754'> 

print(result.group())    # 0755-98776754

# 返回匹配到的子串元组
print(result.groups())    # ('0755', '98776754')
# 返回第一个匹配子串
print(result.group(1))    # 0755
# 返回第二个匹配子串
print(result.group(2))    # 98776754
```

### 正则替换：sub


很多时候，要替换字符串的一部分为新的子串，但是，需要子对串进行模糊匹配，此时可以用sub()。

如果要对字符串进行正则替换，则使用re模块的sub()方法。

```py
pattern.sub(replacement, text)
```

匹配到pattern的子串，使用replacement替代。

示例：

```py
import re

text =  "123abb456"
# 数字匹配
pattern = re.compile(r'\d')
pattern.sub('*', "123abb456")
# ***abb***
```

###  split()

字符串的split()方法可以对字符串进行分割，如果要基于正则表达式进行分割，则使用re模块的split()方法。

```py
re.split(pattern, string)
```

用pattern分开string，返回列表。


```py
import re

text = 'Words, words; words'
# 非字母符号
pattern = re.compile(r'\W+') 

result = pattern.split(text)
print(result)
```

`\W`表示非字母符号。


