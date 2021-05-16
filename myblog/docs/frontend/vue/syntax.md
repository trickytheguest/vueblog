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

### 1.2 原始html

如果双大括号中的原始数据是html类型的数据，Vue会将其字符直接原样输出。如果要将其转换成真正的HTML，则需要使用`v-html`指令。请看如下示例：

```html
<!DOCTYPE html>
<!-- filename:rawHtml.html -->
<html>
	<head>
		<meta charset="utf-8">
		<title>解析HTML代码</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<p>Using mustaches: {{ rawHtml }}</p>
			<p>Using v-html directive: <span v-html="rawHtml"></span></p>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			var app = new Vue({
				// 此处的el属性必须保留，否则组件无法正常使用
				el: '#app',
				data: {
					rawHtml: '<span style="color: red;">This should be red.</span>',
				}
			})
		</script>
	</body>
</html>

```

运行后，在浏览器中查看的效果如下：

![](https://meizhaohui.gitee.io/imagebed/img/20210512232500.png)

可以看到使用双大括号解析的数据当作字符串原样输出。而通过`v-html`指令将`rawHtml`数据解析成html标签数据,成功显示了红色样式字体。



::: danger 危险
你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。请只对可信内容使用 HTML 插值，**绝不要**对用户提供的内容使用插值。
:::

注意，你不能使用 v-html 来复合局部模板，因为 Vue 不是基于字符串的模板引擎。反之，对于用户界面 (UI)，组件更适合作为可重用和可组合的基本单位。

### 1.3 Attribute属性

Mustache双大括号语法不能应用于HTML Attribute属性上，此时应使用`v-bind`指令。对于布尔属性(只要存在则意味着`true`)，`v-bind`工作起来有所不同。请看以下示例。

![](https://meizhaohui.gitee.io/imagebed/img/20210513081155.png)

可以看到，在属性中直接使用`id="{{ dynamicId }}`并没有正常解析出id值，而通过`v-bind:id="dynamicId"`则正常解析出id值了。

`<button disabled>`中`disabled`中不带任何值时，按钮也是不可用的，说明只要存在`disabled`属性则其值就是`true`。

`<button v-bind:disabled="isButtonDisabled">`中通过解析`isButtonDisabled`属性的值来确定按钮是否可用。如果我们将`isButtonDisabled`设置为`false`，则按钮可点击。



### 1.4 使用JavaScript表达式

- 对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。
- 每个绑定都只能包含**单个表达式**。

按官方示例。我们编写`use_js.html`文件：

```html
<!DOCTYPE html>
<!-- use_js.html -->
<html>
	<head>
		<meta charset="utf-8">
		<title>模板中使用JavaScript表达式</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app">
			<!-- 正式解析的表达式 -->
			{{ number + 1 }}
			{{ ok ? 'YES' : 'NO' }}
			{{ message.split('').reverse().join('') }}
			<div v-bind:id="'list-' + id"></div>
			
			<!-- 这是语句，不是表达式 -->
			<!-- {{ var a = 1 }} -->
			<!-- 流控制也不会生效，请使用三元表达式 -->
			<!-- {{ if (ok) { return message } }} -->
			<!-- 尝试访问用户自定义的全局变量，不能访问 -->
			<!-- {{ LANG }} -->
			<!-- 使用内置全局变量 -->
			Date()={{ Date() }}<br>
			Boolean()={{ Boolean() }}<br>
			Boolean(0)={{ Boolean(0) }}<br>
			Boolean(1)={{ Boolean(1) }}<br>
			Boolean(-1)={{ Boolean(-1) }}<br>
			Math.PI={{ Math.PI }}<br>
			Number('0.123')={{ Number('0.123') }}<br>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			const LANG = 'VUE' // 增加此行
			var app = new Vue({
				// 此处的el属性必须保留，否则组件无法正常使用
				el: '#app',
				data: {
					number: 1,
					ok: true,
					message: 'Hello,Vue.js!',
					id: 2,
				},		
			})
		</script>
	</body>
</html>

```



此时页面正常解析，页面显示如下：

![img](https://meizhaohui.gitee.io/imagebed/img/20210516103240.png)

此时`div`的id值也能正常解析：

![img](https://meizhaohui.gitee.io/imagebed/img/20210516103430.png)

我们如果把19行的取消注释，此时页面解析会报错：

![img](https://meizhaohui.gitee.io/imagebed/img/20210516103654.png)

提示`avoid using JavaScript keyword as property name: "var"`禁止使用关键字`var`作为属性名。同样，如果将21行取消注释。也会报异常`avoid using JavaScript keyword as property name: "if"`禁止使用关键字`if`作为属性名。

官方文档中指出：

::: warning 警告

模板表达式都被放在沙盒中，只能访问[全局变量的一个白名单](https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js#L9)，如 `Math` 和 `Date` 。你不应该在模板表达式中试图访问用户定义的全局变量。

:::

如我们在Javascript中定义一个全局变量`const LANG = 'VUE'`:

```javascript
		<script>
			const LANG = 'VUE' // 增加此行
			var app = new Vue({
				// 此处的el属性必须保留，否则组件无法正常使用
				el: '#app',
				...省略
```

然后在上面增加内容：

```html
			<!-- 尝试访问用户自定义的全局变量 -->
			{{ LANG }}
```



此时提示异常`vue.js:634 [Vue warn]: Property or method "LANG" is not defined on the instance but referenced during render.`：

![img](https://meizhaohui.gitee.io/imagebed/img/20210516110508.png)

实例中属性或方法`LANG`没有定义。说明这种方式使用全局变量是错误的。

[https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js#L9](https://github.com/vuejs/vue/blob/v2.6.10/src/core/instance/proxy.js#L9)  中定义了一些全局变量：

```javascript
if (process.env.NODE_ENV !== 'production') {
  const allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  )
```

我们可以尝试使用其中的一些变量：

```html
			Date()={{ Date() }}<br>
			Boolean()={{ Boolean() }}<br>
			Boolean(0)={{ Boolean(0) }}<br>
			Boolean(1)={{ Boolean(1) }}<br>
			Boolean(-1)={{ Boolean(-1) }}<br>
			Math.PI={{ Math.PI }}<br>
			Number('0.123')={{ Number('0.123') }}<br>
```

最后在页面上显示如下：

![](https://meizhaohui.gitee.io/imagebed/img/20210516121618.png)