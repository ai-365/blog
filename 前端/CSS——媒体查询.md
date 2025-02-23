<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;top:60vh;font-size:1.5rem;">🔼</a>

- [利用设备的尺寸](#利用设备的尺寸)
  - [区分width和device- width](#区分width和device--width)
  - [使用\>、\>=、\<和\<=](#使用和)
- [使用Navigator.userAgent判断设备类型](#使用navigatoruseragent判断设备类型)

##  利用设备的尺寸

媒体查询主要用于区分手机、平板、电脑，以及横屏、竖屏的状态，以便于根据用户的屏幕种类及状态，呈现合适的布局。主要根据屏幕的宽度来推断。

min-width : 视口宽度大于某个值时
max-width： 视口宽度小于某个值时
and  ：同时满足两个条件


如下是一个示例，div的宽度为视口宽度的80%，当其实际宽度小于400px时，为红色；在400到600px之间时，为绿色；大于600px时，为蓝色。

```html
<style>
@media (max-width:400px)  {
    #media-query{
        background: red;
    }
}
@media (min-width:400px)  and (max-width:600px){
         #media-query{
             background: green;
        }
}
@media (min-width:600px){
         #media-query{
            background: blue;
        }
}
</style>
<div id="media-query" style="width:80vw;padding:20px;">随着视口的宽度变化颜色</div>
```

通过改变窗口大小查看效果：

<style>
@media (max-width:400px)  {
    #media-query{
        background: red;
    }
}
@media (min-width:400px)  and (max-width:600px){
         #media-query{
             background: green;
        }
}
@media (min-width:600px){
         #media-query{
            background: blue;
        }
}
</style>
<div id="media-query" style="width:80vw;padding:20px;">随着视口的宽度变化颜色</div>

### 区分width和device- width

在@media()中，width指的是视口的宽度，device-width指的是设备的宽度。设备宽度是固定的，视口宽度随着当前应用窗口的缩放而变化。



###  使用>、>=、<和<=

对于现代桌面浏览器，可以使用>、>=、<和<=等数学符号直观的界定视口变化点。

例如上面的例子可以改写为：

```html
<style>
@media (width<400px)  {
    #media-query{
        background: red;
    }
}
@media (width>=400px)  and (width<=600px){
         #media-query{
             background: green;
        }
}
@media (width>600px){
         #media-query{
            background: blue;
        }
}
</style>
<div id="media-query" style="width:80vw;padding:20px;">随着视口的宽度变化颜色</div>
```

效果：


<style>
@media (width<400px)  {
    #media-query{
        background: red;
    }
}
@media (width>=400px)  and (width<=600px){
         #media-query{
             background: green;
        }
}
@media (width>600px){
         #media-query{
            background: blue;
        }
}
</style>
<div id="media-query" style="width:80vw;padding:20px;">随着视口的宽度变化颜色</div>


##  使用Navigator.userAgent判断设备类型


在网页开发中，经常需要检测手机网页还是电脑网页，从而调整布局。

通常的方法是检测设备的像素来判断。

但还可以直接通过 navigator.userAgent 来判断。

这样做的好处是用户可以在手机上打开电脑网页，把选择权交换给用户。

<p id="user-agent" style="background:oldLace; padding: 20px;"></p>
<scipt>
        document.querySelector('#user-agent').textContent = navigator.userAgent
</script>

```html
<p>当前设备是:</p><br>

<script>
    document.body.innerHTML += navigator.userAgent
    console.log(navigator.userAgent)
</script>
```


如果是移动端，就会输出：

> Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36 Edg/132.0.0.0

可以通过检测是否包含“Mobile”字符串判定。

如果是桌面端，就会输出：

> (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0


如下示例，如果检测到包含‘Mobile’，则将背景设为红色，否则白色：

```html
  
<p>当前设备是:</p><br>

<script>
    document.body.innerHTML += navigator.userAgent
    console.log(navigator.userAgent)
    
    // 如果包含Mobile，说明是移动端，否则是桌面端 
    if(navigator.userAgent.includes('Mobile')){
        document.body.style.background = 'red'
    }
    else{
        document.body.style.background = 'white'
    }
</script>
```