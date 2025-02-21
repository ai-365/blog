
使用append()方法可以将新元素添加到列表末尾：

```
li = [1,2]
li.append(3)
```

使用insert()方法可以在指定位置插入新元素。insert(n,value)表示在第n+1个元素前面插入value这个新元素。例如：

```
li = [1,2]
li.insert(0,3)
print(li) # [3,1,2]
```

