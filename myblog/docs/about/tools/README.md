# 工具列表

以下列出自己认为非常好用的工具，排名不分先后。

## 1. 截图工具`Snipaste`

`Snipaste`支持windows和MacOS系统，官网地址[https://www.snipaste.com/](https://www.snipaste.com/),按`F1`截图。
![Snipaste.png](https://meizhaohui.gitee.io/imagebed/img/Snipaste.png)



## 2. Markdown编辑工具`Typora`或`MacDown`

Typora支持windows、Linux和MacOS系统，MacDown是在MacOS系统上的Markdown编辑器，两个编辑器都不错。

Typora所见即所得模式比较好，下载地址[https://www.typora.io/](https://www.typora.io/)。而我也比较喜欢MacDown左侧输入文本右侧自动显示最后生成的效果预览，下载地址[https://macdown.uranusjr.com/](https://macdown.uranusjr.com/)。

## 3. 在线生成Markdown表格`TableConvert`

在线生成Markdown表格`TableConvert`地址[https://tableconvert.com/](https://tableconvert.com/)

![tableconvert.png](https://meizhaohui.gitee.io/imagebed/img/tableconvert.png)


## 4. 制作U盘启动盘`Rufus`和`Etcher`

`Rufus`支持windows系统，官网地址 [http://rufus.ie/](http://rufus.ie/)   

![rufus_en_2x.png](https://meizhaohui.gitee.io/imagebed/img/rufus_en_2x.png)

`Etcher`支持windows、Linux和MacOS系统，官网地址[https://www.balena.io/etcher/](https://www.balena.io/etcher/)

![etcher_step.gif](https://meizhaohui.gitee.io/imagebed/img/etcher_step.gif)


## 5. 国内开源镜像站

使用国内开源镜像站，可以使我们下载软件的速度更快，更方便！

### 阿里云镜像站

阿里云官方镜像站，提供极速全面的系统镜像服务，链接[https://developer.aliyun.com/mirror/](https://developer.aliyun.com/mirror/)。

![aliyun_mirror](https://meizhaohui.gitee.io/imagebed/img/aliyun_mirror.png)



### 清华大学镜像站

清脂大学开源软件镜像站，链接[https://mirrors.tuna.tsinghua.edu.cn/](https://mirrors.tuna.tsinghua.edu.cn/)

![tsinghua_mirror.png](https://meizhaohui.gitee.io/imagebed/img/tsinghua_mirror.png)

## 6. jsDelivr – Open Source CDN 开源CDN

[https://www.jsdelivr.com/?docs=gh](https://www.jsdelivr.com/?docs=gh), 可以用这个网站进行图片等的加速！

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511233130.png)

## 7. cmder windows系统上面的命令行工具

Windows系统自带的`cmd`命令行使用起来非常不方便，粘贴文本必须使用鼠标，不能使用快捷键，我们可以使用`cmder`工具使用windows系统上面的命令行工具。

官网地址：[https://cmder.net/](https://cmder.net/)

界面如下图所示：

![cmder](https://cmder.net/img/main.png)

将`Cmder.exe`文件所在目录添加到`Path`环境变量中，以管理员身份打开`cmd`命令行容器，执行以下命令注册右键：

```sh
// 设置任意地方鼠标右键启动Cmder
Cmder.exe /REGISTER ALL
```

## 8. 录屏软件EV录屏

EV录屏支持windows操作系统和MacOS操作系统。录屏非常方便，可以全屏录制也可以选定区域录制。

官网地址：[https://www.ieway.cn/evcapture.html](https://www.ieway.cn/evcapture.html)


## 9. windows系统传输文件到远程备份服务器工具putty

putty官网介绍`PuTTY: a free SSH and Telnet client`即是一个免费的SSH和Telnet客户端，我们可以通过它提供的`pscp`将windows系统的文件传输到远程的备份服务器中。

官网地址[https://www.chiark.greenend.org.uk/~sgtatham/putty/](https://www.chiark.greenend.org.uk/~sgtatham/putty/)

## 10. 终端利用工具tmux

Tmux工具可以使SSH连接会话与窗口解绑，通过tmux工具可以使窗口关闭时，会话仍然不终止。下次连接时可以继续该会话。

详细可参考 阮一峰的网络日志 Tmux 使用教程http://www.ruanyifeng.com/blog/2019/10/tmux.html 

其常用命令如下：

- `tmux` 启动一个tmux窗口。此时按`ctrl+b d`或输入命令`tmux detach`将当前会话与窗口分离。
- `tmux ls`可以查看所有会话。
- `tmux attach -t ID/NAME`或`tmux a -t ID/NAME`通过会话id或name名称接入会话。
- `tmux kill-session -t ID/NAME`通过指定会话id或name名称来杀死会话。
- `tmux new -s session_name`创建会话时指定会话名称。
- `tmux rename-session -t ID/NAME new-name`或`tmux rename -t ID/NAME new-name`重命名会话名称。

使用示例：

```sh
$ tmux   # 启动一个会话，并按快捷键ctrl + b  d 分离会话与窗口
[detached (from session 0)]
$ tmux ls  # 查看当前存在的会话
0: 1 windows (created Wed Mar 17 06:45:51 2021)
$ tmux a -t 0  # 重新连接到会话，进入到会话中
[detached (from session 0)]
$ tmux rename -t 0 test  # 将ID为0的会话重命名为test
$ tmux ls  # 列出当前存在的会话，可以看到会话名称已经变成test了，但会话的创建时间并没有更新
test: 1 windows (created Wed Mar 17 06:45:51 2021)
$ tmux a -t test  # 接入到test会话
[detached (from session test)]
$ tmux new -s deploy  # 创建一个名称为deploy的会话
[detached (from session deploy)]
$ tmux ls  # 查看当前存在的会话
deploy: 1 windows (created Wed Mar 17 06:53:20 2021)
test: 1 windows (created Wed Mar 17 06:45:51 2021)
$ tmux kill-session -t test  # 杀死test会话
$ tmux ls  # 查看当前存在的会话
deploy: 1 windows (created Wed Mar 17 06:53:20 2021)
```

 

## 11. 图床工具PicGo

PicGo官网地址： [https://github.com/PicGo/](https://github.com/PicGo/)

PicGo的使用可参考： [PicGo：免费搭建个人图床](https://zhuanlan.zhihu.com/p/128014135)

注意，`repo`地址处不用写`https://gitee.com/`字符。

![image-20210421233656676](https://meizhaohui.gitee.io/imagebed/img/image-20210421233656676.png)

参考： [PicGo 配置Gitee 图床](https://www.pianshen.com/article/12391560560/)



截图成功后，使用快捷键`command + shift + P`就可以调用PicGo上传图片了，上传成功后自动复制链接地址。

![](https://meizhaohui.gitee.io/imagebed/img/20210421234510.png)



## 12. JSON解析工具jq

非常好用的json解析工具`jq`。

![](https://meizhaohui.gitee.io/imagebed/img/20210821171120.png)

- 官方地址：[https://github.com/stedolan/jq](https://github.com/stedolan/jq) 。
- 你也可以参考我写的总结文档 [JSON解析工具-jq](../../OS/Centos/json_tool_jq.html) 。

## 13. Mac  App 启动和切换工具Manico

Manico 是一个为 macOS 设计的快速的 App 启动和切换工具。参考：[https://manico.im/](https://manico.im/)

![](https://manico.im/static/img/manico-homepage-banner@2x.5948f72d46dc.png)

按`Option`键⌥则可以调出app选择切换器，按住⌥的同时再按相应的数字键则可以快速切换到对应的应用。

Manico 默认使用 Option + 数字组件键。

## 14.终端连接工具termius

- 官网地址：[https://www.termius.com/](https://www.termius.com/)



![](https://assets-global.website-files.com/5c7036349b5477bf13f828cf/6126f64cecfe794c371ddf30_6112100c32644a0172698ab3_hero_new_semaphore_2x-min.png)

优点：

- 免费
- 支持用户名密码和密钥模式
- 常用脚本片段（同时发送到多个主机）
- 全平台
- 云同步（注册一个账号即可）

缺点：

- SFTP需要付费才能使用
- 云同步需要付费版才可使用
- 默认为英文界面

快捷键：

![](https://meizhaohui.gitee.io/imagebed/img/20211120221017.png)



## 15. windows终端连接工具MobaXterm

这也是一款非常不错的终端连接工具。

- 官网地址：[https://mobaxterm.mobatek.net/](https://mobaxterm.mobatek.net/)

![](https://mobaxterm.mobatek.net/img/moba/features/feature-terminal.png)

## 16. 文本编辑器Sublime Text

- 官网地址： [https://www.sublimetext.com/](https://www.sublimetext.com/)

![](https://www.sublimetext.com/screenshots/sublime_text_4_multi_select.gif)

## 17. SwitchHosts

SwitchHosts是一个管理、快速切换Hosts小工具，开源软件，一键切换Hosts配置，非常实用，高效。

下载地址: [https://github.com/oldj/SwitchHosts/releases](https://github.com/oldj/SwitchHosts/releases)



## 18. 对比工具Beyound Compare



## 19. 远程文件复制工具WinSCP



## 20. FinalShell

FinalShell也可以进行远程终端连接，文件复制等！



## 21. Everything

Windows系统上面快速搜索文件。

官网地址：[https://www.voidtools.com/zh-cn/](https://www.voidtools.com/zh-cn/)

## 22. 变量名搜索CODELF

当在写代码时，有个变量名不知道用英文怎么表示，可以去这个网站上搜索一下，看看别的大佬是怎么表示的。

官网地址： [https://unbug.github.io/codelf/](https://unbug.github.io/codelf/)

## 23. 生成代码图片carbon

官网地址: https://carbon.now.sh/

