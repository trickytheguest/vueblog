# Python并发

[[toc]]

在计算机中，如果你的程序在等待，通常是因为以下两个原因：

- I/O限制，这个限制很常见，计算机的CPU速度非常快，比计算机内存快几百倍，比硬盘或者网络快几千倍。
- CPU限制，在处理数字运算任务时，比如科学计算或者图形计算，很容易遇到这个限制。

并发相关术语：

- 同步(Synchronous)，一件事情接着一件事情处理。
- 异步(asynchronous)，任务是相互独立的。

当你要用简单的系统和任务来处理现实中的问题时，迟早需要处理并发。

假设你有一个网站，必须给用户很快地返回静态和动态网页，一秒是可以接受的，但是如果展示或者交互需要很长时间，用户就会失去耐心，页面速度加载降低一点就会导致流量大幅下降。

但是，如何处理需要长时间执行的任务呢，如上传文件、改变图片大小或者查询数据库？显然无法用同步的Web客户端代码解决这个问题，因为同步就必然会产生等待。

在一台电脑中，如果你想尽快处理多个任务，就需要让它们互相独立。慢任务不应该阻塞其他任务。

下面我们看一下多任务管理方法：队列。



## 队列

队列有点像列表，从一头添加事物，从另一头取出事物，这种队列被称为`FIFO(先进先出)`， 即`First In First Out`。

假设你正在洗盘子，如果需要完成全部工作，需要洗好每一个盘子、烘干并放好。你有很多种方法来完成这个任务。或许人会先洗好第一个盘子，烘干并把它放好。之后用同样的方法来处理第二个盘子，比此类推。此外，你也可以执行批量操作，先洗好所有的盘子，再烘干所有的盘子，最后把它们都放好。这样做需要你有足够大的水池和烘干机来放置每一步积累的所有盘子。这些都是同步方法--一个工人，一次做一件事。

还有一种方法是再找一个或者两个帮手。如果你是洗盘子的人，可以把洗好的盘子递给烘干盘子的人，他再把烘干的盘子递给放置盘子的人。所有人都在自己的位置工作，这样会比你一个人要快得多。

然而，如果你洗盘子的速度比下一个人烘干的速度快怎么办？要么把湿盘子扔在地上，要么把它们堆在你和下一个之间，或者一直闲着直到下一个人处理完成之前的盘子。如果最后一个人比第二个人还慢，那第二个人要么把盘子扔在地上，要么把它们堆在两个人之间，要么就闲着。你有很多个工人，但总体来说，任务仍然是同步完成的，处理速度和最慢的工人速度是一样的。

俗话说，人多好办事。增加工人可以更快地洗盘子，前提是使用`队列`。

通常来说，队列用来传递消息，消息可以是任意类型的消息。在本例中，我们用队列来管理分布式任务，这种队列也称为`工作队列`或者`任务队列`。水池中的每个盘子都会发给一个闲置的洗盘子的人，他会洗盘子并把盘子传给一个闲置的烘干盘子的人，他会烘干盘子并把盘子传给一个闲置的放盘子的人。这个过程可以是`同步`的(工人等着处理盘子，处理完等着把盘子给下一个人)，也可以是`异步`的(盘子堆在两个工人中间)。只要你有足够多的工人并且他们都能认真工作，完成速度会非常快。

### 进程

你可以用很多方法来实现队列。对单机来说，标准库中的`multiprocessing`模块有一个`Queue`函数。接下来模拟一个洗盘子的人和多个烘干进程（不用担心，会有人放盘子放好）。我们使用一个中间队列`dish_queue`，把下面的代码保存到`dishes.py`中：

```py
# Filename: dishes.py
import multiprocessing as mp


def washer(dishes, output):
    """洗盘子"""
    for dish in dishes:
        print('Washing %s dish' % dish)
        output.put(dish)


def dryer(input):
    """烘干盘子"""
    while True:
        dish = input.get()
        print('Drying %s dish' % dish)
        input.task_done()


def main():
    """构建队列"""
    dish_queue = mp.JoinableQueue()
    dish_proc = mp.Process(target=dryer, args=(dish_queue,))
    dish_proc.daemon = True
    dish_proc.start()

    dishes = ['p1', 'p2', 'p3', 'p4']
    washer(dishes, dish_queue)
    dish_queue.join()


if __name__ == '__main__':
    main()
```

运行这个程序，输出如下：

```sh
$ python3 dishes.py
Washing p1 dish
Washing p2 dish
Washing p3 dish
Washing p4 dish
Drying p1 dish
Drying p2 dish
Drying p3 dish
Drying p4 dish
```

这个队列看起来像一个简单的Python迭代器，会生成一系列盘子。这段代码实际上会启动几个独立的进程，先盘子的人和烘干盘子的人会用它们来进行通信。我使用`JoinableQueue`和最后的`join()`方法让洗盘子的人知道，所有的盘子都已经烘干。


增加一些`print`语句，打印一下PID:

```py
# Filename: dishes.py
import os
import multiprocessing as mp


def washer(dishes, output):
    """洗盘子"""
    print('working in washer. PID: %s' % os.getpid())
    for dish in dishes:
        print('Washing %s dish' % dish)
        print('working in washer for before output.put. PID: %s' % os.getpid())
        output.put(dish)
        print('working in washer for after outout.put. PID: %s' % os.getpid())


def dryer(input):
    """烘干盘子"""
    print('working in dryer. PID: %s' % os.getpid())
    while True:
        print('working in dryer. before input.get(). PID: %s' % os.getpid())
        dish = input.get()
        print('working in dryer. after input.get(). PID: %s' % os.getpid())
        print('Drying %s dish' % dish)
        input.task_done()
        print('working in dryer. after input.task_done(). PID: %s' % os.getpid())



def main():
    """构建队列"""
    print('working in main. PID: %s' % os.getpid())
    dish_queue = mp.JoinableQueue()
    dish_proc = mp.Process(target=dryer, args=(dish_queue,))
    dish_proc.daemon = True
    dish_proc.start()

    dishes = ['p1', 'p2', 'p3', 'p4']
    print('working in main. before washer() PID: %s' % os.getpid())
    washer(dishes, dish_queue)
    print('working in main. after washer() PID: %s' % os.getpid())
    print('working in main. before dish_queue.join() PID: %s' % os.getpid())
    dish_queue.join()
    print('working in main. after dish_queue.join() PID: %s' % os.getpid())


if __name__ == '__main__':
    main()
```

再次运行结果如下：

```sh
$ python3 dishes.py
working in main. PID: 24030
working in main. before washer() PID: 24030
working in washer. PID: 24030
Washing p1 dish
working in washer for before output.put. PID: 24030
working in washer for after outout.put. PID: 24030
Washing p2 dish
working in washer for before output.put. PID: 24030
working in washer for after outout.put. PID: 24030
Washing p3 dish
working in washer for before output.put. PID: 24030
working in washer for after outout.put. PID: 24030
Washing p4 dish
working in washer for before output.put. PID: 24030
working in washer for after outout.put. PID: 24030
working in main. after washer() PID: 24030
working in main. before dish_queue.join() PID: 24030
working in dryer. PID: 24031
working in dryer. before input.get(). PID: 24031
working in dryer. after input.get(). PID: 24031
Drying p1 dish
working in dryer. after input.task_done(). PID: 24031
working in dryer. before input.get(). PID: 24031
working in dryer. after input.get(). PID: 24031
Drying p2 dish
working in dryer. after input.task_done(). PID: 24031
working in dryer. before input.get(). PID: 24031
working in dryer. after input.get(). PID: 24031
Drying p3 dish
working in dryer. after input.task_done(). PID: 24031
working in dryer. before input.get(). PID: 24031
working in dryer. after input.get(). PID: 24031
Drying p4 dish
working in dryer. after input.task_done(). PID: 24031
working in dryer. before input.get(). PID: 24031
working in main. after dish_queue.join() PID: 24030
```

可以看到洗盘子使用的进程是`24030`，烘干盘子使用的进程是`24031`，也就是洗盘子和烘干盘子使用独立的进程。

