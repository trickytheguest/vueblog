# 软件设计师

## P1 软件设计师考试介绍

**考试形式**：

- 计算机与软件工程知识，150分钟，笔试，选择题。
- 软件设计，150分钟，笔试，问答题。



**历年考试知识点**：

![历年考试知识点](/img/softexam.png)



**历年考试软件设计题型**：

![历年考试软件设计题型](/img/software_design.png)



## P2 计算机组成与体系结构

课程内容提要 (6分)：

- 数据的表示。 
  - 涉及到数据进制的转换，计算机中使用二进制数据，但是在日常生活习惯使用十进制。
  - 为了计算的方便，提出了八进制，十六进制等，这些进制在计算某些问题的时候有可能用到。比如如在存储体系这一块有计算用多少块芯片组成多大的存储空间；网络部分计算IP地址，子网掩码等。
- 计算机结构。
  - 涉及的内容比较多，但真正考察的比较多的是CPU中寄存器划分的问题。
  - 哪些寄存器是放在运算器中，哪些寄存器是属于控制器，这些要区分得清楚。
  - 对于常见的寄存器，我们还要了解它的基本特性是什么？它是做什么用的。
- Flynn分类法。
  - 计算机的分类方法，把计算机分成4大类别，实际应用过程中并没有区分哪么严格，有些类别只是在理论层面的东西。
- CISC和RISC。
  - 计算机的指令集，这两种指令集的特点需要区分开。
- 流水线技术。
  - 主要是考察一些计算方面的问题。
- 存储系统。
  - 即有概念也有计算方面的问题需要了解和掌握。
- 总线系统。
  - 了解最基础的总线的分类和概念。
- 可靠性。
  - 串联，并联，串并混合的情况。
- 校验码。
  - 校验码的作用。
  - 常见的校验码有哪些。
  - CRC校验码，海明校验码各自的特点，编码解码过程。

## P3 数据的表示(进制的转换)

- 数据的表示

  - 任何进制转换成十进制，都是使用**按权展开法**进行处理。
  - R进制转十进制使用按权展开法，其具体操作方式为：将R进制数的每一位数值用R<sup>k</sup>形式表示，即幂的底数为R,指数为k,k与该位和小数点之间的距离有关，当该位位于小数点左边，k值是该位和小数点之间数码的个数，而当该位位于小数点右边，k值是负值，其绝对值是该位和小数点之间数码的个数加1。
  - 例如二进制 10100.01=1 \* *2<sup>4</sup> + 1 \* 2*<sup>2</sup> + 1 \* 2<sup>-2</sup>
  - 例如七进制 604.01=6 \* *7<sup>2</sup> + 4 \* 7*<sup>0</sup> + 1 \* 7<sup>-2</sup>
  - 十进制转R进制使用**短除法**，例如将94转换成二进制数为：

  ```
  2|94 余 0
  2|47 余 1
  2|23 余 1
  2|11 余 1
  2|5  余 1
  2|2  余 0
  2|1  余 1
    0
  从下往上面开始读取余数值，所以最后的结果是 1011110
  ```

- 二进制转八进制与十六进制。

  - 在计算机上面要用到的是二进制，但我们在计算过程中使用二进制就比较繁杂，二进制数比较长，十进制只有4位数时，二进制多达十多位，不太好计算，操作起来不太好操作。
  - 二进制与八进制、十六进制之间有严整的对应关系。
  - 每三个二进制位可以对应一个八进制位，从右到左每三个二进制位三位三位的分段，然后再把每一个段转成八进制。
  - 每四个二进制位对应一个埂十六进制位，从右到左每四个二进制位四位四位的分段，然后再把每一个段转成十六进制位。

  如将上面的94对应的二进制1011110转成八进制和十六进制：

  ```
  十进制 94
  二进制 1011110
  
  转成八进制
  分段 1 011 110
  转换 1   3   6
  即：94 = 1*8*8 + 3*8 + 6
  八进制为 136
  
  转成十六进制
  分段 101 1110
  转换   5    e
  即： 94 = 5*16 + e = 80 + 14
  十六进制中，0，1，2，3，4，5，6，7，8，9，10(a)，11(b)，12(c)，13(d)，14(e)，15(f) 
  ```

你可以在 [https://tool.lu/hexconvert/](https://tool.lu/hexconvert/) 页面验证你的进制转换。

## P4 数据的表示(原码反码补码移码)

- 各种数值在计算机中表示的形式称为机器数。
- 移码主要是为了在数轴上面将负数显示在下方正数显示在上方。
- 原码、反码、补码和移码
  - 正数： 原码 = 反码 = 补码，移码 = 补码符号位取反
  - 负数：反码 = 原码符号位不变，其他位取反；补码 = 反码 + 1；移码 = 补码符号位取反

|      | 数值1     | 数值-1    | 1-1       |
| ---- | --------- | --------- | --------- |
| 原码 | 0000 0001 | 1000 0001 | 1000 0010 |
| 反码 | 0000 0001 | 1111 1110 | 1111 1111 |
| 补码 | 0000 0001 | 1111 1111 | 0000 0000 |
| 移码 | 1000 0001 | 0111 1111 | 1000 000  |

- 取值范围
  - n为机器字长，如n=8
  - 原码 ： -(2<sup>n-1</sup> - 1) ~  (2<sup>n-1</sup> - 1) ，如n=8，则范围为-127~127
  - 反码 ： -(2<sup>n-1</sup> - 1) ~  (2<sup>n-1</sup> - 1) ，如n=8，则范围为-127~127
  - 补码 ： -2<sup>n-1</sup>  ~  (2<sup>n-1</sup> - 1) ，如n=8，则范围为-128~127
  - 移码 ： -2<sup>n-1</sup>  ~  (2<sup>n-1</sup> - 1) ，如n=8，则范围为-128~127

  

## P5 数据的表示(浮点数运算)

- 浮点数表示 N = M * R<sup>e</sup>
- 其中，M称为尾数，e是指数，R为基数。
- 操作时，先要对阶，再进行尾数计算，最后再进行结果格式化。

## P6 CPU结构(运算器和控制器的组成)

- CPU是中央处理单元，是计算机的核心部件，它负责获取程序指令、对指令进行译码并加以执行。
- 主机是计算机的核心部分，整个计算机的组成就是主机+外设。主机并不是平常所说的主机箱里面的部件呢，不是这么回事。
- 计算机结构里面所说的主机比主机箱里面的部件要少。
- 主机只包括两个部分：CPU和主存储器（也就是内存）。
- 像硬盘、显卡、声卡等归为外设。只有CPU和内存属于主机的！
- CPU中包含运算器和控制器。
- 运算器和控制器的构成是经常考到的一个知识点。
- 运算器主要功能有：执行所有的算术运算；执行所有的逻辑运算并进行逻辑测试。
- 运算器主要部件有算术逻辑单元ALU（实现对数据的算术和逻辑运算），累加寄存器AC(通用寄存器，不仅仅只做加法运算，减法运行也会用到这个寄存器)，数据缓冲寄存器DR(对内存储器进行读写操作时，用来暂存数据), 状态条件寄存器PSW（这个寄存器非常有特色，经常被考到，用来存在运算标志、标志位、状态等信息的，主要分为状态标志和控制标志）。
- 控制器主要部件有指令寄存器IR，程序计数器PC(程序运行当前指令时需要了解下一条指令在什么位置，这个就是由程序计数器来完成)，指令译码器ID，时序部件。

## P7 Flynn分类法简介

- Flynn分类是一种计算机体系结构分类方法。
- Flynn分类依据是两个指标：指令流、数据流。
- 指令流、数据流都可以分为两种类型，单和多。如单指令流、单数据流、多指令流、多数据流。实际上是按穷举的方式进行分类。
- 分类就会分成4种：单指令流单数据流，单指令流多数据流，多指令流单数据流，多指令流多数据流。
- 单指令流单数据流（Single Instruction stream Single Data stream, SISD）。
- 单指令流多数据流（Single Instruction stream Multiple Data stream, SIMD）。
- 多指令流单数据流（Multiple Instruction stream Single Data stream, MISD）。
- 多指令流多数据流（Multiple Instruction stream Multiple Data stream, MIMD）。

| 体系结构类型           | 结构                                         | 关键特性                                                     | 代表                                                         |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 单指令流单数据流  SISD | 控制部分：一个；处理器：一个；主存模块：一个 |                                                              | 单处理器系统，在PC/服务器领域已经看不到了，在单片机系统上面仍然存在，并且比较多见 |
| 单指令流多数据流 SIMD  | 控制部分：一个；处理器：多个；主存模块：多个 | 各处理器以异步的形式执行同一条指令（每个运算部件的输入可能不一样） | 并行处理机，主要应用在**阵列处理机**，超级向量处理机。阵列处理机适合去处理数组相关的计算 |
| 多指令流单数据流MISD   | 控制部分：多个；处理器：一个；主存模块：多个 | **被证明是不可能，至少是不实际**，是理论上面的模型           | 目前没有，有文献称流水线计算机为此类                         |
| 多指令流多数据流MIMD   | 控制部分：多个；处理器：多个；主存模块：多个 | 能够实现作业、任务、指令等各级全面并行                       | 目前来说最见的。多处理机系统，多计算机                       |

## P8 CISC和RISC

- CISC - Complex Instruction Set Computer 复杂指令集计算机。
- RISC - Reduced Instruction Set Computer 精简指令集计算机。

| 指令系统类型          | 指令                                                         | 寻址方式   | 实现方式                                             | 其他                           |
| --------------------- | ------------------------------------------------------------ | ---------- | ---------------------------------------------------- | ------------------------------ |
| 复杂指令集计算机 CISC | 数量多，使用频率差别大，可变长格式                           | 支持多种   | 微程序控制技术(微码)                                 | 研制周期长，成本高，出错几率大 |
| 精简指令集计算机 RISC | 数量少，使用频率接近，定长格式，大部分为单周期指令，操作寄存器，只有Load/Store操作内存 | 支持方式少 | 增加了通用寄存器，硬布线逻辑控制为主，适合采用流水线 | 优化编译，有效支持高级语言     |

- 如何理解CISC和RISC：
  - CISC是以前比较常用的指令集，是在计算机没有大规模使用前提出来的，在这个时候计算机是奢侈品，比如一个机构需要一台计算机，这个时候需要找到厂商为我们定制一台计算机，这台计算机从硬件到指令系统都是定制的，比如这台计算机需要用来处理天气预报信息，需要根据运算能力来设计这台计算机，这台计算机不是我们看到的笔记本或台式机那么大，而是一间房子那么大，很多元器件组起来的，然后你要进行什么样的业务处理，就给你设计哪些指令，然后再在指令基础上来编程去完成业务，这还是很多年前的事情。有这样的历史背景和环境之后，我们就可以知道CISC为什么是复杂指令集，是因为这种指令系统根据不同的用户，会做不同的指令，而且指令非常多，数量多。
  - 在计算机的发展过程中，原来基本都是各个单位的专用设备，后来计算机成为通用设备，每个计算机买回去，安装上软件就希望能够直接跑。因此需要考虑精简计算机的指令系统，希望它适应能力更强一些，而且需要做优化。我们开始把繁杂的指令系统开始简化，简化到最基本的操作，然后复杂的操作都用基本的操作来替代，比如乘法指令比较复杂，我们将乘法指令移除掉，而是将乘法看成多个加法指令的累加这样的形式来完成，这样一来大大的降低了整个系统的指令数量，所以叫精简指令集。
  - 所以再来看表中的内容，指令数量毫无疑问是复杂指令集CISC的多一些，复杂指令集中有很多的指令，有些指令可能需要频繁使用到，如简单指令，而复杂指令使用频率不见得高，这就是需要将复杂指令排除掉的原因，因此使用频率差别大；一般使用可变长度的指令，这是指令在系统上面会有二进制编码，编码长度可以不同，而在精简指令集中，指令数量少，使用频率也差不多，就用定长格式，所有的指令长度是一样的，精简指令集为了提高效率，引入了寄存器，绝大部分操作都是针对寄存器进行的，寄存器速度极快，效率极高，寄存器只用Load(读取)/Store(存入)操作内存，其他的都读取寄存器，所以得到了比较高的效率。
  - RISC大大超越CISC，RiSC是主流。

## P9 流水线的基本概念

- 流水线概念

  - 流水线是指在程序执行时多条指令重叠进行操作的一种准并行处理实现技术。各种部件同时处理是针对不同指令而言的，它们可同时为多条指令的不同部分进行工作，以提高各部件的利用率和指令的平均执行速度。
  - 指令的执行步骤： 取指  --> 分析 -->  执行 -->
  - 指令的控制方式有顺序方式、重叠方式和流水方式3种。
  - 顺序方式是指各条机器指令之间顺序串行地执行，执行完一条指令后才取下一条指令，而且每条机器指令内部的各个微操作也是顺序串行地执行。这种方式的优点是控制简单，缺点是速度慢，机器各部件利用率低。
  - 重叠方式是指解释第K条指令的操作完成之前就可以开始解释第K+1条指令。通常采用的是一次重叠，即在任何时候，指令分析部件和指令执行部件都只有相邻两条指令在重叠解释。这种方式的优点是速度有所提高，控制也不复杂，缺点是会出现冲突、转移和相关等问题。
  - 流水方式是模仿工业生产过程的流水线（如汽车装配线）而提出的一种指令控制方式。

![流水线](/img/pipeline.png)

左边图是没有使用流水线执行指令情况，右边是使用流水线执行指令情况。

左边顺序执行在取指后、分析指令、再执行指令。这三个步骤是由不同部件来完成的，可以看出有大量部件是处于空隙状态的（如图中的空白位置），可以看到顺序执行时间只使用了少量的时间片，而大量的时间片被空隙浪费了。

而右边的流水线执行指令情况下，取出第1条指令后，该部件马上去对第2条指令进行取指，这样这个部件的时间就没有浪费；而分析指令部件在分析完第1条指令后马上就分析第2条指令，时间片也没有浪费；执行部件在执行完第1条指令后马上执行第2条指令，时间片也没有浪费。即不需要第1条执行执行完成才进行第2条指令的取指工作。

这就好比在工业领域第一次应用流水线技术，福特工司在没有利用流水线技术时，组装环节，分班组进行组装，一个班组把一辆汽车🚙组装完成后，再立即进行另一辆车的组装，看似没有时间空隙，但实际上在组装一台车的过程中有大量的工人在处于休息状态（空隙），如有些人只装配发动机、有些人只装配轮胎，我们知道不可能所有人同一时间一拥而上一起来组装车辆，而是在车架上面先装发动机，再装变速箱，再装外壳，再装玻璃之类的，这个过程一开始装发动机的人在忙活，装玻璃的人在休息，装变速箱的人忙活的时候装玻璃的人仍然在休息，。。。，安装玻璃的人忙活的时候其他的工人却在休息，这样可以看到大量的工人处于休息状态，造成大量人工的浪费。

福特指出利用流水线技术，由流水线的传送带把车传送过来，每个工人只负责他们需要做的一小部分工作，比如说工人需要把轮胎放在轴上，车辆到达工人面前，他只需要把轮胎放在轴上，不需要管别的，传送带将车辆传到下一个环节，下一个环节的工人再进行轮胎螺丝的安装，因此针对安装轮胎的这个工人，他只需要在有车辆过来，并将轮胎放在轴上即可，然后接着给下一辆车将轮胎放在轴上，这样看工人的时间被充分利用了，浪费的人工时间比较少，工作效率大大提高了！

流水线不仅仅只应用于计算机相应领域，也用在工业领域!

## P10 流水线周期及流水线执行时间计算

- 流水线周期是指(取指、分析和执行操作中)执行时间最长的一段。如取指2ns，分析2ns，执行1ns，则周期是2ns。即指令执行过程中的几个步骤(如取指阶段、分析阶段、执行阶段)中最耗时的阶段。
- 流水线计算公式为：
  - 1条指令执行时间 + (指令条数-1)* 流水线周期
  - 理论公式：(t1 + t2 + t3 + ... + tk) + (n -1) *  &Delta;t
  - 实践公式： (k + n -1) * &Delta;t  ， 其中k是分几段

因为不工整的时间片导致后面计算带来不便，可以将每个阶段看成执行时长都是一个周期，这样所有阶段的执行时间都是一个周期，这时看实践公式计算就方便一些。

流水线执行过程：

![](/img/Snipaste_2020-09-04_07-12-28.png)

例题：

![](/img/Snipaste_2020-09-04_07-14-02.png)

由于取指2ns，分析2ns，执行1ns，那么周期按最长的一段计算，最长的一段是取指或分析，都是2ns，因此周期&Delta;t是2ns。

那么100条指令执行时间：

理论公式：(2 + 2 + 1) + (100 -1) * 2 = 5 + 200 -2 = 203 ns

实践公式： (3 + 100 -1) * 2 = 204ns

考试中两种方式的可能性都有，首先使用理论公式，如果理论公式没有正确答案则使用实践公式。

## P11 流水线吞吐率计算

- 流水线吞吐率概念

![](/img/Snipaste_2020-09-04_20-36-01.png)

- 流水线的吞吐率(Though Put rate, TP)是指在单位时间内流水线所完成的任务数量或输出的结果数量。

- TP = 指令条数 / 流水线执行时间

- 流水线最大吞吐率：

![](/img/tpmax.gif)



我们经常听到某港口的年吞吐率指一年内进出港口的货物情况数量。

我们来计算P10中示例的吞吐率为例。

TP = 指令条数100 / 流水线执行时间 203ns 

TPmax = 1 / &Delta;t = 1 / 2ns 



## P12 流水线的加速比

- 流水线的加速比是指完成同样的一批任务，不使用流水线所用的时间与使用流水线所使用的时间之比。
- 流水线加速比 S = 不使用流水线执行时间 /  使用流水线执行时间 。

我们看一下，P10中的示例，来计算一下加速比。

不使用流水线需要的时间 =  （取指2ns + 分析2ns + 执行1ns） * 100条指令  = 500 ns

使用流水线需要的时间 = (2 + 2 + 1) + (100 -1) * 2 = 5 + 200 -2 = 203 ns

因此流水线的加速比 = 500ns / 203ns = 2.46

```sh
$ echo 'scale=2;500/203'|bc
2.46
```

加速比越高说明使用流水线的效果越明显！



- 流水线的效率： 流水线的效率是指流水线的设备利用率。在时间图中，流水的线的效率定义为n个任务占用的时空区与k个流水段总的时间区之比。

![](/img/Snipaste_2020-09-04_21-10-38.png)

如上面这个图中，S1、S2、S3前三个阶段都是&Delta;t ，S4阶段是3&Delta;t。

此时流水线执行完4个任务所用的时间 = （1 + 1 + 1 + 3）* &Delta;t * 4  = 20 &Delta;t

而此时总的时间片时间 = 15 &Delta;t * 4 = 60 &Delta;t

此时可以看到流水线的效率 = 24&Delta;t / 60&Delta;t = 40%



流水线效率其实是衡量在整个在时间片的空间上面，有多少空间被我们的流水线所利用。提出这个值的含义、价值在于提醒我们，如何去设置流水线来让流水线效率更高。

上面的示例可以看到，有一个阶段S4耗时比较长，其他阶段时间都差不多，这个流水线的效率比较低。

流水线如果各个阶段之间的时间都差不多，就像前面P10中各个阶段的时间差不多，效率相对来说比较高。

## P13 计算机层次化存储结构

- 在存储这一块我们主要要了解以下几方面内容：
  - 存储的整体结构
  - cache相关知识
  - 内存相关知识
- 层次化存储结构， 我们需要了解到：
  - 基本的存储结构是如何划分的？
  - 哪些存储器性能比较好，哪些存储器容量比较大？
  - 为什么要以这种层次化来组织存储结构？

![](/img/Snipaste_2020-09-04_21-41-16.png)

- 在整个存储结构中，性能最高速度最快的是寄存器，存在于CPU内。

- Cache是高速缓存存储器

  - Cache不是必须的，拿走Cache的话，也可以，内存也可以与CPU交互，但是这时候速度会很慢，速度可能慢上100百，Cache单位级别是KB、MB等。
  - Cache相对于内存来说，容量极小，但是加了Cache后，速度提升了十倍百倍，速度提升非常大，为什么会这样？之所以会这样，是因为存在局部性原理，因为程序在执行某条指令后，还有可能再次执行该条指令，频繁不断的执行相同块里面的内容，这称之为**时间局部性**，比方循环语句结构就具备这种特点，如循环体执行100&nbsp;0000次，循环体执行一百万次，循环体之上和之下的语句（如初始化语句和输出语句）往往只执行一次，如果将循环体语句调入到cache中，CPU只需要与cache交互，不需要与内存进行交互，这样就大大提升了效率，速度。
  - 内存与外存之间也有类似的情况，外存里面的数据会先调入到内存。需要运行的程序数据都会先从外存调入到内存。
  - Cache是按内容存取。存信息时考虑信息的内容，不同内容存储到不同的块中，按内容存取的存储器又叫做**相联存储器**，它的速度和效率远高于按地址存取存储器。
  - 引入Cache的目的是提高速度的同时，不增加太多的成本，是性价比方案。

- 内存，也称为主存，容量小，速度快，单位级别是GB,如1G/2G/4G/8G/16GB等。

- 外存，也称为辅存，硬盘、光盘、U盘等。

  

## P14 Cache的基本概念

![](/img/Snipaste_2020-09-04_23-33-46.png)

- Cache是高速缓存。
- Cache高速缓存用来存放当前最活跃的程序和数据，其特点是：位于CPU与主存之间；容量在几千KB和几MB之间；速度一般比主存快5-10倍，由快速半导体存储器构成；其内容是主存局部域的副本，对程序员来说是透明的。
- Cache的功能是提高CPU数据输入输出的速率，突破冯.诺依曼瓶颈，即CPU与存储系统间数据传送带宽限制。
- 在计算机的存储系统体系中，Cache是(除寄存器之外)访问速度最快的层次。
- 由于寄存器容量极小，速度极快，并且集成在CPU当中，平时并没有把它当做最顶级的存储器来看待。如果问存储器速度最快的是哪一个？有寄存器的话，选寄存器，没有寄存器话，则选Cache是速度最快的。
- 使用Cache改善系统性能的依据是程序的局部性原理。
- Cache设计的目标是在成本允许的条件下达到较高的命中率。

### 使用Cache+主存存储器的系统的平均周期的计算

使用高速缓存Cache时，CPU首先会在Cache中查找需要的数据，如果找到，则说明命中；如果找不到，则会去内存（主存）中去查找数据，这时称为未命中。

所以可以计算使用高级缓存+主存的平均周期时间：

T<sub>cache+主存</sub> = h * T<sub>cache</sub> + (1 - h ) * T<sub>主存</sub>

如果 Cache访问命中率h为95%的话，Cache的周期时间(或存取时间)为1ns，主存的周期时间(或存取时间)为1000ns的话，则此时的使用高级缓存+主存的平均周期时间计算如下：

T<sub>cache+主存</sub> = h * T<sub>cache</sub> + (1 - h ) * T<sub>主存</sub> = 95% * 1ns + (1- 95%) * 1000ns = 0.95 ns + 50 ns = 50.95 ns

没有引入Cache时，需要1000ns，引入Cache后只需要50.95ns，这时可以看到引入Cache后，速度提升差不多达20倍(19.62倍)。

```sh
$ echo 'scale=2;1000/50.95'|bc
19.62
```



## P15 时间局部性和空间局部性

局部性原理：

- 时间局部性
- 空间局部性
- 工作集理论：工作集是进程运行时被频繁访问的页面集合。

局部性原理到底是怎么一回事，计算机在处理相关的数据和程序的时候，一般都会有在某一个时段集中的去访问某些指令，或在某一个时段集中去读取某些空间的数据，这样的特性，之所以要把这种特性拿出来研究，它对于我们采用多级存储体系，来解决存储的量和速度之间的矛盾的解决方案。我们之前也讲了，速度快的，成本太高，代价太大，所以只能做小容量，而成本便宜的速度又上不去，所以有了局部性原理，我们将它们组合起来，得到最高的性价比。

```c
#include <stdio.h>

int main(int argc, const char * argv[]) {
    int i,j,s = 0;
    for(i=1; i<1000; i++)
        for(j=1; j<1000; j++)
            s += j;
    printf("结果为:%d\n", s);
    return 0;
}
```

如上面的c代码，第4行初始化语句只执行一次，中间的两个for循环语句，使得里面的`s += j;`将会执行100&nbsp;0000次，这一百万次都不需要从内存里面调数据，只需要从Cache中读取数据，这就是时间局部性。

- 空间局部性是指一旦程序访问了某个存储单元，则不久之后，其附近的存储单元也将被访问。

如对数组进行处理的时候，当程序访问数组A[0]时，马上又访问附近的数据A[1]，A[2]等等。

- 工作集原理就是将被频繁访问的页面集合打包起来，频繁访问可以一起调用进来，短时间不会被替换掉，以此来提高效率。





  



