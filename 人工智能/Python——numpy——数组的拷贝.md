
## 拷贝

跟Python的规则一样，如果直接用等号将一个数组赋值给新数组，则为浅拷贝，任何一个数组的更改都会导致另一个的同步更改，因为这两个数组的指针指向同一处内存区域。

如果要进行深拷贝，则应该使用copy()方法，这样，两个数组的指针指向不同的内存区域，两个是完全独立的，更改其中一个并不会影响另一个。
