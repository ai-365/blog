
# Jupyter


Jupyter广泛用于Python学习、数据科学、机器学习领域，结合了可运行的代码和Markdown文本，可以更直观的展现Python工作流。

##  Juypter Notebook和Jupyter Lab的区别

Jupyter Lab是Jupyter Notebook的升级版，Jupyter Lab可以同时打开多个ipynb文件。

许多提供AI开发服务的云服务厂商提供了云端开箱即用的Jupyter Lab环境。因此推荐使用Jupyter Lab。

##  Jupyter Lab

如果要在本地使用Jupyter Lab，先使用pip 安装：

```sh
pip install jupyter-lab
```

进入到包含ipynb的目录，运行

```sh
jupyter-lab
```

启动jupyter。

##  Jupyter的快捷键


操作	|	快捷键
---	|	---
运行本单元	|	Ctrl + Enter 
单元转入Markdown状态	|	M
单元转入代码状态	|	Y
退出编辑	|	Esc
选中单元格，Enter	|	编辑
选中上/下一单元	|	↑/↓
撤销	|	Ctr+Z 
删除该行	|	Ctrl+D
设置1~6级标题	|	1~6
在上方/下方插入新单元	|	A/B
删除选中的单元	|	D
清除输出	|	Ctrl+E


## 在Notebook中执行系统命令

!开头以模拟系统命令。例如使用pip安装Python包：

```py
!pip install package
```

