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
    