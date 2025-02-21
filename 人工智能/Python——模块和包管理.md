
# 模块、包、pip

## 模块和包

### 示例

```py
sound/                          最高层级的包
      __init__.py               初始化 sound 包
      formats/                  用于文件格式转换的子包
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  用于音效的子包
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  用于过滤器的子包
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

### 包和模块的区别

要将一个文件夹变成Python包，需要在文件夹下添加__init__.py 文件。

包和子包是不同的包，示例中，sound包和sound.effects是不同的包。

包是文件夹，模块是Python文件。

导入包时，实际执行的是文件夹里面的__init__文件。导入模块时，就是执行这个模块文件。


### 包和文件夹的区别

一个包本质上就是操作系统的一个文件夹，里面有若干.py文件。子包就是子文件夹。

包和文件夹的唯一区别就是包里面有一个特殊文件： `__init__.py`文件。

要将一个文件夹变成Python包，需要在文件夹下添加`__init__.py` 文件。

包和子包是不同的包，示例中，sound包和sound.effects是不同的包。

### import 语法

```py
import sound.effects.echo 
```

使用时需要使用全名称前缀：

```py
 sound.effects.echo.类变量或函数。
```


如果不想麻烦，则导入时应该使用as重命名：

```py
import sound.effects.echo  as echo
```

这样，使用时：

```py
echo.类、变量或函数
```

### from import 语法

导入模块：

```py
from sound.effects import echo
```

使用：

```py
echo.类、变量或函数
```

导入模块里面的所有变量、类或函数：

```py
from sound.effects.echo import *
```

然后，不加模块前缀，直接使用里面的类、变量或函数。

导入模块里面具体的类、变量或函数：

```py
from sound.effects.echo import echofilter
```

使用时：

```py
echofilter()
```

`*` 默认为模块里面所有的全局变量、类和函数。但如果模块里面定义了 `__all__`数组，数组里面限制了导出了哪些变量、类或函数，则 `*`只会导入这些变量、类或函数。

### import和from import的区别

`import` 只能导入包、子包、模块，使用时需要使用全名称前缀，除非用as重命名。

`from import` 可以导入包、子包、模块、具体的变量、函数。导入变量或函数时直接使用，不需要前缀。

### from 相对导入

如果surround.py要导入echo.py，可以使用：

```py
from . import echo
```

. 表示当前文件夹。

如果surround.py要导入formats包，可以使用：

```py
from  .. import  formats
```

.. 表示上一级文件夹。

如果surround.py要导入formats包里面的wavread.py，可以使用：

```py
from  ..formats  import  wavread
```

..formats表示上一级文件夹中的formats文件夹。

### 导入包时具体执行了什么？

导入模块时，就是执行这个模块文件。

而导入包时，实际执行的是文件夹里面的`__init__`文件。


##  模块

大多数情况下，一个模块是一个目录，里面包含许多个文件或子目录，用来定义不同的功能。

要让一个文件夹变成一个Python模块，只需要在该文件夹内新建一个`__init__.py`文件，当模块被导入时会自动执行里面的代码。注意，`__init__py`文件一定要存在，哪怕内容为空。同时，每个子目录也要有`__init__.py`文件。


默认情况下，会按照如下顺序搜索模块：
- 当前目录。
- PYTHONPATH环境变量，这是一个目录列表。
- Python安装目录的site-packages目录。

模块可以指定只导出哪些内容，这是可以使用`__all__`变量，例如：

```py
__all__ = ["a", "foo", "bar"]
```

这样，在使用如下两个语句中的一个时，都只会导入这三个变量：

```py
import package
from package import *
```

`import` 语句导入另一个模块对象，另一个模块导出的内容都是该对象的成员，例如：

```py
import package
// 使用
package.foo()
```

要使用from语句导入特定的变量，使用：

```py
from package import a, foo
// 使用
print(a)
foo()
```

还可以导入另一个模块导出的全部内容：

```py
from package import *
```

还可以在导入时重命名：

```py
from package import a  as alias1
```


##   pip包管理器

pip是Python官方的包管理器，默认随着Python程序一起安装。

### 基础用法

要检查pip是否已经安装，在终端中运行：

```py
pip
```

如果已经安装，则会输出pip的帮助信息。

要安装Python包，运行：

```py
pip install package
```


如果将当前目录下的requirements.txt中列出的依赖安装到当前目录，运行：

```py
pip install -r  requirements.txt  .
```

要显示已经安装的包列表，运行：

```py
pip list
```

要卸载某个包，运行：

```py
pip uninstall package -y
```

加上 -y 或 --yes 选项表示确认卸载，如果不加，则需要在终端中手动确认。

### 换源


可以将包的下载源地址切换到国内源，例如阿里云的源，以提升下载速度。有两种方式：命令替换和手动替换。

第一种方式，命令替换，推荐使用。运行如下命令，切换成阿里云的源：

```py
pip config set global.index-url  https://mirrors.aliyun.com/pypi/simple
```

第二种方式，手动替换。在用户家目录下，创建文件pip.ini，并添加如下内容：

```py
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host=mirrors.aliyun.com
```

这样，pip会默认使用这个源。

当然，也可以临时指定，使用 ` -i ` 选项，例如：

```py
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple
```

###  自定义安装位置

pip默认会将包安装到如下位置：

```py
Python安装目录\Lib\site-packages
```

使用--target选项将Python包安装到自定义的位置。

```py
pip install  --target=安装路径名
```

如果按照路径名包含空格，需用双引号包裹。

###  包搜索顺序
Python 解释器运行时会按照如下 1~5 的顺序依次搜索 import 语句指定的包。如果有同名包，那么按照1 ~ 5 的顺序使用先找到的：

1. python主程序所在目录及其子目录
2. 环境变量 PYTHONPATH中的路径列表 
3. 标准库目录，即 Python安装目录\Lib
4. 任何.pth文件中的指定的目录，.pth 文件需要放在 Python 安装目录的根目录下
5. Python安装目录下的 site-packages 主目录



### PYTHONPATH

PYTHONPATH是第三包库的搜索路径，默认第三方包安装在`Python安装目录\Lib\site-packages`，但也可以自定义。

要获取PYTHONPATH，通过`os.environ['PYTHONPATH']`。

```py
import os
os.environ['PYTHONPATH']
```


##   虚拟环境：venv

要创建虚拟环境，请确定要放置它的目录：

```py
python -m venv 虚拟环境目录
```

一旦创建虚拟环境，就会在虚拟环境目录的Scripts下面找到两个脚本文件：
- activate.ps1 激活该虚拟环境。
- deactivate.ps1 退出该虚拟环境

虚拟环境本质上是一个文件夹，包含了特定包及其版本。避免了多个项目第三方包版本的冲突。

执行如下命令，安装requirements.txt列出的包依赖：

```py
pip install -r requirements.txt
```

 


