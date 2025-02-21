

对数组排序要用到两个函数：sort()和reverse()，这两个函数本质一样，只是一个正序一个倒序。

sort()函数接收一个callback函数作为参数，该函数只需要给出谁大谁小的定义逻辑即可，该函数接收两个值，需要返回正数、0、负数表示排序谁排在前面。这两个函数都会直接修改原数组。

需要特别提醒的是，如果不给sort()传入排序函数，sort()会按照字符串的形式升序排序，哪怕所有元素都是数字，例如：

```js
const arr = [1,3,11,222,2]
arr.sort() )
console.log( arr )    //=> [1,11,2,222,3]，这显然不符合我们的预期
```

来继续看下面几个例子。

对元素均为字符串的数组进行升序排序：

```js
const arr = ['zhang san', 'li si', 'wang wu','zhao liu']
arr.sort( )  
console.log(arr)         // => ['li si', 'wang wu', 'zhang san', 'zhao liu'] ，默认会按照元素的字符进行排序
```

对元素均为数值的数组进行排序，默认为升序：

```js
const arr = [1,3,11,222,2]   
arr.sort( (value1,value2)=>value1-value2 )  
console.log(arr)  //=> [ 1, 2, 3, 11, 222 ]
```

这个例子让参数作减法，返回正数、负数以决定排序逻辑。

在实际应用中，并不是都只对数值或字符串进行排序，比如下面这个例子，无论是什么数组，都应该按照赵、钱、孙、李、周、吴、郑、王的顺序排列：

```js
const str = "赵、钱、孙、李、周、吴、郑、王"
const standard = str.split('、')
const arr = ['王' , '李' ,'周', '赵' ,'吴','钱','郑','孙' ]
arr.sort ( (value1,value2) => standard.indexOf(value1)-standard.indexOf(value2)) 
console.log(arr)
```

这个例子使用了数组的indexOf()方法，通过在标准数组中查询索引，再将索引作减法，以确定谁排在前面。
