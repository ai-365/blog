
函数的call()方法是另一种形式的函数调用，例如`a.b(1,2)`等价于`b.call(a,1,2)`。

再比如Symbol.iterator.call(arr)。由于这个例子中被调用的函数是System.iterator，中间有个句点，所有只能写成这种形式。

apply()与call()相比只是传参的形式不同。

