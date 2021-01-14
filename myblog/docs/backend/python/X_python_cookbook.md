# Python Cookbook

## 第1章 数据结构和算法

### 1.1 将序列分解为单独的变量

任何序列（或可迭代的对象）都可以通过一个简单的赋值操作来分解为单独的变量。

```python
$ python3
Python 3.6.8 (v3.6.8:3c6b436a57, Dec 24 2018, 02:10:22)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> p = (3, 4)
>>> x,y = p
>>> x
3
>>> y
4
>>>
```

### 1.2 从任意长度的可迭代对象中分解元素

使用`*表达式`来分解元素。

下面的统计成绩平均分的方法，去掉第一个值和最后一个值，并求值就用了这种方法。

```python3
>>> def drop_first_last(grades):
...     first, *middle, last = grades
...     return sum(middle)/len(middle)
...
>>> drop_first_last([1,2,3,4])
2.5
>>> drop_first_last([1,2,3,4,5])
3.0
>>> drop_first_last([1,2,3,4,5,6])
3.5
```

### 1.3 使用双端队列保存最后N个元素

在处理过程中保留最后N条记录。

```python
>>> from collections import deque
>>> dq = deque(maxlen=3)
>>> dq
deque([], maxlen=3)
>>> dq.append(1)
>>> dq
deque([1], maxlen=3)
>>> dq.append(2)
>>> dq
deque([1, 2], maxlen=3)
>>> dq
deque([1, 2], maxlen=3)
>>> dq.append(3)
>>> dq
deque([1, 2, 3], maxlen=3)
>>> dq.append(4)
>>> dq
deque([2, 3, 4], maxlen=3)
>>> dq.appendleft(5)
>>> dq
deque([5, 2, 3], maxlen=3)
>>>
```

可以看到在两端添加数据时，当队列中数据量到达最大值3时，再新增元素时就会将之前的左侧或右侧的数据清理掉，以使新的数据能够填写进来。



### 1.4 找到最大或最小的N个元素

使用堆队列算法`heapq`模块。