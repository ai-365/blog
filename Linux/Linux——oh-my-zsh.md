
## 安装oh-my-zsh

使用如下一行命令安装ohmyzsh。本质上是先获取安装脚本，然后执行脚本安装。
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

针对国内用户，如果上述方式网络不佳，使用如下方式：

```
sh -c "$(curl -fsSL https://install.ohmyz.sh)
```

## 内置变量和目录约定

ohmyzsh分为内置插件、内置主题、第三方插件、第三方主题。

ohmyzsh的配置文件在~/.zshrc。安装目录在~/.oh-my-zsh。

为了便于重复使用，定义了如下两个环境变量，推荐先检查一下有没有定义：
- ZSH ： ~/.oh-my-zsh
- ZSH_CUSTOM： $ZSH/custom

几个位置：
- 内置插件：$ZSH/plugins
- 内置主题：$ZSH/themes
- 第三方插件：$ZSH_CUSTOM/plugins
- 第三方主题：$ZSH_CUSTOM/thems


![目录约定](https://pic2.zhimg.com/80/v2-f2459e9598a567df3fa36a8eff964265_1440w.webp)
## 使用ohmyzsh的方式管理插件

在\$ZSH/plugins或\$ZSH_CUSTOM/plugins下面，每个目录的名称就是插件的名称，下面有个同名的.plugin.zsh文件，因此目录结构是：

```
.../plugins/
     autojump/
        autojump.plugin.zsh
        ...

```

在~/.zshrc中，修改plugins数组：

```
plugins=(rails git ruby autojump)
```

内置插件名称见 https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins 

如果在\$ZSH/plugins和\$ZSH_CUSTOM/plugins存在同名插件，优先使用ZSH_CUSTOM。

## 使用zsh的方式管理插件

ohmyzsh不是必装的，有的插件并没有为ohmyzsh设计，也就是说没有`插件名.plugin.zsh`入口文件。此时，先下载插件到指定目录，然后在zshrc添加一行source插件的入口脚本，重启zsh即可。
## 主题

在themes目录下，每个主题以.zsh-theme为后缀，前面的就是主题的名字，如 agnoster.zsh-theme。

如下是自带主题列表：

![主题](https://pic3.zhimg.com/80/v2-8581fd2ee5c54625ca112f0377f382f2_1440w.webp)

```
$ZSH_CUSTOM
└── themes
    └── my_awesome_theme.zsh-theme
```

![anoster](https://user-images.githubusercontent.com/49100982/108254745-777cb400-716c-11eb-800a-a8cfa612253f.jpg)

然后在~/.zshrc文件里面中，修改ZSH_THEMES的变量值，指向文件名称（不带.zsh-theme后缀）：

```
- ZSH_THEME="my_awesome_theme"
```

如果不想设置任何主题，则保留变量名为空：

```
ZSH_THEME=""
```

每种主题的预览效果见  https://github.com/ohmyzsh/ohmyzsh/wiki/Themes  

如果在\$ZSH和\$ZSH_CUSTOM存在同名主题，优先使用$ZSH_CUSTOM。


## 自定义脚本

在$ZSH_CUSTOM下面一个或多个新建.zsh文件或房子子目录里面，zsh每次启动时都会执行这些脚本。
## incr_实时补全

incr
incr是一款自动提示插件，功能非常强大，官网演示demo，感受一下：

![incr](https://pic1.zhimg.com/v2-a9a9cc115d4fc56dce323fd3db1e1128_b.gif?consumer=ZHI_MENG)

去这里 http://mimosa-pudica.net/src/incr-0.2.zsh 下载文件，放到plugins的incr目录下。

```
##创建文件夹
mkdir $ZSH_CUSTOM/plugins/incr

##下载
curl -fsSL https://mimosa-pudica.net/src/incr-0.2.zsh -o $ZSH_CUSTOM/plugins/incr/incr.zsh

##配置
echo 'source $ZSH_CUSTOM/plugins/incr/incr.zsh' >> ~/.zshrc

##激活
source ~/.zshrc
```




## autojump

autojump这款插件基本上算是必备插件了，在终端操作里面比较常用的算是文件夹之间的切换，这款插件极大地简化了路径跳转的操作

```
yum install autojump-zsh
chmod 777 /usr/share/autojump/autojump.bash
echo "/usr/share/autojump/autojump.bash" >> ~/.zshrc
source ~/.zshrc
```

![autojump](https://pic1.zhimg.com/v2-fffd39bdd01464f8df7ad17fa6c7ada0_b.gif?consumer=ZHI_MENG)

以前的cd code现在可以直接j c，路径越长，该插件效果就越明显

## zsh-autosuggestions：历史补全

这是一个命令自动补全插件，当你输入命令的几个字母，它会自动根据历史输入进行自动补全，然后按→，安装也很简单：
```
git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
vim ~/.zshrc
# 加入插件列表
plugins=(
  git
  zsh-autosuggestions
)
source ~/.zshrc
```


![自动补全](https://pic4.zhimg.com/v2-8195a9fb188ff4e892a7bba1d178890b_b.gif)


## 语法检查zsh-syntax-highlighting

平时我们输入Linux命令的时候，只有在执行的时候才知道输错命令了，这款插件可以实时检测命令是否出错。命令错误显示红色，直至正确才为绿色，路径正确会添加下划线。

新版本的插件使用脚本形式（.zsh）而不是插件形式（.plugin.zsh），因此不是修改plugins数组了，而是在结尾添加source命令。

下载到指定目录：

```
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting
```

修改.zshrc：

```
echo  "source  zsh-syntax-highlighting.zsh的路径"  >> ~/.zshrc
```

## zsh-history-substring-search 历史记录关键字匹配



https://github.com/zsh-users/zsh-history-substring-search/