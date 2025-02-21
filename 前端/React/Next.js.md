

# Next.js

一个页面就导出的react组件，也可以说，一个页面就是一个js、jsx、ts、tsx文件。

每个页面都使用其文件名作为路由。

如果在pages目录下创建了demo.js，内容如下：

```js
export default function Demo(){
    return <h1>Demo Page</h1>
}
```

那么该页面就可以通过/about访问。

## 动态路由

用方括号封装文件夹名，

```js
// pages/users/[name].js
 
import { useRouter } from 'next/router'
 
export default function User() {
  const router = useRouter()
  const { name } = router.query
 
  return <h1>hello, {name}</h1>
}

```

这样一来，就会根据URL具体路径动态的返回页面内容。例如访问/users/zhangsan，就会返回 ` <h1>hello, zhangsan</h1> ` ，访问/users/lisi，就会返回 ` <h1>hello, lisi</h1> ` 。
