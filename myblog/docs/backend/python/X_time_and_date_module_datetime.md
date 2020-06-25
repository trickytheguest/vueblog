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



datetime 模块提供用于处理日期和时间的类。

在支持日期时间数学运算的同时，实现的关注点更着重于如何能够更有效地解析其属性用于格式化输出和数据操作。
