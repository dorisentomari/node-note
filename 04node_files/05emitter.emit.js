var http = require('http');
var events = require('events');
var server = http.createServer();

server.on('request', function(req, res){
	if(req.url !== '/favicon,ico'){
		console.log(req.url)
	}
	res.end()
})

server.on('request', function(req, res){
	if(req.url !== '/favicon,ico'){
		console.log('request event ')
	}
	res.end()
})

server.on('EventOne', function(a, b, c){
	console.log('EventOne events happened');
	console.log(a);
	console.log(b);
	console.log(c);
})

server.emit('EventOne','AAA', 'BBB', 'CCC')
server.listen(1337, '127.0.0.1')
/*
使用EventEmitter类的listenerCount方法获取HTTP服务器独享的request事件的事件处理函数数量，并在控制台中将其输出
*/
console.log(events.EventEmitter.listenerCount(server, 'request'))
