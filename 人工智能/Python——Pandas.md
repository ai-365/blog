
# Pandas


###  读取CSV

```py
pd.read_csv(路径，encoding="utf-8")
```

参数：
- header：定义那一行作为标题
- sep： 定义分隔符，一般为逗号
- names吧为文件中的每一列定义列名
- usecols： 从csv文件中提取哪些列
- dtype： 列的数据类型

写入CSV文件：

```py
pd.to_csv(路径)
```

写入Excel：

```py
pd.to_excel(路径)
```

###  排序


```py
df.sort_values(by='步数')
```

ascending=False 表示逆序

###  拼接

纵向堆叠：

```py
concat（[df1,df2], axis=0）
```

横向拼接：

```py
concat（[df1,df2], axis=1）
```

###  与numpy结合

```py
arr = nparange（100）.reshape(25, 4)
df = pd.DataFrame(arr)
```

###  行列名称


默认时，均从0开始。

使用index关键字指定行名称

使用columns关键字指定列名称

###  条件筛选

筛选出步数列中大于10000的行，并返回新的表：

```py
df[df["步数"]>=10000]
```

注意，query的参数是一个字符串形式，但字段名不要加引号，例如：

```py
df.query('  步数>=10000 and 摄入卡路里 <=1800   ' )
```


提取行或列


```py
df["A"]  提取A字段列

df["A"，"B"]  提取A和B字段列

df[:2]  提取前2行
```

###  缺失值处理


缺失值显示NaN，改成0

fillna(0)

###  loc和iloc

loc使用具体的行或列的值提取。iloc使用序号提取。

```py
df.loc(行,列)
```


第一个参数，哪些行，冒号表示所有。如果多个行，使用数组。

第二个参数，哪些列，冒号表示所有，如果多个列，使用数组形式。

```py
df.iloc(行号,列号)
```

第一个参数，哪几行。冒号表示所有，1:表示第2行到最后一行。

第二个参数，哪几列。：2表示第1行到2行

###  删除列

```py
df.drop('日期'，axis=1)
```
