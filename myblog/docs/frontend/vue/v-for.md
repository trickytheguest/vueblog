# v-for循环列表渲染

我们可以使用`v-for`指令来基于一个数组或对象来循环渲染一个列表。

- 使用数组来循环：
  - `v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的**别名**。
  - 使用列表循环时，`v-for` 还支持一个可选的第二个参数，即当前项的索引。如`v-for="(item, index) in items"`。
- 使用对象来循环：
  - 可以用 `v-for` 来遍历一个对象的 property属性。如`v-for="value in object"`。
  - 可以提供第二个的参数为 property 属性名称 (也就是键名)，如`v-for="(value, name) in object"`。
  - 还可以用第三个参数作为索引，如`v-for="(value, name, index) in object"`。

我们来测试一下官方的示例。



## 1. v-for对数组进行循环处理

```html
<!DOCTYPE html>
<!-- v-for.html -->
<html>
  <head>
    <meta charset="utf-8">
    <title>v-for循环渲染</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <li v-for="item in items" v-bind:key="item.message">
        {{ item.message }}
      </li>
      <button v-on:click="add">Add</button>
    </div>

    <!-- script脚本包裹了一段js代码 -->
    <script>
      var app = new Vue({
        // 此处的el属性必须保留，否则组件无法正常使用
        el: '#app',
        data: {
          items: [{
              message: 'Foo'
            },
            {
              message: 'Bar'
            }
          ]
        },
        methods: {
          add: function() {
              this.items.push({message: "new message"})
          },
        }
      })
    </script>
  </body>
</html>

```

我们运行代码，并在浏览器中打开页面，看到如下页面;

![](https://meizhaohui.gitee.io/imagebed/img/20210603213631.png)

我们连接点击两次`Add`按钮，可以发现控制台提示异常：

![](https://meizhaohui.gitee.io/imagebed/img/20210603213757.png)

由于我们使用的是`v-bind:key="item.message"`来确定`key`属性，多们多次点击`Add`按钮后，会出现多个key值是`new message`的`<li>`,因此此时我们应该修改一下`key`绑定的值，我们可以使用`index`索引值。

将12行的
```html
<li v-for="item in items" v-bind:key="item.message">
```
改成

```html
<li v-for="(item,index) in items" v-bind:key="index">
```

将13行改成:

```html
{{index+1}}&nbsp;{{ item.message }}
```
然后再刷新页面，并多次点击`Add`按钮。效果如下：

![](https://meizhaohui.gitee.io/imagebed/img/20210603214600.png)

此时可以看到，点击多次按钮时，控制台并不会提示更新异常问题。说明使用`index`作为`key`属性是正确的。



## 2. v-for对对象进行循环处理

> 在遍历对象时，会按 `Object.keys()` 的结果遍历，但是**不能**保证它的结果在不同的 JavaScript 引擎下都一致。

我们来测试一下官方代码。

```html
<!DOCTYPE html>
<!-- v-for_object.html -->
<html>
  <head>
    <meta charset="utf-8">
    <title>v-for循环渲染</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app" style="margin-left: 50px;">
      <p>直接循环对象的各属性值</p>
      <li v-for="value in object">
        {{ value }}
      </li>

      <p>循环对象的各属性名和属性值</p>
      <div v-for="(value, name) in object">
        {{ name }}: {{ value }}
      </div>

      <p>循环对象的各属性名和属性值，以及索引号</p>
      <div v-for="(value, name, index) in object">
        {{ index }}. {{ name }}: {{ value }}
      </div>
    </div>

    <!-- script脚本包裹了一段js代码 -->
    <script>
      var app = new Vue({
        // 此处的el属性必须保留，否则组件无法正常使用
        el: '#app',
        data: {
          object: {
            title: 'How to do lists in Vue',
            author: 'Jane Doe',
            publishedAt: '2016-04-10'
          }
        },
      })
    </script>
  </body>
</html>

```

在浏览器中打开页面，效果如下图所示：

![](https://meizhaohui.gitee.io/imagebed/img/20210603220219.png)

可以看到`Object.keys(app.object)`获取到了一个数组，数组元素是各属性名，如`title`、`author`和`publishedAt`。不能使用`app.object.keys()`来形成数组。

直接对对象进行循环遍历感觉怪怪的。::crying_cat_face:

## 3. 使用v-for模拟豆瓣书单

豆瓣书单长这样：

![](https://meizhaohui.gitee.io/imagebed/img/20210603223512.png)

我模拟生成一个简单的书单表格：

```html
<!DOCTYPE html>
<!-- v-for-books.html -->
<html>
  <head>
    <meta charset="utf-8">
    <title>v-for模拟豆瓣书籍列表</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app" style="margin-left: 50px;">
      <h3>出版计算机与互联网</h3>
      <!-- 
      border="1" 给表格的每一格，及边框加上1像素的边框
      cellspacing="0" 单元格间距为0
      cellpadding="10" 单元格边距为10px
       -->
      <table border="1" cellspacing="0" cellpadding="10">
        <thead>
          <tr>
            <th>序号</th>
            <th>书名</th>
            <th>作者</th>
            <th>出版时间</th>
            <th>定价</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" v-bind:key="index">
            <th>{{ index + 1 }}</th>
            <th>{{ book.title }}</th>
            <th>{{ book.author }}</th>
            <th>{{ book.publishedAt }}</th>
            <th>￥{{ book.price }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- script脚本包裹了一段js代码 -->
    <script>
      var app = new Vue({
        // 此处的el属性必须保留，否则组件无法正常使用
        el: '#app',
        data: {
          books: [{
            title: 'C++ Primer中文版（第5版）',
            author: '[美] Stanley B. Lippman',
            publishedAt: '2013-09',
            price: 25.60
          }, {
            title: '创作者',
            author: '张宁',
            publishedAt: '2021-05',
            price: 39.99
          }, {
            title: '电脑软硬件维修从入门到精通（第2版）',
            author: '王红军 等',
            publishedAt: '2020-04',
            price: 49.00
          }, {
            title: '高性能MySQL（第3版）',
            author: '[美] 施瓦茨（Baron Schwartz）',
            publishedAt: '2013-05',
            price: 8.99
          }, ]
        },
      })
    </script>
  </body>
</html>

```

效果图：

![](https://meizhaohui.gitee.io/imagebed/img/20210603223651.png)

相差甚远。