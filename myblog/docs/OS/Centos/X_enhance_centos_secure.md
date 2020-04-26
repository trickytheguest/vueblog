# CentOS7增加系统安全性

[[toc]]

为了给CentOS7系统增加系统的安全性，防止系统被黑，可以进行以下操作：

- 修改用户密码为高强度密码
- 创建`sudo`用户
- 修改`SSH`的默认`22`端口
- 禁用`root`账号远程登陆
- 安装`DenyHosts`防暴力破解软件
- 安装`ClamAV`反病毒软件

## 修改用户密码为高强度密码

- 所谓的高强度密码，就是包含了`大小写`、`数字`、`符号`的密码。

### 安装自动产生密码的软件`pygen`

```sh
[root@hellogitlab ~]# yum install pwgen -y 
Loaded plugins: fastestmirror, langpacks
Repository epel is listed more than once in the configuration
Loading mirror speeds from cached hostfile
WandiscoSVN                                                                                      | 2.9 kB  00:00:00     
epel                                                                                             | 5.3 kB  00:00:00     
extras                                                                                           | 2.9 kB  00:00:00     
ius                                                                                              | 1.3 kB  00:00:00     
os                                                                                               | 3.6 kB  00:00:00     
updates                                                                                          | 2.9 kB  00:00:00     
(1/3): epel/7/x86_64/updateinfo                                                                  | 1.0 MB  00:00:00     
(2/3): epel/7/x86_64/primary_db                                                                  | 6.9 MB  00:00:01     
(3/3): updates/7/x86_64/primary_db                                                               | 2.8 MB  00:00:03     
Resolving Dependencies
--> Running transaction check
---> Package pwgen.x86_64 0:2.08-1.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

========================================================================================================================
 Package                    Arch                        Version                         Repository                 Size
========================================================================================================================
Installing:
 pwgen                      x86_64                      2.08-1.el7                      epel                       26 k

Transaction Summary
========================================================================================================================
Install  1 Package

Total download size: 26 k
Installed size: 42 k
Downloading packages:
pwgen-2.08-1.el7.x86_64.rpm                                                                      |  26 kB  00:00:00     
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : pwgen-2.08-1.el7.x86_64                                                                              1/1 
  Verifying  : pwgen-2.08-1.el7.x86_64                                                                              1/1 

Installed:
  pwgen.x86_64 0:2.08-1.el7                                                                                             

Complete!
```

### 生成20个超级难记的密码

```sh
[root@hellogitlab ~]# pwgen -cnys 14 -n 20
T@N0PgKw)m4-ia %a3Oz\-+r170{x bPs9J84p%^nz/. mt9Ul_i'@kNOVW Yx'M7;xGZ)f.Id
T},u2]B1#s1Ob) iE6nkE_.()*$bQ 5:{8G,9OOaJ/!- /f0%Toh.ccqzq] <fjxUZQ}4wHvsa
>kx8!qvlkRf(TX W:0?cYKhOQO0{o dA_'nKikzD>7S6 ]^1S@;tBoUXurJ X/fjTy'[2,Sw2u
8=@S+>Wx1i9$yh |1Y^R4W5cgEb:E -OYSF0nS7zv/;q W=G;vt~Wzzr1F" tJD8OTl,2z13EL
```

我们使用`passwd`命令可以修改自己的密码：

```sh
[root@hellogitlab ~]# passwd
Changing password for user root.
New password: 
Retype new password: 
passwd: all authentication tokens updated successfully.
```

或者使用下面这种方式修改密码：

```sh
[root@hellogitlab ~]# export HISTCONTROL=ignorespace
[root@hellogitlab ~]#  echo "tJD8OTl,2z13EL" |passwd root --stdin
Changing password for user root.
passwd: all authentication tokens updated successfully.
[root@hellogitlab ~]# history |tail -n 2
  689  2019-10-31 22:36:19 export HISTCONTROL=ignorespace 
  690  2019-10-31 22:36:43 history |tail -n 2
```

上面操作进行了以下事情：
- 通过`export HISTCONTROL=ignorespace`设置`history`不记录敏感命令，即命令以空格开头时不会被记录到`history`历史记录中。
- 通过`echo "tJD8OTl,2z13EL" |passwd root --stdin`设置`root`用户密码,`--stdin`表明从标准输入中读入密码信息。
- `history |tail -n 2`查看历史记录，可以看到`echo "tJD8OTl,2z13EL" |passwd root --stdin`这条命令没有被记录。

## 创建`sudo`用户

### 创建用户

新建普通用户"meizhaohui"

```sh
[root@hellogitlab ~]# useradd meizhaohui
```

### 设置密码

输入两次密码：

```sh
[root@hellogitlab ~]# passwd meizhaohui
Changing password for user meizhaohui.
New password: 
Retype new password: 
Sorry, passwords do not match.
New password: 
Retype new password: 
passwd: all authentication tokens updated successfully.
```

### 修改授权文件

- 查看授权文件位置

```sh
[root@hellogitlab ~]# whereis sudoers
sudoers: /etc/sudoers.d /etc/sudoers /usr/share/man/man5/sudoers.5.gz
```

- 给授权文件`/etc/sudoers`增加写(w)权限

```sh
[root@hellogitlab ~]# ls -lah /etc/sudoers
-r--r-----. 1 root root 4.3K Oct 30  2018 /etc/sudoers
[root@hellogitlab ~]# chmod -v u+w /etc/sudoers
mode of ‘/etc/sudoers’ changed from 0440 (r--r-----) to 0640 (rw-r-----)
[root@hellogitlab ~]# ls -lah /etc/sudoers
-rw-r-----. 1 root root 4.3K Oct 30  2018 /etc/sudoers
```

- 在授权文件`/etc/sudoers`中增加`sudo`用户"meizhaohui"

```sh
[root@hellogitlab ~]# sed -n '99,100p' /etc/sudoers
## Allow root to run any commands anywhere 
root    ALL=(ALL)       ALL

# 在第100行的下一行增加以下内容
meizhaohui    ALL=(ALL)       ALL

# 再次查看内容
[root@hellogitlab ~]# sed -n '99,101p' /etc/sudoers
## Allow root to run any commands anywhere 
root    ALL=(ALL)       ALL
meizhaohui      ALL=(ALL)       ALL
```
- 将授权文件的权限还原

```sh
[root@hellogitlab ~]# chmod -v u-w /etc/sudoers
mode of ‘/etc/sudoers’ changed from 0640 (rw-r-----) to 0440 (r--r-----)
[root@hellogitlab ~]# ls -lah /etc/sudoers
-r--r----- 1 root root 4.3K Oct 31 21:17 /etc/sudoers
```

### 测试`sudo`用户是否具备`sudo`权限

- 使用"meizhaohui"账号登陆系统，并尝试查看`/etc/sudoers`文件内容

```sh
[meizhaohui@hellogitlab ~]$ cat /etc/sudoers     
cat: /etc/sudoers: Permission denied
[meizhaohui@hellogitlab ~]$ head /etc/sudoers
head: cannot open ‘/etc/sudoers’ for reading: Permission denied
[meizhaohui@hellogitlab ~]$ sudo head /etc/sudoers
[sudo] password for meizhaohui: 
## Sudoers allows particular users to run various commands as
## the root user, without needing the root password.
##
## Examples are provided at the bottom of the file for collections
## of related commands, which can then be delegated out to particular
## users or groups.
## 
## This file must be edited with the 'visudo' command.

## Host Aliases
```

可以发现，不使用`sudo`命令时，无法查看文件内容，显示"`Permission denied`"，表明没有权限；使用`sudo`命令时，可以查看文件内容。说明`sudo`用户配置正确。

## 修改`ssh`默认端口

- `SSH`是建立在应用层和传输层基础上的一种安全协议。`SSH`传输数据是加密的，可以有效防止传输过程被截取数据保障安全。
- `SSH`默认端口值是`22`，最大可以是`65535`。
- 为防止暴力破解，可以修改SSH端口号为非`22`，如`10000`。

下面我们将SSH的端口号改成`10000`：

- 查看配置文件`/etc/ssh/sshd_config`的默认端口

```sh
[root@hellogitlab ~]# grep -n 'Port 22' /etc/ssh/sshd_config
17:#Port 22
```

可以发现17行中显示端口号是`22`。

### 修改端口号

```sh
[root@hellogitlab ~]# sed -i 's/#Port 22/Port 10000/g' /etc/ssh/sshd_config
[root@hellogitlab ~]# sed -n '17p' /etc/ssh/sshd_config
Port 10000
```

### 重启`SSH`服务

```sh
[root@hellogitlab ~]# systemctl restart sshd
[root@hellogitlab ~]# systemctl status sshd
● sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2019-10-31 21:40:38 CST; 7s ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 27570 (sshd)
   CGroup: /system.slice/sshd.service
           └─27570 /usr/sbin/sshd -D

Oct 31 21:40:38 hellogitlab.com systemd[1]: Stopped OpenSSH server daemon.
Oct 31 21:40:38 hellogitlab.com systemd[1]: Starting OpenSSH server daemon...
Oct 31 21:40:38 hellogitlab.com sshd[27570]: Server listening on 0.0.0.0 port 10000.
Oct 31 21:40:38 hellogitlab.com systemd[1]: Started OpenSSH server daemon.
Oct 31 21:40:39 hellogitlab.com sshd[27561]: Failed password for root from 106.54.19.58 port 54334 ssh2
Oct 31 21:40:39 hellogitlab.com sshd[27561]: Connection closed by 106.54.19.58 port 54334 [preauth]
[root@hellogitlab ~]# netstat -tunlp|grep ssh
tcp        0      0 0.0.0.0:10000           0.0.0.0:*               LISTEN      27570/sshd
```

可以发现`SSH`服务在端口号已经变成`10000`了。

### 防火墙放行`10000`端口

- 查看当前防火墙放行规则信息

```sh
[root@hellogitlab ~]# systemctl status firewalld
● firewalld.service - firewalld - dynamic firewall daemon
   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2019-10-31 10:58:06 CST; 10h ago
     Docs: man:firewalld(1)
 Main PID: 25023 (firewalld)
   CGroup: /system.slice/firewalld.service
           └─25023 /usr/bin/python -Es /usr/sbin/firewalld --nofork --nopid

Oct 31 10:58:06 hellogitlab.com systemd[1]: Starting firewalld - dynamic firewall daemon...
Oct 31 10:58:06 hellogitlab.com systemd[1]: Started firewalld - dynamic firewall daemon.

[root@hellogitlab ~]# firewall-cmd --list-all
public
  target: default
  icmp-block-inversion: no
  interfaces: 
  sources: 
  services: ssh dhcpv6-client
  ports: 90/tcp
  protocols: 
  masquerade: no
  forward-ports: 
  source-ports: 
  icmp-blocks: 
  rich rules: 
```

可以看到默认是放行`ssh`服务的。

为防止不必要的麻烦，我们还是手动将`10000`端口放行。

```sh
[root@hellogitlab ~]# firewall-cmd --zone=public --add-port=10000/tcp --permanent
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
  ports: 90/tcp 10000/tcp
  protocols: 
  masquerade: no
  forward-ports: 
  source-ports: 
  icmp-blocks: 
  rich rules: 
```

退出SecureCRT远程连接。

### 验证`SSH`端口是否修改成功

- 尝试使用`22`端口和`10000`端口连接服务器。
- 使用`22`端口连接时提示`The remote system refused the connection.`异常。
- 使用`10000`端口连接时，可以正常连接到服务器，说明配置正确。

## 禁用`root`账户远程登陆

- 查看用户手册

```sh
[root@hellogitlab ~]# man sshd_config
# 可以看到以下内容
PermitRootLogin
         Specifies whether root can log in using ssh(1).  The argument must be yes, prohibit-password,
         without-password, forced-commands-only, or no.  The default is yes.

         If this option is set to prohibit-password or without-password, password and keyboard-interactive
         authentication are disabled for root.

         If this option is set to forced-commands-only, root login with public key authentication will be
         allowed, but only if the command option has been specified (which may be useful for taking remote back‐
         ups even if root login is normally not allowed).  All other authentication methods are disabled for
         root.

         If this option is set to no, root is not allowed to log in.
```

`If this option is set to no, root is not allowed to log in.`意思是指如果将"`PermitRootLogin`"配置项设置为"`no`"的话，则不允许`root`账号远程登陆。

下面我们来修改配置文件`/etc/ssh/sshd_config`中"`PermitRootLogin`"配置项的值

- 修改配置文件`/etc/ssh/sshd_config`

```sh
[root@hellogitlab ~]# grep 'PermitRootLogin' /etc/ssh/sshd_config
#PermitRootLogin yes
# the setting of "PermitRootLogin without-password".
[root@hellogitlab ~]# sed -i 's/#PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config
[root@hellogitlab ~]# grep 'PermitRootLogin' /etc/ssh/sshd_config
PermitRootLogin no
# the setting of "PermitRootLogin without-password".
```

可以发现配置文件修改成功。

### 重启`SSH`服务并退出`root`账号远程连接

```sh
[root@hellogitlab ~]# systemctl restart sshd
[root@hellogitlab ~]# systemctl status sshd
● sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2019-10-31 22:04:51 CST; 5s ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 32055 (sshd)
   CGroup: /system.slice/sshd.service
           └─32055 /usr/sbin/sshd -D

Oct 31 22:04:51 hellogitlab.com systemd[1]: Stopped OpenSSH server daemon.
Oct 31 22:04:51 hellogitlab.com systemd[1]: Starting OpenSSH server daemon...
Oct 31 22:04:51 hellogitlab.com sshd[32055]: Server listening on 0.0.0.0 port 10000.
Oct 31 22:04:51 hellogitlab.com systemd[1]: Started OpenSSH server daemon.
[root@hellogitlab ~]# exit
logout
```


### 测试使用`root`账号远程连接

再次使用`root`账号远程连接时，提示`password authentication failed`

登陆`sudo`账号，并尝试切换到`root`账号里：

```sh
[meizhaohui@hellogitlab ~]$ ssh root@106.54.98.83
ssh: connect to host 106.54.98.83 port 22: Connection refused
[meizhaohui@hellogitlab ~]$ ssh root@106.54.98.83 -D 10000
ssh: connect to host 106.54.98.83 port 22: Connection refused
[meizhaohui@hellogitlab ~]$ ssh root@106.54.98.83 -p 10000
The authenticity of host '[106.54.98.83]:10000 ([106.54.98.83]:10000)' can't be established.
ECDSA key fingerprint is SHA256:Ow0AsLnlUQJg/SzRNgYG7x8HmYQPZ9ubGUpJoYRRuKk.
ECDSA key fingerprint is MD5:ec:9f:dc:43:1c:02:15:91:21:ee:a0:cb:77:bc:dd:dd.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[106.54.98.83]:10000' (ECDSA) to the list of known hosts.
root@106.54.98.83's password: 
Permission denied, please try again.
root@106.54.98.83's password: 
Permission denied, please try again.
root@106.54.98.83's password: 

[meizhaohui@hellogitlab ~]$ ^C
[meizhaohui@hellogitlab ~]$ su root
Password: 
[root@hellogitlab meizhaohui]# whoami
root
[root@hellogitlab meizhaohui]# exit
exit
[meizhaohui@hellogitlab ~]$ sudo ls /root
[sudo] password for meizhaohui: 
data
[meizhaohui@hellogitlab ~]$ 
```

- 可以看到`22`端口不能访问，并且不能使用`ssh root@106.54.98.83 -p 10000`方式连接到服务器。
- 可以看到可以能`su root`命令切换到`root`账号里，同时也可以使用`sudo ls /root`来执行一些需要使用`root`账号才能完成的事情。说明我们的配置正确。

## 安装`DenyHosts`防暴力破解软件

待补。

## 安装`ClamAV`反病毒软件

待补。


参考：
- [Centos7创建用户并授予sudo权限](https://blog.csdn.net/markximo/article/details/81737692)
- [常见网络端口及其服务](https://blog.csdn.net/qq_29277155/article/details/51685756)
- [SSH是什么？Linux如何修改SSH端口号?](https://www.cnblogs.com/chen-lhx/p/3974605.html)
- [ClamAV](https://wiki.ubuntu.org.cn/ClamAV)
