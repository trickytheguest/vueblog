
# docker配置PostgreSQL数据库


参考官方文档 https://hub.docker.com/_/postgres

下载`postgres`镜像：

```sh
[root@hellogitlab ~]# docker pull postgres
Using default tag: latest
Trying to pull repository docker.io/library/postgres ...
^[[Olatest: Pulling from docker.io/library/postgres
a076a628af6f: Already exists
d54fa0e0eb76: Pull complete
8950a7ea6876: Pull complete
1cc02b1df09e: Pull complete
06f548e51228: Pull complete
74665692d4ea: Pull complete
235e34eb13ab: Pull complete
4ad7ef5e2e79: Pull complete
76670339b0f8: Pull complete
496fa0539f99: Pull complete
f32ecbdf3b52: Pull complete
7536b8fe81ac: Pull complete
71dfc17927aa: Pull complete
fd48bac409bb: Pull complete
Digest: sha256:ec74afc9fa969a235462c27017a3fe73a05c9d4725d7e4afbe2ba6eb82fdfc87
Status: Downloaded newer image for docker.io/postgres:latest
[root@hellogitlab ~]# docker images postgres
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
docker.io/postgres   latest              acf5fb8bfd76        2 months ago        314 MB
```



创建本地持久化目录：

```sh
[root@hellogitlab ~]# mkdir /dockerdata && cd /dockerdata
[root@hellogitlab dockerdata]# mkdir -p  postgresql/data
[root@hellogitlab dockerdata]# cd postgresql/
[root@hellogitlab postgresql]# ls
data
[root@hellogitlab postgresql]#
```



为了密码安全，我们创建一个保证密码的配置文件`postgres-passwd`:

```sh
[root@hellogitlab postgresql]# echo 'POSTGRES_PASSWORD=securepasswd' > postgres-passwd
[root@hellogitlab postgresql]# echo 'POSTGRES_USER=postgres' >> postgres-passwd
POSTGRES_PASSWORD=securepasswd
POSTGRES_USER=postgres
[root@hellogitlab postgresql]# 
```



运行`postgresql`容器：

```sh
docker run --name postgres-server --restart=always -p 5432:5432 -v /dockerdata/postgresql/data:/var/lib/postgresql/data -e POSTGRES_PASSWORD_FILE=/dockerdata/postgresql/postgres_passwd -d postgres
```

使用这种方式运行容器中一直提示找不到文件：

```sh
[root@hellogitlab postgresql]# docker run --name postgres-server --restart=always -p 5432:5432 -v /dockerdata/postgresql/data:/var/lib/postgresql/data -e POSTGRES_PASSWORD_FILE=/dockerdata/postgresql/postgres_passwd -d postgres
be7218055a40da7c58c46742286dc73ee8bcd824f1180a29d591d0b7bb1fad6d
[root@hellogitlab postgresql]# docker logs be72
/usr/local/bin/docker-entrypoint.sh: line 21: /dockerdata/postgresql/postgres_passwd: No such file or directory
/usr/local/bin/docker-entrypoint.sh: line 21: /dockerdata/postgresql/postgres_passwd: No such file or directory
/usr/local/bin/docker-entrypoint.sh: line 21: /dockerdata/postgresql/postgres_passwd: No such file or directory
/usr/local/bin/docker-entrypoint.sh: line 21: /dockerdata/postgresql/postgres_passwd: No such file or directory
[root@hellogitlab postgresql]#
```

我们改用直接在命令行设置密码形式运行：


```sh
[root@hellogitlab ~]# docker run --name postgres-server --restart=always -p 5432:5432 -v /dockerdata/postgresql/data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=securepasswd -d postgres
27a0f23540d8e23a1b86b56465d35e60c768ac822fb95b54b527996d30658a0a
[root@hellogitlab ~]# docker ps |head -n 1; docker ps |grep postgres
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                              NAMES
27a0f23540d8        postgres            "docker-entrypoint..."   2 minutes ago       Up 2 minutes        0.0.0.0:5432->5432/tcp             postgres-server
```

可以看到postgres-server容器运行正常！





```text
docker run --name nextcloud_test -d  -p 8081:80 -v nextcloud:/var/www/html nextcloud
```









参考：

- [postgres Docker Official Images](https://hub.docker.com/_/postgres)