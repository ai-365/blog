## 中文输入法
## 快速启动器
## 文档资源管理器

pacman/yay  apt  yum/dnf  fluthub

两种桌面环境：
- kde plasma：类似Windows
- gnome：类似MacOS
- xfce



manjaro可以自由选择桌面环境。地址：https://manjaro.org/download/

## virtualbox

去  https://www.virtualbox.org/  下载。

- 新建
- 设置内存大小，如果电脑内存为8G，则给2G
- 虚拟硬盘，vdi类型、固定大小、40G
- 设置-存储，，没有盘片，选择虚拟盘。

## U盘启动器

有了Ventoy你就无需反复地格式化U盘，你只需要把 ISO/WIM/IMG/VHD(x)/EFI 等类型的文件直接拷贝到U盘里面就可以启动了，无需其他操作。

你可以一次性拷贝很多个不同类型的镜像文件，Ventoy 会在启动时显示一个菜单来供你进行选择。

![https://www.ventoy.net/static/img/screen/screen_uefi.png](https://www.ventoy.net/static/img/screen/screen_uefi.png)

使用Ventory启动时，大部分时候需要关闭BIOS的“安全启动”选项。


## openbox安装Manjaro-kde

- 硬盘大小给80G，单文件虚拟硬盘
- 内存给2G
- 安装启动程序时选择中文、闭源驱动
- 启动程序中不分区
- 设置用户名密码电脑名称、为管理员设置相同的账户
- 





## 文档资源管理器

Dolphin 是 KDE 的文件管理器，您可以使用它来浏览硬盘、U 盘、SD 卡和其他存储设备中的内容，也可以方便快捷地创建、移动、删除文件和文件夹。

Dolphin 内建了许多有助于提高工作效率的功能。多标签页窗口、拆分视图等功能可以让您同时浏览多个文件夹，还可以在标签页和拆分的视图之间拖放、复制、移动文件。Dolphin 的右键菜单内建了许多快捷操作功能，例如压缩、分享、创建文件的副本等。您还可以将自定义操作添加到右键菜单。

Dolphin 还整合了命令行终端，可以在当前文件夹中执行命令行指令。您还可以通过插件来进一步增强 Dolphin 的功能，适应您的使用习惯。例如您可以使用 git 整合插件来与 git 源代码仓库进行交互。

## 需要解决的问题

- 中文输入法
- 
## 办公软件

- 浏览器：Firefox（自带）、Chrome、edge
- vscode
- 笔记：obsidian
- office：WPS、libreoffice
- 截屏
- PDF查看
- 图片查看
- 视频录制：OBS
- VPN：https://geph.io/zhs


## 安装包

- flatpak：使应用程序可以安装在任何一个发行版上，


## pacman


安装：pacman -S package_name

删除指定软件包，及其所有没有被其他已安装软件包使用的依赖关系：
pacman -Rs package_name

Pacman的配置文件位于/etc/pacman.conf。


yay是一个用Go语言写的一个AUR助手，有些时候官方仓库没有你想要的软件，就需要通过yay来安装，有了yay，以后就不用sudo pacman了


## 安装WPS

```
sudo pacman -Syu yaourt
yaourt -S wps-office
```

## 输入法


参考：https://zhuanlan.zhihu.com/p/114296129?from=androidqq&wd=&eqid=fc0dd00f0009c74800000002645ba393&utm_id=0


listary 替代
fences 替代
snipaste 替代
copyq 替代