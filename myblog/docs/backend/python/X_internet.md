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

