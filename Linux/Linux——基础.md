<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;top:60vh;font-size:1.5rem ">🔼</a>

- [Linux简介](#linux简介)
- [Shell简介](#shell简介)
- [在Windows上获取bash](#在windows上获取bash)
- [终端提示符](#终端提示符)
- [Bash常用快捷键](#bash常用快捷键)
- [Tab补全](#tab补全)
- [环境变量](#环境变量)
  - [Bash的内置环境变量](#bash的内置环境变量)
  - [修改PATH环境变量](#修改path环境变量)
  - [新增和修改自定义环境变量](#新增和修改自定义环境变量)
  - [普通变量和环境变量的区别](#普通变量和环境变量的区别)


## Linux简介

Linux 内核最初只是由芬兰人林纳斯·托瓦兹（Linus Torvalds）在赫尔辛基大学上学时出于个人爱好而编写的。

Linux 的发行版说简单点就是将 Linux 内核与应用软件做一个打包。

目前市面上较知名的发行版有：Ubuntu、RedHat、CentOS、Debian、Fedora、SuSE、OpenSUSE、Arch Linux、SolusOS 等。


##  Shell简介

在没有图形界面的时代，Shell是用户与操作系统交互的唯一方式。

用户输入命令，shell将命令传递给操作系统，操作系统执行后返回给shell，显示在终端上，这就是shell执行的一般流程。

终端只是一个图形界面，shell才是“真正的灵魂”。

所以，bash是shell，而不是终端，当你安装了bash之后，你可以在任意终端使用bash。

比如Windows terminal 是Win11自带的终端软件，它里面可以调用的shell包括：powershell、bash（如果已安装）、cmd等。

Windows10上安装的powershell既可以认为是终端，也可以认为是shell，只是因为它们取了相同的名字。不过我们可以在vscode的集成终端环境中使用powershell，此时PowerShell就是shell。

最流行的shell是bourne shell，简称bash，它预装在许多流行的Linux发行版上。当然，还有更现代的zsh、颇受用户喜爱的fish等Shell。

这里更推荐学习Bash，因为一通百通，学会了bash，其它的shell就很容易了。后面的教程都默认使用Bash。

