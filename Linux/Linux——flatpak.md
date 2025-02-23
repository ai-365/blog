
安装flatpak：

```
sudo apt install flatpak // 用于 Ubuntu 和相关发行版
sudo dnf install flatpak // 适用于 Fedora 和基于 RPM 的发行版
```


设置flatpak仓库：

```
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

Linux 中大多数重要的基于 GUI 的软件商店都默认允许安装 Flatpak 应用程序。例如，如果你正在使用“软件(Software)”（适用于 Ubuntu 或 Fedora GNOME 版），你可以找到应用程序并点击安装按钮进行安装。

要搜索，使用search，例如：

```
flatpak search 关键字
```

但是，最简单的方法是复制 Flathub 商店 中的安装命令（可在每个应用程序信息页面的底部找到）并将其粘贴到终端。这是安装 Flatpak 应用程序的最快方法。例如：

```
flatpak install org.kde.kdenlive
```

一个简单的 flatpak 命令可以列出所有安装的应用程序。这包括系统应用和你的应用：

```
flatpak list
```

现在，你已经通过上述 Flatpak 命令安装了一个应用程序。但是，如果你想知道架构、版本、分支、许可证和其他信息，该怎么办呢？你可以使用 info 参数来实现。这个命令需要 Flatpak 的 “应用 ID”，你可以通过上面的 flatpak list 命令得到它。例如：
```
flatpak info org.kde.kdenlive
```

也可以先下载好安装包到本地再安装：

```
sudo flatpak install xxx.flatpak
```

flatpak 命令中的 histroy 开关会列出在你的系统中发生的活动，包括安装、更新、卸载和日期时间戳。如果你想调查一些事情，这非常有用。

```
flatpak history
```

flatpak 命令中的 update 参数可以更新所有的应用程序和运行时。当你运行这个命令时，它会显示可用的更新，并要求你确认是否继续。

```
flatpak update
```

要卸载单个应用程序，使用 uninstall 参数和应用程序 ID。例如：
```
flatpak uninstall org.kde.kdenlive
```


要卸载所有应用程序，使用 —all 开关：
```
flatpak uninstall --all
```

即使你卸载了 Flatpak 应用程序，一些应用程序的数据仍然保留在你的系统中，除非你在运行卸载程序时增加一些开关。在你可能想删除所有东西并重新开始使用 Flatpak 的情况下，这是必要的。

要卸载和删除特定应用程序的数据，请使用以下命令。例如：
```
flatpak uninstall -y --delete-data org.kde.kdenlive
```


- flatpak install flathub com.visualstudio.code
- flatpak install flathub com.microsoft.Edge
- flatpak install flathub org.flameshot.Flameshot
- flatpak install flathub md.obsidian.Obsidian
- flatpak install flathub com.obsproject.Studio
- flatpak install flathub org.shotcut.Shotcut