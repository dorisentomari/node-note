const http = require('http');
let server = http.createServer();

let testFunction = function(req, res){
	if(req.url!=='/facicon.ico'){
		console.log('message send finished')
	}
};

server.on('request', function(req, res){
	console.log('has recevied client requests')
});

server.on('request', function(req, res){
	console.log(req.url);
	res.end();
});

server.on('request', testFunction);
//server.removeListener('request', testFunction)
server.removeAllListeners('request');
server.on('request', function(req,res){
	if(req.url!=='/favicon.ico'){
		console.log('hello, this is a new request');
	}
});
server.listen(1337,'127.0.0.1');