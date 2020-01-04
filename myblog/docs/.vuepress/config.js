module.exports = {
    title: '个人主页',
    description: '梅朝辉的博客',
    locales: {
         '/': {
             lang: 'zh-CN',
         }
    },
    head: [
        ['link', { rel: 'icon', href: '/img/logo.ico' }],
    ],
    port: 80,
    markdown: {
        lineNumbers: true, // 代码显示行号
    },
    themeConfig: {
        lastUpdated: '上次更新',
        
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
            { text: 'Github', link: 'https://www.github.com/meizhaohui' }
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
