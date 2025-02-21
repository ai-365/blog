
**将json文本转化为Python字典**

使用json模块的loads()方法可以将JSON文本转换为字典：

```
import json
jsonStr = '{"姓名": "张三", "国籍": "中国"}'

di = json.loads(jsonStr)
print(di)

```

jsonStr就是一个普通的字符串，一般来源于对一个json文件的读取，通过使用open()和read()函数读取为字符串即可。

也可以直接加载json文件为Python对象，注意，json文件一定要是utf8编码。例如：

```
import json
with open('file.json',encoding='utf8') as f :
        di = json.load(f)
print(di)
```
