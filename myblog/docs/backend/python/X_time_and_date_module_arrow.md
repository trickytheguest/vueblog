# 日期和时间模块-`arrow`日期时间模块


[[toc]]

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



参考：

- [https://pypi.org/project/arrow/](https://pypi.org/project/arrow/)
- [https://github.com/crsmithdev/arrow/](https://github.com/crsmithdev/arrow/)
- [https://arrow.readthedocs.io/en/latest/](https://arrow.readthedocs.io/en/latest/)




