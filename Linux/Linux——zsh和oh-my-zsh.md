
manjaro KDE 自带了 zsh，所以可以直接安装 oh my zsh。


zsh 的内置插件都在 ~/.oh-my-zsh/plugins。第三方插件需要先下载解压到这里

启用插件也很简单，编辑 ~/.zshrc, 将插件名称追加到 plugins=() 中即可。

主题在~/.oh-my-zsh/themes/中。编辑 ~/.zshrc，设置 ZSH_THEME 变量。

## 安装oh-my-zsh

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

