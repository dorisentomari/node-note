const http = require('http');
let server = http.createServer();

server = http.createServer();
server.on('request', (req, res) => {
    if (req.url !== '/favicon.ico') {
        console.log(req.url);
    }
    res.end();
});

server.on('request', (req, res) => {
    if (req.url !== '/favicon.ico') {
        console.log('message send finished once');
    }
});

server.listen(1337, '127.0.0.1');