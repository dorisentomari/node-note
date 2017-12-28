var fs = require('fs');
var http = require('http');
var process = require('process');
var domain = require('domain');
/**
try{
	var data = fs.readFileSync('text.txt','utf8');
	console.log(data);
}catch(e){
	console.log('read file error');
}
*/

/*
// 使用try...catch机制尝试捕获异步方法中抛出的错误
try{
	http.createServer(function(req,res){
		if(req.url !== '/favicon.ico'){
			//notexitsfunction(); this is an error
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write('<head><meta charset="utf-8"/></head>')
			res.end('hello\n');
		}
	}).listen(2576, 'localhost')
}catch(e){
	console.log('request client happened error');
	console.log('err.code', err.code);
}
*/
/*
// 使用uncaughtException事件来捕获任何未被处理的错误
// 使用uncaughtException事件来捕获错误后应用程序不会被强制关闭
// 虽然使用uncaughtException事件可以捕获任何未被处理的错误，但这是一种“粗鲁”的处理方法，有可能产生资源泄露，内存泄露等一系列非常恶劣的影响。在本例中，客户端将永远得不到服务器端的响应。
http.createServer(function(req,res){
	if(req.url !== '/favicon.ico'){
		notexitsfunction(); //this is an error
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write('<head><meta charset="utf-8"/></head>')
		res.end('hello\n');
	}
}).listen(2576, 'localhost')

process.on('uncaughtException', function(err){
	console.log('some errors happened');
	console.log(err);
})
*/

/*
//为了解决这一问题，使用domain模块，该模块中提供了一个domain对象，当应用程序在任何时刻抛出错误时可以通知该对象，然后由该对象来统一处理这些错误。

http.createServer(function(req,res){
	var d = domain.create();
	d.once('error', function(err){
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write('<head><meta charset="utf-8"/></head>')
		res.write('服务器端接收客户端请求时发生以下错误:')
		res.end(err.message);
	})
	d.run(function(){
		if(req.url !== '/favicon.ico'){
			notexitsfunction(); //this is an error
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write('<head><meta charset="utf-8"/></head>')
			res.end('hello\n');
		}
	})

}).listen(2576, 'localhost')

//curl localhost:2576
// <head><meta charset="utf-8"/></head>服务器端接收客户端请求时发生以下错误:notexitsfunction is not defined
*/

var d = domain.create();
d.name = 'dl';
d.on('error', function(err){
	console.log('捕获到错误',d.name,err);
})

d.run(function(){
	process.nextTick(function(){
		setTimeout(function(){
			fs.open('text.txt', 'r', function(err, fd){
				if(err){
					throw err;
				}
			})
		}, 1000)
	})
})
/*
捕获到错误 dl { Error: ENOENT: no such file or directory, open 'text.txt'
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'text.txt',
  domain: 
   Domain {
     domain: null,
     _events: { error: [Function] },
     _eventsCount: 1,
     _maxListeners: undefined,
     members: [],
     name: 'dl' },
  domainThrown: true }
*/


