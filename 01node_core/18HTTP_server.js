const http = require('http');
const fs = require('fs');
const PORT = 2596;
let server = http.createServer((req, res) => {
	if (req.url !== '/favicon.ico') {
		let out = fs.createWriteStream('./requestCurl.log');
		out.write('客户端请求的方法为:' + req.method + '\r\n');
		out.write('客户端请求的url字符串为:' + req.url + '\r\n');
		out.write('客户端请求头对象为:' + JSON.stringify(req.headers) + '\r\n');
		out.write('客户端请求所用的HTTP版本为:' + req.httpVersion + '\r\n');
		req.on('data', function (data) {
			console.log('服务器端接收到数据:' + data);
		});
		req.on('end', () => {
			console.log('客户端请求数据已全部接收完毕');
		})
	}
	res.end();
}).listen(PORT, 'localhost');

server.on('listening', () => {
	console.log(`server start listen localhost:${PORT}`);
});

server.on('connection', (socket) => {
	console.log('client and server had been connected');
});

setTimeout(10 * 1000, (socket) => {
	console.log('server response timeout');
});

server.on('error', (err) => {
	if (e.code === 'EADDRINUSE') {
		console.log('the port has been used,please change your server port');
	}
	server.on('close', () => {
		console.log('server closed');
	});
});
/***
 * 客户端请求的方法为:GET
 * 客户端请求的url字符串为:/
 * 客户端请求头对象为:{"user-agent":"curl/7.29.0","host":"localhost:2596","accept":"*|*"}
 * 客户端请求所用的HTTP版本为:1.1
 * */