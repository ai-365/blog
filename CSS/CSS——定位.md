<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [相对定位](#相对定位)
- [绝对定位](#绝对定位)
- [固定定位](#固定定位)
- [粘滞定位](#粘滞定位)
- [锚点定位](#锚点定位)
- [浮动定位](#浮动定位)

### 相对定位

当一个元素被设置成相对定位后，就会相对于本来所在的位置进行偏移。

但是，相对定位元素偏移到新位置后，其原来的位置并不会被其它兄弟元素递补填充。

```html
<style>
    #相对定位元素 {
        width: 100px;
        height: 100px;
        background: red;
        position: relative;
        top: 50px;
        left: 50px;
    }

    .其它兄弟元素 {
        width: 100px;
        height: 100px;
        background: lightblue;
        margin:10px;
    }
</style>


<body>
    <div class="其它兄弟元素"></div>
    <div id="相对定位元素"></div>
    <div class="其它兄弟元素"></div>
</body>
```



### 绝对定位

当一个元素被设置成绝对定位时，就会被移除正常的布局流，本来所占的位置会被其它兄弟元素递补填充。它独立于容纳块内的其它的兄弟元素，相对于容纳块左上角的距离始终不变。

容纳块是指已经设置relative或absolute的最近的上级元素。如果没有，则容纳块是body元素。

```html
<title>绝对定位</title>
<style>
    #容纳块 {
        width: 400px;
        height: 400px;
        background: aliceblue;
        position: relative;
    }

   #绝对定位元素{
    width: 100px;
    height:100px;
    background: lightblue;
    position: absolute;
    top: 50px;
    left: 50px;
   }

   .其它兄弟元素{
    width: 100px;
    height: 100px;
    background: red;
    margin:10px
   }


</style>

<body>
    <div id="容纳块">
        <div id="绝对定位元素"></div>
        <div class="其它兄弟元素"></div>
        <div class="其它兄弟元素"></div>
    </div>

</body>
```





### 固定定位

当一个元素被设置成固定定位，那么它就会被移除正常的布局流，本来的位置会被其它元素递补填充。同时，无论是滚动还是放缩页面，它相对于页面左上角的距离始终不变。

```html

<style>
    #固定定位元素 {
        width: 100px;
        height: 100px;
        background: red;
         position: fixed;
        top: 50px;
        left: 50px;
    }
    .页面其它元素 {
        width: 100px;
        height: 500px;
        background-color: lightblue;
        margin: 10px;
    }
</style>
<body>
    <div class="页面其它元素"></div>
    <div id="固定定位元素"></div>
    <div class="页面其它元素"></div>
</body>
```

可以滚动页面或放缩浏览器窗口，查看固定定位的效果。    

### 粘滞定位

sticky 英文字面意思是粘，粘贴，所以可以把它称之为粘性定位。

当页面规定没有超出目标区域时，它的行为就像 position:relative；当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。




### 锚点定位

如下是一个锚点定位示例（使用vue组件编写）：
``` html
<script setup>
    import { ref } from 'vue'
    const position = ref('top-center')
</script>

<br>

请选择一个位置：
<select v-model="position">
  <option disabled value="">Please select one</option>
  <option value="right-top">右上角</option>
  <option value="top-center">正上方</option>
  <option value="right-center">正右方</option>
</select>

<br>

<div class="container">
            <div class="anchor"></div>
            <div class="anchor-notice"  :class="position">
                    我是一个需要借助锚点定位的元素
            </div>
</div>



<style scoped>
        /* 锚点定位需要的关键属性： */

     .container {
          width: 500px;
          height: 200px;
          border: 1px solid black;
          position: relative;
       }
        .anchor{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: lightblue;
            margin-left: 150px;
            margin-top: 100px;
            position: absolute;
            anchor-name: --anchor-el;
        }

        .anchor-notice {
            width: fit-content;
            padding: 10px;
            border-radius: 10px;
            background: #DDD;

            position: absolute;
            position-anchor: --anchor-el;
        }

    /*  右上角 */
        .right-top{
            left: anchor(right);
            bottom: anchor(top);
        }

    /* 正上方 */
      .top-center{
            bottom: anchor(top);
            justify-self: anchor-center;
      }

      /* 正右方 */
      .right-center{
           left: anchor(right);
           align-self: anchor-center;
      }
</style>
```


###  浮动定位

把一个元素“浮动”(float) 起来，会改变该元素本身和在正常布局流（normal flow）中跟随它的其他元素的行为。这一元素会浮动到左侧或右侧，并且从正常布局流 (normal flow) 中移除，这时候其他的周围内容就会在这个被设置浮动 (float) 的元素周围环绕。

float 属性有四个可能的值：

-  left — 将元素浮动到左侧。
-  right — 将元素浮动到右侧。
-  none — 默认值，不浮动。
-  inherit — 继承父元素的浮动属性。

浮动一般用于文字环绕图片的场景。一般将小尺寸图片设置为浮动，后面跟一大段文字。在图片上设置float:left或float:right可以实现文字环绕的效果。如下示例：

```html
<img style="width:50px;height:50px;background:lightblue;float:left;" >

<div>
    浮动测试浮动测试浮动测试浮动测试浮动测试
    浮动测试浮动测试浮动测试浮动测试浮动测试
    浮动测试浮动测试浮动测试浮动测试浮动测试
</div>
```

效果如下：

![浮动.png](https://s21.ax1x.com/2025/02/21/pElSlAe.png)