# cookie
## 读取cookie

读取cookie很简单，使用document.cookie即可，这会返回一组名值对，由分号分隔，例如：

```
name1=value1;name2=value2;name3=value3
```

## 设置cookie

使用如下语法设置cookie：

```
document.cookie="name=value"
```

运行上述语句后，并不会删除已经存在的cookie。如果是新的属性，则会合并到现有的cookie中。如果是已在存在的属性，就会覆盖其属性值。