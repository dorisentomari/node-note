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


var server = net.createServer();
var file = require('fs').createWriteStream('./file01.txt');
server.on('connection', function(socket){
    console.log('socket');
    console.log(socket);
    address = socket.address();
    console.log('socket端口对象的地址信息为%j',address);
    socket.setEncoding('utf8');
    socket.on('data', function(data){
         //console.log(data);
        console.log('已接收到的字节数据长度', socket.bytesRead)
         //console.log(data.toString());

    });

    // 可以通过socket对象的pipe方法将客户端发送的流数据写到文件等其他目标对象中
    socket.pipe(file);

    socket.on('end', function(){
        console.log('客户端连接已关闭');
    })
})

server.listen(6666, 'localhost');
// socket端口对象的地址信息为{"address":"127.0.0.1","family":"IPv4","port":6666}

// 将两个客户端发送的内容混合写入文件
var server = net.createServer();
var file = require('fs').createWriteStream('./file01.txt');
server.on('connection', function(socket){
    socket.pause();
    setTimeout(function(){
        socket.resume();
        socket.pipe(file);
    }, 30000);
})

server.listen(6666, 'localhost');
/*
通过两台不同的命令行窗口分别输入1，3，5和2，4，6,得到的结果
得到的file01.txt的文件内部的信息为
1
3
5
2
4
6
*/

var server = net.createServer();
var file = require('fs').createWriteStream('./file01.txt');
server.on('connection', function(socket){
    socket.pause();
    setTimeout(function(){
        socket.resume();
        socket.pipe(file);
    }, 30000);
    socket.on('data', function(data){
        setTimeout(function(){
            socket.resume();
        }, 30000)
    })
})

server.listen(6666, 'localhost');













