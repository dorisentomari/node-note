const net = require('net');
let server = net.createServer(function (socket) {
	console.log(socket);
	let address = socket.address();
	console.log('socket端口对象的地址信息为%j', address);
	// socket端口对象的地址信息为{"address":"127.0.0.1","family":"IPv4","port":2596}
	socket.setEncoding('utf8');
	socket.on('data', function (data) {
		console.log(data);
		console.log('已接收到的字节数据长度', socket.bytesRead);
		/**
		 * GET / HTTP/1.1
		 * User-Agent: curl/7.29.0
		 * Host: localhost:2596
		 * Accept:      // 属性值为"星号斜线星号"，因为会与注释冲突，所以没写
		 *
		 *
		 * 已接收到的字节数据长度 78
		 * */
	});
	// 可以通过socket对象的pipe方法将客户端发送的流数据写到文件等其他目标对象中
	socket.on('end', function () {
		console.log('客户端连接已关闭');
		// 当客户端连接关闭时，输出"客户端连接已关闭"
	})
});

server.getConnections(function (err, count) {
	console.log('当前存在' + count + '个客户端连接');
	server.maxConnections = 2;// 设置最大连接为2
	console.log('客户端与服务器端已建立连接');
});


server.on('error', function (e) {
	if (e.code === 'EADDRINUSE') {
		console.log('该地址及端口被占用，请修正')
	}
	server.close(function () {
		console.log('TCP服务器被关闭');
	});
});

let address = server.address();

server.listen(2596, 'localhost', 256, function () {
	console.log('服务器开始监听');
});

/**
// 将两个客户端发送的内容混合写入文件
var server = net.createServer();
var file = require('fs').createWriteStream('./file01.txt');
server.on('connection', function (socket) {
	socket.pause();
	setTimeout(function () {
		socket.resume();
		socket.pipe(file);
	}, 30000);
});

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
/*****
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
 ***/