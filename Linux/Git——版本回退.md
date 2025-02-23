
##   版本回退

首先，使用git reflog列出提交记录，找到要回退的那条记录的commitID。

然后，使用git checkout命令回退到那次提交对应的状态：

```
get checkout commitID
```
