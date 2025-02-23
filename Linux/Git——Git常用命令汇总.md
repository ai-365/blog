
## 高频使用的命令

大多数时候，我们都是对自己在Github上的个人仓库进行修改和推送，主要会用到如下的命令：

- `git clone https://github.com/用户名/仓库名`：	克隆仓库到本地
- `git add .` ：将所有改动提交到暂存区
- `git commit -m '提交信息'`：	将暂存区提交到本地仓库
- `git push`	：	将本地仓库同步到Github
- `git pull`	：	同步Github到本地仓库

## 分支操作



- `git branch`	：	查看本地分支，输出内容中带`*`的为当前分支
- `git branch -r`	：	查看远程的分支，输出内容中带`*`的为当前远程分支
- `git branch new-branch`	：	新建一个名为new-branch的分支
- `git checkout new-branch`	：	切换new-branch分支为当前分支
- `git branch -m new-name-branch`	：	将当前分支重命名为new-name-branch
- `git branch -b new-branch`	：	新建new-branch分支并切换到新分支
- `git branch -d delete-branch`	：	删除delete-branch本地分支
- `git branch -D delete-branch`	：	强制删除delete-branch本地分支

## 远程仓库


- `git remote`	：	显示远程仓库
- `git remote -v`	：	详细显示远程仓库
- `git remote add user-defined-name https://github.com:用户名/仓库名`	：	新建远程仓库
- `git remote rm user-defined-name`	：	删除远程仓库
- `git remote rename old-user-defined-name new-user-defined-name`	：	重命名远程仓库

请注意，使用 git remote 新建远程仓库之前，一定要确保当前文件夹是Git文件夹，即当前文件夹下存在 .git 文件夹。

## 推送


- `git push remote-repo  local-branch:remote-branch`	：	将本地仓库的分支上传到远程仓库的分支
- `git push remote-repo  branch-name`	：如果本地和远程仓库的分支名一样，那么可以这样简写
- `git push -f remote-repo local-branch:remote-branch` ： 忽略其它的提交，强制推送，-f 也可以写成 --force，注意 -f 选项谨慎使用。

