const http = require('http');
let server = http.createServer();
server.on('removeListener', (e, f) => {
	console.log(e + 'events has been canceled');
});

server.on('newListener', (e, f) => {
	console.log(e + 'events has been added');
});

let testFunction = function (req, res) {
	if (req.url !== '/favicon.ico') {
		console.log('test Function Send Message finished');
	}
}

server.on('request', (req, res) => {
	if (req.url !== '/favicon.ico') {
		console.log('has recevied client request');
	}
});

server.on('request', (req, res) => {
	if (req.url !== '/favicon.ico') {
		console.log(req.url);
	}
	res.end();
});

server.on('request', testFunction);
server.removeListener('request', testFunction);
server.listen(1337, '127.0.0.1');