
# Docker


##  镜像和容器的概念区别

一个镜像只是一个压缩文件，这是一种模板，可以使用镜像实例化多个容器。一个容器表示具体的一个实例，有自己的生命周期，包括启动、停止、删除。

镜像好比操作系统安装文件，容器好比通过此文件安装到机器上并运行起来的操作系统。

##  docker主要命令汇总

-  docker create imageName：从镜像创建一个容器
-  docker start imageName ：从镜像启动一个容器，或重启一个运行的容器
-  docker run imageName ： 从镜像启动一个容器
-  docker pause container ：挂起，也叫暂停
-  docker stop containerName：停止容器
-  docker kill containerName：停止容器
-  docker restart containerName ：重启
-  docker rm containerName：删除
-  docker ps : 查看容器信息
-  docker image ls ：查看本地镜像列表

##  docker run命令

docker run 用来启动一个容器，优先从本地寻找镜像，如果本地找不到，则从远程仓库拉取。

- ` -d `  后台启动，并返回容器ID。
- ` -i `： 交互模式运行容器
- ` -P ` ： 随机端口映射，容器内部端口映射到主机是随机端口
- ` -p ` ： 指定端口映射，格式为 ` -p 主机端口:容器端口 `，如果端口一样，可以只写一个
- ` -t `：  为容器重新分配一个伪输入终端，通常与-i搭配：-it
- ` --name ` ： 指定容器名称
- ` -v ` 指定一个目录映射到本地某个文件夹

##  docker build命令

根据Dockerfile配置文件，创建一个镜像。

默认配置文件为项目目录下的Dockerfile文件。

```
docker build -t 镜像名称:tag  .
```

最后的点号(.)表示将本目录下的所有文件打包成一个镜像，一定不能忽略。

##  目录映射

使用 ` -v ` 选项，可以将容器内的目录映射到本地主机，这样，两个目录下的内容始终是同步的。语法如下：

```
docker run -it -v 宿主机目录:容器目录
```
