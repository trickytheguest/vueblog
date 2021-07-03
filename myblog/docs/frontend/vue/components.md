# 组件基础

[[toc]]

## 1. 组件的复用

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

```

可以看到，此时控制台报出了异常：

![](https://meizhaohui.gitee.io/imagebed/img/20210630075051.png)

一个异常是`The "data" option should be a function that returns a per-instance value in component definitions.`，即`“data”选项应该是返回组件定义中每个实例值的函数。`。

另一个异常是`Property or method "count" is not defined on the instance but referenced during render.`，即`count`还未定义就渲染引用了。

因此，我们需要将组件中`data`对象形式的定义移除掉。

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
        data: function() {
          return {
            count: 0
          }
        },
        // data: {
        //   count: 0
        // },
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

此时，随意点击显示出来的按钮，可以看到，各按钮点击次数是分别进行统计的：

![](https://meizhaohui.gitee.io/imagebed/img/20210630222850.png)

可以看到，第一个按钮点击了2次，第二个按钮点击了3次，第三个按钮点击了5次。

由官方示例可知：

```javascript
<script>
  var buttonCounter2Data = {
    count: 0
  }
  Vue.component('button-counter2', {
    data: function () {
      return buttonCounter2Data
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
  })
  new Vue({ el: '#components-demo3' })
</script>
```

多个组件共用了`buttonCounter2Data`对象中的`count`数据，随意点击一个按钮，三个按钮上面的点击次数都会同时更新。这是我们不想要的结果。我们想要各组件彼此独立，互不干扰。因此需要使用`data`返回函数的示例来设置组件。

## 2. 组件的组织

- 通常一个应用会以一个嵌套的组件树的形式来组织。例如，应用中包含页头、侧边栏、内容区等组件，每个组件又包含其他的像导航链接、博文之类的组件。
- 为了能在模板中使用组件，组件必须先注册。Vue才能够识别。
- 组件注册可以通过两种方式来进行：全局注册和局部注册。像我们前面使用的`Vue.component('button-counter'`这种形式是全局注册。
- 全局注册的组件可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。
- 组件的注册，详细请参考 [组件注册](https://cn.vuejs.org/v2/guide/components-registration.html)。

## 3. 通过props选项向组件传递数据

### 3.1 组件属性写死示例

当我们向博客文章组件中传递文章标题的时候，我们可以使用`prop`属性来向组件中传递属性数据。

- `prop`是在组件中注册的一个自定义属性。当一个值被传递给`prop`属性时，它就变成了那个组件实例的具体的属性值了。
- 通过`props`来定义需要自定义属性列表，如`props: ['attr1', 'attr2', 'attr3']`之类的。一个组件默认可以拥有任意数量的`prop`，`props`是所有自定义属性`prop`组成的列表。

看下面示例，将自定义博客标题传递给组件：

```html
<!DOCTYPE html>
<!-- bolg_component.html -->
<html>
  <head>
    <meta charset="utf-8">
    <title>组件基础-向组件中传递属性</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- 调用组件，标签名称就是组件的名称 -->
      <blog-post title="My journey with Vue"></blog-post>
      <blog-post title="Blogging with Vue"></blog-post>
      <blog-post title="Why Vue is so fun"></blog-post>
    </div>

    <!-- script脚本包裹了一段js代码 -->
    <script>
      // 定义一个名为 blog-post 的新组件
      Vue.component('blog-post', {
        // data必须是一个函数
        data: function() {
          return {
            count: 0
          }
        },
        props: ['title'],
        // 组件的模板
        template: '<h3>{{ title }} {{count}}</h3>'
      })
      var app = new Vue({
        // 此处的el属性必须保留，否则组件无法正常使用
        el: '#app',
      })
    </script>
  </body>
</html>

```

此时可以看到：

![](https://meizhaohui.gitee.io/imagebed/img/20210703223730.png)

此时，我们可以看到，组件中定义的`data`中的属性`count`也会渲染了，同时，`title`标题属性也被渲染出来了。



### 3.2 通过v-bind动态绑定属性传递给组件

这个位置，可以看到在组件使用时，是直接将`title`属性写死的。更典型的应用中，是在`app`的`data`属性中来定义一个博文的数组。

此时通过`v-bind`来动态绑定`prop`属性：

```html
<!DOCTYPE html>
<!-- bolg_component.html -->
<html>
  <head>
    <meta charset="utf-8">
    <title>组件基础-向组件中传递属性</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- 调用组件，标签名称就是组件的名称 -->
      <!-- <blog-post title="My journey with Vue"></blog-post>
      <blog-post title="Blogging with Vue"></blog-post>
      <blog-post title="Why Vue is so fun"></blog-post> -->
      <blog-post
        v-for="post in posts"
        v-bind:id="post.id"
        v-bind:title="post.title"
      ></blog-post>
    </div>

    <!-- script脚本包裹了一段js代码 -->
    <script>
      // 定义一个名为 blog-post 的新组件
      Vue.component('blog-post', {
        // data必须是一个函数
        data: function() {
          return {
            count: 0
          }
        },
        props: ['title'],
        // 组件的模板
        template: '<h3>{{ title }} {{count}}</h3>'
      })
      var app = new Vue({
        // 此处的el属性必须保留，否则组件无法正常使用
        el: '#app',
        data: {
          posts: [{
              id: 1,
              title: 'My journey with Vue'
            },
            {
              id: 2,
              title: 'Blogging with Vue'
            },
            {
              id: 3,
              title: 'Why Vue is so fun'
            }
          ]
        }
      })
    </script>
  </body>
</html>

```

此时，可以看到，展示的结果和之前是一样的的:

![](https://meizhaohui.gitee.io/imagebed/img/20210703224943.png)

但此时可以看到，多出了属性`id`了。说明`id`和`title`属性都被绑定了。

如果我们把`props: ['title'],`行注意掉，改成`// props: ['title'],`，此时显示如下：

![](https://meizhaohui.gitee.io/imagebed/img/20210703225421.png)

可以看到，此时`title`并没有解析成`h3`标签中间的值，而成了`h3`的一个属性。说明组件中没有正常接收到`title`的值。

此时中，使用了`v-bind`来动态绑定属性到组件中了。



再看一个示例：

```html
<!DOCTYPE html>
<!-- bolg_component.html -->
<html>
  <head>
    <meta charset="utf-8">
    <title>组件基础-向组件中传递属性</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <!-- 调用组件，标签名称就是组件的名称 -->
      <blog-post v-bind:title="title" v-bind:num="num"></blog-post>
    </div>

    <!-- script脚本包裹了一段js代码 -->
    <script>
      // 定义一个名为 blog-post 的新组件
      Vue.component('blog-post', {
        // data必须是一个函数
        data: function() {
          return {
            count: 0
          }
        },
        props: ['title', 'num'],
        // 组件的模板
        template: '<h3>{{ title }} {{ count + 1 }} <br> num: {{ num + 2 }}</h3>'
      })
      var app = new Vue({
        // 此处的el属性必须保留，否则组件无法正常使用
        el: '#app',
        data: {
          title: "title in app data",
          num: 1,
        }
      })
    </script>
  </body>
</html>

```

我们在`app`的`data`属性中定义了`title`和`num`属性。然后在模板中使用了`title`和`num`，并对其值进行了变更，看到的效果如下图所示：

![](https://meizhaohui.gitee.io/imagebed/img/20210703232431.png)

可以看到，虽然页面显示中`num`值发生了变化，但其实是一个只读属性，`app.num`的值并没有改变。在组件中`num`值仍然还是`1`。

关于组件中的`data`和`prop`的说明：

- 子组件中的data数据，不是通过父组件传递的，是子组件私有的，是可读可写的。
- 子组件中的所有 props中的数据，都是通过父组件传递给子组件的，是只读的。

