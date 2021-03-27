# 使用docker搭建nextcloud私有云盘



## 1. docker国内镜像配置

Docker的国内镜像源的资源站也比较丰富：
- Docker中国区官方镜像: https://registry.docker-cn.com
- 网易:http://hub-mirror.c.163.com
- ustc:https://docker.mirrors.ustc.edu.cn
- 中国科技大学:https://docker.mirrors.ustc.edu.cn
- 阿里云: https://cr.console.aliyun.com/

```sh
[root@hellogitlab ~]# cat /etc/docker/daemon.json
{
    "registry-mirrors" : [
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com",
    "https://cr.console.aliyun.com/"
  ]
}
```

重启docker服务：

```sh
[root@hellogitlab ~]# systemctl restart docker && systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; disabled; vendor preset: disabled)
   Active: active (running) since 三 2021-03-24 20:50:46 CST; 5ms ago
     Docs: http://docs.docker.com
 Main PID: 11725 (dockerd-current)
   CGroup: /system.slice/docker.service
           ├─11725 /usr/bin/dockerd-current --add-runtime docker-runc=/usr/libexec/docker/docker-runc-current --default-runtime=docker-runc --exec-opt native.cgroupdriver=systemd --u...
           └─11734 /usr/bin/docker-containerd-current -l unix:///var/run/docker/libcontainerd/docker-containerd.sock --metrics-interval=0 --start-timeout 2m --state-dir /var/run/dock...

3月 24 20:50:45 hellogitlab.com dockerd-current[11725]: time="2021-03-24T20:50:45.570763506+08:00" level=warning msg="Docker could not enable SELinux on the host system"
3月 24 20:50:45 hellogitlab.com dockerd-current[11725]: time="2021-03-24T20:50:45.590350462+08:00" level=info msg="Graph migration to content-addressability took 0.00 seconds"
3月 24 20:50:45 hellogitlab.com dockerd-current[11725]: time="2021-03-24T20:50:45.590947445+08:00" level=info msg="Loading containers: start."
3月 24 20:50:45 hellogitlab.com dockerd-current[11725]: time="2021-03-24T20:50:45.605066614+08:00" level=info msg="Firewalld running: true"
3月 24 20:50:45 hellogitlab.com dockerd-current[11725]: time="2021-03-24T20:50:45.908648970+08:00" level=info msg="Default bridge (docker0) is assigned with an IP address ...P address"
3月 24 20:50:46 hellogitlab.com dockerd-current[11725]: time="2021-03-24T20:50:46.014635728+08:00" level=info msg="Loading containers: done."
3月 24 20:50:46 hellogitlab.com dockerd-current[11725]: time="2021-03-24T20:50:46.056797018+08:00" level=info msg="Daemon has completed initialization"
3月 24 20:50:46 hellogitlab.com dockerd-current[11725]: time="2021-03-24T20:50:46.056827634+08:00" level=info msg="Docker daemon" commit="7f2769b/1.13.1" graphdriver=overl...ion=1.13.1
3月 24 20:50:46 hellogitlab.com dockerd-current[11725]: time="2021-03-24T20:50:46.062217420+08:00" level=info msg="API listen on /var/run/docker.sock"
3月 24 20:50:46 hellogitlab.com systemd[1]: Started Docker Application Container Engine.
Hint: Some lines were ellipsized, use -l to show in full.
[root@hellogitlab ~]#
```

检查镜像信息：

```sh
[root@hellogitlab ~]# docker info |grep -A4 'Registry'
WARNING: You're not using the default seccomp profile
Registry: https://index.docker.io/v1/
Experimental: false
Insecure Registries:
 127.0.0.0/8
Registry Mirrors:
 https://registry.docker-cn.com
 https://docker.mirrors.ustc.edu.cn
 http://hub-mirror.c.163.com
 https://cr.console.aliyun.com/
[root@hellogitlab ~]#
```




## 2. 下载nextcloud镜像


```sh
[root@hellogitlab ~]# docker pull nextcloud
Using default tag: latest
Trying to pull repository docker.io/library/nextcloud ...
latest: Pulling from docker.io/library/nextcloud
a076a628af6f: Pull complete
02bab8795938: Pull complete
657d9d2c68b9: Pull complete
f47b5ee58e91: Pull complete
2b62153f094c: Pull complete
60b09083723b: Pull complete
1701d4d0a478: Pull complete
bae0c4dc63ea: Pull complete
a1c05958a901: Pull complete
5964d339be93: Pull complete
17c19430ed9f: Pull complete
1c16920b970c: Pull complete
1fab8f583d66: Pull complete
0c5749796e5b: Pull complete
c7c9dec98822: Pull complete
919350821522: Pull complete
0c1110bab2e5: Pull complete
bb1acf790acf: Pull complete
dfb213813b2e: Pull complete
bf0a9ac4c61a: Pull complete
Digest: sha256:7a0f76e4100619672439e7d1cffd7d0ae1ff1318e7908ca415412d721c3163c5
Status: Downloaded newer image for docker.io/nextcloud:latest
[root@hellogitlab ~]# docker images
REPOSITORY             TAG                 IMAGE ID            CREATED             SIZE
docker.io/nextcloud    latest              8bb5955fb2f7        2 months ago        800 MB
```



## 3. docker运行nextcloud

创建目录用于持久化，在服务器空间比较大的盘下面创建一个目录用于存储`nextcloud`的数据。

```sh
[root@hellogitlab ~]# df -h
文件系统        容量  已用  可用 已用% 挂载点
/dev/vda1        50G   15G   33G   31% /
devtmpfs        1.9G     0  1.9G    0% /dev
tmpfs           1.9G   24K  1.9G    1% /dev/shm
tmpfs           1.9G  588K  1.9G    1% /run
tmpfs           1.9G     0  1.9G    0% /sys/fs/cgroup
tmpfs           379M     0  379M    0% /run/user/0
tmpfs           379M     0  379M    0% /run/user/1000
[root@hellogitlab ~]#
[root@hellogitlab ~]# mkdir /nextcloud
[root@hellogitlab ~]# ls -ld /nextcloud/
drwxr-xr-x 2 root root 4096 3月  24 20:58 /nextcloud/
```

查看当前系统已经占用了哪些端口：

```sh
[root@hellogitlab svn]# htpasswd -b passwd meizhaohui securepassword
Updating password for user meizhaohui
```



运行命令`docker run -d -name nextcloud -p 8080:80 -v nextcloud:/var/www/html nextcloud`创建nextcloud服务：

```
[root@hellogitlab ~]# docker run --name nextcloud -d  -p 8080:80 -v nextcloud:/var/www/html nextcloud
89a04170593a665f114c9a1c207d64590aea68e70cb0802783f27dd22e67c921
[root@hellogitlab ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
89a04170593a        nextcloud           "/entrypoint.sh ap..."   3 seconds ago       Up 2 seconds        0.0.0.0:8080->80/tcp   nextcloud
```

查看端口情况：

```sh
[root@hellogitlab ~]# netstat -tunlp|grep 8080
tcp6       0      0 :::8080                 :::*                    LISTEN      22480/docker-proxy-
[root@hellogitlab ~]#
```

放行端口:

```sh
# 删除不放行的端口
[root@hellogitlab ~]# firewall-cmd --zone=public --remove-port=81/tcp --permanent
success

# 放行8080端口
[root@hellogitlab ~]# firewall-cmd --zone=public --add-port=8080/tcp --permanent
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
  ports: 22/tcp 80/tcp 3690/tcp 443/tcp 8080/tcp
  protocols:
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```

## 4. 在浏览器中访问nextcloud

在浏览器中输入`http://hellogitlab.com:8080/`，可以正常打开nextcloud页面：

![](/img/Snipaste_2021-03-24_21-52-18.png)

创建一个管理员账号：

![](/img/Snipaste_2021-03-24_21-53-00.png)

并点击安装完成。

等一会儿后，nextcloud安装完成！安装完成后就可以正常使用nextcloud了，你的私有云盘基本配置成功了。



待优化的点：

- 现在网站使用的`http`方式传输，需要更新为`https`方式传输。
- 配置数据库。
- 增加redis缓存。

## 5. 配置域名解析并申请证书

在腾讯DNS解析界面增加一条新的域名解析：

![](/img/Snipaste_2021-03-26_00-33-12.png)

等待一段时间后，使用`ping`命令来测试子域名是否解析成功：

```sh
[mzh@MacBookPro ~ ]$ ping nextcloud.hellogitlab.com -c 3
PING nextcloud.hellogitlab.com (106.54.98.83): 56 data bytes
64 bytes from 106.54.98.83: icmp_seq=0 ttl=51 time=25.004 ms
64 bytes from 106.54.98.83: icmp_seq=1 ttl=51 time=25.221 ms
64 bytes from 106.54.98.83: icmp_seq=2 ttl=51 time=25.848 ms

--- nextcloud.hellogitlab.com ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 25.004/25.358/25.848/0.358 ms
```

可以看到，能够正常`ping`通，说明解析正常。



再在腾讯云SSL证书界面 [https://console.cloud.tencent.com/ssl](https://console.cloud.tencent.com/ssl) 为新的域名`nextcloud.hellogitlab.com`申请一个免费证书。

证书申请成功后，过一会腾讯云就会颁发证书成功，并在域名解析中添加一条TXT记录。我们下载证书文件，并解压。

将解压后的Nginx文件夹中的两个文件上传到服务器端。

![](/img/Snipaste_2021-03-26_00-39-52.png)

文件上传后，存放在`/etc/pki/nginx`目录下：

```sh
[root@hellogitlab ~]# ls -lh /etc/pki/nginx/
总用量 8.0K
-rw-r--r-- 1 root root 3.7K 3月  26 00:25 1_nextcloud.hellogitlab.com_bundle.crt
-rw-r--r-- 1 root root 1.7K 3月  26 00:25 2_nextcloud.hellogitlab.com.key
```



## 6. 安装nginx

直接使用命令`yum install nginx -y`即可。

 ```sh
[root@hellogitlab ~]# yum install nginx -y
 ```

查看ngInx版本信息：

```sh
[root@hellogitlab ~]# nginx -v
nginx version: nginx/1.16.1
```

配置`nginx.conf`文件，为了不与我们的博客系统冲突，我们使用`444`端口作为`nextcloud.hellogitlab.com`域名的https使用的端口。

配置如下：

```sh
[root@hellogitlab ~]# cd /etc/nginx
[root@hellogitlab nginx]# pwd
/etc/nginx
[root@hellogitlab nginx]# cp nginx.conf nginx.conf.bak
[root@hellogitlab nginx]# cat nginx.conf
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

#     server {
#         listen       80 default_server;
#         listen       [::]:80 default_server;
#         server_name  _;
#         root         /usr/share/nginx/html;
#
#         # Load configuration files for the default server block.
#         include /etc/nginx/default.d/*.conf;
#
#         location / {
#         }
#
#         error_page 404 /404.html;
#         location = /404.html {
#         }
#
#         error_page 500 502 503 504 /50x.html;
#         location = /50x.html {
#         }
#     }

# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2 default_server;
#        listen       [::]:443 ssl http2 default_server;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers HIGH:!aNULL:!MD5;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        location / {
#        }
#
#        error_page 404 /404.html;
#        location = /404.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#        location = /50x.html {
#        }
#    }


	server {
	  listen 444 ssl http2;
	  listen [::]:444 ssl http2;
	  server_name nextcloud.hellogitlab.com;

    ssl_certificate "/etc/pki/nginx/1_nextcloud.hellogitlab.com_bundle.crt";
    ssl_certificate_key "/etc/pki/nginx/2_nextcloud.hellogitlab.com.key";
	  client_max_body_size 10G;

	  add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload";

	  location = /.well-known/carddav {
	      return 301 $scheme://$host:$server_port/remote.php/dav;
	  }
	  location = /.well-known/caldav {
	      return 301 $scheme://$host:$server_port/remote.php/dav;
	  }

	  location / {
	      proxy_redirect off;
	      proxy_pass http://127.0.0.1:8080;
	      proxy_set_header Host $http_host;
	  }
	  location = /.htaccess {
	      return 404;
	  }
	}

}
[root@hellogitlab nginx]#
```

最终配置的`nginx.conf`如上上所。注意其中:

```
ssl_certificate "/etc/pki/nginx/1_nextcloud.hellogitlab.com_bundle.crt";
ssl_certificate_key "/etc/pki/nginx/2_nextcloud.hellogitlab.com.key";
```

这两行证书的路径要与上一步上传到服务器端的路径保证一致。

另外，`proxy_pass http://127.0.0.1:8080;` 这一行是对8080端口数据进行转发，转发到上面定义444端口上来。

测试配置有效性：

```sh
[root@hellogitlab ~]# nginx -t
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
[root@hellogitlab ~]# systemctl start nginx && systemctl status nginx
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; disabled; vendor preset: disabled)
   Active: active (running) since 五 2021-03-26 01:16:00 CST; 5ms ago
  Process: 21321 ExecStart=/usr/sbin/nginx (code=exited, status=0/SUCCESS)
  Process: 21318 ExecStartPre=/usr/sbin/nginx -t (code=exited, status=0/SUCCESS)
  Process: 21316 ExecStartPre=/usr/bin/rm -f /run/nginx.pid (code=exited, status=0/SUCCESS)
 Main PID: 21323 (nginx)
    Tasks: 3
   Memory: 3.3M
   CGroup: /system.slice/nginx.service
           ├─21323 nginx: master process /usr/sbin/nginx
           ├─21324 nginx: worker process
           └─21325 nginx: worker process

3月 26 01:16:00 hellogitlab.com systemd[1]: Starting The nginx HTTP and reverse proxy server...
3月 26 01:16:00 hellogitlab.com nginx[21318]: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
3月 26 01:16:00 hellogitlab.com nginx[21318]: nginx: configuration file /etc/nginx/nginx.conf test is successful
3月 26 01:16:00 hellogitlab.com systemd[1]: Started The nginx HTTP and reverse proxy server.
[root@hellogitlab ~]# systemctl start httpd && systemctl status httpd
● httpd.service - The Apache HTTP Server
   Loaded: loaded (/usr/lib/systemd/system/httpd.service; enabled; vendor preset: disabled)
   Active: active (running) since 五 2021-03-26 01:08:14 CST; 8min ago
     Docs: man:httpd(8)
           man:apachectl(8)
  Process: 17810 ExecStop=/bin/kill -WINCH ${MAINPID} (code=exited, status=0/SUCCESS)
 Main PID: 19857 (httpd)
   Status: "Total requests: 0; Current requests/sec: 0; Current traffic:   0 B/sec"
    Tasks: 6
   Memory: 28.0M
   CGroup: /system.slice/httpd.service
           ├─19857 /usr/sbin/httpd -DFOREGROUND
           ├─19858 /usr/sbin/httpd -DFOREGROUND
           ├─19859 /usr/sbin/httpd -DFOREGROUND
           ├─19860 /usr/sbin/httpd -DFOREGROUND
           ├─19861 /usr/sbin/httpd -DFOREGROUND
           └─19862 /usr/sbin/httpd -DFOREGROUND

3月 26 01:08:14 hellogitlab.com systemd[1]: Starting The Apache HTTP Server...
3月 26 01:08:14 hellogitlab.com systemd[1]: Started The Apache HTTP Server.
[root@hellogitlab ~]#
```

可以看到`httpd`和`nginx`服务都正常启动。

```sh
[root@hellogitlab ~]# netstat -tunlp|grep httpd
tcp6       0      0 :::80                   :::*                    LISTEN      19857/httpd
tcp6       0      0 :::81                   :::*                    LISTEN      19857/httpd
tcp6       0      0 :::443                  :::*                    LISTEN      19857/httpd
[root@hellogitlab ~]# netstat -tunlp|grep nginx
tcp        0      0 0.0.0.0:444             0.0.0.0:*               LISTEN      21323/nginx: master
tcp6       0      0 :::444                  :::*                    LISTEN      21323/nginx: master
```



防火墙放行`444`端口，并关闭`8080`端口。

```sh
# 删除不放行的端口
[root@hellogitlab ~]# firewall-cmd --zone=public --remove-port=8080/tcp --permanent
success

# 放行444端口
[root@hellogitlab ~]# firewall-cmd --zone=public --add-port=444/tcp --permanent
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
  ports: 22/tcp 80/tcp 3690/tcp 443/tcp 444/tcp
  protocols:
  masquerade: no
  forward-ports:
  source-ports:
  icmp-blocks:
  rich rules:
```

## 7. 配置nextcloud config.php文件

```sh
[root@hellogitlab ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
89a04170593a        nextcloud           "/entrypoint.sh ap..."   27 hours ago        Up About an hour    0.0.0.0:8080->80/tcp   nextcloud
[root@hellogitlab ~]# dkin 89a
root@89a04170593a:/var/www/html# ls
3rdparty  COPYING  config	core	  custom_apps  index.html  lib	ocm-provider  ocs-provider  remote.php	robots.txt  themes
AUTHORS   apps	   console.php	cron.php  data	       index.php   occ	ocs	      public.php    resources	status.php  version.php
root@89a04170593a:/var/www/html# cat config/config.php
<?php
$CONFIG = array (
  'htaccess.RewriteBase' => '/',
  'memcache.local' => '\\OC\\Memcache\\APCu',
  'apps_paths' =>
  array (
    0 =>
    array (
      'path' => '/var/www/html/apps',
      'url' => '/apps',
      'writable' => false,
    ),
    1 =>
    array (
      'path' => '/var/www/html/custom_apps',
      'url' => '/custom_apps',
      'writable' => true,
    ),
  ),
  'instanceid' => 'ocju4a79attj',
  'passwordsalt' => 'GWAjOCz7FLEXJdYtSJHpSb6U9TrMhy',
  'secret' => 'dON/2F9auxtvAT8IMYlcEuYZGyV2RTxC/MbXcSdtNlKyPzWz',
  'trusted_domains' =>
  array (
    0 => 'hellogitlab.com:8080',
    1 => 'nextcloud.hellogitlab.com',
  ),
  'datadirectory' => '/var/www/html/data',
  'dbtype' => 'sqlite3',
  'version' => '20.0.5.2',
  'overwrite.cli.url' => 'http://hellogitlab.com:8080',
  'installed' => true,
  'overwriteprotocol' => 'https',
);
root@89a04170593a:/var/www/html# exit
```

注意，34行加上`1 => 'nextcloud.hellogitlab.com',`对自己的域名进行授信。41行`'overwriteprotocol' => 'https',设置自动跳转。

重启nextcloud容器:

```sh
[root@hellogitlab ~]# docker restart nextcloud
nextcloud
[root@hellogitlab ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                  NAMES
89a04170593a        nextcloud           "/entrypoint.sh ap..."   27 hours ago        Up 3 seconds        0.0.0.0:8080->80/tcp   nextcloud
[root@hellogitlab ~]#
```



在浏览器中访问新的域名：

![](/img/Snipaste_2021-03-26_01-22-04.png)

![](/img/Snipaste_2021-03-26_01-30-33.png)





## 8. 邮件通知配置

使用`postmaster`账号登陆企业邮箱，创建一个企业邮箱的通知账号用户`notice@hellogitlab.com`，然后在nextcloud设置`个人信息`中配置自己的`电子邮箱`，然后在管理`基本设置`界面，设置一下`电子邮件服务器`，按下图方式设置：

![](/img/Snipaste_2021-03-27_15-23-30.png)

设置完成后，点击`发送电子邮件`按钮，查看一下自己的邮箱中是否会收到测试邮件通知,过一会儿收到邮件通知：

![](/img/电子邮件设置测试.png)

说明邮件通知配置成功！

## 9. 更新国内源

nextcloud使用的是`debian buster`系统，我们更新其为国内源，方便安装程序。我们使用腾讯云。

```sh
root@89a04170593a:/var/www/html/# cd /etc/apt/
# 备份原始的源
root@89a04170593a:/etc/apt# cp sources.list sources.list.bak
root@89a04170593a:/etc/apt# ls
apt.conf.d  auth.conf.d  preferences.d	sources.list  sources.list.bak	sources.list.d	trusted.gpg.d
# 将腾讯云镜像信息写入到文件
root@89a04170593a:/etc/apt# cat > sources.list << EOF
> deb http://mirrors.cloud.tencent.com/debian/ buster main non-free contrib
> deb http://mirrors.cloud.tencent.com/debian-security buster/updates main
> deb http://mirrors.cloud.tencent.com/debian/ buster-updates main non-free contrib
> deb http://mirrors.cloud.tencent.com/debian/ buster-backports main non-free contrib
>
> deb-src http://mirrors.cloud.tencent.com/debian-security buster/updates main
> deb-src http://mirrors.cloud.tencent.com/debian/ buster main non-free contrib
> deb-src http://mirrors.cloud.tencent.com/debian/ buster-updates main non-free contrib
> deb-src http://mirrors.cloud.tencent.com/debian/ buster-backports main non-free contrib
> EOF

#更新一下源
root@89a04170593a:/etc/apt# apt update
Hit:1 http://mirrors.cloud.tencent.com/debian buster InRelease
Hit:2 http://mirrors.cloud.tencent.com/debian-security buster/updates InRelease
Hit:3 http://mirrors.cloud.tencent.com/debian buster-updates InRelease
Hit:4 http://mirrors.cloud.tencent.com/debian buster-backports InRelease
Reading package lists... Done
Building dependency tree
Reading state information... Done
17 packages can be upgraded. Run 'apt list --upgradable' to see them.
root@89a04170593a:/etc/apt#
```



## 10. 设置缩略图

使用时会发现，Nextcloud 上传的视频不能生成缩略图。其实 Nextcloud 本身支持生成视频缩略图，需要安装 ffmpeg 并修改配置：

```sh
root@89a04170593a:~# apt install ffmpeg -y
Reading package lists... Done
Building dependency tree
Reading state information... Done
Suggested packages:
  ffmpeg-doc
The following NEW packages will be installed:
  ffmpeg
0 upgraded, 1 newly installed, 0 to remove and 17 not upgraded.
Need to get 1434 kB of archives.
After this operation, 2007 kB of additional disk space will be used.
Get:1 http://mirrors.cloud.tencent.com/debian buster/main amd64 ffmpeg amd64 7:4.1.6-1~deb10u1 [1434 kB]
Fetched 1434 kB in 0s (3385 kB/s)
debconf: delaying package configuration, since apt-utils is not installed
Selecting previously unselected package ffmpeg.
(Reading database ... 18550 files and directories currently installed.)
Preparing to unpack .../ffmpeg_7%3a4.1.6-1~deb10u1_amd64.deb ...
Unpacking ffmpeg (7:4.1.6-1~deb10u1) ...
Setting up ffmpeg (7:4.1.6-1~deb10u1) ...
root@89a04170593a:~#
```

修改`/var/www/html/config/config.php`配置文件，添加：

```php
'enable_previews' => true,
'enabledPreviewProviders' =>
array (
  0 => 'OC\\Preview\\Image',
  1 => 'OC\\Preview\\Movie',
  2 => 'OC\\Preview\\TXT',
),
```

查看最后几行内容：

```sh
root@89a04170593a:/var/www/html/config# tail -n 8 config.php
  'enable_previews' => true,
  'enabledPreviewProviders' =>
  array (
    0 => 'OC\\Preview\\Image',
    1 => 'OC\\Preview\\Movie',
    2 => 'OC\\Preview\\TXT',
 ),
);
```

![](/img/Snipaste_2021-03-27_20-37-48.png)

修改后，重启nextcloud容器：

```sh
[root@hellogitlab ~]# docker restart nextcloud
nextcloud
```

然后再在nextcloud中可以看到视频已经的缩略图了。

![](/img/Snipaste_2021-03-27_20-41-56.png)





参考：

- [使用docker-compose搭建Nextcloud个人云盘并开启https教程](https://blog.csdn.net/shangyexin/article/details/106306680)
- [Centos 7.6搭建Nextcloud 17.0.0个人云盘详细教程](https://blog.csdn.net/shangyexin/article/details/102724685)
- [企业邮箱通过SMTP程序进行发信](https://help.aliyun.com/knowledge_detail/36687.html)
- [企业邮箱postmaster管理员账号更改密码方法](https://help.aliyun.com/document_detail/36725.html)
- [Debian 10 Buster 国内常用镜像源](https://cloud.tencent.com/developer/article/1590080)
- 