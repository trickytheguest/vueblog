# Python面试总结

[[toc]]

## Python语言基础

### 1.列出几个常用Python标准库

`os`, `sys`, `string`, `logging`, `time`, `datetime`, `re`, `math`,`threading`

### 2.Python的内建数据类型有哪些

`str`字符串, `list`列表, `tuple`元素, `dict`字典, `set`集合, `int`整型, `float`浮点, `complex`复数(如:`1 + 2j`), `bool`布尔型。

### 3.简述`with`方法打开处理文件帮我我们做了什么

- `with`语句适用于对资源进行访问的场合，确保不管使用过程中是否发生异常都会执行必要的"清理"操作，释放资源，比如文件使用后自动关闭、线程中锁的自动获取和释放等。

- `with`语句即"上下文管理器"，在程序中用来表示代码执行过程中所处的前后环境。

上下文管理器：含有`__enter__`和`__exit__`方法的对象就是上下文管理器。

- `__enter__()`：在执行语句之前，首先执行该方法，通常返回一个实例对象，如果`with`语句有`as`目标，则将对象赋值给`as`目标。
- `__exit__()`：执行语句结束后，自动调用`__exit__()`方法，用户释放资源，若此方法返回布尔值`True`，程序会忽略异常。

使用环境：文件读写、线程锁的自动释放等。

### 4.Python的可变和不可变数据类型

- 可变: `list`列表, `dict`字典, `set`集合
- 不可变：`int`整型, `str`字符串, `tuple`元组


### 5.Python获取当前日期

- 使用`datetime`模块

```py
>>> from datetime import datetime
>>> datetime.now()
datetime.datetime(2020, 5, 16, 8, 26, 59, 83146)
>>> datetime.now().strftime('%Y%m%d_%H%M%S')
'20200516_082739'
```

- 使用`time`模块

```py
>>> import time
>>> time.strftime('%Y%m%d_%H%M%S', time.localtime())
'20200516_083042'
```

### 6.谈谈对Python的了解和其他语言的区别

- python是典型的动态类型强类型语言，强类型语言, 不需要隐式转换。

- 解释性，解释型语言使用解释器将源码逐行解释成机器码并立即执行，不会进行整体性的编译和链接处理，相当于把编译语言中的编译和解释混合到一起同时完成。

- 简洁优雅，面向对象，跨平台。
- Python是动态类型语言，而Java是静态类型语言。

### 7.说说你知道的Python3和Python2之间的区别

- 输出：`print`在python2中是一个输出语句，print后面可以带括号也可以不带；在python3中是一个函数，需要带括号。
- 用户输入：`input`在python2中，用户需要明确自己输入的字符类型，是字符串还是数字或者是布尔型，`raw_input`在python2中用户输入都被当前字符串；在python3中将原来的`input`删除了，然后将`raw_input`改成`input`函数,输出都是字符串类型。
print, string/unicode, exception, divide, xrange,