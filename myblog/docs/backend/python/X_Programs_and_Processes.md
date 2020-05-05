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

