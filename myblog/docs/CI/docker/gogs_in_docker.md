# GitLab的替代者-轻量级Gogs安装与配置

我们使用docker安装gogs服务。

- 镜像地址：[https://registry.hub.docker.com/r/gogs/gogs](https://registry.hub.docker.com/r/gogs/gogs)
- 源码地址：[https://github.com/gogs/gogs/tree/main/docker](https://github.com/gogs/gogs/tree/main/docker)

## 1. 安装

### 1.1 下载镜像

使用dockerhub中给定的命令`docker pull gogs/gogs`下载镜像：

```sh
[root@hellogitlab ~]# docker pull gogs/gogs
Using default tag: latest
Trying to pull repository docker.io/gogs/gogs ...
latest: Pulling from docker.io/gogs/gogs
e95f33c60a64: Pull complete
6629f7b66676: Pull complete
95248f7b0231: Pull complete
1a4b11e4c1b9: Pull complete
1613ead921c8: Pull complete
37949e6160d8: Pull complete
38df9b14eb06: Pull complete
93d905b51231: Pull complete
Digest: sha256:7607fee4a463fdda91e7126fcc8504e7d972c4b80e79b2102c0de7175c1d3b81
Status: Downloaded newer image for docker.io/gogs/gogs:latest
[root@hellogitlab ~]#
```

## 1.2 数据库准备

我们在postgresql中创建一个gogs的数据库，并授权。

数据库创建和授权可参考 [postgresql_in_docker](./postgresql_in_docker.html)

```sh
# 创建数据库
CREATE DATABASE gogs;
# 创建用户
CREATE USER gogsadmin WITH password 'securepasswd';
# 授权
GRANT ALL PRIVILEGES ON DATABASE gogs TO gogsadmin;
```

## 1.3 准备证书文件

在腾讯云上面申请二级域名`gogs.hellogitlab.com`的免费证书。

![](https://meizhaohui.gitee.io/imagebed/img/20210423234735.png)

为后面设置HTTPS协议做准备。



## 1.4 创建持久化目录

创建持久化目录`/dockerdata/gogs/data`用于存储gogs的数据。

```sh
[root@hellogitlab ~]# mkdir -p /dockerdata/gogs/data
[root@hellogitlab ~]# ls -lah /dockerdata/gogs
总用量 12K
drwxr-xr-x 3 root root 4.0K 4月  23 23:50 .
drwxr-xr-x 6 root root 4.0K 4月  23 23:50 ..
drwxr-xr-x 2 root root 4.0K 4月  23 23:50 data
```



## 1.5 运算容器

运行以下命令：

```sh
$ docker run --name=gogs --restart=always -p 10022:22 -p 10080:3000 -v /dockerdata/gogs/data:/data -d gogs/gogs
```

运行：

```sh
运行容器
[root@hellogitlab ~]# docker run --name=gogs --restart=always -p 10022:22 -p 10080:3000 -v /dockerdata/gogs/data:/data -d gogs/gogs
ccb8bd71125e166808609920f9a82d5c3c8ea635e8951f5cab546c439ed88004

# 查看刚才运行成功的容器
[root@hellogitlab ~]# docker ps -n 1
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                            NAMES
ccb8bd71125e        gogs/gogs           "/app/gogs/docker/..."   2 minutes ago       Up About a minute   0.0.0.0:10022->22/tcp, 0.0.0.0:10080->3000/tcp   gogs
```

## 1.6 防火墙放行端口

防火墙放行10022和10080端口：

我们先放行一下端口：

```
firewall-cmd --zone=public --add-port=10022/tcp --permanent
firewall-cmd --zone=public --add-port=10080/tcp --permanent
firewall-cmd --reload
firewall-cmd --list-all
```

执行命令：

```sh
[root@hellogitlab ~]# firewall-cmd --zone=public --add-port=10022/tcp --permanent
success
[root@hellogitlab ~]# firewall-cmd --zone=public --add-port=10080/tcp --permanent
success
[root@hellogitlab ~]# firewall-cmd --reload
success
[root@hellogitlab ~]# firewall-cmd --list-all
public
  target: default
  icmp-block-inversion: no
  interfaces:
  sources:
  services: ssh dhcpv6-client
  ports: 10022/tcp 10080/tcp
  protocols:
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```

防火墙放行后。我们就可以在页面上查看gogs页面。

## 1.7 初始安装配置

打开浏览器，访问页面`http://hellogitlab.com:10080`,此时会自动跳转到首次运行安装程序页面。

![](https://meizhaohui.gitee.io/imagebed/img/20210424001244.png)

我们使用postgresql，填写刚才创建的数据库信息:

![](https://meizhaohui.gitee.io/imagebed/img/20210424004527.png)

最后需要对外暴露的域名和端口设置：

![](https://meizhaohui.gitee.io/imagebed/img/20210424004639.png)

这些需要注意的是，我们虽然在应用URL中指定了`https://gogs.hellogitlab.com:10080/"，开启了https协议，但由于我们并没有配置证书，此时`https`不可用，需要使用`http`形式访问Gogs。

登陆后，创建`test`仓库，可以看到HTTPS和SSH形式的下载链接都可以显示：

- HTTPS形式: `https://gogs.hellogitlab.com:10080/meizhaohui/test.git`
- SSH形式:`ssh://git@gogs.hellogitlab.com:10022/meizhaohui/test.git`



此时，SSH形式可以正常下载，HTTPS形式下载会出现异常。需要优化。

## 1.8 邮件配置

待补。

## 1.9 头像优化

待补。

