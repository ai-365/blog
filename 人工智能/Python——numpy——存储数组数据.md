

## 存储数组数据

可以使用.npy文件后缀名保存数组，方便重复使用。

如下示例先将arr数组使用np.save()方法保存到arr.npy文件中，然后使用load()方法读取数组，赋值给arr2：

```
import numpy as np
arr = np.array([[1,2,3],[4,5,6]])

// 存储
np.save('arr.npy',arr)

// 读取
arr2 = np.load('arr.npy')
print(arr2)
```
