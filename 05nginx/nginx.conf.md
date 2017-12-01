## 1. Nginx配置文件主要由四部分组成
+ main(全区设置)
+ server(主机配置)
+ upstream(负载均衡服务器设置)
+ location(URL匹配特定位置设置)

## 2. 全局变量
```
#Nginx的worker进程运行用户以及用户组
#user  nobody nobody;
#Nginx开启的进程数
worker_processes  1;
#worker_processes auto;
#以下参数指定了哪个cpu分配给哪个进程，一般来说不用特殊指定。如果一定要设的话，用0和1指定分配方式.
#这样设就是给1-4个进程分配单独的核来运行，出现第5个进程是就是随机分配了。eg:
#worker_processes 4     #4核CPU 
#worker_cpu_affinity 0001 0010 0100 1000

#定义全局错误日志定义类型，[debug|info|notice|warn|crit]
#error_log  logs/error.log  info;
#指定进程ID存储文件位置
#pid        logs/nginx.pid;
#一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（ulimit -n）与nginx进程数相除，但是nginx分配请求并不是那么均匀，所以最好与ulimit -n的值保持一致。
#vim /etc/security/limits.conf
#  *                soft    nproc          65535
#  *                hard    nproc          65535
#  *                soft    nofile         65535
#  *                hard    nofile         65535
worker_rlimit_nofile 65535;
```

## 3. 事件配置
```
events {
    #use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型，如果跑在FreeBSD上面，就用kqueue模型。
    use epoll;
    #每个进程可以处理的最大连接数，理论上每台nginx服务器的最大连接数为worker_processes*worker_connections。理论值：worker_rlimit_nofile/worker_processes
    #注意：最大客户数也由系统的可用socket连接数限制（~ 64K），所以设置不切实际的高没什么好处
    worker_connections  65535;    
    #worker工作方式：串行（一定程度降低负载，但服务器吞吐量大时，关闭使用并行方式）
    #multi_accept on; 
}
```

## 4. http参数
```
    #文件扩展名与文件类型映射表
    include mime.types;
    #默认文件类型
    default_type application/octet-stream;

#日志相关定义
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #定义日志的格式。后面定义要输出的内容。
    #1.$remote_addr 与$http_x_forwarded_for 用以记录客户端的ip地址；
    #2.$remote_user ：用来记录客户端用户名称；
    #3.$time_local ：用来记录访问时间与时区；
    #4.$request  ：用来记录请求的url与http协议；
    #5.$status ：用来记录请求状态； 
    #6.$body_bytes_sent ：记录发送给客户端文件主体内容大小；
    #7.$http_referer ：用来记录从那个页面链接访问过来的；
    #8.$http_user_agent ：记录客户端浏览器的相关信息
    #连接日志的路径，指定的日志格式放在最后。
    #access_log  logs/access.log  main;
    #只记录更为严重的错误日志，减少IO压力
    error_log logs/error.log crit;
    #关闭日志
    #access_log  off;

    #默认编码
    #charset utf-8;
    #服务器名字的hash表大小
    server_names_hash_bucket_size 128;
    #客户端请求单个文件的最大字节数
    client_max_body_size 8m;
    #指定来自客户端请求头的hearerbuffer大小
    client_header_buffer_size 32k;
    #指定客户端请求中较大的消息头的缓存最大数量和大小。
    large_client_header_buffers 4 64k;
    #开启高效传输模式。
    sendfile        on;
    #防止网络阻塞
    tcp_nopush on;
    tcp_nodelay on;    
    #客户端连接超时时间，单位是秒
    keepalive_timeout 60;
    #客户端请求头读取超时时间
    client_header_timeout 10;
    #设置客户端请求主体读取超时时间
    client_body_timeout 10;
    #响应客户端超时时间
    send_timeout 10;

#FastCGI相关参数是为了改善网站的性能：减少资源占用，提高访问速度。
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 128k;

#gzip模块设置
    #开启gzip压缩输出
    gzip on; 
    #最小压缩文件大小
    gzip_min_length 1k; 
    #压缩缓冲区
    gzip_buffers 4 16k;
    #压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
    gzip_http_version 1.0;
    #压缩等级 1-9 等级越高，压缩效果越好，节约宽带，但CPU消耗大
    gzip_comp_level 2;
    #压缩类型，默认就已经包含text/html，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。
    gzip_types text/plain application/x-javascript text/css application/xml;
    #前端缓存服务器缓存经过压缩的页面
    gzip_vary on;
```

## 5. 虚拟主机基本设置
```
#虚拟主机定义
    server {
        #监听端口
        listen       80;
        #访问域名
        server_name  localhost;
        #编码格式，若网页格式与此不同，将被自动转码
        #charset koi8-r;
        #虚拟主机访问日志定义
        #access_log  logs/host.access.log  main;
        #对URL进行匹配
        location / {
            #访问路径，可相对也可绝对路径
            root   html;
            #首页文件。以下按顺序匹配
            index  index.html index.htm;
        }

#错误信息返回页面
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

#访问URL以.php结尾则自动转交给127.0.0.1
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}
#php脚本请求全部转发给FastCGI处理
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

#禁止访问.ht页面 （需ngx_http_access_module模块）
        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
#HTTPS虚拟主机定义
    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
```

## 6. Nignx状态监控
```
#Nginx运行状态，StubStatus模块获取Nginx自启动的工作状态（编译时要开启对应功能）
        #location /NginxStatus {
        #    #启用StubStatus的工作访问状态    
        #    stub_status    on;
        #    #指定StubStaus模块的访问日志文件
        #    access_log    logs/Nginxstatus.log;
        #    #Nginx认证机制（需Apache的htpasswd命令生成）
        #    #auth_basic    "NginxStatus";
        #    #用来认证的密码文件
        #    #auth_basic_user_file    ../htpasswd;    
        #}
//访问：http://IP/NginxStatus(测试就不加密码验证相关) 
```

## 7. 反向代理
```
#以下配置追加在HTTP的全局变量中

#nginx跟后端服务器连接超时时间(代理连接超时)
proxy_connect_timeout      5;
#后端服务器数据回传时间(代理发送超时)
proxy_send_timeout         5;
#连接成功后，后端服务器响应时间(代理接收超时)
proxy_read_timeout         60;
#设置代理服务器（nginx）保存用户头信息的缓冲区大小
proxy_buffer_size          16k;
#proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
proxy_buffers              4 32k;
#高负荷下缓冲大小（proxy_buffers*2）
proxy_busy_buffers_size    64k;
#设定缓存文件夹大小，大于这个值，将从upstream服务器传
proxy_temp_file_write_size 64k;
#反向代理缓存目录
proxy_cache_path /data/proxy/cache levels=1:2 keys_zone=cache_one:500m inactive=1d max_size=1g;
#levels=1:2 设置目录深度，第一层目录是1个字符，第2层是2个字符
#keys_zone:设置web缓存名称和内存缓存空间大小
#inactive:自动清除缓存文件时间。
#max_size:硬盘空间最大可使用值。
#指定临时缓存文件的存储路径(路径需和上面路径在同一分区)
proxy_temp_path /data/proxy/temp

#服务配置
server {
    #侦听的80端口
    listen       80;
    server_name  localhost;
    location / {
        #反向代理缓存设置命令(proxy_cache zone|off,默认关闭所以要设置)
        proxy_cache cache_one;
        #对不同的状态码缓存不同时间
        proxy_cache_valid 200 304 12h;
        #设置以什么样参数获取缓存文件名
        proxy_cache_key $host$uri$is_args$args;
        #后7端的Web服务器可以通过X-Forwarded-For获取用户真实IP
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr; 
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;   
        #代理设置
        proxy_pass   http://IP; 
        #文件过期时间控制
        expires    1d;
    }
    #配置手动清楚缓存(实现此功能需第三方模块 ngx_cache_purge)
    #http://www.123.com/2017/0316/17.html访问
    #http://www.123.com/purge/2017/0316/17.html清楚URL缓存
    location ~ /purge(/.*) {
        allow    127.0.0.1;
        deny    all;
        proxy_cache_purge    cache_one    $host$1$is_args$args;
    }
    #设置扩展名以.jsp、.php、.jspx结尾的动态应用程序不做缓存
    location ~.*\.(jsp|php|jspx)?$ { 
        proxy_set_header Host $host; 
        proxy_set_header X-Real-IP $remote_addr; 
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;   
        proxy_pass http://http://IP;
    }
```

## 8. 负载均衡
```
#负载均衡服务器池
upstream my_server_pool {
    #调度算法
    #1.轮循（默认）（weight轮循权值）
    #2.ip_hash：根据每个请求访问IP的hash结果分配。（会话保持）
    #3.fair:根据后端服务器响应时间最短请求。（upstream_fair模块）
    #4.url_hash:根据访问的url的hash结果分配。（需hash软件包）
    #参数：
    #down：表示不参与负载均衡
    #backup:备份服务器
    #max_fails:允许最大请求错误次数
    #fail_timeout:请求失败后暂停服务时间。
    server 192.168.1.109:80 weight=1 max_fails=2 fail_timeout=30;
    server 192.168.1.108:80 weight=2 max_fails=2 fail_timeout=30;
}
#负载均衡调用
server {
    ...
    location / {
    proxy_pass http://my_server_pool;
    }
}
```

## 9. URL重写
```
#根据不同的浏览器URL重写
if($http_user_agent ~ Firefox){
rewrite ^(.*)$  /firefox/$1 break; 
}
if($http_user_agent ~ MSIE){
rewrite ^(.*)$  /msie/$1 break; 
}

#实现域名跳转
location / {
    rewrite ^/(.*)$ https://web8.example.com$1 permanent;
}
```

## 10. IP限制
```
#限制IP访问
location / {
    deny 192.168.0.2；
    allow 192.168.0.0/24;
    allow 192.168.1.1;
    deny all;
}
```

## 11. log文件配置
```nginx
log_format  combined  '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';
access_log  logs/access.log  combined;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
```

#### 11.1 log_format 日志格式
+ `combined`默认的log日志格式
+ `$remote_addr`客户端的IP地址
+ `$remote_user`客户端的用户名
+ `$time_local`本地时间
+ `$request`请求的url
+ `$status`请求状态
+ `$body_bytes_sent`发送给客户端的字节数
+ `$http_referer`访问本网页的原网页
+ `$http_user_agent`客户端浏览器的信息
+ `$http_x_forwarded_for`客户端的IP地址

#### 11.2 access_log 日志存放路径
+ `logs/access.log`
+ `access_log off;`不记录日志文件

####  11.3 日志文件切割
+ 手动切割
    * 先把原文件拿走
    * 再查看Nginx的pid号
    * `kill -USR1 <pid>`
+ 自动切割
    * 创建一个批处理文件`cutlog.sh`脚本
```sh
D = $(date + %Y%m%d)
mv /usr/local/nginx/logs/access.log ${D}.log
kill -USR1 $(cat /usr/local/nginx/logs/nginx.pid)
```
    * `crontab -e` 设置定时
```
23 59 *** /bin/bash /usr/local/nginx/logs/cutlog.sh
```

## 12. 缓存配置
**在主配置文件内http下的server里边进行配置**
```
location ~.*\.!(jpg|png|gif)${
    expires 30d;
}

location ~.*\.(css|js)${
    expires 1h;
}
```

##  13. 其他配置
#### 13.1 gzip压缩
**在主配置文件内ttp下进行配置**
+ `gzip on`开启gzip压缩
+ `gzip_min_length 1k;`压缩下限,小于1k的文件不予压缩
+ `gzip_buffer 4 16k;`压缩后的文件放在内存中,内存的大小为4个16k的数据流
+ `gzip_http_version 1.1;`http协议为1.1版本,才会进行压缩
+ gzip压缩要求双向支持,客户端浏览器支持,服务器端支持
+ `gzip_vary on;`开启判断浏览器客户端是否支持gzip压缩技术

####  13.2自动列目录配置
**要求**
+ 访问的文件夹下不存在Index之类的默认首页文件
+ 服务器配置了自动列目录功能
+ 在对应的虚拟主机的location下配置
+ `autoindex on;`


## 12. Nginx启动脚本
```
#!/bin/bash
#chkconfig: 2345 80 90
#description:auto_run
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
# Check if user is root
if [ $(id -u) != "0" ]; then
   echo "Error: You must be root to run this script!\n"
   exit 1
fi
NGINXDAEMON=/usr/local/nginx/sbin/nginx
PIDFILE=/usr/local/nginx/logs/nginx.pid
function_start()
{
   echo -en "\033[32;49;1mStarting nginx......\n"
   echo -en "\033[39;49;0m"  
   if [ -f $PIDFILE ]; then
     printf "Nginx is runing!\n"
     exit 1
   else  
       $NGINXDAEMON
       printf "Nginx is the successful start!\n"
   fi
}
function_stop()
{
   echo -en "\033[32;49;1mStoping nginx......\n"
   echo -en "\033[39;49;0m"
   if  [ -f $PIDFILE ]; then
       kill `cat $PIDFILE`
       printf "Nginx program is stoped\n"
   else  
       printf  "Nginx program is not runing!\n"
   fi
}
function_reload()
{
   echo -en "\033[32;49;1mReload nginx......\n"
   echo -en "\033[39;49;0m"
   function_stop
   function_start
}
function_restart()
{
   echo -en "\033[32;49;1mRestart nginx......\n"
   echo -en "\033[39;49;0m"
   printf "Reload Nginx configure...\n"
   $NGINXDAEMON -t
   kill -HUP `cat $PIDFILE`
   printf "Nginx program is reloding!\n"
}
function_kill()
{
   killall nginx
}
function_status()
{
   if ! ps -ef|grep -v grep|grep 'nginx:' > /dev/null 2>&1
   then
       printf "Nginx is down!!!\n"
   else
       printf "Nginx is running now!\n"
   fi
}
if [ "$1" = "start" ]; then
   function_start
elif [ "$1" = "stop" ]; then
   function_stop
elif [ "$1" = "reload" ]; then
   function_reload
elif [ "$1" = "restart" ]; then
   function_restart
elif [ "$1" = "kill" ]; then
   function_kill
elif [ "$1" = "status" ]; then
   function_status
else
   echo -en "\033[32;49;1m Usage: nginx {start|stop|reload|restart|kill|status}\n"
   echo -en "\033[39;49;0m"
fi
```













