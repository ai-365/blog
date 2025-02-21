
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```


```js
axios
      .get("/data.json")
      .then((result) => {
        // result不是直接的返回结果
        console.log(result);
        // result.data才是真正的返回结果
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
```

```
axios.get(url[, config]) 用于获取数据
```


```
axios.post("/date.json",qs.stringify({ data }))
    .then(res=>{
        console.log(res);            
    })
```