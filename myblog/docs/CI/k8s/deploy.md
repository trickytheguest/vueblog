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



在部署K8S集群前，先对服务器进行以下配置：

完成基本的配置：
1. 时间同步，使用`chronyd`服务同步时间。

2. 时区设置，设置为亚洲/上海。

3. 关闭防火墙，关闭`firewalld`e服务。

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