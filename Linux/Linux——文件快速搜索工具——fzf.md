![fzf | 500](https://raw.githubusercontent.com/junegunn/i/master/fzf.png)

官网： https://github.com/junegunn/fzf 

可以搜索的项目：
- 文件
- 历史记录
- 进程
- 主机名
- 书签
- git提交记录
- 等等

安装： 
```
sudo apt install fzf
```


## 用法

快捷键：
- Ctrl+T 在命令行粘贴已选择的文件或目录
- Ctrl+R 从历史记录中粘贴选择项到命令行
- Alt+C cd到选择项

**自动补全**

输入`**`，按Tab触发自动补全

fzf 将启动交互式查找器，从 STDIN 读取列表，然后编写 选定项目到 STDOUT，其原理如下：

```
find * -type f | fzf > selected
```

**为 fzf 应用边框**

你可以使用 --border 选项为 fzf 应用边框，有多种边框可用，如 rounded（圆角）、sharp（尖角）等。
```
fzf --border=rounded
```

**使用 fzf 在 Bash 历史中进行搜索**

当然，Bash 历史记录中有 CTRL+R 的反向搜索功能。但如果你想使用 fzf 来获得更好的外观，可以运行以下命令：

history | fzf

**在 fzf 中预览文件**

有时，如果你可以获得你搜索的文件的小型预览，那会很有帮助。

幸运的是，fzf 提供了一个预览选项。你可以使用 --preview 来访问它。我在这里使用 find 命令使其更加有用。

find /home/$USER -type f | fzf --preview 'less {}'



