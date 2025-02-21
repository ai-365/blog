
## 用到的模块

用到一个模块：datetime

```Python
from datetime import datetime
```


## 返回当前时间

```Python
datetime.now()
# 2024-05-23 12:00:56.968012
# 小数后面是毫秒
```


## 返回当前时间戳

```Python
from datetime import datetime
now = datetime.now()
print(now.timestamp())
# 1716438379.545603
```

## 创建时间

```Python
datetime(2023, 3, 15, 12, 30)
# datetime.datetime(2023, 3, 15, 12, 30)
```

## 基于字符串创建时间

```Python
datetime.strptime("2023-03-15 12:30:00", "%Y-%m-%d %H:%M:%S")
# 2023-03-15 12:30:00
```

## 时间戳转时间

```Python
datetime.fromtimestamp(1716437763.1540167)
# datetime.datetime(2024, 5, 23, 12, 16, 3, 154017)
# 最后一个是毫秒
```

## 时间转时间戳

```Python
datetime(2023, 3, 15, 12, 30).timestamp()
# 1678854600.0
```



## 基于时间提取要素

```Python
now = datetime.now()

# 提取年
now.strftime('%Y')
'2024'

# 提取月
now.strftime('%m')
# '5'

# 提取日
now.strftime('%d')
# '23'

# 提取年月日
now.strftime('%Y-%m-%d')
# '2024-5-23'

# 提取时分秒
now.strftime('%H-%M-%S')
# '12-12-15'
```

各个要素如下：
- %Y， 四位数年
- %m， 两位数月份，单数前补0
- %d， 两位数日期，单数前补0
- %H， 两位数小时，单数前补0
- %M， 两位数分种，单数前补0
- %S， 两位数秒，单数前补0。


