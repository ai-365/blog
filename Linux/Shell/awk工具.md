
# awk工具

##  语法

```
awk  选项  '行筛选条件{列编辑指令}' 文件或列表
```

选项：
-F 指定分隔符

## 示例

```
cat /etc/passwd | awk -F ":' "{print $1,$3,$4}''
```

以":"为分隔符，输出1，3，4列内容

## 内部变量

- FS：指定每行文本的字段分隔符，默认为空格或制表位。 与-F一样
- NF：当前处理的行的字段个数。 
- NR：当前处理的行的行号（序数）。 
- $0：当前处理的行的整行内容。 
- $n：当前处理行的第 n 个字段（第 n 列）。 
- FILENAME：被处理的文件名。
- RS：数据记录分隔，默认为\n，即每行为一条记录。

## 行筛选条件

输出奇数行：

```
nl /etc/passwd | awk '(NR%2)==1{print}' 
```

输出1、3行的内容：

```
cat /etc/passwd | awk 'NR==1||NR==3{print}' 
```


## if语句

必须用在{}中，且比较内容用()扩起来

```
awk -F: '{if($1~/mail/) print $1}' /etc/passwd                                       //简写
```

```
awk -F: '{if($1~/mail/) {print $1}}'  /etc/passwd                                   //全写
```


```
awk -F: '{if($1~/mail/) {print $1} else {print $2}}' /etc/passwd            //if...else...
```


