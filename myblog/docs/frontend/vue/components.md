# 组件基础

[[toc]]

- 组件是可复用的Vue实例，且带有一个名字，这个名字就是组件的名称。
- 因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项，组件没有`el`选项。
- 组件中的`data`必须是一个函数，不能直接提供一个对象，这样每个实例可以维护一份被返回对象独立的拷贝。如果使用对象形式，每个组件的`data` 都是内存的同一个地址,一个数据改变了其他也改变了。`data`是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立,不会相互影响。

我们来看一下官方示例，如果我们定义`data`时，不返回一个函数，看看效果如何：

```html
<!DOCTYPE html>
<!-- components.html -->
<html>
  <head>
    <meta charset="utf-8">
    <title>组件基础</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- 调用组件，标签名称就是组件的名称 -->
      <button-counter></button-counter>
      <!-- 组件是可以复用的，每个组件的数据是封闭在组件内部的，相互之间并没有影响 -->
      <button-counter></button-counter>
      <button-counter></button-counter>
    </div>

    <!-- script脚本包裹了一段js代码 -->
    <script>
      // 定义一个名为 button-counter 的新组件， button-counter是组件名称
      Vue.component('button-counter', {
        // data必须是一个函数
        // data: function() {
        //   return {
        //     count: 0
        //   }
        // },
        data: {
          count: 0
        },
        // 组件的模板
        template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
      })
      var app = new Vue({
        // 此处的el属性必须保留，否则组件无法正常使用
        el: '#app',
      })
    </script>
  </body>
</html>

<!DOCTYPE html>
<!-- components.html -->
<html>
  <head>
    <meta charset="utf-8">
    <title>组件基础</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- 调用组件，标签名称就是组件的名称 -->
      <button-counter></button-counter>
      <!-- 组件是可以复用的，每个组件的数据是封闭在组件内部的，相互之间并没有影响 -->
      <button-counter></button-counter>
      <button-counter></button-counter>
    </div>

    <!-- script脚本包裹了一段js代码 -->
    <script>
      // 定义一个名为 button-counter 的新组件， button-counter是组件名称
      Vue.component('button-counter', {
        // data必须是一个函数
        // data: function() {
        //   return {
        //     count: 0
        //   }
        // },
        data: {
          count: 0
        },
        // 组件的模板
        template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
      })
      var app = new Vue({
        // 此处的el属性必须保留，否则组件无法正常使用
        el: '#app',
      })
    </script>
  </body>
</html>

```

可以看到，此时控制台报出了异常：

![](https://meizhaohui.gitee.io/imagebed/img/20210630075051.png)

一个异常是`The "data" option should be a function that returns a per-instance value in component definitions.`，即`“data”选项应该是返回组件定义中每个实例值的函数。`。

另一个异常是`Property or method "count" is not defined on the instance but referenced during render.`，即`count`还未定义就渲染引用了。

因此，我们需要将组件中`data`对象形式的定义移除掉。

