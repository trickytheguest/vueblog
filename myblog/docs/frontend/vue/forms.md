# 表单输入绑定

HTML 表单用于收集用户输入。表单元素包括不同类型的 input 元素、复选框、单选按钮、提交按钮等等。

可以使用`v-model`来进行表单元素的双向绑定。

> `v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
>
> - text 和 textarea 元素使用 `value` property 和 `input` 事件；
> - checkbox 和 radio 使用 `checked` property 和 `change` 事件；
> - select 字段将 `value` 作为 prop 并将 `change` 作为事件。

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

## 1. 单行文本输入

使用以下示例来演示单行文本输入。

```html
<!DOCTYPE html>
<!-- forms.html -->
<html>
	<head>
		<meta charset="utf-8">
		<title>表单输入绑定</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
      <input placeholder="edit me" value="message"><br>
      <input v-model="message" placeholder="edit me" value="message"><br>
      <p>Message is: {{ message }}</p>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			var app = new Vue({
				// 此处的el属性必须保留，否则组件无法正常使用
				el: '#app',
				data: {
					message: 'message in data',
				}	
			})
		</script>
	</body>
</html>

```

示例中，上面一个输入框不使用`v-model`进行绑定，指定了`value="message"`，值被直接渲染到输入框中。

而下面一个输入框中使用了`v-model`进行绑定，此时虽然指定了`value="message"`，但被`v-model`忽略，而是使用在`data`属性中声明的初始化值`message in data`，此时输入框中显示的是`message in data`。

![](https://meizhaohui.gitee.io/imagebed/img/20210616221833.png)

## 2. 多行文本

我们修改一下代码：

```html
		<div id="app">
      <p>单行文本</p>
      <input placeholder="edit me" value="message"><br>
      <input v-model="message" placeholder="edit me" value="message"><br>
      <p>Message is: {{ message }}</p>
      
      <p>多行文本</p>
      <span>Multiline message is:</span>
      <p style="white-space: pre-line;">{{ message }}</p>
      <br>
      <textarea v-model="message" placeholder="add multiple lines"></textarea>
		</div>
```

可以看到，在多行文本中增加新行后，在单行文本中显示的是一行，而在多行文本中显示的是多行。

![](https://meizhaohui.gitee.io/imagebed/img/20210616223008.png)

## 3. 复选框

单个复选框绑定到布尔值。选中为true，未选中为false。

多个复选框则绑定到一个数组。在data属性中指定初始化选中的值。

```html
<!DOCTYPE html>
<!-- forms.html -->
<html>
	<head>
		<meta charset="utf-8">
		<title>表单输入绑定</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
      <p>单行文本</p>
      <input placeholder="edit me" value="message"><br>
      <input v-model="message" placeholder="edit me" value="message"><br>
      <p>Message is: {{ message }}</p>
      
      <p>多行文本</p>
      <span>Multiline message is:</span>
      <p style="white-space: pre-line;">{{ message }}</p>
      <br>
      <textarea v-model="message" placeholder="add multiple lines"></textarea>
      
      <p>单个复选框</p>
      <input type="checkbox" id="checkbox" v-model="checked">
      <label for="checkbox">{{ checked }}</label>
      
      <p>多个复选框</p>
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
      <br>
      <span>Checked names: {{ checkedNames }}</span>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			var app = new Vue({
				// 此处的el属性必须保留，否则组件无法正常使用
				el: '#app',
				data: {
					message: 'message in data',
          checked: true,
          checkedNames: ['Mike'], // 初始时选中Mike
				}	
			})
		</script>
	</body>
</html>

```

运行效果如下图:

![](https://meizhaohui.gitee.io/imagebed/img/20210616224352.png)

