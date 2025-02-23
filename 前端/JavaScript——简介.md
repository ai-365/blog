<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [JavaScript的历史](#javascript的历史)
- [JavaScript的组成](#javascript的组成)
- [ES6标准](#es6标准)
- [ES6的新增特性](#es6的新增特性)

##  JavaScript的历史

JavaScript问世于1995年，最初是用于控制浏览器页面行为的脚本语言，例如验证某个字段是否已经填写，或者测试输入值的合法性。后来，欧洲计算机制造商协会（Ecma）下属的TC39委员会发布了ECMA-262，作为ECMAScript的语言标准。1998年，ECMAScript被纳入国际标准。此后，各大浏览器厂商以ECMAScript标准为依据，分别实现了自己的JavaScript语言。时至今日，对ECMAScript支持最好的浏览器是Google Chrome和Microsoft Edge，这两个浏览器均使用了Chromium开源内核。Chromium基于Google开源的V8引擎。

除了作为浏览器的脚本语言，在2009年，Node.js问世。Node.js是一个基于Chrome V8引擎的JavaScript运行时。Node.js在语法上采用了JavaScript语言，同时带来了用于操作服务端的模块，例如：文件系统模块fs、操作系统模块os。Node.js将JavaScript的宿主环境从浏览器端带到了服务器端。

经过了27年的发展，如今的JavaScript已经成长为了最流行的语言之一，以及开发者们最喜爱的编程语言之一。

##  JavaScript的组成

一般而言，我们所说的Javascript指的是客户端Javascript，也就是浏览器中的Javascript脚本。但是，严格来讲，根据使用环境，我们将Javascript分为两类：

* __客户端Javascript__：在浏览器中运行的Javascript。

* __服务端Javascript__：可以访问本地操作系统的Javascript。比如最初的Node.js，以及近几年比较热门的Deno.js、Bun.js。


客户端JavaScript由ECMAScript、BOM、DOM三部分组成：

* __EcmaScript__：即ECMA-262定义的国际标准，定义了语法规则、数据类型、关键字、模块、全局对象等核心语言特性。

* __DOM__（Document Object Model）：文档对象模型，规定了JavaScript如何操作HTML元素。

* __BOM__（Browser Object Model）：浏览器对象模型，用于与浏览器窗口交互，例如页面导航、浏览历史、离线存储等。


以Node.js为例，其Javascript的组成分为如下几部分：

* __EcmaScript__：即ECMA-262定义的国际标准，定义了语法规则、数据类型、关键字、模块、全局对象、异步、代理等核心语言特性。

* __CommonJS__：用于访问本地操作系统的API，包含了大量开箱急用的模块，例如文件系统模块fs、操作系统模块os、Web服务器模块http等。





## ES6标准

ECMAScript 标准自2015年以来每年6月会发布一个新版本。ECMAScript 的某个特性从想法到最终的标准一般会经历stage0——stage4 五个阶段，分别是：strawman（最初想法）、proposal（提案）、draft（草案）、candidate（候选）、finished（完成）。一般而言，一个提案一旦进入草案阶段就很有可能会纳入最终的标准。

在以前，从标准的发布到浏览器厂商的支持又会经历很长的时间，这时可以使用polyfill框架用于实现浏览器暂不支持的特性。不过现在这种情况已经得到了好转，甚至对于很多特性，往往是浏览器厂商率先推出，而后TC39委员会将其作为标准纳入。

## ES6的新增特性

下面列出了自ECMAScript 2015 发布以来的新增特性：

* __ES6__：发行于2015年6月，新增了许多影响深远的特性：箭头函数、模块、迭代器、生成器、期约、反射、代理。ES6的发布对于JavaScript来说是一个里程碑事件，这是经典JavaScript和现代JavaScript的分水岭，奠定了JavaScript繁荣的基础。之后的ES版本也可以统称为“ES6”。

* __ES7__：发布于2016年6月，新增了指数操作符。

* __ES8__：发布于2017年6月，`async/await`、`Object.values()/keys()/entries()`、对象字面量拖尾逗号。async和await又是现代JavaScript发展史上另外一个极其重要的特性。

* __ES9__：发布于2018年6月，新增了`Promise finally()`、异步迭代、剩余和扩展属性。

* __ES10__：发布于2019年6月，新增了数组打平、字符串定长填充等特性。

* __ES11__：发布于2020年6月，新增了可选链、空位合并等特性。

* __ES12__：发布于2021年6月，新增了`Promise any()`、`String.prototype.replaceAll()`等特性。

* __ES13__：发布于2022年6月，新增了顶层`await`、`Array.prototype.at()`、class私有方法 / 静态方法等特性。

* __ES14__：发布于2023年6月，主要新增了数组的非破坏性方法，例如`Array.prototype.toReversed()`、`Array.prototype.toSorted()`等
