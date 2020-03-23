# VuePress从零开始搭建自己的博客 高级配置

[[toc]]


本文接着上一篇文章[VuePress从零开始搭建自己的博客](./build_your_vuepress_blog.md) 对博客系统进行更多的设置。


## 增加文档目录(table of contents)

在Markdown文件中第一行的一级标题"# VuePress从零开始搭建自己的博客"的下面增加``[[toc]]``：

```
# VuePress从零开始搭建自己的博客
[[toc]]
```


使用``yarn docs:dev``重新构建，则会生成目录结构。如 [VuePress从零开始搭建自己的博客](http://hellogitlab.com/web/build_your_vuepress_blog.html) 增加目录结构显示如下：

![vuepress_set_table_of_centent](/img/vuepress_set_table_of_centent.png)

参考： [VuePress目录设置](http://caibaojian.com/vuepress/guide/markdown.html#%E7%9B%AE%E5%BD%95-table-of-contents)


## Emoji支持

- Emoji表情非常有趣，我们在写文章的时候，可以在Markdown文件加入一些Emoji表情，让我们的文档更生动。
- 如``:tada:``代表:tada:，``:100:``代表:100:，更多的Emoji表情可参考[markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)。

下面列出部分表情与英文的对应关系：

```markdown
{
  "100": "💯",
  "1234": "🔢",
  "grinning": "😀",
  "smiley": "😃",
  "smile": "😄",
  "grin": "😁",
  "laughing": "😆",
  "satisfied": "😆",
  "sweat_smile": "😅",
  "joy": "😂",
  "rofl": "🤣",
  "relaxed": "☺️",
  "blush": "😊",
  "innocent": "😇",
  "slightly_smiling_face": "🙂",
  "upside_down_face": "🙃",
  "wink": "😉",
  "relieved": "😌",
  "heart_eyes": "😍",
  "kissing_heart": "😘",
  "kissing": "😗"
}
```

## 自定义容器(custom containers)

下面在MarkDown文件中使用一些容器，对用户进行一些提示或者警告。

- 可以使用``tip``、``warning``、``danger``关键字来指定提示的类型和颜色。
- 在``tip``、``warning``、``danger``关键字后面增加其他字符则指定了提示的标题。

::: tip
这是一个提示，未设置提示标题
:::

::: tip 提示
这是一个提示，设置了提示标题
:::

::: warning
这是一个警告，未设置警告标题
:::

::: warning 注意
这是一个警告，设置了警告标题
:::

::: danger
这是一个危险警告，未设置危险警告标题
:::

::: danger 危险
这是一个危险警告，设置了危险警告标题
:::


在Markdown文件中第一行的一级标题"# VuePress从零开始搭建自己的博客"的下面增加以下内容，展示Emoji表情和提示的效果：

```
# VuePress从零开始搭建自己的博客                                                                                                            
:heavy_check_mark: :heart: :basketball: :snowman:

::: tip 提示
这是一个提示，设置了提示标题
:::

::: warning 注意
这是一个警告，设置了警告标题
:::

::: danger 危险
这是一个危险警告，设置了危险警告标题
:::
```


使用``yarn docs:dev``重新构建，则会生成目录结构。如 [VuePress从零开始搭建自己的博客](http://hellogitlab.com/web/build_your_vuepress_blog.html) Emoji表情和提示警告显示如下：

![vuepress_set_emoji_and_tip_warning_danger](/img/vuepress_set_emoji_and_tip_warning_danger.png)

参考： [自定义容器](https://vuepress.vuejs.org/zh/guide/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8)


## 显示上次更新时间

在config.js中``themeConfig``中配置``lastUpdated``参数即可，则会在每篇文章最后显示上次更新的时间。
```javascript
module.exports = {
    ...省略
    themeConfig: {
            lastUpdated: '上次更新',
            ...省略
)
```

使用``yarn docs:dev``重新构建，则会生成目录结构。如 [VuePress从零开始搭建自己的博客](http://hellogitlab.com/web/build_your_vuepress_blog.html) 上次更新时间显示如下：

![vuepress_set_lastUpdated_time](/img/vuepress_set_lastUpdated_time.png)

参考： [多语言支持](https://vuepress.vuejs.org/zh/guide/i18n.html#%E5%A4%9A%E8%AF%AD%E8%A8%80%E6%94%AF%E6%8C%81)

此时显示的时间不符合国人的使用习惯，设置一下语言本地化。

::: tip 重要提示
``lastUpdated``是基于git版本管理的文件最后更新提交的时间，如本博客的源码地址[vueblog](https://github.com/meizhaohui/vueblog.git) ,只有将构建过程中的代码存放在基于git版本管理的GitHub或GitLab网站上面才能正常显示出页面的上次更新时间。
:::

## 语言本地化设置

在config.js中增加``locales``参数关键字，并配置``lang: 'zh-CN'``，即指定使用中文。
```javascript
module.exports = {
    title: '个人主页',
    description: '梅朝辉的博客',
    locales: {
         '/': {
             lang: 'zh-CN',
         }
    },
    ...省略
}
```

再次运行程序，显示如下：
![vuepress_set_lastUpdated_time_with_locales](/img/vuepress_set_lastUpdated_time_with_locales.png)

参考： [多语言支持](https://vuepress.vuejs.org/zh/guide/i18n.html#%E5%A4%9A%E8%AF%AD%E8%A8%80%E6%94%AF%E6%8C%81)

## logo和博客标题设置

我们可以给自己的博客设置一个自己喜欢的logo，如可以在 [LogoFree](http://www.logofree.cn/logo.html) 上面制作一款自己喜欢的logo。可以付费导出自己的logo的ico图片，也可以通过截图获取自己喜欢的logo，然后在 [在线生成透明ICO图标](http://ico.duduxuexi.com/) 生成32\*32的favicon.ico文件，将favicon.ico文件保存到 ``docs/.vuepress/public/img``目录下，并修改``config.js``文件的``head``属性值。

同时，我们也可以修改一下博客的标题为"梅朝辉的博客"，修改``config.js``文件的``title``属性值为"梅朝辉的博客"即可。

```javascript
module.exports = {
    title: '梅朝辉的博客',
    description: '种一棵树最好的时间是十年前，其次就是现在。',
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ],
    ...省略
```

另外，我们更新一下根目录docs下的README.md文件，将其中的``heroImage: img/gitlab.jfif``中的图片替换成我们自己的logo图片``heroImage: img/hellogitlab_logo.png``:

```
[root@hellogitlab docs]# cat README.md 
---
home: true
heroImage: img/hellogitlab_logo.png
actionText: 查看我的博文 →
actionLink: /python/
features:
- title: Hello Python
  details: 简单易学的Python编程语言
- title: Hello Golang
  details: Go 是互联网时代的C语言
- title: Hello Web
  details: 手把手教你学web页面
footer: MIT Licensed | Copyright © 2019-present Zhaohui Mei
---
```

再次运行程序，显示如下：
![vuepress_set_logo_and_heroImage](/img/vuepress_set_logo_and_heroImage.png)

可以看到标签页上面的小图片已经变成了我们的logo图标了，并且页面中间的图片和说明内容也更新了。

参考: [导航栏 Logo](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F-logo)

## 背景音乐设置

之前想着给博客增加背景音乐的，但当自己带着耳机，突然打开一个自动播放背景音乐的网站的时候，把我震惊了(吓一跳)，决定放弃这个功能。


## 使用Valine配置评论功能

首先在 https://leancloud.cn 网站上面注册一个账号，并使用支付宝进行实名认证，并创建一个应用，创建应用后，可以在应用设置中查看到应用的Keys信息。

leancloud中显示如下:

![leancloud_keys](/img/leancloud_keys.png)

然后按照 [在VuePress中使用Valine](https://valine.js.org/vuepress.html) 的配置方法下载安装``vuepress-plugin-comment``插件，并配置config.js文件。

### 安装``vuepress-plugin-comment``插件

```shell
yarn add vuepress-plugin-comment -D
```

::: tip 重要提示
如果你从我的 [vueblog](https://github.com/meizhaohui/vueblog.git) 上面直接克隆下来的代码的话，切换到myblog目录后，使用``yarn``直接就可以安装相关的插件依赖了。
:::

### 将``vuepress-plugin-comment``添加到vuepress项目的插件配置中

```javascript
module.exports = {
  plugins: [
    [
      'vuepress-plugin-comment',
      {
        choosen: 'valine', 
        // options选项中的所有参数，会传给Valine的配置
        options: {
          el: '#valine-vuepress-comment',
          appId: 'Your own appId',
          appKey: 'Your own appKey'
        }
      }
    ]
  ]
}
```

我这边参照上面的方法，并增加了``placeholder``和``lang``属性，配置如下:

```javascript
module.exports = {
    title: '梅朝辉的博客',
    ...省略
    plugins: [
        [
            'vuepress-plugin-comment',
            {
                choosen: 'valine', 
                // options选项中的所有参数，会传给Valine的配置
                options: {
                    el: '#valine-vuepress-comment',
                    appId: 'your leancloud appid',
                    appKey: 'your leancloud appkey',
                    placeholder: '同道中人，文明留言...',  // 评论框占位提示符
                    lang: 'zh-cn', // 支持中文
                }
            }
        ]
    ],
```

重新运行后，打开任意一篇文章，都可以在最下方添加评论信息了。

![vuepress_set_comment](/img/vuepress_set_comment.png)

此时，可以在输入框中添加评论信息了。

如我添加两条评论信息。第一条"写得不错，棒棒哒！"，第二条"与君共勉，加油!👍"。评论后的页面信息如下：

![vuepress_add_comments](/img/vuepress_add_comments.png)

但此时存在一个问题，每个页面都会显示相同的评论信息，后续咨询Valina团队再改进。但过一会再刷新页面，评论又显示是正常的，感觉是API调用延迟的问题。

另外，我们提交了两个评论信息，在leancloud.cn的应用--存储页面也看到提交的Comment评论记录：

![vuepress_leancloud_comments_history](/img/vuepress_leancloud_comments_history.png)

以上说明评论功能配置正常！

## 优化导航栏

在优化导航栏时，我们可以做以下事情：

- 导航栏左侧添加logo图标
- 导航栏右侧通过repo指定GitHub链接，而不是自己手动指定GitHub的链接地址。

我们更新一下config.js文件，配置如下:
```javascript
module.exports = {
    title: '梅朝辉的博客',
    ...省略
    themeConfig: {
        logo: '/img/favicon.ico', // 导航栏左侧的logo,不写就不显示
        lastUpdated: '上次更新',
        repo: 'https://www.github.com/meizhaohui/vueblog',  // 链接的地址
        repoLabel: 'GitHub',  // 链接的名称
        nav: [
            { text:'首页', link: '/'},
            {
                text: '博文',
                items: [
                    { text: 'Python', link: '/python/' },
                    { text: 'Golang', link: '/golang/' },
                    { text: 'Web', link: '/web/' }
                ]
            }, 
            { text:'关于', link: '/about/'},
            // { text: 'Github', link: 'https://www.github.com/meizhaohui' } 此行被移除
        ],
    ...省略
```

重新运行后，可以看到在导航栏的左侧多出了logo图标，并且通过repo属性也生成了GitHub的超链接。效果如下图所示：

![vuepress_set_nar_logo_and_repo](/img/vuepress_set_nar_logo_and_repo.png)

## 添加编辑此页面超链接

我们在优化导航栏的基础上，给``themeConfig``增加``editLinks``、``editLinkText``、``docsDir``参数，参数的说明详见以下代码，具体如下：
```javascript
module.exports = {
    title: '梅朝辉的博客',
    ...省略
    themeConfig: {
        logo: '/img/favicon.ico', // 导航栏左侧的logo,不写就不显示
        lastUpdated: '上次更新',
        repo: 'https://www.github.com/meizhaohui/vueblog',  // 链接的地址
        repoLabel: 'GitHub',  // 链接的名称
        editLinks: true,  // 开启编辑链接功能
        editLinkText: '帮助我们改善此页面',  // 自定义超链接的文本内容
        docsDir: 'myblog/docs',  // docs文件的路径，从根目录开始
        nav: [
            { text:'首页', link: '/'},
            {
                text: '博文',
                items: [
                    { text: 'Python', link: '/python/' },
                    { text: 'Golang', link: '/golang/' },
                    { text: 'Web', link: '/web/' }
                ]
            }, 
            { text:'关于', link: '/about/'},
        ],
    ...省略
```

参考：[Git repository and Edit Links](https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links)

重新构建后，在页面的底部可以看到多出了"帮助我们改善此页面"超链接，点击超链接可以打开GitHub仓库中文件的编辑页面。效果如下图所示：

![vuepress_set_edit_page_links](/img/vuepress_set_edit_page_links.png)

## 隐藏私密信息


在[使用Valine配置评论功能](./build_your_vuepress_blog_1.html#使用valine配置评论功能) 中，我们在配置文件中使用了``appId: 'your leancloud appid'``和``appKey: 'your leancloud appkey'``,并上传到了GitHub上面，然后在服务上面再进行手动修改成真实的appid或appkey值，每次部署到服务器上面时都需要重新修改一次，显得非常麻烦。

如果我们将自己的leancloud人appid或appkey上传到GitHub中，别人就可以看到你的私密信息，也不够安全。因此我们需要隐藏这些私密信息。

我们在项目根目录docs目录同级创建一个``config``目录，并在其中创建``secureinfo.js``文件。目录结构如下图：

![vueblog_project_structure](/img/vueblog_project_structure.png)

我们同时创建了``secureinfo.js.txt``文件，用于与``secureinfo.js``文件进行对比，``secureinfo.js.txt``文件中增加一些说明。

``secureinfo.js``文件内容如下:

```javascript
module.exports = {
    leancloud_appId: 'your leancloud appid',
    leancloud_appKey: 'your leancloud appkey'
}
```
注：'your leancloud appid'和'your leancloud appkey'改成你自己的leancloud的appid和appkey值。

``secureinfo.js.txt``文件内容如下:

```javascript
// please rename this file to secureinfo.js, and then input your secure leancloud info.
module.exports = {
    leancloud_appId: 'your leancloud appid',
    leancloud_appKey: 'your leancloud appkey'
}
```

最重要的一步，将``secureinfo.js``文件加入到``.gitignore``文件列表中。在``.gitignore``文件最后加以下内容：

```
# secure info
secureinfo.js
```

检查git查看忽略文件：
```shell
$ git check-ignore -v config\secureinfo.js
.gitignore:107:secureinfo.js    "config\\secureinfo.js"

$ git check-ignore -v config\secureinfo.js.txt
```

可以看到config\secureinfo.js文件已经被忽略掉，而secureinfo.js.txt文件不会忽略。所以我们提交时config\secureinfo.js不会被提交。

同时，也可以使用``git status``命令来查看这两个文件是否被提交：

```shell
$ git status config\secureinfo.js
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean


$ git status config\secureinfo.js.txt
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        config/secureinfo.js.txt

nothing added to commit but untracked files present (use "git add" to track)
```

可以看到config\secureinfo.js文件未被跟踪，不会被上传到GitHub中。

另外需要更改一下``.vuepress/config.js``文件：

- 在第1行使用``const secureConf = require('../../config/secureinfo.js');``引入安全文件，注意此处使用的相对引用，``..``表示向上一级目录。
- 原来``appId: 'your leancloud appid',``内容替换成``appId: secureConf.leancloud_appId,  // 读取secure_info.js中的配置信息``。
- 原来`` appKey: 'your leancloud appkey',``内容替换成``appKey: secureConf.leancloud_appKey,  // 读取secure_info.js中的配置信息``。

修改后，我们使用正确的``leancloud_appId``和``leancloud_appKey``值时，在本地可以调试时，可以获取到评论信息，显示如下图所示：

![vueblog_set_local_secure_leancloud](/img/vueblog_set_local_secure_leancloud.png)

评论显示正常！

我们修改一下``leancloud_appId``，随机改成其他的值，再运行试一下，显示如下图所示：

![vueblog_set_error_local_secure_leancloud](/img/vueblog_set_error_local_secure_leancloud.png)

此时，可以看到页面显示"Code 401: 未经授权的操作，请检查你的AppId和AppKey."，且在Console界面显示异常。

再将``leancloud_appId``改成正常的值重新运行，又可以正常显示评论信息，说明配置生效。

后续，只用在服务器的项目目录中配置``config/secureinfo.js``文件即可，既可以隐藏私密信息，也方便后续提交部署。

具体可参考 [飞跃高山与大洋的鱼 视频教程 一步步搭建 VuePress 及优化](https://www.bilibili.com/video/av43316513?p=8) 视频中第26-31分钟。

## 优化config.js将导航栏、插件、侧边栏数据拆分

我们现在只增加了几篇文件，config.js文件已经达到了88行，内容如下:

```javascript
const secureConf = require('../../config/secureinfo.js');

module.exports = {
    title: '梅朝辉的博客',
    description: '种一棵树最好的时间是十年前，其次就是现在。',
    locales: {
         '/': {
             lang: 'zh-CN',
         }
    },
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ],
    port: 80,
    markdown: {
        lineNumbers: true, // 代码显示行号
    },
    plugins: {
        'vuepress-plugin-comment':
        {
            choosen: 'valine', 
            // options选项中的所有参数，会传给Valine的配置
            options: {
                el: '#valine-vuepress-comment',
                appId: secureConf.leancloud_appId,  // 读取secure_info.js中的配置信息
                appKey: secureConf.leancloud_appKey,  // 读取secure_info.js中的配置信息
                placeholder: '同道中人，文明留言...',  // 评论框占位提示符
                lang: 'zh-cn', // 支持中文
            }
        },
    },
    themeConfig: {
        logo: '/img/favicon.ico', // 导航栏左侧的logo,不写就不显示
        lastUpdated: '上次更新',
        repo: 'https://www.github.com/meizhaohui/vueblog',  // 链接的地址
        repoLabel: 'GitHub',  // 链接的名称
        editLinks: true,  // 开启编辑链接功能
        editLinkText: '帮助我们改善此页面',  // 自定义超链接的文本内容
        docsDir: 'myblog/docs',  // docs文件的路径，从根目录开始
        nav: [
            { text:'首页', link: '/'},
            {
                text: '博文',
                items: [
                    { text: 'Python', link: '/python/' },
                    { text: 'Golang', link: '/golang/' },
                    { text: 'Web', link: '/web/' }
                ]
            }, 
            { text:'关于', link: '/about/'},
        ],
        sidebar: {
            '/python/': [
                {
                    title: 'Python基础知识',
                    collapsable: true,  // 是否可折叠，默认可折叠true 
                    children: [
                        "python1",
                        "python2",
                        "python3"
                    ]
                },
                {
                    title: 'Python Web',
                    collapsable: false,
                    children: [
                        "python4",
                        "python5",
                        "python6"
                    ]
                },
            ],
            '/golang/': [
                "",
                "golang1",
                "golang2",
                "golang3"
            ],
            '/web/': [
                "",
                "build_your_vuepress_blog",
                "build_your_vuepress_blog_1",
                "web1"
            ],
        },
        sidebarDepth: 2 // 侧边栏显示深度，默认为1，即显示一级标题
    }
}
```

配置文件已经显得比较臃肿了，但我们的文章越来越多时，config.js文件将会越来越大，所以我们应对配置文件进行拆分。

现在主要将导航栏、插件、侧边栏数据拆分出来，放到三个不同的文件里面去。

我们在config目录下新建三个js文件，分别存放导航栏(navConfig.js)、插件(pluginConfig.js)、侧边栏(sidebarConfig.js)数据。

在config.js中插件plugins暴露的是{}对象，因此我们在pluginConfig.js也暴露一个对象，并导入私密配置文件。

pluginConfig.js文件内容如下:
```javascript
const secureConf = require('./secureinfo.js');
module.exports = {
    'vuepress-plugin-comment': {
        choosen: 'valine',
        // options选项中的所有参数，会传给Valine的配置
        options: {
            el: '#valine-vuepress-comment',
            appId: secureConf.leancloud_appId, // 读取secure_info.js中的配置信息
            appKey: secureConf.leancloud_appKey, // 读取secure_info.js中的配置信息
            placeholder: '同道中人，文明留言...', // 评论框占位提示符
            lang: 'zh-cn', // 支持中文
        }
    },
}
```

在config.js中导航栏nav暴露的是\[\]列表，因此我们在navConfig.js也暴露一个\[\]列表。

navConfig.js文件内容如下:
```javascript
module.exports = [{
        text: '首页',
        link: '/'
    },
    {
        text: '博文',
        items: [{
                text: 'Python',
                link: '/python/'
            },
            {
                text: 'Golang',
                link: '/golang/'
            },
            {
                text: 'Web',
                link: '/web/'
            }
        ]
    },
    {
        text: '关于',
        link: '/about/'
    },
]
```


在config.js中侧边栏sidebar暴露的是{}对象，因此我们在sidebarConfig.js也暴露一个对象。

sidebarConfig.js文件内容如下：

```javascript
module.exports = {
    '/python/': [{
            title: 'Python基础知识',
            collapsable: true, // 是否可折叠，默认可折叠true 
            children: [
                "python1",
                "python2",
                "python3"
            ]
        },
        {
            title: 'Python Web',
            collapsable: false,
            children: [
                "python4",
                "python5",
                "python6"
            ]
        },
    ],
    '/golang/': [
        "",
        "golang1",
        "golang2",
        "golang3"
    ],
    '/web/': [
        "",
        "build_your_vuepress_blog",
        "build_your_vuepress_blog_1",
        "web1"
    ],
}

```

然后再在config.js中引入导航栏(navConfig.js)、插件(pluginConfig.js)、侧边栏(sidebarConfig.js)三个配置文件。

并将plugin,nar,sidebar处进行替换，替换后的config.js文件内容如下：

```javascript
const pluginConf = require('../../config/pluginConfig.js');
const navConf = require('../../config/navConfig.js');
const sidebarConf = require('../../config/sidebarConfig.js');

module.exports = {
    title: '梅朝辉的博客',
    description: '种一棵树最好的时间是十年前，其次就是现在。',
    locales: {
         '/': {
             lang: 'zh-CN',
         }
    },
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ],
    port: 80,
    markdown: {
        lineNumbers: true, // 代码显示行号
    },
    plugins: pluginConf,
    themeConfig: {
        logo: '/img/favicon.ico', // 导航栏左侧的logo,不写就不显示
        lastUpdated: '上次更新',
        repo: 'https://www.github.com/meizhaohui/vueblog',  // 链接的地址
        repoLabel: 'GitHub',  // 链接的名称
        editLinks: true,  // 开启编辑链接功能
        editLinkText: '帮助我们改善此页面',  // 自定义超链接的文本内容
        docsDir: 'myblog/docs',  // docs文件的路径，从根目录开始
        nav: navConf,
        sidebar: sidebarConf,
        sidebarDepth: 2 // 侧边栏显示深度，默认为1，即显示一级标题
    }
}
```

可以看到config.js文件已经变成了33行，后续增加新的文件不需要修改config.js，只需要改navConfig.js和sidebarConfig.js文件即可。


我们随意修改一下导航栏(navConfig.js)、插件(pluginConfig.js)、侧边栏(sidebarConfig.js)三个配置文件的数据，分别增加testnav, testplugin, testsidebar字符，然后重新运行，看看效果:

![vueblog_split_plugin_nar_sidebar](/img/vueblog_split_plugin_nar_sidebar.png)

可以发现导航栏、侧边栏、评论插件都发生了变化，并且console中没有提示异常，说明我们的拆分配置正常。

详细可参考 [飞跃高山与大洋的鱼 视频教程 一步步搭建 VuePress 及优化](https://www.bilibili.com/video/av43316513?p=8) 视频中第1-18分钟。

此时侧边栏(sidebarConfig.js)的文件内容相对来说稍微大一些，后续可以再进行优化。

将刚才的测试字符testnav, testplugin, testsidebar删除掉，再重新运行，看看是否能正常运行。能正常运行就说明此次配置正确。

## 自动生成侧边栏

参考[https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar)安装`Vuepress Plugin Auto Sidebar`插件。

- 安装

```shell
$ npm i vuepress-plugin-auto-sidebar -D

> core-js@2.6.11 postinstall ~/Documents/GitHub/vueblog/myblog/node_modules/core-js
> node -e "try{require('./postinstall')}catch(e){}"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
> https://opencollective.com/core-js
> https://www.patreon.com/zloirock

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)

npm WARN myblog@1.0.0 No description
npm WARN myblog@1.0.0 No repository field.

+ vuepress-plugin-auto-sidebar@1.3.1
added 11 packages from 10 contributors and audited 11 packages in 19.168s
found 0 vulnerabilities

$ echo $?
0
```

- 配置

在config目录下的`pluginConfig.js`中引入插件，引入后内容如下：

```shell
$ cat pluginConfig.js
const secureConf = require('./secureinfo.js');
module.exports = {
    'vuepress-plugin-comment': {
        choosen: 'valine',
        // options选项中的所有参数，会传给Valine的配置
        options: {
            el: '#valine-vuepress-comment',
            appId: secureConf.leancloud_appId, // 读取secure_info.js中的配置信息
            appKey: secureConf.leancloud_appKey, // 读取secure_info.js中的配置信息
            placeholder: '同道中人，文明留言...', // 评论框占位提示符
            lang: 'zh-cn', // 支持中文
        }
    },
     "vuepress-plugin-auto-sidebar" : {}, // 自动侧边栏
}
```

- 移除`docs/.vuepress/config.js`配置的sidebar设置

注释或删除第3行和第30行的`sidebarConf`和`sidebar`设置。
```shell
 cat .vuepress/config.js
const pluginConf = require('../../config/pluginConfig.js');
const navConf = require('../../config/navConfig.js');
//const sidebarConf = require('../../config/sidebarConfig.js');

module.exports = {
    title: '梅朝辉的博客',
    description: '种一棵树最好的时间是十年前，其次就是现在。',
    locales: {
         '/': {
             lang: 'zh-CN',
         }
    },
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
    ],
    port: 80,
    markdown: {
        lineNumbers: true, // 代码显示行号
    },
    plugins: pluginConf,
    themeConfig: {
        logo: '/img/favicon.ico', // 导航栏左侧的logo,不写就不显示
        lastUpdated: '上次更新',
        repo: 'https://www.github.com/meizhaohui/vueblog',  // 链接的地址
        repoLabel: 'GitHub',  // 链接的名称
        editLinks: true,  // 开启编辑链接功能
        editLinkText: '帮助我们改善此页面',  // 自定义超链接的文本内容
        docsDir: 'myblog/docs',  // docs文件的路径，从根目录开始
        nav: navConf,
//        sidebar: sidebarConf,
        sidebarDepth: 2 // 侧边栏显示深度，默认为1，即显示一级标题
    }
}
```

如在docs中增加php目录，并增加`php学习笔记.md`文件，最后使用`yarn docs:dev`运行项目，可以看到php相关页面会显示出来。

![auto_sidebar](/img/auto_sidebar.png)

## 全文搜索

内置搜索只能对文章标题进行搜索。我们如果想进行全文搜索，可以使用algolia搜索。

algolia提供了简化的方式[Algolia DocSearch](https://docsearch.algolia.com/apply/) ,只需要提交自己的网站和邮箱地址，然后加入少量的脚本，就能使用了。

- 申请
![algolia_docsearch](/img/algolia_docsearch.png)

- 回复确认邮件

Algolia DocSearch会发送确认邮件，收到后需要回复一下这个网站是你自己的，并且可以修改网站代码。

- 查收使用邮件

Algolia DocSearch会发送一封使用邮件，里面有`apiKey`和`indexName`。

- 修改配置文件

在配置文件中添加如下内容, apiKey和indexName就是上面邮件中的内容。


::: tip 提示
遗憾的是，我这边收到DocSearch的邮件通知，说不能爬取我的网站，返回403异常,有可能`IP`或者`user_agent`被过滤了，这个功能没有弄成功。:cry:
:::


## https配置

现在有很多免费的SSL证书提供商，如[阿里云的云盾证书](https://common-buy.aliyun.com/?spm=5176.7968328.1266638..49fa1232pvNX2B&commodityCode=cas&aly_as=TNsaEK1x4#/buy)，[腾讯的免费版DVSSL证书](https://console.cloud.tencent.com/ssl)，这两种免费证书有效期为一年。

### 申请证书
我因为购买的是腾讯的云服务器，就申请一个免费的腾讯SSL证书。

在证书申请页面[https://console.cloud.tencent.com/ssl/apply](https://console.cloud.tencent.com/ssl/apply)填写证书的一些信息：

![tencent_SSL_apply](/img/tencent_SSL_apply.png)

按照提示申请完成后，可以在证书管理页面看到申请到的免费SSL证书记录：

![tencent_ssl_item](/img/tencent_ssl_item.png)

点击`详情`可以查看证书的详细信息：

![tencent_SSL_detail](/img/tencent_SSL_detail.png)

点击`下载`下载证书文件，下载下来的文件名为`hellogitlab.com.zip`，解压后文件夹的内容如下:

![tencent_ssl_zip_file_detail](/img/tencent_ssl_zip_file_detail.png)

根据自己使用的web服务器选择不同文件夹里面的SSL文件即可。 [证书安装指引 -> 如何选择证书安装类型？](https://cloud.tencent.com/document/product/400/4143)有手动安装指引。

### 证书配置

如果使用的是Apache httpd服务，可以参考 [https://cloud.tencent.com/document/product/400/35243](https://cloud.tencent.com/document/product/400/35243)。

我的配置文件内容如下：

```shell
[root@hellogitlab conf.d]# cat vueblog.conf
<VirtualHost 0.0.0.0:443>
    DocumentRoot "/var/www/html/vueblog"
    #填写证书名称
    ServerName hellogitlab.com
    #启用 SSL 功能
    SSLEngine on
    #证书文件的路径
    SSLCertificateFile "/etc/httpd/conf.d/2_hellogitlab.com.crt"
    #私钥文件的路径
    SSLCertificateKeyFile "/etc/httpd/conf.d/3_hellogitlab.com.key"
    #证书链文件的路径
    SSLCertificateChainFile "/etc/httpd/conf.d/1_root_bundle.crt"
</VirtualHost>
```

![tencent_vuepress_httpd_conf](/img/tencent_vuepress_httpd_conf.png)

### HTTP 自动跳转 HTTPS 的安全配置

可以参考腾讯的指导手册上面，自动跳转所有非443端口的链接：

```shell
[root@hellogitlab conf.d]# cat http2https.conf
<Directory "/var/www/html"> 
# 新增
RewriteEngine on
RewriteCond %{SERVER_PORT} !^443$
RewriteRule ^(.*)?$ https://%{SERVER_NAME}%{REQUEST_URI} [L,R]
</Directory>
```

这种所有非443端口的URL请求都会跳转到https方式请求。

如果仅跳转80端口的请求到443端口，可以按如下方式配置：

```shell {5}
[root@hellogitlab conf.d]# cat http2https.conf
<Directory "/var/www/html"> 
# 新增
RewriteEngine on
RewriteCond %{SERVER_PORT} ^80$
RewriteRule ^(.*)?$ https://%{SERVER_NAME}%{REQUEST_URI} [L,R]
</Directory>
```

### 检查配置是否正确

使用`httpd -t`检查配置是否正确：

```shell
[root@hellogitlab conf.d]# httpd -t
Syntax OK
```

如果开启了防火墙，防火墙需要放行80和443端口。

### 重启htttpd服务器

```shell
[root@hellogitlab conf.d]# systemctl restart httpd
```

### 检查http和https是否配置成功

访问[http://hellogitlab.ocm/](http://hellogitlab.ocm/)看能否自动跳转到[https://hellogitlab.ocm/](https://hellogitlab.ocm/)，发现可以正常跳转，说明配置正确。

在URL点可以查看网站SSL的具体信息：

![tencent_ssl_info_detail](/img/tencent_ssl_info_detail.png)

至此，网站的SSL证书配置完成。


## 手动部署项目

使用root账号手动部署项目。

由于国内下载GitHub代码太慢，借助码云进行一次中转，在码云上面创建一个相同的仓库[https://gitee.com/meizhaohui/vueblog](https://gitee.com/meizhaohui/vueblog)。
### 克隆代码

```shell
[root@hellogitlab ~]# git clone https://gitee.com/meizhaohui/vueblog.git
正克隆到 'mayun'...
remote: Enumerating objects: 411, done.
remote: Counting objects: 100% (411/411), done.
remote: Compressing objects: 100% (188/188), done.
remote: Total 411 (delta 163), reused 411 (delta 163)
接收对象中: 100% (411/411), 4.13 MiB | 17.35 MiB/s, 完成.
处理 delta 中: 100% (163/163), 完成.
```
可以看到国内下载码云上面的代码非常的快。

### 更新代码
```shell
[root@hellogitlab ~]# pushd vueblog && git pull
```

### 安装插件
```shell
[root@hellogitlab vueblog]# cd myblog
[root@hellogitlab myblog]# yarn add vuepress-plugin-comment -D
[root@hellogitlab myblog]# yarn add vuepress-plugin-auto-sidebar -D
```

### 修改配置文件`config/secureinfo.js`
把'your_id'和'your_key'改成自己的。
```shell
[root@hellogitlab myblog]# cat config/secureinfo.js
module.exports = {
    leancloud_appId: 'your_id',
    leancloud_appKey: 'your_key'
}
```

### 尝试本地运行
```shell
[root@hellogitlab myblog]# yarn docs:dev
yarn run v1.21.1
$ vuepress dev docs
wait Extracting site metadata...
tip Apply theme @vuepress/theme-default ...
tip Apply plugin container (i.e. "vuepress-plugin-container") ...
tip Apply plugin @vuepress/last-updated (i.e. "@vuepress/plugin-last-updated") ...
tip Apply plugin @vuepress/register-components (i.e. "@vuepress/plugin-register-components") ...
tip Apply plugin @vuepress/active-header-links (i.e. "@vuepress/plugin-active-header-links") ...
tip Apply plugin @vuepress/search (i.e. "@vuepress/plugin-search") ...
tip Apply plugin @vuepress/nprogress (i.e. "@vuepress/plugin-nprogress") ...
tip Apply plugin comment (i.e. "vuepress-plugin-comment") ...
tip Apply plugin auto-sidebar (i.e. "vuepress-plugin-auto-sidebar") ...

✔ Client
  Compiled successfully in 4.78s

ℹ ｢wds｣: Project is running at http://0.0.0.0:82/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /root/vueblog/myblog/docs/.vuepress/public
ℹ ｢wds｣: 404s will fallback to /index.html
success [00:22:41] Build afd0fe finished in 4778 ms!
> VuePress dev server listening at http://localhost:82/

✔ Client
  Compiled successfully in 188.87ms
success [00:22:42] Build c7597a finished in 190 ms! ( http://localhost:82/ )
```

发现可以正常运行，则停止本地运行的项目。

### 构建目标文件

开始构建目标文件。
```shell
[root@hellogitlab myblog]# yarn docs:build
yarn run v1.21.1
$ vuepress build docs
wait Extracting site metadata...
tip Apply theme @vuepress/theme-default ...
tip Apply plugin container (i.e. "vuepress-plugin-container") ...
tip Apply plugin @vuepress/last-updated (i.e. "@vuepress/plugin-last-updated") ...
tip Apply plugin @vuepress/register-components (i.e. "@vuepress/plugin-register-components") ...
tip Apply plugin @vuepress/active-header-links (i.e. "@vuepress/plugin-active-header-links") ...
tip Apply plugin @vuepress/search (i.e. "@vuepress/plugin-search") ...
tip Apply plugin @vuepress/nprogress (i.e. "@vuepress/plugin-nprogress") ...
tip Apply plugin comment (i.e. "vuepress-plugin-comment") ...
tip Apply plugin auto-sidebar (i.e. "vuepress-plugin-auto-sidebar") ...

✔ Client
  Compiled successfully in 27.68s

✔ Server
  Compiled successfully in 27.53s

wait Rendering static HTML...
Rendering page: /CI/docker/How to use ""valine"" in vuepress-plugin-comment@v0.7.3: https://github.com/dongyuanxin/vuepress-plugin-comment#readme
success Generated static files in docs/.vuepress/dist.

Done in 33.20s
```

### 复制目标文件到`/var/www/html/vueblog/`目录下
```shell
[root@hellogitlab myblog]# unalias cp 
[root@hellogitlab myblog]# cp -rf docs/.vueblog/dist/* /var/www/html/vueblog/
```

### 重启httpd服务
```shell
[root@hellogitlab myblog]# systemctl restart httpd && systemctl status httpd
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
   Active: active (running) since 一 2020-03-23 00:28:16 CST; 1min 4s ago
     Docs: man:httpd(8)
           man:apachectl(8)
  Process: 23435 ExecStop=/bin/kill -WINCH ${MAINPID} (code=exited, status=0/SUCCESS)
  Process: 29543 ExecReload=/usr/sbin/httpd $OPTIONS -k graceful (code=exited, status=0/SUCCESS)
 Main PID: 23444 (httpd)
   Status: "Total requests: 17; Current requests/sec: 0; Current traffic:   0 B/sec"
   CGroup: /system.slice/httpd.service
           ├─23444 /usr/sbin/httpd -DFOREGROUND
           ├─23450 /usr/sbin/httpd -DFOREGROUND
           ├─23452 /usr/sbin/httpd -DFOREGROUND
           ├─23453 /usr/sbin/httpd -DFOREGROUND
           ├─23454 /usr/sbin/httpd -DFOREGROUND
           ├─23479 /usr/sbin/httpd -DFOREGROUND
           ├─23480 /usr/sbin/httpd -DFOREGROUND
           ├─23485 /usr/sbin/httpd -DFOREGROUND
           ├─23486 /usr/sbin/httpd -DFOREGROUND
           ├─23487 /usr/sbin/httpd -DFOREGROUND
           └─23488 /usr/sbin/httpd -DFOREGROUND

3月 23 00:28:15 hellogitlab.com systemd[1]: Starting The Apache HTTP Server...
3月 23 00:28:16 hellogitlab.com systemd[1]: Started The Apache HTTP Server.
[root@hellogitlab myblog]#
```

### 同步github与码云

参考： [GitHub仓库快速导入Gitee及同步更新](https://gitee.com/help/articles/4284#article-header0)
- 查看远程库列表
```shell
$ git remote -v
origin	https://github.com/meizhaohui/vueblog.git (fetch)
origin	https://github.com/meizhaohui/vueblog.git (push)
```

- 将码云远程库添加到远程库列表中
```shell
$ git remote add gitee git@gitee.com:meizhaohui/vueblog.git
$ git remote -v
gitee	git@gitee.com:meizhaohui/vueblog.git (fetch)
gitee	git@gitee.com:meizhaohui/vueblog.git (push)
origin	https://github.com/meizhaohui/vueblog.git (fetch)
origin	https://github.com/meizhaohui/vueblog.git (push)
```

- 从 GitHub 上拉取最新代码到本地
```shell
$ git pull origin master
Already up to date.
```

- 推送本地最新代码到 Gitee 上

```shell
$ git pull origin master
The authenticity of host 'gitee.com (212.64.62.174)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'gitee.com,212.64.62.174' (ECDSA) to the list of known hosts.
Everything up-to-date
```


- 提交最新的修改到GitHub和码云上

```shell
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   myblog/docs/about/blog/build_your_vuepress_blog_1.md

no changes added to commit (use "git add" and/or "git commit -a")
$ git add -A
$ git commit -m"sync github to gitee"
[master 694525d] sync github to gitee
 1 file changed, 40 insertions(+)
 
# 提交到GitHub
$ git push
Enumerating objects: 13, done.
Counting objects: 100% (13/13), done.
Delta compression using up to 8 threads
Compressing objects: 100% (7/7), done.
Writing objects: 100% (7/7), 1.06 KiB | 1.06 MiB/s, done.
Total 7 (delta 5), reused 0 (delta 0)
remote: Resolving deltas: 100% (5/5), completed with 5 local objects.
To https://github.com/meizhaohui/vueblog.git
   3a83131..694525d  master -> master
   
# 提交到码云gitee 
$ git push gitee master
Enumerating objects: 13, done.
Counting objects: 100% (13/13), done.
Delta compression using up to 8 threads
Compressing objects: 100% (7/7), done.
Writing objects: 100% (7/7), 1.06 KiB | 1.06 MiB/s, done.
Total 7 (delta 5), reused 0 (delta 0)
remote: Powered by GITEE.COM [GNK-3.8]
To gitee.com:meizhaohui/vueblog.git
   3a83131..694525d  master -> master
```




## 使用Travis-CI自动部署项目

参考：
- [一点都不高大上，手把手教你使用Travis CI实现持续部署](https://zhuanlan.zhihu.com/p/25066056)
- [利用Travis CI+GitHub实现持续集成和自动部署](https://www.cnblogs.com/champyin/p/11621898.html)

### 获取GitHub Access Token

Travis CI在自动部署的时候，需要push内容到仓库的某个分支，而访问GitHub仓库需要用户授权，授权方式就是用户提供 Access Token 给Travis CI。

获取token的位置：`GitHub->Settings->Developer Settings->Personal access tokens`。

勾选repo下的所有项，以及user下的user:email后，生成一个token，复制token值。

![travis_github_token](/img/travis_github_token.png)

::: warning 注意
这个token只有现在可以看到，再次进入就看不到了，而且是再也看不到了，忘记了就只能重新生成了，所以要记住保管好。
:::

### 安装travis

```shell
# 检查依赖，需要Ruby 2.0以上版本
$ ruby -v
ruby 2.7.0p0 (2019-12-25 revision 647ee6f091) [x86_64-darwin19]

# 安装
$ gem install travis

# 查看版本信息
$ travis -v
1.8.11

# 查看帮助信息
$ travis --help
Usage: travis COMMAND ...

Available commands:

	accounts       displays accounts and their subscription status
	branches       displays the most recent build for each branch
	cache          lists or deletes repository caches
	cancel         cancels a job or build
	console        interactive shell
	disable        disables a project
	enable         enables a project
	encrypt        encrypts values for the .travis.yml
	encrypt-file   encrypts a file and adds decryption steps to .travis.yml
	endpoint       displays or changes the API endpoint
	env            show or modify build environment variables
	help           helps you out when in dire need of information
	history        displays a projects build history
	init           generates a .travis.yml and enables the project
	lint           display warnings for a .travis.yml
	login          authenticates against the API and stores the token
	logout         deletes the stored API token
	logs           streams test logs
	monitor        live monitor for what's going on
	open           opens a build or job in the browser
	pubkey         prints out a repository's public key
	raw            makes an (authenticated) API call and prints out the result
	report         generates a report useful for filing issues
	repos          lists repositories the user has certain permissions on
	requests       lists recent requests
	restart        restarts a build or job
	settings       access repository settings
	setup          sets up an addon or deploy target
	show           displays a build or job
	sshkey         checks, updates or deletes an SSH key
	status         checks status of the latest build
	sync           triggers a new sync with GitHub
	token          outputs the secret API token
	version        outputs the client version
	whatsup        lists most recent builds
	whoami         outputs the current user

run `/usr/local/bin//travis help COMMAND` for more infos
```

### 切换到项目目录再登陆

```shell
# 可以通过用户名密码登陆
$ travis login
We need your GitHub login to identify you.
This information will not be sent to Travis CI, only to api.github.com.
The password will not be displayed.

Try running with --github-token or --auto if you don't want to enter your password anyway.

Username: meizhaohui
Password for meizhaohui: ***********
server error (500: "Sorry, we experienced an error.\n\nrequest_id:ff721d1a6198c4a7705c1bf261eed365\n")
$ cd Documents/GitHub/vueblog
$ travis login
We need your GitHub login to identify you.
This information will not be sent to Travis CI, only to api.github.com.
The password will not be displayed.

Try running with --github-token or --auto if you don't want to enter your password anyway.

Username: meizhaohui
Password for meizhaohui: ***********
Successfully logged in as meizhaohui!


# 也可以通过token登陆
# 此处的secure_github_token就是前面获取的"GitHub Access Token"值
$ export GITHUB_TOKEN="secure_github_token"
$ travis login --github-token=$GITHUB_TOKEN
Successfully logged in as meizhaohui!

# 使用假名
$ alias tl="travis login --github-token=${GITHUB_TOKEN}"
# 使用tl命令就可以登陆了
$ tl
Successfully logged in as meizhaohui!

# 注销
$ travis logout
Successfully logged out!
```

### 加密关键信息

```shell
travis encrypt DEPLOY_USER =  "meizhaohui" --add
travis encrypt DEPLOY_PASSWORD = "mzh6" --add
travis encrypt DEPLOY_DOMAIN = "hellogitlab.com" --add
travis encrypt DEPLOY_PORT = "port" --add
```

你也可以直接在travis网站上面配置这些键值对信息。

### 配置.travis.yml文件

经过多次修改配置，我的`.travis.yml`文件如下：

```yml
language: node_js
node_js:
- 13.11.0
env:
  matrix:
  - HOST_URL=https://hellogitlab.com
install:
- echo "Install sshpass"
- sudo apt-get update -y && sudo apt-get install sshpass -y && sshpass -h && sshpass -V
- echo "Install vuepress"
- yarn global add vuepress
- echo "Install vuepress plugin"
notifications:
  email:
    recipients:
    - mzh@hellogitlab.com
    on_success: always
    on_failure: always
script:
- echo "${TRAVIS_OS_NAME}"
- uname -a
- echo "Check Node.js version" && node -v
- echo "Check yarn version" && yarn -v
- cd myblog && pwd
- yarn install
- yarn add vuepress-plugin-comment -D
- yarn add vuepress-plugin-auto-sidebar -D
- echo "change file contents"
- cp config/secureinfo.js.txt config/secureinfo.js
- sed -i "s/your leancloud appid/${LEAN_APPID}/g" config/secureinfo.js
- sed -i "s/your leancloud appkey/${LEAN_APPKEY}/g" config/secureinfo.js
- yarn docs:build
- echo "Hello Travis"
after_success:
- sshpass -p "${DEPLOY_PASSWORD}" ssh "${DEPLOY_USERNAME}@${DEPLOY_DOMAIN}" -p "${DEPLOY_PORT}"  'echo "travis" > ~/test.travis'
```






## 增加文章

参考：

- [基于vuepress的个人博客搭建完全教程](https://www.jianshu.com/p/2220dbacfde1)
- [VuePress从零开始搭建自己专属博客](https://segmentfault.com/a/1190000015237352?utm_source=tag-newest)
- [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)
- [Vuepress使用Valine搭建带有评论系统的博客](https://segmentfault.com/a/1190000016144076)
- [Finen's Blog](https://www.finen.top/)
- [VuePress指南](https://vuepress.vuejs.org/zh/)
- [試毅-思伟_技术笔记](https://zhousiwei.gitee.io/ibooks/)
- [飞跃高山与大洋的鱼 视频教程 一步步搭建 VuePress 及优化](https://www.bilibili.com/video/av43316513?p=5)
- [一步步搭建 VuePress 及优化](https://juejin.im/post/5c9efe596fb9a05e122c73f1)
- [Vuepress Plugin Auto Sidebar](https://www.npmjs.com/package/vuepress-plugin-auto-sidebar)
- [飞跃高山与大洋的鱼的博客](https://docs.shanyuhai.top/)
- [vuepress自动生成侧边栏](https://fangzheng.xyz/Other/VuePress/1.vuepress-auto-sidebar.html)
- [前端进阶积累](http://obkoro1.com/web_accumulate/)
- [Zhu Zhaohua的博客搭建过程](https://zhuzhaohua.com/technology/vue/20190915_myblog.html#vuepress%E5%AE%89%E8%A3%85)
- [管鲍切思世所稀的博客](https://blog.usword.cn/)
- [程序员你为什么这么累？](https://xwjie.github.io/)
- [在VuePress中使用Valine](https://valine.js.org/vuepress.html)
- [从今天开始，拿起VuePress打造属于自己的专属博客](https://blog.csdn.net/weixin_34345560/article/details/91457750)
- [导航栏 Logo](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F-logo)
- [Git repository and Edit Links](https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links)
