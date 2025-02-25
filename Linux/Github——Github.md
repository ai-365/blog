<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;top:60vh;font-size:1.5rem ">🔼</a>

- [Github Pages](#github-pages)
  - [确定网页文件夹](#确定网页文件夹)
  - [开启Pages](#开启pages)
  - [访问地址](#访问地址)
- [Github Actions](#github-actions)
  - [使用规范](#使用规范)
  - [快速上手示例](#快速上手示例)
  - [文件基本结构](#文件基本结构)
  - [层级关系](#层级关系)
  - [name](#name)
  - [run-name](#run-name)
  - [触发器on](#触发器on)
  - [runs-on](#runs-on)
  - [拷贝仓库到运行环境](#拷贝仓库到运行环境)
  - [使用Node.js程序](#使用nodejs程序)
  - [使用python程序](#使用python程序)
  - [run](#run)

##  Github Pages

Github Pages是由Github推出的网页托管服务。许多开源项目的官网、博客都是托管在Github Pages上的。

### 确定网页文件夹

Github Pages的本质是一个静态文件服务器，我们只需要确定静态文件服务器运行在哪个文件夹下即可。你需要考虑的是：
-  使用哪个分支
-  使用这个分支下的哪个文件夹

### 开启Pages

到项目仓库的Setting页面，转到Pages选项卡，选择要部署的分支（默认为master）、部署的文件夹（可选择根目录或docs），然后点击“保存”。等待几分钟后，Pages便部署成功了。

别人将可以通过公开链接访问这个文件夹下的页面和文件。

###  访问地址

如果你的仓库名称是 `<所有者名称>.github.io`，那么Github Pages的访问地址是：`https://<所有者名称>.github.io`。

如果你的仓库名称不是这个，那么Github Pages的访问地址是：`https://<所有者名称>.github.io/<仓库名称>`。


##  Github Actions

Github Actions 是基于事件触发的自动化执行工作流，可以理解为一个自动化脚本，在相应的事件（例如推送到Github）发生后自动执行多个步骤。

###  使用规范
在仓库根目录创建.github/workflows 文件夹，在里面新建一个.yml或.yaml文件，例如github-actions-demo.yml。

注意，yml文件对空格要求非常严格，多一个少一个空格都不行，包括：
- 名称后面直接紧接着写冒号
- 冒号后加一个空格，不能多不能少
- 空格后面开始写值
- 对于并列数组，应该相较于上一行缩进2个字符，然后写 `-` ，空一个各自，然后写名称。

更多的语法规则可以参考相关的规范。

### 快速上手示例

```yaml
name: GitHub Actions Demo
run-name: ${{ github.actor }} is testing out GitHub Actions 🚀
on: [push]
jobs:
  Explore-GitHub-Actions:
    runs-on: ubuntu-latest 
    steps:  # 开始写多个步骤
      - run: echo "hello,github actions!"
      - run: echo "你好，Github 工作流！"
      - uses: actions/checkout@v4 # 拷贝仓库到运行容器内
      - uses: actions/setup-node@v4  # 使用Node程序
        with:
          node-version: '20'  #   # 使用的node版本是20
      - run: node --eval 'console.log("hello,github actions!")'  --print # 运行一行node命令
      - run: |
          node -v 
          npm -v
```

### 文件基本结构

一个工作流文件的基本骨架如下：

```yaml
name: 工作流名称
on: 触发器
jobs:
    - 作业1名称:
        runs-on: ....
        steps: ...
    - 作业2名称:
        runs-on: ...
        steps: ...
```

### 层级关系

一个工作流有唯一的名称、监听的事件。一个工作流就是一个yml文件。

一个工作流下有一个或多个作业——jobs。

每个jobs需要指定运行在哪个环境下，例如ubuntu-latest。

每个jobs有一个或多个步骤steps。

每个步骤下有一个或多个命令，到这里才是具体执行的Shell命令。

这个命令既可以是一条命令，也可以将多条命令组合在一起写。

###  name 

工作流名称，可选。该名称将在 GitHub 仓库的“操作”标签页中显示。如果省略此字段，则将使用工作流程文件的名称。

###  run-name

可选 - 从工作流程生成的作业运行名称，该名称将出现在您存储库“操作”选项卡上的作业运行列表中。此示例使用 github 上下文表达式来显示触发作业运行的参与者用户名。

### 触发器on

事件使用on 定义，常用的监听事件是推送push，即每次使用git push到Github时会触发。

###  runs-on

配置作业在哪个操作系统中运行，通常为ubuntu-latest，表示在最新版本的ubuntu系统中运行。

###  拷贝仓库到运行环境

在执行部署时，往往需要先将整个仓库拷贝到运行环境，此时需使用如下指令：

```yaml
uses: actions/checkout@v4
```

这一行指定此步骤将运行 v4 的 actions/checkout 操作。这是一个将您的仓库检出至运行器上的操作，允许您对代码（如构建和测试工具）运行脚本或其他操作。当您的工作流程将使用仓库代码时，您应使用检出操作。

###  使用Node.js程序

Web相关的部署离不开Node.js和npm，Github默认的运行环境已经内置Node.js和npm，只需要指定版本使用即可。如果不指定版本，将使用默认的版本。执行此操作后，后续操作可以直接使用node和npm命令。

```yml
uses: actions/setup-node@v4
        with:
          node-version: '20'
```

###  使用python程序

Python程序是内置的，只需要使用user引入即可：

```
uses: actions/setup-python@v5
    with:
      python-version: '3.x'
```

### run

run关键字指示作业在运行器上执行命令。例如要全局安装一个npm包：

```yml
run: npm install -g bats
```

也可以使用一个run同时运行多个命令，不过要使用竖线换行：

```yaml
run : |
  echo "command1"
  echo "command2"
```