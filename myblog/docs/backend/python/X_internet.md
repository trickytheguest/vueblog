# 网络

[[toc]]

在讨论并发时，主要讨论的是时间：单机解决方案(进程、线程和绿色线程)。还简单但是绝对了网络化的解决方案(Redis)。现在我们来单独介绍一下网络化，也就是跨空间的分布式计算。

## 模式

你可以使用一些基础的模式来搭建网络化应用。

最常见的`模式`是`请求-响应`，也被称为`客户端-服务器`模式，这个模式是同步的，用户会一直等待服务器的响应。你的web浏览器就是一个客户端，向web服务器发起一个HTTP请求并等待响应。

另一种常见的模式是`推送或者扇出`，你把数据发送到一个进程池中，空闲的工作进程会进行处理，一个典型的例子是有负载均衡的web服务器。

和推送相反的是`拉取或者扇入`，你从一个或者多个源接收数据，一个典型的例子是记录器，它会从多个进程接收文本信息并把它们写入一个日志文件中。

还有一个和收音机或者电视广播很像的模式`发布-订阅`模式，这个模式中，会有发送数据的发布者，在简单的发布-订阅系统中，所有的订阅者都会收到一份副本，更常见的情况是，订阅者只关心特定类型的数据(通常被称为话题)，发布者只会发送这些数据，因此，和推送模式不同，可能会有超过一个订阅者收到数据。如果一个话题没有订阅者，相关的数据会被忽略。

### 发布-订阅模式

发布-订阅模式并不是队列，而是广播。一个或多个进程发布信息，每个订阅进程声明自己感兴趣的消息类型，然后每个消息都会被复制一份发给感兴趣的订阅进程。因此，一个消息可能只被处理一次，也可能多于一次，还可能完全不被处理。每个发布者只负责广播，并不知道谁(如果有人的话)在监听。


#### Redis发布订阅模式

你可以使用Redis搭建一个发布订阅系统。发布者会发出包含话题和值的消息，订阅者会声明它们对什么话题感兴趣。

下面是发布者，redis_pub.py:

```py
import redis
import random

conn = redis.Redis()

cats = ['catA', 'catB', 'catC', 'catD']
hats = ['hatA', 'hatB', 'hatC', 'hatD']
for msg in range(10):
    cat = random.choice(cats)
    hat = random.choice(hats)
    print('Publish: %s wears a %s' % (cat, hat))
    conn.publish(cat, hat)
```

每个话题是猫🐱的一个品种，每个消息的值是帽子的一种类型。

下面是订阅者，redis_sub.py:

```py
import redis
conn = redis.Redis()
topics = ['catA', 'catC']
sub = conn.pubsub()
sub.subscribe(topics)
for msg in sub.listen():
    print(msg)
    if msg['type'] == 'message':
        cat = msg['channel']
        hat = msg['data']
        print('Subscribe: %s wears a %s' % (cat, hat))
    import time
    time.sleep(1)
```

订阅者只会展示猫的品种为`catA`或者`catC`的消息，`listen()`方法会返回一个字典，如果它的类型是`message`消息，那就是由发布者发出的消息，`channel`键是话题(猫的种类)，`data`键包含消息的值(帽子)。

注意一点，如果先启动发布者，这时没有订阅者，就像电台发布广播却没有听从一样。我们需要先启动订阅者：

```sh
/usr/local/bin/python3 redis_sub.py
{'type': 'subscribe', 'pattern': None, 'channel': b'catA', 'data': 1}
{'type': 'subscribe', 'pattern': None, 'channel': b'catC', 'data': 2}
```

此时，订阅者在监听发布者发布的消息，一直等待发布者发布消息，我们再启动发布者，它会发布10个消息：

```sh
/usr/local/bin/python3 redis_pub.py
Publish: message 0 : catB wears a hatA
Publish: message 1 : catC wears a hatA
Publish: message 2 : catA wears a hatD
Publish: message 3 : catA wears a hatC
Publish: message 4 : catB wears a hatB
Publish: message 5 : catD wears a hatC
Publish: message 6 : catD wears a hatD
Publish: message 7 : catA wears a hatA
Publish: message 8 : catD wears a hatD
Publish: message 9 : catB wears a hatD

Process finished with exit code 0
```

这时，可以在订阅者运行的控制台可以看到监听到了消息：

```sh
/usr/local/bin/python3 redis_sub.py
{'type': 'subscribe', 'pattern': None, 'channel': b'catA', 'data': 1}
{'type': 'subscribe', 'pattern': None, 'channel': b'catC', 'data': 2}
{'type': 'message', 'pattern': None, 'channel': b'catC', 'data': b'hatA'}
Subscribe: b'catC' wears a b'hatA'
{'type': 'message', 'pattern': None, 'channel': b'catA', 'data': b'hatD'}
Subscribe: b'catA' wears a b'hatD'
{'type': 'message', 'pattern': None, 'channel': b'catA', 'data': b'hatC'}
Subscribe: b'catA' wears a b'hatC'
{'type': 'message', 'pattern': None, 'channel': b'catA', 'data': b'hatA'}
Subscribe: b'catA' wears a b'hatA'
```
此时可以看到，订阅者获取到的消息与发布者发布的消息的顺序是相同的，获取到发布者的以下消息：

```sh
Publish: message 1 : catC wears a hatA
Publish: message 2 : catA wears a hatD
Publish: message 3 : catA wears a hatC
Publish: message 7 : catA wears a hatA
```

我们并没有让订阅者退出，因此它会一直等待消息。如果重新启动一个发布者，那订阅者会继续抓取消息并输出。我们重新运行一下redis_pub.py,在redis_sub.py控制台可以看到订阅者仍然可以接收到新的消息:


```sh
/usr/local/bin/python3 redis_sub.py
{'type': 'subscribe', 'pattern': None, 'channel': b'catA', 'data': 1}
{'type': 'subscribe', 'pattern': None, 'channel': b'catC', 'data': 2}
{'type': 'message', 'pattern': None, 'channel': b'catA', 'data': b'hatC'}
Subscribe: b'catA' wears a b'hatC'
{'type': 'message', 'pattern': None, 'channel': b'catA', 'data': b'hatB'}
Subscribe: b'catA' wears a b'hatB'
{'type': 'message', 'pattern': None, 'channel': b'catC', 'data': b'hatA'}
Subscribe: b'catC' wears a b'hatA'
{'type': 'message', 'pattern': None, 'channel': b'catC', 'data': b'hatB'}
Subscribe: b'catC' wears a b'hatB'
{'type': 'message', 'pattern': None, 'channel': b'catA', 'data': b'hatD'}
Subscribe: b'catA' wears a b'hatD'
{'type': 'message', 'pattern': None, 'channel': b'catA', 'data': b'hatC'}
Subscribe: b'catA' wears a b'hatC'
{'type': 'message', 'pattern': None, 'channel': b'catA', 'data': b'hatC'}
Subscribe: b'catA' wears a b'hatC'
{'type': 'message', 'pattern': None, 'channel': b'catA', 'data': b'hatD'}
Subscribe: b'catA' wears a b'hatD'
{'type': 'message', 'pattern': None, 'channel': b'catC', 'data': b'hatA'}
Subscribe: b'catC' wears a b'hatA'
{'type': 'message', 'pattern': None, 'channel': b'catC', 'data': b'hatD'}
Subscribe: b'catC' wears a b'hatD'
{'type': 'message', 'pattern': None, 'channel': b'catC', 'data': b'hatA'}
Subscribe: b'catC' wears a b'hatA'
{'type': 'message', 'pattern': None, 'channel': b'catC', 'data': b'hatB'}
Subscribe: b'catC' wears a b'hatB'
```

### ZeroMQ发布订阅模式

ZeroMQ没有核心的服务器，因此每个发布者都会发送给所有订阅者。我们来使用ZeroMQ重写一下上面的猫-帽子示例。

安装ZeroMQ python包：

```sh
pip install pyzmq
```

参考：[https://zeromq.org/languages/python/](https://zeromq.org/languages/python/)

发布者为zmq_pub.py，内容如下：

```py
import zmq
import random
import time

host = '*'
port = 6789
ctx = zmq.Context()
pub = ctx.socket(zmq.PUB)
pub.bind('tcp://%s:%s' % (host, port))

cats = ['catA', 'catB', 'catC', 'catD']
hats = ['hatA', 'hatB', 'hatC', 'hatD']
time.sleep(1)

for msg in range(10):
    cat = random.choice(cats)
    hat = random.choice(hats)
    cat_bytes = cat.encode('utf-8')
    hat_bytes = hat.encode('utf-8')
    print('Publish: message %s : %s wears a %s' % (msg, cat, hat))
    pub.send_multipart([cat_bytes, hat_bytes])
```

注意代码是如何用UTF-8来编码话题和值字符串的。

下面是订阅者zmq_sub.py:

```py
import zmq

host = '127.0.0.1'
port = 6789
ctx = zmq.Context()
sub = ctx.socket(zmq.SUB)
sub.connect('tcp://%s:%s' % (host, port))

topics = ['catA', 'catC']
for topic in topics:
    sub.setsockopt(zmq.SUBSCRIBE, topic.encode('utf-8'))

while True:
    cat_bytes, hat_bytes = sub.recv_multipart()
    cat = cat_bytes.decode('utf-8')
    hat = hat_bytes.decode('utf-8')
    print('Subscribe: %s wears a %s' % (cat, hat))
```

在这段代码中，我们订阅了两个不同的比我值，用UTF-8编码的topics中的两个字符串。

假如你要订阅所有话题，需要订阅空比特字符串`b''`，否则什么消息都得不到。

注意，我们在发布者中调用了`send_multipart()`，在订阅者中调用了`recv_multipart()`，这样就可以收到消息的多个部分并使用第一部分来判断话题是否匹配。也可以选择使用一个字符串或者比特字符串来发送话题和消息值，但是把猫和帽子分开发送会更加清晰。

像Redis消息订阅一样，我们先启动订阅者，再启动发布者。

启动订阅者：

```sh
/usr/local/bin/python3 zmq_sub.py
```

此时订阅者会一直等待发布者发送消息，程序一直运行中，控制台没有其他输出。

启动发布者，它会立即发布10条消息并退出：

```sh
/usr/local/bin/python3 zmq_pub.py
Publish: message 0 : catD wears a hatA
Publish: message 1 : catB wears a hatC
Publish: message 2 : catD wears a hatD
Publish: message 3 : catC wears a hatB
Publish: message 4 : catC wears a hatB
Publish: message 5 : catA wears a hatC
Publish: message 6 : catC wears a hatD
Publish: message 7 : catC wears a hatD
Publish: message 8 : catD wears a hatD
Publish: message 9 : catA wears a hatA

Process finished with exit code 0
```

这时，可以在订阅者控制台看到输出了它想要的内容：

```sh
/usr/local/bin/python3 zmq_sub.py
Subscribe: catC wears a hatB
Subscribe: catC wears a hatB
Subscribe: catA wears a hatC
Subscribe: catC wears a hatD
Subscribe: catC wears a hatD
Subscribe: catA wears a hatA
```

我们再运行一次发布者，这时再在订阅者控制台查看，发现会多出几条输出消息：

```sh
/usr/local/bin/python3 /Users/mzh/PycharmProjects/base/zmq_sub.py
Subscribe: catC wears a hatB
Subscribe: catC wears a hatB
Subscribe: catA wears a hatC
Subscribe: catC wears a hatD
Subscribe: catC wears a hatD
Subscribe: catA wears a hatA (# 以下4条输出是多出的消息)
Subscribe: catA wears a hatB
Subscribe: catA wears a hatB
Subscribe: catC wears a hatD
Subscribe: catA wears a hatC
```

### 其他发布订阅工具

- RabbitMQ, 这是一个非常著名的消息发送器。
    - 需要安装RabbitMQ服务端和客户端，pika是RabbitMQ的Python客户端。可参考以下链接：
    - [https://www.rabbitmq.com/tutorials/tutorial-one-python.html](https://www.rabbitmq.com/tutorials/tutorial-one-python.html)
    - [https://www.rabbitmq.com/tutorials/tutorial-three-python.html](https://www.rabbitmq.com/tutorials/tutorial-three-python.html)
    - `pip install pika`安装pika包。参考[https://pypi.org/project/pika/](https://pypi.org/project/pika/)
    - pika包的使用文档[https://pika.readthedocs.io/en/stable/](https://pika.readthedocs.io/en/stable/)
- pysubsub，参考：
    - `pip install PyPubSub`安装`PyPubSub`包。
    - Github code:[https://github.com/schollii/pypubsub](https://github.com/schollii/pypubsub)
    - Project on PyPI: [https://pypi.python.org/pypi/PyPubSub](https://pypi.python.org/pypi/PyPubSub)
    - The documentation for latest stable release is at [http://pypubsub.readthedocs.io](http://pypubsub.readthedocs.io).    - The documentation for latest code is at [http://pypubsub.readthedocs.io/en/latest](http://pypubsub.readthedocs.io/en/latest).


## TCP/IP协议

我们一直处在网络的世界中，理所当然地认为底层的一切都可以正常的工作。现在，我们来真正的深入底层，看看那些维持系统运转的东西到底是什么样的。

因特网是基于规则的，这些规则定义了如何创建连接、交通数据、终止连接、处理超时等，这些规则被称为`协议`，它们分布在不同的层中。分层的目的是兼容多种实现方法。你可以在某一层中做任何想做的事，只要遵循上一层和下一层的约定就行。

最底层处理的是电信号，其余层都基于下面的层构建而成。在大约中间的位置是IP(因特网协议)层，这层规定了网络位置和地址的映射方法以及数据包(块)的传输方式。IP层的上一层有两个协议描述了如何在两个位置之间移动比特。

- UDP(用户数据报协议)
    
    这个协议被用来进行少量数据交换。一个数据报是一次发送的很少信息，就像明信片上的一个音符🎶一样。
    
- TCP(传输控制协议)

    这个协议被用来进行长时间的连接。它会发送比特流并确保它们都按序到达并且不会重复。
    
UDP信息并不需要确认。因此你永远无法确认它是否到达目的地。

TCP会在发送者和接收者之间通过秘密握手建立有保障的连接。

你的本地机器IP地址一直是`127.0.0.1`，名称一直是`localhost`，也可以称为`回环接口`。如果连接到因特网，那你的机器还会有一个公共IP。如果使用的是家用计算机，那它一般会接到调制解调器或路由器上。你甚至可以在同一台机器的两个进程之间使用因特网协议。

在因特网上，我们接触到的大多数带我--Web、数据库服务器、等等--都是基于IP协议上的TCP协议运行的。简单起见，写为`TCP/IP`。下面先看一些基本的因特网服务，然后了解一些常用的网络化框式。

## 套接字socket

我们一直把这个话题留到现在才讲，是因为即使你不知道所有的底层细节也可以使用高层的因特网。但是，如果你想知道底层的工作原理，那就需要了解套接字socket。

最底层的网络编程使用的是套接字，源于C语言和Unix操作系统。套接字层的编程是非常繁琐的。使用类似ZeroMQ的库会简单很多，但是了解一下底层的工作原理还是非常有用的。举例来说，网络发生错误时出现的错误信息通常是和套接字相关的。

我们来编写一个非常简单的客户端-服务器通信示例。客户端发送一个包含字符串的UDP数据报给服务器，服务器会返回一个包含字符串的数据包。服务器需要监听特定的地址和端口--就像邮局和邮筒一样。客户端需要知道这个值才能发送、接收和响应消息。

在下面的客户端和服务器代码中，`address`是一个(地址，端口)元组。 `address`是一个字符串，可以是名称或者IP地址，当你的程序和同一台机器上的另一个程序通信时，可以使用名称`localhost`或者等价的地址`127.0.0.1`。

首先编写服务器端程序，udp_server.py:

```py
from datetime import datetime
import socket

server_address = ('localhost', 6789)
max_size = 4096
print('Starting the server at %s' % datetime.now())
print('Waiting for a client to call.')
server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server.bind(server_address)

data, client = server.recvfrom(max_size)
print('At %s %s said %s' % (datetime.now(), client, data))
server.sendto(b'Are you talking to me?', client)
server.close()
```

增加说明后的服务器端程序，udp_server.py:

```py
from datetime import datetime
import socket

# 指定服务器端的IP地址和端口号
server_address = ('localhost', 6789)
# 最大接收数据量
max_size = 4096
print('Starting the server at %s' % datetime.now())
print('Waiting for a client to call.')
# 建立网络连接，使用socket.socket创建一个套接字
# AF_INET表示创建一个因特网(IP)套接字
# SOCK_DGRAM表示我们要发送和接收数据报，即使用UDP
server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# 使用bind绑定到套接字上，也就是监听这个IP地址和端口的所有数据
server.bind(server_address)

# recvfrom等待数据报送达，数据报送达后，服务器会被唤醒并获取数据和客户端的信息
# client变量包含客户端的地址和端口，用于给客户端发送数据
# data变量用于保存客户端发送的数据
data, client = server.recvfrom(max_size)
print('At %s %s said %s' % (datetime.now(), client, data))
# 向客户端发送一个响应
server.sendto(b'Are you talking to me?', client)
# 关闭连接
server.close()
```

服务器端程序首先定义服务端的IP地址和端口元组`server_address`以及最大允许传送的数据量`max_size`字节数，允许最多4096个字节，超过该字节数的数据会被截断。

`server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)`会启动一个使用UDP的因特网套接字，然后`server.bind(server_address)`绑定、监听这个IP地址和端口的所有数据。

`data, client = server.recvfrom(max_size)`会等待客户端的数据报到达，收到数据报后，服务器端会被唤醒并获取到客户端发送的数据以及客户端信息，`data`是获取到的用户发送的数据，最多不能超过`max_size`个字节，`client`是客户端信息，包含客户端的IP地址和端口号。

`server.sendto(b'Are you talking to me?', client)` 向客户端发送一个响应，最后使用`server.close()`关闭连接。

此处我们需要先运行服务器端，然后再运行客户端程序。

我们先运行服务器端程序：

```sh
/usr/local/bin/python3 udp_server.py
Starting the server at 2020-06-13 08:39:17.857956
Waiting for a client to call.
```

此时服务器端已经启动，等待客户端发送请求。此时它会一直沉默，直到客户端发送数据。

然后我们再编写客户端程序udp_client.py:

```py
from datetime import datetime
import socket

server_address = ('localhost', 6789)
max_size = 4096
print('Starting the client at %s' % datetime.now())
client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
client.sendto(b'Hello!', server_address)

data, server = client.recvfrom(max_size)
print('At %s %s said %s' % (datetime.now(), server, data))
client.close()
```

增加注释信息后如下：

```py
from datetime import datetime
import socket

# 指定服务器端的IP地址和端口号
server_address = ('localhost', 6789)
# 最大接收数据量
max_size = 4096
print('Starting the client at %s' % datetime.now())

# 建立网络连接，使用socket.socket创建一个套接字
# AF_INET表示创建一个因特网(IP)套接字
# SOCK_DGRAM表示我们要发送和接收数据报，即使用UDP
client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# 客户端向服务端发送数据
client.sendto(b'Hello!', server_address)

# 客户端接收服务端的响应数据
# server变量包含服务端的地址和端口
# data变量用于保存服务端响应的数据
data, server = client.recvfrom(max_size)
print('At %s %s said %s' % (datetime.now(), server, data))
# 关闭连接
client.close()
```

客户端程序的许多方法和服务器端的一样，除了没有`bind()`方法，客户端同样使用`socket.socket()`建立因特网套接字，使用`client.sendto()`发送请求，使用`client.recvfrom()`接送服务端的响应，使用`client.close()`关闭连接。

我们在另一个窗口中启动客户端程序，它会打印出欢迎信息并向服务端发送请求数据，并打印出服务端的响应并退出：

```sh
/usr/local/bin/python3 udp_client.py
Starting the client at 2020-06-13 08:51:31.130012
At 2020-06-13 08:51:31.133815 ('127.0.0.1', 6789) said b'Are you talking to me?'

Process finished with exit code 0
```

此时在服务器端控制台输出中可以看到有响应，并增加了输出内容：

```sh
/usr/local/bin/python3 udp_server.py
Starting the server at 2020-06-13 08:39:17.857956
Waiting for a client to call.
At 2020-06-13 08:51:31.133642 ('127.0.0.1', 65450) said b'Hello!'    # 说明，此行是增加的输出

Process finished with exit code 0
```

需要说明的是，客户端需要知道服务器端的地址和端口号，但是并不需要指定自己的端口号。它的端口号由系统自动分配--在本例中是65450。


UDP使用一个块来发送数据，并且不能保证一定可以送达。如果你使用UDP发送多个消息，那它们可能以任何顺序到达，也有可能全部都无法到达。UDP很快，很轻，不需要建立连接，但是并不可靠。

由于UDP不可靠。我们准备使用TCP(传输控制协议)。TCP用来进行长时间的连接，比如WEB服务。TCP按照发送的顺序传输数据。如果出现任何问题，它会尝试重新传输。我们尝试一下使用TCP在客户端和服务端之间传输一些包。

我们下面来编写服务端和客户端的程序。

我们先增加服务端代码tcp_server.py:

```py
from datetime import datetime
import socket

# 指定服务器端的IP地址和端口号
server_address = ('localhost', 6789)
# 最大接收数据量
max_size = 4096
print('Starting the server at %s' % datetime.now())
print('Waiting for a client to call.')
# 建立网络连接，使用socket.socket创建一个套接字
# AF_INET表示创建一个因特网(IP)套接字
# 注意此处将SOCK_DGRAM改成了SOCK_STREAM，表示使用TCP流协议
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 使用bind绑定到套接字上，也就是监听这个IP地址和端口的所有数据
server.bind(server_address)
# 最多可以与5个客户端连接，超过5个就会拒绝
server.listen(5)

# server.accept()接收第一个到达的消息
# client变量包含客户端的地址和端口，用于给客户端发送数据
# data变量用于保存客户端发送的数据
client, addr = server.accept()
# 指字最大的可接收消息长度为max_size字节
data = client.recv(max_size)
print('At %s %s said %s' % (datetime.now(), client, data))
print('The client address:', addr)
# 向客户端发送一个响应
client.sendall(b'Are you talking to me?')
client.close()
# 关闭连接
server.close()
```

然后启动服务端程序，控制台会输出信息，并等待客户端请求：

```sh
/usr/local/bin/python3 tcp_server.py
Starting the server at 2020-06-14 07:15:39.162465
Waiting for a client to call.
```

再编写客户端程序tcp_client.py:

```py
from datetime import datetime
import socket

# 指定服务器端的IP地址和端口号
server_address = ('localhost', 6789)
# 最大接收数据量
max_size = 4096
print('Starting the client at %s' % datetime.now())

# 建立网络连接，使用socket.socket创建一个套接字
# AF_INET表示创建一个因特网(IP)套接字
# 注意此处将SOCK_DGRAM改成了SOCK_STREAM，表示使用TCP流协议
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 使用connect()来建立流
# 使用UDP时不需要这么做，因为每个数据报都是直接暴露在互联网中
client.connect(server_address)

# 客户端向服务端发送数据
client.sendall(b'Hello!')

# 客户端接收服务端的响应数据
# data变量用于保存服务端响应的数据
data = client.recv(max_size)
print('At %s someone replied said %s' % (datetime.now(), data))
# 关闭连接
client.close()
```

我们启动客户端程序：

```sh
/usr/local/bin/python3 tcp_client.py
Starting the client at 2020-06-14 07:15:44.283065
At 2020-06-14 07:15:44.287791 someone replied said b'Are you talking to me?'

Process finished with exit code 0
```

此时查看服务端输出：

```sh
/usr/local/bin/python3 tcp_server.py
Starting the server at 2020-06-14 07:15:39.162465
Waiting for a client to call.
At 2020-06-14 07:15:44.287609 <socket.socket fd=6, family=AddressFamily.AF_INET, type=SocketKind.SOCK_STREAM, proto=0, laddr=('127.0.0.1', 6789), raddr=('127.0.0.1', 57130)> said b'Hello!'
The client address: ('127.0.0.1', 57130)

Process finished with exit code 0
```

发现增加了输出内容。服务器会收集消息，并打印出来，发送响应最后退出。

可以看到TCP服务器使用`client.sendall()`发送响应，之前的UDP服务器使用的是`client.sendto()`。TCP会维持多个客户端-服务器套接字并保存客户端的IP地址。

当编写复杂的代码时，套接字编码就会非常的难。下面是一些需要处理的问题。

- UDP可以发送消息，但是消息的大小有限制，而且不能保证消息到达目的地。
- TCP发送字节流，不是消息。你不知道每次调用时系统会发送或者接收多少字节。
- 如果要用TCP传输完整的消息，需要一些额外的信息来把片段拼凑成整个消息；固定的消息大小(字节)、整个消息的大小或者一些特殊的哨兵字符。
- 由于消息是字节，不是Unicde文本字符串，你需要使用python的bytes类型。

如果你对套接字编程感兴趣，可以参考Python套接字编程教程：

- [https://docs.python.org/3.6/library/socket.html](https://docs.python.org/3.6/library/socket.html)。
- [https://docs.python.org/3.6/howto/sockets.html](https://docs.python.org/3.6/howto/sockets.html)。


## ZeroMQ socket请求-响应对

我们之前使用ZeroMQ创建过发布订阅模式，现在我们使用ZeroMQ来进行scoket请求响应。

ZeroMQ是一个库，有时候也被称为打了激素的套接字(sockets on steroids)。ZeroMQ套接字实现了很多你需要但是普通套接字没有的功能：

- 传输完整的消息
- 重连
- 当发送方和接收方的时间不同步时缓存数据

ZeroMQ的在线教程[https://zeromq.org/languages/python/](https://zeromq.org/languages/python/)写得非常好，是作者见过的最好的讲解网络化模型的教程。本章会讲解一些Python写成的简单的ZeroMQ示例。

ZeroMQ就像乐高积木，我们可能用很少的积木就能搭建出很多东西。一样，你可以用很少几个套接字类型和模式来构建网络。下面的ZeroMQ的套接字类型，看下来像之前说过的网络模型：

- REQ(同步请求)
- REP(同步响应)
- DEALER(异步请求)
- ROUTER(异步响应)
- PUB(发布)
- SUB(订阅)
- PUSH(扇出)
- PULL(扇入)

安装Python的ZeroMQ库`pip instll pyzmq`。

最简单的模式是一个请求-响应对，这是同步的。一个套接字发送请求，另一个发送响应。

首先编写服务器端发送响应的代码， zmq_server.py:

```py
import zmq

# 定义服务器IP和端口
host = '127.0.0.1'
port = 6789

# 创建Context对象，是一个能够保存状态的ZeroMQ对象
context = zmq.Context()
# 创建一个REP类型的ZeroMQ套接字
server = context.socket(zmq.REP)
# 调用bind()，监听特定的IP地址和端口
# 此处地址和端口字符串不是普通套接字中的元组
server.bind('tcp://%s:%s' % (host, port))
while True:
    # 等待客户端的下一个请求，一直监听客户请求
    request_bytes = server.recv()
    request_str = request_bytes.decode('utf-8')
    print('Request says:%s' % request_str)
    reply_str = 'Stop saying: %s' % request_str
    reply_bytes = bytes(reply_str, 'utf-8')
    # 发送响应字节流
    server.send(reply_bytes)
```

先启动服务端zmq_server.py：

```sh
/usr/local/bin/python3 zmq_server.py
```

此时服务端没有任何输出，因为此时没有客户端请求！


我们再来编写客户端代码，zmq_client.py:

```py
import time
import zmq

# 定义服务器IP和端口
host = '127.0.0.1'
port = 6789

# 创建Context对象，是一个能够保存状态的ZeroMQ对象
context = zmq.Context()
# 创建一个REP类型的ZeroMQ套接字
client = context.socket(zmq.REQ)
# 此处地址和端口字符串不是普通套接字中的元组
client.connect('tcp://%s:%s' % (host, port))
for num in range(1, 6):
    request_str = 'message #%s' % num
    request_bytes = request_str.encode('utf-8')
    # 发送请求
    client.send(request_bytes)
    # 接收服务端响应
    reply_bytes = client.recv()
    reply_str = reply_bytes.decode('utf-8')
    print('Sent %s, receiced %s' % (request_str, reply_str))
    time.sleep(2)
```

这时我们运行客户端zmq_client.py:

```py
/usr/local/bin/python3 zmq_client.py
Sent message #1, receiced Stop saying: message #1
Sent message #2, receiced Stop saying: message #2
Sent message #3, receiced Stop saying: message #3
Sent message #4, receiced Stop saying: message #4
Sent message #5, receiced Stop saying: message #5

Process finished with exit code 0
```

客户端输出以上消息。此时可以在服务端看到也有消息输出：

```sh
/usr/local/bin/python3 zmq_server.py
Request says:message #1
Request says:message #2
Request says:message #3
Request says:message #4
Request says:message #5
```

如果你仔细观察，可以看到客户端和服务器的消息是交替出现的。

以上示例中，传输的消息都需要使用字节字符串形式发送，所以需要把字符串用UTF-8格式编码。你可以发送任意类型的消息，只要把它转换成`bytes`字节就行。我们的消息是简单的文本字符串，所以`encode()`和`decode()`可以实现文本字符串和字节字符串的转换。如果你的消息包含其他数据类型，可以使用类似MessagePack[https://msgpack.org/](https://msgpack.org/)的库来处理。

MessagePack：

![](/img/messagepack.png)

由于任何数量的REQ客户端都可以`connect()`到一个REP服务器，即使是基础的请求-响应模式也可以实现一些有趣的通信模式。服务器是同步的，一次只能处理一个请求，但是并不会丢弃这段时间到达的其他请求。ZeroMQ会触发某些限制之前一直缓存这些消息，走到它们被处理；这就是ZeroMQ中Q的意思，Q表示队列Queue，M表示消息Message，Zero表示不需要任何消息分发者。

虽然ZeroMQ不需要任何核心分发者(中间人)，但是如果需要，你可以搭建一个。举例来说，可以使用`DEALER`和`ROUTER`套接字异步连接到多个源和/或目标。

多个REQ套接字可以连接到一个ROUTER上，后者会把请求传递给DEALER，DEALER又会传递给和它连接的所有REP套接字。就像很多浏览器连接到一个代理服务器，后者连接到一个Web服务器群，你可以根据需要添加任意数量的客户端和服务器。

REQ套接字只能和ROUTER套接字连接； REALER可以和后面的多个REP套接字连接。ZeroMQ会处理具体的细节部分。确保请求的负载均衡并把响应发送给正确的目标。

另一种网络化的模式被称为`通风口`，使用PUSH套接字来发送异步任务，使用PULL套接字来收集结果。

最后一个需要介绍的ZeroMQ特性是它可以实现扩展和收缩，只需要改变创建的套接字连接类型即可：

- tcp适用于单机或者分布式的进程间通信
- tpc适用于单机的进程间通信
- inproc适用于单个进程内线程间通信， 这种是一种线程间无锁🔒的数据传输方式，可以替代`threading`。

使用ZeroMQ之后，你应该再也不想写原始的套接字代码了。

ZeroMQ并不是Python支持的唯一一个消息传递库。消息传递是网络化的一个重要内容。ActiveMQ和RabbitMQ项目也有相应的Python接口，你可以了解一下。


## 网络监控工具Scapy

有时候你需要深入网络流中处理字节，你可能想要调试Web API或者追踪一些安全问题。scapy库是一个优秀的Python数据包分析工具，比编写和调试C程序简单得多。实际上，它是一门简单的用来构建和分析数据包的语言。

Scapy是一款强大的交互式数据包处理工具、数据包生成器、网络扫描器、网络发现工具和包嗅探工具。它提供多种类别的交互式生成数据包或数据包集合、对 数据包进行操作、发送数据包、包嗅探、应答和反馈匹配等等功能。Python解释器提供交互功能，所以要用到Python编程知识（例如 variables、loops、和functions）。支持生成报告，且报告生成简单。

![](/img/animation-scapy-install.svg)

- Scapy的github源码地址[https://github.com/secdev/scapy](https://github.com/secdev/scapy)。
- 官网地址[https://scapy.net/](https://scapy.net/)。
- 官方文档[https://scapy.readthedocs.io/en/latest/](https://scapy.readthedocs.io/en/latest/)。

注意，不要将Scapy与Scrapy搞混！！！后续你可以阅读以上帮助文档详细学习Scapy工具。

## 网络服务

Python有许多网络工具。下面的内容会介绍如何用自动化的方式实现那些最流行的网络服务。可以参考官方的完整文档[https://docs.python.org/3.6/library/internet.html](https://docs.python.org/3.6/library/internet.html)。

### 域名系统

计算机有类似192.168.12.1的数字IP地址，但是相对数字，我们更容易记住名称。域名系统DNS是一个非常重要的网络服务，通过一个分布式的数据库实现IP地址和名称的转换。当你使用Web浏览器并且看到类似查找主机的消息时，那可能就是网络连接中断了，第一种可能就是DNS错误。

在底层`socket`模块中有一些DNS函数：

- `socket.gethostbyname()`会返回一个域名的IP地址。
- `socket.gethostbyname_ex()`扩展版本会返回名称、一个可选名称列表和一个地址列表。
- `socket.getaddrinfo()`方法会查找IP地址，不过返回的信息很全，可以用于创建套接字连接。

```py
[mzh@MacBookPro python (master ✗)]$ python3
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import socket
>>> socket.
Display all 216 possibilities? (y or n)
>>> addr = 'python.org'
>>> socket.gethostbyname(addr)
'45.55.99.72'
>>> socket.gethostbyname_ex(addr)
('python.org', [], ['45.55.99.72'])
>>> socket.getaddrinfo(addr)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: getaddrinfo() missing 1 required positional argument: 'port'
>>> socket.getaddrinfo(addr, 80)
[(<AddressFamily.AF_INET: 2>, <SocketKind.SOCK_DGRAM: 2>, 17, '', ('45.55.99.72', 80)), (<AddressFamily.AF_INET: 2>, <SocketKind.SOCK_STREAM: 1>, 6, '', ('45.55.99.72', 80))]
>>>
```

也可以直接只获取TCP或者UDP信息：

```py
>>> socket.getaddrinfo(addr, 80, socket.AF_INET, socket.SOCK_STREAM)
[(<AddressFamily.AF_INET: 2>, <SocketKind.SOCK_STREAM: 1>, 6, '', ('45.55.99.72', 80))]
>>>
```

有些TCP和UDP端口号是IANA为特定服务保留的，每个端口号关联一个服务名。举例来说，`HTTP`关联的名称是`http`，关联到TCP端口`80`,下面的函数可以实现服务名和端口号的转换：

```py
>>> import socket
>>> socket.getservbyname('http')
80
>>> socket.getservbyname('https')
443
>>> socket.getservbyport(80)
'http'
>>> socket.getservbyport(443)
'https'
```

### Email邮件模块

标准库中有以下这些Email模块：

- `smtplib`使用简单邮件传输协议(SMTP)发送邮件，我们经常在自动化任务中使用python自动发送邮件通知，后续可以补充此模块的详细使用方法。
- `email`用来创建和解析邮件。
- `poplib`可以使用邮递协议(POP3)来读取邮件。
- `imaplib`可以使用因特网消息访问协议(IMAP)来读取邮件。

官方文档包含这些库对应的示例代码[https://docs.python.org/3/library/email.html](https://docs.python.org/3/library/email.html)。SMTP协议客户端可以参考[https://docs.python.org/3/library/smtplib.html#module-smtplib](https://docs.python.org/3/library/smtplib.html#module-smtplib)。如果你想编写自己的Python SMTP服务器，可以试试`smtpd`模块，参考[https://docs.python.org/3/library/smtpd.html#module-smtpd](https://docs.python.org/3/library/smtpd.html#module-smtpd)。

### 其他协议

标准的`ftplib`模块[https://docs.python.org/3/library/ftplib.html](https://docs.python.org/3/library/ftplib.html)可以使用文件传输协议(FTP)来发送字节。虽然这是一个很古老的协议，但它的表现仍然非常优秀。

现在已经介绍了很多标准库中的模块，不过还是推荐你阅读一下标准库文档中的网络协议[https://docs.python.org/3/library/internet.html](https://docs.python.org/3/library/internet.html)部分。
![](/img/internet_protocols.png)


## Web服务和API

信息提供商都有网站，但是这些网站的目标是普通用户，并不是自动化。如果数据只展示在网页上，那想要获取并结构化这些数据的人就必须编写爬虫，在页面格式改变时还必须更新爬虫，这是一件很麻烦的事情，但是如果一个网站提供数据API，那对于客户端程序来说，数据的获取就会变得非常直观。相比网页布局，API很少改变，因此客户端也不需要经常重写。一个快速、整洁的数据通道可以大大简化混搭程序的编写难度。



















