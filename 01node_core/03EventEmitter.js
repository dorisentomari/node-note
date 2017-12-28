var http = require('http');
var server = http.createServer();

server.on('request', function(req,res){
	if(req.url!== '/favicon.ico'){
		console.log(req.url);
	}
	res.end();
})

server.once('request', function(req, res){
	if(req.url!=='/favicon.ico'){
		console.log('message send finished')
	}
})

server.listen(1337,'127.0.0.1')