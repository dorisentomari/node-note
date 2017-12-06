// 普通服务器

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
