# 在VrtualBox中安装CentOS7虚拟机系统



有时我们在学习一些新的知识时，需要使用VitualBox或者VMware配置和安装虚拟机系统，并在虚拟机系统中进行一些实验操作。



今天再次总结一下在VirtualBox中安装CentOS7虚拟机。你也可以使用VMware workstation创建虚拟机，由于我使用VMware workstation创建虚拟机时，VMware workstation启动卡顿，感觉电脑卡顿严重，VitualBox相对来说轻量一些。



## Windows系统中安装VirtualBox

可以在腾讯软件中心下载VirtualBox, [https://pc.qq.com/detail/3/detail_1023.html](https://pc.qq.com/detail/3/detail_1023.html),也可以在官网下载，下载完成后直接双击`virtualbox-Win-latest_6.0.12.exe`可执行文件安装即可。

双击桌面中的`Oracle VM VirtualBox`图标，可以打开VirtualBox应用。

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511232616.jpg)



## 下载CentOS7镜像

可以在CentOS官网[https://www.centos.org/download](https://www.centos.org/download)下载镜像，但由于网络原因在官网下载速度可能很慢，因此建议使用国内的镜像站去下载，如阿里云的镜像站，清华大学的镜像站。



我们使用`CentOS-7-x86_64-Minimal-1810.iso`这个版本。



## 新建CentOS7虚拟机

我们在VirtualBox中新建虚拟机。

- 新建虚拟机，设置虚拟机名称：

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511233502.png)

- 设置虚拟机内存

将默认的1024MB改成2048MB：

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511233603.png)

- 现在创建虚拟机

点击"创建"即可：

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511233700.png)

- 使用默认的硬盘文件类型

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511233812.png)



- 设置动态分配物理硬盘

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511233847.png)

- 创建虚拟硬盘

设置虚拟硬盘大小为20GB，并点击“创建”按钮：

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511233935.png)

此时创建出了一个CentOS7的虚拟机：

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511234109.png)

注意，此时不要点击“启动”按钮，还需要进行一些配置。我们先关注一下网络配置，待会再来设置虚拟机的其他设置。



## VirtualBox虚拟机网络环境配置

VirtualBox安装完成后，会在设备管理器->网络适配器中增加一个名称为"VirutalBox Host-Only Ethernet Adapter"的适配器：

![1589212177224](C:\Users\legion\AppData\Roaming\Typora\typora-user-images\1589212177224.png)

我们在`控制面板\网络和 Internet\网络连接`中查看这个网络：

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511235136.png)

可以看到它现在没有发包也没有接收包：

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511235204.png)

我们为“以太网2”配置一下DNS.



### VitualBox网络适配器DNS配置

首先，我们查看宿主机的网络详情：

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200511235547.png)

可以看到宿主机的`IPv4 DNS服务器`信息，记录下这两个IP字段信息，我的信息如上图中的：

- 192.168.1.1
- 202.103.x.x



我们给VirtualBox网络适配器配置一下DNS:



![config dns](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200512000136.png)





### 查看VirtualBox主机网络管理器

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200512000521.png)

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200512000606.png)

![](https://cdn.jsdelivr.net/gh/meizhaohui/cloudimg@master/data/20200512000635.png)

记住上面的最小地址和最大地址：

- 最小地址：192.168.56.3

- 最大地址：192.168.56.254

这个地址区间是我们虚拟机内部可以使用的IP区间！后面需要用到。