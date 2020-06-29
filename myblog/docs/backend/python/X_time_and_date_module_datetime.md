# 日期和时间模块-`datetime`日期时间模块


[[toc]]



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

## 常量

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


## 通用的特征属性

`date`, `datetime`, `time`和`timezone`类型共享这些通用特性:

- 这些类型的对象都是不可变的。
- 这些类型的对象是可哈希的，这意味着它们可被作为字典的键。
- 这些类型的对象支持通过 pickle 模块进行高效的封存。

## `datetime.date`日期类

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

参数说明如下：

- 所有参数都是必须的。
- 参数都需要为integer整数。

- `MINYEAR <= year <= MAXYEAR`
- `1 <= month <= 12`
- `1 <= day <= number of days in the given month and year`

我们来实现化一个`datetime.date`类对象。

正常实例化：

```python
>>> datetime.date(2020, 6, 25)
datetime.date(2020, 6, 25)

>>> ndate = datetime.date(2020, 6, 25)

>>> ndate
datetime.date(2020, 6, 25)
```

检查异常：



### 整型检查

```python
>>> datetime.date(2020.3, 6, 25)
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-12-378e9f0dc353> in <module>
----> 1 datetime.date(2020.3, 6, 25)

TypeError: integer argument expected, got float

>>> datetime.date(2020, 6.3, 25)
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-13-7f03f9cdb50c> in <module>
----> 1 datetime.date(2020, 6.3, 25)

TypeError: integer argument expected, got float

>>> datetime.date(2020, 6, 25.3)
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-15-b1a4edea2412> in <module>
----> 1 datetime.date(2020, 6, 25.3)

TypeError: integer argument expected, got float
```

可以发现输入小数后实例化会报`TypeError`异常。



### 值异常检查

```python
>>> datetime.date(9999, 6, 25)
datetime.date(9999, 6, 25)

>>> datetime.date(10000, 6, 25)
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-18-254ebe0a2d38> in <module>
----> 1 datetime.date(10000, 6, 25)

ValueError: year 10000 is out of range

>>> datetime.date(0, 6, 25)
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-19-5753139fb256> in <module>
----> 1 datetime.date(0, 6, 25)

ValueError: year 0 is out of range

>>> datetime.date(-0, 6, 25)
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-20-1c1ea584a919> in <module>
----> 1 datetime.date(-0, 6, 25)

ValueError: year 0 is out of range

>>> datetime.date(-2020, 6, 25)
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
<ipython-input-21-5def12532dda> in <module>
----> 1 datetime.date(-2020, 6, 25)

ValueError: year -2020 is out of range
```

可以发现输入年份不在[0, 9999]区间时，实例化会报`ValueError`异常。

查看源码可知实例化时会使用`year, month, day = _check_date_fields(year, month, day)`对年月日参数进行有效性检查。

### `datetime.date`类的方法和属性

查看`datetime.date`类的方法和属性：

```python
>>> ndate.
           ctime()         fromtimestamp() isoweekday()    month           strftime()      toordinal()
           day             isocalendar()   max             replace()       timetuple()     weekday()
           fromordinal()   isoformat()     min             resolution      today()         year
```

- 查看实例的年月日属性

```python
>>> ndate
datetime.date(2020, 6, 25)

# 年份
>>> ndate.year
2020

# 月份
>>> ndate.month
6

# 日期
>>> ndate.day
25
```

- 查看类属性

```python
# 最小的日期
>>> ndate.min
datetime.date(1, 1, 1)

# 最大的日期
>>> ndate.max
datetime.date(9999, 12, 31)

# 两个日期对象的最小间隔
>>> ndate.resolution
datetime.timedelta(1)
```

- 查看类方法

```python
# 返回当前的本地日期，相当于datetime.date.fromtimestamp(time.time())
>>> datetime.date.today()
datetime.date(2020, 6, 25)

>>> import time

# 返回时间戳对应的date对象
>>> datetime.date.fromtimestamp(time.time())
datetime.date(2020, 6, 25)
```

- 实例的方法

`date.replace(year=self.year, month=self.month, day=self.day)`返回一个具有同样值的日期，除非通过任何关键字参数给出了某些形参的新值。

```python
>>> ndate
datetime.date(2020, 6, 25)

>>> ndate.replace(day=26)
datetime.date(2020, 6, 26)

>>> ndate
datetime.date(2020, 6, 25)

>>> ndate.replace(year=2021, month=5, day=1)
datetime.date(2021, 5, 1)

>>> ndate
datetime.date(2020, 6, 25)
```

可以看到使用`replace`方法替换时，只是返回一个新的`date`类对象，不会改变原来的实例。



`date.timetuple()` 返回一个 time.struct_time时间元组。



```python
>>> ndate.timetuple()
time.struct_time(tm_year=2020, tm_mon=6, tm_mday=25, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=177, tm_isdst=-1)
```



`date.weekday()`返回当前日期是星期几，0代表周一，6代表周日。

```python
# 2020年6月25日是周四
>>> ndate.weekday()
3
```

`date.isoweekday()`返回当前日期是星期几，1代表周一，7代表周日。

```python
# 2020年6月25日是周四
>>> ndate.isoweekday()
4
```

`date.isocalendar()`返回当前日期对应的日历元组` (ISO year, ISO week number, ISO weekday)`。

```python
# 2020年6月25日的年份是2020年，是该年的第26周，周四
>>> ndate.isocalendar()
(2020, 26, 4)
```

`date.isoformat()`返回一个以 ISO 8601 格式`YYYY-MM-DD`来表示日期的字符串。与`date.__str__()`等价。

```python
>>> ndate.isoformat()
'2020-06-25'

>>> ndate.__str__()
'2020-06-25'
```

可以看到此时日期字符串是四位数字的年份-两位数字的月份-两位数字的日期。

`date.ctime()`返回一个表示日期的字符串。

```python
>>> ndate.ctime()
'Thu Jun 25 00:00:00 2020'
```

`date.strftime(format)`返回一个由显式格式字符串所指明的代表日期的字符串。与`date.__format__(format)`等价。

```python
>>> ndate.strftime('%Y%m%d')
'20200625'

>>> ndate.strftime('%Y-%m-%d')
'2020-06-25'

>>> ndate.strftime('%Y年%m月%d日')
'2020年06月25日'

>>> ndate.strftime('%Y %b %d')
'2020 Jun 25'

>>> ndate.__format__('%Y %b %d')
'2020 Jun 25'

>>> ndate.__format__('%Y-%m-%d')
'2020-06-25'

>>> ndate.__format__('%Y年%m月%d日')
'2020年06月25日'
```

## `datetime.time`时间类

`class datetime.time(hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)`时间对象，所有参数可选。



参数取值说明：

  - `0 <= hour < 24`,
  - `0 <= minute < 60`,
  - `0 <= second < 60`,
  - `0 <= microsecond < 1000000`,
  - `fold in [0, 1]`.

查看帮助信息并实例化对象：

```python
>>> datetime.time?
Init signature: datetime.time(self, /, *args, **kwargs)
Docstring:
time([hour[, minute[, second[, microsecond[, tzinfo]]]]]) --> a time object

All arguments are optional. tzinfo may be None, or an instance of
a tzinfo subclass. The remaining arguments may be ints.
File:           /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/datetime.py
Type:           type
Subclasses:

>>> ntime = datetime.time(6,48,5)

>>> ntime
datetime.time(6, 48, 5)

>>> ntime.
ntime.dst(        ntime.isoformat(  ntime.min         ntime.resolution  ntime.tzinfo
ntime.fold        ntime.max         ntime.minute      ntime.second      ntime.tzname(
ntime.hour        ntime.microsecond ntime.replace(    ntime.strftime(   ntime.utcoffset(
```

### `datetime.time`类方法

```python
# 最小时间
>>> datetime.time.min
datetime.time(0, 0)

# 最大时间
>>> datetime.time.max
datetime.time(23, 59, 59, 999999)

# 时间对象的最小间隔
>>> datetime.time.resolution
datetime.timedelta(0, 0, 1)
```

### `datetime.time`类实例属性

```python
>>> ntime.
ntime.dst(        ntime.isoformat(  ntime.min         ntime.resolution  ntime.tzinfo
ntime.fold        ntime.max         ntime.minute      ntime.second      ntime.tzname(
ntime.hour        ntime.microsecond ntime.replace(    ntime.strftime(   ntime.utcoffset(

# 获取时间对象小时值
>>> ntime.hour
6

# 获取时间对象分钟值
>>> ntime.minute
48

# 获取时间对象秒值
>>> ntime.second
5

# 获取时间对象微秒值
>>> ntime.microsecond
0
  
# 获取tzinfo参数传递的值，没有指定tzinfo时，返回None
>>> ntime.tzinfo

# 取值范围是 [0, 1]。 用于在重复的时间段中消除边界时间歧义，对于中国没有夏令时似乎没有实际意义，不用理会
>>> ntime.fold
0
```

`datetime.time`对象支持`time`与`time`之间的比较：

```python
>>> atime = datetime.time(6, 48, 5)

>>> btime = datetime.time(19, 53, 6)

>>> atime < btime
True

>>> atime == btime
False

>>> atime != btime
True
```

布尔运算时，`datetime.time`时间对象永远认为是`True`真值。

```python
>>> bool(ntime)
True
```

### `datetime.time`类实例方法



`time.replace(hour=self.hour, minute=self.minute, second=self.second, microsecond=self.microsecond, tzinfo=self.tzinfo, * fold=0)`时间对象替换，返回新的`time`对象。

```python
>>> ntime.replace?
Docstring: Return time with new specified fields.
Type:      builtin_function_or_method

>>> ntime
datetime.time(6, 48, 5)

>>> ntime.replace(7,3,6)
datetime.time(7, 3, 6)

>>> ntime
datetime.time(6, 48, 5)
```

`time.isoformat(timespec='auto')`返回表示为 ISO 8601 格式之一的时间字符串。

```python
>>> ntime.isoformat?
Docstring:
Return string in ISO 8601 format, [HH[:MM[:SS[.mmm[uuu]]]]][+HH:MM].

timespec specifies what components of the time to include.
Type:      builtin_function_or_method

>>> ntime.isoformat()
'06:48:05'

# 自动设置格式，等价于'seconds'，返回HH:MM:SS格式
>>> ntime.isoformat(timespec='auto')
'06:48:05'

# 返回小时
>>> ntime.isoformat(timespec='hours')
'06'

# 返回小时和分钟
>>> ntime.isoformat(timespec='minutes')
'06:48'

# 返回小时、分钟和秒数
>>> ntime.isoformat(timespec='seconds')
'06:48:05'

# 返回小时、分钟和秒数，秒数精确到毫秒
>>> ntime.isoformat(timespec='milliseconds')
'06:48:05.000'

# 返回小时、分钟和秒数，秒数精确到微秒
>>> ntime.isoformat(timespec='microseconds')
'06:48:05.000000'
```

`time.__str__()`对于`time`时间对象`t`，`str(t)`与`t.isoformat()`等价。返回标准时间字符串。

```python
>>> str(ntime)
'06:48:05'

>>> ntime.isoformat()
'06:48:05'

>>> ntime.__str__()
'06:48:05'
```

`time.strftime(format)`按指定格式格式化时间对象。具体的格式化标志请参考[https://docs.python.org/3.6/library/datetime.html#strftime-strptime-behavior](https://docs.python.org/3.6/library/datetime.html#strftime-strptime-behavior)。

```python
>>> ntime.strftime('%H%M%S')
'064805'

>>> ntime.strftime('%H:%M:%S')
'06:48:05'

>>> ntime.strftime('%H:%M:%S %p')
'06:48:05 AM'


time.__format__(format)与time.strftime(format)等价
>>> ntime.__format__('%H:%M:%S')
'06:48:05'
```

另外三个方法`time.utcoffset()`、`time.dst()`、`time.tzname()`与`tzinfo`相关，如果`datetime.time`对象没有设置tzinfo,则返回值为`None`。

```python
>>> ntime.utcoffset()

>>> ntime.dst()

>>> ntime.tzname()
```



## `datetime.datetime`日期时间类

`datetime.datetime`对象是包含来自`datetime.time`对象和`datetime.date`对象的所有信息的单一对象。

与`datetime.date`对象一样，`datetime.datetime`假定当前的格列高利历(Gregorian calendar)向前后两个方向无限延伸；与`datetime.time`对象一样，`datetime.datetime`假定假定每一天恰好有 3600*24 秒。

 `class datetime.datetime(year, month, day, hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)`*year*, *month* 和 *day* 参数是必须的。 *tzinfo* 可以是 `None` 或者是一个 [`tzinfo`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.tzinfo)子类的实例。 其余的参数必须是在下面范围内的整数：

- `MINYEAR <= year <= MAXYEAR`,
- `1 <= month <= 12`,
- `1 <= day <= 指定年月的天数`,
- `0 <= hour < 24`,
- `0 <= minute < 60`,
- `0 <= second < 60`,
- `0 <= microsecond < 1000000`,
- `fold in [0, 1]`.

如果参数不在这些范围内，则抛出 [`ValueError`](https://docs.python.org/zh-cn/3/library/exceptions.html#ValueError) 异常。



### `datetime.datetime`类方法