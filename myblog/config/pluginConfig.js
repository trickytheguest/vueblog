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
     "vuepress-plugin-auto-sidebar" : {
        sidebarDepth: 2 
     }, // 自动侧边栏

     // 代码复制插件
     "vuepress-plugin-nuggets-style-copy": {
        copyText: "复制代码",
        tip: { content: "复制成功" }
     }
}
