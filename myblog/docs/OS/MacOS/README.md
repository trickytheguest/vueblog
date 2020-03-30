# MacOS使用总结

[[toc]]

## 最小化当前页面

`command + H` 暂时隐藏当前页面，使用`command + Tab`切换回来。
`command + M` 最小化当前页面，是暂时不想用当前程序，又不想`command + W`关闭窗口或者 `command + Q`关闭程序时候用的，使用`command + Tab`切换到应用后，松开`Tab`键，再按`option`唤出。


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



