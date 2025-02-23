
# 管道和命令组合

## 管道

使用管道运算符将两个命令连接起来，管道符是一条竖线。注意，竖线两边必须有至少一个空格。管道的格式如下：

```sh
命令1 |  命令2
```

## 子命令

可以将命令的输出值赋给另一个变量而不是打印出来。

```sh
$files = ls
```

如果存在空格，只需要用圆括号括起来即可：

```sh
> $files = (ls *.txt) #得到后缀为txt的文件列表

> echo (ls *.txt).length #输出后缀为txt的文件数量
```

## 单行多命令

```sh
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

```sh
Get-Location
```

切换工作目录

```sh
Set-Location $HOME\Desktop
```

## 相对路径和绝对路径

相对有两个符号：
- `.` 一个点号，当前目录
- `..`   两个点号，上级目录

回到上一级：

```sh
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

## F7显示历史记录

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

```sh
Get-ChildItem x*
```

若要在 当前目录中查找所有md文件，请键入：

```sh
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

```sh
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

```sh
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

```sh
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

```sh
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

### 合并两个数组

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

```sh
> 2 -eq 2
True
```

常见的比较运算符如下表所示：

比较运算符|含义
---|---
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

## 在PowerShell启动时运行的脚本

在Linux中，~/.bash_profile 和.bashrc 文件的作用是启动bash时预先执行一些命令。在Powershell中也可以实现这个功能。
	
首先打印$profile 变量获取启动脚本的路径：

```
$profile
```

默认的输出结果是：

```sh
C:\Users\你的用户名\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```

按照这个路径新建.ps1脚本文件，如果目录或文件不存在就新建。

然后在该文件中输入启动时运行的命令即可。


字典是一种键值对的映射，有些说法也叫哈希表。



使用@符号加花括号创建一个字典：

```sh
$dic=@{name='张三';age=39}
echo $data
```

如下示例访问字典的元素：

```sh
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
---- ----
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
import-CSV   1.csv    -delimiter  ','  |  ConvertTo-Json
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

### 整数

```
> $num = 2
> echo $num1
```

### 浮点数

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

```sh
cdd
```

## 没有参数的函数

定义语法如下：

```sh
function 函数名() { 函数体 }
```

执行语法如下：

```sh
函数名
```

## 有参数的函数

定义一个有参数的函数的语法如下：


```sh
function 函数名([类型]$参数1,[类型]$参数2) {
    函数体
}
```

定义参数的类型不是必须的，如果不定义，那么不管传入的参数是什么类型，都始终将其视作字符串。

一个简单的带参数的函数示例如下：

```sh
function Info($name,$age) {  
   echo "姓名：$name，年龄：$age"
}
```

传参：

```sh
> Info -name 张三 -age 39
姓名：张三，年龄：39
```


## 参数的默认值

在函数定义时可以给参数一个默认值，例如：

```sh
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

```sh
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

```sh
if(条件){
  # 执行语句
}
```

if-else的格式

```sh
if(条件){
  # 执行语句
}else{
  # 不满足条件时的执行语句
}
```

if-elseif-else格式：

```sh
if(条件1){
  # 执行语句
}elseif(条件2){
  # 不满足条件1但满足条件2执行的语句
}else{
 #所有条件都不满足执行的语句
}
```

```sh
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

```sh
$env:变量名
```

这里的env和变量名都不区分大小写。

## 读取和修改PATH环境变量

`$env:PATH` 环境变量包含操作系统搜索可执行文件的文件夹位置列表。 在 Windows 上，文件夹位置列表由分号 (;) 字符分隔。

修改path环境变量：

```sh
$env:path = "$env:path;D:\Program Files\MyApp\bin"
```

或者使用简洁语法：

```sh
$env:path += ";D:\Program Files\MyApp\bin"
```

这里有两点需要注意：
1. 应该用管理员权限打开powershell
2. 修改完要注销或重启才能生效

## 新增和修改自定义环境变量

首先获取powershell的配置文件路径，没有就新建一个：

```sh
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

```sh
Install-Module -Name PSReadLine
```

## PSReadLine

PSReadLine模块为powershell提供了历史记录的预测支持。使用方向键右，可以自动使用当前预测的历史命令。例如：

![psreadline历史预测](https://img-blog.csdnimg.cn/20200711171032190.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NpZ21hcmlzaW5n,size_16,color_FFFFFF,t_70)

## 以管理员身份运行

在powershell点击右键，单击“以管理员身份打开”

## 获取帮助

最好的学习方式是查看帮助，使用get-help命令：

```sh
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

```sh
Restricted 
```

这表示执行脚本是受限的。

现在，使用如下命令修改执行策略:

```sh
set-executtionpolicy remotesigned
```

此时终端会要求你输入一个字母确认你是否要更改执行策略，这里输入`Y`即可。

再次运行如下命令，可以发现执行策略依据更改完成：

```sh
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

```sh
sls -Pattern ex file.txt
```

select-string还支持管道。例如：

```sh
cat file.txt | sls ex
```

