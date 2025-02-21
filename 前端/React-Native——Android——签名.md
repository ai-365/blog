
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
