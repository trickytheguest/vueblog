# vue的基本使用

- vue官方文档：[https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)

- vue官方指定的视频教程： [https://learning.dcloud.io/#/?vid=0](https://learning.dcloud.io/#/?vid=0)

- Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。

- 开始尝试vue时，可以简单的创建一个`html`文件，并引用cdn上面的`vue.js`文件。

- 官方视频教程中老师是使用的`HBuilder X`来进行编码的。我们也使用`HBuilder X`工具来学习vue。在官方下载 [https://www.dcloud.io/hbuilderx.html](https://www.dcloud.io/hbuilderx.html) 安装即可。

## 第一个vue程序

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


