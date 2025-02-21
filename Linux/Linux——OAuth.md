OAuth 是 Opne Authorizations的简写。

openid是微信用户在公众号appid下的唯一用户标识（appid不同，则获取到的openid就不同）

![OAuth | 1200](https://bkimg.cdn.bcebos.com/pic/86d6277f9e2f0708ca1c2b2ceb24b899a901f285?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5/format,f_auto)

- AppID 应用ID
- AppSecret 应用的密钥
- Code 临时票据 
- 返回access_token


## github 授权


打开https://github.com/settings/developers 注册一个OAuth应用。需要填写如下信息：

- Application Name：为应用取个名字。
- homepageURL：主页地址
- Authorization Callback URL为回调地址，当用户同意授权后，会回调该地址，并将授权码拼接到地址后面。
- 
注册完毕后会得到Client ID和Client Secret。



获取授权码请求路径 ： 

```
GET  https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}
```

替换成应用的clientId和redirect_url。访问到授权服务器会重定向到redirect_url，并且在地址后面拼接授权码。

```
POST  https://github.com/login/oauth/access_token
```

设置Accept: application/json。

带上body：

```
{
	code: 授权码
	client_id: your_client_id,
	client_secret: your_secret_id,
}
```

得到Access Token，通过此令牌得到用户的信息：

```
Authorization: Bearer OAUTH-TOKEN
GET https://api.github.com/user
```

## Access Token

最终的目的是获得一个Access Token，Access Token 唯一标识用户。

使用Refresh Token 获得一个新的Access Token。


三个地址：

- 请求授权地址，例如 `授权服务器主机名/auth/login` 参数 client_id  redict_id，请求后会打开授权页面
- 点击后，授权服务器返回的地址，即回调地址（携带Code）
- 请求回调地址，会得到Code
- 请求token地址，例如 `授权服务器主机名/auto/access_token` 参数Code + client_id + client_secret 
- 获取Access_token
- 通过Access Token获取用户的OpenID

## 微信授权

参考 ： https://blog.csdn.net/qq_36389060/article/details/124047449

获取 access_token 后可以进行哪些操作？

开发者可通过 OpenID 来获取用户基本信息

**Github授权登陆流程**

步骤| 请求方式 | 请求URL | 请求参数|返回内容
---| ---| ---|---|---
1|GET|`https://github.com/login/oauth/authorize`|client-id| redict-url|授权登陆GitHub的页面
2|GET|`redict_url`|无|request-code
3|POST|`https://github.com/login/oauth/access_token`|client-id、client-secret、request-code|access-token
4|GET|`https://api.github.com/user`|请求头中添加access-token|github-id、github-url等GitHub用户信息

**微信授权登陆流程**

打开微信开发平台，地址：



-    GET  `https://open.weixin.qq.com/connect/qrconnect`       | client-id                 | redict-url                 | 授权登陆微信的页面 |
- | 2   | GET  | `redict_url`                                         | 无                         | request-code               |           |
- | 3   | POST | `https://api.weixin.qq.com/sns/oauth2/access_token`  | appid、secret、request-code | access-token、refresh-token |           |
- | 4   | GET  | `https://api.weixin.qq.com/sns/userinfo`             | 请求头中添加access-token        | 微信用户个人信息                   |           |
- | 5   | GET  | `https://api.weixin.qq.com/sns/oauth2/refresh_token` | appid、refresh-token       | 新的access-token             |           |