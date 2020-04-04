# MacOS使用总结

[[toc]]

## 打开访达文件夹的快捷键

![finder_keymap](/img/finder_keymap.png)

说明： 

- ⌘  代表 "command"键
- ⎇  代表"option"键
- ⌃ 代表"control"键
- ⇧ 代表"shift"键

通过快捷键⌃+⌘+空格键可以调出『表情符号与人物』窗口：

![emoji](/img/emoji.png)

点击『表情符号与人物』窗口右下角的向右的箭头，调到『技术符号』处就可以看到常用的"command"等键的符号了。

![emoji_command](/img/emoji_command.png)

## 常用快捷键

- cmd+, 个人偏好设置
- cmd+tab 程序之间的切换
- cmd+h 窗口隐藏
- cmd+m 窗口最小化
- cmd+n 新建窗口
- cmd+o 打开，等同于双击打开
- cmd+s 保存
- cmd+shift+s 另存为
- cmd+p 打印 print
- cmd+w 关闭 close window
- cmd+q 退出quit
- cmd+a 全选select all
- cmd+i 显示信息show info
- cmd+f 搜索search
- cmd+c 复制copy
- cmd+v 粘贴paste
- cmd+delete 删除选中文件或文件夹 或者删除一行
- option+delete 删除一个单词
- cmd+c 复制
- cmd+v 粘贴
- cmd+z 撤销
- cmd+shift+delete 清空回收站
- cmd++ 放大
- cmd+- 缩小
- cmd+t 新建选项卡tab
- cmd+r 刷新refresh
- cmd+shift+3 截取整个屏幕
- cmd+shift+4 截取选择区域
- fn+left 到顶部home
- fn+right 到底部end
- fn+up 上一页pageup
- fn+down 下一页pagedown
- control+cmd+F 进入全屏模式
- esc 退出全屏模式
- control+up 打开调度中心，点击右上角的+加号可以创建多桌面
- control+down 应用程序窗口
- F11 显示桌面
- control+A 移动到行首
- control+E 移动到行尾


注：以上"cmd"代表「command」键。

参考：[如何优雅地使用 macOS](https://zhuanlan.zhihu.com/p/29892969)

## 最小化当前页面

`command + H` 暂时隐藏当前页面，使用`command + Tab`切换回来。
`command + M` 最小化当前页面，是暂时不想用当前程序，又不想`command + W`关闭窗口或者 `command + Q`关闭程序时候用的，使用`command + Tab`切换到应用后，松开`Tab`键，再按`option`唤出。


## 快速搜索应用Alfred

Alfred具有很多功能，可以参考[Alfred 究竟好用在哪里？](https://www.zhihu.com/question/32227549)

下载地址：[https://www.alfredapp.com/](https://www.alfredapp.com/)

默认使用「Cmd + Space」打开Alfred，可以自定义为双击⌘键快速唤醒Alfred。
 
下面列出部分功能：

1. 搜索应用，快速打开应用,直接输入应用名称即可。
2.  查找本地文件，按空格，再输入搜索关键字。
3.  网页搜索，默认使用Google搜索，可以配置百度搜索，百度搜索的话，可以输入『bd 搜索关键字』进行搜索，Alfred中百度搜索配置如下：

![alfred_baidu_search](/img/alfred_baidu_search.png)

4. 简单数学计算，如输入「2+2」则会自动计算出结果4。
5. 查字典，如输入「d lovely」则会显示lovely的翻译。Alfred中字典配置如下：

![alfred_dict_search](/img/alfred_dict_search.png)

6. 退出某个应用程序，输入「quit 应用」。

其他功能大部分需要购买`Powerpack`就不介绍了。



## CheatSheet的使用

macos中快捷键特别多，有时记不住快捷键，安装CheatSheet后，可以通过长按⌘键查看当前软件的快捷键。

你可以从[https://cheatsheet-mac.en.softonic.com/mac](https://cheatsheet-mac.en.softonic.com/mac)网站上面下载安装包。

你也可以从这里下载 [CheatSheet_1.0.1.zip](/resource/pkg/CheatSheet_1.0.1.zip)

如我的火狐浏览器中长按⌘键弹出的所有的快捷键如下图：

![firefox_shortcuts](/img/firefox_shortcuts.png)

## shuttle的使用
参考[https://github.com/fitztrev/shuttle](https://github.com/fitztrev/shuttle)

Shuttle是一款快捷操作管理软件，你可以通过自定义命令，将常用的命令设置成图标快捷方式显示在任务栏中，当点击自定义的命令的名称时，shuttle会自动打开终端，并执行相应的命令。

如我的shuttle配置后，显示如下：

![shuttle](/img/shuttle.png)

- 点击「编辑」可以编辑默认的配置文件。
- 点击「导出」可以将默认的配置文件导出，你可以参照这个导出的配置文件写自己的命令。
- 点击「导入」可以导入自定义配置文件。


## 访达中显示隐藏文件

- 快捷键

使用`command + shift + .` 可以显示或隐藏隐藏文件。

- 终端命令行设置

显示隐藏文件

```shell
$ defaults write com.apple.finder AppleShowAllFiles -boolean true;killall Finder
```

隐藏文件

```shell
$ defaults write com.apple.finder AppleShowAllFiles -boolean false;killall Finder
```


## 访达中`复制`、`制作替身`、`拷贝`的区别

- `复制`   "Duplicate"是直接在当前文件夹复制生成一个一样的文件副本。
- `制作替身` "Make Alias"是生成一个快捷方式。
- `拷贝` "Copy"是复制文件，你可以使用`command + v`粘贴到别的位置。


## 访达中从当前目录打开终端Go2Shell

在官网[https://zipzapmac.com/Go2Shell](https://zipzapmac.com/Go2Shell)下载安装包，参考官网进行安装并添加到访达中。

## MAC禁用Adobe Creative Cloud自启状态栏

- 禁用Creative Cloud自启

```shell
$ launchctl unload -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
```

- 恢复

```shell
$ launchctl load -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
```




## MacOS-homebrew卸载重装并更换国内源

- 卸载

```shell
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

- 重装

```shell
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- 更新

```shell
$ brew update
```

- 更换科大镜像源

```shell
# 第一步：替换brew.git
$ cd "$(brew --repo)"
$ git remote -v
origin	https://github.com/Homebrew/brew (fetch)
origin	https://github.com/Homebrew/brew (push)
$ git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
$ git remote -v
origin	https://mirrors.ustc.edu.cn/brew.git (fetch)
origin	https://mirrors.ustc.edu.cn/brew.git (push)

# 第二步：替换homebrew-core.git
$ cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
$ git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
$ git remote -v
origin	https://mirrors.ustc.edu.cn/homebrew-core.git (fetch)
origin	https://mirrors.ustc.edu.cn/homebrew-core.git (push)

# 第三步：安装brew cask
$ git clone git://mirrors.ustc.edu.cn/homebrew-cask.git /usr/local/Homebrew/Library/Taps/homebrew/homebrew-cask --depth=1
```

- 更新

```shell
$ brew update
```

::: tip 注意
以上命令请在bash shell中执行。
:::

## brew常用命令

- 执行更新brew命令

```shell
brew update
```

- 搜索

```shell
brew search 服务名称
```

- 安装

```shell
brew install 服务名称
```


## oh-my-zsh打造强大的终端

### 安装oh-my-zsh
`oh-my-zsh`源码地址：[https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)
安装：

```shell
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

如果以上不能运行，可能直接在[https://github.com/ohmyzsh/ohmyzsh/blob/master/tools/install.sh](https://github.com/ohmyzsh/ohmyzsh/blob/master/tools/install.sh)复制install.sh的内容下来保存到文件`install.sh`中，使用`sh install.sh`运行即可。

运行脚本后，自动安装`oh-my-zsh`并设置默认的主题。 显示如下：

![installed_ohmyzsh](/img/installed_ohmyzsh.png)

### 安装`Powerline Fonts`字体

`Powerline Fonts`字体安装参考[https://github.com/powerline/fonts](https://github.com/powerline/fonts)

```shell
# 下载
➜  ~ git clone https://github.com/powerline/fonts.git --depth=1
Cloning into 'fonts'...
remote: Enumerating objects: 310, done.
remote: Counting objects: 100% (310/310), done.
remote: Compressing objects: 100% (236/236), done.
remote: Total 310 (delta 75), reused 260 (delta 71), pack-reused 0
Receiving objects: 100% (310/310), 10.40 MiB | 16.00 KiB/s, done.
Resolving deltas: 100% (75/75), done.

# 安装
➜  ~ cd fonts && sh install.sh
Copying fonts...
Powerline fonts installed to /Users/mzh/Library/Fonts
➜  fonts git:(master)

# 清理下载文件
➜  fonts git:(master) cd .. && trash-put fonts && trash-empty
```

### 设置主题

参考[https://github.com/ohmyzsh/ohmyzsh#selecting-a-theme](https://github.com/ohmyzsh/ohmyzsh#selecting-a-theme)

选择自己喜欢的主题，可以一直用一种主题，也可以使用随机主题。

像我配置的随机主题：

![oh_my_zsh_random_theme](/img/oh_my_zsh_random_theme.png)

重新加载配置
```shell
$ source ~/.zshrc
```

显示如下：
![reload_random_theme](/img/reload_random_theme.png)


### 设置插件

可参考[https://www.zhihu.com/question/49284484](https://www.zhihu.com/question/49284484)

可用的插件列表[https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)

我配置的插件如下：

```
plugins=(
    colored-man-pages
    command-not-found
    cp
    extract
    git
    gitignore
    last-working-dir
    safe-paste
    sudo
    vi-mode
    z
    zsh_reload
)
```

### 设置常用命令假名
```shell
alias cd1='cd ..'
alias cd2='cd ../..'
alias cd3='cd ../../..'
alias cd4='cd ../../../..'
alias cd5='cd ../../../../..'
alias ls='ls -G'
alias ll='ls -lah'
alias vi='vim'
alias v.='vim ~/.zshrc'
alias s.='source ~/.zshrc && echo "Reload OK!"'
# rm-protection link to https://github.com/alanzchen/rm-protection
alias rm='echo "please use \"trash-put\" or \"safe-rm\" or \"safe-p\" to delete file."'
# use the command to save no premission file   : w ! sudo tee %
alias dkin='dockerin'
function dockerin()
{
    docker exec -it $1 /bin/bash
}
alias gp='git push && git push gitee master'
export GITHUB_TOKEN="*******securce_string*******"
alias tl="travis login --github-token=${GITHUB_TOKEN}"
alias cblog='pushd ~/Documents/GitHub/vueblog/myblog && pwd'
alias runblog='pushd ~/Documents/GitHub/vueblog/myblog && yarn docs:dev'
```

## HTTP请求工具`HTTPie`

- httpie是一个httpclient工具，能帮助我们快速的进行http请求，类似于`curl`，但是语法做了很多简写，比较友好。
- 提供`http`命令，允许使用简单而自然的语法发送任意的 HTTP 请求，并会显示彩色的输出。
- 官网地址[https://github.com/jakubroztocil/httpie](https://github.com/jakubroztocil/httpie)

### HTTPie主要特点

- 具表达力的和直观语法
- 格式化的及彩色化的终端输出
- 内置 JSON 支持
- 表单和文件上传
- HTTPS、代理和认证
- 任意请求数据
- 自定义头部
- 持久化会话
- 类似`wget`的下载
- 完善的文档
- 跨平台，支持Windows、Linux、MacOS

### 安装

```shell
# MacOS
$ brew install httpie

# Debian, Ubuntu, etc.
$ apt-get install httpie

# Fedora
$ dnf install httpie

# CentOS, RHEL, ...
$ yum install httpie

# Arch Linux
$ pacman -S httpie
```

### 使用

- 查看版本信息

```shell
$ http --version                                                                                                                                                              
2.0.0
```

- 查看帮助信息
- 
```shell
$ http --help|head -n 15                                                                                                                                                      
usage: http [--json] [--form] [--compress] [--pretty {all,colors,format,none}]
            [--style STYLE] [--print WHAT] [--headers] [--body] [--verbose]
            [--all] [--history-print WHAT] [--stream] [--output FILE]
            [--download] [--continue]
            [--session SESSION_NAME_OR_PATH | --session-read-only SESSION_NAME_OR_PATH]
            [--auth USER[:PASS]] [--auth-type {basic,digest}] [--ignore-netrc]
            [--offline] [--proxy PROTOCOL:PROXY_URL] [--follow]
            [--max-redirects MAX_REDIRECTS] [--max-headers MAX_HEADERS]
            [--timeout SECONDS] [--check-status] [--verify VERIFY]
            [--ssl {ssl2.3,tls1,tls1.1,tls1.2}] [--cert CERT]
            [--cert-key CERT_KEY] [--ignore-stdin] [--help] [--version]
            [--traceback] [--default-scheme DEFAULT_SCHEME] [--debug]
            [METHOD] URL [REQUEST_ITEM [REQUEST_ITEM ...]]

HTTPie - a CLI, cURL-like tool for humans. <https://httpie.org>
```

帮助文档非常的详细，你可以仔细阅读一下。

参考官方的示例：

![httpie](/img/httpie.png)

你可以尝试执行以下两个命令，查看他们的区别，你得到的显示结果与官网的示例结果会有部分差异。

```shell
# 使用curl发送请求
$ curl -i -X PUT httpbin.org/put -H Content-Type:application/json -d '{"hello": "world"}'
 
 # 使用HTTPie发送请求
$ http PUT httpbin.org/bin hello=world
```

- 使用docker运行本地服务

参考：[http://httpbin.org/](http://httpbin.org/)

```shell
# 启动httpbin容器，并把容器中端口80映射到宿主机的80端口，启动后在后台运行
$ docker run -p 80:80 --name httpbin  -d kennethreitz/httpbin                                                                                                                 
722e3a9c5338ad335a99d5b1d5882156367a1b9cad7cd13ece331dcafbd0e772

# 查看正在运行的容器
$ docker ps                                                                                                                                                                   
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                NAMES
722e3a9c5338        kennethreitz/httpbin   "gunicorn -b 0.0.0.0…"   5 seconds ago       Up 4 seconds        0.0.0.0:80->80/tcp   httpbin
~
```

启动服务后，浏览器中打开`localhost`，可以看到如下效果图：

![docker_local_httpbin](/img/docker_local_httpbin.png)


- 发送GET请求

```shell
$ http localhost/get
$ http GET localhost/get
$ http http://localhost/get
$ http :/get
```
上面几种方式都是向本地80端口的'/get'地址发送GET请求，返回结果相同：

![httpie_GET](/img/httpie_GET.png)

- 发送POST请求

```shell
$ $ http POST :/post name='http ie'           
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 452
Content-Type: application/json
Date: Sat, 04 Apr 2020 15:17:09 GMT
Server: gunicorn/19.9.0

{
    "args": {},
    "data": "{\"name\": \"http ie\"}",
    "files": {},
    "form": {},
    "headers": {
        "Accept": "application/json, */*",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
        "Content-Length": "19",
        "Content-Type": "application/json",
        "Host": "localhost",
        "User-Agent": "HTTPie/2.0.0"
    },
    "json": {
        "name": "http ie"
    },
    "origin": "172.17.0.1",
    "url": "http://localhost/post"
}
```
发送POST请求，返回结果如下：

![httpie_POST](/img/httpie_POST.png)


- 发送PUT请求

```shell
$ http PUT :/put X-API-Token:123 name=John                                                                                                                   [23:17:17]
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 472
Content-Type: application/json
Date: Sat, 04 Apr 2020 15:21:12 GMT
Server: gunicorn/19.9.0

{
    "args": {},
    "data": "{\"name\": \"John\"}",
    "files": {},
    "form": {},
    "headers": {
        "Accept": "application/json, */*",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
        "Content-Length": "16",
        "Content-Type": "application/json",
        "Host": "localhost",
        "User-Agent": "HTTPie/2.0.0",
        "X-Api-Token": "123"
    },
    "json": {
        "name": "John"
    },
    "origin": "172.17.0.1",
    "url": "http://localhost/put"
}
```

- 下载文件

如从github上面下载用户图像：

```shell
$ http --download https://avatars0.githubusercontent.com/u/18098773\?s\=40\&u\=399293cf8c7a5843e96204c625a85a8eddd3bc00\&v\=4
HTTP/1.1 200 OK
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Cache-Control: max-age=300
Connection: keep-alive
Content-Length: 3355
Content-Security-Policy: default-src 'none'
Content-Type: image/png
Date: Sat, 04 Apr 2020 15:33:28 GMT
Etag: "cf1a33071c6ac7cae4a545d5cd6439999452268e"
Expires: Sat, 04 Apr 2020 15:38:28 GMT
Last-Modified: Fri, 02 Nov 2018 01:47:05 GMT
Source-Age: 1516927
Strict-Transport-Security: max-age=31557600
Timing-Allow-Origin: https://github.com
Vary: Authorization,Accept-Encoding
Via: 1.1 varnish
X-Cache: HIT
X-Cache-Hits: 1
X-Content-Type-Options: nosniff
X-Fastly-Request-ID: 228d3d1347cc3d66ab7ef431f3ddd832e95763dd
X-Frame-Options: deny
X-GitHub-Request-Id: 3DCE:7592:11ABE:14A9D:5E718348
X-Served-By: cache-tyo19938-TYO
X-Timer: S1586014409.640497,VS0,VE1
X-Xss-Protection: 1; mode=block

Downloading 3.28 kB to "18098773.png"
Done. 3.28 kB in 0.00093s (3.44 MB/s)
```

官网上面有非常多的示例，你可以尝试一下。










