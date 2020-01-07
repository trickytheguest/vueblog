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
