**模块的定义**

大多数情况下，一个模块是一个目录，里面包含许多个文件或子目录，用来定义不同的功能。

要让一个文件夹变成一个Python模块，只需要在该文件夹内新建一个__init__.py文件，当模块被导入时会自动执行里面的代码。注意，__init__py文件一定要存在，哪怕内容为空。同时，每个子目录也要有__init__.py文件。

**模块搜索路径**

默认情况下，会按照如下顺序搜索模块：
- 当前目录。
- PYTHONPATH环境变量，这是一个目录列表。
- Python安装目录的site-packages目录。

**__all__变量导出**

模块可以指定只导出哪些内容，这是可以使用__all__变量，例如：

```
__all__ = ["a", "foo", "bar"]
```

这样，在使用如下两个语句中的一个时，都只会导入这三个变量：

```
import package
from package import *
```

**import 语句导入**

import 语句导入另一个模块对象，另一个模块导出的内容都是该对象的成员，例如：

```
import package
// 使用
package.foo()
```

**from语句导入**

要使用from语句导入特定的变量，使用：

```
from package import a, foo
// 使用
print(a)
foo()
```

还可以导入另一个模块导出的全部内容：

```
from package import *
```

还可以在导入时重命名：

```
from package import a  as alias1
```
