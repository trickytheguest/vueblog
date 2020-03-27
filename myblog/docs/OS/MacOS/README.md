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

