# 日期和时间模块-`dateutil`日期工具模块

[[toc]]

`dateutil - powerful extensions to datetime`官方解释`dateutil`模块是`datetime`模块的超强扩展！

`dateutil`日期工具模块说明：

- 官方指导文档地址[https://dateutil.readthedocs.io/en/stable/](https://dateutil.readthedocs.io/en/stable/)
- github源码[https://github.com/dateutil/dateutil/](https://github.com/dateutil/dateutil/)
- PyPI地址[https://pypi.org/project/python-dateutil/](https://pypi.org/project/python-dateutil/)

## 安装

```sh
$ pip install python-dateutil
Looking in indexes: http://mirrors.aliyun.com/pypi/simple/
Collecting python-dateutil
  Downloading http://mirrors.aliyun.com/pypi/packages/d4/70/d60450c3dd48ef87586924207ae8907090de0b306af2bce5d134d78615cb/python_dateutil-2.8.1-py2.py3-none-any.whl (227 kB)
     |████████████████████████████████| 227 kB 2.1 MB/s
Requirement already satisfied: six>=1.5 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from python-dateutil) (1.14.0)
Installing collected packages: python-dateutil
Successfully installed python-dateutil-2.8.1
```

查看`dateutil`模块有哪些函数或方法：

```py
$ python
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import dateutil
```

## 官方示例

我们先来参考[https://dateutil.readthedocs.io/en/stable/examples.html](https://dateutil.readthedocs.io/en/stable/examples.html)官方示例来看看`dateutil`能做些啥。



### relativedelta相对关系示例

首先开始我们的旅程，导入相应的包：

```python
$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> import calendar

>>> from datetime import *

>>> from dateutil.relativedelta import *
```

虽然Google的编码规范中建议不要使用`import *`来导入模块中的所有对象，我们此处参数官方示例来进行相关的测试，忽略此问题。



存储两个变量`now`和`today`：

```python
>>> now = datetime.now()

>>> now
datetime.datetime(2020, 7, 5, 15, 49, 42, 769673)

>>> today = date.today()

>>> today
datetime.date(2020, 7, 5)
```

计算下一个月：

```python
>>> now + relativedelta(months=+1)
datetime.datetime(2020, 8, 5, 15, 49, 42, 769673)
```

计算下一个月另外一周后的时间：

```python
>>> now + relativedelta(months=+1, weeks=+1)
datetime.datetime(2020, 8, 12, 15, 49, 42, 769673)

>>> now + relativedelta(months=+1, weeks=1)
datetime.datetime(2020, 8, 12, 15, 49, 42, 769673)
```

计算下一个月另外一周后上午10点的时间：

```python
>>> now + relativedelta(months=+1, weeks=+1, hour=10)
datetime.datetime(2020, 8, 12, 10, 49, 42, 769673)
```

上例中，使用了`hour`而不是`hours`，对时间对象的小时数进行替换，如果使用`hours`则会进行算术运算！



下面这个是使用绝对`relativedelta`的示例。 请注意，使用`year`年和`onth`月（均为单数）会导致在原始日期时间替换`replace`值，而不是对其进行算术运算。

```python
# 使用了单数的year和month，对时间对象进行了替换，输出到了公元1年1月了
>>> now + relativedelta(year=1, month=1)
datetime.datetime(1, 1, 5, 15, 49, 42, 769673)
```

下面我们进行另一种尝试。

计算两个时间对象之间的间隔：

```python
>>> relativedelta(datetime(2020, 7, 7, 10, 0), today)
relativedelta(days=+2, hours=+10)

>>> relativedelta(datetime(2020, 8, 7, 10, 0), today)
relativedelta(months=+1, days=+2, hours=+10)


>>> relativedelta(today, datetime(2020, 8, 7, 10, 0))
relativedelta(months=-1, days=-2, hours=-10)
```

计算1年后的时间：

```python
# 1年后
>>> now + relativedelta(years=1)
datetime.datetime(2021, 7, 5, 15, 49, 42, 769673)

# 1年后的前一个月
>>> now + relativedelta(years=1, months=-1)
datetime.datetime(2021, 6, 5, 15, 49, 42, 769673)
```

处理不同天数的月份，请注意，添加一个月永远不会超过月份的边界。

```python
# 2020年1月27后的一个月是2020年2月27日
>>> date(2020, 1, 27) + relativedelta(months=1)
datetime.date(2020, 2, 27)

# 2020年1月28后的一个月是2020年2月28日
>>> date(2020, 1, 28) + relativedelta(months=1)
datetime.date(2020, 2, 28)

# 2020年1月29后的一个月是2020年2月29日
>>> date(2020, 1, 29) + relativedelta(months=1)
datetime.date(2020, 2, 29)

# 2020年1月30后的一个月是2020年2月29日，
>>> date(2020, 1, 30) + relativedelta(months=1)
datetime.date(2020, 2, 29)

# 2020年1月2后的一个月是2020年2月27日
>>> date(2020, 1, 31) + relativedelta(months=1)
datetime.date(2020, 2, 29)

# 2020年1月27后的一个月是2020年2月27日
>>> date(2020, 2, 1) + relativedelta(months=1)
datetime.date(2020, 3, 1)

# 2020年1月27后的一个月是2020年2月27日
>>> date(2020, 1, 31) + relativedelta(months=2)
datetime.date(2020, 3, 31)
```



处理年份也是同样的逻辑，即使是闰年。

```python
# 2020年1月31日后一年是2021年1月31日
>>> date(2020, 1, 31) + relativedelta(years=1)
datetime.date(2021, 1, 31)

# 2020年2月28日后一年是2021年2月28日
>>> date(2020, 2, 28) + relativedelta(years=1)
datetime.date(2021, 2, 28)

# 2020年2月29日后一年是2021年2月28日，不会超过2月
>>> date(2020, 2, 29) + relativedelta(years=1)
datetime.date(2021, 2, 28)

# 2020年3月1日后一年是2021年3月1日
>>> date(2020, 3, 1) + relativedelta(years=1)
datetime.date(2021, 3, 1)

# 1999年2月28日后一年是2000年2月28日
>>> date(1999, 2, 28) + relativedelta(years=1)
datetime.date(2000, 2, 28)

# 1999年3月1日后一年是2000年3月1日
>>> date(1999, 3, 1) + relativedelta(years=1)
datetime.date(2000, 3, 1)

# 2016年2月28日后一年是2017年2月28日
>>> date(2016, 2, 28) + relativedelta(years=1)
datetime.date(2017, 2, 28)

# 2016年2月29日后一年是2017年2月28日，不会超过2月
>>> date(2016, 2, 29) + relativedelta(years=1)
datetime.date(2017, 2, 28)
```



下个星期五：

```python
# 今天是2020年7月5日，星期日
>>> today
datetime.date(2020, 7, 5)

# 下一个周五是2020年7月10日
>>> today + relativedelta(weekday=dateutil.relativedelta.FR)
datetime.date(2020, 7, 10)

# 下一个周一是2020年7月6日
>>> today + relativedelta(weekday=dateutil.relativedelta.MO)
datetime.date(2020, 7, 6)

# 下一个周二是2020年7月7日
>>> today + relativedelta(weekday=dateutil.relativedelta.TU)
datetime.date(2020, 7, 7)

# 下一个周三是2020年7月8日
>>> today + relativedelta(weekday=dateutil.relativedelta.WE)
datetime.date(2020, 7, 8)

# 下一个周四是2020年7月9日
>>> today + relativedelta(weekday=dateutil.relativedelta.TH)
datetime.date(2020, 7, 9)

# 下一个周五是2020年7月10日
>>> today + relativedelta(weekday=dateutil.relativedelta.FR)
datetime.date(2020, 7, 10)

# 下一个周六是2020年7月11日
>>> today + relativedelta(weekday=dateutil.relativedelta.SA)
datetime.date(2020, 7, 11)

# 下一个周日是2020年7月5日，也就是今天！！！如果想得到下一个周日不是今天的，就看下面的示例
>>> today + relativedelta(weekday=dateutil.relativedelta.SU)
datetime.date(2020, 7, 5)

# 下一个周日是2020年7月12日
>>> today + relativedelta(days=1, weekday=dateutil.relativedelta.SU)
datetime.date(2020, 7, 12)

# 因为今天(2020年7月5日)是周日，所以第1个周日就是2020年7月5日
>>> today + relativedelta(weekday=dateutil.relativedelta.SU(+1))
datetime.date(2020, 7, 5)

# 因为今天(2020年7月5日)是周日，第2个周日就是2020年7月12日
>>> today + relativedelta(weekday=dateutil.relativedelta.SU(2))
datetime.date(2020, 7, 12)

# 因为今天(2020年7月5日)是周日，所以第2个周日就是2020年7月12日
>>> today + relativedelta(weekday=dateutil.relativedelta.SU(+2))
datetime.date(2020, 7, 12)

# 本月最后一个星期五刚好是2020年7月31日，这种方式不准确！！！
>>> today + relativedelta(day=31, weekday=dateutil.relativedelta.FR)
datetime.date(2020, 7, 31)

# 本想计算本月最后一个星期天，结果2020年8月2日，已经到下一个月了！！
>>> today + relativedelta(day=31, weekday=dateutil.relativedelta.SU)
datetime.date(2020, 8, 2)

# 本月最后一个星期日是好是2020年7月26日
>>> today + relativedelta(day=31, weekday=dateutil.relativedelta.SU(-1))
datetime.date(2020, 7, 26)

# 本月最后一个星期五刚好是2020年7月31日
>>> today + relativedelta(day=31, weekday=dateutil.relativedelta.FR(-1))
datetime.date(2020, 7, 31)
```

















参考：

- [https://pypi.org/project/python-dateutil/](https://pypi.org/project/python-dateutil/)
