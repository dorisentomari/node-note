#!/usr/bin/env bash

yum update -y

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# install node and npm lib
nvm install 12.7.0
nvm use 12.7.0
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install http-server pm2 nodemon -g
echo "nvm install successfully"

# install mongodb
touch /etc/yum.repos.d/mongodb-org-4.0.repo
node ./mongo.js
sudo yum install -y mongodb-org -y
sudo service mongod start
echo "mongodb install successfully"

# install redis
sudo yum install epel-release yum-utils -y
sudo yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm -y
sudo yum-config-manager --enable remi -y
sudo yum install redis -y
sudo systemctl start redis
sudo systemctl enable redis
echo "redis install successfully"

# install git
sudo yum install git-core -y
git config --global user.name dawnight
git config --global user.email weizhiqimail@foxmail.com
echo "git install successfully"

# download anaconda
wget https://repo.anaconda.com/archive/Anaconda3-2019.07-Linux-x86_64.sh
echo "anaconda download completed"
export PATH="~/anaconda/bin:$PATH"
source ~/.bash_profile
echo "anaconda install completed"

# install mysql
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum update -y
sudo yum install mysql-server -y
sudo systemctl start mysqld
sudo systemctl stop mysqld
echo "mysql install successfully"
