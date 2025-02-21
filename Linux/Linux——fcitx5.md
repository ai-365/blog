
几个概念区分
- 输入法框架，即fcitx5程序，只装这个没有什么用
- 输入法引擎，只有安装中文输入法引擎才能输入中文，fcitx5-chinese-addons 包含了大量中文输入方式：拼音、双拼、五笔拼音、自然码、仓颉、冰蟾全息、二笔等
- 配置  fcitx5 的配置文件位于 ~/.config/fcitx5 ，你可以使用文本编辑器编辑配置文件，也可使用 GUI 配置。
- 词典可以帮助改善输入法的使用体验，https://github.com/wuhgit/CustomPinyinDictionary https://github.com/felixonmars/fcitx5-pinyin-zhwiki


请根据仓库的 README 文件将下载或下载解压后的 .dict 文件放置到 ~/.local/share/fcitx5/pinyin/dictionaries/ 文件夹中（如果文件夹不存在，你需要手动新建此文件夹），再重启一下 fcitx5 即可。


仓库内的主题数量有限，如果需要更多主题，可以去 GitHub （https://github.com/search?q=fcitx5+theme&type=Repositories） 发现更多主题。

找到你喜欢的主题并下载到本地后，将解压后的文件放到 ~/.local/share/fcitx5/themes/ 目录下。

然后从，配置 -> 配置附加组件 -> 经典用户界面 -> 主题 ，切换到你喜欢的主题即可。



新方法：

```
yay -S fcitx5 fcitx5-gtk fcitx5-qt fcitx5-configtool #  fcitx5 输入法框架包
yay -S fcitx5-chinese-addons #中文引擎
yay -S fcitx5-material-color #美化
yay -S fcitx5-pinyin-zhwiki # 词库
```

fcitx5-im包组下包含了我们需要的软件，直接安装fcitx5-im即可。

在/etc/environment文件中加入：

```sh
export XMODIFIERS=@im=fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
```

然后重新加载：

```
source /etc/environment
```

说明，/etc/environment 文件仅包含系统的默认环境变量，但是我们也可以把自定义的环境变量放入这里， /etc/environment里的环境变量不再针对哪一个用户，他对整个系统都生效无论是哪个用户。


对于Manjaro 用户，直接运行一行命令即可：
```
yay -S  manjaro-asian-input-support-fcitx5
```