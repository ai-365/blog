<p id="toc">目录：</p>
<a href="#toc" style="position:fixed; opacity:0.1;bottom:5vw;left:5vw;font-size:1.5rem ">🔼</a>

- [form元素](#form元素)
- [表单输入验证](#表单输入验证)
- [表单元素编组](#表单元素编组)
- [textarea： 多行文字输入](#textarea-多行文字输入)
- [input](#input)
	- [禁用和自动聚焦](#禁用和自动聚焦)
	- [用input元素输入文字](#用input元素输入文字)
	- [用input元素输入密码](#用input元素输入密码)
	- [用input元素生成按钮](#用input元素生成按钮)
	- [用input元素限制输入类型](#用input元素限制输入类型)
- [select表单选择](#select表单选择)



制作一个表单至少需要三个元素： from、input、button。

## form元素

- action ： 数据发送的目的地，通常是一个URL。
- method： 发送到服务器的方法，应该在 get 和 post 中二选一，如果不写，默认值为get。然而，大多数表单发送数据时需要使用post。
- enctype： 浏览器发送到服务器的数据采用的编码方式。详情见下文。
- autocomplete： 控制表单的自动完成。on表示开启，off表示关闭。
- target ： 提交表单后服务器反馈的信息显示在哪里。默认情况下反馈信息会替换表单所在的原页面。可选值见下文。
- name： 为表单设置一个独一无二的标识符。该属性与id不是一回事。


表单的enctype编码方式有三种。

第一种编码方式是application/x-www-form-urlencoded，这是默认方式，也是最常使用的方式。它将每项数据的名值对以&符号链接，组成一个新的字符串，这与URL链接的query部分的语法相同。这种方式的缺点是无法将文件上传。语法示例如下：

```
name1=value1&name2=value2
```
		
第二种编码方式：multipart/form-data。它更为冗长，处理起来更复杂。这种编码方式用于将文件上传到服务器。

第三种编码方式是text/plain。这种编码要谨慎使用，因为没有正式的规范，在各个浏览器中的方式也不相同。

target属性指定提交表单后服务器反馈信息的显示位置，与a元素类似，该属性有如下值：

- `_blank`： 服务器反馈信息显示在新窗口。
- `-parent`：服务器反馈信息显示在父窗框组中。
- `_self`：服务器反馈信息显示在当前窗口，这是默认行为。
- `-top`：服务器反馈信息显示在顶层窗口。
- `<frame>`：服务器反馈信息显示在指定窗框中。

HTML4规定表单元素必须写在`<form></form>中`，在HTML5没有这个约束。只要为form设置了id属性，然后将其它地方的表单元素的form属性值设置为这个id属性值即可。示例如下：

```html
<form id="myform">
	Name:<input />
</form>
<button form="myform" type="reset">Reset</button>
```

在上面这个例子中，button元素写在了form的外面，但由于使用form属性指向了表单的id值，因此与将button直接写在`<form></form>`里面的效果一样。




## 表单输入验证

表单输入验证有三种方式：

- required： 确保输入了值，适用于大多数表单元素。
- min、max ： 只能在指定范围中选。适用于input元素。
- pattern： 正则表达式检测。适用于input元素。

## 表单元素编组


有些时候需要将一部分表单元素编成一个组，此时可以使用fieldset元素。

为了指定元素组的含义，可以使用legend子元素，但该子元素必须是fieldset元素的第一个子元素。

禁用单个input元素可以添加disabled属性，禁用一个元素组也可以添加disabled属性，添加该属性后，此组下的所有input元素都会被禁用。

以下是上面讲解的示例：

```html
<form>
	<fieldset>
		<legend>第一组</legend>
		<p>姓名:<input name="name"></p>
		<p>城市:<input name="city"></p>
	</fieldset>
	<fieldset disabled>
		<legend>第二组</legend>
		<p>住址:<input name="address"></p>
		<p>邮政编码:<input name="postcode"></p>
	</fieldset>
	<button>提交</button>
</form>
```




##  textarea： 多行文字输入

textarea用来输入多行文字，属性如下：

- rows： 显示行数
- cols： 显示列数。
- wrap： 控制插入换行符的方式，有两个值：hard和soft。

##  input 

input元素不仅仅可以输入文字，只要是需要用户通过交互提供信息的都可以使用input，例如按钮、数字、密码、单选、多选等。

### 禁用和自动聚焦

要禁止用户在某个input元素上输入，需要为该input元素添加disabled属性。

要在表单显示出来的时候自动聚焦到某个input元素，需要为该input元素添加autofocus属性。需要注意的是，autofocus只能用来一个元素上，如果多个元素都有这个属性，则只有最后一个有效。

### 用input元素输入文字

要使用input元素输入文字，则指定type属性值为text即可，习惯上称这种input元素为文本框。此时input元素还可以指定如下属性：

- dirname： 指定文字的方向。
- list： 指定为文本框提供建议值的datalist元素，其值为datalist元素的id值。
- maxlength： 设定可以在文本框中输入的最大字符数。如果用户输入了更多的字符，则浏览器会忽略超出的字符。
- pattern： 指定一个用于输入验证的正则表达式。
- placeholder： 指定提示内容。
- readonly： 将该文本框设为只读。
- required： 该文本框必须输入。
- size： 该文本框中可见的字符数目。
- value：文本框的初识值。


### 用input元素输入密码

将input元素的type属性设置为password，表示该输入框为密码框，用户输入的字符会显示为星号之类的掩饰符。此时元素可以设置如下属性，这些属性text型input也有，而且用法相同。

- maxlength： 最大长度。
- patter： 用于验证的正则表达式。
- placeholder： 提示内容。
- readonly： 只读。
- required： 必须输入。
- size： 可见字符数。
- value： 初识密码值。

### 用input元素生成按钮

将input元素的type属性值设置button、submit、reset，可以生成类似button那样的按钮。这三种属性值的区别如下：

- button： 不做任何操作的普通按钮。
- submit： 用来提交表单的按钮。
- reset： 用来重置表单的按钮。

用button型input元素和直接用button的效果是等价的。


### 用input元素限制输入类型

input元素可以表示很多输入模式，除了text型文本框、password型密码框、button型按钮，还可以有很多更实际的输入模式，只要指定type属性即可，如下是更多的type属性可以取的值及其作用，大多数是HTML5新增的：

- checkbox： 将输入限制为一个在“是/否”复选框中进行选择。
- color： 只能输入颜色信息。
- data： 只能输入日期。
- datetime： 只能输入带时区信息的日期和时间。
- datetime-local： 只能输入不带时区信息的日期和时间。
- email： 只能输入电子邮箱。
- month：只能输入年月。
- number： 只能输入整数和浮点数。
- radiobutton： 将输入限制为在一组固定选项中选择。
- range ： 只能输入指定范围内的数值。
- tel： 只能输入电话号码。
- time： 只能输入时间信息。
- week： 只能输入年和星期信息。
- url： 只能输入完全限定额URL。










## select表单选择

select元素为用户提供一个选择列表，每一项都是一个option元素。最终提交到服务器的内容是select元素的name和选择项的value。示例如下：

```html
<select name="favorite">
	<option value="orange">橘子</option>	
	<option value="apple">苹果</option>	
	<option value="banana">香蕉</option>	
</select>
```