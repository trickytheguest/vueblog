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