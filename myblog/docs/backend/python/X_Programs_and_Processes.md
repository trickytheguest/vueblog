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

