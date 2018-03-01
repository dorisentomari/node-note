## 1. 发送`HTTP`响应头信息
+ `response.writeHead(statusCode, [reasonPhrase], [headers])`
    * `statusCode`:参数用于指定一个三位的`HTTP`状态码
    * `reasonPhrase`:参数值为一个字符串，用于指定对该状态码的描述信息
    * `headers`:为一个对象，用于指定服务器端创建的响应头对象
    * `content-type`:用于指定内容类型
    * `location`:用于将客户端重定向到另一个`url`地址
    * `content-disposition`:用于指定一个被下载的文件名
    * `content-length`:用于指定服务器端响应内容的编码格式
    * `set-cookie`:用于在客户端创建一个`cookie`
    * `content-encoding`:用于指定服务器端响应内容的编码方式
    * `Cache-Control`:用于开启缓存机制
    * `Expires`:用于指定缓存过期时间
    * `Etag`:用于指定当服务器端响应内容没有变化时不重新下载数据
+ 单独设置响应头信息
可以使用`http.ServerResponse`对象的`setHeader`方法单独设置响应头信息。
    * `response.setHeader(name, value)`
    * `res.setHeader('Content-Type', 'text/type');`
+ 获取响应头某个字段的值
    * `response.getHeader(name);`
    * `res.getHeader('Content-Type');`
+ 删除一个响应字段
    * `response.removeHeader(name);`
    * `res.removeHeader('Content-Type');`
+ 检测响应头是否已经发送
    * `response.headersSent();`
    * 已发出，为`true`
    * 未发送，为`false`
+ `Date`字段
    * 默认情况下`HTTP`服务器会自动将服务器端当前时间作为响应头中的`Date`字段值发送给客户端，可以通过将`res.sendDate`属性值设置为`false`的方法，在响应头中删除`Date`字段
    * `res.sendDate = false;`
+ 简单的`HTTP`服务器
```javascript
const http = require('http');
let server = http.createServer(function (req, res) {
	if (req.url !== '/favicon.ico') {
		res.write('<html><head><meta charset="utf-8"/></head></html>');
		res.sendDate = false; // 不发送时间
		if (res.headersSent) {
			console.log('第一个响应头已经发送');
		} else {
			console.log('第一个响应头未发送');
		}
		res.writeHead(200, {'Content-Type': 'text/html'});
		if (res.headersSent) {
			console.log('第二个响应头已经发送');
		} else {
			console.log('第二个响应头未发送');
		}
		res.write('hello, this is http server response content');
	}
	res.end();
}).listen(2596, 'localhost', function () {
	console.log('the http server is running at localhost:3333')
});
```
+ 响应数据的尾部追加一个头信息
    * `res.addTrailers(headers)`
```javascript
const http = require('http');
let server = http.createServer(function (req, res) {
	if (req.url !== '/favicon.ico') {
		res.writeHead(200, {'Content-Type': 'text/plain', 'Trailer': 'Content-MD5'});
		res.addTrailers({'Content-MD5': '5Q8W9XS5AS98ZX2X5V8V3ZX3ZA8'});
		res.write('hello, these are some new massage');
	}
	res.end();
}).listen(3333, 'localhost', function () {
	console.log('the http server is running at localhost:3333')
});
```


## 2. 创建`HTTP`服务器
```javascript
const http = require('http');
const fs = require('fs');
const PORT = 2596;
let server = http.createServer((req, res) => {
	if (req.url !== '/favicon.ico') {
		let out = fs.createWriteStream('./requestCurl.log');
		out.write('客户端请求的方法为:' + req.method + '\r\n');
		out.write('客户端请求的url字符串为:' + req.url + '\r\n');
		out.write('客户端请求头对象为:' + JSON.stringify(req.headers) + '\r\n');
		out.write('客户端请求所用的HTTP版本为:' + req.httpVersion + '\r\n');
		req.on('data', function (data) {
			console.log('服务器端接收到数据:' + data);
		});
		req.on('end', () => {
			console.log('客户端请求数据已全部接收完毕');
		})
	}
	res.end();
}).listen(PORT, 'localhost');

server.on('listening', () => {
	console.log(`server start listen localhost:${PORT}`);
});

server.on('connection', (socket) => {
	console.log('client and server had been connected');
});

setTimeout(10 * 1000, (socket) => {
	console.log('server response timeout');
});

server.on('error', (err) => {
	if (e.code === 'EADDRINUSE') {
		console.log('the port has been used,please change your server port');
	}
	server.on('close', () => {
		console.log('server closed');
	});
});
/***
 * 客户端请求的方法为:GET
 * 客户端请求的url字符串为:/
 * 客户端请求头对象为:{"user-agent":"curl/7.29.0","host":"localhost:2596","accept":"*|*"}
 * 客户端请求所用的HTTP版本为:1.1
 * */
```

## 3. 创建`HTTP`客户端
+ 当客户端请求获取到服务器响应流时，触发`res.on('data', (chunk) => {})`事件
```javascript
const http = require('http');
let options = {
    hostname: 'www.qq.com',
    port: 80,
    path: '/',
    method: 'GET'
};
let req = http.request(options, (res) => {
    console.log(`状态码：${res.statusCode}`);
    console.log(`响应头：${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`响应内容：`);
    })
});
req.on('response', (res) => {
    console.log(res); // IncomingMessage
});
req.on('error', (err) => {
    if (err.code === 'ECONNRESET') {
        console.log('socket端口超时');
    } else {
        console.log('在请求数据过程中发生错误，错误代码为：' + err.code)
    }
});

req.end();
/**
* 状态码：200
* 响应头：{
*     "server": "squid/3.5.24",
*     "date": "Sun, 25 Feb 2018 14:09:11 GMT",
*     "content-type": "text/html; charset=GB2312",
*     "transfer-encoding": "chunked",
*     "connection": "close",
*     "vary": "Accept-Encoding, Accept-Encoding, Accept-Encoding, Accept-Encoding",
*     "expires": "Sun, 25 Feb 2018 14:10:11 GMT",
*     "cache-control": "max-age=60",
*     "x-cache": "HIT from shenzhen.qq.com"
* }
* 
* **/
```