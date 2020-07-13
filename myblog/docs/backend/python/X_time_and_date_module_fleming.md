# 日期和时间模块-`fleming`时区模块


[[toc]]

## 安装

```sh
$ pip install fleming
Looking in indexes: http://mirrors.aliyun.com/pypi/simple/
Collecting fleming
  Downloading http://mirrors.aliyun.com/pypi/packages/c0/8c/42972e31f78e54dcd7fe74677439e03037b2ba11af994d65324791a27fe4/fleming-0.5.0-py2.py3-none-any.whl (9.7 kB)
Requirement already satisfied: python-dateutil>=2.2 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from fleming) (2.8.1)
Requirement already satisfied: pytz>=2013.9 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from fleming) (2020.1)
Requirement already satisfied: six>=1.5 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from python-dateutil>=2.2->fleming) (1.14.0)
Installing collected packages: fleming
Successfully installed fleming-0.5.0
```

查看`fleming`模块有哪些函数或方法：

```py
$ python
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import fleming
>>> fleming.
fleming.add_timedelta( fleming.convert_to_tz( fleming.floor(         fleming.unix_time(
fleming.ceil(          fleming.fleming        fleming.intervals(
>>> exit()
```



参考：

- [https://pypi.org/project/fleming/](https://pypi.org/project/fleming/)
- [https://github.com/ambitioninc/fleming](https://github.com/ambitioninc/fleming)
- [https://fleming.readthedocs.io/en/develop/index.html](https://fleming.readthedocs.io/en/develop/index.html)



