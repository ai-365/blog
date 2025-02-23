
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

