
**打包安卓apk**

首先使用USB或无线的方式连接手机与电脑，然后运行如下命令开始安卓的调试：

```sh
npm run android
```

这会打开Metro程序，这个程序会实时监控源文件的修改，并实时重新编译安卓App。

源代码编写完成后，就可以构建apk了。首先进入android子项目中：

```sh
cd android
```

然后运行如下命令开始打包apk：

```sh
.\gradlew.bat assemble
```

实际上gradlew.bat 还有很多其它子命令，表示不同的任务，使用如下命令查看：

```sh
.\gradlew.bat tasks
```

比较常用的有三个命令：
- .\gradlew.bat assemble： 打包成apk文件，国内应用商店使用这个文件。
- .\gradlew.bat bundle： 打包成aar文件，谷歌应用商店使用这个文件。
- .\gradlew.bat build： 除了打包成安装包，还会进行测试等工作。

打包完成后，在./android/app/build/outputs/apk/release文件夹下，可以找到app-release.apk文件。将这个文件拷贝到手机安装即可。不过，由于app没有签名，会提示不能直接安装，忽略风险继续安装即可。
