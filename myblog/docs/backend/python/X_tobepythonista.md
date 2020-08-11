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

### 使用`unittest`进行代码测试

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



### 使用`doctest`进行代码测试

我们也可以使用标准库中的`doctest`进行代码测试，可参考[https://docs.python.org/3/library/doctest.html](https://docs.python.org/3/library/doctest.html)。

使用这个包可以将测试写到文档字符串中，也可以起到文档的作用。它看起来有点像交互式解释器，字符`>>>`后面是一个函数调用，下一行是执行结果。你可以在交互式解释器中运行测试并把结果粘贴到测试文件中。

我们修改一下`cap.py`文件(暂时不考虑带引号的情况)。

修改后的`cap.py`内容如下：

```python
from string import capwords


def just_do_it(text):
    """
    >>> just_do_it('duck')
    'Duck'
    >>> just_do_it('a veritable flock of ducks')
    'A Veritable Flock Of Ducks'
    >>> just_do_it("I'm fresh out of ideas")
    "I'm Fresh Out Of Ideas"
    """
    return capwords(text)


if __name__ == '__main__':
    import doctest
    doctest.testmod()

```

运行时，如果测试全部通过不会产生任何输出：

```sh
$ python3 cap.py  
```

加上冗余选项(`-v`)，会输出比较详细的测试结果：

```sh
$ python3 cap.py -v
Trying:
    just_do_it('duck')
Expecting:
    'Duck'
ok
Trying:
    just_do_it('a veritable flock of ducks')
Expecting:
    'A Veritable Flock Of Ducks'
ok
Trying:
    just_do_it("I'm fresh out of ideas")
Expecting:
    "I'm Fresh Out Of Ideas"
ok
1 items had no tests:
    __main__
1 items passed all tests:
   3 tests in __main__.just_do_it
3 tests in 2 items.
3 passed and 0 failed.
Test passed.
$ 
```

如果我们将第一个测试中的`'Duck'`写错，看看输出会怎样，如`'Duck'`改成`'DUCK'`。

```sh
$ python3 cap.py -v
Trying:
    just_do_it('duck')
Expecting:
    'DUCK'
**********************************************************************
File "cap.py", line 6, in __main__.just_do_it
Failed example:
    just_do_it('duck')
Expected:
    'DUCK'
Got:
    'Duck'
Trying:
    just_do_it('a veritable flock of ducks')
Expecting:
    'A Veritable Flock Of Ducks'
ok
Trying:
    just_do_it("I'm fresh out of ideas")
Expecting:
    "I'm Fresh Out Of Ideas"
ok
1 items had no tests:
    __main__
**********************************************************************
1 items had failures:
   1 of   3 in __main__.just_do_it
3 tests in 2 items.
2 passed and 1 failed.
***Test Failed*** 1 failures.
$ 
```

此时可以看到测试失败！

### 使用`nose`进行测试

也可以使用第三方包`nose`进行代码测试。安装包：

```sh
$ pip install nose
Looking in indexes: http://mirrors.aliyun.com/pypi/simple/
Collecting nose
  Downloading http://mirrors.aliyun.com/pypi/packages/15/d8/dd071918c040f50fa1cf80da16423af51ff8ce4a0f2399b7bf8de45ac3d9/nose-1.3.7-py3-none-any.whl (154 kB)
     |████████████████████████████████| 154 kB 4.2 MB/s
Installing collected packages: nose
Successfully installed nose-1.3.7
```

参考 [https://nose.readthedocs.io/en/latest/](https://nose.readthedocs.io/en/latest/)



我们修改一下之前的`test_cap.py`并保存为`test_cap_nose.py`:

```python
from nose.tools import eq_

import cap


def test_one_word():
    """测试单个单词的情况"""
    text = 'duck'
    result = cap.just_do_it(text)
    eq_(result, 'Duck')


def test_multiple_words():
    """测试多个单词的情况"""
    text = 'a veritable flock of ducks'
    result = cap.just_do_it(text)
    eq_(result, 'A Veritable Flock Of Ducks')


def test_words_with_apostrophes():
    """测试带撇号的情况"""
    text = "I'm fresh out of ideas"
    result = cap.just_do_it(text)
    eq_(result, "I'm Fresh Out Of Ideas")


def test_words_with_quotes():
    """测试带引号的情况"""
    text = "\"You're despicable,\" said Daffy Duck"
    result = cap.just_do_it(text)
    eq_(result, "\"You're Despicable,\" Said Daffy Duck")

```

运行测试：

```sh
$ nosetests --version
nosetests version 1.3.7
$ nosetests test_cap_nose.py 
...F
======================================================================
FAIL: 测试带引号的情况
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/nose/case.py", line 198, in runTest
    self.test(*self.arg)
  File "test_cap_nose.py", line 31, in test_words_with_quotes
    eq_(result, "\"You're Despicable,\" Said Daffy Duck")
AssertionError: '"you\'re Despicable," Said Daffy Duck' != '"You\'re Despicable," Said Daffy Duck'

----------------------------------------------------------------------
Ran 4 tests in 0.002s

FAILED (failures=1)
$ 
```

这和我们使用`unitest`进行测试得到的错误是一样的！

但是在`nose`官网我们可以看到`nose`很久没有人维护了：

> Nose has been in maintenance mode for the past several years and will likely cease without a new person/team to take over maintainership. New projects should consider using [Nose2](https://github.com/nose-devs/nose2), [py.test](http://pytest.org/), or just plain unittest/unittest2.

新的项目推荐使用 `nose2`、 `pytest`等进行代码测试。

我们看一下`nose2`。

官方文档链接 [https://docs.nose2.io/en/latest/](https://docs.nose2.io/en/latest/)。

> `nose2` is the successor to `nose`.
>
> It’s `unittest` with plugins.
>
> `nose2` is a new project and does not support all of the features of `nose`. See [differences](https://nose2.readthedocs.io/en/latest/differences.html) for a thorough rundown.
>
> nose2’s purpose is to extend `unittest` to make testing nicer and easier to understand.
>
> nose2 vs pytest
>
> `nose2` may or may not be a good fit for your project.
>
> If you are new to python testing, we encourage you to also consider [pytest](http://pytest.readthedocs.io/en/latest/), a popular testing framework.



`nose2`继承自`nose`，但是又与`nose`不完全相同，`nose2`是`unittest`单元测试模块的插件，能够扩展单元测试，使测试更好更容易理解。

`nose2`有可能适合或不适合你的项目。如果你不熟悉python测试，建议考虑使用`pytest`测试框架。

我们安装一下`nose2`包：

```sh
$ pip install nose2
Looking in indexes: http://mirrors.aliyun.com/pypi/simple/
Collecting nose2
  Downloading http://mirrors.aliyun.com/pypi/packages/b9/ad/27561695e863f5df064f1715864afb3ebe723a6e19e875eca85570e0a7cd/nose2-0.9.2-py2.py3-none-any.whl (137 kB)
     |████████████████████████████████| 137 kB 1.2 MB/s
Requirement already satisfied: six>=1.7 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from nose2) (1.14.0)
Requirement already satisfied: coverage>=4.4.1 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from nose2) (5.0.4)
Installing collected packages: nose2
Successfully installed nose2-0.9.2

$ nose2 --help
usage: nose2 [-s START_DIR] [-t TOP_LEVEL_DIRECTORY] [--config [CONFIG]]
             [--no-user-config] [--no-plugins] [--plugin PLUGINS]
             [--exclude-plugin EXCLUDE_PLUGINS] [--verbosity VERBOSITY]
             [--verbose] [--quiet] [--log-level LOG_LEVEL] [-B]
             [--coverage PATH] [--coverage-report TYPE]
             [--coverage-config FILE] [-C] [-D] [-F] [--log-capture]
             [--pretty-assert] [-h]
             [testNames [testNames ...]]

positional arguments:
  testNames

optional arguments:
  -s START_DIR, --start-dir START_DIR
                        Directory to start discovery ('.' default)
  -t TOP_LEVEL_DIRECTORY, --top-level-directory TOP_LEVEL_DIRECTORY, --project-directory TOP_LEVEL_DIRECTORY
                        Top level directory of project (defaults to start dir)
  --config [CONFIG], -c [CONFIG]
                        Config files to load, if they exist. ('unittest.cfg'
                        and 'nose2.cfg' in start directory default)
  --no-user-config      Do not load user config files
  --no-plugins          Do not load any plugins. Warning: nose2 does not do
                        anything if no plugins are loaded
  --plugin PLUGINS      Load this plugin module.
  --exclude-plugin EXCLUDE_PLUGINS
                        Do not load this plugin module
  --verbosity VERBOSITY
                        Set starting verbosity level (int). Applies before -v
                        and -q
  --verbose, -v         Print test case names and statuses. Use multiple '-v's
                        for higher verbosity.
  --quiet, -q           Reduce verbosity. Multiple '-q's result in lower
                        verbosity.
  --log-level LOG_LEVEL
                        Set logging level for message logged to console.
  -h, --help            Show this help message and exit

plugin arguments:
  Command-line arguments added by plugins:

  -B, --output-buffer   Enable output buffer
  --coverage PATH       Measure coverage for filesystem path (multi-allowed)
  --coverage-report TYPE
                        Generate selected reports, available types: term,
                        term-missing, annotate, html, xml (multi-allowed)
  --coverage-config FILE
                        Config file for coverage, default: .coveragerc
  -C, --with-coverage   Turn on coverage reporting
  -D, --debugger        Enter pdb on test fail or error
  -F, --fail-fast       Stop the test run after the first error or failure
  --log-capture         Enable log capture
  --pretty-assert       Add pretty output for "assert" statements
$
```

看官方示例，`nose2`可以直接对`unittest`编写的单元测试进行测试：

```sh
$ nose2 -v
test_multiple_words (test_cap.TestCap)
测试多个单词的情况 ... ok
test_one_word (test_cap.TestCap)
测试单个单词的情况 ... ok
test_words_with_apostrophes (test_cap.TestCap)
测试带撇号的情况 ... ok
test_words_with_quotes (test_cap.TestCap)
测试带引号的情况 ... FAIL
test_cap_nose.transplant_class.<locals>.C (test_multiple_words)
测试多个单词的情况 ... ok
test_cap_nose.transplant_class.<locals>.C (test_one_word)
测试单个单词的情况 ... ok
test_cap_nose.transplant_class.<locals>.C (test_words_with_apostrophes)
测试带撇号的情况 ... ok
test_cap_nose.transplant_class.<locals>.C (test_words_with_quotes)
测试带引号的情况 ... FAIL

======================================================================
FAIL: test_words_with_quotes (test_cap.TestCap)
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


======================================================================
FAIL: test_cap_nose.transplant_class.<locals>.C (test_words_with_quotes)
测试带引号的情况
----------------------------------------------------------------------
Traceback (most recent call last):
  File "test_cap_nose.py", line 31, in test_words_with_quotes
    eq_(result, "\"You're Despicable,\" Said Daffy Duck")
AssertionError: '"you\'re Despicable," Said Daffy Duck' != '"You\'re Despicable," Said Daffy Duck'

----------------------------------------------------------------------
Ran 8 tests in 0.001s

FAILED (failures=2)
$ 
```

可以看到`nose2`直接运行了我们前面编写的两个测试文件。并且显示出了异常的位置。



### 使用`pytest`测试代码

`pytest`框架使编写小型测试变得容易，并且可以扩展以支持应用程序和库的复杂功能测试。

`pytest`官方文档 [https://docs.pytest.org/en/latest/](https://docs.pytest.org/en/latest/)。

安装包：

```sh
$ pip install pytest
Looking in indexes: http://mirrors.aliyun.com/pypi/simple/
Requirement already satisfied: pytest in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (5.4.1)
Requirement already satisfied: more-itertools>=4.0.0 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from pytest) (8.2.0)
Requirement already satisfied: packaging in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from pytest) (20.3)
Requirement already satisfied: attrs>=17.4.0 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from pytest) (19.3.0)
Requirement already satisfied: py>=1.5.0 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from pytest) (1.8.1)
Requirement already satisfied: pluggy<1.0,>=0.12 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from pytest) (0.13.1)
Requirement already satisfied: importlib-metadata>=0.12; python_version < "3.8" in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from pytest) (1.5.2)
Requirement already satisfied: wcwidth in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from pytest) (0.1.8)
Requirement already satisfied: six in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from packaging->pytest) (1.14.0)
Requirement already satisfied: pyparsing>=2.0.2 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from packaging->pytest) (2.4.6)
Requirement already satisfied: zipp>=0.5 in /Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages (from importlib-metadata>=0.12; python_version < "3.8"->pytest) (3.1.0)
$
```

如果你安装后，使用`pytest --version`查看版本，如果不是最新版本，可以在pypi网站 [https://pypi.org/project/pytest/#files](https://pypi.org/project/pytest/#files)  上面下载最新的版本的源代码进行安装。

查看`pytest`版本：

```sh
$ pytest --version
pytest 6.0.1
```

我们编写`pytest`的测试代码`test_cap_pytest.py`:

```python
import cap


def test_one_word():
    """测试单个单词的情况"""
    text = 'duck'
    result = cap.just_do_it(text)
    assert result == 'Duck'


def test_multiple_words():
    """测试多个单词的情况"""
    text = 'a veritable flock of ducks'
    result = cap.just_do_it(text)
    assert result == 'A Veritable Flock Of Ducks'


def test_words_with_apostrophes():
    """测试带撇号的情况"""
    text = "I'm fresh out of ideas"
    result = cap.just_do_it(text)
    assert result == "I'm Fresh Out Of Ideas"


def test_words_with_quotes():
    """测试带引号的情况"""
    text = "\"You're despicable,\" said Daffy Duck"
    result = cap.just_do_it(text)
    assert result == "\"You're Despicable,\" Said Daffy Duck"

```

然后我们运行测试：

```sh
$ pytest test_cap_pytest.py 
/Library/Frameworks/Python.framework/Versions/3.6/lib/python3.6/site-packages/pytest-6.0.1-py3.6.egg/_pytest/compat.py:340: PytestDeprecationWarning: The TerminalReporter.writer attribute is deprecated, use TerminalReporter._tw instead at your own risk.
See https://docs.pytest.org/en/stable/deprecations.html#terminalreporter-writer for more information.
  return getattr(object, name, default)
=============================== test session starts ===============================
platform darwin -- Python 3.6.8, pytest-6.0.1, py-1.9.0, pluggy-0.13.1
rootdir: ~
plugins: xonsh-0.9.15
collected 4 items                                                                 

test_cap_pytest.py ...F                                                     [100%]

==================================== FAILURES =====================================
_____________________________ test_words_with_quotes ______________________________

    def test_words_with_quotes():
        """测试带引号的情况"""
        text = "\"You're despicable,\" said Daffy Duck"
        result = cap.just_do_it(text)
>       assert result == "\"You're Despicable,\" Said Daffy Duck"
E       assert '"you\'re Des...id Daffy Duck' == '"You\'re Des...id Daffy Duck'
E         - "You're Despicable," Said Daffy Duck
E         ?  ^
E         + "you're Despicable," Said Daffy Duck
E         ?  ^

test_cap_pytest.py:29: AssertionError
============================= short test summary info =============================
FAILED test_cap_pytest.py::test_words_with_quotes - assert '"you\'re Des...id Da...
=========================== 1 failed, 3 passed in 0.13s ===========================
$
```

可以看到`pytest`只需要使用`assert`断言来进行测试即可。更详细的例子请参考官方文档 [https://docs.pytest.org/en/latest/](https://docs.pytest.org/en/latest/)。



## 持续集成

当你的团队每天会产生很多代码时，就需要在出现改动时进行自动测试。你可以让源码控制系统，在提交代码时进行自动化的测试。这样每个人都知道是谁破坏了构建并消失在叫饭的人群中。

你可以了解一下以下系统：

- Jenkins [https://www.jenkins.io/](https://www.jenkins.io/)  Jenkins是一个开源软件项目，是基于Java开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。
- Travis-ci [https://travis-ci.org/](https://travis-ci.org/) Travis CI 是目前新兴的开源持续集成构建项目，它与jenkins，GO的很明显的区别在于采用yaml格式，简洁清新独树一帜。目前大多数的github项目都已经移入到Travis CI的构建队列中，据说Travis CI每天运行超过4000次完整构建。对开源项目是免费的！



## 调试Python代码

> 调试的难度是写代码的两倍。以此类推，如果你绞尽脑汁编写巧妙的代码，那你一定无法调试它。   ——Brian Kernighan

测试在先，测试越完善，之后需要修复的bug越少。不过，bug总是无法避免的，发现bug就要去修复它。之前就说过，Python中最简单的调试方法就是打印字符串。`var()`是非常有用的一个函数，可以提取本地变量的值，包括函数参数。

```python
$ ipython
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
Type 'copyright', 'credits' or 'license' for more information
IPython 7.13.0 -- An enhanced Interactive Python. Type '?' for help.

>>> def func(*args, **kwargs):
...     print(vars())
...

>>> func(1, 2, 3)
{'kwargs': {}, 'args': (1, 2, 3)}

>>> func(['a', 'b', 'argh'])
{'kwargs': {}, 'args': (['a', 'b', 'argh'],)}

>>> func(['a', 'b', 'c'], key='test')
{'kwargs': {'key': 'test'}, 'args': (['a', 'b', 'c'],)}
```

书中也提到使用装饰器来调试代码，但感觉有点麻烦。

我常用的调试方法包括：

- 使用`print`打印变量。
- 使用`logging`模块( [https://docs.python.org/3.6/library/logging.html](https://docs.python.org/3.6/library/logging.html) )保存日志到文件中，查看日志调试。

一般来说，编写简单代码时就用`print`足够了，但如果是在生产环境下的代码，建议使用`logging`模块保存日志到文件，便于异常时调试。