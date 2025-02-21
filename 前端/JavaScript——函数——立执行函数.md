
匿名立执行函数


```
(function() {

  console.log(1)

})()
```


具名立执行函数
```
(function log() {

  console.log(1)

})()

```

传参

```
(function add(a, b) {

  console.log(a + b)

})(1, 2)
```