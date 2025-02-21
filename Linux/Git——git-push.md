
##  git push

git push的作用是将本地仓库推送到远程仓库，如果之前是用git clone下载下来的仓库，那么在.git文件夹会自动记录远程仓库的地址，那么可以直接运行如下命令推送到远程仓库：

```
git push
```

如果之前是用git init 初始化的本地仓库，那么就需要使用git remote add 先添加远程仓库，一般名称为origin，然后运行：

```
git  push  origin  master:master
```



