
## Linux简介

Linux 内核最初只是由芬兰人林纳斯·托瓦兹（Linus Torvalds）在赫尔辛基大学上学时出于个人爱好而编写的。

Linux 的发行版说简单点就是将 Linux 内核与应用软件做一个打包。

目前市面上较知名的发行版有：Ubuntu、RedHat、CentOS、Debian、Fedora、SuSE、OpenSUSE、Arch Linux、SolusOS 等。

## Shell简介


在没有图形界面的时代，Shell是用户与操作系统交互的唯一方式。

用户输入命令，shell将命令传递给操作系统，操作系统执行后返回给shell，显示在终端上，这就是shell执行的一般流程。


终端是一个图形界面软件，shell才是“真正的灵魂”。所以，bash是shell，而不是终端，当你安装了bash之后，你可以在任意终端使用bash。

比如Windows terminal 是Win11自带的终端软件，它里面可以调用的shell包括：powershell、bash（如果已安装）、cmd等。

Windows10上安装的powershell既可以认为是终端，也可以认为是shell，只是因为它们取了相同的名字。不过我们可以在vscode的集成终端环境中使用powershell，此时PowerShell就是shell。

最流行的shell是bourne shell，简称bash，它预装在许多流行的Linux发行版上。当然，还有更现代的zsh、颇受用户喜爱的fish等Shell。

这里更推荐学习Bash，因为一通百通，学会了bash，其它的shell就很容易了。后面的教程都默认使用Bash。

## GNU将UNIX转为免费

1984年，Richard M. Stallman启动了GNU项目（http://www.gnu.org），正好于短语GNU is Not UNIX的缩写一致。

为了清晰定义应该如何处理开源软件，GNU项目创建了GNU Pub Lincense，简称GPL。其基本功能为：
- 作者权利。原始作者保留其软件的所有权
- 免费分发。人们可以在自己的软件中使用GNU软件，修改以及重新分发软件，但是分发时必须包括源代码。
- 版权维护。即使对软件重新封装和销售，也必须维护原始的GNU协议。


## Linux发行版

Linux发行版由用来创建正常工作的Linux系统所需的组件以及用来安装并运行这些组件的程序所组成。Linux发行版通常包括：
- Linux内核
- 基本命令，如ls、cat
- 相关的硬件驱动，如声卡，显卡。
- 相关服务，如远程登录和web服务器
- 有时候还需要一个桌面管理器和一些图形应用程序

一些知名的发行版包括：
- Red Hat Enterprise Linux。简称REHL，为企业和用户提供付费支持。红帽公司还积极部署云计算领域，推出了以kubernetes为基础的openshift容器编排方案，以及收购ansible自动化运维方案。
- federa。rhel是商业化的Linux发行版本，federa却是由红帽公司发起的免费且先进的Linux版本，fedora全面兼容rhel程序。fedora相当于rhel的试验场，红帽公司在rehl上发行新的应用之前，都会在fedora上测试。
- debian。 debian是一个擅长包装和管理软件的早期Linux发行版，使用了deb包装格式和工具来管理软件包，debian因为稳定性和庞大的软件生态而名声在外。
- Ubuntu。Ubuntu是基于debkan开发的另一个广受欢迎的Linux发行版。Ubuntu增加了简单的图形化应用程序和工具。此外，Ubuntu还重点关注功能完备的桌面Linux操作系统。
- archLinux：archLinux是近几年来广受Linux社区爱好者欢迎的Linux发行版，其最大的特点是用户可以根据需要完全定制操作系统的的各种组件，包括桌面管理器等。
- Manjaro ：不过安装arch Linux也需要一定的难度，Manjaro是基于arch Linux开发的Linux发行版，提供更简单的安装方式，并兼容arch Linux软件生态。

## 红帽认证

红帽认证是Linux领域最知名的认证考试，分为rhcsa（红帽认证系统管理员）和RHCE（红帽认证工程师）。如果对Linux有更好的技能要求，还有RHCA（红帽认证架构师）。

以RHEL8为例，RHCSA主要考察：
- 了解基本工具：如shell、基本指令等
- 操作运行系统：Linux启动过程、关闭和重启、进程管理、密码管理。
- 配置本地存储：创建物理卷、逻辑卷（LVM）管理。
- 配置文件系统：挂载不同类型的文件系统，如ext4，已经网络文件系统
- 管理用户和组：新增、删除用户，修改用户密码
- 安全性：防火墙，selinux、ssh等。

rhel考察包括：
- 网络服务配置。如数据库，web、dns、nfs、网络时间服务器等。
- ansible自动化运维