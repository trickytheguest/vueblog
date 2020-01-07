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
