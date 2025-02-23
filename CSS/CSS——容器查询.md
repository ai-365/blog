<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;top:60vh;font-size:1.5rem;">🔼</a>



.container为父容器，名称为container，宽度为20vw，即随着视口宽度而缩放。

子div的初识颜色为灰色，当父容器宽度大于200px时，子div会变成浅蓝色。

当父容器的宽度大于300px时，子div会变成蓝色，同时宽度由固定值改为父容器宽度的80%。 

注意：容器的宽度变化只影响其子代和后代，其它的不受影响。 

改变浏览器窗口大小查看颜色变化的效果。


<div class="container">
             我是容器
        <div id="affected-div">
             受影响的子项
        </div>
</div>

<div style="margin-top: 20px;">我是另一个div，不受影响</div>




<style scoped>
    /* 定义一个容器 */
    .container {
        container-type: inline-size;
        container-name: container;
        width: 50vw;
        padding: 10px;
        background: gainsboro;
    }

    #affected-div {
        width: 100px;
        padding:20px;
        background: gainsboro;
    }


    @container container (width > 200px) {
        #affected-div {
            background: lightblue;
        }
    }

    /* 当父容器宽度大于300时，子项背景变蓝，同时宽度由固定值改为父容器宽度的80% */
    @container container (width > 300px) {
        #affected-div {
            background: blue;
            width:80%;
        }

    }
</style>