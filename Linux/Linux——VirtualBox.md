
# VirtualBox

1. 下载Virtual Box最新版本，安装。如果报错内容是缺少VC++2019，则去[https://learn.microsoft.com/ZH-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170](https://learn.microsoft.com/ZH-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170)下载支持文件。

![VC++2019](https://pics5.baidu.com/feed/91529822720e0cf39f8620b98bd2ee14bf09aa9a.png@f_auto?token=af0b3c59d267ec1cf710db8a2579d98c)


2. 启动VirtualBox，新建

![](https://img-blog.csdnimg.cn/89a5eb1afb894bd48806e011767ec2ce.png)

![](https://img-blog.csdnimg.cn/ef67b02d6a8f462185c4e45fe2e6c8af.png)

内存大小、硬盘容量基本选择默认即可。

3. 新建好后，点击设置，修改启动顺序为：光驱第一、硬盘第二。因为我们是通过光驱来安装系统的，如果选错顺序将会导致后续的安装失败。

![](https://img-blog.csdnimg.cn/116ff2b533f946cb8c857b2b15c7c113.png)

4. 继续点击设置里面的存储，点击“没有盘片”，选择下载好的系统镜像。点击确定，启动虚拟机即可。
![](https://img-blog.csdnimg.cn/8431cd167ced46c98c46b002a860333b.png)
