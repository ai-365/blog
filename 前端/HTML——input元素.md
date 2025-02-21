# input元素

input元素不仅仅可以输入文字，只要是需要用户通过交互提供信息的都可以使用input，例如按钮、数字、密码、单选、多选等。

## 禁用和自动聚焦

要禁止用户在某个input元素上输入，需要为该input元素添加disabled属性。

要在表单显示出来的时候自动聚焦到某个input元素，需要为该input元素添加autofocus属性。需要注意的是，autofocus只能用来一个元素上，如果多个元素都有这个属性，则只有最后一个有效。

## 用input元素输入文字

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


## 用input元素输入密码

将input元素的type属性设置为password，表示该输入框为密码框，用户输入的字符会显示为星号之类的掩饰符。此时元素可以设置如下属性，这些属性text型input也有，而且用法相同。

- maxlength： 最大长度。
- patter： 用于验证的正则表达式。
- placeholder： 提示内容。
- readonly： 只读。
- required： 必须输入。
- size： 可见字符数。
- value： 初识密码值。

## 用input元素生成按钮

将input元素的type属性值设置button、submit、reset，可以生成类似button那样的按钮。这三种属性值的区别如下：

- button： 不做任何操作的普通按钮。
- submit： 用来提交表单的按钮。
- reset： 用来重置表单的按钮。

用button型input元素和直接用button的效果是等价的。


## 用input元素限制输入类型

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







