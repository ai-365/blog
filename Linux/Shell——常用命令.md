
#  常用命令

## which命令

which命令用于查找命令的路径，例如：

```sh
which ls
/usr/bin/ls
```

## type命令

type命令用于检查命令是否是shell自带命令，也就是说安装了这个shell就可以执行这个命令。与之相对的，外部命令是指系统安装的，与Shell无关的命令，一般情况下，一般用户执行的命令存放于/usr/bin/里面的，管理员命令存放于/usr/sbin里面。

如果输出一个路径则表示是系统命令，如下示例检测是Shell自带还是系统命令：

```sh
type cd
# cd is shell builtin  # cd是shell自带

type awk
# awk is /usr/bin/awk  # 系统命令
```
## 输出到终端——echo命令

echo是非常常见的命令，它的作用是输出内容到终端，例如：

```sh
echo  hello  bash 
# hello bash
```

echo会解析所有的命令行参数，而且会忽略空白符：
```sh
$a="bash"
$echo   hello        $data
# hello bash  
```

要想保留空白字符，需要将其放入单引号或双引号中：

```sh
echo   '   hello     bash   '  
echo  "   hello     bash   "
```

单引号和双引号的区别是对变量的解析与否，双引号会读取以$开头的单词并尝试解析变量值，再插入到字符串中，这种方式叫做“内插”。而单引号则不理会进行变量解析。

如果不需要解析变量，则使用单引号即可：

```sh
echo  'hello $bash'
hello $bash
```

## 写内容到文件的快速方式

echo命令经常用来快速将少量文本内容写入到文本文件，使用重定向符号`>`或`>>`将内容保存到文件而不输出到终端。这两个符号分别可以覆盖内容和追加内容到文件。例如：

```sh
echo hello bash  >    1.md
echo hello bash  >>  1.md
```

## read命令

Linux read命令用于从标准输入读取值。

read命令选项如下：

|选项	|	说明|
|---	|	--- |                
-p 	|	后面跟提示信息，即在输入前打印提示信息。
-n 	|	后跟一个数字，定义输入文本的长度，很实用。
-a	|	 后跟一个变量，该变量会被认为是个数组，然后给其赋值，默认是以空格为分割符。
-s 	|	安静模式，在输入字符时不再屏幕上显示，例如login时输入密码。


-p 参数很常用，允许在 read 命令行中直接指定一个提示信息。例如：

```sh
read -p "your name:"  name
echo "welcome，$name"
```

上面的示例运行后，在终端会看到提示字符“your name：”，此时直接输入后按回车，即可将输入的值赋予给变量name。

##  将输入存入数组

如果需要用户依次输入多个单词，彼此以空格隔开，那么可以使用-a将输入存入数组。

```sh
read  -p "arr: " -a arr
echo "arr的长度: ${#arr[*]}"
```

## 查看系统与内核相关信息

要查看系统与内核相关信息，使用uname命令。-a选项表示输出所有信息。-r选项输出内核版本。

## 远程连接：ssh命令

ssh命令用于登录远程主机

要登录远程主机，使用如下命令：

```sh
ssh  user@ip
```

此时会提示你输入密码。

输入`exit`退出登录。

在文件 ~/.ssh/known_hosts 中可查询该服务器公钥。

##  网络请求：curl命令

curl命令的作用是执行网络请求，取回响应结果，主要是http请求。

cURL是一个利用URL语法在命令行下工作的文件传输工具，1997年首次发行。它支持文件上传和下载，所以是综合传输工具，但按传统，习惯称cURL为下载工具。

cURL支持的通信协议有FTP、FTPS、HTTP、HTTPS、TFTP、SFTP、Gopher、SCP、Telnet、DICT、FILE、LDAP、LDAPS、IMAP、POP3、SMTP和RTSP。

curl还支持SSL认证、HTTP POST、HTTP PUT、FTP上传, 

例如如下一行命令访问百度，可用于检测是否联网：

```sh
curl https://www.baidu.com
```

这会输出百度首页的HTML代码。

如下命令将返回的内容保存到本地：

```sh
curl URL >> 1.html
curl  https://www.baidu.com   -o  2.html
curl   https://www.baidu.com  -O 
```

-o选项在本地重命名，-O选项使用服务器上的名称。

如下示例保存图片：

```sh
curl  图片链接  -o image.png  
```

如下示例保存cookie：

```sh
curl -c cookie.txt  http://www.linux.com
```

如下示例发送cookie：

```sh
curl  -b 'a=1'  -b  'b=2'  https://www.baidu.com
```

如下示例保存header：

```sh
curl -D header.txt http://www.baidu.com
```

如下示例模拟Chrome访问：

```sh
$ curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com
```


## find

```
find  要查找的目录  查找选项
```


查找选项包括：
- -name  根据文件名，支持通配符
- -type 根据类型，fS文件、d目录
- -size 根据大小
- -user  根据所有者
- -mmin -10 过去10分钟修改的文件

还可以对找到的文件执行命令，语法：

```sh
find 要查找的目录  查找选项 -exec 命令 {} \;
```

- 花括号表示查找出来的文件名
- 在命令末尾，需要家反斜杠和分号

例如：

```sh
find $HOME -name *.txt -exec echo "已经找到{}"  \;
```

## locate

与find从文件系统查找文件不同，locate命令从一个包含系统文件名的数据库中查找，因此查找效果更快。

如果运行完update后又新建了文件，那么locate是查找不到的，此时必须再次运行update命令。

更新数据库：

```sh
updatedb
```

查找文件：

```sh
locate.bashrc
/etc/skel/.bashrc
/home/student/.bashrc
```


## 进程管理

进程管理命令汇总：
-  ps aux ： 查看系统所有进程
-  kill  -9  进程ID： 终止进程
-  命令  &  ： 后台执行
-  jobs：  查看后台
-  fg  编号：  将任务拿到前台
-  bg  编号： 使后台任务由Stopped变为Running

使用`ps aux`查看系统所有进程。不过这会输出很多内容，通常使用`grep`管道过滤需要查看的进程。

要终止进程，运行 `kill -9  进程ID  `。

在命令行后面加上`&`，可以将命令放到后台执行。此时会输出   `[任务编号]   进程编号`。

如果已经在执行某个操作，例如vim正在编辑文件，或者find正在查找文件，此时使用`Ctrl-Z`可以暂时将其放到后台。不过，使用`Ctrl-Z`会使任务变为暂停Stopped状态。

使用`jobs`查看后台。会在输出到任务编号后面看到`+`、`-`。这表示最近放到后台和最近第二个放到后台的任务。

使用`fg   任务编号` 将某个任务拿到前台。如果使用`fg`会将最近放到后台的任务拿到前台，就是任务列表中带加号的那个任务。

要使后台的某个任务由Stopped变为Running，使用`bg 任务编号`命令。


##  更改apt镜像源

Ubuntu的/etc/source/sourcs.list 文件格式如下：

```
deb或deb-src  仓库地址 发行版代号-软件类别 自由软件 非自由软件 ......
```

我们说镜像加速，实际上就是修改仓库地址即可，其它结构是完全同步过来的。比如默认仓库地址是`http://archive.ubuntu.com/ubuntu/ `，把这个换成 `https://mirrors.aliyun.com/ubuntu/ `即可。

使用如下命令更换镜像源：

```
sudo  sed  -i  s*http://archive.ubuntu.com/ubuntu/*https://mirrors.aliyun.com/ubuntu/*g  /etc/apt/sources.list
```

然后，运行如下命令：

```
cat /etc/apt/sources.list  # 检查文件内容
sudo apt  update    # 更新软件列表
sudo  apt  upgrade  # 更新软件
```

## 使用apt管理软件包

apt是Ubuntu系统默认的软件包管理器，其主要操作如下表：

-  apt search ^python$ ：  搜索软件包
-  apt update： 更新包列表
-  apt install python ： 安装包

这里在搜索软件包时，使用了 ` ^ ` 和 ` $ ` 正则符号，分别表示匹配单词首部和尾部，目的是严格限定软件的名称，避免搜索结果过多。
