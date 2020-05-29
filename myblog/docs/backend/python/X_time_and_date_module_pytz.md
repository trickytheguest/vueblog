# 日期和时间模块-`pytz`时区模块


[[toc]]

## 安装

```sh
$ pip install pytz
Looking in indexes: http://mirrors.aliyun.com/pypi/simple/
Requirement already satisfied: pytz in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (2020.1)
```

查看`pytz`模块有哪些函数或方法：

```py
$ python3
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import pytz
>>> pytz.
pytz.all_timezones         pytz.country_timezones(    pytz.LazySet(              pytz.tzfile
pytz.all_timezones_set     pytz.datetime              pytz.NonExistentTimeError( pytz.tzinfo
pytz.AmbiguousTimeError(   pytz.exceptions            pytz.OLSEN_VERSION         pytz.unicode(
pytz.ascii(                pytz.FixedOffset(          pytz.OLSON_VERSION         pytz.UnknownTimeZoneError(
pytz.BaseTzInfo(           pytz.HOUR                  pytz.open_resource(        pytz.unpickler(
pytz.build_tzinfo(         pytz.InvalidTimeError(     pytz.os                    pytz.utc
pytz.common_timezones      pytz.lazy                  pytz.resource_exists(      pytz.UTC
pytz.common_timezones_set  pytz.LazyDict(             pytz.sys                   pytz.VERSION
pytz.country_names         pytz.LazyList(             pytz.timezone(             pytz.ZERO
>>> exit()
```



参考：

- [https://pypi.org/project/pytz/](https://pypi.org/project/pytz/)






