# Python面试总结

[[toc]]

## Python语言基础

### 1.列出几个常用Python标准库

`os`, `sys`, `string`, `logging`, `time`, `datetime`, `re`, `math`,`threading`

### 2.Python的内建数据类型有哪些

`str`字符串, `list`列表, `tuple`元素, `dict`字典, `set`集合, `int`整型, `float`浮点, `complex`复数(如:`1 + 2j`), `bool`布尔型。

### 3.简述`with`方法打开处理文件帮我我们做了什么

- `with`语句适用于对资源进行访问的场合，确保不管使用过程中是否发生异常都会执行必要的"清理"操作，释放资源，比如文件使用后自动关闭、线程中锁的自动获取和释放等。

- `with`语句即"上下文管理器"，在程序中用来表示代码执行过程中所处的前后环境。

上下文管理器：含有`__enter__`和`__exit__`方法的对象就是上下文管理器。

- `__enter__()`：在执行语句之前，首先执行该方法，通常返回一个实例对象，如果`with`语句有`as`目标，则将对象赋值给`as`目标。
- `__exit__()`：执行语句结束后，自动调用`__exit__()`方法，用户释放资源，若此方法返回布尔值`True`，程序会忽略异常。

使用环境：文件读写、线程锁的自动释放等。

### 4.Python的可变和不可变数据类型

- 可变: `list`列表, `dict`字典, `set`集合
- 不可变：`int`整型, `str`字符串, `tuple`元组


### 5.Python获取当前日期

- 使用`datetime`模块

```py
>>> from datetime import datetime
>>> datetime.now()
datetime.datetime(2020, 5, 16, 8, 26, 59, 83146)
>>> datetime.now().strftime('%Y%m%d_%H%M%S')
'20200516_082739'
```

- 使用`time`模块

```py
>>> import time
>>> time.strftime('%Y%m%d_%H%M%S', time.localtime())
'20200516_083042'
```

### 6.谈谈对Python的了解和其他语言的区别

- python是典型的动态类型强类型语言，强类型语言, 不需要隐式转换。

- 解释性，解释型语言使用解释器将源码逐行解释成机器码并立即执行，不会进行整体性的编译和链接处理，相当于把编译语言中的编译和解释混合到一起同时完成。

- 简洁优雅，面向对象，跨平台。
- Python是动态类型语言，而Java是静态类型语言。

### 7.说说你知道的Python3和Python2之间的区别

- 输出：`print`在python2中是一个输出语句，print后面可以带括号也可以不带；在python3中是一个函数，需要带括号。
- 用户输入：`input`在python2中，用户需要明确自己输入的字符类型，是字符串还是数字或者是布尔型，`raw_input`在python2中用户输入都被当前字符串；在python3中将原来的`input`删除了，然后将`raw_input`改成`input`函数,输出都是字符串类型，自己需要进行类型转换。
- 除法：python3中`/`表示真除，`//`表示取整；python2中`/`带上小数点表示真除，`//`表示取整。
- `xrange`迭代器：python2中可以使用`xrange`或`range`返回迭代器，python3中没有`xrange`，只有`range`。
- 字符串存储：python2以二进制存储，python3以unicode字符串存储。
- 异常捕获不一样，python2中`try except Exception,e:`， python3中`try except Exception as e:`。


### 8.了解`Python`之禅吗

```py
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!

优美胜于丑陋（Python 以编写优美的代码为目标）
明了胜于晦涩（优美的代码应当是明了的，命名规范，风格相似）
简洁胜于复杂（优美的代码应当是简洁的，不要有复杂的内部实现）
复杂胜于凌乱（如果复杂不可避免，那代码间也不能有难懂的关系，要保持接口简洁）
扁平胜于嵌套（优美的代码应当是扁平的，不能有太多的嵌套）
间隔胜于紧凑（优美的代码有适当的间隔，不要奢望一行代码解决问题）
可读性很重要（优美的代码是可读的）
即便假借特例的实用性之名，也不可违背这些规则（这些规则至高无上）
不要包容所有错误，除非你确定需要这样做（精准地捕获异常，不写 except:pass 风格的代码）
当存在多种可能，不要尝试去猜测
而是尽量找一种，最好是唯一一种明显的解决方案（如果不确定，就用穷举法）
虽然这并不容易，因为你不是 Python 之父（这里的 Dutch 是指 Guido ）
做也许好过不做，但不假思索就动手还不如不做（动手之前要细思量）
如果你无法向人描述你的方案，那肯定不是一个好方案；反之亦然（方案测评标准）
命名空间是一种绝妙的理念，我们应当多加利用（倡导与号召）
```


### 9.了解`docstring`吗

- 文档字符串是一个重要工具，用于解释文档程序，帮助你的程序文档更加简单易懂。
- 我们可以在函数体的第一行使用一对三个单引号或者一对三个双引号来定义文档字符串。 你可以使用`__doc__`调用函数中的文档字符串属性。

如:

```py
>>> import os
>>> os.__doc__
"OS routines for Mac, NT, or Posix depending on what system we're on.\n\nThis exports:\n  - all functions from posix, nt, os2, or ce, e.g. unlink, stat, etc.\n  - os.path is one of the modules posixpath, or ntpath\n  - os.name is 'posix', 'nt', 'os2', 'ce' or 'riscos'\n  - os.curdir is a string representing the current directory ('.' or ':')\n  - os.pardir is a string representing the parent directory ('..' or '::')\n  - os.sep is the (or a most common) pathname separator ('/' or ':' or '\\\\')\n  - os.extsep is the extension separator ('.' or '/')\n  - os.altsep is the alternate pathname separator (None or '/')\n  - os.pathsep is the component separator used in $PATH etc\n  - os.linesep is the line separator in text files ('\\r' or '\\n' or '\\r\\n')\n  - os.defpath is the default search path for executables\n  - os.devnull is the file path of the null device ('/dev/null', etc.)\n\nPrograms that import and use 'os' stand a better chance of being\nportable between different platforms.  Of course, they must then\nonly use functions that are defined by all platforms (e.g., unlink\nand opendir), and leave all pathname manipulation to os.path\n(e.g., split and join).\n"
>>> 
>>> os.name.__doc__
"str(object='') -> string\n\nReturn a nice string representation of the object.\nIf the argument is a string, the return value is the same object."
```

### 10.了解类型注解吗

- 在python中叫做`Function Annotations`函数注解。
- python3中注解用来给参数,返回值,变量的类型加上注解，对代码没影响。
- Python提供了一个工具方便我们测试类型注解的正确性，`pip install mypy ; mypy demo.py`若无错误则无输出。
- Python对注解所做的唯一的事情是，把他们存储在函数的`__annotations__`属性里，仅此而已，Python不做检查，不做强制，不做验证，什么操作都不做。换句话，注解对Python解释器没任何意义。注解只是元数据，可以供IDE、框架和装饰器等工具使用。

比如，下面的计算两个整数的和：

```py
# filename:test.py
def mysum(num1: int, num2: int = 2) -> int:
    """计算两个整数的和"""
    return str(num1 + num2)


r1 = mysum(1, 2)
print(r1)
r2 = mysum('a', 'b')
print(r2)
print(mysum.__annotations__)
```

运行输出结果如下:

```py
3
ab
{'num1': <class 'int'>, 'num2': <class 'int'>, 'return': <class 'int'>}
```

如果我们使用mypy对代码进行检查，检查结果如下：

```sh
mypy test.py
test.py:15: error: Incompatible return value type (got "str", expected "int")
test.py:20: error: Argument 1 to "mysum" has incompatible type "str"; expected "int"
test.py:20: error: Argument 2 to "mysum" has incompatible type "str"; expected "int"
Found 3 errors in 1 file (checked 1 source file)
```
检查发现，本来`mysum`期望返回一个`int`类型的数据(由`-> int`指定),但`return`语句却返回了一个`str`类型的值。
`mysum('a', 'b')`给函数传递了两个字符串类型的参数，实际上`mysum`期望的参数是`int`类型的，因此检查出来了三个异常。


### 11. 列举你知道Python对象的命名规范，例如方法或者类等

- 变量命名：字母数字下划线，不能以数字开头
- `_`受保护的
- `__`私有的
- `__init__`内置方法
- 函数和方法（类中叫做方法，模块中称作函数）。

### 12.列举几个规范Python代码风格的工具

autopep8, pylint, flake8

### 13.一个编码为GBK的字符串S，要将其转成UTF-8编码的字符串，应如何操作

```py
import chardet

gbk_str = '这是中文字符'.encode('gbk')
print(gbk_str)
print(gbk_str.decode('gbk'))

utf8_str = gbk_str.decode('gbk').encode('utf-8')
print(utf8_str)
print(utf8_str.decode())
print(utf8_str.decode('utf-8'))

print(chardet.detect(gbk_str))
print(chardet.detect(utf8_str))
```

输出结果如下:

```py
b'\xd5\xe2\xca\xc7\xd6\xd0\xce\xc4\xd7\xd6\xb7\xfb'
这是中文字符
b'\xe8\xbf\x99\xe6\x98\xaf\xe4\xb8\xad\xe6\x96\x87\xe5\xad\x97\xe7\xac\xa6'
这是中文字符
这是中文字符
{'encoding': 'GB2312', 'confidence': 0.99, 'language': 'Chinese'}
{'encoding': 'utf-8', 'confidence': 0.99, 'language': ''}
```


### 14.用正则切分字符串去除非符号(除字母，数字，下划线外其他的字符)

```py
>>> import re
>>> string = "hello, python!! good!"
>>> re.compile('\W').split(string)
['hello', '', 'python', '', '', 'good', '']
>>> [ item for item in re.compile('\W').split(string) if item != '']
['hello', 'python', 'good']
```


### 15.单引号、双引号、三引号的区别

- 在不需要转义的时候，单引号和双引号无区别。
- 三引号主要用于包裹文档字符串或者多行字符串。

### 16.[[1,2],[3,4],[5,6]]一行代码展开该列表，得出[1,2,3,4,5,6]

```py
>>> question_list =  [[1,2],[3,4],[5,6]]
>>> [item for inside in question_list for item in inside]
[1, 2, 3, 4, 5, 6]
```

### 17.哪些不能作为字典的健

- 字典中的键是不可变类型，可变类型`list`和`dict`不能作为字典键。
- 一个对象能不能作为字典的`key`，就取决于其有没有`__hash__`方法，没有`__hash__`方法不能作为字典的键。


### 18.如何交换字典 {"A"：1,"B"：2}的键和值

```py
>>> demo_dic = {'A':1, 'B':2}                                
>>> demo_dic                                                 
{'A': 1, 'B': 2}                                             
>>> result_dict = {v:k for k,v in demo_dic.items()}          
>>> result_dict                                              
{1: 'A', 2: 'B'}                                             
```

### 19.对生成器类型的对象实现切片功能

```py
>>> import itertools                                      
>>> itertools.islice(range(10),5, 10)                     
<itertools.islice object at 0x000002E379903A48>           
>>> for i in itertools.islice(range(10),5, 10):           
...     print(i)                                          
...                                                       
5                                                         
6                                                         
7                                                         
8                                                         
9                                                         
```


### 20.关于list tuple `copy`和`deepcopy`的区别是什么


tuple是不可变的：

```py
>>> a = (1, 2, 3, [4, 5, 6, 7], 8)
>>> id(a)
3176020056640
>>> a[3] = 3
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
>>> a[3][3] = 9
>>> a
(1, 2, 3, [4, 5, 6, 9], 8)
```

- 列表是可变数据类型，数据的值可以修改的; 这里只是修改了元祖子对象的值，而不是修改了元祖的值。
- 修改可变类型的值不会改变内存id，因此元祖的引用还是没有发生变化。可以这么理解，只要不修改元祖中值的内存id，那么就可以进行"修改元祖"操作扩展，

面试官可能会问到：元祖是否可以被修改

答：元祖是不可变数据类型，因此不能修改元祖中的值，但是如果元组中有可变数据类型，那么可以修改可变数据类型中的值，修改可变数据类型的值并不会使其内存id发生变化，所以元祖中元素中的内存id也没有改变，因此就做到了"修改元祖"操作。

list:

```
>>> a = [1, 2, [3, 4]]
>>> b = a
>>> c = a[:]
>>> d = a.co
a.copy(  a.count(
>>> d = a.copy()
>>> import copy
>>> a.
a.append(  a.copy(a.extend(  a.insert(  a.remove(  a.sort(
a.clear(   a.count(   a.index(   a.pop( a.reverse(
>>> e = copy.d
copy.deepcopy(copy.dispatch_table
>>> e = copy.deepcopy(a)
>>> b
[1, 2, [3, 4]]
>>> c
[1, 2, [3, 4]]
>>> d
[1, 2, [3, 4]]
>>> e
[1, 2, [3, 4]]

# 查看id值，只有a和b是同一指向
>>> id(a)
3176020060488
>>> id(b)
3176020060488
>>> id(c)
3176020165768
>>> id(d)
3176020149256
>>> id(e)
3176020265160


# 对a追加数据，只有b跟着变化
>>> a.append(5)
>>> a
[1, 2, [3, 4], 5]
>>> b
[1, 2, [3, 4], 5]
>>> c
[1, 2, [3, 4]]
>>> d
[1, 2, [3, 4]]
>>> e
[1, 2, [3, 4]]
>>>

# 对列表中的子元素列表进行修改，只有deepcopy的值没有更新
>>> a[2][1] = -3
>>> a
[1, 2, [3, -3], 5]
>>> b
[1, 2, [3, -3], 5]
>>> c
[1, 2, [3, -3]]
>>> d
[1, 2, [3, -3]]
>>> e
[1, 2, [3, 4]]
>>>

# 最后检查id值，都没有变化
>>> id(a)
3176020060488
>>> id(b)
3176020060488
>>> id(c)
3176020165768
>>> id(d)
3176020149256
>>> id(e)
3176020265160
>>>
```

- `copy`仅拷贝对象本身，而不拷贝对象中引用的其它对象。
- `deepcopy`除拷贝对象本身，而且拷贝对象中引用的其它对象，可以理解为`deepcopy`复制后与原来的对象就没有关联。


### 21.代码中经常遇到的`*args`,`**kwargs`含义及用法

- `args`是`arguments`的缩写，表示位置参数。
- `kwargs`是`keyword arguments`的缩写，表示关键字参数。
- 一个函数如果定义了`*args`表示该函数可以接收多个(可变)位置参数。
- 一个函数如果定义了`**kwargs`表示该函数可以接收多个(可变)关键字参数。

看下面的示例:

```py
def print_args_kwargs(*args, **kwargs):
    print('args:', args, 'type(args):', type(args))
    for value in args:
        print("positional argument:", value)
    print('kwargs:', kwargs, 'type(kwargs):', type(kwargs))
    for key in kwargs:
        print("keyword argument:\t{}:{}".format(key, kwargs[key]))


print_args_kwargs(1, 2, 3, 'a', 'b', key1='num1', key2='num2')

# 输出：
# args: (1, 2, 3, 'a', 'b') type(args): <class 'tuple'>
# positional argument: 1
# positional argument: 2
# positional argument: 3
# positional argument: a
# positional argument: b
# kwargs: {'key1': 'num1', 'key2': 'num2'} type(kwargs): <class 'dict'>
# keyword argument:	key1:num1
# keyword argument:	key2:num2
```