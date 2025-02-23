<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [JDK](#jdk)
  - [安装](#安装)
  - [在PATH环境变量中添加JDK的路径](#在path环境变量中添加jdk的路径)
- [Android SDK](#android-sdk)
  - [设置ANDROID\_HOME环境变量](#设置android_home环境变量)
  - [下载命令行工具压缩包并解压](#下载命令行工具压缩包并解压)
  - [移动文件到合适的位置](#移动文件到合适的位置)
  - [在PATH环境变量中添加Android SDK的路径](#在path环境变量中添加android-sdk的路径)
  - [安装所需的工具包](#安装所需的工具包)
  - [接受许可](#接受许可)
  - [继续添加PATH环境变量](#继续添加path环境变量)
  - [检查Android SDK是否配置完整](#检查android-sdk是否配置完整)
- [连接手机与电脑](#连接手机与电脑)
  - [有线调试](#有线调试)
  - [无线调试](#无线调试)
  - [ADB命令的使用](#adb命令的使用)
- [JDK的安装和配置](#jdk的安装和配置)
- [Gradle](#gradle)
  - [gradle简介](#gradle简介)
  - [gradle和gradle-wrapper的区别](#gradle和gradle-wrapper的区别)
  - [添加国内镜像仓库](#添加国内镜像仓库)
- [打包成APK](#打包成apk)
  - [签名](#签名)
  - [使用Gradle打包](#使用gradle打包)
- [安卓相关的设置](#安卓相关的设置)
  - [Android项目源码结构](#android项目源码结构)
  - [XML文件中的变量说明](#xml文件中的变量说明)
  - [activity节点](#activity节点)
  - [mainfest节点](#mainfest节点)
  - [application节点](#application节点)
  - [user-permission节点](#user-permission节点)


## JDK

###  安装

去官网（ https://download.oracle.com/ ）下载并安装对应的JDK（JavaSE Development Kit）版本。

注意，要选择与React Native、Android SDK、Gradle兼容的JDK版本，版本太新或太旧会报错，需要根据提示安装合适的版本。

目前，与Gradle 8.6兼容的JDK版本范围是17——20。

在用户环境变量中添加如下条目：

```
变量名：JAVA_HOME
值：D:\Program Files\Java\jdk-20（根据你自己的安装路径修改）
```

### 在PATH环境变量中添加JDK的路径

在用户的Path环境变量新增一条：

```
%JAVA_HOME%\bin
```

注销或重启以使环境变量生效。运行如下命令检查版本：

```
javac -version
```

##  Android SDK

###  设置ANDROID_HOME环境变量

首先，新建一个文件夹作为Android SDK的存放目录，例如：`D:\android-sdk`。目录路径不要带有中文、空格，也不要在需要管理员权限的目录下创建。

然后，设置用户环境变量名`ANDROID_HOME`，其变量值为你刚刚新建的这个目录。

请注意，设置ANDROID_HOME环境变量这个步骤非常重要，Android SDK的许多工具都依赖于读取ANDROID_HOME这个变量，例如sdkmanager安卓包管理工具、adb安卓调试桥，这些工具如果读取不到这个变量，就会报错。后面安装的一些工具包也会放在ANDROID_HOME下。后面我们会频繁使用ANDROID_HOME。

然后，注销或重启电脑以使环境变量生效。

### 下载命令行工具压缩包并解压

使用浏览器访问https://developer.android.google.cn/studio?hl=zh-cn 将页面拉到最底部，可以清晰地找到“仅限命令行工具”，根据平台下载对应的压缩包，这里我们选择Windows版本，压缩包体积应该在150MB左右。

然后解压，将解压出来的cmdline-tools文件夹放到ANDROID_HOME文件夹下。

### 移动文件到合适的位置

经过了上述两步后，现在，你的ANDROID_HOME/cmdlines-tools应该有如下四个子文件或文件夹：bin、lib、NOTICE.txt、source.prolerties。

现在，在ANDROID_HOME/cmdlines-tools中新建一个名为latest的文件夹，将上面的四个文件移动到这里。这一步是官方文档推荐的做法，目的是方便cmdline-tools版本的管理。

现在，你的ANDROID_HOME/cmdlines-tools/latest目录应该有如下4个子文件或文件夹：
- bin
- lib
- NOTICE.txt
- source.prolerties

###  在PATH环境变量中添加Android SDK的路径

在系统的Path环境变量中添加条目：

- `%ANDROID_HOME%\cmdline-tools\latest\bin`

这是为了方便直接调用该文件夹下的sdkmanager.bat。sdkmanager.bat 用于查看、安装、更新和卸载 Android SDK 的软件包。

### 安装所需的工具包

首先，使用如下命令列出可用的软件包及其版本：

```bash
sdkmanager.bat  --list --no_https --proxy=http --proxy_host=g.cn --proxy_port=80
```

后面的--proxy_host表示国内的镜像仓库，因为国外的无法访问。

任何Android SDK都至少需要安装如下三个包：

```bash
sdkmanager.bat "build-tools;34.0.0" "platform-tools" "platforms;android-34" --no_https --proxy=http --proxy_host=g.cn --proxy_port=80
```

安卓模拟器可以选择性安装，或者直接使用真机。

这里对上面3个工具包的含义做一些解释：
- "build-tools;34.0.0" ： build工具，直接安装list列表中最高的那个版本即可，目前是34.0.0。
- "platform-tools" ：平台工具，没有版本选择，默认安装最新版，直接写这个即可。
- "platforms;android-34" ：注意，这里很重要。这里34的意思是安卓的API-Level。简单点说，Android13对应api34，Android13对应api33。一般而言，android-34可以兼容安卓13和12。

使用如下命令检查已经安装的包：

```bash
sdkmanager.bat  --list_installed
```

输出内容：应该至少包含如下三个条目：

```
Installed packages:
  Path                 | Version | Description                | Location
  -------              | ------- | -------                    | -------
  build-tools;34.0.0   | 34.0.0  | Android SDK Build-Tools 34 | build-tools\34.0.0
  platform-tools       | 35.0.0  | Android SDK Platform-Tools | platform-tools
  platforms;android-34 | 3       | Android SDK Platform 34    | platforms\android-34

```

### 接受许可

这个步骤容易被忽略，但却非常非常重要，一定一定要执行！使用如下命令接受许可：

```bash
sdkmanager --licenses
```

系统会提示你接受所有尚未接受的许可。在每一次终端的询问中需要手动输入 y 表示同意使用协议，默认是N（不同意）。

### 继续添加PATH环境变量

在系统的path环境变量中新增如下两项：

- `%ANDROID_HOME%\platform-tools`
- `%ANDROID_HOME%\build-tools\34.0.0`

注销或重启电脑以使环境变量生效。输入如下命令检查环境变量是否生效：

```bash
adb
```

### 检查Android SDK是否配置完整

在React Native项目根目录中，运行如下命令检查Android SDK是否配置完整：

```sh
npx react-native doctor
```

##  连接手机与电脑

###  有线调试

将电脑连接到手机是安卓开发的必备步骤。

以小米手机为例，进入 “设置—— 我的设备——全部参数与信息” ，连续点击 “MIUI版本” 7次，即可打开开发者选项 。

进入“设置——更多设置——开发者选项”，开启“USB调试”、“USB安装”、“USB调试（安全设置）”。


使用数据线连接电脑和手机，会自动触发打开一个弹窗，在弹窗中有“传输照片”、“传输文件”等选项，选择传输文件。

运行：

```sh
adb  devices 
```

输出的内容中，手机设备标识符右边的状态是device表示已连接。注意，一定要是device，其它的单词都表示未连接。


###  无线调试

要使用无线调试，有两个前提条件：

1、 手机已经与电脑使用USB成功连接过一次，且授权没有撤销。对于小米手机，应该要在无线调试页面的下方看到一个“已配对的设备”。
2、 手机与电脑在同一WiFi下，也可以打开电脑上的移动热点。

从有线调试切换到无线调试的过程中，可能需要运行adb kill-server重启一次adb服务，以及重启一次手机上的无线调试开关。重启无线调试开关后，手机的IP地址端口号会改变。



在无线调试页面可以看到手机IP地址和端口，使用adb connect命令连接这个IP地址和端口，例如：

```sh
adb connect 192.168.0.104:39287
```

如果输出connected表示连接成功。

此时，在终端运行 adb devices ，如果设备的状态是device表示连接成功。

###  ADB命令的使用
- adb shell input text "hello" ：输入内容到手机的文本框，需要先在手机上激活一个文本框 
- adb kill-server： 重新启动adb服务  
- adb install my-app.apk：将电脑上的apk安装到手机上
- adb push 1.txt  /storage/emulated/0/1.txt ： 推送文件到手机   
- adb pull 1.txt  /storage/emulated/0/1.txt  ： 拉取文件到电脑

##  JDK的安装和配置

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


##  Gradle

###  gradle简介

gradle是React Native和Flutter调试、构建安卓App的打包工具。gradle可以简单的类比为前端的webpack，webpack将源文件打包成HTML、CSS、JavaScript，而gradle将源文件打包成apk或aar（Android Assemble Bundle）。

React Native项目的android子项目的文件结构如下：

```
.gradle 
app
gradle
        └─wrapper
                └─gradle-wrapper.jar
                └─gradle-wrapper.propertier
build.gradle
gradle.properties
gradlew
gradlew.bat
settings.gradle
```

每个文件的含义如下：
- .gradle : gradle本地配置
- app：apk的输出目录
- gradle/wrapper/gradle-wrapper.propertier： gradle-wrapper的配置文件
- gradle/wrapper/gradle-wrapper.jar： 与gradle-wrapper.propertier对应
- build.gradle ： gradle项目的配置文件
- gradle.properties： gradle项目的配置文件
- gradlew： Linux、MacOS平台构建安卓app时运行的脚本
- gradlew.bat： Windows平台构建安卓app时运行的脚本
- settings.gradle： gradle项目的配置文件

###  gradle和gradle-wrapper的区别

gradle是一个全局、通用的构建工具，而gradle-wrapper是在项目本地目录使用的构建工具。

对于React Native或Flutter而言，并不需要使用gradle，直接运行gradlew.bat脚本即可，gradlew就是gradle-wrapper对应的脚本工具。

###  添加国内镜像仓库

 换源几乎是包管理器的必备操作。有些软件包的仓库在国内是无法访问的，因此需要增加国内的镜像仓库，实际上只需要改两个文件：

- ./android/gradle/wrapper/gradle-wrapper.properties
- ./android/build.gradle

下面依次说明怎么修改。

要修改的第一个文件是gradle-wrapper.properties，只需要修改distributionUrl的那一行，把后面的链接改成国内阿里云的，文件是gradle-8.6-all.zip，注意版本。

```
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https://mirrors.aliyun.com/macports/distfiles/gradle/gradle-8.6-all.zip
networkTimeout=10000
validateDistributionUrl=true
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
```

这里补充说明一下每一行的含义：

- distributionBase ： gradle的根目录。GRADLE_USER_HOME默认为家目录下的.gradle文件夹，保持默认，不要修改。
- distributionPath ：gradle的路径，与上面的根目录组合就是gradle的实际位置。
- zipStoreBase和zipStorePath ： 第三方工具的放置位置。

要修改的第二个文件是build.gradle。这里面的repositories部分定义了gradle应该去哪里下载第三方插件，默认内容是google()和mavenCentral()两个国外仓库。

这两个仓库需要使用挂代理才能使用，但是不能删除，因为有些插件的有些版本国内的镜像仓库并没有，必须要去这里下载。所以保留这两个仓库，在后面添加三个仓库，修改后的内容是：

```
repositories {
     google()
     mavenCentral()
     maven { url 'https://maven.aliyun.com/repository/google' }
     maven { url 'https://maven.aliyun.com/repository/jcenter' }
     maven { url 'https://maven.aliyun.com/nexus/content/groups/public'}
    }
```

##  打包成APK

###  签名

在构建安卓apk时，为apk签名之后才能提交到应用商店。

首先需要使用keytool命令生成密钥文件，keytool命令位于JDK安装目录的bin目录下，在安装JDK时已经将该目录添加到PATH环境变量中了。

进入到项目的android/app/ 目录下，运行如下命令，这会在当前目录生成密钥文件release.keystore：

```
keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
```

然后编辑项目的android/app 目录下的build.gradle，新增release代码段如下所示，storePassword和keyPassword是运行keytool时输入的密码。然后在buildTypes的release代码段中，将debug改成release。修改后的代码部分内容如下：

```
signingConfigs {
        release {
            storeFile file('release.keystore')
            storePassword 'android'
            keyAlias 'release'
            keyPassword 'android'
        }
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }


buildTypes {
          // ...
   release {
       signingConfig signingConfigs.release
         // ....
    }
}

```


###  使用Gradle打包

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

##  安卓相关的设置


###  Android项目源码结构

react native项目通过Gradle工具编译后的安卓项目代码放在android子文件夹下，而安卓子项目的源代码又放在app/src/main目录下，该目录有三个子文件（夹）：
- java： 存放Java或Kotlin代码。
- AndroidManifest.xml： Android应用配置文件。
- res ： 存放资源文件。

其中，res文件夹又有4个子目录：
- drawable： 存放图片文件或图片描述文件。
- layout： 存放页面描述文件，后缀名为xml。
- values： 存放变量定义文件。例如字符串变量strings.xml、颜色变量colors.xml、样式变量styles.xml等。

由于设备的分辨率不同，所以同一张图片往往需要准备不同的分辨率的图片。因此，drawable又有几个子目录：
- drawable-xhdpi： 存放适配720P屏幕的图片。
- drawable-xxhdpi： 存放适配1080P屏幕的图片。
- drawable-xxxhdpi： 存放适配1.5K及以上屏幕的图片。

在这三个目录存放不同分辨率的同名图片，应用在运行时，会自动根据屏幕分辨率选择具体文件夹下的图片。

大致明白了Android项目结构，就可以分析AndroidManifest.xml文件的内容了。因为后缀名是xml，所以AndroidManifest.xml遵循标准的XML语法。一个XML文件的内容是由多级嵌套节点组成的，每个节点通常包含开始标签、节点属性、子节点、结束标签。下面剖析常见的几个节点。


###  XML文件中的变量说明

无论是AndroidManifest.xml，还是页面描述文件，都需要用到变量。

字符串变量放在了res/values目录下的strings.xml中。例如：

```
<resources>
        <string name="变量名">变量值</string>
</resources>
```

这样就可以在其它位置直接使用该变量，加上“@string/”前缀即可：

```
android:label = "@string/变量名"
```

除了字符串变量，另一个经常引用的资源就是图片。假设软件运行在1080P屏幕上，则首先要把图片放到res/drawable/drawable-xxhdpi目录下，然后可以在xml文件中通过属性android:src引用了，格式语法为：

```
android:src = "@drawable/不带后缀名的图片名称"
```


###  activity节点

activity节点是application节点的子节点，它是活动页面的注册声明。一个activity节点代表一个页面，只有在这里注册了activity节点，才能在运行时访问对应的页面。

一个页面通常包含两部分：xml页面描述文件、Java或Kotlin代码文件。

页面描述文件、代码文件、用于注册页面的activity节点的android:name属性，这三个名称应该按照规则对应。用语言描述这种规则不好理解，直接给出示例更加直接，示例如下：

```
页面描述文件名： activity_main.xml
代码逻辑文件名 ： MainActivity.java 或 MainActivity.kt
activity节点：
<activity  android:name=".MainActivity" > </activity>
如果没有子节点，也可以简写成：
<activity  android:name=".MainActivity"  />
```

另外，如果该页面是App的入口页面，还应该在该activity节点下面添加一些内容，修改后的节点内容如下：

```
<activity  android:name=".MainActivity">
        <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER">
        </intent-filter>
</activity>
```



###  mainfest节点

manifest元素是安卓配置文件的根元素。属性包括：
- xmlns： XML版本。
- package： 包名，通常为公司域名的逆序字符串。

###  application节点

application节点是mainfest节点的子节点，指定了应用级别的一些配置信息，主要属性包括：
- android:allowBackup， 是否运行应用备份。为true表示允许，false为不允许。
- android:icon， 指定App在手机屏幕上显示的图标。
- android:label， 指定App在手机屏幕上显示的名称。
- android:roundIcon， 指定App的圆角图标。


###  user-permission节点

user-permission节点是manifest的子节点，与application节点同级。该节点用来声明应用所需的权限。一个权限对应一个user-permission节点，权限名称作为android:name属性的值。

例如，如果应用需要访问网络，则需要声明：

```
<uses-permission android:name="android.permission.INTERNET" />
```

常见的权限名称如下列表。

网络访问类：

- android.permission.INTERNET	允许应用联网
- android.permission.CHANGE_WIFI_STATE 允许程序改变Wi-Fi连接状态
- android.permission.CHANGE_NETWORK_STATE 允许程序改变网络连接状态
- android.permission.BLUETOOTH 允许程序连接到已配对的蓝牙设备
- android.permission.ACCESS_WIFI_STATE 允许程序访问Wi-Fi网络状态信息


电话短信类：

- android.permission.WRITE_SMS 允许程序写短信
- android.permission.READ_SMS 允许程序读取短信息
- android.permission.READ_OWNER_DATA 允许程序读取所有者数据
- android.permission.SEND_SMS 允许程序发送SMS短信
- android.permission.CALL_PHONE 运行程序打电话
- android.permission.WRITE_SETTINGS 允许程序读取或写入系统设置
- android.permission.WRITE_CONTACTS 允许程序写入联系人数据
- android.permission.RECEIVE_SMS 允许程序监控一个将收到短信息，记录或处理
- android.permission.WRITE_CALENDAR 允许一个程序写入用户日历数据

多媒体类：

- android.permission.SET_WALLPAPER 允许程序设置壁纸
- android.permission.RECORD_AUDIO 允许程序录制音频
- android.permission.CAMERA  允许使用照相机的权限
- android.permission.VIBRATE 允许访问振动设备
- android.permission.MODIFY_AUDIO_SETTINGS 允许程序修改全局音频设置

系统设置类：

- android.permission.MODIFY_PHONE_STATE 允许修改话机状态
- android.permission.INSTALL_PACKAGES 允许安装程序
- android.permission.CLEAR_APP_USER_DATA 允许一个程序清除用户设置
- android.permission.DISABLE_KEYGUARD 允许程序禁用键盘锁
- android.permission.CHANGE_CONFIGURATION 允许一个程序修改当前设置
- android.permission.BRICK 请求能够禁用设备
- android.permission.SET_TIME_ZONE 允许程序设置时间区域
- android.permission.SET_ANIMATION_SCALE 修改全局信息比例
- android.permission.REBOOT 请求能够重新启动设备
- android.permission.SET_ORIENTATION  允许旋转屏幕的权限
- android.permission.DELETE_PACKAGES  允许删除安装包权限
- android.permission.FLASHLIGHT  允许访问闪光灯的权限

