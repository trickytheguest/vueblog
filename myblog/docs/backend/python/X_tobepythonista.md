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

标准库中有两个测试包，unittest和doctest。

首先我们介绍unittest测试包。假设我们编写了一个单词首字母转大写的模块，第一版直接使用标准字符串函数`capitalize()`，之后会看到许多意料之外的结果，把下面的代码保存为cap.py:

```python
def just_do_it(text):
    return text.capitalize()
```

好，我们跟踪书上的示例，一步步的来做。

测试就是先确定输入对应的期望输出(本例期望的输出是输入文本的首字母大写版本)，然后把输入传入需要测试的函数，并检查返回值和期望输出是否相同。期望输出被称为`断言`。因此在`unittest`中，可以使用`assert`断言开头的方法来检查返回的结果。比如下面代码中的`assertEqual`方法。

把下面的代码保存为test_cap.py:

```python
import unittest

import cap


class TestCap(unittest.TestCase):
    def setUp(self) -> None:
        pass

    def tearDown(self) -> None:
        pass

    def test_one_word(self):
        text = 'duck'
        result = cap.just_do_it(text)
        self.assertEqual(result, 'Duck')

    def test_multiple_words(self):
        text = 'a veritable flock of ducks'
        result = cap.just_do_it(text)
        self.assertEqual(result, 'A Veritable Flock Of Ducks')


if __name__ == '__main__':
    unittest.main()

```

查看文件内容：

```sh
$ cat cap.py 
def just_do_it(text):
    return text.capitalize()%                                                                                                                                             $ cat test_cap.py 
import unittest

import cap


class TestCap(unittest.TestCase):
    def setUp(self) -> None:
        pass

    def tearDown(self) -> None:
        pass

    def test_one_word(self):
        text = 'duck'
        result = cap.just_do_it(text)
        self.assertEqual(result, 'Duck')

    def test_multiple_words(self):
        text = 'a veritable flock of ducks'
        result = cap.just_do_it(text)
        self.assertEqual(result, 'A Veritable Flock Of Ducks')


if __name__ == '__main__':
    unittest.main()
```

`setUp()`和`tearDown()`方法是在每个测试方法执行之前/后执行的函数，它们通常用来分配和回收测试需要的外部资源，比如数据库连接或者一些测试数据。在本例中，我们的测试方法已经足够进行测试，因此不需要再定义`setUp()`和`tearDown()`，但是放一个空方法也没有关系，我们测试的核心是函数`test_one_word()`和`test_multiple_words()`,它们会运行我们定义的`just_do_it()`函数，传入不同的输出并检查返回值是否和期望输出一样！

我们运行一下脚本，它会调用那两个测试方法：

```sh
$ python3 test_cap.py
F.
======================================================================
FAIL: test_multiple_words (__main__.TestCap)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_cap.py", line 21, in test_multiple_words
    self.assertEqual(result, 'A Veritable Flock Of Ducks')
AssertionError: 'A veritable flock of ducks' != 'A Veritable Flock Of Ducks'
- A veritable flock of ducks
?   ^         ^     ^  ^
+ A Veritable Flock Of Ducks
?   ^         ^     ^  ^


----------------------------------------------------------------------
Ran 2 tests in 0.001s

FAILED (failures=1)
$ 
```

看起来第一个测试`test_one_word`通过了，但是第二个`test_multiple_words`失败了。上箭头(^)指出了字符串不相同的地方！

为什么多个单词会失败？可以阅读字符串的capitalize函数文档来寻找线索，它只会把第一个单词的第一个字母转换成大定，或许我们应该先阅读文档。

```python
$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> str1='duck'

>>> str1.capitalize?
Docstring:
S.capitalize() -> str

Return a capitalized version of S, i.e. make the first character
have upper case and the rest lower case.
Type:      builtin_function_or_method

>>>
```

为了修复这个问题，我们需要改进代码！

我们可以使用`title()`函数，我们把`cap.py`中的`capitalize()`替换成`title()`：

```python
def just_do_it(text):
    # return text.capitalize()
    return text.title()
```

```sh
$ cat cap.py 
def just_do_it(text):
    # return text.capitalize()
    return text.title()
```

我们再次运行测试，看看结果如何：

```sh
$ python3 test_cap.py
..
----------------------------------------------------------------------
Ran 2 tests in 0.000s

OK
```

这时两个测试都运行通过了，看起来没问题了。不过，其实还是有问题的，我们还需要在`test_cap.py`中添加另一个方法，修改后内容如下：

```python
import unittest

import cap


class TestCap(unittest.TestCase):
    def setUp(self) -> None:
        pass

    def tearDown(self) -> None:
        pass

    def test_one_word(self):
        """测试单个单词的情况"""
        text = 'duck'
        result = cap.just_do_it(text)
        self.assertEqual(result, 'Duck')

    def test_multiple_words(self):
        """测试多个单词的情况"""
        text = 'a veritable flock of ducks'
        result = cap.just_do_it(text)
        self.assertEqual(result, 'A Veritable Flock Of Ducks')

    def test_words_with_apostrophes(self):
        """测试带撇号的情况"""
        text = "I'm fresh out of ideas"
        result = cap.just_do_it(text)
        self.assertEqual(result, "I'm Fresh Out Of Ideas")


if __name__ == '__main__':
    unittest.main()

```

我们再次运行测试：

```sh
$ python3 test_cap.py
..F
======================================================================
FAIL: test_words_with_apostrophes (__main__.TestCap)
测试带撇号的情况
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_cap.py", line 29, in test_words_with_apostrophes
    self.assertEqual(result, "I'm Fresh Out Of Ideas")
AssertionError: "I'M Fresh Out Of Ideas" != "I'm Fresh Out Of Ideas"
- I'M Fresh Out Of Ideas
?   ^
+ I'm Fresh Out Of Ideas
?   ^


----------------------------------------------------------------------
Ran 3 tests in 0.001s

FAILED (failures=1)
$ 
```

函数把`I'm`中的`m`大写了，查看官方文档也可以看到它默认不处理撇号：

> The algorithm uses a simple language-independent definition of a word as groups of consecutive letters. The definition works in many contexts but it means that apostrophes in contractions and possessives form word boundaries, which may not be the desired result:
>
> ```python
> >>> "they're bill's friends from the UK".title()
> "They'Re Bill'S Friends From The Uk"
> ```

我们应该好好读一下官方文档！

在标准库`string`文档[https://docs.python.org/3/library/string.html#string.capwords](https://docs.python.org/3/library/string.html#string.capwords)的底部有另一个函数，一个名为`capwords()`的辅助函数：

> string.`capwords`(*s*, *sep=None*)
>
> Split the argument into words using [`str.split()`](https://docs.python.org/3/library/stdtypes.html#str.split), capitalize each word using [`str.capitalize()`](https://docs.python.org/3/library/stdtypes.html#str.capitalize), and join the capitalized words using [`str.join()`](https://docs.python.org/3/library/stdtypes.html#str.join). If the optional second argument *sep* is absent or `None`, runs of whitespace characters are replaced by a single space and leading and trailing whitespace are removed, otherwise *sep* is used to split and join the words.

```python
$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> import string

>>> string.capwords?
Signature: string.capwords(s, sep=None)
Docstring:
capwords(s [,sep]) -> string

Split the argument into words using split, capitalize each
word using capitalize, and join the capitalized words using
join.  If the optional second argument sep is absent or None,
runs of whitespace characters are replaced by a single space
and leading and trailing whitespace are removed, otherwise
sep is used to split and join the words.
File:      /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/string.py
Type:      function

>>> string.capwords("I'm lilei")
"I'm Lilei"
```

初步测试发现使用这个函数好像是对的！

我们试试这个，将cap.py文件修改一下：

```python
from string import capwords
def just_do_it(text):
    # return text.capitalize()
    # return text.title()
    return capwords(text)

```

然后我们再运行一下测试：

```sh
$ python3 test_cap.py
...
----------------------------------------------------------------------
Ran 3 tests in 0.000s

OK
$ 
```

终于3个测试都通过了！但是，这个时候还是有问题，我们向`test_cap.py`中再增加一个测试：

```python
import unittest

import cap


class TestCap(unittest.TestCase):
    def setUp(self) -> None:
        pass

    def tearDown(self) -> None:
        pass

    def test_one_word(self):
        """测试单个单词的情况"""
        text = 'duck'
        result = cap.just_do_it(text)
        self.assertEqual(result, 'Duck')

    def test_multiple_words(self):
        """测试多个单词的情况"""
        text = 'a veritable flock of ducks'
        result = cap.just_do_it(text)
        self.assertEqual(result, 'A Veritable Flock Of Ducks')

    def test_words_with_apostrophes(self):
        """测试带撇号的情况"""
        text = "I'm fresh out of ideas"
        result = cap.just_do_it(text)
        self.assertEqual(result, "I'm Fresh Out Of Ideas")

    def test_words_with_quotes(self):
        """测试带引号的情况"""
        text = "\"You're despicable,\" said Daffy Duck"
        result = cap.just_do_it(text)
        self.assertEqual(result, "\"You're Despicable,\" Said Daffy Duck")


if __name__ == '__main__':
    unittest.main()

```

此时再测试：

```sh
$ python3 test_cap.py
...F
======================================================================
FAIL: test_words_with_quotes (__main__.TestCap)
测试带引号的情况
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_cap.py", line 35, in test_words_with_quotes
    self.assertEqual(result, "\"You're Despicable,\" Said Daffy Duck")
AssertionError: '"you\'re Despicable," Said Daffy Duck' != '"You\'re Despicable," Said Daffy Duck'
- "you're Despicable," Said Daffy Duck
?  ^
+ "You're Despicable," Said Daffy Duck
?  ^


----------------------------------------------------------------------
Ran 4 tests in 0.001s

FAILED (failures=1)
$ 
```

可以看到第一个双引号并没有被目前为止最好用的函数`capwords`正常处理。它试着把`"`转成大写，并把其他内容转成小写`You're`，此外，字符串中其余部分应该保持不变。

做测试的人可以发现实些边界条件，但是开发者在面对自己的代码时通常有盲区！

`unittest`提供了数量不多但非常有用的断言，你可以用它们检查值、确保类能够匹配、判断是否触发错误，等等！






