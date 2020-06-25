# 日期和时间模块-`datetime`日期时间模块


[[toc]]

## `datetime`模块

查看`datetime`模块有哪些函数或方法：

```py
$ python
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import datetime
>>> datetime.
datetime.date(         datetime.datetime_CAPI datetime.MINYEAR       datetime.time(         datetime.timezone(
datetime.datetime(     datetime.MAXYEAR       datetime.sys           datetime.timedelta(    datetime.tzinfo(
>>> exit()
```

似乎看起来`datetime`模块没有多少函数或方法，我们一个个的了解一下。

参考：

- [https://docs.python.org/3/library/datetime.html](https://docs.python.org/3/library/datetime.html)
- [https://docs.python.org/zh-cn/3/library/datetime.html](https://docs.python.org/zh-cn/3/library/datetime.html)



`datetime`模块提供用于处理日期和时间的类。

在支持日期时间数学运算的同时，实现的关注点更着重于如何能够更有效地解析其属性用于格式化输出和数据操作。

### 常量

`date`和`datetime`对象允许的最小、最大年份，最小年份为1，最大年份为9999。
```py
>>> datetime.MINYEAR
1
>>> datetime.MAXYEAR
9999
```

### 有效的类型

- `class datetime.date`理想化的日期类。
- `class datetime.time`理想化的时间类。
- `class datetime.datetime`理想化日期和时间的结合。
- `class datetime.timedelta`时间间隔。
-  `class datetime.tzinfo`抽象类，给date或time类提供自定义的时间调整概念。
- `class datetime.timezone`时区设置，是tzinfo类的子类。


### 通用的特征属性

`date`, `datetime`, `time`和`timezone`类型共享这些通用特性:

- 这些类型的对象都是不可变的。
- 这些类型的对象是可哈希的，这意味着它们可被作为字典的键。
- 这些类型的对象支持通过 pickle 模块进行高效的封存。

### `datetime.date`日期类

初步使用date类：

```py
$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> import datetime

>>> datetime.date?
Init signature: datetime.date(self, /, *args, **kwargs)
Docstring:      date(year, month, day) --> date object
File:           /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/datetime.py
Type:           type
Subclasses:     datetime

>>> datetime.date()
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-3-76bd6ecec42c> in <module>
----> 1 datetime.date()

TypeError: Required argument 'year' (pos 1) not found
```

可以看到`datetime.date`类实例化时需要提供year, month, day三个参数。

我们来实现化一个`datetime.date`类对象。



```py
>>> datetime.date(2020, 6, 25)
datetime.date(2020, 6, 25)

>>> ndate = datetime.date(2020, 6, 25)

>>> ndate
datetime.date(2020, 6, 25)
```

