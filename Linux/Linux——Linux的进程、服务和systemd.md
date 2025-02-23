
## 进程和服务的区别


进程是程序正在运行的实例，是运行着的程序，每个进程都占用系统资源，包括内存、I/O 等。每个进程必须有唯一的进程ID，且在操作系统的进程管理器中也有对应的进程控制块（PCB）实体。

服务是在操作系统上运行的一种保持长期存在的非交互性进程，它主要负责提供特定的系统或网络服务，以便满足来自客户端的请求或负责某个定时任务的执行，使操作系统保持运行。

可以简单的理解为，进程一般是是暂时的、一次性的、前台执行的、用户直接交互的；而服务一般是持续性的、后台执行的、非交互性的。

## 初始化系统的分类

Linux所提供的持续性服务由守护进程实现，Linux将管理每一个守护进程的方法作为一个服务，并且使用了某一种初始化系统，也叫init系统，主流的init系统分为两种：

- Sysinit  源于20世纪80年代创建的传统init系统，目前，大多数老版本UNIX和Linux采用此init系统。
- systemd  大多数Linux发行版的最新版本都采用了systemd作为 init系统，例如centos7.x及以后，Ubuntu15及以后。

所以，应该将重点放在systemd上。


## systemd基本知识

**单元、服务单元、目标单元**

systemd的主要任务是启动停止服务。Linux将管理的事项抽象成一个个单元（Units）。单元是一个由名称、类型和配置文件组成的组，专注于某一项服务。

在处理服务时，systemd分为服务单元和目标单元。

每个服务单元以.service结尾，每个目标单元以.target结尾。

列出所有的单元：

```
systemctl list-units 
```

列出所有的服务单元：

```
systemctl list-units | grep  .service
```

列出所有的目标单元：

```
systemctl list-units | grep  .starget
```

**单元的配置文件**

每个单元对应若干配置文件。Linux单元配置文件位于/lib/systemd/system和/etc/systemd/system中。

列出所有的服务单元配置文件：

```
systemctl list-units-files --type=service
```

列出所有的目标单元配置文件：

```
systemctl list-units-files --type=target
```

显示sshd服务的单元配置文件：

```
cat /lib/systemd/system/sshd.service
```

服务单元的配置文件主要包括：
- Description 描述
- Documention 手册页
- After 应该在哪些服务启动之后启动本服务
- EnvironmentFile 服务配置文件
- ExecStart 启动服务的命令
- ExecReload 重载服务的命令
- WantedBy 服务所属的目标单元

## 启停服务

启动服务：

```
systemctl start sshd.service
```


停止服务：

```
systemctl stop sshd.service
```

重启服务：

```
systemctl restart sshd.service
```

查看服务状态：

```
systemctl status sshd.service
```