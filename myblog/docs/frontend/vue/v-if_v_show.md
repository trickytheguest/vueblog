# 条件渲染

- `v-if`指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值的时候被渲染。`v-if`配套的还有`v-else`、`v-else-if`，`v-else`和`v-else-if`块都是可选的。如`<h1 v-if="awesome">Vue is awesome!</h1><h1 v-else>Oh no 😢</h1>`
- `v-show`指令也可以根据条件展示元素。如`<h1 v-show="ok">Hello!</h1>`。`v-show`不支持`v-else`。
- `v-if`只有当条件为真时，才进行渲染。而`v-show`不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换，当条件为假时，会使用`style="display:none;"`样式来控制元素不显示。

> 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

我们直接测试一下官方示例：

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

测试代码如下：

```html
<!DOCTYPE html>
<!-- v-if_v-show.html -->
<html>
  <head>
    <meta charset="utf-8">
    <title>v-if与v-show条件渲染的使用</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

    <!-- 参考：https://code.z01.com/bootstrap-vue/docs/#browser -->
    <!-- Load required Bootstrap and BootstrapVue CSS -->
    <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap/dist/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css" />
    <!-- Load Vue followed by BootstrapVue -->
    <script src="//unpkg.com/vue@latest/dist/vue.min.js"></script>
    <script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js"></script>
  </head>
  <body>
    <div id="app" style="margin-left: 50px;">
      <div v-if="type === 'A'">
        A
      </div>
      <div v-else-if="type === 'B'">
        B
      </div>
      <div v-else-if="type === 'C'">
        C
      </div>
      <div v-else>
        Not A/B/C
      </div>
      <b-button variant="success" v-on:click="changeDiv">Change</b-button>
    </div>

    <!-- script脚本包裹了一段js代码 -->
    <script>
      // 去掉 vue 的 "You are running Vue in development mode" 提示
      Vue.config.productionTip = false
      var app = new Vue({
        // 此处的el属性必须保留，否则组件无法正常使用
        el: '#app',
        data: {
          type: '',
        },
        methods: {
          changeDiv: function() {
            let arr = ['A', 'B', 'C']
            // 从arr中随机选择一个元素
            this.type = arr[Math.floor(Math.random() * arr.length)]
          },
        }
      })
    </script>
  </body>
</html>

```

在浏览器中访问页面：

![](https://meizhaohui.gitee.io/imagebed/img/20210531221004.png)

点击按钮后：

![](https://meizhaohui.gitee.io/imagebed/img/20210531221036.png)

再次点击：

![](https://meizhaohui.gitee.io/imagebed/img/20210531221057.png)

查看渲染出来的元素：

![](https://meizhaohui.gitee.io/imagebed/img/20210531222933.png)

此时可以看到，仅包含需要显示的`<div>A</div>`这个元素。并没有包含`<div>B</div>`等元素。

为了演示`v-show`与`v-if`的不同，我们将上述代码中`v-if`直接改成`v-show`，并尝试运行。

刷新页面，可以看到：

![](https://meizhaohui.gitee.io/imagebed/img/20210531223742.png)

- 页面没有显示`A`，也没有显示`Not A/B/C`，这说明`v-show`不支持`v-else`指令。控制台没有报错。
- 页面渲染了`<div style="display: none;">A</div>`，没有渲染其他元素。

当点击`Change`按钮改变`type`的值时，如果`this.type='A'`，则`A`字母会显示出来。此时显示如下：

![](https://meizhaohui.gitee.io/imagebed/img/20210531224251.png)

此时可以看到渲染为`<div style>A</div>`，没有`"display: none;"`样式属性了。说明了`v-show`是通过CSS样式进行切换来改变元素是否显示的。

