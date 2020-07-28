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

- 有时可以使用操作系统自带的包管理工具，如`yum`、`homebrew`等。

- 从源码安装。

  - 这种方式一般是先下载源码，然后源码是压缩文件，则需要先解压。
  - 在包含`setup.py`文件的目录中运行`python setup.py install`安装！

  









