
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

##  编写Dockerfile文件

Dockerfile是构建镜像的配置文件，Docker依据Dockerfile文件逐行执行其中的命令，从而构建我们所需的镜像。

###  FROM ： 获取基础镜像

FROM的作用是获取基础镜像，必须写且必须写在第一行。

FROM的格式为：

```
FROM image:tag
```

image是镜像名称，tag是版本标签，一般为数字或latest，如果不写默认为最新版。

###  COPY：复制本地文件到镜像

COPY 的作用是将本地文件复制到镜像内的虚拟目录。COPY的语法格式为：

```
COPY src1 src2 ...  dest
```

src可以是文件或目录。dest是镜像的目标目录。不过，尽量不要将src写成文件夹，因为会复制整个目录的内容,包括文件系统元数据。

文件名支持使用通配符。

COPY命令的示例如下：

```
COPY  *.html  *.js  *.css  /opt
```

复制文件还有一个命令是ADD。ADD和COPY都是复制，但由于COPY命令更透明，一般优先使用COPY。

###  RUN：执行命令
 
RUN的作用是在构建时执行一条或多条命令，例如通过yum或apt下载软件包。

需要特别指出的是，Dockerfile的每一行命令被执行后都会新增一层镜像。因此，最佳的做法是将RUN执行的多条命令合并在一行写，用&&连接，这样有助于减小最终镜像的体积。

RUN命令示例如下：

```
RUN echo 1 && echo 2
```

###  WORKDIR ：设置初始目录

WORKDIR的作用是设置容器启动后的初始目录，类似于cd。此后的命令都将以此为工作目录。

###  ENV：设置环境变量

ENV的作用是设置环境变量，可以一次设置一个：

```
ENV key1=value1 key2=value2
```

###  CMD ：容器启动后的初识命令

从镜像开启容器实例后运行的初始命令，初始命令只能有一个。

CMD命令包括各选项参数用引号包裹，各个部分逗号隔开。例如：

```
CMD echo "hello"
```

