# 模板语法

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，[直接写渲染 (render) 函数](https://cn.vuejs.org/v2/guide/render-function.html)，使用可选的 JSX 语法。

## 1. 插值

### 1.1 文本

使用Mustache语法(双大括号)的文本插值是最常见的数据绑定形式。数据对象发生变化时，插值处的内容一般会发生变更。

Mustache英文的意思是`胡子`，`{{}}`就像人的胡子。

但应注意的是，如果使用`v-once`指令进行插值时，当数据发生变更时，插值处的内容不会更新。

请看如下示例。

```html
<!DOCTYPE html>
<!-- filename:text_mustache.html -->
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<span>Message: {{ message }}</span><br>
			<span v-once>Msg: {{ msg }}</span><br>
			<button v-on:click="changeMessage">Change Message</button>
			<button v-on:click="changeOnceMessage">Change Once Message</button>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			// 在引用vue.js时，会声明一个全局变量Vue
			// 通过`new Vue`的方式可以获取一个Vue的应用
			// 它会返回一个对象，我们称之为应用对象，如`app`
			// 在`new Vue`时需要注意的时候，需要传入一个对象{}作为参数
			// 这个对象{}有两个非常重要的属性，el和data
			var app = new Vue({
				// 此处的el属性必须保留，否则组件无法正常使用
				el: '#app',
				data: {
					message: "消息",
					msg: "不能变的消息",
				},
				methods:{
					changeMessage: function() {
						this.message = 'new message'
					},
					changeOnceMessage: function() {
						this.msg = 'new msg'
					}
				}
			})
		</script>
	</body>
</html>

```

打开浏览器查看，初始状态下信息显示如下：

![](https://meizhaohui.gitee.io/imagebed/img/20210512222139.png)

分别点击`Change Message`和`Change Once Message`，此时，可以看到`vue-devtools`中的`message`和`msg`都发生了变化，但界面上只有`Message`行发生了变化，变成了`new message`，而`Msg`行并没有发生变化。

![](https://meizhaohui.gitee.io/imagebed/img/20210512222457.png)

说明，使用`v-once`只会进行一次插值，数据更新后，页面内容不会发生变化。