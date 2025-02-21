
字符串的split()方法可以对字符串进行分割，如果要基于正则表达式进行分割，则使用re模块的split()方法。


```
re.split(pattern, string)
```

用pattern分开string，返回列表。


```Python
re.split(r'\W+', 'Words, words, words.')
# ['Words', 'words', 'words', '']
```

`\W`表示非字母符号