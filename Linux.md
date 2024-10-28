



# 命令行语法规则

## 管道

管道可以说是命令行的灵魂，如同管道的名字一样，管道使得命令行的操作如行云流水一般。

一个实用的例子是求出本目录下文件的数量：

```sh
ls -l    |   nl   |  tail  -1    
```

这里暂且先不考虑链接文件的情况， 本例子先使用`ls -l`将每个文件一行的形式输出，然后使用`nl`为每一行打上行号，然后使用`tail`倒序查看最后一行，这样便得出了本目录下文件的数量。


##  重定向

### 覆写

使用` > ` 符号将左边本来应该输出到终端的内容重定向到文件，例如：

```
ls > file.txt
```


### 追加

不过这会覆盖file.txt本来的内容，有些时候我们只是想追加输出，则可以使用` >> ` 符号：

```
ls >> file.txt
```

###  将输出和错误分别重定向

如果要将输出和错误定向到不同文件，使用 ` > ` 和 ` 2> ` 符号。 

例如，当前目录中，exist.txt存在，noexist.txt不存在，运行如下命令：

```
cat exist.txt noexist.txt > sure.txt 2> error.txt
```

这把 exist.txt 的文件拷贝到sure.txt。而由于noexist.md不存在，所以读取出错，会把错误信息“no such file...”等信息输出到error.txt。

###  将输出和错误集中输出

如下命令将输出和错误发送到同一文件：

```
cat exist.txt noexist.txt  >& out.txt 
```

###  丢弃输出

如果要丢弃输出，使用 ` >  /dev/null  2>&1 ` ，例如：

```
cat file.txt  >  /dev/null  2>&1
```

###  多个命令组重定向

可以使用多个命令组合重定向，例如：

```
pwd; ls; date > file.txt
```

pwd和ls依然会输出到屏幕，只会把date的结果保存到1.md

可以使用括号，先在子shell中执行，然后重定向：

```
(pwd ; ls ; date ) > file.txt
```

##  子命令（命令替换）
shell命令行或脚本最有用的特性之一是可以从命令输出中提取信息并将其赋值给变量，称为子命令，也可以叫做命令替换。

有两种等价的方式使用子命令：
- 使用反引号包裹
- 美元符加圆括号： ` $(子命令) `

例如：

```
today1=`date`
echo $today1

today2=$(date)
echo $today2
```

命令替换会创建出子 shell来运行指定命令，这是由运行脚本的 shell所生成的一个独立的shell。因此，在子 shell 中运行的命令无法使用脚本中的变量。如果在命令行中使用./路径执行命令，就会创建子 shell，但如果不加路径，则不会创建子 shell。不过，内建的 shell 命令也不会创建子 shell。在命令行中运行脚本时要当心。

##  命令行的Tab补全

使用命令行最多的按键或许就是Tab键了，所以单独使用一小节讲解。Tab键会根据你已经输入的少数几个字符自动猜测这个单词剩下的内容并进行补全。

可以通过bash shell补全的单词有：
- 命令、别名或函数
- 变量，如果以美元符`$`开头，则会寻找当前环境下的变量名
- 用户名，如果以~开头，则shell尝试使用用户名补齐
- 主机名，如果以@开头，则会寻找主机名补全


常见的情况有以下几种。

-  命令补全：例如先输入ec两个字符，按Tab键，Bash会补全成echo。不过Linux命令一般都比较简短，一般都是直接写完整的命令。

-  文件名称补全：这是最实用的功能，一般来说文件名都比较长，如果每次都要输入完整的文件名不仅费时而且极容易出错。此时，只需要输入文件名的前一个或少数几个字符，再按下Tab键就可以自动补全文件名，如果匹配的文件名超过1个，那么终端就会输出匹配的文件名供我们再次输入以缩小范围。

## 通配符

- `*` 匹配任意数量的字符
- `?`  字符占位，表示有且只有一个字符
- `[]`，匹配其中的任何一个单字符
- `{str1,str2}`，匹配以逗号分隔，匹配其中的任何一个单词

通配符在命令行中用的非常多。

例如，输出以.txt的文件名：

```
ls  *.txt
```

使用连字符指定范围，例如：

```
$ list file[1-3].txt
file1.txt file2.txt file3.txt
```

使用单个字符组成的逻辑或分组，例如如下命令表示匹配以file开头，紧接着以A或B或C结尾的文本文件：

```
ls file[ABC].txt
fileA.txt fileB.txt fileC.txt
```

有时候需要用到字符串组成的逻辑或分组，这时候就用到了花括号。例如如下命令表示筛选以txt或md结尾的文件：

```
ls *.{txt,md}
```



## 命令的返回值

既然两个命令有依赖性，而这个依赖性的判断地方就在于前一个命令执行的结果。在shell中，如果前一个命令成功执行或逻辑为真，则内置变量环境变量`$?`的值会设为0。如果执行有错误或逻辑为假，则`$?≠0`。例如：

```
$  pwd # 成功执行
$  echo $?  # 输出0

$  ls 不存在的文件  # 执行错误
$  echo $?   # 输出2 不同的错误有不同的返回值

$  [ 2 -eq 1 ]  # 不会输出内容，但是这个表达式逻辑值为假
$  echo $?  #  输出1 

$  [ 2 -gt 1 ]  # 不会输出内容，但是这个表达式逻辑值为真
$  echo $?  # 输出0

```

##  单行多命令

有些情况下，可以在一行中同时执行多个逻辑相关的命令，以提高效率。有三种情况；
- 命令1 && 命令2 ： 如果命令1成功执行或逻辑为真`（$?=0）`，则执行命令2。如果命令1执行发生错误或者逻辑为假`（$?≠0）`，则命令2不执行。
- 命令1 || 命令2 ： 如果命令1执行发生错误或者逻辑为假`（$?≠0）`，则命令2执行。如果命令1成功执行或者逻辑为真`（$?=0）`，则命令2不执行。
- 命令1 ; 命令2 ： 两个命令没有相关性，按顺序执行。其中一个命令的成功与否与逻辑真假都不影响其它的命令的执行。

需要说明的是，这三种情况可以随意的组合搭配出自己的逻辑链条，例如比较使用的三元条件表达式：

```
expression  && 条件为真时执行 || 条件为假时执行
```

具体的示例如下，这个例子的意思是：如果file.txt存在，就查看其内容；如果不存在，就先新建。

```
ls file.txt  && cat file.txt || touch file.txt 
```

再比如：如果目录不存在就新建目录，如果存在就读取文件列表：

```
ls dir && ls dir || mkdir dir
```



##  Shell子进程和脚本的执行方式

- 相对路径执行：例如./test，新开一个子进程执行。
- source命令执行：直接在当前进程中执行，不开子进程。
- bash或sh命令执行：与相对路径执行的方式等价，新开一个子进程执行

由于bash命令会新开子进程，所以在设置环境变量时，无法真正的生效，当这个子进程退出时，相当于没有设置环境变量，所以如果要设置环境变量，只能是 `source $HOME/.bashrc`，而不能是 `bash $HOME/.bashrc`。


# 文件权限

## 修改文件/目录所有者/所属组

```sh
chown  [-R]  所有者:所属组  文件或目录
```

说明：-R表示递归修改

## 数字方法修改权限

chmod  [-R]  xyz  文件或目录

说明：xyz表示所有者、所属组、其他人对应的权限数字，是r、w、x对应的数字累加的结果，各具体操作权限的数字对照表是r:4、w:2、x:1，如果没有某种操作权，该数字为0。

## 符号方法修改权限

用等于的方式：  chmod   u=rwx,g=rx  文件或目录
用增减的方式：  chmod   g+w 文件或目录

说明：有四种符号表示身份，分别是u（所有者）、g（所属组）、o（其他人）、a（所有人）

## 文件与目录的权限区别

某种身份对文件有 r 权限，表示可以读取文件内容；对目录有r权限，表示可以列出（例如使用ls）目录下的文件列表和相关属性。

某种身份对文件有 w 权限，表示可以向该文件写入内容；对目录有w权限，表示可以向该目录增加、删除文件。

某种身份对文件有 x 权限，表示可以执行该文件（二进制方式、脚本方式）；对目录有x权限，表示可以以此目录为工作目录（例如cd到该目录）。




# 系统管理常见命令
##   文件系统管理命令汇总

如下表格是常见的文件系统管理命令，涵盖目录的操作、文件内容的操作，会使用这些命令，那么基本就能使用命令行熟练操作文件系统了。

|命令	|	作用|
|---	|	---|
cd	|	设置工作目录
pwd	|	显示当前工作目录
ls	|	列出目录下的文件列表
mkdir	|	建立一个空目录
rmdir	|	删除一个空目录
rm	|	删除文件
touch	|	新建文件
rename	|	文件重命名
cp	|	复制文件或目录
mv	|	移动文件或目录
cat	|	读取文件内容
tac	|	从最后一行往前读取文件内容
head	|	取出文件内容的前几行
tail	|	取出文件内容的后几行
nc	|	显示行号
wc	|	统计字数、行数
sed	|	查询、替换、增减文件内容
awk	|	以列为单位编辑结构化数据文件
grep	|	查询文件内容


##  Linux目录树的组织原则

Linux目录的组织是有一定的规律的，虽然不是强制的，但是用户在使用时也应该尽量遵循这种约定：
- /bin 常见的Linux用户命令，如ls、date、chmod
- /boot 包含Linux内核、启动配置文件（GRUB）
- /dev  包含设备访问的文件位置。包括终端设备tty、硬盘、鼠标、键盘等
- /etc  管理配置文件
- /home 用户的家目录，root是个例外，以/root为家目录
- /media 自动挂载的设备的位置，例如一个名为myusb的USB设备被挂载到/media/myusb
- /lib /bin和/sbin所需要的共享库
- /mnt  许多常见设备的挂载点，例如硬盘分区、远程文件系统
- /opt  附近应用程序软件
- /sbin  root用户使用的管理命令
- /sys 包含管理某些内核行为的控制文件
- /usr  UNIX resource 系统资源的简称，注意，不是user。
- /var 不同应用程序的数据目录，例如/var/ftp、/var/www。
- ~ 每个用户是家目录，存放用户自己的文件，自定义是配置文件等


## ls命令

ls是用的最多的命令，其作用是列出目录下的文件列表，或者列出某个文件信息。

ls的选项如下：

选项	|	作用
|---|---|
-a   	|	显示使用文件包括隐藏文件，以及.和..
-A  	|	类似-a，但不显示.和..
-l 	|	使用长列表格式，每行显示一个文件的详细信息
-t | 按照修改时间排序
-d | 只列出目录本身，而不是目录下的文件
-r 	|	逆序排列
-R 	|	递归显示子目录
-1 	|	每行只显示一个文件名
-S 	|	按照文件大小排序

##  切换当前目录：cd命令

cd命令的作用是切换当前目录。

有一些特定目录的简写，包括：
- `~`或者不写任何内容：回到当前用户的家目录，即$HOME。
- `.`   ：一个点，当前目录
-` .. ` 两个点，当前目录的上一级目录
- `$PWD`  ：当前目录
- `$OLDPWD`：  当前目录之前的目录




## 复制文件

复制一个文件到目标目录下：
```
cp  1.txt   dir 
```

复制的同时重命名：

```
cp 1.txt dir/2.txt
```

复制多个文件到目标目录下，这种情况就不能重命名了：

```
cp 1.txt 2.txt dir
```


## 复制目录

```
cp -r  dir1 dir2
```

此时，dir1会放到dir2下，形成dir2/dir1路径。

-r表示递归，在复制目录时，必须带上-r。

##  mv命令

mv命令的作用是移动文件，其主要选项如下：

选项	|	说明
|---	|	---|
-f	|	即force，如果目标文件已存在，则不会询问直接覆盖
-i	|	如果目标文件已存在，会询问
-u	|	如果目标文件已经存在，只有源文件较新才会覆盖

## rm命令

rm命令的作用是删除文件或目录，其主要选项如下：

选项	|	说明
|---	|	---|
-f	|	即force，忽略不存在的文件，不会出现警告信息
-I	|	交互模式，在删除前会询问是否确认删除
-r	|	递归删除，常用于目录的删除，*这个选项非常危险*。

例如：

```
rm -r dir # 删除dir目录本身及其子项
rm -r dir/*  # 删除dir目录下的东西，此时dir是个空目录
```

##  获取文件名和目录名：basename和dirname命令

有时候需要根据路径获取文件名和目录名，可以使用basename命令和dirname命令，这两个命令分别用于获取文件名和目录名，例如：


```
basename  /usr/bin/sed  # 取得路径的最后一个名称
输出：sed
dirname /usr/bin/sed  # 去掉路径最后一个名称
输出：/usr/bin
```

## 查看文件内容

查看文件内容的方式有很多，可以根据具体的情况选择，查看文件内容的命令汇总如下：

|命令	|	作用|
|---	|	---|
cat	|	最常用，正常显示文件内容
tac	|	从最后一行开始显示
nl	|	显示的时候，输出行号
more	|	一页一页的显示
less	|	于more类似，但可以往前翻页
head	|	只看前面几行
tail	|	只看后面几行
od	|	以二进制的方式显示文件内容

##   cat命令

查看文件内容最常用的就是cat命令，其选项如下：

|选项	|	说明|
|---	|	---|
-b	|	对非空白行显示行号，空白行则不显示
-E	|	将结尾的换行符`$`显示出来
-n	|	显示行号，包括空白行
-v	|	列出不可见的特殊字符

## head和tail命令

与cat读取文件的全部内容不同，head和tail命令用于读取文件的前几行或最后几行，在部分情况下非常有用。

head命令的作用是读取文件内容的前多少行。使用head命令一般只使用-n选项，该选项指定要读取前面多少行。

例如，如果想输出前25行，下面三个命令是等价的：

```sh
head -n25   1.md
head -n       25   1.md
head -25   1.md
```

-n 后面也可以跟负数，例如下面的命令输出除了最后5行以外的全部内容：

```sh
head  -n -5 input.txt
```

与head相反，tail命令用于读取文件内容的后多少行。下面两个命令均读取文件最后10行。

```sh
tail   -n   10   1.md
tail -10    1.md
```

如果数字带加号，表示从第几行开始输出，例如从第一行开始输出，即全部输出：

```sh
tail   -n   +1 
```

从第25行开始输出：

```sh
tail  -n   +25    1.md
```


## 比较文件内容： cmp命令

Linux cmp 命令用于比较两个文件是否有差异。当相互比较的两个文件完全一样时，则该指令不会显示任何信息。若发现有所差异，预设会标示出第一个不同之处的字符和列数编号。若不指定任何文件名称或是所给予的文件名为"-"，则cmp指令会从标准输入设备读取数据。

cmp命令的语法如下：

```
cmp [-clsv][-i <字符数目>][--help][第一个文件][第二个文件]
```

cmp命令的选项如下：

|选项	|	作用|
|---	|	---|
-c或--print-chars	|	除了标明差异处的十进制字码之外，一并显示该字符所对应字符。
-i<字符数目>或--ignore-initial=<字符数目> 	|	指定一个数目。
-l或--verbose 　	|	标示出所有不一样的地方。
-s或--quiet或--silent 　	|	不显示错误信息。
-v或--version 　	|	显示版本信息。
--help 　	|	在线帮助。

如下命令比较两个文本文件的差异：

```sh
cmp file1.txt   file2.txt 
```

## split命令

Linux split命令用于将一个文件分割成数个。该指令将大文件分割成较小的文件，在默认情况下将按照每1000行切割成一个小文件。

split命令语法如下：

```sh
split [--help][--version][-<行数>][-b <字节>][-C <字节>][-l <行数>][要切割的文件][输出文件名]
```

split命令的选项如下：

|选项	|	说明|
|---	|	---|
-行数	|	指定每多少行切成一个小文件
-b 字节数	|	 指定每多少字节切成一个小文件
-C 字节数	|	 与参数"-b"相似，但是在切 割时将尽量维持每行的完整性
[输出文件名]	|	设置切割后文件的前置文件名， split会自动在前置文件名后再加上编号


将文件file.txt每6行切割成一个文件，可使用如下命令：

```
split -6 file.txt
```


##   cut

cut命令的作用是以指定的分隔符分割文件内容，常用于结构化的文本内容，类似于Excel的数据分列。

cut命令的主要选项如下：

* -d : 指定分隔符
* -f  n ： 取出第n列
* -f  n-m ： 取出第n到第m列

例如有如下文本文件1.md：

```sh|
127.0.0.1
10.0.0.20
192.168.0.4
```

可以看到每一行都以点号分隔，可以使用如下命令取出第一列：

```sh
$ cut -d '.' -f 1  1.md
127
10
192
```

使用如下命令取出第2-3列：
```sh
$  cut  -d  '.'  -f  2-3  1.md
0.0
0.0
168.0
```


##  排序：sort命令
可以使用sort命令对每行进行排序，默认每从第一个字符开始，比较ASCII值进行排序。

sort命令选项如下：
* -r ： 逆序
* -f ： 不区分大小写
* -n ： 以数字为依据

对于文本的排序，例如如下文本文件1.md：

```
aa
abd
A
abc
```

运行`sort 1.md`后输出如下： 

```
A
aa
abc
abd
```

对于数值的排序，假设一个文件2.md如下：

```
2
3
10
111
```

必须加上-n告诉以数值为依据，否则会当成字符串以ASCII逐字符比较。如下示例：

```
$  sort -n  2.md
2
3
10
111
```



删除重复行前先进行排序，然后使用管道传递给uniq命令即可。

如下文本文件3.md：

```
A
B
A
A
B
```
运行如下命令删除重复行：

```sh
$  sort 3.md | uniq
A
B
```

## grep命令

可以在一个或多个文件中查找字符串

按行查找的。

在文本文件1.txt中查找word：

```
grep word 1.txt
```

在多个文件中，在输出前加上文件名及冒号，然后是包含搜索内容的文本。

grep word  *.txt
1.txt :
        1.txt中包含word的行
2.txt:
        2.txt中包含word的行
3.txt:
        3.txt中包含word的行

只显示包含内容的文件名：

```
grep  -l   text  *.txt
```

不区分大小写，如下示例搜索包含word、Word、WORD的行：

```
grep -i  word 1.txt
```

grep命令也支持管道，如下示例筛选出以.txt为后缀的文件：

```
ls | grep  *.txt
```





#  系统管理常见命令

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
cd is shell builtin  # cd是shell自带

type awk
awk is /usr/bin/awk  # 系统命令
```
## 输出到终端——echo命令

echo是非常常见的命令，它的作用是输出内容到终端，例如：

```sh
$ echo  hello  bash 
hello bash
```

echo会解析所有的命令行参数，而且会忽略空白符：
```sh
$a="bash"
$echo   hello        $data
hello bash  
```

要想保留空白字符，需要将其放入单引号或双引号中：

```sh
echo   '   hello     bash   '  
echo  "   hello     bash   "
```
单引号和双引号的区别是对变量的解析与否，双引号会读取以$开头的单词并尝试解析变量值，再插入到字符串中，这种方式叫做“内插”。而单引号则不理会进行变量解析。

如果不需要解析变量，则使用单引号即可：

```
echo  'hello $bash'
hello $bash
```

## 写内容到文件的快速方式

echo命令经常用来快速将少量文本内容写入到文本文件，使用重定向符号`>`或`>>`将内容保存到文件而不输出到终端。这两个符号分别可以覆盖内容和追加内容到文件。例如：

```
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
read -p "a:"  a
echo "a ： $a"
```

上面的示例运行后，在终端会看到提示字符“your name：”，此时直接输入z
值，即可将该值赋予给变量name。

##  将输入存入数组

如果需要用户依次输入多个单词，彼此以空格隔开，那么可以使用-a将输入存入数组

read  -p "arr: " -a arr
echo "arr的长度: ${#arr[*]}"




## 查看系统与内核相关信息

要查看系统与内核相关信息，使用uname命令。-a选项表示输出所有信息。-r选项输出内核版本。

## 远程连接：ssh命令

ssh命令用于登录远程主机

要登录远程主机，使用如下命令：

```
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

```
curl https://www.baidu.com
```

然后，百度首页的html就会显示在屏幕上了。

如下命令将返回的内容保存到本地：

```
curl URL >> 1.html
curl  https://www.baidu.com   -o 2.html
curl    https://www.baidu.com  -O
```

-o选项可以重命名，-O选项使用服务器上的名称。

如下示例保存图片：

```sh
curl -o 1.jpg  图片链接
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

```
find 要查找的目录  查找选项 -exec 命令 {} \;
```

- 花括号表示查找出来的文件名
- 在命令末尾，需要家反斜杠和分号

例如：

```
find $HOME -name *.txt -exec echo "已经找到{}"  \;
```

## locate

与find从文件系统查找文件不同，locate命令从一个包含系统文件名的数据库中查找，因此查找效果更快。

如果运行完update后又新建了文件，那么locate是查找不到的，此时必须再次运行update命令。

更新数据库：

```
updatedb
```

查找文件：

```
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

#  Bash Shell

##  Bash的配置文件

登录shell之后会从5个不同的文件中读取命令：
- etc/profile ： 主启动文件，每个用户登录后都会读取
其余的四个文件都用于同一个目的：提供用户专属的启动文件来为该用户使用shell时提前设置，例如设置环境变量，预先执行一些命令。另外要注意，shell会按顺序执行第一个被找打的文件，余下的则被忽略。
- $HOME/.bash_profile 
- $HOME/.bashrc
- $HOME/.bash_login
- $HOME/.profile

## Bash Shell的快捷键  

移动光标：
- ctrl+a:光标移到行首
- ctrl+e:光标移到行尾
- ctrl+b:光标左移一个字母
- ctrl+f: 光标右移一个字母
- esc+f: 往右跳一个单词
- esc+b: 往左跳一个 单 词

删除：
- ctrl+h:删除光标前一个字符，同 backspace 键相同
- ctrl+w: 删除光标前的一个单词
- esc+d: 删除光标后的一个词
- ctrl+k:清除光标后至行尾的内容。
- ctrl+u: 清除光标前至行首间的所有内容。
- ctrl+d: 删除光标所在字母;注意和backspace以及ctrl+h的区别，这2个是删除光标前的字符

修改：
- ctrl+t: 交换光标位置前的两个字符
- esc+t: 交换光标位置前的两个单词

其他：
- ctrl+y: 粘贴或者恢复上次的删除
- ctrl+l:清屏，相当于clear。
- ctrl+r:搜索之前打过的命令。会有一个提示，根据你输入的关键字进行搜索bash的history
- ctrl+d:退出当前 Shell
- ctrl+c:杀死当前进程
- ctrl+z : 把当前进程转到后台运行，使用’ fg ‘命令恢复。比如top -d1 然后ctrl+z ，到后台，然后fg,重新恢复


# Vim


## 打开文件

使用vim <file> 即可打开文件，如果该文件不存在就会新建。

如果仅仅是删除、移动，而不增加内容，那么只在命令模式就可以完成操作。

## 三种模式的切换

vim默认打开的模式为命令模式。

按 i 进入编辑模式，按 v/V 进入字符/整行选择模式，按 Esc 重新回到命令模式。

## 命令模式下的操作

单行删除、复制、粘贴：

若要	|	依次按下
|---	|	---|
整行删除	|	dd
整行复制	|	yy
粘贴到光标所在行的下一行/上一行	|	p/P 

多行删除、复制、粘贴：

若要	|	依次按下
|---	|	---|
删除光标所在到最后一行/第一行	|	 dG/d1G  
复制光标所在行到最后一行/第一行	|	yG/y1G

行内删除、复制、粘贴：

若要	|	依次按下
|---	|	---|
删除光标所在到该行的行尾/行首	|	 d$/d0 
复制光标所在到该行的行尾/行首	|	 y0/y$ 

查找、替换：

若要	|	在底部输入命令
|---	|	---|
从光标所在处正向查找	|	 :/<text> 
从光标所在处逆向查找	|	:?<text>
全部替换不确认：  	|	:1,$s/<oldText>/<newText>/g
逐一确认是否替换（加c）	|	:1,$s/<oldText>/<newText>/gc

说明：上面两种查找中，按 `n` 键查找下一个，按 `N` 键查找上一个。

保存：

若要	|	在底部输入命令
|---	|	---|
保存	|	:w 
强制退出而不保存	|	 :q! 
保存后退出（最常用）	|	:wq
另存为新文件	|	 :w <filename>
读入另一个文件内容追加到光标所在行的下一行	|	:r  <filename> 

## 选择模式下的操作

若要	|	按下
|---	|	---|
进入上下左右字符选择模式	|	v
进入行选择模式	|	V
进入列选择模式	|	Ctrl+V
复制选择的内容	|	y
将选择的内容粘贴到游标之后	|	p
将选择的内容删除	|	d

## 插入内容

在命令模式下按i进入编辑状态，此时编辑器下部显示` ---insert--- `。

编辑状态就和一般的编辑器一样，按键盘上的上下左右键可移动光标，按`Ctrl+C`可复制、按`Ctrl+V`可粘贴。

## 回到命令模式

按`Esc`键回到命令模式。

## 常用按键汇总

|模式	|	按键	|	含义|
|---	|	---	|	---|
命令模式	|	:w	|	保存更改，加 ! 强制保存
命令模式	|	:q	|	退出，加 ! 强制退出
命令模式	|	:wq	|	保存并退出，常用
命令模式	|	u	|	撤销
命令模式	|	dd	|	删除整行
命令模式	|	yy	|	复制整行
命令模式	|	p	|	粘贴到下一行
命令模式	|	v	|	进入单字符选择-- VISUAL --
命令模式	|	V	|	进入整行字符选择-- VISUAL --
-- VISUAL --	|	d	|	删除已选择的字符
-- VISUAL --	|	y	|	复制已选择的字符
-- VISUAL --	|	p	|	粘贴到光标后面
命令模式	|	:1,$s/旧文本/新文本/g	|	查找替换，/ 可以换成其它字符
命令模式	|	i	|	进入 -- INSERT --
    
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

# 脚本

##   声明变量

变量在Linux脚本中非常常见。

声明变量很简单，只需要使用等号将变量名和变量值连接起来即可：
```
a=1
str=hello
echo $a
echo $str
```

如果值有空格，则需要使用引号：

```sh
str ="hello bash"
```
要特别注意，等号两边不能有空格，下面的命令是错的：
```
a  =  1
bash: a: command not found
```

bash会把a当做命令、= 和1当做参数去执行。

## 打印变量

使用echo加上美元符号$和花括号打印变量：
```
echo $PATH
echo ${PATH}
```
如果变量名称不存在空格和特殊字符，上面两种方式都可以。如果存在空格或特殊字符，变量名称就要用花括号括起来。

## 字符串转义

有些时候我们恰好需要用到特殊字符本来的含义，例如：

```sh
echo "coffee is $five"
```

这里会找到名为five的变量解析出来，但我们的本意是只想显示“咖啡是5美元”，所以使用转义：

```sh
echo "coffee is \$five"
```

这样就输出了“coffee is $five”。


##  变量内容的编辑

- `${变量#关键词}`  若变量内容从头开始的数据符合关键词，则将符合的最短数据删除
- `${变量##关键词}`  若变量内容从头开始的数据符合关键词，则将符合的最长数据删除
- `{变量%关键词}`  若变量内容从尾向前的数据符合关键词，则将符合的最短数据删除
- `{变量%%关键词}`  若变量内容从尾向前的数据符合关键词，则将符合的最长数据删除
- `{变量/旧字符串/新字符串}` 若变量内容符合旧字符串，则第一个旧字符串会被新字符串替换
- `{变量//旧字符串/新字符串}` 若变量内容符合旧字符串，则全部的旧字符串会被新字符串替换

示例：

```
str="hello,hello,world"
echo ${str#h*o} # 输出 ,hello,world
echo ${str##h*o}  # 输出 rld

echo ${str/hello/HELLO} # 输出 HELLO,hello,world
echo ${str//hello/HELLO} # 输出 HELLO,HELLO,world
```


## 几种特殊的内容替换结构

```
${var:-string} 
${var:+string} 
${var:=string}
${var:?string}
```

1、${var:-string}和${var:=string}:若变量var为空，则用在命令行中用string来替换${var:-string}，否则变量var不为空时，则用变量var的值来替换${var:-string}；对于${var:=string}的替换规则和${var:-string}是一样的，所不同之处是${var:=string}若var为空时，用string替换${var:=string}的同时，把string赋给变量var： ${var:=string}很常用的一种用法是，判断某个变量是否赋值，没有的话则给它赋上一个默认值。

2、${var:+string}的替换规则和上面的相反，即只有当var不是空的时候才替换成string，若var为空时则不替换或者说是替换成变量 var的值，即空值。(因为变量var此时为空，所以这两种说法是等价的)

3、{var:?string}替换规则为：若变量var不为空，则用变量var的值来替换${var:?string}；若变量var为空，则把string输出到标准错误中，并从脚本中退出。我们可利用此特性来检查是否设置了变量的值。

补充扩展：在上面这五种替换结构中string不一定是常值的，可用另外一个变量的值或是一种命令的输出。


## shell脚本的参数

新建一个Shell脚本1.sh内容如下：
```
echo  $1
```

$1表示该脚本的第一个参数，类似的 $2 、$3表示第2、3个参数，以此类推。

然后运行：
```sh
$  ./test.sh  hello
hello
```

另外，$*引用所有参数列表。$#：表示执行脚本传入参数的所有个数



##  条件表达式

在脚本中经常会用到条件表达式，条件表达式常用在if语句中，用中括号包裹，各个部分用空格隔开，例如：

```
if [ 2 -eq 3 ] then 
        echo 相等
fi
```

条件表达式中最常见的情况是比较，比较常用的比较是数值比较和字符串比较。

## 数值比较

与数学公式不同，数值比较需要用到-gt、-lt、-eq表示大于、小于、等于号，而不能是>、<、=。

|比较运算符	|	解释	|	示例|
|---	|	---	|	---|
-eq 	|	相等 	|	[    1  -eq  2   ]
-ne		|	不等于	|	[   1  ne  2     ]
-ge		|	大于等于	|	[   1  -eq   2    ]
-gt	|	大于	|	[   2   -gt   1   ]
-le		|	小于等于	|	[   1  -le  2  ]
-lt		|	小于	|	[  1  -le  2   ]

表格示例中空格间距比较大，就是为了题型注意各个部分一定要加上空格。

## 字符串比较

字符串的比较方式是根据ASCII逐个字母比较，常用的字符串比较运算符如下：

| 比较运算符 | 含义  | 示例  |
| ----- | --- | --- |
=	|	 相同	|	[   'a'   = 'a'  ]
!=	|	不同	|	[  'a'   != 'b'  ]
<	|	小于	|	[  'a'   <  'A'  ]
>	|	大于	|	[  'a'   > 'A'  ]
-n str 	|	字符串str长度是否非0	|	[   -n  'a' ]
-z str 		|	字符串str长度是否为0	|	[   -z  '' ]


## 文件判断

文件判断常用的运算符如下表：

|运算符	|	解释|
|---	|	---|
-d file	|	判断file是否为目录
-e file	|	判断file是否存在
-f file	|	检查file是否为文件
-r file	|	判断文件是否可读
-s file	|	判断file是否存在并非空
-w file	|	判断file是可写
-x file	|	判断file是可执行


##   if语句

if语句的作用是根据条件执行不同的指令。if语句的通用语法如下：

```
if [ 条件表达式 ]; then
    指令
```

注意条件表达式各个部分都要有空格，例如：

```
if [ 2 -gt 1 ] then 
        echo 大于 
fi
```

单分支就是只有一个分支，如同上面的示例。

双分支有一个if和一个else，例如：

```
if [ 2 -eq 3 ]  then 
        echo 相等
else 
        echo 不相等
fi
```

多分支有一个以上的elif，例如如下脚本1.sh：

```
if [ $1 -ge 80 ] then 
        echo 优秀
elif [ $1 -ge 60 ] then 
        echo 及格
else 
        echo 不及格
fi
```

这里$1表示传入脚本的第一个参数，运行如下示例：

```
$ bash  1.sh 88
优秀
$ bash  1.sh 76
及格
$ bash  1.sh 50
不及格
```


##  for循环

for循环的基本语法格式如下：

```
for item in con1 con2 con3
do
    命令
done
```

遍历文件

```sh
i=0
filelist=$(ls) # 当前目录所有文件
for filename in ${filelist}
do
    i=i+1
    echo "第${i}个文件是：${filename}"
done
```


还有一种写法

```sh
for (( 初始值; 限制条件; 赋值))
do
    程序段
done
```

示例

```sh
for (( i=1; i<=5; i=i+1 ))
do
    touch "file${i}.txt"
done
```



## 函数

### 创建函数

使用关键字:

```
function 函数名 {
    函数体
}
```

第二种方式是不使用function关键字,但要带上括号,

```
函数名(){
    函数体
}
```


### 调用函数

要使用函数,直接写上函数名即可,不要带括号。

一个具体的示例如下:

```
function Welcome {
    read -p "你的名字:" name
    echo "你好,${name}" 
}

Welcome
```

### 带参数的函数

与脚本的参数一样，函数的参数不需要指定名称，而是使用$1 、$2指代。

```
function Welcome{
  echo "你好，$1"
}

Welcome 张三  #输出：你好，张三
```


### 函数的返回值

函数使用echo返回值，这与常用的return习惯不太一样。注意，echo在函数体外是向终端输出内容，但在这里表示返回值，也就是说，分两种情况：
- 如果有一个变量接住这个函数，此echo就失去了原有的作用——也就不会在终端输出值。
- 如果没有变量接住这个函数，那么echo就会在终端输出。

```
function Welcome {
    echo "你好，$1"  # 此时不会在终端输出
}

out=$(Welcome)  # 变量接住了，没有输出

Welcome 张三  # 没有变量接住，输出 你好，张三
```




## 数组

如果已经知道数组元素，使用如下方式新建数组：

```
arr=(1 2 three four)
```

空格分隔的每个部分都对应一个元素，如下示例按索引位置打印元素：

```
echo ${arr[0]}  ${arr[3]}
1 four
```

##  给脚本传递参数

- `$0` 第0个参数，即执行文件本身
- `$1` 第1个参数
- `$n` 第n个参数, n是正整数
- 注意, 如果参数过多, 达到了两位数,那么就要加花括号,例如 ${10}
- `$#`  表示脚本运行时携带的命令行参数的个数
- `$*`变量会将所有的命令行参数视为一个单词, 该选项不常用
- `$@`变量会将所有的命令行参数视为同一字符串中的多个独立的单词，以便你能通过for循环遍历,

新建一个Shell脚本test.sh内容如下：
```
echo  "第0个参数也就是脚本名称是：$0"
echo  "第1个参数是：$1"
echo  "第2个参数是：$2"
echo  "参数个数为: $#"
echo  "参数列表为: $@"
```

$1表示该脚本的第一个参数，类似的 $2 、$3表示第2、3个参数，以此类推。

然后运行：
```sh
$  ./test.sh  hello bash shell
```

输出如下结果:

```
第0个参数也就是脚本名称是：test.txt
第1个参数是：hello
第2个参数是：bash
参数个数为: 3
参数列表为: hello bash shell
```


# 列字段筛选工具：awk命令

##  语法

```
awk  选项  '行筛选条件{列编辑指令}' 文件或列表
```

选项：
-F 指定分隔符

## 示例

```
cat /etc/passwd | awk -F ":' "{print $1,$3,$4}''
```

以":"为分隔符，输出1，3，4列内容

## 内部变量

- FS：指定每行文本的字段分隔符，默认为空格或制表位。 与-F一样
- NF：当前处理的行的字段个数。 
- NR：当前处理的行的行号（序数）。 
- $0：当前处理的行的整行内容。 
- $n：当前处理行的第 n 个字段（第 n 列）。 
- FILENAME：被处理的文件名。
- RS：数据记录分隔，默认为\n，即每行为一条记录。

## 行筛选条件

输出奇数行：

```
nl /etc/passwd | awk '(NR%2)==1{print}' 
```

输出1、3行的内容：

```
cat /etc/passwd | awk 'NR==1||NR==3{print}' 
```


## if语句

必须用在{}中，且比较内容用()扩起来

```
awk -F: '{if($1~/mail/) print $1}' /etc/passwd                                       //简写
```

```
awk -F: '{if($1~/mail/) {print $1}}'  /etc/passwd                                   //全写
```


```
awk -F: '{if($1~/mail/) {print $1} else {print $2}}' /etc/passwd            //if...else...
```



# 管理分区与文件系统

## 设备名称

在Linux中，硬盘一般命名为/dev/sda，如果有第二块，则继续命名为/dev/sdb。

分区一般在硬盘名称后加数字，例如/dev/sda1、/dev/sda2。

不过，对于Windows和Linux双系统而言，这种命名方式可能不适应，具体硬盘名称需要打开 /etc/fstab 查看。
## 分区、挂载、挂载点的概念

一块硬盘往往分为几个区，例如Windows的C盘、D盘、E盘，就是三个分区。

在Linux中，一个分区只有连接到文件系统中的某个目录才能使用这个分区，将硬盘的某个分区对应到Linux的某个目录称为“挂载”。

将U盘这个“特殊的分区”对应到某个目录（例如/mnt/sandisk）也称为“挂载”。


每个硬盘、每个分区都统一使用“设备”来称呼，每个硬盘、每个分区都使用一个设备名称来唯一标识。

关于分区、设备名称、挂载点的信息都记录在/etc/fstab文件中，该文件的每一行都表示一个分区及其挂载点，还包括分区容量等其它信息。



## 分区表

分区表用来存储关于硬盘每个分区的大小和布局信息，有两种标准：
- 传统的MBR，适用于古老的BIOS启动方式，MBR分区大小限制在了2TB。
- 新兴的GUID，gpt分区，适用于UEFI体系，取代BIOS。GUID分区可以支持高达9.4ZB的分区。


由于fdisk并不支持gpt分区，所以使用parted命令。

## 分区管理

查看硬盘分区信息：

```
parted -l 硬盘名称
```


## 挂载

### 自动挂载

编辑/etc/fstab文件

### 手动挂载

```
mount -t ext3 -o ro dev/sdb1 /mnt/tmp
```

# 编程语言


##  C 语言

printf()函数的作用是打印内容到控制台。

printf()最简单的用法是传递一个字符串字面量：

```
printf("hello,world!")
```

如果要输出包含变量的字符串，则需要使用转换说明语法，该语法使用一个百分号加一个字母，用于匹配变量的类型以及输出形式，从第二个参数开始，依次匹配变量和转换说明。常见的转换说明包括：
- %d： 有符号十进制整数
- %s： 字符串
- %p： 指针
- %f： 浮点数
- %c： 单个字符

printf()同时也会解析转义字符：

```
int a = 1;
char str[20] = "hello,wolrd"; 
printf("output:\n %d \n %s",  a , str );
```

###  数组和指针

数组表示多个相同类型的元素的有序集合，数组在内存中是连续分布的，因此，使用指针运算读取元素非常快。

声明数组需要定义元素的类型，然后将数组名称后面加上中括号，中括号里面可以写上数组的最大长度，也可以不写，不过，最佳实践是永远都写上最大长度。等号右边将元素用花括号包裹，逗号隔开：

```
int arr[3] = {1,2,3};
```

实际元素的数量可以少于定义的长度，但是不能超过定义的长度。

数组名称是一个指针类型，指向数组的第一个元素的地址，也叫数组的首地址：

```
int arr[3] = {1,2,3};
printf("first element address: %p \n", &arr[0]);
printf("%p",  arr);
```

通过输出的结果可以看到，arr的值是一个地址，与数组首地址&arr[0]是相同的。

数组名是一个指针，如果该指针加1，表示该指针向后移动一个元素类型所占字节的长度，也就是跳到下一个元素，例如本例中，元素类型是int，占4个字节，所以向后移动了4个字节，刚好跳到了下一个元素的位置。

在下述代码中，定义了一个指针p，并将数组名称赋给它。此时p指向第一个元素，之后p++，此时p跳到了下一个元素。分别用p和*p打印除了此时的地址及值：

```
int arr[3] = {1,2,3};
int * p = arr;
printf("first address: %p \n", p);
printf("first address: %p \n", &arr[0]);
printf("first value: %d \n", *p);
printf("first value: %d \n", arr[0]);
p++;
printf("second address: %p \n", p);
printf("second address: %p \n", &arr[1]);
printf("second value: %d \n", *p);
printf("second value: %d \n", arr[1]);
p++;
printf("thrid address: %p \n", p);
printf("thrid address: %p \n", &arr[2]);
printf("third value: %d \n", *p);
printf("third value: %d \n", arr[2]);
```

输出结果如下：

```
first address: 0x7ffdb1610e80 
first address: 0x7ffdb1610e80 
first value: 1 
first value: 1 
second address: 0x7ffdb1610e84 
second address: 0x7ffdb1610e84 
second value: 2 
second value: 2 
thrid address: 0x7ffdb1610e88 
thrid address: 0x7ffdb1610e88 
third value: 3 
third value: 3 
```

根据结果可以得知，每次指针加1，地址就加了4个字节，刚好是整数类型所需的字节数。同时，使用*p读取元素值，和使用arr[1]读取元素值是等价的。

请注意，指针p并不知道自己指向的是数组的某个元素，还是一个独立的整数，它只知道自己指向了一个存储整型数据的内存地址而已。运行p++，它也只是按照数据类型移动了4个字节而已，它也并不知道移到了下一个元素，只是因为数组在内存中是连续分布的，指针的移动“刚好对上了”下一个元素的地址而已。总而言之，指针不认识数组，只知道自己指向一个地址，然后根据指针运算规则移动一定的字节长度，然后取出值而已。

我们可以接着上面的代码，虽然上面已经移动到了最后一个元素的位置，但是仍然可以再继续移动：

```
p++;
printf("next address: %p \n", p);
printf("next value: %d \n", *p);
```

输出结果是：

```
thrid address: 0x7ffdb1610e8c 
third value: -1025609304 
```

可以看到，指针依然移动了4个字节，依然读取了内存中的值，但这个值是没有意义的，它也不知道自己是否还处于数组所在的内存区域中。


###  字符串和指针

C语言并没有专门用于存储字符串的数据类型，字符串存储在char类型的数组中，如下定义了一个字符串变量：

```
char a[10] = "hello";  
```

要让字符数组表示为字符串，该字符数组的末尾一定要是空字符'\0'，这是普通的字符数组和字符串的最显著的区别，只有在，只有这样，系统才会识别为字符串。上面的字符串声明示例等价于：

```
char a[10] = {'h','e','l','l','o','\0'};
```

如下示例中，a会识别为字符串，而b只是由字符组成的数组，因为末尾没有空字符'\0'：

```
char a[10] = {'h','e','l','l','o','\0'};
char b[10] =   {'h','e','l','l','o'};
```

因此，在指定字符数组的长度时，要确保该值至少比字符个数多1，因为与要容纳最后的空字符。也就是说，字符串的长度永远比字符数量多1。

不过，通常并不使用字符串数组的方式声明字符串字面量，而是直接采用引号的方式，编译器会自动加入末尾的空字符'\0'。

除了使用字符数组的方式声明字符串以外，还可以使用字符指针：

```
    const char * str = "hello";
```

与数值、字符这种单一类型不同的是，str的数据类型虽然是指针，但是打印字符串时依然使用的是a，只需要使用%s转换说明即可：

```
printf("address: %p \n value : %s ", str, str );
```


###  结构体和指针

结构体变量表示一组属性的集合，使用结构体变量首先要使用struct 关键字声明一个结构体类型，例如：

```
struct book{
        char name[20];
        float price;
};
```

结构体类型book包含两个属性成员：字符数组类型的name和浮点类型的price。

定义了结构体类型后，就可以新建一个该类型的结构体变量并对成员依次赋值：

```
struct book book1 = {
        "C Primer Plus",
        89.00
};
```

也可以先定义结构变量，再单独为每个成员赋值：

```
struct book  book1 ;
book1.name = "C Primer Plus";
book1.price = 89.00;
```

除了声明单个结构体变量，还可以声明结构体数组，数组中的每个元素都是一个结构变量，成员相同，对应的值不同。如下示例定义了结构体数组books，其中有2个结构：

```
struct book books[2];
```

books[0]表示第一个结构体，要读写其中的成员，使用books[0].name和books[0].price。类似地，books[1]表示第二个结构体，其中的成员是books[1].name和books[1].price。

在生命结构体数组的时候也可以同时为每个元素的成员赋值：

```
struct book{
        char name[20];
        float price;
};

struct book books[2] = {
        {
                "C Primer Plus",
                89.00
        },
        {
                "C++ Primer Plus",
                99.00
        } 
};
```

指针表示指向某个变量的内存地址，结构体类型的指针则表示指向某个结构体变量的内存地址。

指向结构的指针比结构本身更容易操控。结构体数组本质是也是数组，所以使用指针运算可以直接跳到下一个结构体元素的地址。对于函数调用，传递指针比拷贝结构体变量副本更有效率。

如下示例代码先定义一个结构体类型book，然后定义了一个结构体数组books，随后声明了指向该数组的指针，该指针首先指向第一个结构体元素，然后通过解引用方式读取结构体变量中的成员，最后通过指针运算移动指针，读取下一个结构体元素：

```
struct book{
        char name[20];
        float price;
};

struct book books[2] = {
        {
                "C Primer Plus",
                89.00
        },
        {
                "C++ Primer Plus",
                99.00
        } 
};

/* 这是一个指向结构变量的指针 */
struct book * p;

/*  由于books是数组，所以等价于 p=&books[0]  */
p= books;

/* 由于优先级的原因，*p需要用括号括起来 */
printf("%s \n",(*p).name);

/* 指针指向了数组中的下一个结构变量 */
p ++ ;
printf("%s \n",(*p).name);
```

##  C++

###  输出

```
cout << "hello,world!" ;
cout  <<  endl ;  
cout << endl << "hello,world" ;
cout  << "hello"  << endl << "world" ;
```

###  整数类型

```
int  a = 1;
cout  << a ;
```


###  函数

-  无返回值无参数

```cs
#  include   <iostream>
using namespace std;

void a(){cout << "hello,world";}

int main(){
    a();
    return 0;
}
```

-  有返回值有参数

```cpp
#  include   <iostream>

using namespace std;

int a(int x){return x+1 ;}

int main()
{

cout << a(2);
        return 0;
}


```


```cpp
#  include   <iostream>
using namespace std;

void print(string msg){cout << msg;}

int main()
{

print("hello,world!");

return 0;
}

```


###  浮点数

```
float a = 1.5f;
    cout << a;
```    
    
默认的带小数点的字面量是double类型，如果需要为float类型，需要在字面量后面加上f。


###  字符串

```cpp
#  include   <iostream>
using namespace std;

int main()
{
    string a = "hello,world你好" ; 
    cout <<a ;
    return 0;
}
```


### 结构体

```cpp
#  include   <iostream>
using namespace std;

struct   people{
    string name;
    int  age;
};


int main()
{
people  p1 = {"tim" , 39} ;
people  p2 = {"cook" , 42} ;
    
cout << p1.name << ":" << p1.age << endl ;
cout << p2.name << ":" << p2.age << endl ;

        return 0;
}


```



###  数组

```
#  include   <iostream>
using namespace std;

int main()
{
int arr[3] = {1, 2, 3};
    cout << arr[0] << arr[1] << arr[2] ;

        return 0;
}
```

###  for循环

```cpp
#  include   <iostream>
using namespace std;


int main()
{

    for(int i = 0; i<5 ; i++){
        cout << i << endl;
    }

        return 0;
}
```


###  if语句

```cpp
#  include   <iostream>
using namespace std;


int main()
{

int a = 75;
    
    if(a>=80){cout << "优秀";}
    else if(a>=60){cout << "及格";}
    else{cout << "不及格";}

        return 0;
}

```


###  三元表达式

```cpp
#  include   <iostream>
using namespace std;

int main()
{

int a = 75;
    
string result = a>=60? "及格":"不及格";
cout << result ;

return 0;
}

```



##  Java

### HelloWorld


```
public class HelloJava{
        public static void main(String[]  args){
                System.out.println("Hello,Java!");
        }
}
```


### 包和导入

```
import javax.swing.*;
```
###  浮点类型

```
double d = 8.31;
float f = 8.31f;
```

### 泛型数组


```
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
      ArrayList<Integer> arr = new ArrayList<>();
      arr.add(1);   
      arr.add(2);   
      
      System.out.println(arr);
    }
}
```


###  var

var关键字的意思是，让编译器自己推断数据类型，而且一旦推断出来，那么类型不可改变，例如：

```
var a = 1; 
等于
 int a = 1;
```


###  ArrayList

ArrayList 类是一个可以动态修改的数组，与普通数组的区别就是它是没有固定大小的限制，我们可以添加或删除元素。

```
ArrayList<String> sites = new ArrayList<String>();
        sites.add("Google");
        sites.add("Runoob");
        sites.add("Taobao");
        sites.add("Weibo");
        System.out.println(sites);
    }


[Google, Runoob, Taobao, Weibo]
```


```
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
      ArrayList arr = new ArrayList();
      arr.add(1);   
      arr.add(2);   
      
      System.out.println(arr);
    }
}
```

会出现警告，原因是类型未经过检查。

### HashMap


```
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
      HashMap m = new HashMap();
      m.put("a",1);
      m.put("b",2);
      System.out.println(m);
    }
}
```


###  泛型HashMap


```
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
      HashMap<String,Integer> m = new HashMap<>();
      m.put("a",1);
      m.put("b",2);
      System.out.println(m);
    }
}
```

### Map


```
Map<String,String> map=new HashMap<>();

map.put("2001", "张三");
map.put("2002", "张三");
map.put("2003", "李四");
map.put("2003", "王五");//键重复，会覆盖上一个，留下最新的

System.out.println(map);//{2003=王五, 2002=张三, 2001=张三}
```

###  线程

```
public class 学习{
    public static void main(String[] args) {
       
       Runnable r=()->{
        while(true){
            System.out.print("A");
        }
       };
       Thread t = new Thread(r);
       t.start();
       while(true){
            System.out.print("B");
        }
    }
}
```


###  读取输入

```
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
        Scanner in = new Scanner(System.in, "GBK");
        while(true){
            String a = in.nextLine();
            System.out.println(a);
        }

    }
}
```


 - [Python运行时](#python运行时)
# 函数计算


## 触发器

函数计算是事件驱动的云服务，因此要执行一个函数，就必须要有一个事件发生，这个事件叫做“触发器”。

- 云产品事件：例如存储桶中新增了一个文件。
- HTTP事件 ：使用浏览器、API、SDK发送HTTP请求时触发。

一个触发器加上一个请求处理程序就组成了一个可以提供服务的函数。

## 函数处理程序

一个触发器对应一个请求处理程序handler。handler包括一个文件名和方法名。

对于Python而言，请求处理程序格式为`文件名.方法名`，例如文件名是main.py，方法名为handler，那么请求处理程序为main.handler。

对于Node.js而言，请求处理程序为`文件名.方法名`，例如文件名是index.js，方法名为handler，那么请求处理程序为 index.handler。


##   event

event 为调用函数时传入的参数。即响应报文的body，用JSON格式表示。例如：

![响应报文](img/响应报文.png)

通过json模块的loads()方法可以将JSON对象转化成Python对象：

```
eventObj = json.loads(event)
```

## Node.js运行时

```
// index.mjs
export const handler = async (event, context) => {
    const eventObj = JSON.parse(event)
    
    // 请求体
    const body = eventObj.body
    return body
}
```

关键信息说明如下：
- handler ： 方法名称。例如，为FC函数配置的请求处理程序为index.handler，那么函数计算的入口就是index.mjs中的handler函数。
- event ：请求信息，包含了请求头、请求体等关键信息，格式为JSON文本。 
- context ：函数的执行环境信息。例如运行时、内存大小等。
- return ： 作为响应报文的响应体返回给客户端。

## Python运行时

使用HTTP请求处理程序前，请确保已经为函数配置**HTTP触发器**。

一个简单的HTTP处理函数示例如下：

```
def handler(event, context):
    return 'hello world'
```


# 基础

## Linux简介

Linux 内核最初只是由芬兰人林纳斯·托瓦兹（Linus Torvalds）在赫尔辛基大学上学时出于个人爱好而编写的。

Linux 的发行版说简单点就是将 Linux 内核与应用软件做一个打包。

目前市面上较知名的发行版有：Ubuntu、RedHat、CentOS、Debian、Fedora、SuSE、OpenSUSE、Arch Linux、SolusOS 等。


##  Shell简介

在没有图形界面的时代，Shell是用户与操作系统交互的唯一方式。

用户输入命令，shell将命令传递给操作系统，操作系统执行后返回给shell，显示在终端上，这就是shell执行的一般流程。

终端只是一个图形界面，shell才是“真正的灵魂”。

所以，bash是shell，而不是终端，当你安装了bash之后，你可以在任意终端使用bash。

比如Windows terminal 是Win11自带的终端软件，它里面可以调用的shell包括：powershell、bash（如果已安装）、cmd等。

Windows10上安装的powershell既可以认为是终端，也可以认为是shell，只是因为它们取了相同的名字。不过我们可以在vscode的集成终端环境中使用powershell，此时PowerShell就是shell。

最流行的shell是bourne shell，简称bash，它预装在许多流行的Linux发行版上。当然，还有更现代的zsh、颇受用户喜爱的fish等Shell。

这里更推荐学习Bash，因为一通百通，学会了bash，其它的shell就很容易了。后面的教程都默认使用Bash。


## 在Windows上获取bash

bash是大多数Linux默认的shell，但是我们经常使用的是Windows。

如果不想安装完整的Linux桌面操作系统，而只是想在Windows上获取一个Bash环境，有几种解决方案。

- Cygwin

Cygwin在Windows下提供了具备Linux观感的类Linux环境，提供了大量的POSIX ApI功能的DLL。

但是请注意，cygwin不是在Windows上运行原生Linux程序的方法，如果要这么做，必须从源代码构建。

- wsl

wsl是微软推出的在Windows上运行的Linux子系统，可以直接到应用商店搜索Ubuntu下载安装。

- git bash

大多数情况下，我们只是想使用shell命令，而并不需要Linux环境，此时可以使用git bash。

安装git 默认安装git bash ，它包括了很多与shell命令同名的exe文件，可以直接使用。实际上这些命令足够我们学习完整的shell了。

##   终端提示符

打开终端后，每次在输入命令前会看到有一段文本，这段文本叫终端提示符：

```
[  username@hostname~  ]$
```

这里的username表示用户名称， hostname表示主机名，~表示当前工作目录是用户的家目录。

中括号后面会接一个美元符号`$`或井号#。美元符号`$`表示一般用户，井号地代表管理员。

Linux有两种用户，一般用户和管理员用户，大部分文件系统管理相关的命令只需要一般用户即可。

我们后面的代码示例会省略中括号的内，只显示提示符`$`，表示后面的内容是你需要输入到终端的。注意，只需要输入$后面的文本，而不能重复输入`$`。一般紧接着会我们会写出终端返回的结果。例如：

```
$  which ls    # which ls是需要输入的命令
/usr/bin/ls   # 终端显示的结果
```

和大多数编程语言不一样，Linux在命令行和脚本中使用井号#表示将该行后面的内容注释掉。例如上文示例。

##   Bash常用快捷键

Bash常用快捷键如下：

|快捷键|作用|
|---|---|
Ctr+C	|停止正在运行的任务
Ctrl+D	|退出当前Shell
Ctrl+U	|清空当前命令行内容
Ctrl+A	|移到行首
Ctrl+E	|移到行尾
Ctrl+K	|从光标出删除到末尾

##  Tab补全

使用命令行最多的按键或许就是Tab键了，所以单独使用一小节讲解。Tab键会根据你已经输入的少数几个字符自动猜测后面的内容并进行补全。常见的情况有以下几种。

-  命令补全： 例如先输入ec两个字符，按Tab键，Bash会补全成echo。不过Linux命令一般都比较简短，一般都是直接写完整的命令。

-  文件名称补全： 这是最实用的功能，一般来说文件名都比较长，如果每次都要输入完整的文件名不仅费时而且极容易出错。此时，只需要输入文件名的前一个或少数几个字符，再按下Tab键就可以自动补全文件名，如果匹配的文件名超过1个，那么终端就会输出匹配的文件名供我们再次输入以缩小范围。





##  环境变量

### Bash的内置环境变量

以下是直接可以使用的环境变量，注意区分大小写。
- HOME ： 当前用户家目录
- USER：用户名
- CDPATH： 以冒号分隔的目录列表，作为cd命令的搜索路径
- PS1 ： shell命令行的主提示符
- PS2： shell命令行的次提示符
- PATH： shell查找命令时检索的目录列表，以冒号分隔
- BASH ： bash shell 当前实例的完整路径名
- BASH_VERSION：bash版本
- LANG ：当前环境的语言
- HISTFILE：历史文件的位置，通常位于`$HONE/.bash_history`
- HISTFILESIZE：可以存储的历史命令条数，默认为1000，这个值对于大多数情况够用。
- HOSTNAME： 当前主机名称
- OSTYPE：操作系统类型。
- LINES ：终端山可见的行数
- PS0：执行命令之前显示的内容
- PWD：当前工作目录

### 修改PATH环境变量

一个非常常见的场景是将一些路径添加到PATH环境变量的路径列表中，也就是修改PATH环境变量的值。

例如，将家目录的bin目录添加到PATH环境变量：

```
$PATH="${PATH}:/${HOME}/bin"
```

### 新增和修改自定义环境变量


export命令可以将指定的变量设置为环境变量。

```
$ ENV_EXANPLE=ENV_EXAMLLE_VALUE
$ export ENV_EXANPLE
```

也可以写在一起：

```
export ENV_EXANPLE=ENV_EXAMLLE_VALUE
```

读取环境变量和普通变量的方式一样，使用美元符`$`。

不过，此时环境变量还没有永久生效，当重启后，自定义环境变量就就会被清除，要让自定义环境变量永久生效，一个常用的方式是将该行命令添加到`$HOME/.bashrc`。然后执行：

```
source $HOME/.bashrc
```

这会立即生效，而无需重启或注销。

### 普通变量和环境变量的区别

普通变量和自定义环境变量本质上都是变量，声明和使用的方式一模一样，这两者的区别主要在于生命周期的不同。
- 普通变量是临时的，只在此次使用shell时有用，下次使用shell（注销或重启后）就不存在了。
- 环境变量包括内置的和自定义的，是永久可以使用的。

是否要将普通变量永久保存，也就是变为环境变量，取决于自己的实际需求。一般而言，需要重读多次使用的变量应该提升为环境变量，少数几次使用的则使用普通变量即可。

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


# FFmpeg


## 基础使用

### 音视频基础知识
-r  1 每1秒1帧（1张图片）
-r 25 1秒25张图

%05d.jpg   00001~99999.jpg

-preset  编码速度，越快，画质越低

-tune  film为偏静态的视频，animation偏动态的视频。


影响画质的三大参数：编码格式、分辨率、码率。
码率的意思是每秒钟的比特数量，分辨率要和码率匹配。
对于h264 1080p来说，中码率6M，高码率8M，再大对画质提升不明显，过低会导致画质模糊。

帧率是影响流畅度的，跟画质无关。一般的视频为25或30帧，60帧的视频就已经非常流畅了，高于80帧则提升意义不大。

webp，网络传输的图片格式，由谷歌推出，优点是同等画质下，webp比jpg、png的体积更小。
webp还支持动图，最大分辨率可达到16383x16383，而gif只达到1024x1024。


###   安装

ffmpeg是一个免费轻巧的视频编辑命令行神器，可以使用一条命令转换格式、合并视频、剪辑片段、裁切画面、提取音频、添加字幕等。

去官网下载ffmpeg Windows程序，会在安装目录的bin下看到三个可执行文件：ffmpeg.exe、ffplay.exe、ffprobe.exe，将该目录添加到Path环境变量，就可以在命令行中使用命令了。使用`ffmpeg -version`检查是否安装设置成功。使用`ffmpeg -h`查看帮助。

### 音视频基本概念

- 编码器encoder、解码器decoder
- 比特率（帧率）bitrates
- 采样率 


-  -vcodec ：指定视频编码方式，为copy表示不重新编码。
-  -acodec ：指定音频编码方式，为copy表示不重新编码。
-  -codec copy ： 音视频都不重新编码


## 能力集列表


###  ffmpeg命令汇总

    
（1）通用参数： 
-  -fortmats ： 列出支持的文件格式
-  -codecs： 列出支持的编解码器
-  -f： 指定封装格式
-  -i  filename： 输入文件名
-  -y： 覆盖已有文件
-  -t： 指定时长，以秒为单位，精确到毫秒
-  -map：指定映射关系。例如 `-map 1:0 -map 1:1` 表示将input1的第一个流和input2的第2个流输出。

（2）视频参数

* -r ： 指定帧速率
* -s  size ：指定分辨率
* -aspect aspect：指定长宽比。例如 4:3、16:9。
* -croptop/cropbottom/cropleft/cropright   size：设置顶部/底部/左边/右边切除尺寸，例如`-croptop 20px`。
* -padtop/padbottom/padleft/padright  size ： 设置顶部/底部/左边/右边补齐尺寸，例如`-padtop 20px`。
* -padcolor color：补齐带颜色，范围000000-FFFFFF。例如`-pad #ff0000`
* -vn：取消视频
* -an：取消音频输出

    
###  格式转换

格式转换是最常使用的需求，如下示例将1.mp4转换成2.avi ：

```
ffmpeg -i  1.mp4  2.avi
```

如果指定编码可以更快的完成格式转换： 

```
ffmpeg -i 1.mp4 -c copy 2.avi
```

说明，所有相关的操作中，加上 `-codec copy` 不会重新编解码所以会加快执行速度。

###   截取视频片段

截取视频片段主要涉及三个选项：

-   -ss ：设置起始时间，格式为 `时:分:秒.毫秒 或秒数`，默认为开始00:00:00.000
-   -to ：设置结束时间，格式为`时:分:秒.毫秒 或秒数`，默认为视频结束。
-   -t ： 设置持续时间，单位为秒，精确到毫秒。

注意：-to 和-t 不能同时使用。

例如，指定起始和终止时间：
 
```sh
ffmpege -i  1.mp4  -ss 00:01:02.056 -to 00:02:02.056 -codec copy 2.mp4  
```

指定起始时间和持续时间段：

```sh
ffmpege  -i  1.mp4   -ss 01:02:03.568  -t  80.098   -codec copy 2.mp4
```

### 去掉音频或去掉视频

`-an`选项表示取消音频输出：

```sh
ffmpeg  -i  input.mp4  -an  -vcodec  copy  output.mp4
```

`-vn` 选项表示去掉音频。
使用-vn选项取消视频输出，就可以提取音频了：
```sh
ffmpeg  -i  1.mp4  -vn  -acodec copy   2.mp3
```


### 合并视频

合并视频分两步。首先准备1个文本文件如1.txt存放要合并的文件名，内容示例如下：

```
file '1.mp4'
file '2.mp4'
file '3.mp4'
```

然后执行如下命令：

```
ffmpeg  -f  concat  -i 1.txt  -c copy output.mp4
```

output.mp4就是合并后的文件。


### 裁剪画面尺寸

裁剪视频画面的语法如下：

```sh
ffmpeg -i  1t.mp4   -vf  crop=w:h:x:y  2.mp4 
```
crop的参数，分表代表宽，高，起始x，起始y。 起点是视频的左上角。

示例如下；

```sh
ffmpeg  -i  1.mp4  -vf   crop=2560:1440:0:0   2.mp4
```




### 合并多个音频

合并音频示例如下：
```sh
ffmpeg -i input1.mp3  -i input2.mp3 -filter_complex  amix=inputs=2:duration=shortest  output.wav
```

duration=shortest表示按照长度较短的音频文件的长度作为输出的长度。

### 调整音量

将音量减半然后输出：

```sh
ffmpeg  -i 1.wav -af  "volume=0.5" 2.wav
```

### 音频淡入淡出

音频淡入示例如下，`afade=t=in:ss:0:d=5`表示前5秒淡入音频：

```sh
ffmpeg  -i  1.wav  -filter_complex  afade=t=in:ss:0:d=5  2.wav
```

音频淡出示例如下，`afade=t:out:st=200:d=5`表示从200秒开始，做5秒的淡出效果：

```sh
ffmpeg  -i  input.wav  -filter_complex  afade=t=out:st=200:d=5  output.wav
```

### 声音变速不变调

如下示例中，atempo=0.5表示按照0.5的速度输出，结果是长度将变为2倍。
```sh
ffmpeg  -i  1.mp3  -filter_complex   atempo=0.5   2.wav
```

### ffplay的用法

播放

* 播放视频：ffplay  input.mp4。   按下s进入帧模式，按一次s就往前播放一帧。
* 播放音频：ffplay  input.mp3 。
* 指定播放音量:  ffplay -volumn  60  -i input.mp4
* 全屏播放：ffplay -i input.mp4 -fs

设置播放窗口

* -window_title ：指定标题
* -noborder：窗口无边框
* -alwaysontop：窗口置顶
* -left/top <size>：播放窗口的位置
* -x/y <size>：设置播放窗口的宽度/高度


    
## 水印

###   文字水印

```
ffmpeg -i  input.mp4 -vf "drawtext=text='示例文本':fontsize=100:x=w/2:y=h/2:fontcolor=white@0.5:shadowy=2"  output.mp4
```

用冒号把参数都隔开。

-  -vf： 表示设置视频滤镜（vf即video filter得缩写）
-  text： 文字内容
-  fontfile： 字体位置(C\\:/windows/fonts/simhei.ttf)，汉字可以使用系统字体
-  fontcolor=white@0.5 ： 文字颜色，0.5表示不透明度
-  box=1： 添加白色背景的文本框，默认值0
-  boxcolor=black@0.5 ： 文字框背景颜色为黑色，0.5是不透明度
-  x、y：横纵坐标，以左上角为顶点，可使用t、w、h作为参数
- enable='between(t,10,20)' ： 表示第10秒到第20秒内显示

如果要设置时间水印，设置text 的值：

```
text='%{localtime\:%Y-%M-%d %H:%m:%S}
```

###   图片水印

```
ffmpeg -i inputfile -vf  "movie=marklogo.png,scale= 100:100[watermask]; [in] [watermask] overlay=x=50:y=50 [out]" -y outfile
```

-  movie：添加滤镜，值为图片的路径
-  scale：水印图片大小，水印长度＊水印的高度
-  overlay：表示滤镜位置，从左上角开始计算

```
ffmpeg -i input.mp4 -vf "movie=input2.mp4,scale=200x200[inner];[in][inner]overlay=x=10:y=10[out]" output.mp4
```

movie=input2.mp4[inner] 用于设置过滤器，并命名为inner，可以随意命名。

movie的值可以是图片，也可以是视频。

scale用于设置画中画的宽高。

[in][inner]overlay=x=10:y=10[out] 将输入视频和名为inner的视频进行叠加，位置为（10,10）。in表示输入视频，out表示输出视频。

对于位置，如果要根据画面的宽高设置，可以使用如下内置变量：
-  main_w : 表示输入视频的画面宽度 
-  main_h : 表示输入视频的画面高度 
-  overlay_w : 表示叠加视频的宽度
-  overlay_h : 表示叠加视频的高度 

文字跑马灯

```
ffmpeg -i input.mp4 -vf "movie=input2.mp4,scale=200x200[vedio_inner];[in][vedio_inner]overlay=x=mod(50*t,main_w):y=abs(sin(t))*main_h*0.7[out]" output.mp4
```

将 x 的值设置为 mod(50*t,main_w) 实现的是 每秒 向右移动 50 像素的执行效果。

设置 y 的值为 abs(sin(t))*main_h*0.7 , 这是在 y 方向以正弦函数进行运动。


    
    
    
    
    
##  字幕


###   字幕

载入ass字幕播放：

```
ffplay -vf  subtitles=1.ass  1.mp4
```

载入srt字幕播放：

```
ffmpeg -i input.mp4  -vf  " subtitles=1.srt:force_style='Fontsize=20,PrimaryColour=&HFFFFFF&,marginV=50' " 1.mp4
```

-  subtites： 指定字幕文件
-  FontName：字体名称
-  FontSize：字体大小
-   Alignment：以数值表示的对齐方式。常见的中下为2、正中为10
-   PrimaryColour=&HFFFFFF&：字幕颜色，主要两边加&
-  OutlineColor：边框颜色，&后面的两位为透明度
-  MarginV：字幕距离底部的距离

提取字幕文件（视频有字幕的前提下）：

```
ffmpeg -i  1.mp4   -vf  subtitles=1.srt
```

force_style常用参数如下：



##  复杂滤镜

###  常见的复杂滤镜

-  trim： 时间切片
-  drawtext：文字
-  subtitles： 字幕
-  crop： 画面裁切
-  scale： 	画面缩放
-  concat： 前后拼接
-  rotate： 旋转画面
-  overlay	： 图片或视频水印-  movie： 加载第三方视频



###  复杂滤镜的语法

- 分号： 操作大步骤
- 等号： 属性和值
- 冒号： 细分属性和值

对于分号分隔的步骤，给一个自定义名称，指代中间步骤

[1:v]scale=176:144[logo] ; [0:v][logo]overlay=x=0:y=0

分成3个拷贝，分别操作
[0:v]split=3[tmp1][tmp2][tmp3]; 

[0:v] 第一个文件的视频流
[0:v:0] 第一个文件的第一个视频流

在滤镜的每一步之后，通常会指定一个步骤名称，便于map选取。

ffmpeg -i video.mkv -i image.png -filter_complex '[0:v][1:v]overlay[out]' -map
'[out]' out.mkv


###  subtitles字幕滤镜
- filename
- force_style

movie贴图滤镜

amovie 音频滤镜

###   drawtext 文字滤镜

参数：

基本参数：

text: 必须。要绘制的文本内容。可以包含特殊字符和转义序列，如换行符 \n。

fontfile: 字体文件的路径。如果要使用非系统默认字体，需要指定此选项。

font: 字体名称。使用系统内建字体时，直接指定字体名称。可以包含样式信息，如 Arial Bold。

fontsize: 字体大小（单位：像素）。

fontcolor: 字体颜色。可以使用 0xRRGGBB、rgb(R,G,B)、rgba(R,G,B,A)、hexcolor、[0-100%]gray 或颜色名称（如 red）。

shadowcolor: 文本阴影的颜色。设置方式同 fontcolor。

shadowx, shadowy: 文本阴影相对于文本的横向和纵向偏移量（单位：像素）。

x, y: 文本在视频帧上的起始位置。可以使用绝对像素值，也可以使用相对表达式（如 w/2 表示视频宽度的一半）。

文本样式：

text_shaping: 开启（1）或关闭（0）文本形状优化，适用于阿拉伯语、希伯来语等从右向左书写系统的语言。

bordercolor, borderw: 边框颜色和宽度（单位：像素）。为文本添加边框。

boxcolor, box: 绘制背景矩形的颜色和是否开启（1）背景矩形。当开启时，可以配合 boxborderw（边框宽度）和 boxpadding（内部填充）使用。

alpha: 文本的透明度（0.0 - 1.0）。

shadowopacity: 文本阴影的透明度（0.0 - 1.0）。

动态效果：

timecode: 使用时间码作为文本内容。可以指定格式，如 %{pts} 或 %{localtime}。

rate: 文本更新速率（帧率）。默认为视频帧率。

fixed_linesize: 固定行高，使多行文本保持一致的高度。

reload: 是否实时重载文本文件（当 textfile 参数用于指定文本文件时）。

高级选项：

expansion: 控制字符串的扩展方式，如 none、strftime（时间戳格式化）或 normal（默认，支持简单变量替换）。

textfile: 从文件中读取文本内容。支持按行读取，每行对应视频帧中的一个文本实例。

eof_action: 当文本文件读取到末尾时的行为，如 endall（停止播放）、repeat（从头开始循环读取）或 pause（暂停播放）。

text_length: 文本的最大长度。超过此长度的文本将被截断。

tabsize: 制表符宽度（单位：像素）。

wrapwidth: 自动换行的宽度限制（单位：像素）。超出此宽度的文本将被折行。

line_spacing: 行间距（单位：像素）。

kerning, letterspacing: 字间距调整（单位：像素）。

fontconfig_match: 使用 fontconfig 库进行字体匹配。对于复杂的字体配置，可以提高匹配准确度。

ass: 将 drawtext 参数解析为 ASS 字幕格式，支持更丰富的文本样式和动画效果。

表达式与函数：

许多参数（如 x, y, fontsize 等）支持使用数学表达式，可以包含以下函数：

rand(min,max): 返回指定范围内的随机数。

gte(a,b): 检查 a 是否大于等于 b，返回 1（真）或 0（假）。

lte(a,b): 检查 a 是否小于等于 b，返回 1（真）或 0（假）。

eq(a,b): 检查 a 是否等于 b，返回 1（真）或 0（假）。

if cond val_true val_false: 根据条件 cond 返回 val_true 或 val_false。

between(val,min,max): 检查 val 是否在 min 和 max 之间（包含边界），返回 1（真）或 0（假）。

isnan(val): 检查 val 是否为 NaN（Not-a-Number），返回 1（真）或 0（假）。

isinf(val): 检查 val 是否为无穷大或无穷小，返回 1（真）或 0（假）。

isnan_or_inf(val): 检查 val 是否为 NaN 或无穷大/小，返回 1（真）或 0（假）。

max(a,b,...), min(a,b,...): 返回一组数值中的最大值或最小值。

hypot(a,b): 计算直角三角形两条边长 a 和 b 的斜边长度。

round(val): 将 val 四舍五入到最接近的整数。

trunc(val): 截断 val 到整数部分，去掉小数点后的部分。

ceil(val): 向上取整，将 val 转换为大于或等于它的最小整数。

floor(val): 向下取整，将 val 转换为小于或等于它的最大整数。

rint(val): 朝最接近的整数取整，遵循 IEEE 754 规范。

sqrt(val): 计算 val 的平方根。

log(val[,base]): 计算 val 的自然对数（默认）或以 base 为底的对数。

exp(val): 计算 e（自然对数的底数）的 val 次幂。


overlay贴图滤镜
x
y
可使用main_w、main_h、overlay_w、overlay_h


concat拼接

ffmpeg -i 1.mp4 -i 2.mp4 -i 3.mp4 -filter_complex '[0:0] [0:1] [1:0] [1:1] [2:0] [2:1] concat=n=3:v=1:a=1 [v] [a]' -map '[v]' -map '[a]’  output.mp4

[0:0] [0:1] [1:0] [1:1] [2:0] [2:1] 分别表示第一个输入文件的视频、音频、第二个输入文件的视频、音频、第三个输入文件的视频、音频。

concat=n=3:v=1:a=1 表示有三个输入文件，输出一条视频流和一条音频流。[v] [a] 就是得到的视频流和音频流的名字。

movie=part1.mp4, scale=512:288 [v1] ; amovie=part1.mp4 [a1] ;
movie=part2.mp4, scale=512:288 [v2] ; amovie=part2.mp4 [a2] ;
[v1] [v2] concat [outv] ; [a1] [a2] concat=v=0:a=1 [outa]

part1.mp4缩放，步骤v1； part1.mp4 提取音频，步骤a1； part2.mp4缩放，步骤v2； part2.mp4提取音频，步骤a2；
v2贴到v1上面，步骤outv； a2衔接到a1后面，输出0条视频流，1条音频流，步骤outa。

scale
w 宽度
h 高度
iw、ih、

###  crop
w
h
x
y
crop=w=100:h=100:x=12:y=34
也可以直接写 w:h:x:y  crop=100:100:12:34
使用in_w、in_h、out_w、out_h内置变量

crop=in_w/2:in_h/2:(in_w-out_w)/2+((in_w-out_w)/2)*sin(n/10):(in_h-out_h)/2 +((in_h-out_h)/2)*sin(n/7)

###   select

select=between(t\,10\,20)

ffmpeg -i   input.mp4  -vf "select=between(t\,10\,20)" output.mp4 -y

## 录屏


```
ffmpeg  -f gdigrab -video_size 1920x1080 -i desktop -c:v h264  -b:v 10M -preset slower  -qscale 0.01 output.mp4 -y
```

-f gdigrab
- framerate 帧率
- -offset_x
- -offset_y
- -video_size 
- -i desktop
- -i  title=Calculator ：步骤标题为Calculator 的窗口
-preset slower 质量，slower表示质量较好
-qscale 0.01 压缩

列出可用的音视频设备：

```
ffmpeg -list_devices true -f dshow -i dummy
```

摄像头： ov9734_azurewave_camera
麦克风： Microphone (2- High Definition Audio Device)
扬声器： virtual-audio-capturer
桌面： desktop

```
ffmpeg -f dshow -i video=“UScreenCapture”：audio=“Stereo Mix （Realtek High Definition Audio）” “C：\videos\out.mp4”
```

如果要停止录制，请在 FFmpeg 命令提示符窗口中输入 q。

录音：

ffmpeg -f dshow -i audio="Microphone (2- High Definition Audio Device)" output.wav

同时录屏与录音：

ffmpeg -f gdigrab -framerate 30 -i desktop -f dshow -i audio="Microphone (2- High Definition Audio Device)" output.mp4

ffmpeg -f gdigrab -framerate 30 -i desktop -f dshow -i audio="Microphone (2- High Definition Audio Device)"  -i audio="virtual-audio-capturer"  output.mp4 -y

ffmpeg -f dshow -i audio="Microphone (2- High Definition Audio Device)" -f dshow -i audio="virtual audio capturer" -filter_complex
amix=inputs=2:duration=first:dropout_transition=2 -f dshow -i video="screen-capture-recorder" -y av-out.flv

# Git

##  安装Git

要使用Git有两种方式：使用命令行和使用图形界面。笔者更推荐使用命令行工具，原因如下：

-  命令行的命令是不变的、通用的，而图形界面有很多，或许我们碰到了一个更好的图形界面又要去再次学习，这是浪费精力的。
-  学习命令行能够让我们“知其所以然”，了解版本控制的核心原理。这条原则对其它的软件也同样适用。
-  命令行效率更高。很多人可能觉得图形界面的效率更高，其实不然，与其满屏幕的移动鼠标、寻找按钮，不如一行命令或一个脚本来得轻快。当然，这条原则对其它软件可能不适用。

既然决定使用Git命令行，现在就需要安装Git了。

访问 `https://git-scm.com/ ` ，在页面右下角会有一个醒目的 ` Download for Windows ` 按钮，点击下载安装包，然后一步步使用默认设置安装即可。


 ![pkceOsO.png](https://s21.ax1x.com/2024/06/29/pkceOsO.png)

可以选择安装完整版或便携版，如果安装便携版，需要解压之后将git.exe所在的目录添加到PATH环境变量，不过由于我们之后会频繁的用到Git命令，所以更推荐安装完整版。

安装好Git之后，打开终端工具，输入如下几个命令检测是否安装成功：

```
git --help    # 查看帮助
git --version   # 查看git版本号
```

如果没有错误信息，则表示安装成功。

##   配置SSH登录

我们使用Git命令不可避免的要跟Github打交道。要将本地文件上传到Github的仓库，就需要身份鉴权，基于安全的考量，已经不推荐用户名密码的方式，而推荐SSH非对称秘钥的方式。

首先进入Bash环境，运行如下命令：

```
ssh-keygen -t rsa -C "提示信息"
```

ssh-keygen常用选项如下：

-   ` -f filename `  ： 要保存的文件名，包含路径
-   ` -t ` ：  秘钥类型，一般为rsa
-   ` -b ` ：  指定秘钥长度，一般为2048或4096

这里的提示信息可以随意写，一般为自己的邮箱。

运行上述命令后，终端会问你几个问题以进一步完成秘钥文件的生成，其它的可以直接回车以同意默认设置，最重要的是秘钥文件名，默认是`C:\Users\用户名/.ssh/id_rsa`，秘钥文件一般放在家目录，名称可以随便取。如果已经存在同名的秘钥文件记得要修改以免覆盖其它秘钥文件。我们这里使用默认设置。

然后就会在家目录生成两个文件： ` id_rsa `  和 ` id_rsa.pub `。

带有pub的是公钥文件，可以分发在网络上。另一个是私钥文件，一定不能泄露。

使用VSCode或记事本打开id_rsa.pub文件，内容只有一行，全选复制。

打开浏览器，输入 `https://github.com/settings/keys ` ，点击右边的 ` New SSH Key `，在Title文本框输入一些信息，在Key文本框粘贴我们刚刚复制好的公钥文本，点击 ` Add SSH Key ` ，至此ssh秘钥配置完成。

回到本地bash环境，运行如下命令，如果输出内部包含Successfully表示配置成功。

```
ssh -T git@github.com
```

当然，第一次配置可能不会成功，遇到问题首先多尝试几次，然后将输出内容粘贴到搜索引擎以寻求其它实践者的经验。

另外，由于Github本身的不稳定性，有些时候可能需要一点科学方法才能连上。


##   配置用户名和邮箱
	
在以后提交到仓库的时候需要指定用户名和邮箱，这里提前进行全局设置，以后默认使用该身份。使用如下命令设置用户名和邮箱：

```
git config  --global  user.name "姓名"
git config  --global  user.email "邮箱"
```

##  Git Bash

安装Git后默认会同时安装Git Bash，该工具提供了非常多开箱急用的Linux原生命令，例如cd、touch、vim、sed、grep等。如果要学习Linux Shell，就可以使用该工具。

进入Bash环境的方式有两种。第一种是在桌面或任意文件夹内右击，选择` Git Bash Here ` ，这会以该文件夹为工作目录进入Bash环境。第二种是在任意终端输入` bash ` 即可进入bash环境，工作目录保持不变。

在bash环境下，文件路径会使用Linux风格的 ` / `，例如Windows风格的 ` D:\test ` 在bash环境下就是 `/d/test `。使用 ` cd `切换工作目录时应该注意习惯的转换。

bash也支持家目录，使用 ` cd ~ `会回到用户的个人目录，其实是进入了Windows系统的 ` C:\Users\用户名\ ` 文件夹。

##   Git的原理和 .git 文件夹

- 工作区：  在这里开始编辑。
- 暂存区：  在修改文件后，通过git add 将修改添加到暂存区。暂存区的本质其实是要提交到仓库的文件列表。
- 存储库： 使用git commit -m '提交说明'， 从暂存区提交到仓库

Git的本质直观表现上就是.git文件夹。

在克隆Github仓库的时候，默认会在本地新生成一个文件夹，文件夹名称就是仓库名。除了将仓库内的所有文件都拷贝到这个文件夹内以外，还有一个至关重要的动作，就是在新文件夹内包含一个隐藏文件夹——.git。

.git文件夹可以说就是Git的精华所在，该文件夹完整准确的记录了本地仓库所有的操作，包括修改、删除、新增等等。同时，还记录了分支名、远程仓库地址等等，所以，我们无需手动添加远程仓库地址，直接使用git push即可将本地的更改推送到Github。

##  git clone

git clone的作用是将仓库下载到本地，语法如下：

```
git clone https://github.com/用户/仓库.git
```

## 使用git clone 而不是 git init

由于大多数情况下我们是要将本地仓库推送到远程Github仓库，所以推荐先在Github初始化好仓库，然后拷贝仓库地址，使用git clone。因为这样在本地的.git文件夹内就已经包含了远程地址，之后在本地完成编辑和提交后直接使用git push就可以推送到克隆的那个仓库。

如果使用git init，就要事先使用git remote添加远程仓库，而且很容易造成本地仓库和远程仓库的冲突。

因此，推荐使用git clone而不是git init。

##   git add

git add的作用是在编辑之后，将更改统一提交到暂存区：

```
git add .
```

需要说明的是，在2.x版本之后，`git add .`和`git add -A`的作用是完全一样的。

##   git branch分支管理

命令	|	作用
---	|	---
` git branch ` 	|	查看本地分支，带`*`为当前本地分支
` git branch -r `	|	查看远程的分支，带`*`为当前远程分支
` git branch xxx ` 	|	新建一个名为xxx的分支
` git checkout xxx` 	|	切换当前分支为xxx分支
` git branch -m xxxx ` 	|	将当前分支重命名为xxxx
` git branch -b yyy ` 	|	新建yyy分支并切换到新分支
` git branch -d xxx `	|	删除xxx本地分支
` git branch -D xxx `	|	强制删除xxx本地分支


##   远程仓库管理

命令	|	作用
---	|	---
` git remote `	|	显示远程仓库
` git remote -v `	|	显示远程仓库的详细信息
` git remote add origin 仓库url `	|	新建远程仓库，origin只是命名习惯，可以任意取名，下同
` git remote rm origin `	|	删除远程仓库
` git remote rename origin 新名称 ` 	|	重命名远程仓库
` git push origin 本地分支:远程分支 `	|	将本地仓库的分支上传到远程仓库的分支
` git push origin master `	|	一般情况下，本地和远程仓库的分支名均为master，那么可以这样简写
` git push --force origin 本地分支:远程分支 `	|	忽略其它的提交，强制推送，`--force`等同于`-f`，注意`--force`选项谨慎使用。
` git pull `	|	将本地的仓库与远程仓库对齐

##  git commit

git commit 的作用是将暂存区的内容提交到本地仓库，语法如下：

```
git commit -m '提交说明'
```

注意，这个提交说明一定要写，否则git不让提交。


##  git push

git push的作用是将本地仓库推送到远程仓库，如果之前是用git clone下载下来的仓库，那么在.git文件夹会自动记录远程仓库的地址，那么可以直接运行如下命令推送到远程仓库：

```
git push
```

如果之前是用git init 初始化的本地仓库，那么就需要使用git remote add 先添加远程仓库，一般名称为origin，然后运行：

```
git  push  origin  master:master
```


## 个人项目Git常用的命令

对于个人项目，例如GitHub Pages静态博客页面，往往只需要先将仓库下载下来，然后修改，然后提交推送到Github，这时候不需要用到分支、标签等特性，常用的也就如下几个命令：

命令	|	作用
|---	|	---|
` git clone 仓库url`	|	克隆仓库到本地
` git add .  `	|	将所有改动提交到暂存区
` git commit -m '提交说明' `	|	将暂存区提交到本地仓库
` git push `	|	将本地仓库同步到Github

##  查看提交历史

查看提交历史包括两个命令：git log、 git reflog，这两个命令的区别是后者还记录了回退操作。

使用git reflog 输出关键信息，而且还包括退的记录，推荐使用。

要查看提交的历史，使用git log，这会从近到远依次列出每一次的提交。

还支持根据提交信息中的关键字来过滤提交历史。你可以使用--grep选项并指定要搜索的关键字。以下是使用该选项的示例命令：

```
git log --grep= '关键字'
```

关键字支持通配符。

不过，git log输出的内容较多，第一次不会显示完整，往往需要按住空格以输出更多内容，按q退出输出。推荐使用git reflog。


##   回退

首先，使用git reflog列出提交记录，找到要回退的那条记录的commitID。

然后，使用git checkout命令回退到那次提交对应的状态：

```
get checkout commitID
```

##  标签

Git 可以给仓库历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（ v1.0 、 v2.0 等等）。

在 Git 中列出已有的标签非常简单，只需要输入 git tag。

你也可以按照特定的模式查找标签。 例如，Git 自身的源代码仓库包含标签的数量超过 500 个。 如果只对 1.8.5 系列感兴趣，可以运行：

```
git tag -l "1.8.5*"
```

Git 支持两种标签：轻量标签（lightweight）与附注标签（annotated）。轻量标签很像一个不会改变的分支——它只是某个特定提交的引用。而附注标签是存储在 Git 数据库中的一个完整对象， 它们是可以被校验的。推荐使用附注标签。

给某次提交打标签，并附上该标签的说明：

```
git tag -a v1.0 9fceb02 -m "Release 1.0"
```

-a选项后接标签名称，其后接commitID，-m选项为该标签的附件说明。


# Linux的进程和服务

##  服务


### 进程和服务的区别


进程是程序正在运行的实例，是运行着的程序，每个进程都占用系统资源，包括内存、I/O 等。每个进程必须有唯一的进程ID，且在操作系统的进程管理器中也有对应的进程控制块（PCB）实体。

服务是在操作系统上运行的一种保持长期存在的非交互性进程，它主要负责提供特定的系统或网络服务，以便满足来自客户端的请求或负责某个定时任务的执行，使操作系统保持运行。

可以简单的理解为，进程一般是是暂时的、一次性的、前台执行的、用户直接交互的；而服务一般是持续性的、后台执行的、非交互性的。

### 初始化系统的分类

Linux所提供的持续性服务由守护进程实现，Linux将管理每一个守护进程的方法作为一个服务，并且使用了某一种初始化系统，也叫init系统，主流的init系统分为两种：

- Sysinit  源于20世纪80年代创建的传统init系统，目前，大多数老版本UNIX和Linux采用此init系统。
- systemd  大多数Linux发行版的最新版本都采用了systemd作为 init系统，例如centos7.x及以后，Ubuntu15及以后。

所以，应该将重点放在systemd上。



###  systemd的单元、服务单元、目标单元

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

###  systemd单元的配置文件

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

### 启停服务

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


## 图形界面

### X Window System

从英文字母看，X在W（Window）后面，所有称为X，有下一代窗口之意。在Unix-like上的图形用户接口（GUI）被称为X或X11。X11只是一个软件而不是操作系统。

X Window分为X Server和X Client两个组件。X Server管理硬件，X Client管理应用程序。

由于每个X Clinet是独立的，并不知道其它的X Clinet，这样就会造成GUI界面的显示冲突，所以使用X Window Manager进行管理。X Window Manger，也叫窗口管理器，是一个特殊的X Client，负责管理所有的应用程序GUI。著名的X Window Manager有GNOME、KDE。

随着技术的发展，X Window窗口管理系统正逐步被淘汰，而被新一代图形界面管理系统——Wayland取代。


X Window System使用C/S架构,服务端和客户端可以基于网络通信。

客户端(也就是各种软件)将绘图请求发给服务端,服务端操纵显卡或视频终端把位图图像绘制出来,并处理键盘鼠标的事件,发送给客户端.注意,和人交互的是服务端.



- 服务端监听到显示器、鼠标、键盘事件，将事件信息（例如用户在哪个位置点了一下）发送给客户端，请求指示“此时应该怎么显示？”
- 客户端接收到该事件信息，计算出显示逻辑（例如在某个地方显示一个图形），将绘制指令发送给客户端。注意，客户端没有绘制能力，它只发送绘制指令。
- 服务端接收到绘制指令，然后调用图形API“画”出来（图形、文字等）。
- 窗口管理器协调各个客户端的堆叠等状态。

为什么需要窗口管理器？因为多个客户端是层叠的，谁在前面谁在后面客户端自己是不知道的，只能在窗口管理器中汇总才能知道。

通俗点解释。

- 服务端说： 用户在坐标(50,50)处点了一下，这种情况该怎么显示？
- 客户端说：这种情况应该在坐标（100，100）处画一个笑脸图形。
- 服务端说：收到！我马上派遣调用图形API在（100，100）出画一个笑脸图形。

但这种情况只能同时显示一个gui程序。为了管理众多的窗口怎么在屏幕上显示,需要窗口管理器(Window manager).窗口管理器可以实现一个屏幕上显示多个X程序,实现调整程序大小,标题栏,最大化,最小化,关闭按钮,虚拟桌面这些功能.没有WM,一次只能运行一个GUI程序,而且分辨率锁死,显然很不符合使用习惯.

窗口管理器的例子：
- 服务端对客户端A说： 我监听到用户在坐标(50,50)处点了一下，这种情况该怎么显示？
- 客户端A对窗口管理器说：我要在（50，50）处画一个笑脸。
- 服务端对客户端A说： 我监听到用户在坐标(80,150)处点了一下，这种情况该怎么显示？
- 客户端B对窗口管理器说：我要在（80，150）处写一段文本。
- 服务端对客户端C说：我监听到用户点击了全屏按钮，这种情况该怎么显示？
- 客户端C对窗口管理器说：用户让我全屏显示窗口，并且要在其它客户端的前面。
- 窗口管理器：你们的指令都收到了，我来汇总出一个总的绘制指令xxxxxxxx。
- 窗口管理器对服务端说：我的总绘制指令是xxxxxxx，你负责给我显示出来。
- 服务端：收到！我马上派遣驱动程序显示出来。
### Wayland

Wayland将X中的Server和窗口管理器整合到一起作为服务端，称为合成器（Compositor），架构上只分了客户端和合成器两大部件。

- 客户端（Wayland Client），直接计算各自界面的渲染缓冲数据，然后自行绘制，并通知server更新了哪个区域。
- 合成器（Wayland Compositor），汇总所有客户端的更新通知，实现各界面窗口“合成”，最后交给显示驱动绘图，呈现最终效果。

client和server端都会发生绘制。client绘制本地的窗口内容，server端主要用于合成时渲染。两边都可独立选择用软件或者硬件渲染。

为什么需要通知server再次合成？因为多个客户端窗口一般是层叠的，谁在前面谁在后面客户端自己是不知道的，只有集中在server中处理层叠关系。


通俗解释：

- 合成器对客户端A说： 我监听到用户在坐标(50,50)处点了一下
- 客户端A在（50，50）处直接调用图形API画了一个笑脸，然后对Server说 ：我现在通知你，左上角xx区域已经更新了。
- 合成器对客户端B说： 我监听到用户在坐标(80,150)处点了一下。
- 客户端B直接调用图形API在（80，150）处写一段文本，然后对Server说：我现在通知你你，区域yyyy已经被更新了。
- 合成器对客户端C说：我监听到用户点击了全屏按钮。
- 客户端C直接调用API重新绘制了全屏下的图形，然后对Server说：全屏区域已经更新了。
- 合成器说：你们的通知都收到了，我会汇总你们的更新，看看谁应该在前面显示谁应该被遮挡，然后派遣图形驱动重新合成一个最终的效果呈现给用户。


总之，x Window的特点是，client是无法调用图形API，只能将指令发送给server，让server去调用图形API绘制。也就是说，x server成为了client和图形API的“传话筒”，但是为什么不让client与图形API直接通信呢？于是Wayland应运而生。Wayland先进的地方在于，每个client都可以自行调用图形API绘制自己的窗口，server汇总信息，调用图形API汇总最终的合成界面。

这里的图形API指的是OpenGL、Direct X、metal、vulkan，下面还有图形驱动程序，再下面就是显卡。Vulkan是一个高性能的图形API，Wayland插上Vulkan的翅膀一定会带来更大的性能提升。



# PowerShell



## 别名

- Get-Alias 	 获取当前会话中的所有别名
- New-Alias 	 创建新别名
- Set-Alias 	 创建或更改别名
- Remove-Alias 	 删除别名
- Export-Alias 	 将一个或多个别名导出到文件
- Import-Alias 	 将别名文件导入 PowerShell





## 获取内置别名：Get-Alias

获取以p开头的别名：

```
Get-Alias -Name p*
```

##  创建别名

```
New-Alias -Name gas -Value Get-AuthenticodeSignature
Set-Alias
```


## 内置的常用别名

```
cat -> Get-Content
cd -> Set-Location
cp -> Copy-Item
del -> Remove-Item
dir -> Get-ChildItem
echo -> Write-Output
gc -> Get-Content
gl -> Get-Location
ls -> Get-ChildItem
mv -> Move-Item
rm -> Remove-Item
sc -> Set-Content
write -> Write-Output
```


##  具有参数的命令的备用名称

可以将别名分配给 cmdlet、脚本、函数或可执行文件。 不能为命令及其参数分配别名。 例如，可以将别名分配给 Get-Eventlog cmdlet，但不能将别名分配给 Get-Eventlog -LogName System 命令。

这种情况的解决办法是：可以创建包含命令的函数。 若要创建函数，请键入单词“function”，后跟函数的名称。 键入命令，并将其括在大括号 ({}) 中。

##创建文件或文件夹
使用如下命令创建文件：


```sh
New-Item  1.txt -ItemType file
New-Item  2.txt   # 简写形式
```

使用如下命令创建文件夹：

```sh
New-Item  folder -ItemType Directory
```

使用-Force选项覆盖已存在的文件或文件夹。

##  读取文本文件内容

Get-Content 将从文件读取的数据视为数组，其中每行文件内容为一个元素。

```sh
$arr = Get-Content  .\1.md  -encoding utf8
$arr  # 逐行输出文件的每行内容
```

使用utf8是为了避免中文文件的乱码。



可以通过检查返回的内容的长度来确认此点：



```sh
$ (Get-Content -Path C:\boot.ini).Length
6
```

如下命令将剪贴板读取到数组中：



```sh
$arr = Get-clipboard 
$arr[0]  # 第一行内容
```

##多命令组合

## 管道

使用管道运算符将两个命令连接起来，管道符是一条竖线。注意，竖线两边必须有至少一个空格。管道的格式如下：

```
命令1 |  命令2
```

## 子命令

可以将命令的输出值赋给另一个变量而不是打印出来。

```
$files = ls
```

如果存在空格，只需要用圆括号括起来即可：

```
> $files = (ls *.txt) #得到后缀为txt的文件列表

> echo (ls *.txt).length #输出后缀为txt的文件数量
```

## 单行多命令

```
(mkdir test) -and (cd test)
```

Copy-Item命令的作用是复制文件或文件夹，例如：

```sh
Copy-Item -Path 1.txt -Destination 2.txt
```

如果文件已存在，则会失败，使用-Force选项覆盖：

```sh
Copy-Item -Path 1.txt -Destination 2.txt -Force
``

以下命令以递归方式将文件夹 C:\temp\test1 复制到新文件夹 C:\temp\DeleteMe：

```sh
Copy-Item C:\temp\test1 -Recurse C:\temp\DeleteMe
```

下面的命令将 C:\data 中任意位置包含的所有 .txt 文件都复制到 C:\temp\text：

```sh
Copy-Item -Filter *.txt -Path c:\data -Recurse -Destination C:\temp\text
```

## 工作目录

打印工作目录

```
get-location
```

切换工作目录

```
Set-Location $HOME\Desktop
```

## 相对路径和绝对路径

相对有两个符号：
- `.` 一个点号，当前目录
- `..`   两个点号，上级目录

回到上一级：

```
Set-Location ..   
```

很多时候需要获取剪贴板的内容，PowerShell提供了内置的命令Get-Clipboard。

复制一段文本，运行如下命令在控制台输出剪贴板内容：

```sh
Get-Clipboard
```

如下命令将剪贴板读取到数组中：

```sh
$arr = Get-clipboard 
$arr[0]  # 第一行内容
$arr[-1]  # 最后一行内容
```

使用h（Get-History的别名）获取历史记录。

F7显示历史记录

键入一个或多个字符，然后按 F8。 再次按 F8 会查找下一个实例。
`#text` Tab - 在历史记录中搜索 `text` 并返回最近的匹配项。 如果重复按 Tab，将循环访问历史记录中的匹配项。

使用Get-ChildItem列出目录下的文件列表，类似与Linux的ls命令。

```sh
Get-ChildItem -Path   C:\ 
Get-ChildItem -Path C:\ -Force #  显示隐藏项
```

## 使用通配符

可以使用通配符以便缩小文件列表范围。通配符主要有三种：

*	表示任意数量的字符
?	表示任意单个字符

例如，若要在 当前文件夹中查找带有后缀 .md 并且基名称中正好有五个字符的所有文件，请输入以下命令：

```sh
Get-ChildItem ?????.md
```

若要在 当前目录中查找以字母 x 开头的所有文件，请键入：

```
Get-ChildItem x*
```

若要在 当前目录中查找所有md文件，请键入：

```
Get-ChildItem *.md
```

若要查找名称以“x”或“z”开头的所有文件，请键入：



```sh
Get-ChildItem [xz]*
```

##  删除文件和文件夹

使用如下命令删除文件和文件夹：

```sh
Remove-Item 1.txt 
Remove-Item folder -Recurse
```

在删除文件时默认需要二次确认是否删除，使用 -Recurse不询问。

在powershell中，一切皆对象。对象由三种类型的数据组成：对象类型、其方法和属性。

例如定义了一个字符串：
```
$str = "hello,world"
```

使用如下命令查看该字符串对象的成员：

```sh
get-member  $str
```
这会输出字符串对象的所有属性和方法。

Linux输出的结果是纯文本，而Powershell输出的结果为对象或包含对象的集合。

使用where-object命令从字段中筛选匹配的值，该命令的别名是where和?。

例如，get-alias的输出结果如下，有两个字段：CommandType和Name

```
CommandType     Name  
|-----------  ----     
Alias           % ->  ForEach-Object
Alias           ? ->  Where-Object
......
```

要筛选出包含where的别名，可以使用：

```
get-alias | where-object {$_.name -contains "where"}
```


where-object会依次迭代集合中的每个对象，`$_`表示当前对象。

还可以省略$_ 和 花括号，如下是简写模式：

```sh
get-alias | where-object name -contains "where"
```

还可以使用？作为别名，如下是最精简的方式：

```
get-alias | ? name -contains "where"
```

## out-host

out-host是管道命令，接受管道前一部分传递过来的命令，然后将数据发送到主机窗口。

```sh
ls  | out-host
```

注意，out-host只能作为管道命令，不能写在一行命令的开头。

## out-file

out-file是管道命令，接收管道前一部分传递过来的命令，然后将数据保存到文件，如果本来应该显示在终端，则此时不会显示。例如：

```sh
ls | out-file 1.txt
```

由于中文可能会显示为乱码，很多时候需要使用特定的编码保存，如下示例使用utf8保存：

```sh
ls | out-file 1.txt -encoding utf8
```


## 创建数组

有多种方式创建数组，如下示例所示：

```sh
$nums1 = 1,2,3     # 用逗号分割元素
$nums2 = 1..3    #  创建1~3的数组，元素是1 2 3
$nums3 = @(1,2,3)  # 推荐使用@()
$strs1=@('hello','world') # 元素为字符串的数组
$arr=@('hello','world',1,2,3) # 元素的类型不需要相同
```

## 读取文本文件到数组中

上面几个例子是从无到有创建包含简单元素的数据，实际上，一个更常见的场景是从文本文件读入内容，即get-content命令。

get-content命令会读入文本内容，并返回一个数组，每一行就是一个元素。例如一个文本文件test.txt：

```
hello
world
```

```sh
> $lines = (get-content test.txt)
echo $lines
```


## 访问数组元素

```sh
$arr = @(1,2,3,4,5,6)
$arr  # 打印数组，分行输出 1 2 3
$arr[0]   # 索引位置0也就是第1个元素 1
$arr[-1]   # 最后一个元素
$arr[-2]   # 倒数第二个元素
$arr[1..4]  #  第2到第5个元素  2 3 4 5
$arr[1,4]  #  第2个和第5个元素  2 5
$a[-3..-1]   # 最后3个元素  4 5 6 
$a[-1..-3]   #  最后3个元素  6 5 4  ，注意与上一行的区别
```

## 修改数组

```sh
$arr = @(1,2,3,4,5,6)
$arr.SetValue(22,1) #   将索引位置1的值改为22
$arr[1]  # 22
```

可以使用 += 运算符将元素添加到数组：

```sh
$a = @(1..4)
$a += 5
$a  # 1 2 3 4 5
```

## 数组的长度

使用数组的length和count属性得到数组的长度。

```sh
$arr = 1..9
$arr.length   #  9
$arr.count #   9 
```

**合并两个数组**

```sh
$arr1 = 1,2
$arr2 = 3,4
$arr = $arr1 + $arr2
```

## 迭代数组

使用foreach()函数迭代数组。

```sh
$arr = 1..9
foreach ($element in $arr) {
  $element    # 依次输出1-9
}
```

## 筛选数组

使用where{} 筛选数组，通过传递一个表达式，筛选出值为true或可以视为true的元素。

一般而言，如果表达式得到的结果是0，则视为false。

例如，筛选所有奇数元素：

```sh

(0..9).Where{ $_ % 2 }

```

这里`$_`指代每次遍历的元素。

再比如，筛选出非空元素：

```sh

('hi', '', 'there').Where({$_.Length})

```

## 比较运算符

在命令行或脚本中经常会用到比较操作，比较操作主要分为数值的比较和文本的比较，返回True或False。

与bash shell使用中括号的语法不同，powershell直接书写比较参数和比较符号，例如：

```
> 2 -eq 2
True
```

常见的比较运算符如下表所示：

比较运算符|含义
|---|---|
-eq	|	等于	|	
-ne	|	不等于	|	
-lt	|	小于	|	
-le	|	小于等于	|	
-gt	|	大于	|	
-ge	|	大于等于	
-like	|	相似（通配符比较）	|
`-notlike`	| 不相似，使用通配符
`-contains`	|	`包含	`
`-notcontains`	|不包含


注意，文本的比较默认不区分大小写。要区分大小写，需要加上c符号例如：

```sh
$str1 = 'hello'
$str2 = 'HELLO'

$str1 -eq  $str2  # True 默认不区分大小写  
$str1 -ceq  $str2  # False  区分大小写
```

##在PowerShell启动时运行的脚本

在Linux中，~/.bash_profile 和.bashrc 文件的作用是启动bash时预先执行一些命令。在Powershell中也可以实现这个功能。
	
首先打印$profile 变量获取启动脚本的路径：

```
$profile
```

默认的输出结果是：

```
C:\Users\你的用户名\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```

按照这个路径新建.ps1脚本文件，如果目录或文件不存在就新建。

然后在该文件中输入启动时运行的命令即可。


字典是一种键值对的映射，有些说法也叫哈希表。



使用@符号加花括号创建一个字典：

```
$dic=@{name='张三';age=39}
echo $data
```



如下示例访问字典的元素：



```

$dic['name']   # 括号加引号访问键的值

$dic.name  # 直接使用点号访问键的值

$dic.keys    # 返回所有键

$dic.values   # 返回所有值

```



如下示例对字典进行增删改查：


```sh

$data.add('c',1)    # 添加键c，值为1

$data['d']=4   # 添加键d，值为4

$data.containskey('d') # 查找哈希表的键是否存在

$data.remove('d')  #根据键删除元素

```

cmdlet是PowerShell中特有的一个概念，可以简单的类比为bash shell中的命令，我们也可以使用命令这个称呼表示cmdlet。我们所说的命令，有时候指一行中的第一个单词，此时后面的部分称为选项和参数；有时候就指包括选项和参数的那一行命令。

与bash shell采用短单词的习惯不一样，cmdlet采取动-宾结构，例如get-childitem，优点是语义明确，缺点是冗长，对于习惯了Linux命令的用户和社区来说需要适应。

cmdlet的动词大致包括：
- get 读取
- set 设置，写入，更改
- add  添加，追加
- clear  删除，清除
- invoke 执行
- where 查询
- new 新建
- copy/move  复制移动
- out 重定向，通常位于管道符的后面
- write 写入，输出
- start/stop 开启/停止，例如开启/停止某个服务
- remove 删除
- import/export  导入导出
- convert  格式转换





PowerShell内置了对CSV文件的读取和写入。
## CSV

例如有一个1.csv文件，内容如下：

```
名称,数量
苹果,5
橘子,10
梨子,8
```

如下命令读取CSV内容：

```sh
import-csv  1.csv
```

这将按对象格式打印出CSV内容，PowerShell会自动识别首行作为字段名：
```
名称 数量
|---- ----
苹果 5
橘子 10
梨子 8
```

如下示例打印每一行并且打印每个字段：

```sh

$rows = import-csv  1.csv
$rows.length  # 3  有几条记录（排除第一行）
foreach （$row in $rows）{
	echo $row   # 打印每一行
}
```

这里的rows是一个数组，CSV中的每一行记录对应数组的一个元素。



## JSON 



PowerShell也内置对JSON文件的读取和写入。



使用如下命令从CSV转为JSON：



```sh

import-CSV   1.csv    -delimiter  ','  |  convertto-json

```


## 变量的声明和打印

变量以美元符号$开头，后接一个等号，然后是变量值：


```sh
> $a=1
> $b = 2   # 空格可有可无，没有像bash shell那样严格
```

打印变量使用 `$变量名`即可，也可以与bash shell一样使用echo，不过为了习惯统一，推荐使用echo。

```sh
> $a=1  
> $a
1
> echo $a
1
```

PowerShell能根据值自动确定变量的类型。

不过变量不存在而打印，powershell会报错：

```
> $foo
The varible '$foo' connot bebe retried because it has not been set.
```


## 字符串

使用单引号或双引号可以设置字符串的值：

```sh
> $a = "hello"  #单引号
> echo $a
hello

> $b = 'world'  # 双引号
> echo $b
world
```

## 变量内插

但是这两种引号有很大的区别。如果引号中没有对其它变量的引用，那么两种引号均可，如果有，那么在双引号中使用变量会被解析成值，这就是变量内插，而在单引号则不会。这个规则与bash shell是一致的。

```sh
> $name = '张三'
> echo "welcome,${name}"
welcome,张三   # 双引号，存在变量的解析

> echo 'welcome,${name}'
welcome,${name} # 单引号，原样输出
```

## 布尔值

- `$true`  真
- `$false` 假

```sh
> $isOk = $true
> $isNotOk = $false

> echo $isNotOk
True
> echo $isOk
False
```

## 数值

**整数**

```
> $num = 2
> echo $num1
```


**浮点数**

```
> $num= 0.8
> echo $num
0.8
```


PowerShell中的函数可以整体执行几行命令，如下是一个简单的函数示例：

```sh
function cdd(){
	cd ~\Desktop
}
```

此后，执行如下命令就可以快速进入桌面目录：

```
cdd
```

## 没有参数的函数

定义语法如下：

```
function 函数名() { 函数体 }
```

执行语法如下：

```
函数名
```

## 有参数的函数

定义一个有参数的函数的语法如下：


```
function 函数名([类型]$参数1,[类型]$参数2) {
    函数体
}
```

定义参数的类型不是必须的，如果不定义，那么不管传入的参数是什么类型，都始终将其视作字符串。

一个简单的带参数的函数示例如下：

```
function Info($name,$age) {  
   echo "姓名：$name，年龄：$age"
}
```

传参：

```
> Info -name 张三 -age 39
姓名：张三，年龄：39
```



## 参数的默认值

在函数定义时可以给参数一个默认值，例如：

```
function Info($name,$age=38) {  
   echo "姓名：$name，年龄：$age"
}

Info -name 张三 

##姓名：张三，年龄：38（age没有赋值，取默认）

```


## for循环

示例语法如下：

```sh
for($i=0; $i -lt 10; $i++){
    echo $i
}
```


## foreach语句

```
$strs = @('hello','world')
foreach($str in $strs){
    echo $str
}
```

## foreach()方法

```
$strs = @('hello','world')
$strs.foreach({echo $_})
```

这里比较重要的知识点是`$_`，代表每次跌倒时的值。



if语句以if关键字开头，后跟一对圆括号，其中写有条件。后跟一对花括号，其中写有满足条件时要执行的语句。如果语句比较简单，也可以省略花括号。

```
if(条件){
  # 执行语句
}
```

if-else的格式

```
if(条件){
  # 执行语句
}else{
  # 不满足条件时的执行语句
}
```

if-elseif-else格式：

```
if(条件1){
  # 执行语句
}elseif(条件2){
  # 不满足条件1但满足条件2执行的语句
}else{
 #所有条件都不满足执行的语句
}
```


```
switch(表达式)
  值1{ }
  值2{ }
  值3{ }
  default{ 没找到匹配时执行 }
```


## 内置变量

- `$null`   代表空值，将`$null`赋值给变量表示只创建该变量，但是不赋值。
- `$LASTEXITCODE`  调用外部程序时，运行结束后会返回一个退出码，0表示成功，非0表示发生错误。
- `$?`，最近一个命令的执行状态，为0为成功执行。
- `$_`  在管道对象中包含当前对象，在迭代时表示每次的迭代值。
- `$Home`  此变量用于表示用户主目录的完整路径
- `$IsLinux`  如果当前会话在Linux操作系统上运行，则此变量值为`True`，否则为`False`。
- `$IsWindows`  如果当前会话在Windows操作系统上运行，则此变量值为True，否则为False。
- `$PID`   此变量显示进程的PID，该进程正在托管当前PowerShell的会话。
- `$PSHome`   此变量表示Windows PowerShell安装目录的完整路径。
- `$PSVersionTable`   此变量用于表示只读哈希表，该哈希表显示有关当前会话中运行的PowerShell版本的详细信息。
- `$PROFILE`  powershell配置文件的路径

## 内置环境变量

使用`Get-ChildItem Env:`列出所有环境变量和它们的值。

一些内置的环境变量：
- `$env：path`，常用，执行脚本和二进制命令时按顺序搜索的目录。
- `$env:temp`或`$env：tmp` 临时文件路径
- `$env:USERPROFILE`  指定当前用户的个人文件夹的路径


使用如下语法读取或修改：

```
$env:变量名
```

这里的env和变量名都不区分大小写。
## 读取和修改PATH环境变量

`$env:PATH` 环境变量包含操作系统搜索可执行文件的文件夹位置列表。 在 Windows 上，文件夹位置列表由分号 (;) 字符分隔。

修改path环境变量：

```
$env:path = "$env:path;D:\Program Files\MyApp\bin"
```

或者使用简洁语法：

```
$env:path += ";D:\Program Files\MyApp\bin"
```

这里有两点需要注意：
1. 应该用管理员权限打开powershell
2. 修改完要注销或重启才能生效

## 新增和修改自定义环境变量

首先获取powershell的配置文件路径，没有就新建一个：

```
echo $profile
```

在此文件中加入变量的声明，注销或重启即可。



## 普通变量和环境变量的区别

普通变量和自定义环境变量本质上都是变量，声明和使用的方式一模一样，这两者的区别主要在于生命周期的不同。
- 普通变量是临时的，只在此次使用shell时有用，下次使用shell（注销或重启后）就不存在了。
- 环境变量包括内置的和自定义的，是永久可以使用的。

是否要将普通变量永久保存，也就是变为环境变量，取决于自己的实际需求。一般而言，需要重读多次使用的变量应该提升为环境变量，少数几次使用的则使用普通变量即可。


从存储库（`https://www.powershellgallery.com/`）下载一个或多个模块，并将其安装到本地PowerShell中。

例如下载PSReadline模块：

```shell
Install-Module -Name PSReadLine
```

## PSReadLine

PSReadLine
模块为powershell提供了历史记录的预测支持。使用方向键右，可以自动使用当前预测的历史命令。例如：

![psreadline历史预测](https://img-blog.csdnimg.cn/20200711171032190.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpZ21hcmlzaW5n,size_16,color_FFFFFF,t_70)





## 以管理员身份运行

在powershell点击右键，单击“以管理员身份打开”


## 获取帮助

最好的学习方式是查看帮助，使用get-help命令：

```
get-help  命令名称
```

## 不区分大小写

与bash shell不同，powershell命令名称和参数名称不区分大小写。

## 提示符约定

为方便讲解，约定使用右尖括号（>）作为命令输入提示符，该符号不需要输入，只需要复制该符号后面的命令导powershell命令行即可。

## 注释

与bash shell一样，powershell使用井号（#）注释，该符号后面的内容不会被执行。

## 配置文件

配置文件的路径保存在内置变量`$profile`中，默认为位置： `$HOME\Documents\WindowsPowerShell\Profile.ps1` ，没有就新建一个，这里可以写入启动powershell后预先执行的命令。







基于安全的考虑，PowerShell默认是不能执行脚本的，需要更改执行策略。

先以管理员方式运行PowerShell，输入如下命令行得到当前执行策略：

```sh
get-ExecutionPolicy
```

输出为：
```
Restricted 
```

这表示执行脚本是受限的。

现在，使用如下命令修改执行策略:

```sh
set-executtionpolicy remotesigned
```

此时终端会要求你输入一个字母确认你是否要更改执行策略，这里输入`Y`即可。

再次运行如下命令，可以发现执行策略依据更改完成：

```
get-executtionpolicy
输出：RemoteSigned
```

在管理员权限下，PowerShell可以设置的执行策略有如下四种：
* restriced ： 受限，默认策略，不能执行脚本
* allsigned  ：只允许执行加密签名的脚本
* **remotesigned**：推荐，远程签名，允许执行自己编写的或下载的脚本
* unrestricted ： 允许任何脚本



select-string的功能类似于Linux的grep，用于在一个或多个文件中根据字符串查找匹配的行，并将改行的内容输出。

select-string的别名是sls。

- -Pattern 要查找的字符串，支持正则表达式。
- -CaseSensitives，如果加上则区分大小写。默认不区分大小写。
- -Path ：要查找的文件路径。

例如，在文件file.txt中查找包含ex（不区分大小写）的行：

```
sls -Pattern ex file.txt
```



select-string还支持管道。例如：

```
cat file.txt | sls ex
```


# sed命令

## sed命令语法

sed命令语法如下：

```sh
sed   选项   '命令部分'  文件
```

常见的选项如下：

* -n : 只打印被sed处理的行，默认是处理后的结果，经常与p搭配。

* -i : 默认情况下，会将待处理的文件内容拷贝到缓存中，处理之后输出到屏幕上，此时无论是删除，还是查找替换，都对源文件的内容没有任何影响。-i 选项直接修改原文件，而不在屏幕上输出。这种无损操作可以提前测试查找替换的结果，避免产生不可逆的修改。
sed最重要的是命令部分，命令部分又分为三个小部分：找到匹配的行、具体操作、可选的新增内容 

## 找到匹配的行

要确定哪些行被找到，有两种方式:

* 直接指定行，使用n1,n2表示第n1行到第n2行，不指定就是所有行被找到。

* 基于内容的查找，使用 /text/ 去查找text文本，支持正则表达式。通过这两种方式找到的行，进入下一步等待操作。

上一部通过直接指定或查找的方式找到了待操作的行，这一步就要指定基于行的具体的操作，具体操作分为两大类：基于整行的操作、基于字符的操作。

基于整行的操作又分为打印、删除、追加、替换、插入。

## 基于整行的打印

打印操作符是p，为了只打印需要的行，需要加上-n选项，否则会重复输出需要的行。

例如，打印前5行：

```sh
sed  -n 1,5p file.txt 
```

打印所有行：

```sh
sed -n p file  # 打印所有行
```

打印包含“word”文本的行：

```sh
sed -n /word/p  
```

打印前5行中包含“word”文本的行：

```sh
sed -n 1,5/word/p file.txt  
```

## 基于整行的删除

删除的操作符是d，在匹配到行之后，使用如下操作删除：

```sh
sed  1,3d  file.txt    
```

这行命令删除了前3行。

或者使用：

```sh
sed  /text/d  file.txt
```

这行命令将包含有“text”文本的行删除。

## 基于整行的追加、插入和替换

基于整行的追加、插入、替换的指令分别是a、i、c。例如：

要在第一行前面加入新文本内容，运行：

```sh
sed  "1i new text" file.txt
```

要在最后一行后面追加新内容，运行：

```sh
sed  "$a  new text" file.txt
```

这里$表示最后一行。

而要将第3行整行换成新内容，运行：

```sh
sed  "3c   new text "  file.txt
```

注意，由于后面的文本中出现了空格，故而上面这三个操作都是需要添加引号的，否则会被识别为命令行参数。

前面提到的替换操作是整行替换，sed还可以基于字符替换。

## 基于字符的查找替换

基于字符的查找替换是sed最常见的操作。在找到行之后，使用`s/旧文本/新文本/g`  以执行基于字符的替换操作。这里的`g`表示行内全局替换，否则只替换找到的每行的第一个。例如：

```sh
sed s/old/new/g file.txt  
```
上面这行命令将所有old文本替换成new文本。

```sh
sed 1,5s/old/new/gi file.txt 
```

上面这行命令将前5行的old文本替换成new文本，且忽略大小写。

值得提醒的的是，一般情况下使用 `s/旧文本/新文本/g` 进行替换，但这里的` / `可以换成其它字符，如果遇到文本中本来就包含` / `的情况，可以使用转义符号`\`转义，不过更加建议更换成其它字符，比如` * `。

例如，更换apt包管理器的软件仓库地址，以提升下载速度，而仓库地址包含`/`字符，此时，就可以使用：

```sh
sed  -i  s*http://archive.ubuntu.com/ubuntu/*https://mirrors.aliyun.com/ubuntu/*g   /etc/apt/sources.list
```

这里我们使用了`*`进行分隔。注意加`-i` 将修改应用到源文件。

## sed配合管道、重定向

sed可以配合管道使用：

```sh
nl file.txt | sed -n 1,5p
```

上面这行命令先显示文件的行号，然后打印前5行。

重定向的意思是把本来要输出到屏幕上的内容复制到新文件中，例如：

```sh
sed -n 1,5p file.txt > new.txt
```

上面这行命令将文件的前5行复制到new.txt中。

再比如：

```sh
sed -n /文本/p 文件 > new.txt
```

这行命令将文件中包含word文本的那些行复制到new.txt中。





# 服务器篇

# TCP IP
## OSI七层模型

将网络分为几个层次，每个层次都有特定独立的功能，每层独立实现、互不干扰。这就是TCP/IP的基础——OSI七层网络协议。

- 第一层 物理层  

由于网络传输介质只能传送0与1这种比特位，因此物理层必须定义所使用的传输设备的电压与信号灯，同时还必须了解数据帧转换成比特流的编码方式，最后连接实际传输介质并发送/接收比特信号。

- 第二层 数据链路层 

这一层是比较特殊的一个层，因为其下层都是实体的定义，而其上层则是软件封装的定义。因此第二层又分为两个子层进行数据的转换操作。在偏硬件部分，主要负责的MAC（Media Access Control），我们称这个数据包裹为MAC数据帧（frame），MAC是网络接口设备所能处理的主要数据包裹，这也是最终被物理层编码成比特流的数据。MAC必须要经过通信协议来取得网络介质的使用权，目前最常使用的则是IEEE 802.3的以太网络协议。 至于偏向软件的部分则是由逻辑链路层（Logical Link Control，LLC）所控制，主要在多任务处理来自上层的数据包数据（packet）并转成MAC的格式，负责的工作包括信息交换、流量控制、失误问题的处理等。

- 第三层 网络层

这一层就是IP（Internet Protocol）层，即路由协议层。同时也定义出计算机之间的连接建立、终止与维持、数据包的传输路径选择等。

- 第四层 传输层

这一个分层定义了发送端与接收端的连接技术（如TCP、UDP技术），同时包括该技术的数据包格式、数据包的发送、流程的控制、传输过程的侦测检查与重新传送等，以确保各个资料数据包可以正确无误的到底目的端。

- 第五层 会话层  

在这个层次当中主要定义了两个地址之间的连接信道的连接与中断，此外，也可建立应用程序之间的会话、提供其他加强型服务如网络管理、建立与断开、会话控制等。如果说传输层是在判断数据包是否可以正确的到达目标，那么会话层则是在确定网络服务建立连接的确认。

- 第六层 表示层  

我们通过应用程序生成出来的数据格式不一定符合网络传输的标准编码格式，所以，在这个层次当中，主要的操作是：将来自本地端应用程序的数据格式转换（或者重新编码）为网络的标准格式，然后再交给下面的传输层等的协议来进行处理。所以，在这个层次上面主要定义的是网络服务（或程序）之间的数据格式的转换，包括数据的加解密也是在这个层次上处理。

- 第七层 应用层 

应用层本身不属于应用程序所有，而是在定义应用程序如何进入该层的沟通接口，以将数据接收或发送给应用程序，并最终展示给用户。

## TCP/IP
不过，事实上，OSI七层协议只是一个参考的模型，目前并没有什么知名的操作系统严格按照OSI七层协议实现。不过，OSI七层模型可以认为是TCP/IP的简化模型，将原来的七层简化为四层，实际的互联网程序代码都是基于TCP/IP模型。OSI七层协议与TCP/IP协议的对应关系如下：
- 将最底下两层（物理层和链路层）简化为一层——网络接口层
- OSI的网络层还是对应TCP/IP的网络层
- OSI的传输层还是对应TCP/IP的传输层
- 将最上三层（会话层、表示层、应用层）简化为一层——应用层

TCP/IP每层的相关通信协议与标准如下：
- 网络接口层：WAN、LAN、ARP
- 网络层：IP、ICMP
- 传输层：TCP、UDP
- 应用层：HTTP(s)、FTP、SMTP、POP3、NFS、SSH

拿一个访问网页的例子来演示TCP/IP协议的工作：
- 应用程序阶段：打开浏览器，在地址栏输入网址，按下回车。此时网址信息与相关数据会被浏览器打包成一个数据包，向下传给应用层。
- 应用层：由应用层提供的HTTP通信协议，将来自浏览器的数据封装起来，并给予一个应用层报头，再向传输层丢去。
- 传输层：由于HTTP为可靠连接，因此将该数据包丢入TCP封装内，并给予一个TCP封装的报头，向网络层丢去。
- 网络层：将TCP数据封装到IP数据包内，再给予一个IP报头（主要就是来源于目标的IP），向网络接口层丢去。
- 网络接口层：如果使用以太网络事，此时IP会依据CSMA/CD的标准，封装到MAC数据帧中，并给予MAC帧头，再转成比特流后，利用传输介质发送到远程主机上。
- 等到目的主机收到数据包后，再以相反的方向拆解开头，每次交给对应的层次进行分析，最后WWW服务器软件获知你想要的数据，再取得正确的资料后，又遵循上述流程，一层一层的封装起来，最后传送到你的浏览器上。

## 传输层：TCP与UDP

### 端口

我们都知道IP数据包的传送的起点和终点是IP地址，那么达到后具体应该连接到哪里去呢？一台主机可以部署多个服务，那么是连接到WWW服务器，还是FTP服务呢？这就需要通过端口区分不同的服务，一个特定的服务由两部分组成：

```
地址:端口
```

地址可以是IP地址，也可以是主机名称。

端口的取值范围为0-65535，不过，0-1023已经分给了常用的应用程序，因此一般的取值范围是1024~65535。

常见的服务与端口的对应如下：
- 20 FTP
- 22 SSH  安全远程连接服务
- 25  SMTP  简单邮件传递协议
- 80  HTTP，超文本传输协议服务
- 110   POP3  邮件接收协议
- 443  HTTPS  安全加密的HTTP服务
- 3306  MySQL 默认端口号


### TCP 三次握手

![TCP的三次握手](https://pics4.baidu.com/feed/1ad5ad6eddc451da91dfe64756fd5b6bd016327a.jpeg@f_auto?token=6a788b3425a128f386466dad924ccf99)

在TCP的连接模式中，在建立连接之前都必须通过三个确认的动作，所以这种连接方式也被称为三次握手，大致分为四个阶段。

- 第一阶段，数据包发起   当可以的想要对服务器端连接时，就必须要送出一个要求连接的数据包，此时客户端必须随机取用一个大于1024的空闲的端口来作为程序沟通的接口。然后再TCP的报头当中，必须要带有SYN的主动连接（SYN=1），并且记下发出连接数据包给服务器端的序号（Sequence number = 10001）。

- 第二阶段，数据包接收与确认数据包发送  当服务器接收到这个数据包，并且确定要接收这个数据包后，就会开始制作一个同时带有SYN=1，ACK=1 的数据包，其中那个Acknowledge的号码是要给Client端确认用的，所以该数字会比A步骤里面的Sequence号码多一号（ack=10001+1=10002），那服务器也必须确认客户端确实可以接收我们的数据包才行，所以也会发送出一个Sequence（seq=20001）给客户端，并且开始等待客户端与服务器端的回应。

- 第三阶段，回送确认数据包  当客户端收到来自服务器端的ACK数字（10002）后，就能确认之前那个请求连接的数据包被正确接收了，接下来如果客户端也同意与服务器建立连接时，就会再次发送一个确认数据包（ACK=1）给服务器，即Acknowledge = 20001+1 = 20002.

- 第四阶段  取得最后确认  若一切都顺利，在服务器端收到带有ACK=1 且ack = 20002序号的数据包后，就能够建立起这次的连接了。

举个通俗得了例子，好比两个人A和B在谈论事情之前打招呼：
- A说： B你听得到吗？
- B说：我听得到，A你听得到吗？
- A说：我也听得到

可能有的人会有疑问，为什么B要再次询问一遍呢？B收到消息后直接建立连接不行吗？假设A说中文但听不懂英文，B说英文也可以听懂中文，这时候直接建立后A是听不懂的，必须要保证双方都能听懂对方说的话才行。

那为什么不来回更多次呢？理论上也是可以的，不过，为了节省资源，只需要双方都说一次，然后确认对方听懂了就够了。

总之，三次握手就是要确认两件事：
- 服务端能有效识别客户端的信息
- 客户端能有效识别服务端的信息

### TCP的四次挥手

![TCP的四次挥手](https://pics1.baidu.com/feed/c8177f3e6709c93d3b2db2957e3df1d1d0005486.jpeg@f_auto?token=d1003b5bd35811075409c512e0503094)


TCP的四次挥手是为了结束已建立的连接，确保双方都能正确地关闭连接并释放资源。下面是四次挥手的过程：

- 第一次挥手：客户端发送一个带有FIN（结束）标志的数据包，表示自己已经没有数据要发送了，请求关闭连接。

- 第二次挥手：服务器接收到客户端的结束请求后，会发送一个带有ACK（确认）标志的数据包作为响应，表示已收到客户端的结束请求。

- 第三次挥手：服务器发送一个带有FIN标志的数据包，表示自己也没有数据要发送了，请求关闭连接。

- 第四次挥手：客户端接收到服务器的结束请求后，会发送一个带有ACK标志的数据包作为确认，表示已收到服务器的结束请求。

在关闭连接时，需要确保双方都完成了数据的传输和接收，以防止数据丢失或错误。如果只有三次挥手，可能会导致一些问题。

假设只有三次挥手，当客户端发送结束请求后，服务器收到后会发送确认，表示已收到客户端的结束请求。但是在此过程中，服务器可能还有未发送完的数据，如果直接关闭连接，那么这些数据就会丢失。因此，引入第三次挥手，服务器在发送结束请求前，先发送所有未发送完的数据，并等待客户端的确认。客户端接收到服务器的结束请求后，会确认并处理完未接收的数据，然后发送确认，表示自己已准备好关闭连接。

通过四次挥手，可以确保双方都能正确地结束连接，并处理未发送和未接收的数据，保证数据的完整性和可靠性。因此，关闭连接需要四次挥手。


##  HTTP协议

###  请求报文与响应报文


客户端发送请求报文，服务器返回响应报文，报文有一定的格式约定，将格式约定好以便于发送和解析，这既是协议。

要查看报文实例，最好的方法是使用浏览器。

使用Edge浏览器，打开百度首页，按F12进入开发者工具，切换到网络选项卡，这时候应该有很多网络传输记录。

在右边的表头选项卡，我们能看到“常规”、“响应标头”、“请求标头”。这就是报文的内容。

我们解释几个典型的参数。

* 请求URL：这就是我们常说的链接，只有通过链接才能拿到资源如HTML页面、文件、图片、视频。
* 请求方法：一般为GET，表示向服务器拿资源。开发中会用到POST表示携带正文向服务器发送。
* 状态代码：表示是成功还是错误，如果是200 OK表示成功返回了正确的资源。如果是4或5开头的代码，表示有错误。
* 远程地址：服务器的IP地址，这个地址是DNS系统通过解析之后得到的机器能够理解的地址。
* 请求标头：请求报文的头部，是对请求报文的概括和描述，如协议版本、能接受的编码等。
* 响应标头：响应报文的头部，是对响应报文的概括和描述，如字节大小等。


### 简介


一般而言，网络传输的两端分为客户端和服务器。请求数据的叫做客户端，浏览器就是典型的客户端。接收请求，处理请求，将数据返回的机器叫做服务器。

客户端请求资源，就要用到资源定位符URI，URI是一个明确的地址，通过这个地址就能去到响应的服务器请求资源。

至于这中间是怎么从我们面前的浏览器到达世界另一个地方的服务器的过程比较复杂，包括数据的编码、打包、IP地址查询、路由、DNS轮询、握手、解包等，我们只需要知道有网络基础设施无时无刻都在为我们服务即可。

例如，我们访问百度。在浏览器地址栏输入`https://www.baidu.com`，这就是全球唯一的地址，通过这个地址就可以到达百度的服务器，然后服务器立即响应将HTML页面发回本地，我们就看到了百度的首页。



### 报文结构

请求和响应信息统称报文，结构：

```
首部

body
```


首部每一行是一个键值对。

### 状态码

- 1字头 正在处理的信息
- 2字头 成功时的响应，常用的是200 OK
- 3字头 服务器给客户端的命令，例如重东西或缓存
- 4字头 当客户端发送的请求中存在异常内容时发送的响应码
- 5字头 当服务器内部发生错误时发送给客户端的状态码


### URL的结构

常见URL路径的结构：

```
协议://主机名/路径
```

而完整的URL路径的结构：

```
协议:// 用户:密码@主机名:端口/路径?查询#片段
```

###  方案

主要包括：
- http
- https
- mailto
- file
- ftp


### 查询

用户要搜索的关键词，语法如下：

```
key1=value1&key2=value2
```


### Cookie

Cookie是将网站信息保存在浏览器的一种结构，由服务器指示客户端（浏览器）保存数据。

例如服务器发送的报文：

```
Set-Cookie: key1=value1
Set-Cookie: key2=value2
```


客户端就会存储起来，下次请求时可以带上：

```
Cookie: key1=value1
Cookie: key2=value2
```


###  BASIC认证

如今大多数服务器需要登录，但通常的方式是只需要第一次登录，然后在一定的时间内免登陆。
basic认证是最简单的认证方式，通过base64编码，因为base64可逆，所以服务器可以还原出来原来的用户名和密码。将还原出来的用户名和密码与数据库中进行对比。如下是对用户名和密码进行编码后的示例：


```
base64(用户名+":"+密码)
```


示例：
```

base64('zhangsan'+':'+'123456')  // emhhbmdzYW46MTIzNDU2
authorization: "Basic emhhbmdzYW46MTIzNDU2"
```

### digest认证

使用哈希函数。

### https/3

udp和tcp的区别：
- 可靠的，需要进行三次我手
- 不可靠的，只负责发出去，不管有没有收到。

http/2在与http同一层的tcp套接字上进行了实现，但google为了进一步提高通信速度，在udp套接字上提供了quic协议。





### 方法

HTTP协议有两种最常用的方法：

- get	 通过url和query向服务器获取数据
- post	 	在body中添加数据发给服务器，请求数据
- put 新增文件
- delete 删除文件

### 响应码

HTTP有4种常用的响应码，如下：

- 200	|	客户端成功请求，服务器成功响应
- 3xx	|	服务器指示客户端需要完成的工作，例如重定向
- 404	|	客户端出了错误，例如请求不存在的文件
- 5xx	|	服  务器出了错误


## DHCP

DHCP，Dynamic Host Configuration Protocol ，动态主机配置协议。DHCP服务器的主要工作，就是自动将正确的网络参数分配给网络中的每台主机，让客户端主机可以在联网的时候立即自动配置好网络的参数值，这些参数包括：IP、子网掩码、网段、网关、DNS地址等。现实生活中，我们的笔记本连上网络后，是不是很少去手动设置这些参数，而是直接就可以上网了，这就是因为DHCP服务器已经为我们配置好了。

DHCP为客户端提供的信息至少包括以下内容：
- IP地址
- 子网掩码
- 租赁时间：客户端并不是一直拥有该IP地址，当时间到期后必须再次请求。默认情况下，DHCP服务器会记住客户端并分配相同的地址。
- 域名服务器（DNS）地址：通常DHCP服务器会给一到三个DNS地址供客户端使用。
- 默认网关。为了让一个网络请求离开本地网络，必须知道网络上的哪个节点提供了到本地的网络之外地址的路由，这个节点就是网关。

## DNS

实际上，要使一台主机连接到另一台主机的服务，必须知道IP地址和端口。端口的问题好说，如果是用浏览器上网，那么基本就是80端口，那么IP地址呢？为什么我们并不知道百度的IP地址却可以访问百度？这就用到了一种网络基础设施服务——DNS。

DNS，Domain Name System，域名系统，通过将由英文字母和数字组成的主机名转化成IP地址，使得数据包可以到达目的地。这个DNS也是网络中的一台主机，只是专门为我们提供DNS服务，DNS的地址是由DHCP服务器配置的。

例如，访问baidu.com，我们电脑的缓存中没有查到baidu.com对应的IP地址，此时就将baidu.com发送给DNS主机，DNS主机分析该路径的组成，再通过与全球其它的DNS服务器递归的查找和询问，最终得到了baidu.com的IP地址是xx.xx.xx.xx，再返回给我们的电脑，电脑拿到这个确定的IP地址后，就能够到达百度的服务器了。

这种询问过程的举例如下，例如访问baidu.com：
- 我们的电脑将baidu.com发送给DNS服务器8.8.8.8
- DNS服务器先去询问全球域名根服务器（/），得到管理com的服务器的IP地址
- DNS服务器再去询问管理com的服务器，得到baidu.com的服务器的IP地址
- DNS拿到具体的IP地址后，返回给我们的电脑。

要知道具体是哪个IP地址，可以使用ping命令：

```
PS:> ping baidu.com

Pinging baidu.com [39.156.66.10] with 32 bytes of data:
Reply from 39.156.66.10: bytes=32 time=25ms TTL=48
Reply from 39.156.66.10: bytes=32 time=24ms TTL=48
Reply from 39.156.66.10: bytes=32 time=24ms TTL=48
Reply from 39.156.66.10: bytes=32 time=27ms TTL=48

Ping statistics for 39.156.66.10:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 24ms, Maximum = 27ms, Average = 25ms
```

也可以使用nslookup命令：

```
PS:> nslookup baidu.com
Server:  public1.114dns.com
Address:  114.114.114.114

Non-authoritative answer:
Name:    baidu.com
Addresses:  110.242.68.66
          39.156.66.10
```


##  远程文件服务器：ftp


### 客户端连接

一般要提供如下参数：
- 主机
- 端口，默认21
- 用户名和密码，如果允许匿名，则用户名为anonymous

有三种方式连接到FTP服务器：
- 命令行
- 客户端，例如FIlezilla
- 浏览器

如果要使用浏览器连接ftp服务器，则在地址栏输入：

```
ftp://用户名:密码@主机地址
```


### 服务器配置

如果要自己搭建ftp服务器，则可以使用vsftpd这个软件。


## 网络文件系统：NFS

NFS，Network File System，网络文件系统，作用是让不同的机器、不同的操作系统可以彼此共享文件。最主要的设置就是文件的权限。设置NFS服务器主要用到两个软件：rpcbind、nfs。

客户端如果要连接NFS服务器，只需要将NFS资源挂载到相关目录之下即可。


## 网络层（IP层）

目前IP协议有两种版本：
- IPv4（因特网协议第四版）：由于地址仅有32位，预计2020年左右分配完毕。
- IPv6（因特网协议第六版）：为了应对IPV4地址枯竭的问题，诞生了IPv6。ipv6的地址可以达到128位，这样的IP数据几乎是用不完的。不过，由于IPv6与IPv4协议互不兼容，需要从上而上大幅更换软硬件设施，因此推广问题值得关注。

IP的组成是32位的数据，即由32个0与1组成的一连串数字。为了方便读写，将32位分为四小段，每段8位，又将每段换算为十进制，并且每段以小数点隔开，这就形成了我们日常见到的IP地址。例如：

```
00000000.00000000.00000000.00000000   ==>  0.0.0.0
11111111.11111111.11111111.11111111   ==>  255.255.255.255
```

这串数字中，又分为网络号码和主机号码。在同一个物理网段内，主机的IP具有相同的网络号码，并且具有唯一的主机号码。同时，同一个物理网段内，可以根据不同的IP设置，而设置成多个“IP网络”，也叫“子网段”。

另外，主机号码不能全部为0或1，全部为0表示整个网段的地址，全部为1表示广播地址。

###  五类IP地址

为了便于管理和方法，IP地址被分为了五类：
- A类： 网络号码的开头是0,0.xx.xx.xx ~ 127.xx.xx.xx
- B类:  网络号码的开头是10  128.xx.xx.xx ~ 191.xx.xx.xx
- C类  网络号码的开头是110  192.xx.xx.xx ~ 223.xx.xx.xx
- D类  网络号码的开头是1110   224.xx.xx.xx  ~ 239.xx.xx.xx   组播使用
- E类  网络号码的开头是1111   240.xx.xx.xx ~ 255.xx.xx.xx   保留网段

能够用来一般系统上面的，只有A类、B类、C类地址，而普通人大概率只能申请到C类地址。

但是，上面的A、B、C类地址显示是不够用的，如果一个企业有10台主机，就要购买10个IP吗？为了解决这个问题，又提出了公有地址和私有地址。一个企业持有一个公有地址，下面可以规划若干了私有地址，这就解决了企业内部的IP地址问题。私有地址包括：

- A类私有地址： 10.0.0.0  ~  10.255.255.255
- B类私有地址 ： 172.16.0.0   ~  172.31.255.255
- C类私有地址 ： 192.168.0.0  ~  192.168.255.255

### 路由

同一个网络段的主机可以直接通信，那么不同网络段呢？每一台主机都有一个路由表，每台主机传递数据时依据这个路由表决定“下一跳”。

### NAT（网络地址转换）

如果私有IP要访问公网，需要通过NAT（网络地址转换）。一个公网IP加一个端口号映射到私有地址，这样私有地址的主机就可以访问公网了。

我们的手机可以访问公网，是因为连接到WiFi后，就会得到一个私有地址，持有公网IP的网络地址转换访问的公网。

## 远程连接服务器：SSH

远程连接服务器通过文字或图形的方式来远程登录系统，让你在远程的终端面前登录Linux主机以取得可操作得Shell，而登录后的感觉上就像坐在系统前面一样。

可以使用OpenSSH软件设置SSH服务。

客户端连接的语法如下：

```
ssh [-p 端口号] [账号@]主机地址 [命令]
```

端口号一般默认为22，如果服务器设置了另外一个端口，使用新端口即可。

##  OAuth

OAuth 是 Opne Authorizations的简写。

openid是微信用户在公众号appid下的唯一用户标识（appid不同，则获取到的openid就不同）

![OAuth | 1200](https://bkimg.cdn.bcebos.com/pic/86d6277f9e2f0708ca1c2b2ceb24b899a901f285?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5/format,f_auto)

- AppID 应用ID
- AppSecret 应用的密钥
- Code 临时票据 
- 返回access_token


### github 授权


打开https://github.com/settings/developers 注册一个OAuth应用。需要填写如下信息：

- Application Name：为应用取个名字。
- homepageURL：主页地址
- Authorization Callback URL为回调地址，当用户同意授权后，会回调该地址，并将授权码拼接到地址后面。
- 
注册完毕后会得到Client ID和Client Secret。



获取授权码请求路径 ： 

```
GET  https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}
```

替换成应用的clientId和redirect_url。访问到授权服务器会重定向到redirect_url，并且在地址后面拼接授权码。

```
POST  https://github.com/login/oauth/access_token
```

设置Accept: application/json。

带上body：

```
{
	code: 授权码
	client_id: your_client_id,
	client_secret: your_secret_id,
}
```

得到Access Token，通过此令牌得到用户的信息：

```
Authorization: Bearer OAUTH-TOKEN
GET https://api.github.com/user
```

### Access Token

最终的目的是获得一个Access Token，Access Token 唯一标识用户。

使用Refresh Token 获得一个新的Access Token。


三个地址：

- 请求授权地址，例如 `授权服务器主机名/auth/login` 参数 client_id  redict_id，请求后会打开授权页面
- 点击后，授权服务器返回的地址，即回调地址（携带Code）
- 请求回调地址，会得到Code
- 请求token地址，例如 `授权服务器主机名/auto/access_token` 参数Code + client_id + client_secret 
- 获取Access_token
- 通过Access Token获取用户的OpenID

### 微信授权

参考 ： https://blog.csdn.net/qq_36389060/article/details/124047449

获取 access_token 后可以进行哪些操作？

开发者可通过 OpenID 来获取用户基本信息

### Github授权登陆流程

步骤| 请求方式 | 请求URL | 请求参数|返回内容
|---| ---| ---|---|---|
1|GET|`https://github.com/login/oauth/authorize`|client-id| redict-url|授权登陆GitHub的页面
2|GET|`redict_url`|无|request-code
3|POST|`https://github.com/login/oauth/access_token`|client-id、client-secret、request-code|access-token
4|GET|`https://api.github.com/user`|请求头中添加access-token|github-id、github-url等GitHub用户信息

### 微信授权登陆流程

打开微信开发平台，地址：


步骤| 请求方式 | 请求URL | 请求参数|返回内容
|---| ---| ---|---|---|
1 | GET | `https://open.weixin.qq.com/connect/qrconnect`       | client-id                 | redict-url                 | 授权登陆微信的页面 |
2   | GET  | `redict_url`                                         | 无                         | request-code               |           |
 3   | POST | `https://api.weixin.qq.com/sns/oauth2/access_token`  | appid、secret、request-code | access-token、refresh-token |           |
4   | GET  | `https://api.weixin.qq.com/sns/userinfo`             | 请求头中添加access-token        | 微信用户个人信息                   |           |
5   | GET  | `https://api.weixin.qq.com/sns/oauth2/refresh_token` | appid、refresh-token       | 新的access-token             |           |



##  加密协议


### 加密算法的分类

- 对称加密算法：在加密和解密时使用同一个密钥，这种算法不安全，几乎不再使用了。
- 非对称加密算法：通过密钥算法同时一对密钥：公钥和私钥，分别用于加密和解密。目前在各大安全协议中被使用。

非对称加密算法主要包括：
- rsa：主流，ssh-keygen工具默认
- dsa

### 非对称秘钥的文件位置和内容

公钥和私钥都是一个文本文件，里面存放着一定长度的字符串，默认放在~/.ssh目录。

公钥私钥是成对生成、成对存在的，其名字也应该对应。假设是用rsa算法生成的一对公私钥，那么其名称默认是：
- ~/.ssh/id_rsa  私钥
- ~/.ssh/id_rsa.pub   公钥

当然，名称也可以自己取一个有辨识度的名字。

公钥顾名思义就是可以公开的，A和B首先把自己的公钥发给对方，然后把对方的的公钥追加进自己的~/.ssh/known_hosts文件中，这个文件存放的是从网络上接收到的各个主机的公钥，每条信息占一行，每一行的格式如下：
```
主机  加密算法   公钥字符串==
```

### 非对称加密传递信息

假设网络上的两台主机A和B需要传递信息。那么A和B首先生成自己的私钥和公钥。

现在A要跟B发送信息，A就使用B的公钥将原始信息加密，得到一条加密信息通过网络发送给B，由于原始信息是通过B的公钥加密的，那么加密信息只能通过B的私钥解密，A的公钥私钥、B的公钥、其它网络上任何人的公钥私钥都无法解密这条加密信息。B收到后通过自己的私钥成功界面，就看到了原始信息。在这个过程中，哪怕加密信息被别人截取到了，也无法解密。

总而言之，公钥是用来加密的，私钥是用来解密的。要给对方发送消息，就用对方的公钥加密，等信息到达对方主机后，对方就可以解密了。

非对称秘钥有几个特点：
- 全局唯一：不同的人在同一时间，或同一个人在不同时间生成公钥私钥一定是不同的。也就是说，每个人的私钥一定是不同的，这确保了身份的准确性。
- 一对一：公钥和私钥是成对生成的，用公钥加密的信息只能通过对应的私钥解密，其它私钥绝对不可能解密。
- 确定性：用对应的私钥一定能解密，不用对应的私钥一定不能解密。

### 数字证书和数字签名

现在，又有一个问题，如何保证这条加密信息是由a发出来的？换句话说，C也可以生成一对公私钥，发送给B，然后对B说：“我是A，这是我的公钥”。

这种问题的漏洞在于，每个人都可以生成公钥私钥，但无法根据识别身份。这个时候，有一个第三方的权威机构，A向这家机构发动自己的公钥以及能够证明身份的信息（例如营业执照），完成自己在网络上的“实名认证”。这家权威机构在核实了A的信息和公钥之后，颁发给A一张数字证书，这家机构也叫数字证书颁发机构。有了权威机构的背书，任何人也无法冒充A了，因为现在人们获取公钥都直接从权威机构获取。

现在，A要向B发生信息，首先使用B的公钥加密原始信息，然后再用自己（A）的私钥再进行一道加密，这个过程就是数字签名。B收到加密信息后，首先向第三方权威机构获取A的公钥，然后使用A的公钥进行第一级解密，再用自己（B）的的私钥进行二级解密，就获取了原始信息。

数字证书颁发机构的作用就是完成公钥信息的“实名制”。

第一级加密和数字签名是对称的：
- 第一级加密使用对方的公钥加密
- 第二级数字签名使用自己的私钥加密
- 收到信息后，首先向数字证书颁发机构获取发送方的公钥，完成数字签名信息的解密
- 然后使用自己的私钥解密出原始信息。

总之，原始信息加密解密的方式是：接收的公钥加密，接收方的私钥解密。数字签名的加密解密方式是：发送方的私钥加密，发送到的公钥解密。

### ssh

ssh命令用于登录远程主机

要登录远程主机，使用如下命令：

```
ssh  远程用户名@远程主机
```
此时会提示你输入密码。

输入`exit`退出登录。

如果是第一次登录该远程主机，则默认会将远程主机的公钥追加到文件~/.ssh/known_hosts 的末尾。

### ssh-keygen

ssh-keygen可以用了生成一对公私钥，运行命令后，会提示你：
- 输入私钥的文件名，默认为id_rsa。如果已经有一个私钥而想增加一个，可以自定义一个名称。公钥的名称为`私钥名称.pub`。
- 公钥的密码，默认不设密码

### ssh-copy-id

使用ssh-copy-id将客户端的公钥复制到远程主机的同名家目录的.ssh目录的 `authorized_keys` 文件中。以后就可以直接连接而不用输入密码了。

```
ssh-copy-id -i 公钥路径 远程用户名@远程主机地址
```


