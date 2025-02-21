在tailwindcss中，一般而言，默认是手机竖直状态下的屏幕宽度，如果要在手机横屏、大屏上使用不同样式，加前缀md：。

媒体查询一般会添加到样式表的底部，对css优先级的覆盖

移动端->pc端的适配规则：min-width从小到大

```
// 注意 700 和 1000 上下的顺序问题
@media (min-width:700px) {
    .box {
        background: green;
    }
}
 
@media (min-width:1000px) {
    .box {
        background: red;
    }
```



```
当宽度大于等于700px
@media (min-width: 700px) {
    .box {
        width: 200px;
        height: 200px;
        background-color: skyblue;
    }
}
当宽度小于等于960时
@media (max-width: 960px) {
    .box {
        width: 200px;
        height: 200px;
        background-color: skyblue;
    }
} */


```

```
当竖屏时
media (orientation: portrait) {
    .box {
        width: 200px;
        height: 200px;
        background-color: skyblue;
    }
}
当横屏时
@media (orientation: landscape) {
    .box {
        width: 1000px;
        height: 200px;
        background-color: red;
    }
```


```
@media screen and (orientation: landscape) {

  /* 横向样式定义 */

}

 

@media screen and (orientation: portrait) {

  /* 纵向样式定义 */

}
```