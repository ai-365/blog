
WSL允许你在Powershell中使用Linux命令，也允许你在Windows上运行Linux系统环境。

## 安装


要使用WSL，首先要在设置的“启用或关闭 Windows 功能”中，勾选“适用于Windows的Linux子系统”，然后重启。

在Powershell中，输入以下命令查看可用的发行版列表:
```
wsl --list --online
```

这里选择安装Ubuntu-22.04：

```
wsl --install -d Ubuntu-22.04
```

不过，最方便的方式是直接去 Microsoft Store 搜索下载即可。
	
先输入wsl ，然后直接开始写Linux命令即可。也可以输入wsl回车进入子系统环境。