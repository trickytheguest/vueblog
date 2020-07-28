# 成为真正的Python开发者

[[toc]]

Python开发者，用英文表示时为`Pythonista`，参考[我不认识Pythoner这种开发者](https://zhuanlan.zhihu.com/p/26832983).

> 那正确的词应该是什么？
>
> 备选答案有：Pythonista、Pythoneer、Pythonist
>
> Pythoneer：使用python语言开发程序的人。
>
> Pythonista：顾名思义表示「Python支持者」，更表示资深的，对代码质量和品味有要求的开发者，这种执念也就是所谓「Pythonic」。这也是为什么称自己为Pythonista的人最多的原因了。
>
> Pythonist：-ist这种后缀表示职业中有一定的信念，有专家角度，如scientist、physicist、chemist，还给人严肃且不活泼的感觉，所以用的人很少。
>
>  **所以正确的用法，请大家大声的和我念一遍：Pythonista！！**



本章节选自丁嘉瑞等译的《Python语言及其应用》一书。

## 关于编程

学会享受编程的乐趣！

编程有很多领域，如计算机图形学、操作系统、商业应用、科学等等等。

编程中数字能力并不是很重要，更重要的是要具备逻辑思考能力！

编程中要有耐心，尤其是寻找代码中的Bug的时候！



## 寻找Python代码

当你需要开发功能时，最快的解决方法是借鉴别人写的代码。你可以从这些渠道获取代码。

- Python官方文档， [https://docs.python.org/3/](https://docs.python.org/3/)，你可以在这里找到很多有用的东西！
- Python包索引PyPi，[https://pypi.org/](https://pypi.org/)，你可以在这个网站上面直接搜索你要的包，或者使用pip搜索！
- GitHub仓库，[https://github.com/search?q=python](https://github.com/search?q=python), 在这里你可以查看到所有跟Python相关的开源代码。



## 安装包

有3种方式安装Python包：

- 推荐使用`pip`，你可以使用`pip`安装绝大多数Python包。
  - 安装最新版， `pip install packagename`，如`pip install flask`。
  - 安装指定版，`pip install packagename==xxx`，如`pip install flask==1.1.2`。
  - 指定最小版本，`pip install packagename>=xxx`，如`pip install flask>=0.9.0`。
  - 通过requirements.txt文件安装，`pip install -r requirements.txt`。
- 有时可以使用操作系统自带的包管理工具，如`yum`、`homebrew`等。
- 从源码安装。
  - 这种方式一般是先下载源码，然后源码是压缩文件，则需要先解压。
  - 在包含`setup.py`文件的目录中运行`python setup.py install`安装！



## 集成开发环境

- Python命令行

```python
$ python3
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import os
>>> os.name
'posix'
>>>
```

- ipython

```python
$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> import os

>>> os?
Type:        module
String form: <module 'os' from '/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/os.py'>
File:        /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/os.py
Docstring:
OS routines for NT or Posix depending on what system we're on.

This exports:
  - all functions from posix or nt, e.g. unlink, stat, etc.
  - os.path is either posixpath or ntpath
  - os.name is either 'posix' or 'nt'
  - os.curdir is a string representing the current directory (always '.')
  - os.pardir is a string representing the parent directory (always '..')
  - os.sep is the (or a most common) pathname separator ('/' or '\\')
  - os.extsep is the extension separator (always '.')
  - os.altsep is the alternate pathname separator (None or '/')
  - os.pathsep is the component separator used in $PATH etc
  - os.linesep is the line separator in text files ('\r' or '\n' or '\r\n')
  - os.defpath is the default search path for executables
  - os.devnull is the file path of the null device ('/dev/null', etc.)

Programs that import and use 'os' stand a better chance of being
portable between different platforms.  Of course, they must then
only use functions that are defined by all platforms (e.g., unlink
and opendir), and leave all pathname manipulation to os.path
(e.g., split and join).

>>>
```

- PyCharm,开发Python项目时适合使用PyCharm！社区版是免费的！



## 命名和文档

- 文档可以包括注释和文档字符串，也可以把信息记录在变量名、函数名、模块名和类名中。

- Python没有常量，但是使用大写字母和下划线来表示常量名。
- 

可以参考Google的Python编码规范或者PEP8格式规范建议！

- Google Python Style Guide [https://google.github.io/styleguide/pyguide.html](https://google.github.io/styleguide/pyguide.html)
- Google python编码规范中文版 [https://www.runoob.com/w3cnote/google-python-styleguide.html](https://www.runoob.com/w3cnote/google-python-styleguide.html)
- PEP8 [https://www.python.org/dev/peps/pep-0008/](https://www.python.org/dev/peps/pep-0008/)

## 测试代码

### 代码检查

我们可以使用pylint、Flake8、pyright等工具对Python代码进行代码检查，可以参考[代码检查](https://hellogitlab.com/backend/python/X_Python_style_and_static_check.html) 。

这部分主要是代码风格检查和静态检查等。

### 使用unittest进行代码测试

我们已经通过了代码风格检查，下面该真正地测试程序逻辑了！

最好先编写独立的测试程序，在提交代码到源码控制系统之前确保通过所有测试。写测试看起来是一件很麻烦的事情，但是它们真的能帮助你更快地发现问题。尤其是回归测试（破坏之前还能正常工作的代码）。工程师们已经从惨痛的经历中领悟到一个真理：即使是很小的看起来没有任何问题的改动，也可能出问题。如果看那些优秀的Python包就会发现，它们大都有测试集。




