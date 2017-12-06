// 发送服务器端响应流
// response.writeHead(statusCode, [reasonPhrase], [headers])
/*
statusCode参数用于指定一个三位的HTTP状态码
reasonPhrase参数值为一个字符串，用于指定对该状态码的描述信息
headers为一个对象，用于指定服务器端创建的响应头对象
content-type:用于指定内容类型
location:用于将客户端重定向到另一个url地址
content-disposition:用于指定一个被下载的文件名
content-length:用于指定服务器端响应内容的编码格式
set-cookie:用于在客户端创建一个cookie
content-encoding:用于指定服务器端响应内容的编码方式
Cache-Control:用于开启缓存机制
Expires:用于指定缓存过期时间
Etag:用于指定当服务器端响应内容没有变化时不重新下载数据
*/

// 如果不使用http.ServerResponse对象的writeHead方法指定响应头对象，也可以使用http.ServerResponse对象的setHeader方法单独设置响应头信息。
// response.setHeader(name, value)
// res.setHeader('Content-Type', 'text/type');

// 获取响应头某个字段的值
// response.getHeader(name)
// res.getHeader('Content-Type');

// 删除一个响应字段
// response.removeHeader(name);
// res.removeHeader('Content-Type');

// 检测响应头是否已经发送
// response.headersSent();
// 已发出，为true
// 未发送，为false

// 默认情况下HTTP服务器会自动将服务器端当前时间作为响应头中的Date字段值发送给客户端，可以通过将res.sendDate属性值设置为false的方法，在响应头中删除Date字段
// res.sendDate = false;

/*
var http = require('http');
var server = http.createServer(function(req, res){
    if(req.url !== '/favicon.ico'){
        res.write('<html><head><meta charset="utf-8"/></head></html>');
        if(res.headersSent){
            console.log('第一个响应头已经发送');
        }else{
            console.log('第一个响应头未发送');
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        if(res.headersSent){
            console.log('第二个响应头已经发送');
        }else{
            console.log('第二个响应头未发送');
        }
        res.write('hello, this is http server response content');
    }
    res.end();
}).listen(3333, 'localhost', function(){
    console.log('the http server is running at localhost:3333')
});
*/
// 响应头不再发送date字段
/*
var http = require('http');
var server = http.createServer(function(req, res){
    if(req.url !== '/favicon.ico'){
		res.statusCode = 404;
		res.sendDate = false;
		res.setHeader('Content-Type', 'text/html');
        res.write('hello, this is http server response content');
    }
    res.end();
}).listen(3333, 'localhost', function(){
    console.log('the http server is running at localhost:3333')
});
*/
// 使用res.addTrailers(headers)方法在响应数据的尾部追加一个头信息
/*
var http = require('http');
var server = http.createServer(function(req, res){
    if(req.url !== '/favicon.ico'){
		res.statusCode = 200;
		res.sendDate = true;
		res.setHeader('Content-Type', 'text/html');
        res.write('hello, this is http server response content\n');
		res.addTrailers({'Content-MD5': '5Q8W9XS5AS98ZX2X5V8V3ZX3ZA8'});
        res.write('hello, these are some new massage');
    }
    res.end();
}).listen(3333, 'localhost', function(){
    console.log('the http server is running at localhost:3333')
});
*/
// 读取文件
/*
var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res){
    if(req.url !== '/favicon.ico'){
		fs.readFile('./file01.txt', function(err, data){
			if(err){
				console.log('读取文件出错');
			}else{
				var flags = res.write(data);
				console.log(flags);
				res.end();
			}
		})
    }
}).listen(3333, 'localhost', function(){
    console.log('the http server is running at localhost:3333')
});
*/
// setTimeout方法的使用
var http = require('http');
var server = http.createServer(function(req, res){
    if(req.url !== '/favicon.ico'){
		res.setTimeout(1000);
		res.on('timeout', function(){
			console.log('响应超时');
		});
		setTimeout(function(){
			res.setHeader('Content-Type', 'text/html');
			res.write('<html><head><meta charset="utf-8"/></head></html>');
			res.write('hello, this is some new message;');
			res.end();
		})
    }
}).listen(3333, 'localhost', function(){
    console.log('the http server is running at localhost:3333')
});