
## 更换源

文件 /etc/pacman.d/mirrorlist 定义了软件包会从哪个镜像下载。在列表中越前的镜像在下载软件包时有越高的优先权。

两种方式：
- pacman-mirrors
- 手动编辑/etc/pacman.conf

列出可用的源：

```
sudo pacman-mirrors -i -c China -m rank
```


更新源列表：

```
sudo pacman-mirrors -g
```

先打开/etc/pacman.conf

```
sudo vim  /etc/pacman.conf
```

定位到最后添加：

```
[archlinuxcn]
SigLevel = Optional TrustAll
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
```


更新pacman数据库并全面更新系统：

```
sudo pacman -Syyu
```


```
pacman -S package_name        # 安装软件
pacman -S extra/package_name  # 安装不同仓库中的版本
pacman -Syyu                   # 升级整个系统，y 是更新数据库，yy 是强制更新，u 是升级软件
pacman -Ss string             # 在包数据库中查询软件
pacman -Si package_name       # 显示软件的详细信息
pacman -Sc                    # 清除软件缓存，即 /var/cache/pacman/pkg 目录下的文件
pacman -R package_name        # 删除单个软件
pacman -Rs package_name       # 删除指定软件及其没有被其他已安装软件使用的依赖关系
pacman -Qs string             # 查询已安装的软件包
pacman -Qi package_name       # 查询本地安装包的详细信息
pacman -Ql package_name       # 获取已安装软件所包含的文件的列表
pacman -U package.tar.zx      # 从本地文件安装
pactree package_name          # 显示软件的依赖树
```

-D, --database


-Q, --query查询包数据库。
此操作允许您查看已安装的软件包及其文件，以及有关单个软件包的元信息（依赖项、冲突、安装日期、构建日期、大小）。
这可以针对本地包数据库运行，也可以用于单个包文件。
在第一种情况下，如果命令行中没有提供软件包名称，则会查询所有已安装的软件包。
此外，可以在包列表上应用各种过滤器。

-R, --remove  从系统中删除包。
也可以指定要删除的组，在这种情况下，该组中的每个包都将被删除。
属于指定包的文件将被删除，并且数据库将被更新。
大多数配置文件将以 .pacsave 扩展名保存，除非使用 --nosave 选项。
请参阅下面的删除选项。


-S, --sync  同步包。
包直接从远程存储库安装，包括运行包所需的所有依赖项。

-U, --upgrade   将软件包升级或添加到系统并从同步存储库安装所需的依赖项。


-F, --files  查询文件数据库。
此操作允许您查找拥有某些文件的包或显示某些包拥有的文件。


-r, --root 路径 ：指定备用安装根目录（默认为 /）。
这不应用作将软件安装到 /usr/local 而不是 /usr 的方式。

-v, --verbose  输出路径，例如 Root、Conf File、DB Path、Cache Dirs 等


–noconfirm  绕过所有“你确定吗？”消息。
除非您想从脚本运行 pacman，否则这样做不是一个好主意。


-i, --info
显示有关给定包的信息。





## yay

- 搜索软件包： yay 包名或模糊名称
- 更新数据库： yay
- 删除软件包：yay -Rns 包名
- 清除不再需要的没有依赖的包： yuy -c（--clean）