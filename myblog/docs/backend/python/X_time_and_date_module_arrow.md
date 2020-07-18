# 日期和时间模块-`arrow`日期时间模块

[[toc]]

## 简介

官方介绍如下：

> **Arrow** is a Python library that offers a sensible and human-friendly approach to creating, manipulating, formatting and  converting dates, times and timestamps. It implements and updates the  datetime type, plugging gaps in functionality and providing an  intelligent module API that supports many common creation scenarios.  Simply put, it helps you work with dates and times with fewer imports  and a lot less code.
>
> Arrow is named after the [arrow of time](https://en.wikipedia.org/wiki/Arrow_of_time) and is heavily inspired by [moment.js](https://github.com/moment/moment) and [requests](https://github.com/psf/requests).

即：Arrow是一个Python库，它提供了一种明智且人性化的方法来创建、处理、格式化和转换日期、时间和时间戳。 它实现并更新了日期时间类型，填补了功能上的空白，并提供了支持许多常见创建方案的智能模块API。 简而言之，它可以帮助您以更少的导入和更少的代码来处理日期和时间。

Arrow以(Arrow of time)时间之箭命名，灵感来自moment.js和requests模块。

## 为什么在内置模块上使用Arrow？

Python的标准库和其他一些底层模块具有几乎完整的日期，时间和时区功能，但是从可用性的角度来看，效果并不理想：

 太多模块：`datetime`，`time`，`calendar`，`dateutil`，`pytz`等。

 类型太多：`date`，`time`，`datetime`，`tzinfo`，`timedelta`，`relativedelta`等。

 时区和时间戳转换是冗长不方便的。

 时区朴素(即无时区信息)是常态。

 功能上的差距：ISO 8601解析，时间跨度，人性化等。

## 安装

```sh
$ pip install arrow
Looking in indexes: http://mirrors.aliyun.com/pypi/simple/
Collecting arrow
  Downloading http://mirrors.aliyun.com/pypi/packages/99/b5/1f1c5ef3156f7b514c58613fe56e5670dc56374ab744bd1eb653c95e16b5/arrow-0.15.6-py2.py3-none-any.whl (47 kB)
     |████████████████████████████████| 47 kB 2.1 MB/s
Requirement already satisfied: python-dateutil in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from arrow) (2.8.1)
Requirement already satisfied: six>=1.5 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from python-dateutil->arrow) (1.14.0)
Installing collected packages: arrow
Successfully installed arrow-0.15.6
```

查看`arrow`模块有哪些函数或方法：

```py
$ python3
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import arrow
>>> arrow.
arrow.api           arrow.ArrowFactory( arrow.formatter     arrow.now(          arrow.utcnow(
arrow.arrow         arrow.constants     arrow.get(          arrow.parser        arrow.util
arrow.Arrow(        arrow.factory       arrow.locales       arrow.ParserError(
>>> exit()
```

## 时区图

![时区图](/img/timezone.gif)

注：图中的GMT是指格林威治标准时间，也就是UTC标准时间，可参考[格林威治标准时间](http://www.shijian.cc/shiqu/184/) 。

## 创建

### 通过now或utcnow创建时间对象

创建现在时间更加简单！

```python
$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> import arrow

>>> arrow.now?
Signature: arrow.now(tz=None)
Docstring:
Returns an :class:`Arrow <arrow.arrow.Arrow>` object, representing "now" in the given
timezone.

:param tz: (optional) A :ref:`timezone expression <tz-expr>`.  Defaults to local time.

Usage::

    >>> import arrow
    >>> arrow.now()
    <Arrow [2013-05-07T22:19:11.363410-07:00]>

    >>> arrow.now('US/Pacific')
    <Arrow [2013-05-07T22:19:15.251821-07:00]>

    >>> arrow.now('+02:00')
    <Arrow [2013-05-08T07:19:25.618646+02:00]>

    >>> arrow.now('local')
    <Arrow [2013-05-07T22:19:39.130059-07:00]>
File:      /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/arrow/api.py
Type:      function

>>>

# UTC标准时间
>>> arrow.utcnow()
<Arrow [2020-07-17T14:18:37.599051+00:00]>

# 自动判断本地时区，当前为北京时间
>>> arrow.now()
<Arrow [2020-07-17T22:18:42.111606+08:00]>

# 美国东部时间，加上时区参数字符串表示对应时区的当前时间
>>> arrow.now('US/Eastern')
<Arrow [2020-07-17T10:20:13.932694-04:00]>

>>>
# 西四区的时间
>>> arrow.now('-04:00')
<Arrow [2020-07-17T10:26:59.082865-04:00]>

# 中时区的时间，即UTC标准时间
>>> arrow.now('00:00')
<Arrow [2020-07-17T14:27:05.627601+00:00]>

# 东八区的时间
>>> arrow.now('08:00')
<Arrow [2020-07-17T22:27:09.674684+08:00]>

# 东八区的时间
>>> arrow.now('+08:00')
<Arrow [2020-07-17T22:27:14.788227+08:00]>
```

### 通过时间戳创建时间对象

通过时间戳创建时间对象时，时间戳支持`int`和`float`类型。

```python
# 获取当前标准时间
>>> now = arrow.utcnow()

>>> now
<Arrow [2020-07-17T14:45:11.070688+00:00]>

# 将标准时间转换成时间戳
>>> now.timestamp
1594997111

# 获取arrow.get的帮助信息，可以看到帮助信息非常多，最后按q退出帮助信息查看界面
>>> arrow.get?
Signature: arrow.get(*args, **kwargs)
Docstring:
Returns an :class:`Arrow <arrow.arrow.Arrow>` object based on flexible inputs.

:param locale: (optional) a ``str`` specifying a locale for the parser. Defaults to
    'en_us'.
:param tzinfo: (optional) a :ref:`timezone expression <tz-expr>` or tzinfo object.
    Replaces the timezone unless using an input form that is explicitly UTC or specifies
    the timezone in a positional argument. Defaults to UTC.

Usage::

    >>> import arrow

**No inputs** to get current UTC time::

    >>> arrow.get()
    <Arrow [2013-05-08T05:51:43.316458+00:00]>

**None** to also get current UTC time::

    >>> arrow.get(None)
    <Arrow [2013-05-08T05:51:49.016458+00:00]>

**One** :class:`Arrow <arrow.arrow.Arrow>` object, to get a copy.

    >>> arw = arrow.utcnow()
    >>> arrow.get(arw)
    <Arrow [2013-10-23T15:21:54.354846+00:00]>

**One** ``float`` or ``int``, convertible to a floating-point timestamp, to get
that timestamp in UTC::

    >>> arrow.get(1367992474.293378)
    <Arrow [2013-05-08T05:54:34.293378+00:00]>

    >>> arrow.get(1367992474)
    <Arrow [2013-05-08T05:54:34+00:00]>

**One** ISO 8601-formatted ``str``, to parse it::

    >>> arrow.get('2013-09-29T01:26:43.830580')
    <Arrow [2013-09-29T01:26:43.830580+00:00]>

**One** ISO 8601-formatted ``str``, in basic format, to parse it::

    >>> arrow.get('20160413T133656.456289')
    <Arrow [2016-04-13T13:36:56.456289+00:00]>

**One** ``tzinfo``, to get the current time **converted** to that timezone::

    >>> arrow.get(tz.tzlocal())
    <Arrow [2013-05-07T22:57:28.484717-07:00]>

**One** naive ``datetime``, to get that datetime in UTC::

    >>> arrow.get(datetime(2013, 5, 5))
    <Arrow [2013-05-05T00:00:00+00:00]>

**One** aware ``datetime``, to get that datetime::

    >>> arrow.get(datetime(2013, 5, 5, tzinfo=tz.tzlocal()))
    <Arrow [2013-05-05T00:00:00-07:00]>

**One** naive ``date``, to get that date in UTC::

    >>> arrow.get(date(2013, 5, 5))
    <Arrow [2013-05-05T00:00:00+00:00]>

**One** time.struct time::

    >>> arrow.get(gmtime(0))
    <Arrow [1970-01-01T00:00:00+00:00]>

**One** iso calendar ``tuple``, to get that week date in UTC::

    >>> arrow.get((2013, 18, 7))
    <Arrow [2013-05-05T00:00:00+00:00]>

**Two** arguments, a naive or aware ``datetime``, and a replacement
:ref:`timezone expression <tz-expr>`::

    >>> arrow.get(datetime(2013, 5, 5), 'US/Pacific')
    <Arrow [2013-05-05T00:00:00-07:00]>

**Two** arguments, a naive ``date``, and a replacement
:ref:`timezone expression <tz-expr>`::

    >>> arrow.get(date(2013, 5, 5), 'US/Pacific')
    <Arrow [2013-05-05T00:00:00-07:00]>

**Two** arguments, both ``str``, to parse the first according to the format of the second::

    >>> arrow.get('2013-05-05 12:30:45 America/Chicago', 'YYYY-MM-DD HH:mm:ss ZZZ')
    <Arrow [2013-05-05T12:30:45-05:00]>

**Two** arguments, first a ``str`` to parse and second a ``list`` of formats to try::

    >>> arrow.get('2013-05-05 12:30:45', ['MM/DD/YYYY', 'YYYY-MM-DD HH:mm:ss'])
    <Arrow [2013-05-05T12:30:45+00:00]>

**Three or more** arguments, as for the constructor of a ``datetime``::

    >>> arrow.get(2013, 5, 5, 12, 30, 45)
    <Arrow [2013-05-05T12:30:45+00:00]>
File:      /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/arrow/api.py
Type:      function
(END)
    
# 通过时间戳获取时间对象    
>>> arrow.get(1594997111)
<Arrow [2020-07-17T14:45:11+00:00]>

>>> arrow.get(1594997112)
<Arrow [2020-07-17T14:45:12+00:00]>

>>> arrow.get(1594997113)
<Arrow [2020-07-17T14:45:13+00:00]>

>>> arrow.get(1594997113.4343)
<Arrow [2020-07-17T14:45:13.434300+00:00]>
```

### 通过无时区/有时区信息的datetime或者指定时区

```python
$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> import arrow

>>> from datetime import datetime

>>> from dateutil import tz

>>> arrow.get(datetime.utcnow())
<Arrow [2020-07-18T12:21:17.701713+00:00]>

>>> arrow.get(datetime(2020, 7, 18), 'US/Eastern')
<Arrow [2020-07-18T00:00:00-04:00]>

>>> arrow.get(datetime(2020, 7, 18), tz.gettz('US/Eastern'))
<Arrow [2020-07-18T00:00:00-04:00]>

>>> arrow.get(datetime.now(tz.gettz('US/Eastern')))
<Arrow [2020-07-18T08:23:01.146618-04:00]>

>>>
```

### 通过解析时间字符串

```python
>>> arrow.get('2020-07-18 20:24:45', 'YYYY-MM-DD HH:mm:ss')
<Arrow [2020-07-18T20:24:45+00:00]>
```

### 在字符串中搜索时间对象

```python
>>> arrow.get('June was born in May 1980', 'MMMM YYYY')
<Arrow [1980-05-01T00:00:00+00:00]>
```

### 在不使用格式字符串的情况下，可以识别和解析一些符合ISO 8601的字符串

```python
>>> arrow.get('2013-09-30T15:34:00.000-07:00')
<Arrow [2013-09-30T15:34:00-07:00]>

>>> arrow.get('2020-07-19T20:28:00.000-08:00')
<Arrow [2020-07-19T20:28:00-08:00]>
```

### 直接实例化

Arrow对象也可以直接实例化，只需要传入类似`datetime`对象一样的参数即可。

```python
>>> arrow.get(2020,7,18,20,29,30)
<Arrow [2020-07-18T20:29:30+00:00]>

>>> arrow.get(2020,7,18)
<Arrow [2020-07-18T00:00:00+00:00]>

>>> arrow.Arrow(2020,7,18)
<Arrow [2020-07-18T00:00:00+00:00]>

>>> arrow.Arrow(2020,7,18,20,29,30)
<Arrow [2020-07-18T20:29:30+00:00]>
```

## 获取属性

### `datetime`对象

获取`datetime`属性：

```python
# 获取当前UTC标准时间
>>> a = arrow.utcnow()

>>> a
<Arrow [2020-07-18T13:19:35.632796+00:00]>

获取datetime属性，返回datetime对象
>>> a.datetime
datetime.datetime(2020, 7, 18, 13, 19, 35, 632796, tzinfo=tzutc())
```

### `timestamp`时间戳

获取`timestamp`时间戳：

```python
>>> a.timestamp
1595078375
```

### 无时区`datetime`对象和`tzinfo`

可以通过`naive`属性获取无时区`datetime`对象，`tzinfo`属性获取tzinfo信息。

```python
# 无时区`datetime`对象
>>> a.naive
datetime.datetime(2020, 7, 18, 13, 19, 35, 632796)

# 时区信息
>>> a.tzinfo
tzutc()
```

### datetime年月月等信息

```python
# 年
>>> a.year
2020

# 月
>>> a.month
7

# 日
>>> a.day
18

# 小时
>>> a.hour
13

# 分钟
>>> a.minute
19

# 秒
>>> a.second
35

# 微秒
>>> a.microsecond
632796
```

### 调用datetime的功能返回属性值

```python
# 获取日期信息
>>> a.date()
datetime.date(2020, 7, 18)

# 获取时间信息
>>> a.time()
datetime.time(13, 19, 35, 632796)
```

## Replace替换或Shift移位

你可以像datetime一样，对arrow对象进行替换和修改。注意，替换或移位时不会对原来的对象进行修改，只会生成一个新的对象。

```python
# 查年Arrow对象
>>> a
<Arrow [2020-07-18T13:19:35.632796+00:00]>

# 查看replace方法的帮助信息
>>> a.replace?
Signature: a.replace(**kwargs)
Docstring:
Returns a new :class:`Arrow <arrow.arrow.Arrow>` object with attributes updated
according to inputs.

Use property names to set their value absolutely::

    >>> import arrow
    >>> arw = arrow.utcnow()
    >>> arw
    <Arrow [2013-05-11T22:27:34.787885+00:00]>
    >>> arw.replace(year=2014, month=6)
    <Arrow [2014-06-11T22:27:34.787885+00:00]>

You can also replace the timezone without conversion, using a
:ref:`timezone expression <tz-expr>`::

    >>> arw.replace(tzinfo=tz.tzlocal())
    <Arrow [2013-05-11T22:27:34.787885-07:00]>
File:      /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/arrow/arrow.py
Type:      method

# 进行替换，生成一个新的Arrow对象
# 对年月日小时分钟秒和微秒都可以进行替换
>>> a.replace(year=2021,month=8,day=9,hour=19,minute=25,second=15,microsecond=1234)
<Arrow [2021-08-09T19:25:15.001234+00:00]>

# 查看原来的Arrow对象，并没有更新
>>> a
<Arrow [2020-07-18T13:19:35.632796+00:00]>

# 也可以对时区进行替换，可以直接以时区数字表示，也可以用英文方式表示
# 替换成西四区
>>> a.replace(tzinfo='-04:00')
<Arrow [2020-07-18T13:19:35.632796-04:00]>

# 替换成东八区
>>> a.replace(tzinfo='+08:00')
<Arrow [2020-07-18T13:19:35.632796+08:00]>

# 也可以直接使用timezone信息代替
>>> a.replace(tzinfo='US/Eastern')
<Arrow [2020-07-18T13:19:35.632796-04:00]>

>>> a.replace(tzinfo='US/eastErn')
<Arrow [2020-07-18T13:19:35.632796-04:00]>

>>> a.replace(tzinfo='us/eastErn')
<Arrow [2020-07-18T13:19:35.632796-04:00]>

>>> a.replace(tzinfo='Asia/Shanghai')
<Arrow [2020-07-18T13:19:35.632796+08:00]>
```

或者直接使用`shift`来向前或向后改变属性：

```python
>>> a.shift?
Signature: a.shift(**kwargs)
Docstring:
Returns a new :class:`Arrow <arrow.arrow.Arrow>` object with attributes updated
according to inputs.

Use pluralized property names to relatively shift their current value:

>>> import arrow
>>> arw = arrow.utcnow()
>>> arw
<Arrow [2013-05-11T22:27:34.787885+00:00]>
>>> arw.shift(years=1, months=-1)
<Arrow [2014-04-11T22:27:34.787885+00:00]>

Day-of-the-week relative shifting can use either Python's weekday numbers
(Monday = 0, Tuesday = 1 .. Sunday = 6) or using dateutil.relativedelta's
day instances (MO, TU .. SU).  When using weekday numbers, the returned
date will always be greater than or equal to the starting date.

Using the above code (which is a Saturday) and asking it to shift to Saturday:

>>> arw.shift(weekday=5)
<Arrow [2013-05-11T22:27:34.787885+00:00]>

While asking for a Monday:

>>> arw.shift(weekday=0)
<Arrow [2013-05-13T22:27:34.787885+00:00]>
File:      /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/arrow/arrow.py
Type:      method

>>> a
<Arrow [2020-07-18T13:19:35.632796+00:00]>


# 差一个月一年后的日期
>>> a.shift(years=+1, months=-1)
<Arrow [2021-06-18T13:19:35.632796+00:00]>

# 一年又一个月后的日期
>>> a.shift(years=+1, months=+1)
<Arrow [2021-08-18T13:19:35.632796+00:00]>

# 一年前一个月后的日期
>>> a.shift(years=-1, months=+1)
<Arrow [2019-08-18T13:19:35.632796+00:00]>

# 两天后的日期
>>> a.shift(days=+2)
<Arrow [2020-07-20T13:19:35.632796+00:00]>

# 两天前的日期
>>> a.shift(days=-2)
<Arrow [2020-07-16T13:19:35.632796+00:00]>

# 周一的日期
>>> a.shift(weekday=0)
<Arrow [2020-07-20T13:19:35.632796+00:00]>

# 周二的日期
>>> a.shift(weekday=1)
<Arrow [2020-07-21T13:19:35.632796+00:00]>

# 周三的日期
>>> a.shift(weekday=2)
<Arrow [2020-07-22T13:19:35.632796+00:00]>

# 周四的日期
>>> a.shift(weekday=3)
<Arrow [2020-07-23T13:19:35.632796+00:00]>

# 周五的日期
>>> a.shift(weekday=4)
<Arrow [2020-07-24T13:19:35.632796+00:00]>

# 周六的日期，就是今天！！！
>>> a.shift(weekday=5)
<Arrow [2020-07-18T13:19:35.632796+00:00]>

# 周日的日期，明天！
>>> a.shift(weekday=6)
<Arrow [2020-07-19T13:19:35.632796+00:00]>
```



参考：

- [https://pypi.org/project/arrow/](https://pypi.org/project/arrow/)
- [https://github.com/crsmithdev/arrow/](https://github.com/crsmithdev/arrow/)
- [https://arrow.readthedocs.io/en/latest/](https://arrow.readthedocs.io/en/latest/)




