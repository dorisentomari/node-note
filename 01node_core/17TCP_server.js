const net = require('net');
let server = net.createServer();
server.on('connection', function (socket) {
	console.log('客户端与服务器端连接已建立');
	socket.setEncoding('utf8');
	socket.on('data', function (data) {
		console.log('已接收客户端发送的数据' + data);
		socket.write('确认数据' + data);
	});
	
	socket.on('error', function (err) {
		console.log('在与客户端通信的过程中发生了一个错误,错误编码为 %s', err.code);
		socket.destroy();
	});
	socket.on('end', function () {
		console.log('客户端连接被关闭');
		server.unref();
	});
	
	socket.on('close', function (err) {
		if (err) {
			console.log('由于一个错误导致socket端口被关闭');
			socket.unref();
		} else {
			console.log('socket端口被正常关闭');
		}
	});
});
server.getConnections(function (err, count) {
	if (count === 2) {
		server.close();
	}
});
server.on('close', function () {
	console.log('TCP服务器被关闭');
});
server.listen(8431, 'localhost');