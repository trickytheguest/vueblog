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
- cmd+delete 删除选中文件或文件夹
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


## CheatSheet的使用

macos中快捷键特别多，有时记不住快捷键，安装CheatSheet后，可以通过长按⌘键查看当前软件的快捷键。

你可以从[https://cheatsheet-mac.en.softonic.com/mac](https://cheatsheet-mac.en.softonic.com/mac)网站上面下载安装包。

你也可以从这里下载 [CheatSheet_1.0.1.zip](/resource/pkg/CheatSheet_1.0.1.zip)

如我的火狐浏览器中长按⌘键弹出的所有的快捷键如下图：

![firefox_shortcuts](/img/firefox_shortcuts.png)

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


## 访达中从当前目录打开终端

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

