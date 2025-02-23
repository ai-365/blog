
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

```sh
Get-Alias -Name p*
```

##  创建别名

```
New-Alias -Name gas -Value Get-AuthenticodeSignature
Set-Alias
```


## 内置的常用别名

```sh
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
