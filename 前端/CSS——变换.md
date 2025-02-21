

```html

<body>

    <style>

        h1:hover {

            transform: rotate(180deg)

        }



    </style>



    <h1>Hello</h1>



</body>

```





## 平移

```

<body>

    <style>

        h1:hover {

            transform: translateX(50px)

        }



    </style>



    <h1>Hello</h1>



</body>

```



## 变换汇总



translate(x, y)	向右向下平移

translateX(x)	向右平移

translateX(y)	向下平移

scale(x,y)	x为宽的缩放比例，y为高的缩放比例

scaleX(x)	宽的缩放比例为x

scaleY(y)	高的缩放比例为y

rotate(ndeg)	顺时针旋转n度

rotateX(ndeg)	绕x轴旋转n度

rotateY(ndeg)	绕y轴旋转n度

skew(ndeg,mdeg)	绕x轴倾斜n度，绕y轴倾斜m度

skewX(ndeg)	绕x轴倾斜n度

skewY(ndeg)	绕y轴倾斜n度



## 典型示例



```


<body>

    <style>

        div{

            width: 100px;

            height: 100px;

            background-color: aquamarine;

            margin-bottom: 50px;

        }

        .translate:hover {

            transform: translate(50px, 50px)

        }

        .scale:hover {

            transform: scale(2, 2)

        }

        .rotate:hover {

            transform: rotate(45deg)

        }

        .skew:hover{

            transform: skew(45deg)

        }

    </style>

    

    <div class="translate"></div>

    <div class="scale"></div>

    <div class="rotate"></div>

    <div class="skew"></div>

</body>

```