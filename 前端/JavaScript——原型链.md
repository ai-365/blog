
JavaScript最最初就支持类的定义，不过，ES6之前是使用构造函数的方式，ES6正式支持使用class关键字定义一个类。这两种方式的底层原理是相同的，都是基于原型的继承。

多个实例往往需要共享一些方法，因此我们定义一个类，作为多个实例的构造器，每个实例都使用这个命名空间中的成员。例如，通过Array构造函数实例化了arr1和arr2，我们就说arr1和arr2都继承了Array。Array默认存在一个共享空间，供实例调用，这个共享空间就是实例的原型，默认为构造函数或类的prototype属性的值，即Array.prototype。

类本质上是一个命名空间，包含两个空间：

* 静态成员，可以直接被类调用，例如Array.from()、Object.values()。

* prototype对象，这个对象里面的成员是供实例使用、供子类继承的。例如Array.prototype.forEach()。

虽然不是ES标准，但是大多数浏览器都为实例或子类提供了`__proto__`属性，该属性的值有两种情况：

* 实例对应的类的prototype对象

* 子类的prototype对象对应的父类的prototype对象

例如：

```js
console.log([].__proto__===Array.prototype)
// =>true，空数组实例对应的类是Array

console.log(Array.prototype.__proto__===Object.prototype)
//=> true，Array的父类是Object

console.log(Object.prototype.__proto__===null)
//=> true，Object的父类是null
```

Object的父类是null，这只是标准上的规定，我们需要知道的是，所有类型的起点都源于Object。
我们将上面两个操作串联起来，就形成了一条原型链：

```js
console.log([].__proto__.__proto__===Object.prototype)
```

由此我们可以得出JavaScript的继承逻辑：Object是所有引用类型的继承起点，Object生出Array、Map、Set、Function等类型，再由这些类型生成实例。这些实例拥有丰富的方法，是因为可以通过原型链往上追溯，直到追溯到Object。

因此，要全面了解一个数据类型，从三方面入手：

* 看静态成员

* 看prototype对象中有哪些方法提供给了实例

* 通过`[类名].prototype.__proto__.__proto__....`不断往上追溯，寻找更丰富的方法，提供给实例使用

拿Array类型举例，从三方面入手：

* 看静态成员，有Array.from()、Array.of()、Array.isArray()等静态方法

* 看Array.prototype，有Array.prototype.length、Array.prototype.sort()、Array.ptototype.splice()、Array.prototype.forEach()等诸多方法供数组实例使用。

* 往上追溯，有Object.prototype.toString()、Object.prototype.toString()等方法，这些方法也可以被数组实例使用。

另外要提醒的是，追溯的过程遵循就近原则，从实例本身开始追溯，如果已经找到了成员，那么就会直接使用该成员，而不再继续追溯。

最后要强调的是，不要修改内置类型的prototype对象，也不要修改默认的`__proto__`指向，这些都会改变内置类型本身的行为。实际上，JavaScript语言规定的原型链是让我们去使用的，不是让我们去修改的，在绝大部分情况下，我们用好实例及其API就足够了。JavaScript不是偏向面向对象的语言，其更多侧重于函数式编程。但是对于原型和原型链这个知识点，我们一定要深入理解，这是Javascript语言的核心特性之一。
