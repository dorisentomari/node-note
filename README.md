## 1. 基本介绍
+ 这是一个完整的关于Node.js的学习笔记记录
+ 来源有两个，一个是[Node.js权威指南](https://book.douban.com/subject/25892704/)，另外一个来源是[Node.js中文网](http://nodejs.cn/api/)

## 2. 详细介绍
+ 项目一共有三个大的模块
+ Node.js的学习笔记记录以及Node.js的一些简单的小练习
+ Express的四大模块(`application`,`request`,`response`,`router`)的基本介绍(`router`未完成)
+ Koa基本使用(未完成)

## 3. 注意
+ 该项目为一个简单的介绍，方便个人学习查看使用，如果需要对Node.js有更深入的理解，请在[Node.js中文网](http://nodejs.cn/api/)上查看
+ 该项目已同步到`segment fault`网站上的[Node.js学习之路](https://segmentfault.com/blog/learnnode)专栏

# [01-不同操作系统下Node.js环境搭建](https://github.com/Dawnight/Node.jsNotes/blob/master/Docs/01-%E4%B8%8D%E5%90%8C%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E4%B8%8BNode.js%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA.md)
## 基本介绍
+ 这是一个基本的`Node.js`环境搭建,不同的操作系统可以选择不同的安装方式
+ 如果不需要太多的安装步骤,就直接在[Node.js](https://nodejs.org/zh-cn/)官网下载最新版安装包进行安装即可

## 0. CentOS快速安装需要的软件
+ 切换yum源
+ 安装不同版本的Node.js `nvm install 6.9.3 && npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install express-generator nodemon pm2 http-server -g && nvm install 9.3.0 && npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install express-generator nodemon pm2 http-server -g && nvm install 8.9.1 && npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install express-generator nodemon pm2 http-server -g`
+ 安装MongoDB
+ 安装git`yum install git-core -y`
+ 防火墙
    + 查看防火墙状态 `firewall-cmd --state`
    + 停止firewall `systemctl stop firewalld.service`
    + 禁止firewall开机启动 `systemctl disable firewalld.service `

## 1. Linux环境配置
**必须安装的软件**
### 1.1 Ubuntu
+ `sudo apt-get install git vim openssl build-essential libssh-dev wget curl`
### 1.2 CentOS
+ 更改`yum`源与更新系统
+ 首先备份`/etc/yum.repos.d/CentOS-Base.repo`
+ `cd /etc/yum.repos.d/`
+ 下载`163`的`yum`源配置文件`wget http://mirrors.163.com/.help/CentOS6-Base-163.repo`
+ 运行`yum makecache`生成缓存`yum makecache`
+ 更新系统`yum -y update`
+ conda：未找到命令
    + `vim ~/.bashrc`
    + 修改环境变量: `export PATH=~/anaconda3/bin:$PATH`
    + 重启环境变量: `source ~/.bashrc`

## 2. Node.js安装(使用[NVM](https://github.com/creationix/nvm))
+ 安装`nvm`命令`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`
+ 备份 nvm sh 文件 `http://file.ikite.top/linux/nvm-0.33.6.sh`
+ 安装`Node.js`版本`nvm install <Node.js版本号>`,例如`nvm install 9.3.0`,就是安装`Node.js`9.3.0版本
+ 如果直接使用`node`命令没有效果，需要先输入该命令`nvm use node`
+ 切换`cnpm`淘宝镜像`npm install -g cnpm --registry=https://registry.npm.taobao.org`
+ 安装基本的`npm`依赖包`cnpm install express-generator nodemon pm2 vue-cli -g`
+ `nvm alias default <版本号>`

## 3. Sublime安装(目前安装有问题)
### 3.1 Debian/Ubuntu使用APT安装
+ `wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -`
+ `sudo apt-get install apt-transport-https`
+ `echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list`
+ `sudo apt-get update`
+ `sudo apt-get install sublime-text`
### 3.2 CentOS使用Yum安装
+ `sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg`
+ `sudo yum-config-manager --add-repo https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo`
+ `sudo yum install sublime-text`

## 4. MongoDB安装(v3.6)
### 4.1 Ubuntu安装
+ `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5`
+ Ubuntu 14.04版本操作系统:`echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list`
+ Ubuntu 16.04版本操作系统:`echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list`
+ `sudo apt-get update`
+ `sudo apt-get install -y mongodb-org`
+ `sudo apt-get install -y mongodb-org=3.6.1 mongodb-org-server=3.6.1 mongodb-org-shell=3.6.1 mongodb-org-mongos=3.6.1 mongodb-org-tools=3.6.1`
+ `sudo service mongod start`

### 4.2 CentOS安装(v3.6,[官网链接](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/))
+  在`/etc/yum.repos.d/mongodb-org-3.6.repo`文件下输入一下内容
```
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
```
+ 安装`mongodb`命令`sudo yum install -y mongodb-org`
+ 开启`mongodb`服务`sudo service mongod start`
+ 关闭`mongodb`服务`sudo service mongod stop`
+ 重启`mongodb`服务`sudo service mongod restart`
+ 配置文件是`etc/mongo.conf`,可以通过配置该文件,修改配置,然后再重启`mongodb`数据库

### 4.3 Windows安装
+ 从官网下载安装包进行安装,安装目录为`F:/software/MongoDB/`
+ 创建`data`目录,在`data`目录下创建`db`和`log`两个目录
+ 进入`F:/software/MongoDB/bin`目录,`F:\software\MongoDB\bin>mongod --dbpath F:\software\MongoDB\data\db`
+ 进入刚创建的`log`目录,创建`mongodb.log`文件
+ 进入`F:/software/MongoDB/`目录,创建`mongodb.config`配置文件
```
dbpath=F:/software/MongoDB/data/db
logpath=F:/software/MongoDB/data/log/mongodb.log  
```
+ 利用管理员身份打开命令行,输入`mongod --config F:/software/MongoDB/mongodb.config --install --serviceName "MongoDB"`

## 5.Redis安装
+ 获取文件`wget http://download.redis.io/redis-stable.tar.gz`
+ 解压文件`tar xzvf redis-stable.tar.gz`
+ 进入目录`cd redis-stable`
+ 编译`make`
+ 安装`make install`
+ 设置配置文件路径`mkdir -p /etc/redis`,`cp redis.conf /etc/redis`
+ 修改配置文件`vi /etc/redis/redis.conf`
    + 将`daemonize no`该为`daemonize yes `
    + `bind 127.0.0.1 `
    + `bind 192.168.0.20`(本机IP)
+ 启动`/usr/local/bin/redis-server /etc/redis/redis.conf`
+ 查看启动`ps -ef | grep redis`

## 6. Yarn安装
+ `yarn config set registry https://registry.npm/taobao.org`

### 6.1 Debian/Ubuntu
+ `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
+ `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
+ `sudo apt-get update && sudo apt-get install yarn`

### 6.2 CentOS/Fedora/RHEL
+ `sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo`
+ `curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -`
+ `sudo yum install yarn`

## 7. git的使用方法
+ 安装`git`软件`yum install git-core`
+ 生成ssh命令`ssh-keygen -t rsa -C "weizhiqimail@gmail.com"`
+ 配置用户名`git config --global user.name dawnight`
+ 配置邮箱`git config --global user.email weizhiqimail@gmail.com`
+ 添加文件到缓存区`git add .`
+ 查看文件状态`git status`
+ 提交命令`git commit -m "some messages"`
+ 移除远程源`git remote rm origin`
+ 提交代码到远程`git remote add origin <remoteRepositoryAddress>`
+ 将代码推送到远程`git push origin master`
+ 将本地代码与远程同步`git pull origin master`,同步`master`代码
+ 查看本地分支`git branch -a`
+ 查看远程分支`git branch -r`
+ 创建本地分支`git branch <branchName>`
+ 切换分支`git checkout <branchName>`
+ 将本地分支`push`到远程分支`git push origin <localBranchName>:<remoteBranchName>`,只写这一条命令,表示创建一个远程分支
+ 将git的提交记录导出为文件`git --no-pager log > log.txt`

## 8. 升级gcc[链接](http://blog.csdn.net/origin_lee/article/details/43231397)
+ `wget http://gcc.skazkaforyou.com/releases/gcc-4.9.1/gcc-4.9.1.tar.gz` **or** `wget http://gcc.skazkaforyou.com/releases/gcc-4.8.2/gcc-4.8.2.tar.gz`
+ `tar -xf gcc-4.9.1.tar.gz`
+ `cd gcc-4.9.1`
+ `./contrib/download_prerequisites`
+ `mkdir gcc_temp`
+ `cd gcc_temp`
+ `../configure --enable-checking=release --enable-languages=c,c++ --disable-multilib`
+ `make`
+ `make install`

## 9. 安装Nginx
**全部安装在`/usr/local/src`目录下边**
### 9.1 安装PCRE库
+ `cd /usr/local/src`
+ `wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.39.tar.gz`
+ `tar zxvf pcre-8.39.tar.gz`
+ `cd pcre-8.39`
+ `./configure`
+ `make`
+ `make install`

### 9.2 安装Zlib库
+ `cd /usr/local/src`
+ `wget http://zlib.net/zlib-1.2.11.tar.gz`
+ `tar zxvf zlib-1.2.11.tar.gz`
+ `cd zlib-1.2.11`
+ `./configure`
+ `make`
+ `make install`

#### 9.3 安装openssl
+ `cd /usr/local/src`
+ `wget https://www.openssl.org/source/openssl-1.1.0g.tar.gz`
+ `tar zxvf openssl-1.1.0g.tar.gz`
+ `./config`
+ `make`
+ `make install`

### 9.4 安装Nginx
+ `cd /usr/local/`
+ `wget http://nginx.org/download/nginx-1.8.0.tar.gz`
+ `tar -zxvf nginx-1.8.0.tar.gz`
+ `cd nginx-1.8.0`
+ `./configure --prefix=/usr/local/nginx --with-pcre=/usr/local/pcre-8.39 --with-zlib=/usr/local/zlib-1.2.11`
    * 在`--prefix`后面接以下命令:
    * `--with-pcre=/usr/local/pcre-8.39`指的是`pcre-8.39`的源码路径。
    * `--with-zlib=/usr/local/zlib-1.2.11`指的是`zlib-1.2.11`的源码路径。 
+ `make`
+ `make install`

### 9.5 Nginx控制
+ 启动:`/usr/local/nginx/sbin/nginx`or`/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf`
+ 重启:`/usr/local/nginx/sbin/nginx -s reload`or`kill -HUP <pid>`
+ 停止:`/usr/local/nginx/sbin/nginx -s stop`
    * 查看进程:`ps -ef|grep nginx`
    * 从容停止:`kill -QUIT <pid>`
    * 快速停止:`kill -TERM <pid>`or`kill -INT <pid>`
    * 强制停止:`pkill -9 <pid>`
+ 测试配置文件是否正常:`/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf`
+ Nginx的信号控制
    * `HUP`,重启
    * `QUIT`,从容关闭
    * `TERM`,快速关闭
    * `INT`,从容关闭
    * `USR1`,切换日志文件 `kill -USR1 <pid>`
    * `USR2`,平滑升级可执行进行 `kill -USR2 <pid>`
    * `WINCH`,从容关闭工作进程

## 10. 安装MySQL
### 10.1 CentOS上安装
+ `wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm`
+ `sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm`
+ `yum update`
+ `sudo yum install mysql-server`
+ `sudo systemctl start mysqld`
+ `sudo systemctl stop mysqld`
+ `sudo mysqld --user=root --skip-grant-tables &`
+ `UPDATE mysql.user SET authentication_string=PASSWORD('') where USER='root';`
+ `alter user 'root'@localhost IDENTIFIED WITH mysql_native_password by '';`
+ 错误信息: 远程连接MYSQL提示Host is not allowed to connect to this MySQL server
    + `use mysql;`
    + `update user set host = '%' where user = 'root';`
    + `flush privileges;` 
