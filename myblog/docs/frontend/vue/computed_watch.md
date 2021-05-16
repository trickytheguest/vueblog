# 计算属性与侦听器

[[toc]]

## 1. 计算属性缓存与方法

我们在前面的章节中 [使用javascript表达式](./syntax.md#_1-4-使用javascript表达式) 中已经使用过以下代码：

```html
{{ message.split('').reverse().join('') }}
```

来对消息进行反转操作。



模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。

在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 `message` 的翻转字符串。当你想要在模板中的多处包含此翻转字符串时，就会更加难以处理。

所以，对于任何复杂逻辑，你都应当使用**计算属性**。

我们测试一下。

```html
<!DOCTYPE html>
<!-- computed.html -->
<html>
	<head>
		<meta charset="utf-8">
		<title>计算属性和侦听器的使用</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app" style="margin-left: 100px;">
			<p>原始消息:"{{ message }}"</p>
			<p>直接在模板中使用JavaScript表达式反转消息:"{{ message.split('').reverse().join('') }}"</p>
			<p>1计算属性反转消息:"{{ reversedMessage }}"</p>
			<p>2计算属性反转消息:"{{ reversedMessage }}"</p>
			<p>3计算属性反转消息:"{{ reversedMessage }}"</p>
			<p>1方法反转消息:"{{ reversedMsg() }}"</p>
			<p>2方法反转消息:"{{ reversedMsg() }}"</p>
			<p>3方法反转消息:"{{ reversedMsg() }}"</p>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			var app = new Vue({
				// 此处的el属性必须保留，否则组件无法正常使用
				el: '#app',
				data: {
					message: 'Hello,Vue.js!',
				},
				computed: {
					reversedMessage: function() {
						console.log('reversedMessage计算属性反转消息')
						return this.message.split('').reverse().join('')
					},
				},
				methods: {
					reversedMsg: function() {
						console.log('reversedMsg方法反转消息')
						return this.message.split('').reverse().join('')
					},
				}
			})
		</script>
	</body>
</html>

```

我们在浏览器中打开页面，并打开控制台。

![](https://meizhaohui.gitee.io/imagebed/img/20210516235541.png)

可以看到，多次使用计算属性反转消息时，计算属性只执行了一次函数；而使用方法反转消息时，每次都会重新执行一次方法函数，存在重复计算。

当我们在控制台将消息重新赋值时，也可以看到计算属性只执行了一次，而通过方法反转消息则执行了三次。

![](https://meizhaohui.gitee.io/imagebed/img/20210517000025.png)

两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

相比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。

这就说明计算属性存在缓存机制。

::: tip 提示

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 **A**，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 **A**。如果没有缓存，我们将不可避免的多次执行 **A** 的 getter！如果你不希望有缓存，请用方法来替代。

:::



现在我们来模拟一个需要较长时间的程序，看看两者之间的区别：

```html
<!DOCTYPE html>
<!-- computed.html -->
<html>
	<head>
		<meta charset="utf-8">
		<title>计算属性和侦听器的使用</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
	</head>
	<body>
		<div id="app" style="margin-left: 100px;">
			<p>原始消息:"{{ message }}"</p>
			<p>直接在模板中使用JavaScript表达式反转消息:"{{ message.split('').reverse().join('') }}"</p>
			<p>1计算属性反转消息:"{{ reversedMessage }}"</p>
			<p>2计算属性反转消息:"{{ reversedMessage }}"</p>
			<p>3计算属性反转消息:"{{ reversedMessage }}"</p>
		<!-- 	<p>1方法反转消息:"{{ reversedMsg() }}"</p>
			<p>2方法反转消息:"{{ reversedMsg() }}"</p>
			<p>3方法反转消息:"{{ reversedMsg() }}"</p> -->
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			//参数n为休眠时间，单位为毫秒:
			function sleep(n) {
				var start = new Date().getTime();
				//  console.log('休眠前：' + start);
				while (true) {
					if (new Date().getTime() - start > n) {
						break;
					}
				}
				// console.log('休眠后：' + new Date().getTime());
			}

			var app = new Vue({
				// 此处的el属性必须保留，否则组件无法正常使用
				el: '#app',
				data: {
					message: 'Hello,Vue.js!',
				},
				computed: {
					reversedMessage: function() {
						console.log('reversedMessage计算属性反转消息')
						console.log(Date())
						sleep(2000);
						console.log(Date())
						return this.message.split('').reverse().join('')
					},
				},
				methods: {
					reversedMsg: function() {
						console.log('reversedMsg方法反转消息')
						console.log(Date())
						sleep(2000);
						console.log(Date())
						return this.message.split('').reverse().join('')
					},
				}
			})
		</script>
	</body>
</html>

```

先把17-19行的方法反转消息注释掉。

此时，在页面上控制台想看输出。

![](https://meizhaohui.gitee.io/imagebed/img/20210517001647.png)

可以看到每次最多只需要2秒钟就显示了所有内容。



现在我们注释掉14-16行，并将17-19行的方法反转消息取消注释。再打开页面查看一下消息。

![](https://meizhaohui.gitee.io/imagebed/img/20210517001933.png)

此时运行。渲染整个页面，每次至少需要6秒钟时间。比使用计算属性加载页面慢得多。



这也就说明了计算属性有缓存机制，可以加快数据显示。



**如果你不希望有缓存，请用方法来替代。**

