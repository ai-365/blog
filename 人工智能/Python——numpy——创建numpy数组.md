
numpy数组本质上也是Python的数组，只是对于数学计算场景做了特殊的优化。

如果是一维数组，也可以称之为向量。

如果是二维数组，通常称之为矩阵，使用矩阵的场景非常多。

如下示例创建了一个2行3列的二维数组：

```
import numpy as np
arr = np.array([[1,2,3],[4,5,6]])
```

range(n)返回从0到n-1这n个整数组成的一维数组。


```
import numpy as np
arr = np.range(10)
print(arr)
# [0,1,2,3,4,5,6,7,8,9]
```

arange(m,n,t)表示元素从m到n-1，步长为t，如果省略t，则步长为1。

```
import numpy as np
arr = np.arange(1,10,2)
print(arr)
# [1,3,5,7,9]
```

linspace(m,n,count) 表示最大值n，最小值为m，总数为count个的均匀分隔的数组。

zeros(n)表示n个元素是0的一维数组。zeros(m,n)表示m行n列元素全部为0的二维数组。

```
import numpy as np
arr = np.zeros(3,2)
```


ones(n)表示n个元素是1的数组。ones(m,n)表示m行n列元素全部为1的二维数组。

```
import numpy as np
arr = np.ones(3,2)
```

eye(n)表示主对角线为1，其它元素全部为0的n行n列的二维数组。主对角线指的是从左上角到右下角。

```
import numpy as np
arr = np.eye(4)
```


