# Golang DOCS

[[toc]]

本文用于记录学习Golang相关知识点。

Go编程语言中文文档中介绍Go:

- Go编程语言是一个开源项目，它使程序员更具生产力。

- Go语言具有很强的表达能力，它简洁、清晰而高效。得益于其并发机制，用它编写的程序能够非常有效地利用多核与联网的计算机，其新颖的类型系统则使程序结构变得灵活而模块化。Go代码编译成机器码不仅非常迅速，还具有方便的垃圾收集机制和强大的运行时反射机制。 它是一个快速的、静态类型的编译型语言，感觉却像动态类型的解释型语言。


我们可以简单的理解Go语言解决了其他语言并发执行的痛点，像C语言一样的运行效率高，又兼容了Python语言的开发速度快的特点，`Go = C + Python`, Go语言被称为"互联网时代的C"。我们不在概念上过多的纠结，直接来开始使用Go这门编程语言。

## 特别说明

- 本文档中`Golang`简写为`Go`。
- 本文档假定您会使用Linux操作系统的基本命令，如vim、cat、ls等一些工具。
- `Go`学习网站：官方文档 https://golang.google.cn/doc/
- `Go`学习网站：Go编程语言中文文档 https://go-zh.org/doc/
- `Go`学习网站：Go语言之旅 https://go-tour-zh.appspot.com/list
- `Go`学习网站：实效Go编程 https://go-zh.org/doc/effective_go.html
- `Go`学习网站：Go编程语言规范 https://go-zh.org/ref/spec


## 实验环境

本实验使用CentOS7.6作为实验环境。

```sh
[root@hellogitlab ~]# cat /etc/centos-release
CentOS Linux release 7.6.1810 (Core)
```

## 安装和配置GO环境

### 安装Golang

- 使用`yum install go -y`安装Golang。

```sh
[root@hellogitlab ~]# yum install go -y
Loaded plugins: fastestmirror, langpacks
Repository epel is listed more than once in the configuration
Loading mirror speeds from cached hostfile
Resolving Dependencies
--> Running transaction check
---> Package golang.x86_64 0:1.13.1-1.el7 will be updated
--> Processing Dependency: go = 1.13.1-1.el7 for package: golang-bin-1.13.1-1.el7.x86_64
---> Package golang.x86_64 0:1.13.3-1.el7 will be an update
--> Processing Dependency: golang-src = 1.13.3-1.el7 for package: golang-1.13.3-1.el7.x86_64
--> Running transaction check
---> Package golang-bin.x86_64 0:1.13.1-1.el7 will be updated
---> Package golang-bin.x86_64 0:1.13.3-1.el7 will be an update
---> Package golang-src.noarch 0:1.13.1-1.el7 will be updated
---> Package golang-src.noarch 0:1.13.3-1.el7 will be an update
--> Finished Dependency Resolution

Dependencies Resolved

=================================================================================================================================================
 Package                             Arch                            Version                                 Repository                     Size
=================================================================================================================================================
Updating:
 golang                              x86_64                          1.13.3-1.el7                            epel                          694 k
Updating for dependencies:
 golang-bin                          x86_64                          1.13.3-1.el7                            epel                           86 M
 golang-src                          noarch                          1.13.3-1.el7                            epel                          7.1 M

Transaction Summary
=================================================================================================================================================
Upgrade  1 Package (+2 Dependent packages)

Total download size: 93 M
Downloading packages:
epel/7/x86_64/prestodelta                                                                                                 | 1.0 kB  00:00:00     
(1/3): golang-1.13.3-1.el7.x86_64.rpm                                                                                     | 694 kB  00:00:00     
(2/3): golang-src-1.13.3-1.el7.noarch.rpm                                                                                 | 7.1 MB  00:00:00     
(3/3): golang-bin-1.13.3-1.el7.x86_64.rpm                                                                                 |  86 MB  00:00:03     
-------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                             29 MB/s |  93 MB  00:00:03     
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Updating   : golang-src-1.13.3-1.el7.noarch                                                                                                1/6 
  Updating   : golang-bin-1.13.3-1.el7.x86_64                                                                                                2/6 
  Updating   : golang-1.13.3-1.el7.x86_64                                                                                                    3/6 
  Cleanup    : golang-bin-1.13.1-1.el7.x86_64                                                                                                4/6 
  Cleanup    : golang-1.13.1-1.el7.x86_64                                                                                                    5/6 
  Cleanup    : golang-src-1.13.1-1.el7.noarch                                                                                                6/6 
  Verifying  : golang-src-1.13.3-1.el7.noarch                                                                                                1/6 
  Verifying  : golang-1.13.3-1.el7.x86_64                                                                                                    2/6 
  Verifying  : golang-bin-1.13.3-1.el7.x86_64                                                                                                3/6 
  Verifying  : golang-1.13.1-1.el7.x86_64                                                                                                    4/6 
  Verifying  : golang-bin-1.13.1-1.el7.x86_64                                                                                                5/6 
  Verifying  : golang-src-1.13.1-1.el7.noarch                                                                                                6/6 

Updated:
  golang.x86_64 0:1.13.3-1.el7                                                                                                                   

Dependency Updated:
  golang-bin.x86_64 0:1.13.3-1.el7                                        golang-src.noarch 0:1.13.3-1.el7                                       

Complete!
```

### 查看Golang版本

```sh
[root@hellogitlab ~]# go version
go version go1.13.3 linux/amd64
```

### 查看`go`命令的帮助信息

```sh
[root@hellogitlab ~]# go
Go is a tool for managing Go source code.

Usage:

        go <command> [arguments]

The commands are:

        bug         start a bug report
        build       compile packages and dependencies
        clean       remove object files and cached files
        doc         show documentation for package or symbol
        env         print Go environment information
        fix         update packages to use new APIs
        fmt         gofmt (reformat) package sources
        generate    generate Go files by processing source
        get         add dependencies to current module and install them
        install     compile and install packages and dependencies
        list        list packages or modules
        mod         module maintenance
        run         compile and run Go program
        test        test packages
        tool        run specified go tool
        version     print Go version
        vet         report likely mistakes in packages

Use "go help <command>" for more information about a command.

Additional help topics:

        buildmode   build modes
        c           calling between Go and C
        cache       build and test caching
        environment environment variables
        filetype    file types
        go.mod      the go.mod file
        gopath      GOPATH environment variable
        gopath-get  legacy GOPATH go get
        goproxy     module proxy protocol
        importpath  import path syntax
        modules     modules, module versions, and more
        module-get  module-aware go get
        module-auth module authentication using go.sum
        module-private module configuration for non-public modules
        packages    package lists and patterns
        testflag    testing flags
        testfunc    testing functions

Use "go help <topic>" for more information about that topic.
```

### go安装信息检查

```sh
# 查看go处于什么位置
[root@hellogitlab ~]# whereis go
go: /usr/bin/go /usr/lib/golang/bin/go
# 查看/usr/bin/go的详细信息，可以看到最终指向了/usr/lib/golang/bin/go
[root@hellogitlab ~]# ls -lah /usr/bin/go
lrwxrwxrwx 1 root root 20 Nov 22 22:36 /usr/bin/go -> /etc/alternatives/go
[root@hellogitlab ~]# ls -lah /etc/alternatives/go
lrwxrwxrwx 1 root root 22 Nov 22 22:36 /etc/alternatives/go -> /usr/lib/golang/bin/go
[root@hellogitlab ~]# ls -lah /usr/lib/golang/bin/go
-rwxr-xr-x 1 root root 15M Nov  3 03:34 /usr/lib/golang/bin/go
# golang的安装目录
[root@hellogitlab ~]# ls -lah /usr/lib/golang/
total 44K
drwxr-xr-x   7 root root 4.0K Nov 22 22:36 .
dr-xr-xr-x. 44 root root 4.0K Nov 20 00:06 ..
drwxr-xr-x   2 root root 4.0K Nov 22 22:36 api
drwxr-xr-x   2 root root 4.0K Nov 22 22:35 bin
-rw-r--r--   1 root root 5.6K Oct 18 06:02 favicon.ico
drwxr-xr-x   3 root root 4.0K Oct 18 06:02 lib
drwxr-xr-x   8 root root 4.0K Nov  3 03:35 pkg
-rw-r--r--   1 root root   26 Oct 18 06:02 robots.txt
drwxr-xr-x  46 root root 4.0K Nov 22 22:35 src
-rw-r--r--   1 root root    8 Oct 18 06:02 VERSION
```

我们后续使用普通账户`meizhaohui`来进行go语言相关命令的操作。

### 配置Go的工作空间

GO代码必须在工作空间内。工作空间是一个目录，其中包含三个子目录：
- `src` 里面每一个子目录，就是一个包。包内是Go的源码文件
- `pkg` 编译后生成的，包的目标文件
- `bin` 生成的可执行文件


使用普通账户`meizhaohui`创建Go的工作空间目录：

```sh
# 查看我是谁
[meizhaohui@hellogitlab ~]$ whoami
meizhaohui
# 查看当前文件夹中的文件
[meizhaohui@hellogitlab ~]$ ls
# 创建工作空间目录
[meizhaohui@hellogitlab ~]$ mkdir -p data/go_data
[meizhaohui@hellogitlab ~]$ ls -lsh data/
total 4.0K
4.0K drwxrwxr-x 2 meizhaohui meizhaohui 4.0K Nov 22 23:02 go_data
# 在工作空间目录下面创建子目录
[meizhaohui@hellogitlab ~]$ mkdir -p data/go_data/{src,bin,pkg}
[meizhaohui@hellogitlab ~]$ ls -lah data/go_data/
total 20K
drwxrwxr-x 5 meizhaohui meizhaohui 4.0K Nov 22 23:10 .
drwxrwxr-x 3 meizhaohui meizhaohui 4.0K Nov 22 23:02 ..
drwxrwxr-x 2 meizhaohui meizhaohui 4.0K Nov 22 23:10 bin
drwxrwxr-x 2 meizhaohui meizhaohui 4.0K Nov 22 23:10 pkg
drwxrwxr-x 2 meizhaohui meizhaohui 4.0K Nov 22 23:10 src
```

### 配置`PATH`、`GOPATH`、`GOROOT`、`GOBIN`等环境变量

在`~/.bashrc`文件中增加以下内容：

```
# Golang environment settings
export GOROOT=/usr/lib/golang # golang install path
export GOPATH=/home/meizhaohui/data/go_data # golang workspace
export GOBIN=${GOPATH}/bin # golang exe files
export PATH=${GOBIN}:${PATH}
```

保存后，`source ~/.bashrc`加载配置文件，并查看以上设置的Go语言的环境变量：

```sh
[meizhaohui@hellogitlab ~]$ source ~/.bashrc
[meizhaohui@hellogitlab ~]$ echo $GOPATH
/home/meizhaohui/data/go_data
[meizhaohui@hellogitlab ~]$ echo $GOBIN
/home/meizhaohui/data/go_data/bin
[meizhaohui@hellogitlab ~]$ echo $GOROOT
/usr/lib/golang
[meizhaohui@hellogitlab ~]$ echo $PATH
/home/meizhaohui/data/go_data/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/meizhaohui/.local/bin:/home/meizhaohui/bin
```

查看到以上信息，说环境变量配置成功。

### 开启Go module和代理

默认情况下，使用go get下载包时会非常慢，需要开启Go module和代理，加快我们包的安装速度。

为了今后中国的Go语言开发者能更好地进行开发，七牛云推出了非营利性项目 goproxy.cn，其目标是为中国和世界上其他地方的 Gopher 们提供一个免费的、可靠的、持续在线的且经过 CDN 加速的模块代理。

参考：
- 干货满满的 Go Modules 和 goproxy.cn https://github.com/EDDYCJY/blog/blob/master/talk/goproxy-cn.md
- Go module和goproxy 设置 https://luhua.cc/2019/08/23/Go-module-%E5%92%8C-goproxy-%E8%AE%BE%E7%BD%AE/

在`~/.bashrc`文件中增加以下内容：

```sh
export GO111MODULE=on
export GOPROXY=https://goproxy.cn
```

保存后，`source ~/.bashrc`加载配置文件，并查看以上设置的Go语言的环境变量：

```sh
[meizhaohui@hellogitlab ~]$ echo $GO111MODULE
on
[meizhaohui@hellogitlab ~]$ echo $GOPROXY 
https://goproxy.cn

# 测试安装包
[meizhaohui@hellogitlab ~]$ go get -v github.com/stamblerre/gocode
```


## 第一个Go程序，你好世界

### 编写Go代码文件
以最经典的`Hello world`程序为例，编写第一个Go代码文件。

我们切换到`$GOPATH/src`目录中，创建第一个Go代码文件。

```sh
[meizhaohui@hellogitlab ~]$ cd $GOPATH/src
[meizhaohui@hellogitlab src]$ pwd
/home/meizhaohui/data/go_data/src
# 使用vim编写hello.go文件，保存后查看内容如下
[meizhaohui@hellogitlab src]$ cat hello.go
package main

import "fmt"

func main() {
    fmt.Println("Hello,World")
}
```

### 编译Go程序`go build`

- 使用`go build filename.go`编译go程序，如`go build hello.go`编译生成可执行文件`hello`。

```sh
[meizhaohui@hellogitlab src]$ go build hello.go 
[meizhaohui@hellogitlab src]$ ls
hello  hello.go
# 运行可执行文件hello
[meizhaohui@hellogitlab src]$ ./hello
Hello,World
```

### 编译并直接运行Go程序`go run`

- 使用`go run filename.go`编译并直接运行go程序，如`go build hello.go`编译时不生成可执行文件，直接显示运行结果。

```sh
[meizhaohui@hellogitlab src]$ trash-put hello
[meizhaohui@hellogitlab src]$ ls
hello.go
[meizhaohui@hellogitlab src]$ go run hello.go
Hello,World
[meizhaohui@hellogitlab src]$ ls
hello.go
```

### 编译并安装`go install`
- 对go源码文件`go install`,会进行编译+链接+生成可执行文件, 会在`$GOBIN`目录下生成可执行文件。

```sh
# 编译并安装
[meizhaohui@hellogitlab src]$ go install hello.go
# 查看当前目录下是否生成可执行文件
[meizhaohui@hellogitlab src]$ ls 
hello.go
# 查看bin目录下是否生成可执行文件
[meizhaohui@hellogitlab src]$ ls $GOBIN
hello
# 查看hello可执行文件的位置
[meizhaohui@hellogitlab src]$ whereis hello
hello: /home/meizhaohui/data/go_data/bin/hello
# 在任何目录执行hello，会打印出世界你好
[meizhaohui@hellogitlab src]$ hello
Hello,World
[meizhaohui@hellogitlab src]$ cd
[meizhaohui@hellogitlab ~]$ hello
Hello,World
```

## GO语言之旅

### 基础

#### 注释

- Go语言支持C风格的块注释`/* */`和C++风格的行注释`//`。 行注释更为常用，而块注释则主要用作包的注释，当然也可在禁用一大段代码时使用。

我们在`hello.go`中增加一下注释。

查看源文件内容：

```go
[meizhaohui@hellogitlab src]$ cat hello.go
/*
File    : hello.go
Author  : Zhaohui Mei<mzh.whut@gmail.com>
Date    : 2019-11-23
Sammary : display hello world
*/
package main

import "fmt" // 导入包fmt

// 主函数,在main包中，主函数必须以main命名
func main() {
        // 打印输出"Hello,World"
        fmt.Println("Hello,World")
}
```

再次运行程序：

```sh
[meizhaohui@hellogitlab src]$ go run hello.go
Hello,World
```

#### 包与函数

##### 包

- 每个Go程序都是由一个包组成的。
- Go程序从`main`包开始执行的。
- 使用`package name`来定义名称为`name`的包。
- 每个Go程序必须包含一个名称为`main`的包，即必须有一个`package main`这样的包。如果程序未定义`main`包，运行程序时则会提示`go run: cannot run non-main package`异常。
- 必须在Go源文件中非注释的第一行指明这个文件属于哪个包。
- 包名不一定要和源文件名保持一致。如源文件`swagger.go`中定义的包`package swag`就是这种情况。
- 在`package main`主包中必须定义一个主函数`func main()`，否则运行程序时则会提示`function main is undeclared in the main package`异常，即主包中未声明主函数。
- 文件夹包与包名没有直接关系，并非需要一致。
- 同一个文件夹下的文件只能有一个包名，否则编译报错。

###### 引入包

- Go程序通过`import`语句引入包并在代码中使用。
- `import`语句告诉编译器这个程序使用哪些包。
- `import`语句可以像Python一样的，一次导入一个包，像hello.go中`import "fmt"`导入fmt包。
- `import`语句也可以一性引入多个包，也称批量导入或打包导入语句。**推荐使用批量导入语句**。

下面示例中，使用了批量导入语句：
示例：

```go
[meizhaohui@hellogitlab src]$ cat packages.go 
/*
 *      Filename: packages.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: go package
 *   Create Time: 2019-11-24 17:27:21
 * Last Modified: 2019-11-24 17:28:34
 */
package main

import (
        "fmt"
        "math/rand"
)

func main() {
        fmt.Println("The rand Number: ", rand.Intn(10))
}
```

此示例中，定义了`main`包，并批量导入了两个包，一个`fmt`包，一个`math/rand`包。

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run packages.go
The rand Number:  1
```


###### 名字导出

- 在导入一个包后，就可以使用其导出的名称来调用它。
- Go语言是大小写敏感的。
- 在Go语言中，以大写字母开头的名字就会被`导出`( exported )。类似面向对象里面的属性`public`。
- 在Go语言中，以小写字母开头的名字**不会被**`导出`( exported )。类似面向对象里面的属性`private`。对包外不可见。


我们将上面的packages.go程序修改一下：

```go
[meizhaohui@hellogitlab src]$ cat packages.go 
/*
 *      Filename: packages.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: go import and name exported
 *   Create Time: 2019-11-24 17:27:21
 * Last Modified: 2019-11-24 17:54:50
 */
package main

import (
        "fmt"
        "math"
        "math/rand"
)

func main() {
        fmt.Println("The rand Number: ", rand.Intn(10))
        fmt.Println("The PI: ", math.pi)
}
```

尝试运行程序：

```sh
[meizhaohui@hellogitlab src]$ go run packages.go 
# command-line-arguments
./packages.go:18:26: cannot refer to unexported name math.pi
./packages.go:18:26: undefined: math.pi
```

可以看到执行错误，无法获取到`math.pi`这个变量。

将`math.pi`改成`math.PI`后再运行：

```sh
[meizhaohui@hellogitlab src]$ go run packages.go 
The rand Number:  1
The PI:  3.141592653589793
```

可以正常获取到`pi`的值为`3.141592653589793`。

该示例中，我们使用了三个包：

- `fmt`：`fmt`包使用函数实现`I/O`格式化（类似于`C`的`printf`和`scanf`的函数）, 格式化参数源自C，但更简单。
- `math`：`math`包提供了基本的常量和数学函数。
- `math/rand`： `rand`包执行伪随机数生成器。

参考：
- [腾讯云开发者手册-Go教程](https://cloud.tencent.com/developer/doc/1101)


##### 函数简介

- 函数是基本的代码块，用于执行一个任务。
- Go语言最少有个`main()`函数。
- Go语言中，函数可以接收0个或多个参数。
- 可以通过函数来划分不同的功能，逻辑上每个函数执行指定的任务。
- 当两个或多个连续的函数命名参数是同一类型，则除了最后一个类型之外，其他都可以省略。

下面示例中，创建一个`add`函数，并进行调用：

```go
[meizhaohui@hellogitlab src]$ cat functions.go 
/*
 *      Filename: functions.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: go function
 *   Create Time: 2019-11-24 22:32:44
 * Last Modified: 2019-11-24 22:40:20
 */
package main

import "fmt"

func add(x int, y int) int {
        return x + y
}

func main() {
        fmt.Printf("%d + %d = %d\n", 11, 22, add(11, 22))
}
```

运行程序：

```sh
[meizhaohui@hellogitlab src]$ go run functions.go 
11 + 22 = 33
```

示例中做了以下事情：

- 定义`add`函数，并接受两个`int`类型的参数`x`和`y`，并返回`int`类型的值。
- 将`x + y`的值做为`add`函数的返回值。
- 使用`fmt.Printf`输出字符，此方法输出字符时，不会自动添加换行符，因此在格式化字符串中需要指定`\n`进行换行。
- 使用`add(11, 22)`调用了`add`函数，并传入两个整型参数。
- 因为`x`和`y`的参数类型相同，函数定义时`add(x int, y int)`可以简写为`add(x, y int)`。

###### 函数定义

Go语言函数定义格式如下：

```go
func function_name( [parameter list] ) [return_types] {
   函数体
}
```

函数定义解析：

- func：函数由``func``开始声明
- function_name：函数名称，函数名和参数列表一起构成了函数签名。
- parameter list：参数列表，参数就像一个占位符，当函数被调用时，你可以将值传递给参数，这个值被称为实际参数。参数列表指定的是参数类型、顺序、及参数个数。参数是可选的，也就是说函数也可以不包含参数。
- return_types：返回类型，函数返回值。return_types 是该列值的数据类型。有些功能不需要返回值，这种情况下 return_types 不是必须的。
- 函数体：函数定义的代码集合。


###### 函数返回多个值

Go函数可以返回多个值：

- Go函数可以返回任意数量的返回值。
- 当有多个返回值时，在return_types定义时，使用``(return_type1, return_type2)``将多个返回值类型包裹起来，如果返回值类型数量与实际返回的值的数量不匹配则会报错。
- 当返回类型列表中没有定义返回类型时，而函数体中实际却有返回值时，则运行时会提示"too many arguments to return"异常。

请看下面交换两个字符串的示例：
```go
[meizhaohui@hellogitlab src]$ cat multi_results.go 
/*
 *      Filename: multi_results.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: function return multi results
 *   Create Time: 2019-11-24 23:03:27
 * Last Modified: 2019-11-24 23:06:45
 */
package main

import "fmt"

func swap(str1, str2 string) (string, string) {
        return str2, str1
}

func main() {
        a, b := swap("hello", "world")
        fmt.Println(a, b)
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run multi_results.go
world hello
```

``swap``函数返回了两个字符串，


我们修改一下程序，改成以下内容：
```go
[meizhaohui@hellogitlab src]$ cat multi_results.go 
/*
 *      Filename: multi_results.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: function return multi results
 *   Create Time: 2019-11-24 23:03:27
 * Last Modified: 2019-11-24 23:06:45
 */
package main

import "fmt"

// --------------------------| 这个位置不一样
func swap(str1, str2 string) string {
        return str2, str1
}

func main() {
        a, b := swap("hello", "world")
        fmt.Println(a, b)
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run multi_results.go
# command-line-arguments
./multi_results.go:14:2: too many arguments to return
        have (string, string)
        want (string)
./multi_results.go:18:7: assignment mismatch: 2 variables but swap returns 1 values
```

可以看出，当返回值数量与函数定义的返回值类型数量不匹配时，会运行异常！！

###### 函数命名返回值

- Go的返回值可以被命名，并且像变量那样使用。
- 返回值的名称应当具有一定的意义，可以作为文档使用。
- 没有参数的``return``语句返回结果的当前值。也就是``直接``返回。
- 直接返回语句仅应用于短函数中。在长的函数中它们会影响代码的可读性。

函数命名返回值的使用：

```go
[meizhaohui@hellogitlab src]$ cat named_results.go 
/*
 *      Filename: named_results.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: 命名返回值
 *   Create Time: 2019-11-24 23:22:51
 * Last Modified: 2019-11-24 23:24:58
 */
package main

import "fmt"

func split(sum int) (x, y int) {
        x = sum * 2 / 3
        y = sum - x
        return
}
func main() {
        fmt.Println(split(14))
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run named_results.go
9 5
```

可以看到返回split返回了两个值9和5。

#### 数据类型、变量与常量

##### 数据类型

- 数据类型用于声明函数和变量。数据类型的出现是为了把数据分成所需内存大小不同的数据，编程的时候需要用大数据的时候才需要申请大内存，就可以充分利用内存。
- ``bool``布尔型，可取值为``true``或``false``。
- ``string``字符串类型，字符串就是一串固定长度的字符连接起来的字符序列，**Go语言中使用UTF-8编码标识Unicode文本**。
- 整型，``int``(有符号整数，长度取决于CPU)、``int8``(有符号8位整型)、``int16``、``int32``、``int64``、``uint``(无符号整型，长度取决于CPU)、``uint8``(无符号8位整型)、``uint16``、``uint32``、``uint64``。
- ``byte``字节类型，类似``uint8``(无符号8位整型)。
- 浮点类型，``float32``(32位浮点型数)和``float64``(64位浮点型数)。
- 复数类型，``complex64``(32位实数和虚数)和``complex128``(64位实数和虚数)。

##### 变量

- 变量是计算机语言中能储存计算结果或能表示值抽象概念。Go语言变量名由字母、数字、下划线组成，**其中首个字符不能为数字**。
- ``var``语句``申明(declare)``变量列表；跟函数参数列表一样，类型在最后指定。
- ``var``语句的作用域(可见范围)可以是``包级别``或者``函数级别``。
- 变量声明时可以对变量进行初始化，一个变量一个初始值。如``var flag bool = false``。
- 在变量声明时，如果初始值存在，则变量类型可以忽略，这时Go会自行判断变量的类型，变量则继承初始值的类型。
- 在变量声明时，如果初始值不存在，则变量默认为**零值**。
- 根据变量类型不同，**零值**可能不同，数值类型**零值**为``0``，bool类型**零值**为``false``，字符串类型**零值**为``""``(空字符串)。
- 在函数内部可以使用``:=``赋值语句进行简式声明。
- 简式声明不能用在函数外部。
- 简式声明时，必须要有新的变量生成。否则编译时会提示"no new variables on left side of :="异常。
- 所有声明的局部变量必须需要使用，否则(即声明了变量却没有使用)编译时会提示"name declared and not used"。
- 全局变量是允许声明但不使用。

变量定义示例：
```go
[meizhaohui@hellogitlab src]$ cat types.go 
/*
 *      Filename: types.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: 变量声明与数据类型
 *   Create Time: 2019-11-28 22:22:21
 * Last Modified: 2019-11-28 23:03:42
 */
package main

import "fmt"

var num int = 10 // 声明变量并初始化
var flag bool = false
var sayhi string = "Hello"

func Printnum(num int) {
        fmt.Println(num)
}

func main() {
        var num1, num2 = 1, 2 // 不需要显示声明类型，根据初始值自动推断数据类型
        flag1, flag2 := true, false
        name := "Go"
        Printnum(num)
        fmt.Println(num, num1, num2)
        fmt.Println(flag, flag1, flag2)
        fmt.Println(sayhi, name)
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run types.go     
10
10 1 2
false true false
Hello Go
```

可以看到全局变量可以用在自定义函数中，也可以用在主函数中。

##### 常量

- 常量( constants )申明与变量一样，只不过换成``const``关键字。 
- 常量可以是字符、字符串、布尔，或者数值类型。
- 常量不能使用``:=``简式申明。

```go
[meizhaohui@hellogitlab src]$ cat constants.go 
/*
 *      Filename: constants.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: 常量的使用
 *   Create Time: 2019-11-28 23:14:04
 * Last Modified: 2019-11-28 23:23:22
 */
package main

import "fmt"

const (
        Pi      = 3.14
        Version = "go1.13.3 linux/amd64"
)

func area(radius float32) float32 {
        return Pi * radius * radius
}

func main() {
        fmt.Println("Golang的版本号:", Version)
        fmt.Println("圆的面积:", area(2))
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run constants.go 
Golang的版本号: go1.13.3 linux/amd64
圆的面积: 12.56
```

##### 类型转换

- 表达式``T(v)``将值``v``转换为类型``T``。
- Go语言中需要显式的进行类型转换。
- 布尔型无法参与数值运算，也无法与其他类型进行转换。
- 不是所有数据类型都可以转换。
- 低精度转换为高精度时是安全的，但高精度转换为低精度则会丢失数据。
- Go语言中还有一些包可以进行跨数据类型的转换，如``strconv``包提供了字符串与简单数据类型之间的类型转换功能。可以将简单类型转换为字符串，也可以将字符串转换为其它简单类型。后续再详细介绍。

看下面示例:
```go
[meizhaohui@hellogitlab src]$ cat -n type_conversions.go 
     1  /*
     2   *      Filename: type_conversions.go
     3   *        Author: Zhaohui Mei<mzh.whut@gmail.com>
     4   *   Description: 数据类型转换
     5   *   Create Time: 2019-12-07 15:01:38
     6   * Last Modified: 2019-12-07 15:12:18
     7   */
     8  package main
     9
    10  import (
    11          "fmt"
    12          "math"
    13  )
    14
    15  func main() {
    16          var i int = 42
    17          //var f float64 = float64(i)
    18          var f float64 = i
    19          var u uint = uint(f)
    20          var b bool = bool(i)
    21          fmt.Println(i, f, u, b)
    22
    23          x, y := 3, 4
    24          z := math.Sqrt(float64(x*x + y*y))
    25          fmt.Println(x, y, z)
    26  }
```

运行程序:
```sh
[meizhaohui@hellogitlab src]$ go run type_conversions.go
# command-line-arguments
./type_conversions.go:18:6: cannot use i (type int) as type float64 in assignment
./type_conversions.go:20:19: cannot convert i (type int) to type bool
```

可以发现18行中，想直接到``int``类型的i赋值给``float64``类型的f出现异常，不能直接隐式转换。

而20行中，将``int``类型的i转换成``bool``布尔类型也提示异常，即``bool``布尔类型不能进行类型转换。

我们修改一下程序，让程序能够正常运行。
```go
[meizhaohui@hellogitlab src]$ cat type_conversions.go 
/*
 *      Filename: type_conversions.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: 数据类型转换
 *   Create Time: 2019-12-07 15:01:38
 * Last Modified: 2019-12-07 15:18:27
 */
package main

import (
        "fmt"
        "math"
)

func main() {
        var i int = 42
        var f float64 = float64(i)
        var u uint = uint(f)
        fmt.Println(i, f, u)

        x, y := 3, 4
        z := math.Sqrt(float64(x*x + y*y))
        fmt.Println(x, y, z)
}
```

重新运行程序:
```sh
[meizhaohui@hellogitlab src]$ go run type_conversions.go
42 42 42
3 4 5
```

#### 运算符

Go语言内置的运算符有：

- 算术运算符， ``+``加、``-``减、``*``乘、``/``除、``%``求余、``++``自增1、``--``自减1。
- 关系运算符， ``==``相等、``!=``不等、``>``大于、``<``小于、``>=``大于等于、``<=``小于等于。

示例：
```go
[meizhaohui@hellogitlab src]$ cat operators.go 
/*
 *      Filename: operators.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: 运算符
 *   Create Time: 2019-11-28 23:36:59
 * Last Modified: 2019-11-28 23:46:51
 */
package main

import "fmt"

func checknum(num1, num2 int) {
        fmt.Printf("%d >  %d :%t\n", num1, num2, num1 > num2)
        fmt.Printf("%d <  %d :%t\n", num1, num2, num1 < num2)
        fmt.Printf("%d == %d :%t\n", num1, num2, num1 == num2)
        fmt.Printf("%d != %d :%t\n", num1, num2, num1 != num2)
        fmt.Printf("%d >= %d :%t\n", num1, num2, num1 >= num2)
        fmt.Printf("%d <= %d :%t\n", num1, num2, num1 <= num2)
}

func main() {
        var a, b = 1, 2
        checknum(a, b)
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run operators.go 
1 >  2 :false
1 <  2 :true
1 == 2 :false
1 != 2 :true
1 >= 2 :false
1 <= 2 :true
```

- 逻辑运算符，``&&``逻辑与AND、``||``逻辑或OR、``!``逻辑非NOT。
- 位运算符，``&``按位与(同1则为1)、``|``按位或(有1则为1)、``^``按位异或(同则为0，不同则为1)、``<<``左移、``>>``右移。
- 赋值运算符， ``=``简单的赋值运算符、``+=``相加后再赋值、``-=``相减后再赋值、``*=``相乘后再赋值、``/=``相除后再赋值、``%=``求余后再赋值、``<<=``左移后再赋值、``>>=``右移后再赋值、``&=``按位与后再赋值、``|=``按位或后再赋值、``^=``按位异或后再赋值。


#### 流程控制

##### ``for``循环语句

- Go语言只有一种循环结构，就是``for``循环语句。
- 基本的``for``循环除了没有了``( )``之外(甚至强制不能使用它们)，看起来跟C语言一样，但大括号``{}``是必须的。
- 语法格式``for init; condition; post { }``。 init：一般为赋值表达式，给控制变量赋初值；condition： 关系表达式或逻辑表达式，循环控制条件；post： 一般为赋值表达式，给控制变量增量或减量。

看一下使用``for``循环语句计算1到10的和：
```go
[meizhaohui@hellogitlab src]$ cat base_for.go 
/*
 *      Filename: base_for.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: for循环语句的使用
 *   Create Time: 2019-12-07 15:49:24
 * Last Modified: 2019-12-07 15:51:15
 */
package main

import "fmt"

func main() {
        sum := 0
        for i := 0; i <= 10; i++ {
                sum += i
        }
        fmt.Println("Sum is", sum)
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run base_for.go 
Sum is 55
```

- 有时也可以省略掉``init``前置语句和``post``后置语句，此时分号可以省略。

修改一下代码：
```go
/*
 *      Filename: base_for.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: for循环语句的使用
 *   Create Time: 2019-12-07 15:49:24
 * Last Modified: 2019-12-07 16:00:11
 */
package main

import "fmt"

func main() {
        sum := 0
        for i := 0; i <= 10; i++ {
                sum += i
        }
        fmt.Println("Sum is", sum)

        nsum := 1
        for nsum < 10 {
                nsum += nsum
                fmt.Println("nsum is", nsum)
        }
        fmt.Println("nsum is", nsum)
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run base_for.go 
Sum is 55
nsum is 2
nsum is 4
nsum is 8
nsum is 16
nsum is 16
```

可以看到当``nsum``小于10时，一直会去执行``for``循环语句，也就是每次将自身数据翻倍。当nsum=16后，不再进入到``for``循环语句中。

- 当``for``循环语句省略了循环条件，循环就不会结束，因此可以用更简洁地形式表达死循环。此时需要使用``Ctrl+C``或``Ctrl+D``才能停止程序的运行。

```go
package main

import "fmt"

func main() {
    i := 1
    for {
        i++ 
        fmt.Println("i is", i)
    }   
    fmt.Println("after for is", i)
}
```
上面程序运行时，会不停执行``for``循环语句，``i``不断进行自增1，程序不断运行下去，必须手动进行终止。

- 在``for``循环语句也可以使用``range``关键字，可以对数组(array)、切片(slice)、链表(channel)或集合(map)的元素进行迭代。后续再详细介绍。

修改一下代码，简单的使用``range``关键字来循环遍历字符串。

```go
[meizhaohui@hellogitlab src]$ cat base_for.go 
/*
 *      Filename: base_for.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: for循环语句的使用
 *   Create Time: 2019-12-07 15:49:24
 * Last Modified: 2019-12-07 16:23:40
 */
package main

import "fmt"

func main() {
        sum := 0
        for i := 0; i <= 10; i++ {
                sum += i
        }
        fmt.Println("Sum is", sum)

        nsum := 1
        for nsum < 10 {
                nsum += nsum
                fmt.Println("nsum is", nsum)
        }
        fmt.Println("nsum is", nsum)

        histring := "Hello,Golang!"

        for i, j := range histring {
                fmt.Println(i, j)
        }
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run base_for.go 
Sum is 55
nsum is 2
nsum is 4
nsum is 8
nsum is 16
nsum is 16
0 72
1 101
2 108
3 108
4 111
5 44
6 71
7 111
8 108
9 97
10 110
11 103
12 33
```
可以看到``range histring``并不是直接输出字符，而不输出字符对应的索引和字符对应的ASCII码对应的十进制数。

ASCII码可参考：http://ascii.911cha.com/

##### ``if``条件判断语句

- 基本的``if``循环除了没有了``( )``之外(甚至强制不能使用它们)，看起来跟C语言一样，但大括号``{}``是必须的。
- 语法格式``if condition { }``。condition： 关系表达式或逻辑表达式。
- 你可以在``if``或``else if``语句中嵌入一个或多个``if``或``else if``语句。

下面的程序是定义了一个``sqrt``来求一个数的平方根，当数是负数时，直接退出。正数的时候求平方根值。
```go
[meizhaohui@hellogitlab src]$ cat base_if.go 
/*
 *      Filename: base_if.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: if判断语句的使用
 *   Create Time: 2019-12-07 17:28:07
 * Last Modified: 2019-12-07 17:43:39
 */
package main

import (
        "fmt"
        "math"
        "os"
)

func sqrt(x float64) float64 {
        if x < 0 {
                fmt.Println("求平方根的数必须不小于0")
                os.Exit(1) // 退出程序 
        }
        return math.Sqrt(x)
}

func main() {
        fmt.Println(sqrt(2))
        fmt.Println(sqrt(-2))
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run base_if.go 
1.4142135623730951
求平方根的数必须不小于0
exit status 1
[meizhaohui@hellogitlab src]$ echo $?
1
```

-  在``if``之后，条件语句之前，可以添加变量初始化语句，使用``;``进行分隔，这种方式称为``if的便捷语句``。
- ``if的便捷语句``定义的变量的作用域仅在``if``范围内。
- ``if``语句中同样可以使用``else if``和``else``关键字，但不能处于行的第一个非空白字符处。

下面使用便捷语句判断一个数是否是正数或者0或者为负数:

```go
[meizhaohui@hellogitlab src]$ cat -n short_if.go 
     1  /*
     2   *      Filename: short_if.go
     3   *        Author: Zhaohui Mei<mzh.whut@gmail.com>
     4   *   Description: if的便捷语句
     5   *   Create Time: 2019-12-07 17:55:50
     6   * Last Modified: 2019-12-07 18:01:23
     7   */
     8  package main
     9
    10  import "fmt"
    11
    12  func main() {
    13          if num := 2; num > 0 {
    14                  fmt.Println(num, "是正数")
    15          } else if num == 0 {
    16                  fmt.Println(num, "为0")
    17          } else {
    18                  fmt.Println(num, "是负数")
    19          }
    20          fmt.Println(num, "获取不到")
    21  }
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run short_if.go 
# command-line-arguments
./short_if.go:20:14: undefined: num
```
可以发现提示20行异常，``num``变量未定义，因为``num``变量作用域是``if``语句中，在``if``语句外获取不到``num``变量。

删除20行的打印语句，再重新运行:
```sh
[meizhaohui@hellogitlab src]$ go run short_if.go 
2 是正数
```

下面使用牛顿法求平方根:
```go
[meizhaohui@hellogitlab src]$ cat newton_method_sqrt.go 
/*
 *      Filename: newton_method_sqrt.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: 使用牛顿法(Newton Method)求平方根  x -= (x*x - F)/(x*x)
 *   Create Time: 2019-12-07 19:31:30
 * Last Modified: 2019-12-07 20:17:28
 */
package main

import (
        "fmt"
        "math"
)

func newton(F float64) float64 {
        guess_num := 1
        x := float64(1)
        for math.Abs(x*x-F) > 1e-10 {
                fmt.Printf("第%d次猜值为%f\n", guess_num, x)
                x -= (x*x - F) / (2 * x)
                guess_num++
        }
        return x

}

func main() {
        fmt.Println("库函数求平方根math.Sqrt(8) =", math.Sqrt(8))
        fmt.Println("牛顿法求平方根newton(8) =", newton(8))
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run newton_method_sqrt.go 
库函数求平方根math.Sqrt(8) = 2.8284271247461903
第1次猜值为1.000000
第2次猜值为4.500000
第3次猜值为3.138889
第4次猜值为2.843781
第5次猜值为2.828469
第6次猜值为2.828427
牛顿法求平方根newton(8) = 2.8284271247461903

[meizhaohui@hellogitlab src]$ bc
bc 1.06.95
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'. 
2.8284271247461903*2.8284271247461903
8.0000000000000011
```
9/2*9/2=81/4=20.25
可以看到使用牛顿法和库求8的平方根的值是一样的。
示例中，牛顿法第1次猜值计算过程x= 1-(1*1-8)/(2*1)=1+7/2=4.5,第2次猜值计算过程x= 4.5-(4.5*4.5-8)/(2*4.5)=4.5-12.25/9=3.138888...。

##### ``switch``语句
- ``switch``语句用于基于不同条件执行不同动作，每一个``case``分支都是唯一的，从上至下逐一测试，直到匹配为止。

- ``switch``语句执行的过程从上至下，直到找到匹配项，匹配项后面也不需要再加``break``。

- ``switch``默认情况下``case``最后自带``break``语句，匹配成功后就不会执行其他``case``，如果需要执行后面的``case``，可以使用``fallthrough``。

- 语法格式如下:

```go
switch var1 {
    case val1:
        ...
    case val2:
        ...
    default:
        ...
}
```
- 变量``var1``可以是任何类型，而``val1``和``val2``则可以是同类型的任意值。
- 类型不被局限于常量或整数，但必须是相同的类型；或者最终结果为相同类型的表达式。
- 您可以同时测试多个可能符合条件的值，使用逗号分割它们，例如：``case val1, val2, val3``。

下面示例判断Go程序所处的操作系统环境:
```go
[meizhaohui@hellogitlab src]$ cat base_switch.go 
/*
 *      Filename: base_switch.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: switch语句的使用
 *   Create Time: 2019-12-07 20:45:40
 * Last Modified: 2019-12-07 20:50:00
 */
package main

import "fmt"
import "runtime"

func main() {
        fmt.Print("Golang runs on ")
        switch os := runtime.GOOS; os {
        case "windows":
                fmt.Println("Windows System")
        case "linux":
                fmt.Println("Linux System")
        default:
                fmt.Printf("%s System", os)

        }
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run base_switch.go 
Golang runs on Linux System
[meizhaohui@hellogitlab src]$ go env|grep GOOS
GOOS="linux"
```

在Windows系统上面运行程序：
```sh
$ go run base_switch.go
Golang runs on Windows System

$ go env|findstr GOOS
set GOOS=windows
```


可以看出通过程序获取到的操作系统类型与通过``go env``获取到的环境是一致的。

- 没有条件的``switch``同``switch true``一样。

下面的``switch``没有设置条件:
```go
[meizhaohui@hellogitlab src]$ cat switch_no_condition.go 
/*
 *      Filename: switch_no_condition.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: 没有条件的switch语句
 *   Create Time: 2019-12-07 20:58:19
 * Last Modified: 2019-12-07 21:05:15
 */
package main

import (
        "fmt"
        "time"
)

func main() {
        nowtime := time.Now()
        switch {
        case nowtime.Hour() < 12:
                fmt.Println("Good morning!")
        case nowtime.Hour() < 17:
                fmt.Println("Good afternoon!")
        default:
                fmt.Println("Good evening!")
        }
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run switch_no_condition.go 
Good evening!
```

- 使用``fallthrough``会强制执行后面的``case``语句，``fallthrough``不会判断下一条``case``的表达式结果是否为``true``。

下面代码中使用``fallthrough``关键字：
```go
[meizhaohui@hellogitlab src]$ cat switch_fallthrough.go 
/*
 *      Filename: switch_fallthrough.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: switch语句中使用fallthrough关键字
 *   Create Time: 2019-12-07 21:07:54
 * Last Modified: 2019-12-07 21:13:06
 */
package main

import "fmt"

func main() {
        switch {
        case false:
                fmt.Println("1. condition is false.")  
                fallthrough
        case true:
                fmt.Println("2. condition is true.")
                fallthrough
        case false:
                fmt.Println("3. condition is false.")
                fallthrough
        case true:
                fmt.Println("4. condition is true.")
        case false:
                fmt.Println("5. condition is false.")
                fallthrough
        default:
                fmt.Println("6. default case")
        }
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run switch_fallthrough.go 
2. condition is true.
3. condition is false.
4. condition is true.
```
从以上代码输出的结果可以看出：``switch``从第一个判断表达式为``true``的``case``开始执行，如果``case``带有 ``fallthrough``，程序会继续执行下一条``case``，且它不会去判断下一个``case``的表达式是否为``true``。

##### ``defer``延迟执行语句

- ``defer``的思想类似于C++中的析构函数，不过Go语言中"析构"的不是对象，而是函数，``defer``就是用来添加函数结束时执行的语句。
- ``defer``类似于先进后出栈。

下面看一下``defer``语句的使用。
```go
[meizhaohui@hellogitlab src]$ cat base_defer.go       
/*
 *      Filename: base_defer.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: defer语句的使用
 *   Create Time: 2019-12-07 21:27:21
 * Last Modified: 2019-12-07 22:54:38
 */
package main

import "fmt"

func main() {
        defer fmt.Println("World")
        fmt.Println("Hello")
        for i := 0; i < 4; i++ {
                defer fmt.Println(i)
        }
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run base_defer.go 
Hello
3
2
1
0
World
```
可以看到虽然``fmt.Println("World")``语法在代码中先定义，但却是在``fmt.Println("Hello")``执行后再执行的，说明``defer``延迟语句起了作用。

同时，因为在``for``循环体中也使用了``defer``延迟语句，按照先进后出规则，对于``for``循环会依次打印3、2、1、0,``for``循环结尾后，最后再打印栈底的"World"。

另一个典型的应用是在文件读写时关闭文件。
```go
[meizhaohui@hellogitlab src]$ cat defer.go 
/*
 *      Filename: defer.go
 *        Author: Zhaohui Mei<mzh.whut@gmail.com>
 *   Description: defer语句的使用
 *   Create Time: 2019-12-07 21:27:21
 * Last Modified: 2019-12-07 23:09:10
 */
package main

import (
        "fmt"
        "os"
)

func main() {
        f := createFile("./defer.txt")
        defer closeFile(f)
        writeFile(f)
}

func createFile(p string) *os.File {
        fmt.Println("creating")
        f, err := os.Create(p)
        if err != nil {
                panic(err)
        }
        return f
}
func writeFile(f *os.File) {
        fmt.Println("writing")
        f.Write([]byte("hello golang!\n"))
}

func closeFile(f *os.File) {
        fmt.Println("closing")
        f.Close()
}
```

运行程序：
```sh
[meizhaohui@hellogitlab src]$ go run defer.go 
creating
writing
closing
[meizhaohui@hellogitlab src]$ cat defer.txt 
hello golang!
```

可以看到因为使用了``defer closeFile(f)``进行了延迟，文件描述符f并没有立即执行，而是当写文件完成后，才关闭了文件描述符f。否则的话，不会写文件，也就查看不到defer.txt文件的内容了。









