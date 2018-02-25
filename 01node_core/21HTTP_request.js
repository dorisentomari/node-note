var http = require('http');

// 当客户端请求获取到服务器响应流时，触发req.on('response', function(res){})事件
// req.on('response', function(res){...})

// 向目标网站发送数据
// req.write(chunk, [encoding])
// chunk可以为Buffer，也可以为字符串

// 在建立连接的过程中，当为该连接分配端口时，触发http.ClientRequest对象的socket事件，可以通过对该事件进行监听并且指定事件回调函数的方法来指定当分配端口时所需要执行的处理。

var url = 'http://localhost:3333/';
var req = http.request(url, function (res) {
	console.log('res.statusCode', res.statusCode);
	console.log('response header', JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log('response content ', chunk);
	})
});
req.on('error', function (err) {
	if (err) {
		console.log('there are some error happened!');
		req.abort();//stop the request
	}
});

req.on('socket', function (socket) {
	console.log('socket');
});

req.end();
/*
res.statusCode 200
response header {"content-type":"text/html","date":"Wed, 06 Dec 2017 17:46:57 GMT","connection":"close","transfer-encoding":"chunked"}
response content  <html><head><meta charset="utf-8"/></head></html>
response content  hello, this is some new message;
*/


