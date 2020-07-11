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

按照ISO年份周编号表示法，可以找到1997年第15周的第一天。

```python
>>> datetime(1997, 1, 1)  + relativedelta(day=4, weeks=+14, weekday=dateutil.relativedelta.MO(-1))
datetime.datetime(1997, 4, 7, 0, 0)
```

计算一个人有多少岁：

```python
>>> now
datetime.datetime(2020, 7, 5, 15, 49, 42, 769673)

>>> birthday = datetime(1978, 4, 25, 12, 0)

>>> relativedelta(now, birthday)
relativedelta(years=+42, months=+2, days=+10, hours=+3, minutes=+49, seconds=+42, microseconds=+769673)

>>> today
datetime.date(2020, 7, 5)

>>> relativedelta(today, birthday)
relativedelta(years=+42, months=+2, days=+9, hours=+12)
```

计算某年第N天的日期：

```python
# 平年时，2019年的第260天是2019年9月17日
>>> date(2019,1,1) + relativedelta(yearday=260)
datetime.date(2019, 9, 17)

# 平年时，2019年的第260天是2019年9月17日
>>> datetime(2019,1,1) + relativedelta(yearday=260)
datetime.datetime(2019, 9, 17, 0, 0)

# 平年时，2018年的第260天是2018年9月17日
>>> datetime(2018,1,1) + relativedelta(yearday=260)
datetime.datetime(2018, 9, 17, 0, 0)

# 平年时，2018年的第260天是2018年9月17日
>>> date(2018,1,1) + relativedelta(yearday=260)
datetime.date(2018, 9, 17)

# 平年时，2018年的第260天是2018年9月17日，虽然此时使用的date(2018,2,1)与relativedelta相加，但2018年的第260年不会变，yearday计算的是绝对日期！
>>> date(2018,2,1) + relativedelta(yearday=260)
datetime.date(2018, 9, 17)

# 闫年，2月多一天，所有2020年的第260天是2020年9月16日
>>> today + relativedelta(yearday=260)
datetime.date(2020, 9, 16)

# 闫年，2月多一天，所有2020年的第260天是2020年9月16日
>>> now + relativedelta(yearday=260)
datetime.datetime(2020, 9, 16, 15, 49, 42, 769673)

# 我们可以使用non-leap year day来忽略闫年的影响，此时使用nlyearday参数，计算2020年的第260天也是9月17日
>>> now + relativedelta(nlyearday=260)
datetime.datetime(2020, 9, 17, 15, 49, 42, 769673)

>>> today + relativedelta(nlyearday=260)
datetime.date(2020, 9, 17)

# 实际上，考虑闫年的话，2020年9月17日是2020年的261天
>>> datetime(2020,9,17).timetuple()
time.struct_time(tm_year=2020, tm_mon=9, tm_mday=17, tm_hour=0, tm_min=0, tm_sec=0, tm_wday=3, tm_yday=261, tm_isdst=-1)
```





### parser parse将字符串解析成`datetime.datetime`日期时间对象

parser是根据字符串解析成datetime,字符串可以很随意，可以用时间日期的英文单词，可以用横线、逗号、空格等做分隔符。
没指定时间默认是0点，没指定日期默认是今天，没指定年份默认是今年。

```python
[mzh@MacBookPro ~ ]$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> from dateutil.parser import parse

# 时间字符串指定了年月日和时间
>>> parse("Thu Sep 25 10:36:28 2003")
datetime.datetime(2003, 9, 25, 10, 36, 28)

# 导入datetime模块查看今天的日期
>>> import datetime

>>> today = datetime.datetime.today()

>>> today
datetime.datetime(2020, 7, 11, 16, 18, 44, 608638)
```

我们来测试不指定年月日等关键字：

```python
# 不指定年份时，解析出是今年2020年
>>> parse("Thu Sep 25 10:36:28")
datetime.datetime(2020, 9, 25, 10, 36, 28)

# 不指定年份和月份时，解析出本月2020年7月
>>> parse("Thu 25 10:36:28")
datetime.datetime(2020, 7, 25, 10, 36, 28)

# 不指定年份月份和日期时，因为定义了Thu为周四，解析出了2020年7月16日
>>> parse("Thu 10:36:28")
datetime.datetime(2020, 7, 16, 10, 36, 28)

# 不指定年份月份和日期时，没有定义周几，解析出了今天，即2020年7月11日
>>> parse("10:36:28")
datetime.datetime(2020, 7, 11, 10, 36, 28)

# 时间指定时，只难忽略秒，按下面这种格式解析只会解析出小时和分钟，不会当前分钟和秒解析出来
>>> parse("10:36")
datetime.datetime(2020, 7, 11, 10, 36)
```



解析一个数字字符串，单独的一个数字，如果小于30或31时，则当做本月的某个日期解析出来：

```python
# 单独的一个数字，如果小于30或31时，则当做本月的某个日期解析出来
# 解析出2020年7月1日
>>> parse("1")
datetime.datetime(2020, 7, 1, 0, 0)

# 解析出2020年7月2日
>>> parse("2")
datetime.datetime(2020, 7, 2, 0, 0)

# 解析出2020年7月3日
>>> parse('3')
datetime.datetime(2020, 7, 3, 0, 0)

# 解析出2020年7月31日
>>> parse('31')
datetime.datetime(2020, 7, 31, 0, 0)

# 因为32不可能做为日期，也不能做为月份，因为将其解析为年份
# 此时解析出了2032年7月11日
>>> parse('32')
datetime.datetime(2032, 7, 11, 0, 0)

# 此时解析出了2033年7月11日
>>> parse('33')
datetime.datetime(2033, 7, 11, 0, 0)

# 此时解析出了2034年7月11日
>>> parse('34')
datetime.datetime(2034, 7, 11, 0, 0)
```

当数字字符串对应的数值越来越大时，解析出的年份会发生变化：

- 当数字N在`[32, 70)区间时会解析成`20N`年，如2032年、2033年、2068年、2069年等。
- 当数字N在`[70, 100)区间时会解析成19`N`年，如1970年、1971年、1998年、1999年等。
- 当数字N在`[100, 10000)`区间时会解析成`N`年，如100年、101年、1000年、2000年、3000年、4000年、9998年、9999年等。
- 当数字年份小于1000年，年份可以为小数，并会被正确解析为移除小数部分的年份。小数部分最多两位数字。
- 当数字年份大于1000年时，年份不能为小数，必须为整数。此处不一定准确，发现两位小数也解析成功了！:joy:

```python
>>> parse('40')
datetime.datetime(2040, 7, 11, 0, 0)

>>> parse('50')
datetime.datetime(2050, 7, 11, 0, 0)

>>> parse('60')
datetime.datetime(2060, 7, 11, 0, 0)

>>> parse('61')
datetime.datetime(2061, 7, 11, 0, 0)

>>> parse('62')
datetime.datetime(2062, 7, 11, 0, 0)

>>> parse('63')
datetime.datetime(2063, 7, 11, 0, 0)

>>> parse('64')
datetime.datetime(2064, 7, 11, 0, 0)

>>> parse('65')
datetime.datetime(2065, 7, 11, 0, 0)

>>> parse('66')
datetime.datetime(2066, 7, 11, 0, 0)

>>> parse('67')
datetime.datetime(2067, 7, 11, 0, 0)

>>> parse('68')
datetime.datetime(2068, 7, 11, 0, 0)

>>> parse('69')
datetime.datetime(2069, 7, 11, 0, 0)

# 字符70被解析成1970年
>>> parse('70')
datetime.datetime(1970, 7, 11, 0, 0)

>>> parse('71')
datetime.datetime(1971, 7, 11, 0, 0)

>>> parse('72')
datetime.datetime(1972, 7, 11, 0, 0)

>>> parse('73')
datetime.datetime(1973, 7, 11, 0, 0)

>>> parse('80')
datetime.datetime(1980, 7, 11, 0, 0)

>>> parse('81')
datetime.datetime(1981, 7, 11, 0, 0)

>>> parse('90')
datetime.datetime(1990, 7, 11, 0, 0)

>>> parse('91')
datetime.datetime(1991, 7, 11, 0, 0)

>>> parse('98')
datetime.datetime(1998, 7, 11, 0, 0)

>>> parse('99')
datetime.datetime(1999, 7, 11, 0, 0)

# 字符100被解析为公元100年
>>> parse('100')
datetime.datetime(100, 7, 11, 0, 0)

>>>
```



年份中带小数：

```python
# 使用一位小数正常解析
>>> parse('32.1')
datetime.datetime(2032, 7, 11, 0, 0)

>>> parse('32.2')
datetime.datetime(2032, 7, 11, 0, 0)

>>> parse('32.5')
datetime.datetime(2032, 7, 11, 0, 0)

>>> parse('32.6')
datetime.datetime(2032, 7, 11, 0, 0)

>>> parse('32.9')
datetime.datetime(2032, 7, 11, 0, 0)

# 使用两位小数正常解析
>>> parse('32.99')
datetime.datetime(2032, 7, 11, 0, 0)

# 使用三位小数解析异常！！！
>>> parse('32.999')
ParserError: Unknown string format: 32.999
    
>>> parse('69.9')
datetime.datetime(2069, 7, 11, 0, 0)

>>> parse('69.99')
datetime.datetime(2069, 7, 11, 0, 0)

# 使用三位小数解析异常！！！
>>> parse('69.999')
ParserError: Unknown string format: 69.999
```



年份超过1000的数字解析：

```python
>>> parse('1000')
datetime.datetime(1000, 7, 11, 0, 0)

>>> parse('1001')
datetime.datetime(1001, 7, 11, 0, 0)

>>> parse('9999')
datetime.datetime(9999, 7, 11, 0, 0)

# 解析10000时异常，超出有效的年份范围
>>> parse('10000')
ParserError: year 10000 is out of range: 10000

# 一位小数时解析失败了
>>> parse('1000.1')
ParserError: Unknown string format: 1000.1
    
# 两位小数时解析成功了！什么鬼👻
>>> parse('1000.81')
datetime.datetime(1000, 7, 11, 0, 0)

>>> parse('1000.11')
datetime.datetime(1000, 7, 11, 0, 0)

>>> parse('1000.12')
datetime.datetime(1000, 7, 11, 0, 0)
```

解析ISO格式的字符串：

```python
>>> today.isoformat()
'2020-07-11T16:18:44.608638'

>>> parse(today.isoformat())
datetime.datetime(2020, 7, 11, 16, 18, 44, 608638)
```

iso格式变异：

```python
>>> parse('2020-07-11T16:18:44.608638')
datetime.datetime(2020, 7, 11, 16, 18, 44, 608638)

>>> parse('2020-07-11T16:18:44')
datetime.datetime(2020, 7, 11, 16, 18, 44)

>>> parse('2020-07-11T16:18')
datetime.datetime(2020, 7, 11, 16, 18)

>>> parse('2020-07-11T16')
datetime.datetime(2020, 7, 11, 16, 0)

>>> parse('2020-07-11T')
datetime.datetime(2020, 7, 11, 0, 0)

>>> parse('2020-07-11')
datetime.datetime(2020, 7, 11, 0, 0)

>>> parse('2020-07')
datetime.datetime(2020, 7, 11, 0, 0)

>>> parse('2020')
datetime.datetime(2020, 7, 11, 0, 0)
```











参考：

- [https://pypi.org/project/python-dateutil/](https://pypi.org/project/python-dateutil/)
