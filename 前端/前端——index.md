<p id="toc"></p>
<a href="#toc" style="position:fixed; opacity:0.1;top:60vh;font-size:1.5rem ">🔼</a>
<style>ul{list-style-type:none;}</style>

- [JavaScript](#javascript)
- [Node.js](#nodejs)
- [CSS](#css)
- [HTML](#html)
- [React](#react)
- [Electron](#electron)


<style>
    blockquote{
        background: oldLace;
        padding: 20px  20px 1px;
        border-radius: 10px;
        margin-top: 10px;
        border: none;
    }
    blockquote:nth-of-type(even){
        background: lavender;
    }
</style>

##  JavaScript

> [简介](JavaScript——简介.md)    
> 历史、组成、标准、ES6发布以来的新特性

> [语法规则](JavaScript——语法规则.md)    
> 注释、数据类型（原始、引用）、相等判定

> [字符串](JavaScript——字符串.md)   
> 字符串的特点、原始值引用类型、字符串的实用方法
 
> [正则表达式](JavaScript——正则表达式.md)    
> 文本处理的实用工具

> [数值和布尔类型](JavaScript——数值和布尔类型.md)    
> 数值和布尔类型

> [代理](JavaScript——代理.md)    
> 代理、反射

> [迭代器和生成器](JavaScript——迭代器和生成器.md)    
> 迭代协议、迭代器、生成器

> [数组](JavaScript——数组.md)    
> 新建数组、从其它类型转为数组、数组的特点、数组的方法

> [对象](JavaScript——对象.md)    
> 新建对象、对象的特征、对象的方法

> [函数](JavaScript——函数.md)    
> 函数的语法规则、参数、内部

> [解析URL](JavaScript——解析URL.md)    
> URL()是内置函数，用于解析URL的组成部分，如host、协议、路径、查询参数


> [面向对象](JavaScript——面向对象.md)    
>  类、实例化

> [期约和异步](JavaScript——期约和异步.md)    
> 同步和异步、期约、期约链、async/await、顶层await

> [原型链](JavaScript——原型链.md)    
> 重点内容


> [自定义事件](JavaScript——自定义事件.md)    
> 事件是一切通信的基础，只要涉及到数据传递，必然要用到事件的定义、监听和触发

> [cookie](JavaScript——cookie.md)    
> cookie是早期的浏览器本地存储实现

> [DOM](JavaScript——DOM.md)    
> DOM非常重要，浏览器中的JavaScript的核心

> [Iframe和PostMessage](JavaScript——Iframe和PostMessage.md)    
> Iframe用来内嵌另一个页面，postmessages用于主页面和内嵌页面之间的通信

> [JSON](JavaScript——JSON.md)    
> JSON是最流行的数据交换格式，无论是本地通信还是HTTP

> [Map和Set](JavaScript——Map和Set.md)    
> Map和Set类似于对象和数组，但扩充了一些专有特征

> [WebAPI](JavaScript——WebAPI.md)    
> WebAPI非常丰富，使得浏览器可以得到许多原生能力，如经纬度位置、通知、本地文件系统读写等

##  Node.js

> [与本地系统交互](Node.js——与本地系统交互.md)    
> 读取用户输入、文件读写、目录读写、路径处理、调用系统命令、多进程    

> [模块](Node.js——模块.md)        
> NPM包管理器的使用、模块查找规则、import和require、模块语法    

> [事件](Node.js——事件.md)      
> 使用自定义事件  

> [流](Node.js——流.md)      
> 可读流、可写流、双工流、转换流   

> [HTTP](Node.js——HTTP.md)     
> HTTP协议理论、服务端、客户端、Net模块、Socket、WebSocket    

> [云计算](Node.js——云计算.md)     
> 函数计算、对象存储、云服务相关操作     



##  CSS

> [规则](CSS——规则)  
>  优先级、!im> portant标记

> [定位](CSS——定位.md)      
> 静态定位、相对定位、绝对定位、粘滞定位、锚点定位、浮动定位

> [基本装饰](CSS——基本装饰.md)      
> 背景、边框、轮廓、阴影

> [文本的样式](CSS——文本的样式.md)  
> 单个文字样式、多个文字（段落）样式  

> [过渡和动画效果](CSS——过渡和动画效果.md)      
> 过渡效果、动画效果

> [弹性布局](CSS——弹性布局.md)      
> 重点内容

> [媒体查询](CSS——媒体查询.md)   
> @meida规则、navigator.userAgent
   
> [容器查询](CSS——容器查询.md)     
> 新特性 


##  HTML 

> [表单](HTML——表单.md)    
> 表单是接收用户一系列输入的元素，表单主要包括三大组件：form定义表单、Input接收输入、button提交和重置    

> [表格](HTML——表格.md)    
> 表格可以用来展示结构化的数据    

> [文本相关元素](HTML——文本相关元素.md)    
> 包括段落p、超链接a、以及pre/code    

> [音视频元素](HTML——音视频元素.md)    
> 音视频元素包括两大组件： 音频audio、视频video    


##  [React](React——React)   

>  React是流行的前端组件库，核心思想是虚拟DOM，在每个组件中定义数据、样式和页面

> [新建React项目](React——React#新建项目)     
> [定义样式](React——React#定义style样式)     
> [组件的概念](React——React#组件)     
> [Hooks函数式语法](React——React#react-hooks)     
> [组件传值](React——React#组件传值)     
> [服务端渲染框架Next.js](React——React#服务端渲染ssr框架nextjs)     


##  [Electron](Electron——Electron)

> Electron是一个框架，可以使用Web技术开发开发跨桌面应用

> [入门](Electron——Electron#electron入门)   
> [新建窗口](Electron——Electron#新建窗口)   
> [渲染器进程向主进程发送消息](Electron——Electron#渲染器进程向主进程发送消息)   
> [主进程监听消息](Electron——Electron#主进程监听消息)   