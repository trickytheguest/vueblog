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
  ports: 10086/tcp 80/tcp 3690/tcp 443/tcp 8080/tcp
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



## 5. 安装nginx

直接使用命令`yum install nginx -y`即可。

 ```sh
[root@hellogitlab ~]# yum install nginx -y
 ```

查看ngInx版本信息：

```sh
[root@hellogitlab ~]# nginx -v
nginx version: nginx/1.16.1
```

