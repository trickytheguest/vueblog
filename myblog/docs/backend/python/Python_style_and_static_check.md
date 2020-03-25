# Python代码检查
[[toc]]
## 代码规范检查

### pylint
- Pylint 是一个 Python 代码分析工具，它分析 Python 代码中的错误，查找不符合代码风格标准和有潜在问题的代码。检查的要求比较严格，即检查问题也同时按PEP8检查代码风格。

- Pylint 是一个 Python 工具，除了平常代码分析工具的作用之外，它提供了更多的功能：如检查一行代码的长度，变量名是否符合命名标准，一个声明过的接口是否被真正实现等等。

- Pylint 的一个很大的好处是它的高可配置性，高可定制性，并且可以很容易写小插件来添加功能。

- 如果运行两次 Pylint，它会同时显示出当前和上次的运行结果，从而可以看出代码质量是否得到了改进。 

命令行参数说明：
#### 安装

```shell
$ pip install pylint
```

#### 检查
```shell
$ pylint ./bluelog|nl
     1	************* Module bluelog
     2	bluelog/__init__.py:59:0: C0301: Line too long (130/100) (line-too-long)
     3	bluelog/__init__.py:64:0: C0301: Line too long (105/100) (line-too-long)
     4	bluelog/__init__.py:159:0: C0304: Final newline missing (missing-final-newline)
     5	bluelog/__init__.py:19:0: E0401: Unable to import 'flask_wtf.csrf' (import-error)
     6	bluelog/__init__.py:31:0: C0116: Missing function or method docstring (missing-function-docstring)
     7	bluelog/__init__.py:52:4: C0115: Missing class docstring (missing-class-docstring)
     8	bluelog/__init__.py:93:0: C0116: Missing function or method docstring (missing-function-docstring)
     9	bluelog/__init__.py:98:0: C0116: Missing function or method docstring (missing-function-docstring)
    10	bluelog/__init__.py:111:0: C0116: Missing function or method docstring (missing-function-docstring)
    11	bluelog/__init__.py:119:0: C0116: Missing function or method docstring (missing-function-docstring)
    12	bluelog/__init__.py:121:4: W0612: Unused variable 'make_template_context' (unused-variable)
    13	bluelog/__init__.py:136:0: C0116: Missing function or method docstring (missing-function-docstring)
    14	bluelog/__init__.py:138:4: C0103: Argument name "e" doesn't conform to snake_case naming style (invalid-name)
    15	bluelog/__init__.py:138:23: W0613: Unused argument 'e' (unused-argument)
    16	bluelog/__init__.py:142:4: C0103: Argument name "e" doesn't conform to snake_case naming style (invalid-name)
    17	bluelog/__init__.py:142:30: W0613: Unused argument 'e' (unused-argument)
    18	bluelog/__init__.py:146:4: C0103: Argument name "e" doesn't conform to snake_case naming style (invalid-name)
    19	bluelog/__init__.py:138:4: W0612: Unused variable 'page_not_found' (unused-variable)
    20	bluelog/__init__.py:142:4: W0612: Unused variable 'internal_server_error' (unused-variable)
    21	bluelog/__init__.py:146:4: W0612: Unused variable 'csrf_error' (unused-variable)
    22	bluelog/__init__.py:154:4: W0612: Unused variable 'searchword' (unused-variable)
    23	************* Module bluelog.models
    24	bluelog/models.py:18:0: E0401: Unable to import 'flask_login' (import-error)
    25	bluelog/models.py:22:0: C0115: Missing class docstring (missing-class-docstring)
    26	bluelog/models.py:33:4: C0116: Missing function or method docstring (missing-function-docstring)
    27	bluelog/models.py:47:0: C0115: Missing class docstring (missing-class-docstring)
    28	bluelog/models.py:53:4: C0116: Missing function or method docstring (missing-function-docstring)
    29	bluelog/models.py:47:0: R0903: Too few public methods (1/2) (too-few-public-methods)
    30	bluelog/models.py:63:0: C0115: Missing class docstring (missing-class-docstring)
    31	bluelog/models.py:63:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    32	bluelog/models.py:80:0: C0115: Missing class docstring (missing-class-docstring)
    33	bluelog/models.py:80:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    34	bluelog/models.py:17:0: C0411: third party import "from werkzeug.security import generate_password_hash, check_password_hash" should be placed before "from bluelog.extensions import db" (wrong-import-order)
    35	************* Module bluelog.emails
    36	bluelog/emails.py:16:0: E0401: Unable to import 'flask_mail' (import-error)
    37	bluelog/emails.py:26:0: C0103: Argument name "to" doesn't conform to snake_case naming style (invalid-name)
    38	bluelog/emails.py:28:10: W0212: Access to a protected member _get_current_object of a client class (protected-access)
    39	bluelog/emails.py:35:0: C0116: Missing function or method docstring (missing-function-docstring)
    40	bluelog/emails.py:49:0: C0116: Missing function or method docstring (missing-function-docstring)
    41	************* Module bluelog.forms
    42	bluelog/forms.py:15:0: E0401: Unable to import 'flask_ckeditor' (import-error)
    43	bluelog/forms.py:16:0: E0401: Unable to import 'flask_wtf' (import-error)
    44	bluelog/forms.py:17:0: E0401: Unable to import 'wtforms' (import-error)
    45	bluelog/forms.py:19:0: E0401: Unable to import 'wtforms.validators' (import-error)
    46	bluelog/forms.py:29:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    47	bluelog/forms.py:40:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    48	bluelog/forms.py:47:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    49	bluelog/forms.py:57:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    50	bluelog/forms.py:72:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    51	bluelog/forms.py:81:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    52	bluelog/forms.py:93:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    53	************* Module bluelog.extensions
    54	bluelog/extensions.py:14:0: E0401: Unable to import 'flask_bootstrap' (import-error)
    55	bluelog/extensions.py:15:0: E0401: Unable to import 'flask_sqlalchemy' (import-error)
    56	bluelog/extensions.py:16:0: E0401: Unable to import 'flask_moment' (import-error)
    57	bluelog/extensions.py:17:0: E0401: Unable to import 'flask_ckeditor' (import-error)
    58	bluelog/extensions.py:18:0: E0401: Unable to import 'flask_mail' (import-error)
    59	bluelog/extensions.py:19:0: E0401: Unable to import 'flask_login' (import-error)
    60	bluelog/extensions.py:20:0: E0401: Unable to import 'flask_wtf.csrf' (import-error)
    61	bluelog/extensions.py:23:0: C0103: Constant name "bootstrap" doesn't conform to UPPER_CASE naming style (invalid-name)
    62	bluelog/extensions.py:24:0: C0103: Constant name "db" doesn't conform to UPPER_CASE naming style (invalid-name)
    63	bluelog/extensions.py:25:0: C0103: Constant name "moment" doesn't conform to UPPER_CASE naming style (invalid-name)
    64	bluelog/extensions.py:26:0: C0103: Constant name "ckeditor" doesn't conform to UPPER_CASE naming style (invalid-name)
    65	bluelog/extensions.py:27:0: C0103: Constant name "mail" doesn't conform to UPPER_CASE naming style (invalid-name)
    66	bluelog/extensions.py:28:0: C0103: Constant name "login_manager" doesn't conform to UPPER_CASE naming style (invalid-name)
    67	bluelog/extensions.py:29:0: C0103: Constant name "csrf" doesn't conform to UPPER_CASE naming style (invalid-name)
    68	bluelog/extensions.py:41:4: C0415: Import outside toplevel (bluelog.models) (import-outside-toplevel)
    69	************* Module bluelog.utils
    70	bluelog/utils.py:29:0: C0330: Wrong hanging indentation (add 4 spaces).
    71	    'http', 'https') and ref_url.netloc == test_url.netloc
    72	    ^   | (bad-continuation)
    73	bluelog/utils.py:25:0: C0116: Missing function or method docstring (missing-function-docstring)
    74	bluelog/utils.py:32:0: C0116: Missing function or method docstring (missing-function-docstring)
    75	************* Module bluelog.settings
    76	bluelog/settings.py:23:0: C0115: Missing class docstring (missing-class-docstring)
    77	bluelog/settings.py:23:0: R0205: Class 'Config' inherits from object, can be safely removed from bases in python3 (useless-object-inheritance)
    78	bluelog/settings.py:23:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    79	bluelog/settings.py:97:0: C0115: Missing class docstring (missing-class-docstring)
    80	bluelog/settings.py:97:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    81	bluelog/settings.py:102:0: C0115: Missing class docstring (missing-class-docstring)
    82	bluelog/settings.py:102:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    83	bluelog/settings.py:107:0: C0115: Missing class docstring (missing-class-docstring)
    84	bluelog/settings.py:107:0: R0903: Too few public methods (0/2) (too-few-public-methods)
    85	bluelog/settings.py:113:0: C0103: Constant name "config" doesn't conform to UPPER_CASE naming style (invalid-name)
    86	************* Module bluelog.fakes
    87	bluelog/fakes.py:129:0: C0305: Trailing newlines (trailing-newlines)
    88	bluelog/fakes.py:15:0: E0401: Unable to import 'faker' (import-error)
    89	bluelog/fakes.py:19:0: E0401: Unable to import 'sqlalchemy.exc' (import-error)
    90	bluelog/fakes.py:21:0: C0103: Constant name "fake" doesn't conform to UPPER_CASE naming style (invalid-name)
    91	bluelog/fakes.py:49:8: W0612: Unused variable 'i' (unused-variable)
    92	bluelog/fakes.py:60:8: W0612: Unused variable 'i' (unused-variable)
    93	bluelog/fakes.py:74:8: W0612: Unused variable 'i' (unused-variable)
    94	************* Module bluelog.commands
    95	bluelog/commands.py:20:0: C0116: Missing function or method docstring (missing-function-docstring)
    96	bluelog/commands.py:38:8: C0415: Import outside toplevel (bluelog.fakes) (import-outside-toplevel)
    97	bluelog/commands.py:36:39: W0613: Unused argument 'tag' (unused-argument)
    98	bluelog/commands.py:22:4: W0612: Unused variable 'initdb' (unused-variable)
    99	bluelog/commands.py:36:4: W0612: Unused variable 'forge' (unused-variable)
   100	************* Module bluelog.blueprints.auth
   101	bluelog/blueprints/auth.py:16:0: E0401: Unable to import 'flask_login' (import-error)
   102	bluelog/blueprints/auth.py:22:0: C0103: Constant name "auth_bp" doesn't conform to UPPER_CASE naming style (invalid-name)
   103	************* Module bluelog.blueprints.admin
   104	bluelog/blueprints/admin.py:260:0: R1707: Disallow trailing comma tuple (trailing-comma-tuple)
   105	bluelog/blueprints/admin.py:261:0: R1707: Disallow trailing comma tuple (trailing-comma-tuple)
   106	bluelog/blueprints/admin.py:262:0: R1707: Disallow trailing comma tuple (trailing-comma-tuple)
   107	bluelog/blueprints/admin.py:20:0: E0401: Unable to import 'flask_ckeditor' (import-error)
   108	bluelog/blueprints/admin.py:21:0: E0401: Unable to import 'flask_login' (import-error)
   109	bluelog/blueprints/admin.py:28:0: C0103: Constant name "admin_bp" doesn't conform to UPPER_CASE naming style (invalid-name)
   110	bluelog/blueprints/admin.py:29:0: C0103: Constant name "logger" doesn't conform to UPPER_CASE naming style (invalid-name)
   111	bluelog/blueprints/admin.py:34:0: C0116: Missing function or method docstring (missing-function-docstring)
   112	bluelog/blueprints/admin.py:171:47: C0121: Comparison to False should be 'not expr' (singleton-comparison)
   113	bluelog/blueprints/admin.py:189:4: R1705: Unnecessary "else" after "return" (no-else-return)
   114	bluelog/blueprints/admin.py:206:16: C0121: Comparison to False should be 'not expr' (singleton-comparison)
   115	bluelog/blueprints/admin.py:221:8: R1705: Unnecessary "else" after "return" (no-else-return)
   116	bluelog/blueprints/admin.py:257:0: C0116: Missing function or method docstring (missing-function-docstring)
   117	bluelog/blueprints/admin.py:275:0: C0116: Missing function or method docstring (missing-function-docstring)
   118	bluelog/blueprints/admin.py:276:4: C0103: Variable name "f" doesn't conform to snake_case naming style (invalid-name)
   119	************* Module bluelog.blueprints.blog
   120	bluelog/blueprints/blog.py:65:0: C0330: Wrong hanging indentation (add 4 spaces).
   121	            Post.timestamp.desc()).paginate(page, per_page=per_page)
   122	            ^   | (bad-continuation)
   123	bluelog/blueprints/blog.py:118:0: C0330: Wrong hanging indentation (add 4 spaces).
   124	            page, per_page)
   125	            ^   | (bad-continuation)
   126	bluelog/blueprints/blog.py:18:0: E0401: Unable to import 'flask_login' (import-error)
   127	bluelog/blueprints/blog.py:19:0: E0401: Unable to import 'sqlalchemy' (import-error)
   128	bluelog/blueprints/blog.py:27:0: C0103: Constant name "blog_bp" doesn't conform to UPPER_CASE naming style (invalid-name)
   129	bluelog/blueprints/blog.py:28:0: C0103: Constant name "logger" doesn't conform to UPPER_CASE naming style (invalid-name)
   130	bluelog/blueprints/blog.py:49:0: C0116: Missing function or method docstring (missing-function-docstring)
   131	bluelog/blueprints/blog.py:77:0: C0116: Missing function or method docstring (missing-function-docstring)
   132	bluelog/blueprints/blog.py:97:0: R0914: Too many local variables (17/15) (too-many-locals)
   133	bluelog/blueprints/blog.py:185:0: C0116: Missing function or method docstring (missing-function-docstring)
   134	bluelog/blueprints/blog.py:1:0: R0401: Cyclic import (bluelog.extensions -> bluelog.models) (cyclic-import)

   135	------------------------------------------------------------------
   136	Your code has been rated at 6.87/10 (previous run: 6.87/10, +0.00)
```


### Flake8

Flake8 是由Python官方发布的一款辅助检测Python代码是否规范的工具，相对于目前热度比较高的Pylint来说，Flake8检查规则灵活，支持集成额外插件，扩展性强。Flake8是对下面三个工具的封装：

1）PyFlakes：静态检查Python代码逻辑错误的工具。

2）Pep8： 静态检查PEP8编码风格的工具。

3）NedBatchelder’s McCabe script：静态分析Python代码复杂度的工具。

不光对以上三个工具的封装，Flake8还提供了扩展的开发接口。

>  Flake8 提供一个扩展选项：–max-complexity，如果函数的 McCabe 复杂度比给定的值更高将发出一个告警。该功能对于发现代码过度复杂非常有用，根据 Thomas J. McCabe, Sr 研究，代码复杂度不宜超过 10，而 Flake8 官网建议值为 12。
> 
> McCabe 复杂度默认情况下是不会输出的，需要通过 --max-complexity 指定。

- 包含检查问题(pyflakes)及代码风格（PEP8），检查的严格性适中，主要是检查明显的问题。
命令行参数：[http://flake8.pycqa.org/en/latest/user/options.html](http://flake8.pycqa.org/en/latest/user/options.html)

#### 安装
```
$ pip install flake8
```
#### 检查

```shell
$ flake8 ./bluelog|nl
     1	./bluelog/emails.py:55:80: E501 line too long (90 > 79 characters)
     2	./bluelog/__init__.py:27:1: F401 'bluelog.models.Post' imported but unused
     3	./bluelog/__init__.py:59:80: E501 line too long (130 > 79 characters)
     4	./bluelog/__init__.py:64:80: E501 line too long (105 > 79 characters)
     5	./bluelog/__init__.py:158:80: E501 line too long (91 > 79 characters)
     6	./bluelog/__init__.py:159:20: W292 no newline at end of file
     7	./bluelog/forms.py:98:80: E501 line too long (98 > 79 characters)
     8	./bluelog/extensions.py:34:1: E265 block comment should start with '# '
     9	./bluelog/utils.py:29:5: E122 continuation line missing indentation or outdented
    10	./bluelog/settings.py:27:80: E501 line too long (98 > 79 characters)
    11	./bluelog/fakes.py:129:1: W391 blank line at end of file
    12	./bluelog/blueprints/admin.py:126:80: E501 line too long (87 > 79 characters)
    13	./bluelog/blueprints/admin.py:153:80: E501 line too long (81 > 79 characters)
    14	./bluelog/blueprints/admin.py:171:65: E712 comparison to False should be 'if cond is False:' or 'if not cond:'
    15	./bluelog/blueprints/admin.py:206:34: E712 comparison to False should be 'if cond is False:' or 'if not cond:'
    16	./bluelog/blueprints/admin.py:280:80: E501 line too long (85 > 79 characters)
    17	./bluelog/blueprints/blog.py:154:80: E501 line too long (88 > 79 characters)
    
# 增加复杂度检查    
$ flake8 ./bluelog  --max-complexity=5|nl
     1	./bluelog/emails.py:55:80: E501 line too long (90 > 79 characters)
     2	./bluelog/__init__.py:27:1: F401 'bluelog.models.Post' imported but unused
     3	./bluelog/__init__.py:59:80: E501 line too long (130 > 79 characters)
     4	./bluelog/__init__.py:64:80: E501 line too long (105 > 79 characters)
     5	./bluelog/__init__.py:158:80: E501 line too long (91 > 79 characters)
     6	./bluelog/__init__.py:159:20: W292 no newline at end of file
     7	./bluelog/forms.py:98:80: E501 line too long (98 > 79 characters)
     8	./bluelog/extensions.py:34:1: E265 block comment should start with '# '
     9	./bluelog/utils.py:29:5: E122 continuation line missing indentation or outdented
    10	./bluelog/settings.py:27:80: E501 line too long (98 > 79 characters)
    11	./bluelog/fakes.py:40:1: C901 'fake_categories' is too complex (6)
    12	./bluelog/fakes.py:129:1: W391 blank line at end of file
    13	./bluelog/blueprints/admin.py:126:80: E501 line too long (87 > 79 characters)
    14	./bluelog/blueprints/admin.py:153:80: E501 line too long (81 > 79 characters)
    15	./bluelog/blueprints/admin.py:171:65: E712 comparison to False should be 'if cond is False:' or 'if not cond:'
    16	./bluelog/blueprints/admin.py:206:34: E712 comparison to False should be 'if cond is False:' or 'if not cond:'
    17	./bluelog/blueprints/admin.py:280:80: E501 line too long (85 > 79 characters)
    18	./bluelog/blueprints/blog.py:96:1: C901 'show_post' is too complex (6)
    19	./bluelog/blueprints/blog.py:154:80: E501 line too long (88 > 79 characters)    
```


### 实际使用建议

- 自动化：pycharm 直接 ctrl+alt+L
- 要求不高：flake8
- 要求严格：pylint 按内容一个个手工确认并修复


## Python静态检查
### pyright
- pyright: 微软 [https://github.com/microsoft/pyright](https://github.com/microsoft/pyright)
- 不依赖于python环境。
- Pyright通常比mypy和其他用Python编写的类型检查器快5倍或更多。它适用于大型Python源代码库。它可以在“监视”模式下运行，并在修改文件时执行快速增量更新。
- Pyright是用TypeScript编写的，在节点内运行。 它不需要安装Python环境或导入的第三方包。 当它使用节点作为其扩展运行时，与VS代码编辑器一起使用效果非常好。
- Pyright支持灵活配置，可以对设置进行精细控制。 可以为源库的不同子集指定不同的“执行环境”。 每个环境都可以指定不同的PYTHONPATH设置、python语言版本和平台目标。

命令行参数： [https://github.com/microsoft/pyright/blob/master/docs/command-line.md](https://github.com/microsoft/pyright/blob/master/docs/command-line.md)

退出码


| 退出码      | 解释                                |
| :----------:| :-----------------------------------|
| 0           | 无错误报告                          |
| 1           | 1个或多个错误报告                   |
| 2           | 发生致命错误，未报告任何错误或警告  |
| 3           | 无法读取或解析配置文件              |

#### 安装

```shell
$ npm install -g pyright
```

#### 检查
```shell
$ pyright ./bluelog|nl
     1	typingsPath ~/Documents/GitHub/bluelog/typings is not a valid directory.
     2	Searching for source files
     3	Found 13 source files
     4	~/Documents/GitHub/bluelog/bluelog/__init__.py
     5	  18:6 - error: Import 'flask' could not be resolved (reportMissingImports)
     6	  19:6 - error: Import 'flask_wtf.csrf' could not be resolved (reportMissingImports)
     7	  67:9 - error: Argument of type 'Optional[str]' cannot be assigned to parameter 'filename' of type 'Union[str, _PathLike[str]]'
     8	  Type 'None' cannot be assigned to type 'Union[str, _PathLike[str]]'
     9	    'None' cannot be assigned to 'str'
    10	    'None' cannot be assigned to '_PathLike[str]'
    11	  77:18 - error: Argument of type 'Optional[str]' cannot be assigned to parameter 'mailhost' of type 'Union[str, Tuple[str, int]]'
    12	  Type 'None' cannot be assigned to type 'Union[str, Tuple[str, int]]'
    13	    'None' cannot be assigned to 'str'
    14	    'None' cannot be assigned to 'Tuple[str, int]'
    15	  78:18 - error: Argument of type 'Optional[str]' cannot be assigned to parameter 'fromaddr' of type 'str'
    16	  Type 'None' cannot be assigned to type 'str'
    17	    'None' cannot be assigned to 'str'
    18	  79:17 - error: Argument of type 'Optional[str]' cannot be assigned to parameter 'toaddrs' of type 'List[str]'
    19	  Type 'str' cannot be assigned to type 'List[str]'
    20	  Type 'None' cannot be assigned to type 'List[str]'
    21	    'str' is incompatible with 'List[str]'
    22	    'None' cannot be assigned to 'List[str]'
    23	  81:22 - error: Argument of type 'Tuple[Optional[str], Optional[str]]' cannot be assigned to parameter 'credentials' of type 'Optional[Tuple[str, str]]'
    24	  Tuple entry 1 is incorrect type
    25	  Cannot assign to 'None'
    26	    Type 'None' cannot be assigned to type 'str'
    27	      'None' cannot be assigned to 'str'
    28	~/Documents/GitHub/bluelog/bluelog/commands.py
    29	  15:8 - error: Import 'click' could not be resolved (reportMissingImports)
    30	  25:9 - error: 'click' is unbound
    31	  25:15 - error: Cannot access member 'echo' for type 'Unbound'
    32	  Unsupported type 'Unbound'
    33	  28:6 - error: 'click' is unbound
    34	  28:12 - error: Cannot access member 'option' for type 'Unbound'
    35	  Unsupported type 'Unbound'
    36	  30:6 - error: 'click' is unbound
    37	  30:12 - error: Cannot access member 'option' for type 'Unbound'
    38	  Unsupported type 'Unbound'
    39	  32:6 - error: 'click' is unbound
    40	  32:12 - error: Cannot access member 'option' for type 'Unbound'
    41	  Unsupported type 'Unbound'
    42	  34:6 - error: 'click' is unbound
    43	  34:12 - error: Cannot access member 'option' for type 'Unbound'
    44	  Unsupported type 'Unbound'
    45	  43:9 - error: 'click' is unbound
    46	  43:15 - error: Cannot access member 'echo' for type 'Unbound'
    47	  Unsupported type 'Unbound'
    48	  44:9 - error: 'click' is unbound
    49	  44:15 - error: Cannot access member 'echo' for type 'Unbound'
    50	  Unsupported type 'Unbound'
    51	  47:9 - error: 'click' is unbound
    52	  47:15 - error: Cannot access member 'echo' for type 'Unbound'
    53	  Unsupported type 'Unbound'
    54	  50:9 - error: 'click' is unbound
    55	  50:15 - error: Cannot access member 'echo' for type 'Unbound'
    56	  Unsupported type 'Unbound'
    57	  53:9 - error: 'click' is unbound
    58	  53:15 - error: Cannot access member 'echo' for type 'Unbound'
    59	  Unsupported type 'Unbound'
    60	  56:9 - error: 'click' is unbound
    61	  56:15 - error: Cannot access member 'echo' for type 'Unbound'
    62	  Unsupported type 'Unbound'
    63	~/Documents/GitHub/bluelog/bluelog/emails.py
    64	  15:6 - error: Import 'flask' could not be resolved (reportMissingImports)
    65	  16:6 - error: Import 'flask_mail' could not be resolved (reportMissingImports)
    66	~/Documents/GitHub/bluelog/bluelog/extensions.py
    67	  14:6 - error: Import 'flask_bootstrap' could not be resolved (reportMissingImports)
    68	  15:6 - error: Import 'flask_sqlalchemy' could not be resolved (reportMissingImports)
    69	  16:6 - error: Import 'flask_moment' could not be resolved (reportMissingImports)
    70	  17:6 - error: Import 'flask_ckeditor' could not be resolved (reportMissingImports)
    71	  18:6 - error: Import 'flask_mail' could not be resolved (reportMissingImports)
    72	  19:6 - error: Import 'flask_login' could not be resolved (reportMissingImports)
    73	  20:6 - error: Import 'flask_wtf.csrf' could not be resolved (reportMissingImports)
    74	~/Documents/GitHub/bluelog/bluelog/fakes.py
    75	  15:6 - error: Import 'faker' could not be resolved (reportMissingImports)
    76	  19:6 - error: Import 'sqlalchemy.exc' could not be resolved (reportMissingImports)
    77	~/Documents/GitHub/bluelog/bluelog/forms.py
    78	  15:6 - error: Import 'flask_ckeditor' could not be resolved (reportMissingImports)
    79	  16:6 - error: Import 'flask_wtf' could not be resolved (reportMissingImports)
    80	  17:6 - error: Import 'wtforms' could not be resolved (reportMissingImports)
    81	  19:6 - error: Import 'wtforms.validators' could not be resolved (reportMissingImports)
    82	~/Documents/GitHub/bluelog/bluelog/models.py
    83	  17:6 - error: Import 'werkzeug.security' could not be resolved (reportMissingImports)
    84	  18:6 - error: Import 'flask_login' could not be resolved (reportMissingImports)
    85	~/Documents/GitHub/bluelog/bluelog/settings.py
    86	  77:29 - error: No overloads for 'int(os.getenv('BLUELOG_POST_PER_PAGE'))' match parameters
    87	  Argument types: (Optional[str])
    88	  78:32 - error: No overloads for 'int(os.getenv('BLUELOG_COMMENT_PER_PAGE'))' match parameters
    89	  Argument types: (Optional[str])
    90	  79:36 - error: No overloads for 'int(os.getenv('BLUELOG_MANAGE_POST_PER_PAGE'))' match parameters
    91	  Argument types: (Optional[str])
    92	  81:39 - error: No overloads for 'int(os.getenv('BLUELOG_MANAGE_COMMENT_PER_PAGE'))' match parameters
    93	  Argument types: (Optional[str])
    94	  83:40 - error: No overloads for 'int(os.getenv('BLUELOG_MANAGE_CATEGORY_PER_PAGE'))' match parameters
    95	  Argument types: (Optional[str])
    96	~/Documents/GitHub/bluelog/bluelog/utils.py
    97	  22:6 - error: Import 'flask' could not be resolved (reportMissingImports)
    98	  20:30 - error: 'urlparse' is unknown import symbol
    99	  20:40 - error: 'urljoin' is unknown import symbol
   100	~/Documents/GitHub/bluelog/bluelog/blueprints/admin.py
   101	  18:6 - error: Import 'flask' could not be resolved (reportMissingImports)
   102	  19:6 - error: Import 'flask' could not be resolved (reportMissingImports)
   103	  20:6 - error: Import 'flask_ckeditor' could not be resolved (reportMissingImports)
   104	  21:6 - error: Import 'flask_login' could not be resolved (reportMissingImports)
   105	~/Documents/GitHub/bluelog/bluelog/blueprints/auth.py
   106	  15:6 - error: Import 'flask' could not be resolved (reportMissingImports)
   107	  16:6 - error: Import 'flask_login' could not be resolved (reportMissingImports)
   108	~/Documents/GitHub/bluelog/bluelog/blueprints/blog.py
   109	  16:6 - error: Import 'flask' could not be resolved (reportMissingImports)
   110	  18:6 - error: Import 'flask_login' could not be resolved (reportMissingImports)
   111	  19:6 - error: Import 'sqlalchemy' could not be resolved (reportMissingImports)
   112	64 errors, 0 warnings
   113	Completed in 1.616sec
   
# 退出码
$ echo $?
1
```

### mypy

文档地址： [https://mypy.readthedocs.io/en/stable/index.html](https://mypy.readthedocs.io/en/stable/index.html)

命令行参数：[https://mypy.readthedocs.io/en/stable/command_line.html#command-line](https://mypy.readthedocs.io/en/stable/command_line.html#command-line)

#### 安装
```
$ pip install mypy
```

#### 检查 
```
$ mypy ./bluelog|nl
     1	bluelog/settings.py:77: error: Argument 1 to "int" has incompatible type "Optional[str]"; expected "Union[str, bytes, SupportsInt, _SupportsIndex]"
     2	bluelog/settings.py:78: error: Argument 1 to "int" has incompatible type "Optional[str]"; expected "Union[str, bytes, SupportsInt, _SupportsIndex]"
     3	bluelog/settings.py:80: error: Argument 1 to "int" has incompatible type "Optional[str]"; expected "Union[str, bytes, SupportsInt, _SupportsIndex]"
     4	bluelog/settings.py:82: error: Argument 1 to "int" has incompatible type "Optional[str]"; expected "Union[str, bytes, SupportsInt, _SupportsIndex]"
     5	bluelog/settings.py:84: error: Argument 1 to "int" has incompatible type "Optional[str]"; expected "Union[str, bytes, SupportsInt, _SupportsIndex]"
     6	bluelog/extensions.py:14: error: Cannot find implementation or library stub for module named 'flask_bootstrap'
     7	bluelog/extensions.py:15: error: Cannot find implementation or library stub for module named 'flask_sqlalchemy'
     8	bluelog/extensions.py:16: error: Cannot find implementation or library stub for module named 'flask_moment'
     9	bluelog/extensions.py:17: error: Cannot find implementation or library stub for module named 'flask_ckeditor'
    10	bluelog/extensions.py:18: error: Cannot find implementation or library stub for module named 'flask_mail'
    11	bluelog/extensions.py:19: error: Cannot find implementation or library stub for module named 'flask_login'
    12	bluelog/extensions.py:20: error: Cannot find implementation or library stub for module named 'flask_wtf.csrf'
    13	bluelog/models.py:18: error: Cannot find implementation or library stub for module named 'flask_login'
    14	bluelog/models.py:22: error: Name 'db.Model' is not defined
    15	bluelog/models.py:47: error: Name 'db.Model' is not defined
    16	bluelog/models.py:63: error: Name 'db.Model' is not defined
    17	bluelog/models.py:80: error: Name 'db.Model' is not defined
    18	bluelog/forms.py:15: error: Cannot find implementation or library stub for module named 'flask_ckeditor'
    19	bluelog/forms.py:16: error: Cannot find implementation or library stub for module named 'flask_wtf'
    20	bluelog/forms.py:17: error: Cannot find implementation or library stub for module named 'wtforms'
    21	bluelog/forms.py:19: error: Cannot find implementation or library stub for module named 'wtforms.validators'
    22	bluelog/fakes.py:15: error: Cannot find implementation or library stub for module named 'faker'
    23	bluelog/fakes.py:19: error: Cannot find implementation or library stub for module named 'sqlalchemy.exc'
    24	bluelog/utils.py:18: error: Cannot find implementation or library stub for module named 'urlparse'
    25	bluelog/emails.py:16: error: Cannot find implementation or library stub for module named 'flask_mail'
    26	bluelog/blueprints/blog.py:18: error: Cannot find implementation or library stub for module named 'flask_login'
    27	bluelog/blueprints/blog.py:19: error: Cannot find implementation or library stub for module named 'sqlalchemy'
    28	bluelog/blueprints/auth.py:16: error: Cannot find implementation or library stub for module named 'flask_login'
    29	bluelog/blueprints/admin.py:20: error: Cannot find implementation or library stub for module named 'flask_ckeditor'
    30	bluelog/blueprints/admin.py:21: error: Cannot find implementation or library stub for module named 'flask_login'
    31	bluelog/__init__.py:19: error: Cannot find implementation or library stub for module named 'flask_wtf.csrf'
    32	bluelog/__init__.py:19: note: See https://mypy.readthedocs.io/en/latest/running_mypy.html#missing-imports
    33	Found 31 errors in 11 files (checked 13 source files)
```

### pytype

pytype: google [https://github.com/google/pytype](https://github.com/google/pytype)

### pyre
pyre-check: facebook

## 覆盖率

### Coverage

Coverage 有数种显示测试覆盖率的方式，包括将结果输出到控制台或 HTML 页面，并指出哪些具体哪些地方没有被覆盖到。你可以通过配置文件自定义 Coverage 检查的内容，让你更方便使用。

#### 安装

```
pip install coverage
```

#### 检查


参考：

- 1.  [让 Python 代码更易维护的七种武器](https://www.sohu.com/a/291730384_571478)
- 2. [Python 代码的质量控制之 flake8 & Pylint](https://www.codercto.com/a/11112.html)
- 3. [Python静态代码检查工具Flake8](https://www.cnblogs.com/zhangningyang/p/8692546.html)

