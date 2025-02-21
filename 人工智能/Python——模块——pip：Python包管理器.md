
pip是Python官方的包管理器，默认随着Python程序一起安装。

要检查pip是否已经安装，在终端中运行：

```
pip
```

如果已经安装，则会输出pip的帮助信息。

## 安装包

要安装包，运行如下命令：

```
pip install package
```

pip默认会将包安装到如下位置：

```
Python安装目录\Lib\site-packages
```

## 显示已安装的包列表

要显示已经安装的包列表，运行如下命令：

```
pip list
```

## 卸载包

要卸载某个包，运行如下命令：

```
pip uninstall package -y
```

加上 -y 或 --yes 选项表示确认卸载，如果不加，则需要在终端中手动确认。

## 切换下载源

可以将包的下载源地址切换到国内源，例如阿里云的源，以提升下载速度。有两种方式：命令替换和手动替换。

第一种方式，命令替换，推荐使用。运行如下命令，切换成阿里云的源：

```
pip config set global.index-url  https://mirrors.aliyun.com/pypi/simple
```

第二种方式，手动替换。在用户主目录下，例如Windows中的`C:\Users\username\`下，创建文件`pip.ini`，并添加如下内容：

```
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/

[install]
trusted-host=mirrors.aliyun.com
```

这样，pip会默认使用这个源。

