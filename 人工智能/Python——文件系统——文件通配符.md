
glob 模块提供了一个在目录中使用通配符搜索创建文件列表的函数:


```Python
import glob
glob.glob('*.py')
# ['primes.py', 'random.py', 'quote.py']
```