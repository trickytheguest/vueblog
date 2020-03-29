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


## MAC禁用Adobe Creative Cloud自启状态栏

- 禁用Creative Cloud自启

```shell
launchctl unload -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
```

- 恢复

```shell
launchctl load -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
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
