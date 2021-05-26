# 动态绑定class或style样式

操作元素的`class`和`style`样式也是常见需求。Vue可以对元素的`class`和`style`进行动态绑定。

- 官方文档地址： [https://cn.vuejs.org/v2/guide/class-and-style.html](https://cn.vuejs.org/v2/guide/class-and-style.html)

绑定样式说明：

- HTML中`class`属性定义了元素的样式类名。
- HTML中`style`属性定义了HTML文档的样式信息。
- Vue中可以通过`v-bind:class`来动态绑定样式类名。
- Vue中可以通过`v-bind:style`来动态绑定样式信息。
- `v-bind:class`和`v-bind:style`都支持对象形式或数组形式进行绑定。
- 对象语法形式：
  - `v-bind:class="{ active: isActive, 'text-danger': hasError }"`
  - `v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"`
- 数组语法形式：
  - `v-bind:class="[activeClass, errorClass]"`
  - `v-bind:style="[baseStyles, overridingStyles]"`
- 数组中使用三元表达式：
  - `<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>` 这样会根据`isActive`是否为真，来添加`activeClass`样式类，而`errorClass`样式类始终会被添加。
- 数组中使用对象语法：
  - `<div v-bind:class="[{ active: isActive }, errorClass]"></div>` 当数组中有多个样式需要进行条件判断时，使用三元表达式显得繁琐。



本节示例代码如下：

```html
<!DOCTYPE html>
<!-- name.html -->
<html>
	<head>
		<meta charset="utf-8">
		<title>Class 与 Style 绑定</title>
		<!-- 开发环境版本，包含了有帮助的命令行警告 -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
		<style>
			.static {
				width: 150px;
				height: 150px;
				border: 2px solid black;
			}

			.active {
				font-size: 20px;
				margin: 10px;
				background: green;
			}

			.text-danger {
				background: red;
			}

			.text_warn {
				background: orange;
			}
		</style>
	</head>
	<body>
		<div id="app" style="margin-left: 100px;">
			<div style="width: 150px; height: 150px;text-align: center;line-height: 150px;"
				v-bind:class="{active: isActive}" class="static">
				hi vue
			</div>
			<div class="static">
				不使用动态绑定,显示150*150大小黑色边框的div
			</div>
			<!--
			由于isActive值为true，为真，所以对象中的`active`属性样式类可用。
			注意，此处`active`外面带不带引号都可以。
			hasError值为false，为假，所以对象中的`text-danger`属性样式类不可用。
			注意，此处因`text-danger`样式类名称中间有个`-`横线，因此必须带引号，
			否则会提示异常`
			[Vue warn]: Error compiling template:
			invalid expression: Unexpected token '-' in
			{active: isActive, text-danger: hasError}`,
			因此必须加上引号括起来。
			所以只渲染static active样式， 
			显示一个绿色的div块
			-->
			<div class="static" v-bind:class="{active: isActive, 'text-danger': hasError}">
				绿色div,字体20px，向右移动10px
			</div>
			<!--
			由于isActive值为true，是真，再使用!isActive取反，就是假，
			因此ative样式不起作用。
			!hasError值为true，所以渲染static text_warn样式类
			最终显示一个橘色的div
			-->
			<div class="static" v-bind:class="{'active': !isActive, text_warn: !hasError}">
				橘色div
			</div>
			<!--绑定的数据对象不必内联定义在模板里，也可以直接绑定data数据里的一个对象-->
			<div class="static" v-bind:class="classObject">
				在data中的对象元素中定义样式类对象
			</div>
			<!--也可以绑定一个返回对象的计算属性，这是一个常用且强大的模式-->
			<div class="static" v-bind:class="classComputedObject">
				通过计算属性返回样式类对象
			</div>

			<h4>内联样式</h4>
			<div class="static" v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">内联样式设置字体颜色和大小</div>
			<!--绑定样式对象-->
			<div class="static" v-bind:style="styleObject">内联样式设置字体颜色和大小</div>
			<!--数组语法绑定多个样式-->
			<div class="static" v-bind:style="[ styleObject, overridingStyle ]">内联样式设置字体颜色和大小</div>
		</div>

		<!-- script脚本包裹了一段js代码 -->
		<script>
			// 去掉 vue 的 "You are running Vue in development mode" 提示
			Vue.config.productionTip = false
			var app = new Vue({
				// 此处的el属性必须保留，否则组件无法正常使用
				el: '#app',
				data: {
					isActive: true,
					hasError: false,
					classObject: {
						active: true,
						'text-danger': false,
					},
					activeClass: 'active', // 此时active和text-danger必须用引号引起来
					errorClass: 'text-danger', // 此时active和text-danger必须用引号引起来
					activeColor: 'green',
					fontSize: 24,
					styleObject: {
						color: 'red',
						fontSize: '24px',
					},
					overridingStyle: {
						'font-weight': 'bold',
						'background': 'yellow',
						'width': '400px',
						'height': '80px',
					}
				},
				computed: {
					classComputedObject: function() {
						return {
							active: this.isActive && (!this.hasError),
							'text-danger': this.isActive || this.hasError,
						}
					}
				}
			})
		</script>
	</body>
</html>

```

