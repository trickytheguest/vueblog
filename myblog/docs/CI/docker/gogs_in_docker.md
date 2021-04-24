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



## 1.5 运行容器

运行以下命令：

```sh
$ docker run --name=gogs --restart=always -p 10022:22 -p 10080:3000 -v /dockerdata/gogs/data:/data -d gogs/gogs

# --name=gogs 设置容器名称为gogs
# --restart=always 设置docker服务重启后自动启动容器
# -p 10022:22 将容器内部22端口映射到宿主机10022端口
# -p 10080:3000 将容器内容3000端口映射到宿主机10080端口
# -v /dockerdata/gogs/data:/data 把gogs的数据/data 持久化到宿主机的/dockerdata/gogs/data下，做数据备份
# -d 在后台运行容器
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

防火墙放行10022和10080端口

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

防火墙放行后。我们就可以在浏览器上查看gogs页面。


::: tip 优化提示

后面对系统优化可以知道，需要再放行一个HTTPS方式使用的端口号，我们使用10081作为Gogs HTTPS加密传输使用的端口号：

```sh
[root@hellogitlab ~]# firewall-cmd --zone=public --add-port=10081/tcp --permanent
success
```

由于我们计划使用Nginx对docker容器进行反向代码，将10080端口映射到10081端口，然后配置SSL证书，因此我们在这里也将10081端口放行。
:::

## 1.7 初始安装配置

打开浏览器，访问页面`http://hellogitlab.com:10080`,此时会自动跳转到首次运行安装程序页面。

![](https://meizhaohui.gitee.io/imagebed/img/20210424001244.png)

我们使用postgresql，填写刚才创建的数据库信息:

![](https://meizhaohui.gitee.io/imagebed/img/20210424004527.png)

最后需要对外暴露的域名和端口设置：

![](https://meizhaohui.gitee.io/imagebed/img/20210424004639.png)

这里需要注意的是，我们虽然在应用URL中指定了`https://gogs.hellogitlab.com:10080/`，开启了`https`协议，但由于我们并没有配置证书，此时`https`不可用，需要使用`http`形式访问Gogs。

登陆后，创建`test`仓库，可以看到HTTPS和SSH形式的下载链接都可以显示：

- HTTPS形式: `https://gogs.hellogitlab.com:10080/meizhaohui/test.git`
- SSH形式:`ssh://git@gogs.hellogitlab.com:10022/meizhaohui/test.git`

我尝试使用这两种方式下载仓库代码。

HTTP方式下载：

```sh
$ git clone https://gogs.hellogitlab.com:10080/meizhaohui/test.git
Cloning into 'test'...
fatal: unable to access 'https://gogs.hellogitlab.com:10080/meizhaohui/test.git/': error:1400410B:SSL routines:CONNECT_CR_SRVR_HELLO:wrong version number
```

出现异常。

SSH方式下载：

```sh
$ git clone ssh://git@gogs.hellogitlab.com:10022/meizhaohui/test.git
Cloning into 'test'...
remote: Enumerating objects: 10, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (7/7), done.
remote: Total 10 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (10/10), done.
```

可以看到，能正常下载。



此时，SSH形式可以正常下载。而HTTPS方式下载需要优化。

## 1.8 Nginx反向代理配置

为了让我们通过HTTPS加密形式访问Gogs服务，我们配置一下Nginx代码，将10080端口转发到10081端口，并且为10081端口设置SSL证书。

我们将1.3节点准备的证书文件下载下来，并上传到服务器上。存放到`/etc/pki/nginx/`目录下。

```sh
[root@hellogitlab ~]# ls -lah /etc/pki/nginx/*gogs*
-rw-r--r-- 1 root root 3.9K 4月  24 19:03 /etc/pki/nginx/1_gogs.hellogitlab.com_bundle.crt
-rw-r--r-- 1 root root 1.7K 4月  24 19:03 /etc/pki/nginx/2_gogs.hellogitlab.com.key
```

然后在`/etc/nginx/conf.d/`目录下创建一个`gogs.conf`的配置文件。

[download gogs.conf](/scripts/nginx/gogs.conf)

配置文件内容如下：

```sh
[root@hellogitlab ~]# cat /etc/nginx/conf.d/gogs.conf
server {
        listen       10081 ssl;
        server_name  gogs.hellogitlab.com;
        ssl_certificate "/etc/pki/nginx/1_gogs.hellogitlab.com_bundle.crt";
        ssl_certificate_key "/etc/pki/nginx/2_gogs.hellogitlab.com.key";
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        location / {
       # proxy_set_header Host $host;
       # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:10080/;
       }
}
```

::: warning 注意
`listen       10081 ssl;` 最后HTTPS加密传输需要暴露的端口号。

`server_name  gogs.hellogitlab.com;`处改成你的域名。

`ssl_certificate "/etc/pki/nginx/1_gogs.hellogitlab.com_bundle.crt";` 证书文件。

`ssl_certificate_key "/etc/pki/nginx/2_gogs.hellogitlab.com.key";` 证书文件。

`proxy_pass http://localhost:10080/;`  将10081端口转发到10080端口。
:::

配置完成后，测试一下nginx配置文件是否正确。使用`nginx -t`检查一下：

```sh
[root@hellogitlab ~]# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

说明Nginx配置正确。




## 1.9 邮件配置

之前初始体验的时候，我们并没有配置Gogs的邮件，我们再次测试的时候，可以在初始安装界面加上邮件相关的配置。



## 1.10 头像优化

默认情况下，会加载`gravatar.com`网站上的头像，而在国内这个网站却被屏蔽了，导致Gogs系统显示头像会出现异常：

![](https://meizhaohui.gitee.io/imagebed/img/20210424225339.png)

我们参考 [https://github.com/gogs/gogs/issues/1470](https://github.com/gogs/gogs/issues/1470) 尝试给docker容器加上`OFFLINE_MODE`参数，并设置值为`true`，看能不能解决该问题。







参考：

- [国内引用头像问题](https://github.com/gogs/gogs/issues/1470)

