# K8S集群部署

## 1. 虚拟机基本配置

我们先在VirtualBox中创建一个基本的CentOS7虚拟机。然后在该基础虚拟机上面进行一些配置。作为一个基础的虚拟机。

### 1.1 虚拟机硬件配置

虚拟机使用双网卡：

- 网卡1，仅主机(Host-Only)网络。
- 网卡2，网络地址转换(NAT)。

内存大小：2048MB。

处理器数量：2 CPU。

虚拟分配空间： 20 GB。

### 1.2 虚拟机软件配置

CentOS系统安装成功后，在部署K8S集群前，先对虚拟机进行以下配置：

完成基本的配置：
1. 时间同步，使用`chronyd`服务同步时间。

2. 时区设置，设置为亚洲/上海。

3. 关闭防火墙，关闭`firewalld`服务。

4. 关闭SELinux，设置`SELINUX=disabled`。

5. 关闭SWAP，使用`swapoff -a`关闭SWAP。

6. 安装基本软件，如vim,jq,python,docker等

7. vim配置

8. 快捷命令配置

9. 允许 iptables 检查桥接流量

使用以下脚本：

```sh
#!/bin/bash
# filename: k8s_pre_install_init.sh
# Author: meizhaohui
# Date: 2021-07-29 23:25:28
echo “Config yum”
echo "Install EPEL yum"
yum install -y epel-release
sed -e 's!^metalink=!#metalink=!g' \
    -e 's!^#baseurl=!baseurl=!g' \
    -e 's!//download\.fedoraproject\.org/pub!//mirrors.tuna.tsinghua.edu.cn!g' \
    -e 's!http://mirrors!https://mirrors!g' \
    -i /etc/yum.repos.d/epel.repo /etc/yum.repos.d/epel-testing.repo

sed -e 's|^mirrorlist=|#mirrorlist=|g' \
    -e 's|^#baseurl=http://mirror.centos.org|baseurl=https://mirrors.tuna.tsinghua.edu.cn|g' \
    -i.bak \
    /etc/yum.repos.d/CentOS-Base.repo

echo "Install IUS yum"
yum install -y https://repo.ius.io/ius-release-el7.rpm

echo "Set yum tools"
yum install -y deltarpm yum-utils device-mapper-persistent-data lvm2 lrzsz net-tools

echo "Set Aliyun Docker yum mirror"
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

yum install -y vim git224 jq deltarpm python3 go

echo "Config vimrc"
cat >> ~/.vimrc << EOF
syntax on
filetype plugin indent on
set hlsearch
set backspace=2
set autoindent
set ruler
set showmode
set nu
set bg=dark
set ts=4
set softtabstop=4
set shiftwidth=4
set fileencodings=utf-8,gbk,gb18030,gk2312
set showcmd
set clipboard+=unnamed
set cursorline
set confirm
set autoindent
set cindent
set expandtab
set laststatus=2
EOF


echo "Config .bashrc"
cat >> ~/.bashrc << EOF
alias v.='vim ~/.bashrc'
alias s.='source ~/.bashrc && echo "Reload OK"'
alias vi='vim'
alias cdnet='pushd /etc/sysconfig/network-scripts/'
alias cd1='cd ..'
alias cd2='cd ../..'
alias cd3='cd ../../..'
alias cd4='cd ../../../..'
alias newhostname='hostnamectl set-hostname'
export LANG=en_US.UTF-8
alias setip='change_ip'
function change_ip(){
    node_ip=\$1
    config_folder="/etc/sysconfig/network-scripts"
    ip_config=\$(grep 'IPADDR' "\${config_folder}"/ifcfg-*|grep -v 'ifcfg-lo'|awk -F":" '{print \$1}')
    sed -i.bak "s/IPADDR.*/IPADDR=\"\$node_ip\"/g" "\${ip_config}"
}
alias addhosts="add_ip_parse"
function add_ip_parse(){
    ip=\$1
    domain=\$2
    simple=\$(echo "\${domain}"|awk -F'.' '{print \$1}')
    echo -e "\${ip}\t\${domain}\t\${simple}" >> /etc/hosts
}
alias ping='ping -c 3'
alias ip='hostname -I'
EOF


echo "Install Docker"
yum install -y docker-ce docker-ce-cli containerd.io

echo "Start Docker"
sed -i.bak '/ExecStart=\/usr\/bin\/dockerd/aExecStartPost=/usr/sbin/iptables -P FORWARD ACCEPT' /usr/lib/systemd/system/docker.service
systemctl daemon-reload
systemctl enable docker
systemctl start docker
echo "Config Docker mirror"
cat >> /etc/docker/daemon.json << EOF
{"registry-mirrors":["https://reg-mirror.qiniu.com/"]}
EOF
systemctl restart docker
systemctl status docker

echo "Stop Firewall"
systemctl stop firewalld
systemctl disable firewalld

echo "Disable SWAP"
swapoff -a
swapstatus=$(grep -v 'Filename' /proc/swaps |wc -l)
if [[ "${swapstatus}" -eq 0 ]]; then
    sed -i.bak '/ swap /s/^#*/# /' /etc/fstab
    echo "SWAP disabled!"
fi

echo "Disable SELinux"
setenforce 0
sed -i.bak 's/^SELINUX.*/SELINUX=disabled/g' /etc/selinux/config
getenforce

echo "Sync time"
yum -y install chrony
systemctl enable chronyd
systemctl start chronyd
systemctl status chronyd

echo "Set iptables"
# 允许 iptables 检查桥接流量
cat > /etc/modules-load.d/k8s.conf << EOF
br_netfilter
EOF

cat > /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF

# 使配置生效
sysctl --system

echo "Please use command 'setip' to change the IP and 'addhosts' to add new domain parse!!!"
echo "Done!"

```

## 2. 虚拟机配置

虚拟机系统信息：

```sh
[root@master ~]# cat /etc/centos-release
CentOS Linux release 7.7.1908 (Core)
[root@master ~]# 
```



我们在VirtualBox中复制几个刚才创建的虚拟机，并分别使用`setip`、`sethostname`命令修改虚拟机IP和主机名称，并设置节点名称解析。

我计划设置一个master和两个节点,IP和域名对应关系如下：

```
192.168.56.60 master.mytest.com
192.168.56.61 node1.mytest.com
192.168.56.62 node2.mytest.com
```

设置后重启虚拟机，查看IP、主机名和名称解析:

```sh
[root@master ~]# hostname -I
192.168.56.60 172.17.0.1 
[root@master ~]# hostname 
master.mytest.com
[root@master ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.56.60 master.mytest.com master kubeapi.mytest.com kubeapi
192.168.56.61 node1.mytest.com node1
192.168.56.62 node2.mytest.com node2
```

此时，对k8s测试虚拟机进行备份，生成相应的快照。快照名称为`k8s_0`，并且描述信息为"k8s安装k8s前，配置好各节点IP和域名"。这样后面做测试时，可以快速恢复到该快照，不需要重新安装系统配置网络等。

![](https://meizhaohui.gitee.io/imagebed/img/20210812135252.png)

启动三台虚拟机。



## 3. 安装k8s集群

### 3.1 修改Docker的CGroup的驱动

**提示：以下操作需要在本示例中的所有3台虚拟机上分别进行。**

参考： [部署v1.20版的Kubernetes集群](https://mp.weixin.qq.com/s/dMygLTxvdUEieQsaQ2RGLA)

kubelet需要让docker容器引擎使用systemd作为CGroup的驱动，其默认值为cgroupfs，因而，我们还需要编辑docker的配置文件/etc/docker/daemon.json，添加内容`"exec-opts": ["native.cgroupdriver=systemd"]`。添加完成后，查看docker的配置文件：

```sh
[root@master ~]# cat /etc/docker/daemon.json 
{
    "registry-mirrors": ["https://reg-mirror.qiniu.com/"],
    "exec-opts": ["native.cgroupdriver=systemd"]
}
[root@master ~]# 
```

修改后，重启docker服务：

```sh
[root@master ~]# systemctl restart docker
[root@master ~]# systemctl status docker
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; enabled; vendor preset: disabled)
   Active: active (running) since Thu 2021-08-12 14:38:00 CST; 8s ago
     Docs: https://docs.docker.com
  Process: 32491 ExecStartPost=/usr/sbin/iptables -P FORWARD ACCEPT (code=exited, status=0/SUCCESS)
 Main PID: 32361 (dockerd)
    Tasks: 8
   Memory: 31.9M
   CGroup: /system.slice/docker.service
           └─32361 /usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock

Aug 12 14:38:00 master.mytest.com dockerd[32361]: time="2021-08-12T14:38:00.291438542+08:00" level=info msg="ccResolverWra...e=grpc
Aug 12 14:38:00 master.mytest.com dockerd[32361]: time="2021-08-12T14:38:00.291447604+08:00" level=info msg="ClientConn sw...e=grpc
Aug 12 14:38:00 master.mytest.com dockerd[32361]: time="2021-08-12T14:38:00.302327988+08:00" level=info msg="[graphdriver]...rlay2"
Aug 12 14:38:00 master.mytest.com dockerd[32361]: time="2021-08-12T14:38:00.307250795+08:00" level=info msg="Loading conta...tart."
Aug 12 14:38:00 master.mytest.com dockerd[32361]: time="2021-08-12T14:38:00.412650926+08:00" level=info msg="Default bridg...dress"
Aug 12 14:38:00 master.mytest.com dockerd[32361]: time="2021-08-12T14:38:00.456379139+08:00" level=info msg="Loading conta...done."
Aug 12 14:38:00 master.mytest.com dockerd[32361]: time="2021-08-12T14:38:00.473722675+08:00" level=info msg="Docker daemon...0.10.8
Aug 12 14:38:00 master.mytest.com dockerd[32361]: time="2021-08-12T14:38:00.473786016+08:00" level=info msg="Daemon has co...ation"
Aug 12 14:38:00 master.mytest.com systemd[1]: Started Docker Application Container Engine.
Aug 12 14:38:00 master.mytest.com dockerd[32361]: time="2021-08-12T14:38:00.495967020+08:00" level=info msg="API listen on....sock"
Hint: Some lines were ellipsized, use -l to show in full.
[root@master ~]# 
```

### 3.2 添加kubernetes的YUM源

参考：[Kubernetes 镜像](https://developer.aliyun.com/mirror/kubernetes?spm=a2c6h.13651102.0.0.3e221b118BVyvx)

在三台虚拟机上执行以下命令：

```sh
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

然后查看一下`/etc/yum.repos.d/kubernetes.repo`文件：

```sh
[root@master ~]# cat /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
[root@master ~]# 
```

由于官网未开放同步方式, 可能会有索引gpg检查失败的情况, 这时请用 `yum install -y --nogpgcheck kubelet kubeadm kubectl` 安装。

### 3.3 安装kubectl、kubelet和kubeadm

由于kubernetes官方更新比较快，2021年8月份已经发布到v1.22版本了，为了便于后期能够在网上搜索资料，我不用最新版本的，使用`v1.18`版本。

我们先看一下仓库中有哪些版本：

```sh
[root@master ~]# yum search kubelet --showduplicates|tail -n 40
kubelet-1.18.10-0.x86_64 : Container cluster management
kubelet-1.18.12-0.x86_64 : Container cluster management
kubelet-1.18.13-0.x86_64 : Container cluster management
kubelet-1.18.14-0.x86_64 : Container cluster management
kubelet-1.18.15-0.x86_64 : Container cluster management
kubelet-1.18.16-0.x86_64 : Container cluster management
kubelet-1.18.17-0.x86_64 : Container cluster management
kubelet-1.18.18-0.x86_64 : Container cluster management
kubelet-1.18.19-0.x86_64 : Container cluster management
kubelet-1.18.20-0.x86_64 : Container cluster management
kubelet-1.19.0-0.x86_64 : Container cluster management
kubelet-1.19.1-0.x86_64 : Container cluster management
kubelet-1.19.2-0.x86_64 : Container cluster management
kubelet-1.19.3-0.x86_64 : Container cluster management
kubelet-1.19.4-0.x86_64 : Container cluster management
kubelet-1.19.5-0.x86_64 : Container cluster management
kubelet-1.19.6-0.x86_64 : Container cluster management
kubelet-1.19.7-0.x86_64 : Container cluster management
kubelet-1.19.8-0.x86_64 : Container cluster management
kubelet-1.19.9-0.x86_64 : Container cluster management
kubelet-1.19.10-0.x86_64 : Container cluster management
kubelet-1.19.11-0.x86_64 : Container cluster management
kubelet-1.19.12-0.x86_64 : Container cluster management
kubelet-1.19.13-0.x86_64 : Container cluster management
kubelet-1.20.0-0.x86_64 : Container cluster management
kubelet-1.20.1-0.x86_64 : Container cluster management
kubelet-1.20.2-0.x86_64 : Container cluster management
kubelet-1.20.4-0.x86_64 : Container cluster management
kubelet-1.20.5-0.x86_64 : Container cluster management
kubelet-1.20.6-0.x86_64 : Container cluster management
kubelet-1.20.7-0.x86_64 : Container cluster management
kubelet-1.20.8-0.x86_64 : Container cluster management
kubelet-1.20.9-0.x86_64 : Container cluster management
kubelet-1.21.0-0.x86_64 : Container cluster management
kubelet-1.21.1-0.x86_64 : Container cluster management
kubelet-1.21.2-0.x86_64 : Container cluster management
kubelet-1.21.3-0.x86_64 : Container cluster management
kubelet-1.22.0-0.x86_64 : Container cluster management

  Name and summary matches only, use "search all" for everything.
[root@master ~]# 
```

我们安装`kubelet-1.18.20`这个版本。使用相同的方法，可以知道，`kubeadm`和`kubelet`也有相同的版本。

我们直接安装指定版本的kubernetes软件包：

```sh
[root@master ~]# yum install -y --nogpgcheck kubectl-1.18.20 kubelet-1.18.20 kubeadm-1.18.20
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
Resolving Dependencies
--> Running transaction check
---> Package kubeadm.x86_64 0:1.18.20-0 will be installed
--> Processing Dependency: kubernetes-cni >= 0.8.6 for package: kubeadm-1.18.20-0.x86_64
--> Processing Dependency: cri-tools >= 1.13.0 for package: kubeadm-1.18.20-0.x86_64
---> Package kubectl.x86_64 0:1.18.20-0 will be installed
---> Package kubelet.x86_64 0:1.18.20-0 will be installed
--> Processing Dependency: socat for package: kubelet-1.18.20-0.x86_64
--> Processing Dependency: conntrack for package: kubelet-1.18.20-0.x86_64
--> Running transaction check
---> Package conntrack-tools.x86_64 0:1.4.4-7.el7 will be installed
--> Processing Dependency: libnetfilter_cttimeout.so.1(LIBNETFILTER_CTTIMEOUT_1.1)(64bit) for package: conntrack-tools-1.4.4-7.el7.x86_64
--> Processing Dependency: libnetfilter_cttimeout.so.1(LIBNETFILTER_CTTIMEOUT_1.0)(64bit) for package: conntrack-tools-1.4.4-7.el7.x86_64
--> Processing Dependency: libnetfilter_cthelper.so.0(LIBNETFILTER_CTHELPER_1.0)(64bit) for package: conntrack-tools-1.4.4-7.el7.x86_64
--> Processing Dependency: libnetfilter_queue.so.1()(64bit) for package: conntrack-tools-1.4.4-7.el7.x86_64
--> Processing Dependency: libnetfilter_cttimeout.so.1()(64bit) for package: conntrack-tools-1.4.4-7.el7.x86_64
--> Processing Dependency: libnetfilter_cthelper.so.0()(64bit) for package: conntrack-tools-1.4.4-7.el7.x86_64
---> Package cri-tools.x86_64 0:1.13.0-0 will be installed
---> Package kubernetes-cni.x86_64 0:0.8.7-0 will be installed
---> Package socat.x86_64 0:1.7.3.2-2.el7 will be installed
--> Running transaction check
---> Package libnetfilter_cthelper.x86_64 0:1.0.0-11.el7 will be installed
---> Package libnetfilter_cttimeout.x86_64 0:1.0.0-7.el7 will be installed
---> Package libnetfilter_queue.x86_64 0:1.0.2-2.el7_2 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

===================================================================================================================================
 Package                                 Arch                    Version                         Repository                   Size
===================================================================================================================================
Installing:
 kubeadm                                 x86_64                  1.18.20-0                       kubernetes                  8.8 M
 kubectl                                 x86_64                  1.18.20-0                       kubernetes                  9.5 M
 kubelet                                 x86_64                  1.18.20-0                       kubernetes                   21 M
Installing for dependencies:
 conntrack-tools                         x86_64                  1.4.4-7.el7                     base                        187 k
 cri-tools                               x86_64                  1.13.0-0                        kubernetes                  5.1 M
 kubernetes-cni                          x86_64                  0.8.7-0                         kubernetes                   19 M
 libnetfilter_cthelper                   x86_64                  1.0.0-11.el7                    base                         18 k
 libnetfilter_cttimeout                  x86_64                  1.0.0-7.el7                     base                         18 k
 libnetfilter_queue                      x86_64                  1.0.2-2.el7_2                   base                         23 k
 socat                                   x86_64                  1.7.3.2-2.el7                   base                        290 k

Transaction Summary
===================================================================================================================================
Install  3 Packages (+7 Dependent packages)

Total download size: 63 M
Installed size: 266 M
。。。省略
Installed:
  kubeadm.x86_64 0:1.18.20-0                 kubectl.x86_64 0:1.18.20-0                 kubelet.x86_64 0:1.18.20-0                

Dependency Installed:
  conntrack-tools.x86_64 0:1.4.4-7.el7                             cri-tools.x86_64 0:1.13.0-0                                     
  kubernetes-cni.x86_64 0:0.8.7-0                                  libnetfilter_cthelper.x86_64 0:1.0.0-11.el7                     
  libnetfilter_cttimeout.x86_64 0:1.0.0-7.el7                      libnetfilter_queue.x86_64 0:1.0.2-2.el7_2                       
  socat.x86_64 0:1.7.3.2-2.el7                                    

Complete!
[root@master ~]# 
```

查看kubernetes软件安装情况：

```sh
[root@master ~]# rpm -qa|grep kube
kubelet-1.18.20-0.x86_64
kubectl-1.18.20-0.x86_64
kubernetes-cni-0.8.7-0.x86_64
kubeadm-1.18.20-0.x86_64
[root@master ~]# kubelet --version
Kubernetes v1.18.20
[root@master ~]# kubeadm version -o=short
v1.18.20
[root@master ~]# kubectl version --short=true
Client Version: v1.18.20
The connection to the server localhost:8080 was refused - did you specify the right host or port?
[root@master ~]#
```

可以看到，kubernetes相关的几个命令都能正常使用，并且版本也是我们指定的`v1.18.20`。



使用命令`yum install -y --nogpgcheck kubectl-1.18.20 kubelet-1.18.20 kubeadm-1.18.20`在各节点上安装相应的软件包。

这样我们的kubernetes软件包就安装完成了。



另外，我们设置一下`kubelet`开机启动：

```sh
[root@master ~]# systemctl enable kubelet
Created symlink from /etc/systemd/system/multi-user.target.wants/kubelet.service to /usr/lib/systemd/system/kubelet.service.
[root@master ~]# 
```

此时不要直接启动`kubelet`，因为其配置文件还没有生成。



### 3.4 在master上进行集群初始化

现在我们只用在master虚拟机上面进行集群的初始化。

> 该步骤开始尝试构建Kubernetes集群的master节点，配置完成后，各worker节点直接加入到集群中的即可。需要特别说明的是，由kubeadm部署的Kubernetes集群上，集群核心组件kube-apiserver、kube-controller-manager、kube-scheduler和etcd等均会以静态Pod的形式运行，它们所依赖的镜像文件默认来自于gcr.io这一Registry服务之上。但我们无法直接访问该服务，常用的解决办法有如下两种，本示例将选择使用更易于使用的后一种方式。
>
> - 使用能够到达该服务的代理服务；
> - 使用国内的镜像服务器上的服务，例如gcr.azk8s.cn/google_containers和registry.aliyuncs.com/google_containers等 。

#### 3.4.1 拉取镜像

在运行初始化命令之前先运行如下命令单独获取相关的镜像文件，而后再运行后面的`kubeadm init`命令，以便于观察到镜像文件的下载过程。

查看镜像列表：

```sh
kubeadm config images list --image-repository registry.aliyuncs.com/google_containers
```

执行：

```sh
[root@master ~]# kubeadm config images list --image-repository registry.aliyuncs.com/google_containers
I0812 15:40:30.984989   29210 version.go:255] remote version is much newer: v1.22.0; falling back to: stable-1.18
W0812 15:40:33.317410   29210 configset.go:202] WARNING: kubeadm cannot validate component configs for API groups [kubelet.config.k8s.io kubeproxy.config.k8s.io]
registry.aliyuncs.com/google_containers/kube-apiserver:v1.18.20
registry.aliyuncs.com/google_containers/kube-controller-manager:v1.18.20
registry.aliyuncs.com/google_containers/kube-scheduler:v1.18.20
registry.aliyuncs.com/google_containers/kube-proxy:v1.18.20
registry.aliyuncs.com/google_containers/pause:3.2
registry.aliyuncs.com/google_containers/etcd:3.4.3-0
registry.aliyuncs.com/google_containers/coredns:1.6.7
[root@master ~]# 
```

可以看到，该镜像仓库中有多个镜像。



拉取镜像文件：

```sh
kubeadm config images pull --image-repository registry.aliyuncs.com/google_containers
```

执行：

```sh
# 在拉取镜像前，查看docker的镜像列表
[root@master ~]# docker images
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE

# 拉取镜像
[root@master ~]# kubeadm config images pull  --image-repository registry.aliyuncs.com/google_containers
I0812 15:44:28.995830   12325 version.go:255] remote version is much newer: v1.22.0; falling back to: stable-1.18
W0812 15:44:31.565048   12325 configset.go:202] WARNING: kubeadm cannot validate component configs for API groups [kubelet.config.k8s.io kubeproxy.config.k8s.io]
[config/images] Pulled registry.aliyuncs.com/google_containers/kube-apiserver:v1.18.20
[config/images] Pulled registry.aliyuncs.com/google_containers/kube-controller-manager:v1.18.20
[config/images] Pulled registry.aliyuncs.com/google_containers/kube-scheduler:v1.18.20
[config/images] Pulled registry.aliyuncs.com/google_containers/kube-proxy:v1.18.20
[config/images] Pulled registry.aliyuncs.com/google_containers/pause:3.2
[config/images] Pulled registry.aliyuncs.com/google_containers/etcd:3.4.3-0
[config/images] Pulled registry.aliyuncs.com/google_containers/coredns:1.6.7

# 查看命令是否正常退出
[root@master ~]# echo $?
0

# 再次查看docker的镜像
[root@master ~]# docker images
REPOSITORY                                                        TAG        IMAGE ID       CREATED         SIZE
registry.aliyuncs.com/google_containers/kube-proxy                v1.18.20   27f8b8d51985   8 weeks ago     117MB
registry.aliyuncs.com/google_containers/kube-apiserver            v1.18.20   7d8d2960de69   8 weeks ago     173MB
registry.aliyuncs.com/google_containers/kube-scheduler            v1.18.20   a05a1a79adaa   8 weeks ago     96.1MB
registry.aliyuncs.com/google_containers/kube-controller-manager   v1.18.20   e7c545a60706   8 weeks ago     162MB
registry.aliyuncs.com/google_containers/pause                     3.2        80d28bedfe5d   18 months ago   683kB
registry.aliyuncs.com/google_containers/coredns                   1.6.7      67da37a9a360   18 months ago   43.8MB
registry.aliyuncs.com/google_containers/etcd                      3.4.3-0    303ce5db0e90   21 months ago   288MB
[root@master ~]# docker images|wc -l
8
[root@master ~]# 
```

可以看到docker的镜像已经拉取到本地了。



#### 3.4.2 集群初始化

执行以下命令：

```sh
kubeadm init \
    --kubernetes-version=v1.18.20 \
    --apiserver-advertise-address=192.168.56.60 \
    --image-repository registry.aliyuncs.com/google_containers \
    --control-plane-endpoint kubeapi.mytest.com \
    --pod-network-cidr=10.244.0.0/16 \
    --service-cidr=10.96.0.0/12 \
    --token-ttl=0
```

> 命令中的各选项简单说明如下： 
>
> - --image-repository：指定要使用的镜像仓库，默认为gcr.io；
>
> - --kubernetes-version：kubernetes程序组件的版本号，它必须要与安装的kubelet程序包的版本号相同；
>
> - --control-plane-endpoint：控制平面的固定访问端点，可以是IP地址或DNS名称，会被用于集群管理员及集群组件的kubeconfig配置文件的API Server的访问地址；单控制平面部署时可以不使用该选项；
>
> - --pod-network-cidr：Pod网络的地址范围，其值为CIDR格式的网络地址，通常，Flannel网络插件的默认为10.244.0.0/16，Project Calico插件的默认值为192.168.0.0/16；
>
> - --service-cidr：Service的网络地址范围，其值为CIDR格式的网络地址，默认为10.96.0.0/12；通常，仅Flannel一类的网络插件需要手动指定该地址；
>
> - --apiserver-advertise-address：apiserver通告给其他组件的IP地址，一般应该为Master节点的用于集群内部通信的IP地址，0.0.0.0表示节点上所有可用地址；
>
> - --token-ttl：共享令牌（token）的过期时长，默认为24小时，0表示永不过期；为防止不安全存储等原因导致的令牌泄露危及集群安全，建议为其设定过期时长。未设定该选项时，在token过期后，若期望再向集群中加入其它节点，可以使用如下命令重新创建token，并生成节点加入命令。
>
>     ```sh
>     kubeadm token create --print-join-command
>     ```

执行：

```sh
[root@master ~]# kubeadm init \
>     --kubernetes-version=v1.18.20 \
>     --apiserver-advertise-address=192.168.56.60 \
>     --image-repository registry.aliyuncs.com/google_containers  \
>     --control-plane-endpoint kubeapi.mytest.com \
>     --pod-network-cidr=10.244.0.0/16 \
>     --service-cidr=10.96.0.0/12 \
>     --token-ttl=0
W0812 16:11:06.680875    6714 configset.go:202] WARNING: kubeadm cannot validate component configs for API groups [kubelet.config.k8s.io kubeproxy.config.k8s.io]
[init] Using Kubernetes version: v1.18.20

# 梅朝辉注释： 步骤1：进行预检查，看环境是否满足要求，如CPU需要2核、SWAP需要关闭等等
# 此处提示一个警告，该版本的Docker未经过验证
[preflight] Running pre-flight checks
        [WARNING SystemVerification]: this Docker version is not on the list of validated versions: 20.10.8. Latest validated version: 19.03

# 梅朝辉注释： 步骤2：下载k8s集群需要的镜像
# 我们在上一节已经拉取了镜像，此处初始化就会缩短时间，通过提前拉取镜像，可以看到镜像是否能够拉取成功
# 避免在集群初始化时出现异常
[preflight] Pulling images required for setting up a Kubernetes cluster
[preflight] This might take a minute or two, depending on the speed of your internet connection
[preflight] You can also perform this action in beforehand using 'kubeadm config images pull'

# 梅朝辉注释： 步骤3：启动kubelet组件，并准备kubelet的配置文件
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Starting the kubelet

# 梅朝辉注释： 步骤4： 生成证书,存放在/etc/kubernetes/pki目录下
[certs] Using certificateDir folder "/etc/kubernetes/pki"
[certs] Generating "ca" certificate and key
[certs] Generating "apiserver" certificate and key
[certs] apiserver serving cert is signed for DNS names [master.mytest.com kubernetes kubernetes.default kubernetes.default.svc kubernetes.default.svc.cluster.local kubeapi.mytest.com] and IPs [10.96.0.1 192.168.56.60]
[certs] Generating "apiserver-kubelet-client" certificate and key
[certs] Generating "front-proxy-ca" certificate and key
[certs] Generating "front-proxy-client" certificate and key
[certs] Generating "etcd/ca" certificate and key
[certs] Generating "etcd/server" certificate and key
[certs] etcd/server serving cert is signed for DNS names [master.mytest.com localhost] and IPs [192.168.56.60 127.0.0.1 ::1]
[certs] Generating "etcd/peer" certificate and key
[certs] etcd/peer serving cert is signed for DNS names [master.mytest.com localhost] and IPs [192.168.56.60 127.0.0.1 ::1]
[certs] Generating "etcd/healthcheck-client" certificate and key
[certs] Generating "apiserver-etcd-client" certificate and key
[certs] Generating "sa" key and public key


# 梅朝辉注释： 步骤5：生成kubeconfig配置文件
[kubeconfig] Using kubeconfig folder "/etc/kubernetes"
[kubeconfig] Writing "admin.conf" kubeconfig file
[kubeconfig] Writing "kubelet.conf" kubeconfig file
[kubeconfig] Writing "controller-manager.conf" kubeconfig file
[kubeconfig] Writing "scheduler.conf" kubeconfig file

# 梅朝辉注释： 步骤6：控制面板，以静态Pod的形式启动APIServer和Controller-Manager
[control-plane] Using manifest folder "/etc/kubernetes/manifests"
[control-plane] Creating static Pod manifest for "kube-apiserver"
[control-plane] Creating static Pod manifest for "kube-controller-manager"
W0812 16:11:12.395441    6714 manifests.go:225] the default kube-apiserver authorization-mode is "Node,RBAC"; using "Node,RBAC"
[control-plane] Creating static Pod manifest for "kube-scheduler"
W0812 16:11:12.396611    6714 manifests.go:225] the default kube-apiserver authorization-mode is "Node,RBAC"; using "Node,RBAC"

# 梅朝辉注释： 步骤7：以静态Pod的形式启动etcd
[etcd] Creating static Pod manifest for local etcd in "/etc/kubernetes/manifests"

# 梅朝辉注释： 步骤8： 等待控制面板启动
[wait-control-plane] Waiting for the kubelet to boot up the control plane as static Pods from directory "/etc/kubernetes/manifests". This can take up to 4m0s

# 梅朝辉注释：所有控制面板组件都是健康的
[apiclient] All control plane components are healthy after 20.512808 seconds

# 梅朝辉注释： 步骤9： 存储kubelet配置文件到ConfigMap中 
[upload-config] Storing the configuration used in ConfigMap "kubeadm-config" in the "kube-system" Namespace
[kubelet] Creating a ConfigMap "kubelet-config-1.18" in namespace kube-system with the configuration for the kubelets in the cluster

# 梅朝辉注释：证书上传，忽略
[upload-certs] Skipping phase. Please see --upload-certs

# 梅朝辉注释：步骤10： 给master节点添加标签，标记污点，后续创建Pod时，不会分配到master节点上
[mark-control-plane] Marking the node master.mytest.com as control-plane by adding the label "node-role.kubernetes.io/master=''"
[mark-control-plane] Marking the node master.mytest.com as control-plane by adding the taints [node-role.kubernetes.io/master:NoSchedule]

# 梅朝辉注释：步骤11： 引导TOKEN，配置bootstrap tls，给节点自动颁发证书
[bootstrap-token] Using token: ntf08x.uaudrocid80akszx
[bootstrap-token] Configuring bootstrap tokens, cluster-info ConfigMap, RBAC Roles
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to get nodes
[bootstrap-token] configured RBAC rules to allow Node Bootstrap tokens to post CSRs in order for nodes to get long term certificate credentials
[bootstrap-token] configured RBAC rules to allow the csrapprover controller automatically approve CSRs from a Node Bootstrap Token
[bootstrap-token] configured RBAC rules to allow certificate rotation for all node client certificates in the cluster
[bootstrap-token] Creating the "cluster-info" ConfigMap in the "kube-public" namespace
[kubelet-finalize] Updating "/etc/kubernetes/kubelet.conf" to point to a rotatable kubelet client certificate and key

# 梅朝辉注释：步骤12： 安装插件，CoreDNS为K8S集群中做内部解析的，Kube-Proxy是负责Pod的网络的 
[addons] Applied essential addon: CoreDNS
[addons] Applied essential addon: kube-proxy

# 梅朝辉注释：k8s控制平面初始化成功
Your Kubernetes control-plane has initialized successfully!

# 梅朝辉注释：用户需要执行的步骤1：复制配置文件,使得可以使用kubectl命令。
# 如果不拷贝，则不能使用`kubectl get node`查看集群节点信息，此时是直接没有权限的
To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

# 梅朝辉注释：用户可选的步骤1：添加其他控制平面节点，这样可以将集群升级为高可用。
You can now join any number of control-plane nodes by copying certificate authorities
and service account keys on each node and then running the following as root:

  kubeadm join kubeapi.mytest.com:6443 --token ntf08x.uaudrocid80akszx \
    --discovery-token-ca-cert-hash sha256:e60ab1ae8fcc0f8b8d3d2256c59738723a7ad04bee1aa0c0a1d8256bc62b4293 \
    --control-plane 


# 梅朝辉注释：用户需要执行的步骤2：在节点中执行命令，将节点加入到集群中，注意，该需要需要在node节点中执行
Then you can join any number of worker nodes by running the following on each as root:

kubeadm join kubeapi.mytest.com:6443 --token ntf08x.uaudrocid80akszx \
    --discovery-token-ca-cert-hash sha256:e60ab1ae8fcc0f8b8d3d2256c59738723a7ad04bee1aa0c0a1d8256bc62b4293 
[root@master ~]# echo $?
0
[root@master ~]# 
```

执行集群初始化时，会经过多个步骤，各个步骤的解释，详见上面命令行操作中的备注信息。

#### 3.4.3  检查k8s集群生成的文件(可忽略)

