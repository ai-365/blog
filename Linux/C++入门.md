<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;top:60vh;font-size:1.5rem ">🔼</a>

- [输出](#输出)
- [整数类型](#整数类型)
- [函数](#函数)
- [浮点数](#浮点数)
- [字符串](#字符串)
- [结构体](#结构体)
- [数组](#数组)
- [for循环](#for循环)
- [if语句](#if语句)
- [三元表达式](#三元表达式)


###  输出

```
cout << "hello,world!" ;
cout  <<  endl ;  
cout << endl << "hello,world" ;
cout  << "hello"  << endl << "world" ;
```

###  整数类型

```
int  a = 1;
cout  << a ;
```


###  函数

-  无返回值无参数

```cs
#  include   <iostream>
using namespace std;

void a(){cout << "hello,world";}

int main(){
    a();
    return 0;
}
```

-  有返回值有参数

```cpp
#  include   <iostream>

using namespace std;

int a(int x){return x+1 ;}

int main()
{

cout << a(2);
        return 0;
}


```


```cpp
#  include   <iostream>
using namespace std;

void print(string msg){cout << msg;}

int main()
{

print("hello,world!");

return 0;
}

```


###  浮点数

```
float a = 1.5f;
    cout << a;
```    
    
默认的带小数点的字面量是double类型，如果需要为float类型，需要在字面量后面加上f。


###  字符串

```cpp
#  include   <iostream>
using namespace std;

int main()
{
    string a = "hello,world你好" ; 
    cout <<a ;
    return 0;
}
```


### 结构体

```cpp
#  include   <iostream>
using namespace std;

struct   people{
    string name;
    int  age;
};


int main()
{
people  p1 = {"tim" , 39} ;
people  p2 = {"cook" , 42} ;
    
cout << p1.name << ":" << p1.age << endl ;
cout << p2.name << ":" << p2.age << endl ;

        return 0;
}


```



###  数组

```java
#  include   <iostream>
using namespace std;

int main()
{
int arr[3] = {1, 2, 3};
    cout << arr[0] << arr[1] << arr[2] ;

        return 0;
}
```

###  for循环

```cpp
#  include   <iostream>
using namespace std;


int main()
{

    for(int i = 0; i<5 ; i++){
        cout << i << endl;
    }

        return 0;
}
```


###  if语句

```cpp
#  include   <iostream>
using namespace std;


int main()
{

int a = 75;
    
    if(a>=80){cout << "优秀";}
    else if(a>=60){cout << "及格";}
    else{cout << "不及格";}

        return 0;
}

```


###  三元表达式

```cpp
#  include   <iostream>
using namespace std;

int main()
{

int a = 75;
    
string result = a>=60? "及格":"不及格";
cout << result ;

return 0;
}

```


