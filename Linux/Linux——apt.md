## 更换镜像源

Ubuntu的/etc/source/sourcs.list 文件格式如下：

```sh
deb或deb-src  仓库地址 发行版代号-软件类别 自由软件 非自由软件 ......
```

我们说镜像加速，实际上就是修改仓库地址即可，其它结构是完全同步过来的。比如默认仓库地址是`http  ://archive.ubuntu.com/ubuntu/`，把这个换成 ` https://mirrors.aliyun.com/ubuntu/ `即可。

使用如下命令更换镜像源：

```sh
sudo sed  -i  's@http://archive.ubuntu.com/ubuntu/@https://mirrors.aliyun.com/ubuntu/@g'   /etc/apt/sources.list
```

注意，上述命令-i 选项会直接修改原文件，推荐先不加这个选项查看输出结果，确认没问题后再修改原文件。

然后：

```sh
cat /etc/apt/sources.list  # 检查文件内容
sudo apt  update    # 更新软件列表
sudo  apt  upgrade  # 更新软件
```

## apt的使用

apt是Ubuntu系统默认的软件包管理器，apt的主要操作如下表

- 搜索软件包 ： apt search 名称
- 更新软件仓库清单  apt update
- 升级本地的所有软件包  apt upgrade
- 安装软件 ： apt install 名称1 名称2... 

如果需要严格限定软件的名称，避免搜索结果过多。可以使用了`^`和`$`正则符号，分别表示匹配单词首部和尾部。

## apt和apt-get的区别

Advanced Package Tool，又名apt-get，是一款适用于Unix和Linux系统的应用程序管理器。apt-get最初于1998年发布。

apt 命令行实用程序于2014年推出第一个稳定版本，用于 Debian 发行版 .deb 软件包安装。它最初在不稳定的Debian版本中使用，然后在Debian 8中成为标准。

在 Ubuntu 16.04 发行后，apt 开始流行，并以某种方式取代了 apt-get 。

所以，目前推荐使用atp，弃用apt-get。