
![ranger | 300](https://camo.githubusercontent.com/b410f2706397b50e183a62e72ea470c31109928d92bbfa357848413843545e33/68747470733a2f2f72616e6765722e6769746875622e696f2f72616e6765725f6c6f676f2e706e67)

功能
- 选择项预览
- 通用文件管理（新建、复制、删除...）
- 与vim一致的按键操作
- 自动使用正确的外部程序打开

安装：

```
sudo apt install ranger
```

安装完成之后，只需要直接运行 ranger 这个命令就可以进入到 ranger 界面了。

基本操作与 vim 中几乎一模一样：
- h –上级目录
- l – 下级目录（回车也可以）
- k/j – 上/下移动光标
- u/d – 上下翻半页（K/J）
- b/f – 上下翻页（PAGEUP/PAGEDOWN）
- H/L – 后退/前进到上一个或下一个历史记录
- gg/G – 跳转到顶端或底端（HOME/END）
- V – 开启/关闭选择模式
- 空格 – 选择/取消选择
- v – 反选
- uv – 取消所有选择
- / – 搜索


更加高级的跳转操作是通过 g + 一个字母实现的，在 ranger 中，只要按下 g，就可以看到弹出窗口中的说明：
![ranger高级操作 | 800](https://ask.qcloudimg.com/http-save/yehe-3147702/f2062a84a2045de911e1a11f6749f77a.png)



ranger 支持添加书签：

- m – 显示书签界面
- m + key – 添加书签
- \` + key – 跳转到 key 所标记的书签位置
