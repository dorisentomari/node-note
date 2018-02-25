// 普通服务器
/*
var http = require('http');
var server = http.createServer(function(req, res){
	if(req.url !== '/favicon.ico'){
		req.on('data', function(data){
			console.log('server received data :', data.toString());
			res.write('check data :' + data.toString());
		});
		req.on('end', function(){
			res.addTrailers({'Content-MD5': 'a54545c821b5d2e2fc245a2'});
			res.end();
		});
	}
}).listen(3333, 'localhost', function(){
    console.log('the http server is running at localhost:3333')
});
*/


// 代理服务器制作
var http = require('http');
var url = require('url');

var server = http.createServer(function (sreq, sres) {
	console.log(sreq.url)
	var url_parts = url.parse(sreq.url);
	var options = {
		host: 'www.taobao.com',
		port: 80,
		path: url_parts.pathname,
		headers: sreq.headers
	}
	var creq = http.get(options, function (cres) {
		sres.writeHead(cres.statusCode, cres.headers);
		cres.pipe(sres);
	})
	sreq.pipe(creq);
}).listen(2576, '127.0.0.1', function () {
	console.log('代理服务器运行在 127.0.0.1:2576')
})


