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
				placeholder: '同道中人，文明留言111...',  // 评论框占位提示符
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
