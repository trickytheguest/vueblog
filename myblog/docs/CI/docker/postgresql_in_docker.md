
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









参考：

- [postgres Docker Official Images](https://hub.docker.com/_/postgres)