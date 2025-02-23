
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

