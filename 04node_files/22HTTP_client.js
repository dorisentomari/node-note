// 普通客户端

var http = require('http');
var options = {
	hostname: 'localhost',
	port: 3333,
	path: '/',
	method: 'POST'
}
var req = http.request(options, function(res){
	res.on('data', function(chunk){
		console.log('client received data :' + chunk);
	});
	res.on('end', function(){
		console.log('Trailer header info: %j', res.trailers)
	})
});
req.write('hello,this is client request write;');
req.end('byebye');
