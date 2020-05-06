# 程序和进程

[[toc]]

当运行一个`程序`时，操作系统会创建一个`进程`。它会使用系统资源（如CPU、内存和磁盘空间）和操作系统内核中的数据结构（文件、网络连接、用量统计等）。进程之间是互相隔离的，即一个进程无法访问其他进程的内容，也无法操作其他进程。

操作系统会跟踪所有正在运行的进程，给每个进程一小段运行时间，然后切换到其他进程，这样既可以做到俊平又可以响应用户操作。

标准库`os`模块提供了一些常用的获取系统信息的函数。

## 获取正在运行的Python解释器的进程号、用户ID和用户组ID

```py
$ python3
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import os
# 获取进程ID
>>> os.getpid()
34294

# 获取组ID
>>> os.getgid()
20

# 获取用户ID
>>> os.getuid()
503
```

## 使用`subprocess`创建进程

`subprocess`允许你创建一个新的进程，连接到它们的`input`/`output`/`error`管道(即标准输入、标准输出、标准错误)，并获取它们的返回码。`subprocess`模块的目录是替换掉旧的模块和方法，如`os.system`和`os.spawn`。

在Python 3.5之后的版本中，官方推荐使用`subprocess.run()`函数来使用`subprocess`模块的功能。

我一般都使用Python 3.6的版本。

### subprocess.run函数运行指定的命令

`subprocess.run(args, *, stdin=None, input=None, stdout=None, stderr=None, shell=False, cwd=None, timeout=None, check=False, encoding=None, errors=None, env=None)`

参数说明：

- `args`，要执行的shell命令，默认是一个字符串序列，如`['df', '-h']`或者`('df', '-h')`，如果仅使用字符串，如`df -h`，则需要将`shell=True`开关打开。
- `shell`，如果`shell=True`，那么指定的命令将通过`shell`执行。如果我们需要访问某些`shell`的特性，如管道、文件名通配符、环境变量扩展功能，`~`将会指代用户家目录。当然，python本身也提供了许多类似shell的特性的实现，如`glob`、`fnmatch`、`os.walk()`、`os.path.expandvars()`、`os.expanduser()`和`shutil`等。
- `check`，是否进行异常检查，如果`check=true`，并且进程以非零退出代码退出，则将引发`CalledProcessError`异常。 该异常的属性包含参数、退出代码以及`stdout`和`stderr`（如果已捕获）。
- `cwd`， 设置子进程的当前工作目录，`cwd=None`表示继承自父进程的。
- `env`，设置子进程的环境变量，`env=None`表示继承自父进程的，指定`env`时，需要使用环境变量的映射关系，如使用字典定义环境变量。
- `timeout`，设置命令超时时间(单位：秒)， `timeout=None`默认不设置超时。如果命令执行时间超时，子进程将被杀死，并弹出`TimeoutExpired`异常。


### subprocess的使用

#### 指定`shell`参数，使用`shell`执行子进程命令

```py
[root@ea4bbe1c189d /]# python3
Python 3.6.7 (default, Dec  5 2018, 15:02:05)
[GCC 4.8.5 20150623 (Red Hat 4.8.5-36)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import subprocess
>>> subprocess.
subprocess.CalledProcessError(  subprocess.call(                subprocess.run(
subprocess.CompletedProcess(    subprocess.check_call(          subprocess.select
subprocess.DEVNULL              subprocess.check_output(        subprocess.selectors
subprocess.PIPE                 subprocess.errno                subprocess.signal
subprocess.Popen(               subprocess.getoutput(           subprocess.sys
subprocess.STDOUT               subprocess.getstatusoutput(     subprocess.threading
subprocess.SubprocessError(     subprocess.io                   subprocess.time
subprocess.TimeoutExpired(      subprocess.list2cmdline(        subprocess.warnings
subprocess.builtins             subprocess.os
>>> 

# 运行字符串列表序列命令
>>> subprocess.run(['df', '-h'])
Filesystem      Size  Used Avail Use% Mounted on
overlay          59G  2.8G   53G   5% /
tmpfs            64M     0   64M   0% /dev
tmpfs           995M     0  995M   0% /sys/fs/cgroup
shm              64M     0   64M   0% /dev/shm
/dev/sda1        59G  2.8G   53G   5% /etc/hosts
tmpfs           995M     0  995M   0% /proc/acpi
tmpfs           995M     0  995M   0% /sys/firmware
CompletedProcess(args=['df', '-h'], returncode=0)

# 运行字符串元组序列命令
>>> subprocess.run(('df', '-h'))
Filesystem      Size  Used Avail Use% Mounted on
overlay          59G  2.8G   53G   5% /
tmpfs            64M     0   64M   0% /dev
tmpfs           995M     0  995M   0% /sys/fs/cgroup
shm              64M     0   64M   0% /dev/shm
/dev/sda1        59G  2.8G   53G   5% /etc/hosts
tmpfs           995M     0  995M   0% /proc/acpi
tmpfs           995M     0  995M   0% /sys/firmware
CompletedProcess(args=('df', '-h'), returncode=0)

# 运行字符串命令
>>> subprocess.run('df -h', shell=True)
Filesystem      Size  Used Avail Use% Mounted on
overlay          59G  2.8G   53G   5% /
tmpfs            64M     0   64M   0% /dev
tmpfs           995M     0  995M   0% /sys/fs/cgroup
shm              64M     0   64M   0% /dev/shm
/dev/sda1        59G  2.8G   53G   5% /etc/hosts
tmpfs           995M     0  995M   0% /proc/acpi
tmpfs           995M     0  995M   0% /sys/firmware
CompletedProcess(args='df -h', returncode=0)

# 运行ping命令检查是否可以联网
>>> subprocess.run(['ping', '-c', '3', 'baidu.com'])
PING baidu.com (39.156.69.79) 56(84) bytes of data.
64 bytes from 39.156.69.79 (39.156.69.79): icmp_seq=1 ttl=37 time=40.3 ms
64 bytes from 39.156.69.79 (39.156.69.79): icmp_seq=2 ttl=37 time=26.8 ms
64 bytes from 39.156.69.79 (39.156.69.79): icmp_seq=3 ttl=37 time=27.9 ms

--- baidu.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2008ms
rtt min/avg/max/mdev = 26.839/31.708/40.316/6.107 ms
CompletedProcess(args=['ping', '-c', '3', 'baidu.com'], returncode=0)
```

#### `cwd`指定子进程的工作目录

```py
>>> import subprocess

# 继承父进程，查看当前工作目录
>>> subprocess.run('pwd', shell=True)
/
CompletedProcess(args='pwd', returncode=0)

# 不继承父进程，设置当前工作目录为/etc
>>> subprocess.run('pwd', shell=True, cwd='/etc')
/etc
CompletedProcess(args='pwd', returncode=0)

# 继承父进程，查看当前工作目录下在文件列表
>>> subprocess.run('ls|head', shell=True)
anaconda-post.log
bin
boot
dev
etc
home
lib
lib64
media
mnt
CompletedProcess(args='ls|head', returncode=0)

# 不继承父进程，查看当前工作目录下在文件列表
>>> subprocess.run('ls|head', shell=True, cwd='/etc')
adjtime
adjtime.rpmsave
aliases
alternatives
bash_completion.d
bashrc
binfmt.d
BUILDTIME
centos-release
centos-release-upstream
CompletedProcess(args='ls|head', returncode=0)

>>>
```

#### `env`设置子进程的环境变量

```py
# 继承父进程，查看当前的环境变量
>>> subprocess.run('env', shell=True)
HOSTNAME=ea4bbe1c189d
TERM=xterm
PIPENV_VENV_IN_PROJECT=1
LC_ALL=en_US.utf8
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
_=/usr/bin/env
PWD=/
LANG=en_US.utf8
PIPENV_PYPI_MIRROR=https://mirrors.aliyun.com/pypi/simple
HOME=/root
SHLVL=2
LESSOPEN=||/usr/bin/lesspipe.sh %s
CompletedProcess(args='env', returncode=0)

# 不继承父进程，设置两个环境变量`HOSTNAME`和`LANG`，查看当前的环境变量
>>> subprocess.run('env', shell=True, env={'HOSTNAME': 'hellogitlab.com', 'LANG': 'zh_CN.utf8'})
HOSTNAME=hellogitlab.com
PWD=/
LANG=zh_CN.utf8
SHLVL=1
_=/usr/bin/env
CompletedProcess(args='env', returncode=0)

# 不继承父进程，设置两个环境变量`HOSTNAME`和`LANG`，并使用环境变量
>>> subprocess.run('echo "${HOSTNAME}"', shell=True, env={'HOSTNAME': 'hellogitlab.com', 'LANG': 'zh_CN.utf8'})
hellogitlab.com
CompletedProcess(args='echo "${HOSTNAME}"', returncode=0)
```

#### `timeout`设置命令超时时间

```py
# 不设置命令超时时间，正常执行
>>> subprocess.run('ping -c 3 jd.com', shell=True)
PING jd.com (118.193.98.63) 56(84) bytes of data.
64 bytes from 118.193.98.63 (118.193.98.63): icmp_seq=1 ttl=37 time=32.4 ms
64 bytes from 118.193.98.63 (118.193.98.63): icmp_seq=2 ttl=37 time=60.1 ms
64 bytes from 118.193.98.63 (118.193.98.63): icmp_seq=3 ttl=37 time=30.3 ms

--- jd.com ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 4100ms
rtt min/avg/max/mdev = 30.337/40.969/60.146/13.587 ms
CompletedProcess(args='ping -c 3 jd.com', returncode=0)

# `timeout`设置命令超时时间这1秒，出现`TimeoutExpired `异常
>>> subprocess.run('ping -c 3 jd.com', shell=True, timeout=1)
PING jd.com (118.193.98.63) 56(84) bytes of data.
64 bytes from 118.193.98.63 (118.193.98.63): icmp_seq=1 ttl=37 time=31.3 ms
---------------------------------------------------------------------------
TimeoutExpired                            Traceback (most recent call last)
/usr/lib64/python3.6/subprocess.py in run(input, timeout, check, *popenargs, **kwargs)
    404         try:
--> 405             stdout, stderr = process.communicate(input, timeout=timeout)
    406         except TimeoutExpired:

/usr/lib64/python3.6/subprocess.py in communicate(self, input, timeout)
    842             try:
--> 843                 stdout, stderr = self._communicate(input, endtime, timeout)
    844             finally:

/usr/lib64/python3.6/subprocess.py in _communicate(self, input, endtime, orig_timeout)
   1539
-> 1540             self.wait(timeout=self._remaining_time(endtime))
   1541

/usr/lib64/python3.6/subprocess.py in wait(self, timeout, endtime)
   1448                     if remaining <= 0:
-> 1449                         raise TimeoutExpired(self.args, timeout)
   1450                     delay = min(delay * 2, remaining, .05)

TimeoutExpired: Command 'ping -c 3 jd.com' timed out after 0.9998177000088617 seconds

During handling of the above exception, another exception occurred:

TimeoutExpired                            Traceback (most recent call last)
<ipython-input-18-b51a07dc1e78> in <module>
----> 1 subprocess.run('ping -c 3 jd.com', shell=True, timeout=1)

/usr/lib64/python3.6/subprocess.py in run(input, timeout, check, *popenargs, **kwargs)
    408             stdout, stderr = process.communicate()
    409             raise TimeoutExpired(process.args, timeout, output=stdout,
--> 410                                  stderr=stderr)
    411         except:
    412             process.kill()

TimeoutExpired: Command 'ping -c 3 jd.com' timed out after 1 seconds

>>>
```
