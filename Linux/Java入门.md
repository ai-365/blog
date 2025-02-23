<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;top:60vh;font-size:1.5rem ">🔼</a>

- [HelloWorld](#helloworld)
- [包和导入](#包和导入)
- [浮点类型](#浮点类型)
- [泛型数组](#泛型数组)
- [var](#var)
- [ArrayList](#arraylist)
- [HashMap](#hashmap)
- [泛型HashMap](#泛型hashmap)
- [Map](#map)
- [线程](#线程)
- [读取输入](#读取输入)


### HelloWorld


```
public class HelloJava{
        public static void main(String[]  args){
                System.out.println("Hello,Java!");
        }
}
```


### 包和导入

```
import javax.swing.*;
```
###  浮点类型

```
double d = 8.31;
float f = 8.31f;
```

### 泛型数组


```
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
      ArrayList<Integer> arr = new ArrayList<>();
      arr.add(1);   
      arr.add(2);   
      
      System.out.println(arr);
    }
}
```


###  var

var关键字的意思是，让编译器自己推断数据类型，而且一旦推断出来，那么类型不可改变，例如：

```java
var a = 1; 
```

等价于

```java
int a = 1;
```


###  ArrayList

ArrayList 类是一个可以动态修改的数组，与普通数组的区别就是它是没有固定大小的限制，我们可以添加或删除元素。

```java
ArrayList<String> sites = new ArrayList<String>();
        sites.add("Google");
        sites.add("Runoob");
        sites.add("Taobao");
        sites.add("Weibo");
        System.out.println(sites);
    }


[Google, Runoob, Taobao, Weibo]
```


```java
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
      ArrayList arr = new ArrayList();
      arr.add(1);   
      arr.add(2);   
      
      System.out.println(arr);
    }
}
```

会出现警告，原因是类型未经过检查。

### HashMap


```
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
      HashMap m = new HashMap();
      m.put("a",1);
      m.put("b",2);
      System.out.println(m);
    }
}
```


###  泛型HashMap


```
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
      HashMap<String,Integer> m = new HashMap<>();
      m.put("a",1);
      m.put("b",2);
      System.out.println(m);
    }
}
```

### Map


```
Map<String,String> map=new HashMap<>();

map.put("2001", "张三");
map.put("2002", "张三");
map.put("2003", "李四");
map.put("2003", "王五");//键重复，会覆盖上一个，留下最新的

System.out.println(map);//{2003=王五, 2002=张三, 2001=张三}
```

###  线程

```
public class 学习{
    public static void main(String[] args) {
       
       Runnable r=()->{
        while(true){
            System.out.print("A");
        }
       };
       Thread t = new Thread(r);
       t.start();
       while(true){
            System.out.print("B");
        }
    }
}
```


###  读取输入

```
import java.util.*;
public class 学习{
    public static void main(String[] args) {
       
        Scanner in = new Scanner(System.in, "GBK");
        while(true){
            String a = in.nextLine();
            System.out.println(a);
        }

    }
}
```


 - [Python运行时](#python运行时)
 