一个对象往往有多个名/值对，各个名/值对之间使用逗号隔开，需要说明的是，最后一个名/值对后面的逗号也是允许的，并不会报错：

```js
const obj = {
	a:1,
	b:2,
	c:3,
}
```

这个宽松的语法特性在需要频繁复制粘贴追加的属性时非常有用，因为格式是统一的，我们不需要频繁的增减逗号。

不过，需要特别说明的是，JSON的写法类似于对象，不过，JSON的写法与对象有两个最大的不同：
* JSON字符串中的对象的属性名必须加引号。
* JSON字符串中，对象不允许使用拖尾逗号，使用会报错。
