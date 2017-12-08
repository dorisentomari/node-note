[TOC]

## 1. Linux环境配置
**必须安装的软件**
#### 1.1 Ubuntu
+ `sudo apt-get install git vim openssl build-essential libssh-dev wget curl`
#### 1.2 CentOS
+ 暂无

## 2. Node安装(使用NVM)
+ `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`
+ `nvm use node`
+ `nvm install <Node版本号>`
+ `npm install -g cnpm --registry=https://registry.npm.taobao.org`
+ `cnpm install http-server express express-generator webpack webpack-dev-server gulp nodemon pm2 vue-cli -g`
+ `nvm alias default <版本号>`

## 3. Sublime安装
#### 3.1 Debian/Ubuntu使用APT安装
+ `wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -`
+ `sudo apt-get install apt-transport-https`
+ `echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list`
+ `sudo apt-get update`
+ `sudo apt-get install sublime-text`
#### 3.2 CentOS使用Yum安装
+ `sudo rpm -v --import https://download.sublimetext.com/sublimehq-rpm-pub.gpg`
+ `sudo yum-config-manager --add-repo https://download.sublimetext.com/rpm/stable/x86_64/sublime-text.repo`
+ `sudo yum install sublime-text`

## 4. MongoDB安装
#### 4.1 Ubuntu安装(目前安装步骤有问题,可能会失败)
+ `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6`
+ Ubuntu 14.04:`echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`
+ Ubuntu 16.04:`echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`
+ `sudo apt-get update`
+ `sudo apt-get install -y mongodb-org`
+ `sudo service mongod start`

#### 4.2 CentOS安装
+  在`/etc/yum.repos.d/mongodb-org-3.4.repo`文件下输入一下内容
```
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
```
+ `sudo yum install -y mongodb-org-3.6.0 mongodb-org-server-3.6.0 mongodb-org-shell-3.6.0 mongodb-org-mongos-3.6.0 mongodb-org-tools-3.6.0
`
+ `sudo service mongod start`

## 5. Redis安装
+ `wget http://download.redis.io/releases/redis-4.0.1.tar.gz`
+ `tar xzf redis-4.0.1.tar.gz`
+ `cd redis-4.0.1`
+ `make`
+ 安装Redis：`make PREFIX=/user/local/redis install`
+ **Redis安装目录`/usr/local/redis`**
+ 将redis.conf拷贝到Redis安装目录：`cp redis.conf /usr/local/redis`
+ 进入安装目录，更改redis.conf文件：`vim redis.conf --> daemonize no 改为 yes`
+ 启动redis后端模式：` /usr/local/redis/bin/redis-server /usr/local/redis/redis.conf`
+ 使用 `ps -ef  | grep -i redis` 查看服务是否启动
+ 使用 `./bin/redis-cli shutdown` 停止服务
+ 从redis目录下输入`./bin/redis-cli`,再输入`ping`输出`PONG`表示连接没有问题
+  java使用 jedis 链接远程 远程redis 需要在 `redis.conf` 添加 `bind 167.88.179.35` （本机IP）

## 6. Yarn安装
+ `yarn config set registry https://registry.npm/taobao.org`

#### 6.1 Debian/Ubuntu
+ `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
+ `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
+ `sudo apt-get update && sudo apt-get install yarn`

#### 6.2 CentOS/Fedora/RHEL
+ `sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo`
+ `curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo bash -`
+ `sudo yum install yarn`

## 7. git的使用方法
+ `yum install git-core`
+ `git add .`
+ `git status`
+ `git commit -m "some messages"`
+ `git remote rm origin`
+ `git remote add origin git@github.com:Dawnight/node.git`
+ `git push origin master`
+ 同步master代码:`git pull origin master`

## 8. 升级gcc
+ link:`http://blog.csdn.net/origin_lee/article/details/43231397`
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
#### 9.1 安装PCRE库
+ `cd /usr/local/src`
+ `wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.39.tar.gz`
+ `tar zxvf pcre-8.39.tar.gz`
+ `cd pcre-8.39`
+ `./configure`
+ `make`
+ `make install`

#### 9.2 安装Zlib库
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

#### 9.4 安装Nginx
+ `cd /usr/local/`
+ `wget http://nginx.org/download/nginx-1.8.0.tar.gz`
+ `tar -zxvf nginx-1.8.0.tar.gz`
+ `cd nginx-1.8.0`
+ `./configure --prefix=/usr/local/nginx --with-pcre=/usr/local/pcre-8.39 --with-zlib=/usr/local/zlib-1.2.11`
    * 在`--prefix`后面接以下命令:
    * `--with-pcre=/usr/local/pcre-8.39` 指的是pcre-8.39 的源码路径。
    * `--with-zlib=/usr/local/zlib-1.2.11` 指的是zlib-1.2.11 的源码路径。 
+ `make`
+ `make install`

#### 9.5 Nginx控制
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

## 10. 更改yum源与更新系统
#### CentOS更改
+ 首先备份`/etc/yum.repos.d/CentOS-Base.repo`
+ `cd /etc/yum.repos.d/`
+ 下载163的yum源配置文件`wget http://mirrors.163.com/.help/CentOS6-Base-163.repo`
+ 运行yum makecache生成缓存`yum makecache`
+ 更新系统`yum -y update`

