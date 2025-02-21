
JDK是使用React Native构建安卓项目时，需要用到Gradle打包工具，而Gradle又依赖于JDK，因此需要提前安装JDK。注意，JDK版本必须与Gradle的版本对应，目前，Gradle 8.6适配的最高版本是JDK 20。

进入JDK下载页面下载对应的版本，然后安装，本示例安装目录为：`D:\Program Files\Java\jdk-20`。

在用户或系统环境变量设置窗口中，新增一条变量，变量名是JAVA_HOME ，变量值是JDK的安装目录，本例中为`D:\Program Files\Java\jdk-20`。

在PATH环境变量中新增一条：

```
%JAVA_HOME%\bin
```

打开终端，一次运行下面两个命令：

```
javac
java
```

如果输出了帮助信息，则JDK安装配置成功。
