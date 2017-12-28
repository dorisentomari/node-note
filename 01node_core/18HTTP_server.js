var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res){
	if(req.url !== '/favicon.ico'){
		var out = fs.createWriteStream('./requestCurl.log');
		out.write('客户端请求的方法为:' + req.method + '\r\n');
		out.write('客户端请求的url字符串为:' + req.url + '\r\n');
		out.write('客户端请求头对象为:' + JSON.stringify(req.headers) + '\r\n');
		out.write('客户端请求所用的HTTP版本为:' + req.httpVersion + '\r\n');
		
		req.on('data', function(data){
			console.log('服务器端接收到数据:'+ data);
		});

		req.on('end', function(){
			console.log('客户端请求数据已全部接收完毕');
		})

	}
	res.end();
}).listen(2576, 'localhost');

server.on('listening', function(){
	console.log('server start listen localhost:2576');
	// server.close();
})

server.on('connection', function(socket){
	console.log('client and server had been connected');
})

server.setTimeout(10*1000, function(socket){
	console.log('server response timeout');
	
})

server.on('close', function(){
	console.log('server closed');
})

server.on('error', function(e){
	if(e.code === 'EADDRINUSE'){
		console.log('the port has been used,please change your server port');
	}
})