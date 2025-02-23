
发送get请求：

```Python
import requests

r = requests.get('https://www.baidu.com')

# 打印响应码
print(r.status_code)
# 200

# 如果响应为文本，打印响应内容
# 注意，不要加括号
print(r.text)

# 如果响应为json，打印响应内容
# 注意，要加括号
print(r.json())
```

发送post请求：

```
requests.post('https://example.com/post', data={'key': 'value'})
```