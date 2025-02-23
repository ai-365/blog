## 配置用户名和邮箱

在以后提交到仓库的时候需要指定用户名和邮箱，这里提前进行全局设置，以后默认使用该身份。使用如下命令设置用户名和邮箱：

```sh
git config --global user.name "姓名"
git config --global user.email "邮箱"
```


## 配置SSH秘钥

我们使用Git命令不可避免的要跟Github打交道。要将本地文件上传到Github的仓库，就需要身份鉴权，基于安全的考量，已经不推荐用户名密码的方式，而推荐SSH非对称秘钥的方式。

首先进入Bash环境，运行如下命令：

```ssh
ssh-keygen -t rsa -C "自己的邮箱"
```

运行上述命令后，终端会问你几个问题以进一步完成秘钥文件的生成，其它的可以直接回车以同意默认设置，最重要的是秘钥文件名，默认是`C:\Users\用户名/.ssh/id_rsa`，秘钥文件一般放在家目录，名称可以随便取。如果已经存在同名的秘钥文件记得要修改以免覆盖其它秘钥文件。我们这里使用默认设置。

然后就会在家目录生成两个文件，文件的完整路径如下：

* `C:\Users\username\.ssh\id_rsa`  : 私钥
* `C:\Users\username\.ssh\id_rsa.pub`  ： 公钥

带有pub的是公钥文件，可以分发在网络上。另一个是私钥文件，一定不能泄露。

使用VSCode或记事本打开id_rsa.pub文件，内容只有一行，全选复制。

打开浏览器，输入`https://github.com/settings/keys` ，点击右边的**New SSH Key**，在Title文本框输入一些信息，在Key文本框粘贴我们刚刚复制好的公钥文本，点击**Add SSH Key**，至此ssh秘钥配置完成。

回到本地bash环境，运行如下命令：

```
ssh -T git@github.com
```

第一次运行上述命令可能会输出包含“The authenticity of host 'github.com (20.205.243.166)' can't be established.”的错误信息，这是因为缺少known_hosts文件，手动输入`yes`再按回车即可创建known_hosts文件。

此时再次运行上述命令，会输出：

```
Hi 用户名! You've successfully authenticated, but GitHub does not provide shell access.
```

这表示我们的秘钥已经配置成功！

当然，第一次配置可能不会成功，遇到问题首先多尝试几次，然后将输出内容粘贴到搜索引擎以寻求其它实践者的经验。

另外，由于Github本身的不稳定性，有些时候可能需要一点科学方法才能连上。
