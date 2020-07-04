# git异常处理

[[toc]]

## `Peer's Certificate issuer is not recognized`异常


在CentOS7操作系统中搭建了内部使用的gitlab平台，当使用`git clone`下载代码时会提示以下异常：

```sh
fatal: unable to access 'https://*****/xx.git/': Peer's Certificate issuer is not recognized.
```

导致该问题的原因是系统证书问题，因为系统会对SSL证书进行验证，操作系统判断这个操作可能会造成不好的影响，并进行了阻止，停止了下载操作。

因为该gitlab仓库是我们信任的，我们只需要设置跳过SSL证书验证就可以，执行以下命令：

```sh
git config --global http.sslVerify false
```

## GitHub无法访问或访问缓慢解决办法

在终端执行指令`sudo vi /etc/hosts`打开hosts文件进行编辑 插入如下内容，保存退出即可！

```
# github
204.232.175.78 http://documentcloud.github.com
207.97.227.239 http://github.com
204.232.175.94 http://gist.github.com
107.21.116.220 http://help.github.com
207.97.227.252 http://nodeload.github.com
199.27.76.130 http://raw.github.com
107.22.3.110 http://status.github.com
204.232.175.78 http://training.github.com
207.97.227.243 http://www.github.com
```

参考文献

- [GitHub无法访问或访问缓慢解决办法
](https://cloud.tencent.com/developer/article/1036704)
