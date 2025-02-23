
**将字典转化为json文本**

使用json模块的dumps()方法可以将对象转换为json文本：

```
import json
di = {'姓名':'张三', '国籍':'中国'}
jsonStr = json.dumps(di, ensure_ascii=False)
print(jsonStr)
```

注意，由于中文编码的问题，一定要加上ensure_ascii=False，以保证中文输出。

得到的jsonStr就是一个普通的文本，可以将该文本存成一个json文件。

也可以可以使用dump()方法直接将对象直接存为json文件：

```
import json
di = {'姓名':'张三', '国籍':'中国'}
with open('file.json','w',encoding='utf8') as f :
        json.dump(di, f, ensure_ascii=False)
```
