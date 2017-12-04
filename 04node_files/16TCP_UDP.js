var net = require('net');
/*
var server = net.createServer(function(socket){
    server.getConnections(function(err, count){
        console.log('当前存在' + count + '个客户端连接');
        server.maxConnections = 2;// 设置最大连接为2
        console.log('客户端与服务器端已建立连接');
    })

    server.close(function(){
        console.log('TCP服务器被关闭');
    })

    server.on('error', function(e){
        if(e.code === 'EADDRINUSE'){
            console.log('该地址及端口被占用，请修正')
        }    
    })
})

var address = server.address();

server.listen(2596, 'localhost', 256, function(){
    console.log(address)
    console.log('服务器开始监听');
})
*/

var server = net.createServer();
server.on('connection', function(socket){
    address = socket.address();
    console.log('socket端口对象的地址信息为%j',address);
    socket.setEncoding('utf8');
    socket.on('data', function(data){
        console.log(data);
        //console.log(data.toString());

    })
    /*
    GET / HTTP/1.1
    User-Agent: curl/7.19.7 (x86_64-redhat-linux-gnu) libcurl/7.19.7 NSS/3.14.0.0 zlib/1.2.3 libidn/1.18 libssh2/1.4.2
    Host: localhost:6666
    Accept: */ //*
})

server.listen(6666, 'localhost');
// socket端口对象的地址信息为{"address":"127.0.0.1","family":"IPv4","port":6666}


















