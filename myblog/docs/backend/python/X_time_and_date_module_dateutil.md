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

我们先来参考[https://dateutil.readthedocs.io/en/stable/examples.html](https://dateutil.readthedocs.io/en/stable/examples.html)官方示例来看看`dateutil`能做些啥。下面大部分示例都是直接参数官方示例的。



## relativedelta相对关系示例

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





## parser parse将字符串解析成`datetime.datetime`日期时间对象

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

iso变异没有分隔符：

```python
>>> parse('20200711T16:18:44.608638')
datetime.datetime(2020, 7, 11, 16, 18, 44, 608638)

>>> parse('20200711T161844.608638')
datetime.datetime(2020, 7, 11, 16, 18, 44, 608638)

>>> parse('20200711T161844')
datetime.datetime(2020, 7, 11, 16, 18, 44)

>>> parse('20200711T1618')
datetime.datetime(2020, 7, 11, 16, 18)

>>> parse('20200711T16')
datetime.datetime(2020, 7, 11, 16, 0)

>>> parse('20200711')
datetime.datetime(2020, 7, 11, 0, 0)

>>> parse('20200711161844')
datetime.datetime(2020, 7, 11, 16, 18, 44)
```

日期的前后顺序：

```python
>>> parse("2003-09-25")
datetime.datetime(2003, 9, 25, 0, 0)

>>>  parse("2003-Sep-25")
datetime.datetime(2003, 9, 25, 0, 0)

>>> parse("25-Sep-2003")
datetime.datetime(2003, 9, 25, 0, 0)

>>> parse("Sep-25-2003")
datetime.datetime(2003, 9, 25, 0, 0)

>>> parse("09-25-2003")
datetime.datetime(2003, 9, 25, 0, 0)

# 此时因为25不可能是月份，所以将25判断为日期，09判断为月份
>>> parse("25-09-2003")
datetime.datetime(2003, 9, 25, 0, 0)
```

可以看到以上这些年月日的顺序都解析出来的日期。



有时有可能出现比较含糊的日期字符串。

```python
# 此时因10小于或等于12，因此有可能10为月份，这中parse会把前面的解析为月，后面的解析为日，所以些时解析出了10月9日
>>> parse("10-09-2003")
datetime.datetime(2003, 10, 9, 0, 0)

# 通过dayfirst参数设置为True将前面的解析为日，后面解析为月，所以此时解析出了9月10日
>>> parse("10-09-2003", dayfirst=True)
datetime.datetime(2003, 9, 10, 0, 0)

# 当年月日都是两位数时，会将最前面的解析为月份，中间为日期，最后为年份
>>> parse("10-09-03")
datetime.datetime(2003, 10, 9, 0, 0)

>>> parse("10-09-04")
datetime.datetime(2004, 10, 9, 0, 0)

>>> parse("10-09-11")
datetime.datetime(2011, 10, 9, 0, 0)

>>> parse("10-09-20")
datetime.datetime(2020, 10, 9, 0, 0)

# 通过yearfirst=True设置前面的为年份，此时解析出的是2010年9月3日
>>> parse("10-09-03", yearfirst=True)
datetime.datetime(2010, 9, 3, 0, 0)

# 默认yearfirst=False
>>> parse("10-09-03", yearfirst=False)
datetime.datetime(2003, 10, 9, 0, 0)
```

也可以使用其他的分隔符：

```python
# 使用点号分隔
>>> parse("2003.Sep.25")
datetime.datetime(2003, 9, 25, 0, 0)

>>> parse("2003.09.25")
datetime.datetime(2003, 9, 25, 0, 0)

# 使用斜杠分隔
>>> parse("2003/09/25")
datetime.datetime(2003, 9, 25, 0, 0)

# 当年份放在前面时，只能按年月日的顺序解析
# 否则会出现解析异常！
>>> parse("2003.25.09")
ValueError: month must be in 1..12
ParserError: month must be in 1..12: 2003.25.09
    
>>> parse("2003/25/09")
ValueError: month must be in 1..12
ParserError: month must be in 1..12: 2003/25/09
    
# 也可以使用空格作为分隔符
>>>  parse("2003 Sep 25")
datetime.datetime(2003, 9, 25, 0, 0)

>>>  parse("2003 09 25")
datetime.datetime(2003, 9, 25, 0, 0)

# 此时25被解析为年份
>>>  parse("03 09 25")
datetime.datetime(2025, 3, 9, 0, 0)
```



带字母小时分钟秒的时间字符也是可以解析的：

```python
# h和m被解析成了小时和分钟
>>> parse("01h02m03")
datetime.datetime(2020, 7, 11, 1, 2, 3)

# h、m和s被解析成了小时、分钟和秒
>>> parse("10h36m03s")
datetime.datetime(2020, 7, 11, 10, 36, 3)

>>> today
datetime.datetime(2020, 7, 11, 16, 18, 44, 608638)

# 此处的01s没有被解析为秒
>>> parse("01s02h03m", default=today)
datetime.datetime(2020, 7, 11, 2, 3, 44)

# 此处的01s没有被解析为秒
>>> parse("01s02h03m", default=datetime.datetime.today())
datetime.datetime(2020, 7, 11, 2, 3, 9)

# 此处的01s没有被解析为秒
>>> parse("01s02h03m", default=datetime.datetime.today())
datetime.datetime(2020, 7, 11, 2, 3, 15)

# 小时h后的22直接被解析为分钟
>>> parse("10h22")
datetime.datetime(2020, 7, 11, 10, 22)

# 如果数字后面指定s，22s就会解析为秒了
>>> parse("10h22s")
datetime.datetime(2020, 7, 11, 10, 0, 22)

# 解析出小时和分钟
>>> parse("10h22m")
datetime.datetime(2020, 7, 11, 10, 22)

# 解析出小时和秒
>>> parse("10m22s")
datetime.datetime(2020, 7, 11, 0, 10, 22)

# 解析出小时
>>> parse("10h")
datetime.datetime(2020, 7, 11, 10, 0)

# 解析出分钟
>>> parse("10m")
datetime.datetime(2020, 7, 11, 0, 10)

# 解析出秒
>>> parse("10s")
datetime.datetime(2020, 7, 11, 0, 0, 10)
```

也可以解析上午和下午AM/PM:

```python
>>> parse("10h am")
datetime.datetime(2020, 7, 11, 10, 0)

>>> parse("10h pm")
datetime.datetime(2020, 7, 11, 22, 0)

>>> parse("12:00 pm")
datetime.datetime(2020, 7, 11, 12, 0)

>>> parse("12:00 am")
datetime.datetime(2020, 7, 11, 0, 0)

>>> parse("12pm")
datetime.datetime(2020, 7, 11, 12, 0)

>>> parse("12h23m pm")
datetime.datetime(2020, 7, 11, 12, 23)

# 没有添加空格分隔，解析异常
>>> parse("12h23mpm")
ParserError: Unknown string format: 12h23mpm
```

此时am或pm与前面的时间字符要分隔开。不分隔的时候就会抛出`ParserError`异常！

使用字母时大小写不敏感：

```python
>>> parse("12h PM")
datetime.datetime(2020, 7, 11, 12, 0)

>>> parse("12h Pm")
datetime.datetime(2020, 7, 11, 12, 0)

>>> parse("12h pM")
datetime.datetime(2020, 7, 11, 12, 0)

>>> parse("12h aM")
datetime.datetime(2020, 7, 11, 0, 0)

>>> parse("22H13m23S")
datetime.datetime(2020, 7, 11, 22, 13, 23)

>>> parse("22h13M23s")
datetime.datetime(2020, 7, 11, 22, 13, 23)
```



仅包含年月的特殊字符：

```python
# 03解析为03日
>>> parse("Sep 03")
datetime.datetime(2020, 9, 3, 0, 0)

# 因为多了of，03被解析为2003年
>>> parse("Sep of 03")
datetime.datetime(2003, 9, 11, 0, 0)
```



模糊解析：

```python
# 定义一个包含日期时间的句子
>>> s = "Today is 25 of September of 2003, exactly at 10:49:41"

>>> s
'Today is 25 of September of 2003, exactly at 10:49:41'

# 直接解析，抛出异常
>>> parse(s)
ParserError: Unknown string format: Today is 25 of September of 2003, exactly at 10:49:41
        

# 开启模糊解析功能，正常解析
>>> parse(s, fuzzy=1)
datetime.datetime(2003, 9, 25, 10, 49, 41)

>>> parse(s, fuzzy=True)
datetime.datetime(2003, 9, 25, 10, 49, 41)        
```

其他一些随机格式：

```python
>>> parse("Wed, July 10, '96")
datetime.datetime(1996, 7, 10, 0, 0)

>>> parse("1996.07.10 AD at 15:08:56 PDT", ignoretz=True)
datetime.datetime(1996, 7, 10, 15, 8, 56)

>>> parse("1996.07.10 AD at 15:08:56 PDT", ignoretz=0)
/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/dateutil/parser/_parser.py:1218: UnknownTimezoneWarning: tzname PDT identified but not understood.  Pass `tzinfos` argument in order to correctly return a timezone-aware datetime.  In a future version, this will raise an exception.
  category=UnknownTimezoneWarning)
datetime.datetime(1996, 7, 10, 15, 8, 56)

>>> parse("Tuesday, April 12, 1952 AD 3:30:42pm PST", ignoretz=True)
datetime.datetime(1952, 4, 12, 15, 30, 42)

>>> parse("November 5, 1994, 8:15:30 am EST", ignoretz=True)
datetime.datetime(1994, 11, 5, 8, 15, 30)

>>> parse("3rd of May 2001")
datetime.datetime(2001, 5, 3, 0, 0)

>>> parse("5:50 A.M. on June 13, 1990")
/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/dateutil/parser/_parser.py:1218: UnknownTimezoneWarning: tzname M identified but not understood.  Pass `tzinfos` argument in order to correctly return a timezone-aware datetime.  In a future version, this will raise an exception.
  category=UnknownTimezoneWarning)
datetime.datetime(1990, 6, 13, 5, 50)

>>>
```

通过`parse`的示例可以看到，`parse`解析实在太灵活了，有时你一不小心就有可能解析出不是自己要想的结果！



自定义解析信息：

```python
>>> from dateutil.parser import parse, parserinfo

>>> parserinfo.MONTHS
[('Jan', 'January'),
 ('Feb', 'February'),
 ('Mar', 'March'),
 ('Apr', 'April'),
 ('May', 'May'),
 ('Jun', 'June'),
 ('Jul', 'July'),
 ('Aug', 'August'),
 ('Sep', 'Sept', 'September'),
 ('Oct', 'October'),
 ('Nov', 'November'),
 ('Dec', 'December')]

>>> parserinfo.MONTHS[0]
('Jan', 'January')

>>> parserinfo.AMPM
[('am', 'a'), ('pm', 'p')]


>>> class CustomParserInfo(parserinfo):
...     AMPM = [("am", "a", "上午"), ("pm", "p", "下午")]
...

# 直接解析会抛出异常
>>> parse("2020-07-11 10:20 上午")
ParserError: Unknown string format: 2020-07-11 10:20 上午
      
# 通过指定parserinfo为CustomParseInfo()进行自定义解析
>>> parse("2020-07-11 10:20 上午", parserinfo=CustomParserInfo())
datetime.datetime(2020, 7, 11, 10, 20)

>>> parse("2020-07-11 10:20 下午", parserinfo=CustomParserInfo())
datetime.datetime(2020, 7, 11, 22, 20)

# 虽然可以使用fuzzy模糊解析来解析时间，但解析时间都与上午下午字符串无关
>>> parse("2020-07-11 10:20 上午", fuzzy=1)
datetime.datetime(2020, 7, 11, 10, 20)

>>> parse("2020-07-11 10:20 下午", fuzzy=1)
datetime.datetime(2020, 7, 11, 10, 20)
```

使用自定义parserinfo能够正常解析中文的月份和星期：

```python
from dateutil.parser import parse, parserinfo


class CustomParserInfo(parserinfo):
    AMPM = [("am", "a", "上午"), ("pm", "p", "下午")]
    WEEKDAYS = [("Mon", "Monday", "周一"),
                ("Tue", "Tuesday", "周二"),  # TODO: "Tues"
                ("Wed", "Wednesday", "周三"),
                ("Thu", "Thursday", "周四"),  # TODO: "Thurs"
                ("Fri", "Friday", "周五"),
                ("Sat", "Saturday", "周六"),
                ("Sun", "Sunday", "周日")]
    MONTHS = [("Jan", "January", "一月"),
              ("Feb", "February", "二月"),  # TODO: "Febr"
              ("Mar", "March", "三月"),
              ("Apr", "April", "四月"),
              ("May", "May", "五月"),
              ("Jun", "June", "六月"),
              ("Jul", "July", "七月"),
              ("Aug", "August", "八月"),
              ("Sep", "Sept", "September", "九月"),
              ("Oct", "October", "十月"),
              ("Nov", "November", "十一月"),
              ("Dec", "December", "十二月")]


def myparse(datetimestr):
    return parse(datetimestr, parserinfo=CustomParserInfo())


def main():
    print(myparse("2020-07-11 10:20 上午"))
    print(myparse("2020-07-11 10:20 下午"))
    print(myparse("周日 10:20 上午"))
    print(myparse("周日 10:20 下午"))
    print(myparse("周日 一月 10:20 下午"))
    print(myparse("二月 10:20"))
    print(myparse("2020 三月 14"))
    print(myparse("2020 七月 11"))


if __name__ == '__main__':
    main()


# output:
# 2020-07-11 10:20:00
# 2020-07-11 22:20:00
# 2020-07-12 10:20:00
# 2020-07-12 22:20:00
# 2020-01-12 22:20:00
# 2020-02-11 10:20:00
# 2020-03-14 00:00:00
# 2020-07-11 00:00:00
```



官方文档[https://dateutil.readthedocs.io/en/stable/examples.html](https://dateutil.readthedocs.io/en/stable/examples.html)中还有很多其他的示例，以及其他的一些内容，此处不再详细测试。可以看到`dateutil`模块的功能非常强大。总体感觉虽然模块功能强大，但要用好也不容易，一不小心容易出错。所有使用时还是需要谨慎操作！

## rrule输出datetime对象



查看`rrule`的方法和属性：

```python
$ python3
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from dateutil import rrule
>>> rrule.
rrule.advance_iterator( rrule.HOURLY            rrule.MINUTELY          rrule.rrulebase(        rrule.warn(
rrule.calendar          rrule.integer_types     rrule.MO(               rrule.rruleset(         rrule.WDAYMASK
rrule.DAILY             rrule.itertools         rrule.MONTHLY           rrule.rrulestr(         rrule.WE(
rrule.datetime          rrule.M365MASK          rrule.NMDAY365MASK      rrule.SA(               rrule.weekday(
rrule.easter            rrule.M365RANGE         rrule.NMDAY366MASK      rrule.SECONDLY          rrule.weekdaybase(
rrule.FR(               rrule.M366MASK          rrule.parser            rrule.SU(               rrule.weekdays
rrule.FREQNAMES         rrule.M366RANGE         rrule.range(            rrule.sys               rrule.WEEKLY
rrule.gcd(              rrule.MDAY365MASK       rrule.re                rrule.TH(               rrule.YEARLY
rrule.heapq             rrule.MDAY366MASK       rrule.rrule(            rrule.TU(
>>> rrule.
```

`rrule.rrule`类：

`class dateutil.rrule.rrule(freq, dtstart=None, interval=1, wkst=None, count=None, until=None, bysetpos=None, bymonth=None, bymonthday=None, byyearday=None, byeaster=None, byweekno=None, byweekday=None, byhour=None, byminute=None, bysecond=None, cache=False)`

参数比较多！

参数说明如下：

- `freq`单位

> freq must be one of YEARLY, MONTHLY, WEEKLY, DAILY, HOURLY, MINUTELY, or SECONDLY

即`freq`参数只能是`YEARLY, MONTHLY, WEEKLY, DAILY, HOURLY, MINUTELY, or SECONDLY`这些值。

- `dtstart`开始时间
- `count`生成datetime对象的个数
- `interval`时间间隔
- `wkst`周开始时间
- `until`结束时间
- `bysetpos`匹配

### 输出指定个数的datetime对象

```python
$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> from dateutil.rrule import rrule, MONTHLY

>>> from datetime import datetime

# 定义一个开始日期
>>> start_date = datetime.today()

>>> start_date
datetime.datetime(2020, 7, 12, 10, 37, 2, 615526)

>>> rrule(freq=MONTHLY, count=4, dtstart=start_date)
<dateutil.rrule.rrule at 0x10ef37518>

# 输出4个月份datetime对象
>>> list(rrule(freq=MONTHLY, count=4, dtstart=start_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 8, 12, 10, 37, 2),
 datetime.datetime(2020, 9, 12, 10, 37, 2),
 datetime.datetime(2020, 10, 12, 10, 37, 2)]
```

通过`count`指定输出的datetime对象的个数！

### 指定起始时间和终止时间

```python
# 定义一个结束日期
>>> end_date = datetime(2020,12,25)

>>> end_date
datetime.datetime(2020, 12, 25, 0, 0)

# 输出从起始时间到终止时间的datetime对象序列，此时可以看输出了2020年7月、8月、9月、10月、11月、12月，共计6个对象
>>> list(rrule(freq=MONTHLY, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 8, 12, 10, 37, 2),
 datetime.datetime(2020, 9, 12, 10, 37, 2),
 datetime.datetime(2020, 10, 12, 10, 37, 2),
 datetime.datetime(2020, 11, 12, 10, 37, 2),
 datetime.datetime(2020, 12, 12, 10, 37, 2)]

# 如果指定了count参数，此时count数为4，小于最多允许的个数6，因此此时仅输出4个datetime对象
>>> list(rrule(freq=MONTHLY, count=4, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 8, 12, 10, 37, 2),
 datetime.datetime(2020, 9, 12, 10, 37, 2),
 datetime.datetime(2020, 10, 12, 10, 37, 2)]

# 当count大于最多允许的个数时，也只能输出最多允许的个数的datetime对象
>>> list(rrule(freq=MONTHLY, count=8, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 8, 12, 10, 37, 2),
 datetime.datetime(2020, 9, 12, 10, 37, 2),
 datetime.datetime(2020, 10, 12, 10, 37, 2),
 datetime.datetime(2020, 11, 12, 10, 37, 2),
 datetime.datetime(2020, 12, 12, 10, 37, 2)]

# 当count大于最多允许的个数时，也只能输出最多允许的个数的datetime对象
>>> list(rrule(freq=MONTHLY, count=9, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 8, 12, 10, 37, 2),
 datetime.datetime(2020, 9, 12, 10, 37, 2),
 datetime.datetime(2020, 10, 12, 10, 37, 2),
 datetime.datetime(2020, 11, 12, 10, 37, 2),
 datetime.datetime(2020, 12, 12, 10, 37, 2)]
```

### 改变输出单位

上面的示例是按朋份输出的，我们尝试改变一下输出单位，如按天输出，或按年输出等。

```python
# 导入可用的单位
>>> from dateutil.rrule import YEARLY, MONTHLY, WEEKLY, DAILY, HOURLY, MINUTELY, SECONDLY

# 按日期生成对象
>>> list(rrule(freq=DAILY, count=4, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 7, 13, 10, 37, 2),
 datetime.datetime(2020, 7, 14, 10, 37, 2),
 datetime.datetime(2020, 7, 15, 10, 37, 2)]

# 按年份生成对象
>>> list(rrule(freq=YEARLY, count=4, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2)]

# 按年份生成对象，不指定结束时间
>>> list(rrule(freq=YEARLY, count=4, dtstart=start_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2021, 7, 12, 10, 37, 2),
 datetime.datetime(2022, 7, 12, 10, 37, 2),
 datetime.datetime(2023, 7, 12, 10, 37, 2)]

# 按周生成对象
>>> list(rrule(freq=WEEKLY, count=4, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 7, 19, 10, 37, 2),
 datetime.datetime(2020, 7, 26, 10, 37, 2),
 datetime.datetime(2020, 8, 2, 10, 37, 2)]

# 按小时生成对象
>>> list(rrule(freq=HOURLY, count=4, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 7, 12, 11, 37, 2),
 datetime.datetime(2020, 7, 12, 12, 37, 2),
 datetime.datetime(2020, 7, 12, 13, 37, 2)]

# 按分钟生成对象
>>> list(rrule(freq=MINUTELY, count=4, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 7, 12, 10, 38, 2),
 datetime.datetime(2020, 7, 12, 10, 39, 2),
 datetime.datetime(2020, 7, 12, 10, 40, 2)]

# 按秒生成对象
>>> list(rrule(freq=SECONDLY, count=4, dtstart=start_date, until=end_date))
[datetime.datetime(2020, 7, 12, 10, 37, 2),
 datetime.datetime(2020, 7, 12, 10, 37, 3),
 datetime.datetime(2020, 7, 12, 10, 37, 4),
 datetime.datetime(2020, 7, 12, 10, 37, 5)]

>>>
```







参考：

- [https://pypi.org/project/python-dateutil/](https://pypi.org/project/python-dateutil/)
- 官方文档[https://dateutil.readthedocs.io/en/stable/index.html](https://dateutil.readthedocs.io/en/stable/index.html)
