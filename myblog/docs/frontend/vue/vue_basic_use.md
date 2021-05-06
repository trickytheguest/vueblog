# vue的基本使用

- vue官方文档：[https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)

- vue官方指定的视频教程： [https://learning.dcloud.io/#/?vid=0](https://learning.dcloud.io/#/?vid=0)

- Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。

- 开始尝试vue时，可以简单的创建一个`html`文件，并引用cdn上面的`vue.js`文件。

- 官方视频教程中老师是使用的`HBuilder X`来进行编码的。我们也使用`HBuilder X`工具来学习vue。在官方下载 [https://www.dcloud.io/hbuilderx.html](https://www.dcloud.io/hbuilderx.html) 安装即可。

## 1. 第一个vue程序

参考官方文档，需要新建一个`html`文件。并引入`vue.js`引用。

使用`HBuilder X`新建一个`app1.html`的文件，新建后`HBuilder X`会自动为我们添加一些内容：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
	</body>
</html>
```

视频教程中告诉我们引入`vue.js`文件需要在`<head></head>`头部标签中引用。

我们引入标签:

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
	</body>
</html>
```

在`head`头部标签内部增加了`<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>`，这样就引入了`vue.js`文件了。



在以上的基础上，我们`采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统`,在`body`标签中增加内容：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
		  {{ message }}
		</div>
		
		<!-- script脚本包裹了一段js代码 -->
		<script>
			// 在引用vue.js时，会声明一个全局变量Vue
			// 通过`new Vue`的方式可以获取一个Vue的应用
			// 它会返回一个对象，我们称之为应用对象，如`app`
			// 在`new Vue`时需要注意的时候，需要传入一个对象{}作为参数
			// 这个对象{}有两个非常重要的属性，el和data
			var app = new Vue({
			 // el: element 指代元素属性
			 // data: 指代码数据属性，用于保存数据。在视图中声明了哪些变量，就需要在data里面注册，并且为变量进行初始化赋值
			  el: '#app',   // 利用元素选择器方式选中app div对象
			  data: {
			    message: 'Hello Vue!'
			  }
			})
		</script>
	</body>
</html>
```

刚开始看操作指南的时候，不知道`<div>`标签以及`js`内容放在哪里。可以观看视频教程。

我们在浏览器中打开`http://127.0.0.1:8848/vuedata/app1.html`,在页面上可以看到`Hello Vue!`的字符，说明我们的程序起作用了。

我们打开浏览器的`Console`窗口，在其中输入命令:

```sh
app.message
"Hello Vue!"
app.message = 'Hello World!'
"Hello World!"
app.message
"Hello World!"
```

可以看到当修改`app.message = 'Hello World!'`修改`message`的值时，页面上的显示自动发生变化，自动变成“Hello World!”了。



## 2. 指令

### 2.1 v-bind属性绑定指令

在`声明与渲染`文档中，使用了`v-bind`指令来与元素属性与`xxx`保持一致。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<!-- 将span的title属性与message保持一致 -->
			<span v-bind:title="message">
				鼠标悬停几秒钟查看此处动态绑定的提示信息！
			</span>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			// 在引用vue.js时，会声明一个全局变量Vue
			// 通过`new Vue`的方式可以获取一个Vue的应用
			// 它会返回一个对象，我们称之为应用对象，如`app`
			// 在`new Vue`时需要注意的时候，需要传入一个对象{}作为参数
			// 这个对象{}有两个非常重要的属性，el和data
			var app = new Vue({
				// el: element 指代元素属性
				// data: 指代码数据属性，用于保存数据。在视图中声明了哪些变量，就需要在data里面注册，并且为变量进行初始化赋值
				el: '#app', // 利用元素选择器方式选中app div对象
				data: {
					message: '页面加载于 ' + new Date().toLocaleString()
				}
			})
		</script>
	</body>
</html>
```

我们在浏览器中打开`http://127.0.0.1:8848/vuedata/app1.html`,将鼠标停留在字符`鼠标悬停几秒钟查看此处动态绑定的提示信息！`处，可以看到`title`属性显示出来`页面加载于 2021/5/6下午11:24:17`。

并打开`Elements`，选择该处字符，也可以看到`<span title="页面加载于 2021/5/6下午11:24:17">鼠标悬停几秒钟查看此处动态绑定的提示信息！</span>`，说明的确将`message`数据渲染到`span`的`title`属性当中了：

![](https://meizhaohui.gitee.io/imagebed/img/20210506232847.png)

### 2.2 v-if条件判断指令

我们可以使用`v-if`指令来判断是否显示某个元素。如下示例：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<!-- 使用v-on:click事件监听指令绑定点击事件 -->
			<button v-on:click="change">点击我，下面的字符将会消失(再次点击，则会显示)</button>
			<!-- 使用v-if指令进行条件判断,当seen为true时，才显示 -->
			<p v-if="seen">现在你看到我了</p>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			// 在引用vue.js时，会声明一个全局变量Vue
			// 通过`new Vue`的方式可以获取一个Vue的应用
			// 它会返回一个对象，我们称之为应用对象，如`app`
			// 在`new Vue`时需要注意的时候，需要传入一个对象{}作为参数
			// 这个对象{}有两个非常重要的属性，el和data
			var app = new Vue({
				// el: element 指代元素属性
				// data: 指代码数据属性，用于保存数据。在视图中声明了哪些变量，就需要在data里面注册，并且为变量进行初始化赋值
				el: '#app', // 利用元素选择器方式选中app div对象
				data: {
					seen: true
				},
				methods: {
					change: function() {
						this.seen = !this.seen
						console.log(this.seen)
					},
				}
			})
		</script>
	</body>
</html>

```

运行程序，`seen`初始状态下值为`true`，当点击按钮时，会调用`change`方法，`change`方法会改变`seen`的值，将其取反，这样不停点击按钮时，下面的字符会循环显示或消失。

![](https://meizhaohui.gitee.io/imagebed/img/20210506234630.png)

### 2.3 v-for循环指令

使用`v-for`指令可以循环迭代某一对象。

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<ol>
				<!-- 使用v-for指令绑定数组的数据，进行循环迭代 -->
				<li v-for="todo in todos">
					{{ todo.text }}
				</li>
			</ol>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			// 在引用vue.js时，会声明一个全局变量Vue
			// 通过`new Vue`的方式可以获取一个Vue的应用
			// 它会返回一个对象，我们称之为应用对象，如`app`
			// 在`new Vue`时需要注意的时候，需要传入一个对象{}作为参数
			// 这个对象{}有两个非常重要的属性，el和data
			var app = new Vue({
				// el: element 指代元素属性
				// data: 指代码数据属性，用于保存数据。在视图中声明了哪些变量，就需要在data里面注册，并且为变量进行初始化赋值
				el: '#app', // 利用元素选择器方式选中app div对象
				data: {
					todos: [{
							text: '学习 JavaScript'
						},
						{
							text: '学习 Vue'
						},
						{
							text: '整个牛项目'
						}
					]
				},
			})
		</script>
	</body>
</html>

```

此时页面显示如下：

![](https://meizhaohui.gitee.io/imagebed/img/20210506235157.png)

些时我们可以在控制通过`app.todos[index].text`来获取`index`索引对象的文本值：

```sh
# 获取索引值为0的文本值
> app.todos[0].text
< "学习 JavaScript"

# 获取索引值为1的文本值
> app.todos[1].text
< "学习 Vue"

# 获取索引值为2的文本值
> app.todos[2].text
< "整个牛项目"

# 添加一个新元素
> app.todos.push({text: "好项目"})
< 4

# 弹出一个元素
> app.todos.pop()
```

`push`和`pop`可以将元素压入到列表中，或从列表中弹出一个元素。



