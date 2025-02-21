
# npm

npm是Node.js官方的包管理器工具，默认随着node一起安装，无需单独安装。可以运行npm -v确认是否已安装。

在确认npm安装后，一般需要更换镜像源以加速下载，运行如下命令更换为阿里云的npm镜像源：

```sh
npm config set registry https://registry.npmmirror.com/ 
```

运行如下命令，如果输出新的镜像地址则表示镜像源更换成功：

```sh
npm config get registry
```

通常，在项目根目录下，有一个package.json文件，文件中有scripts项，使用如下命令运行脚本：

```sh
npm run 脚本名称
```

在scripts之下，可以添加一个条目，条目的属性名为脚本名称，属性值为要运行的命令，例如：

```sh
"hello":"echo hello"
```

此时，运行 npm run hello，命令行会执行echo hello。

有些比较大的npm包会自带二进制命令，如果是本地安装的（本地安装的意思是将文件下载到当前目录下），二进制命令会被放在./node_modules/.bin目录下，无需将该目录下的命令添加到系统PATH环境变量，直接使用如下命令运行二进制程序：

```sh
npx 二进制命令名称
```

上述命令只能在二进制命令所在的项目目录内运行。如果是经常需要使用的命令，那么推荐全局安装，此时在任意目录内都可以运行。

