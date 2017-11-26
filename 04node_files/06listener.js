var http = require('http');
var server = http.createServer();

/** bind events */
server.on('removeListener', function(e, f){
	console.log(e + ' events has been conceled')
})

server.on('newListener', function(e, f){
	console.log(e + ' events has been added')
})

var testFunction = function(req, res){
	if(req.url!=='/favicon.ico'){
		console.log('send message finished')
	}
}

server.on('request', function(req,res){
	if(req.url!== '/favicon.ico'){
		console.log('has received client request');
	}
})

server.on('request', function(req, res){
	if(req.url!=='/favicon.ico'){
		console.log(req.url)
	}
	res.end();
})
/** happen events */
server.on('request', testFunction);
server.removeListener('request', testFunction)
server.listen(1337,'127.0.0.1')