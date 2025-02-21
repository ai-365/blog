
## 无歧义的路径

例如，下面这种方式是没有歧义的，就表示当前目录下的xxx.js。
require('./xxx.js');

如果是require(‘./xxx’)呢？

- 第一步，在同目录找同名js文件，就是找有没有xxx.js，如果没有，进行下一步。不过，要说明的是，有些工具会找同名的其它文件，如xxx.css等。
- 找xxx文件夹，如果有文件夹，看里面有没有有package.json，根据main属性得到入口文件，如果没有，则找index.js。
- 以上都没成功，就会报错。





require('xxx')

第一步，找内置模块 xxx

第二步，找同目录node_modules文件夹下的xxx文件夹，找到了就下一步

第三步，在xxx文件夹里找package.json，根据main获取入口文件，如果没有main属性则找index.js，如果都不存在，这个文件夹就不是的。

第三步，往上递归到父文件夹，重读第二第三步。不成功就继续往上递归，一直递归到磁盘根目录。

如果磁盘根目录也找不到，则找用户文件夹下的node-modules，重复第三步。

以上就是node会去依次查找的node_moudules文件夹，node在名字匹配的文件夹内会按package.json-main属性-index.js的顺序排查。

如果所有的node_modules文件夹都找遍了，都没成功，则报错。


