# input元素与表单提交

## input单行文本

```html



<form action="http://localhost:8080" method='post'>



        <input type="text" name=a">

        <input type="text" name=b">



        <input type="submit">

</form>



```



为了统一表单提交的流程，建议均使用post方法，此时请求体的body为：



```

name1=value1&name2&value2……

```



表单元素中最重要的属性是name，作为提交的body的键，一定要写。



例如，如果在上述两个文本框中分别输入1和2，则提交的请求体的body为a=1&b=2。


## input其它输入类型


input除了type为text的纯文本外，还可以作为特殊文本的输入框。



```html



<form action="http://localhost:8080" method='post'>



        邮箱:<input type="email" name="a"> <br>   

        电话:<input type="tel" name="b">  <br>     

        网址:<input type="url" name="c">    <br>  

        搜索框:<input type="search" name="d"> <br>  

        

        数字:<input type="number" name="e"  min="1" max="10" step="2">  <br>     

        滑块:<input type="range"  name="f"   min="1" max="5" step="1" value="2"> <br> 

        

        日期和时间:<input type="datetime-local" name="g">   <br> 

        日期:<input type="date"  name='h'>   <br>   

        时间:<input type="time"  name="i">  <br>   

        

        颜色:<input type="color" name="j">  <br> 



        <input type="submit">

</form>



```