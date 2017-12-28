// 使用文件流
var fs = require('fs');
// 使用ReadStream对象读取文件
// fs.createReadStream(path, [options])
// options = {
// 		flags: 'r',//default,
//		encoding: 'utf8',//base64, ascii, null(default),
//		autoClose: true(default), //false
//		start: '',//使用整数值来指定文件的开始读取位置		
//		end: ''//使用整数值来指定文件的结束读取位置
//}

var file = fs.createReadStream('./file01.txt', {start:2, end: 12, encoding:'utf8'})
file.on('open', function(fd){
	console.log('file.on open start read file~');
})

file.pause();//pause reading the file

file.on('data', function(data){
	console.log('file.on data read content');
	console.log(data);
})

setTimeout(function(){
	file.resume();
	console.log('continue reading the file');
},1000)

file.on('end', function(){
	console.log('file.on end read stop');
})

file.on('close', function(){
	console.log('file.on close the file');
})

file.on('error', function(err){
	console.log('read file with err', err)
})

// 使用WriteStream对象写入文件
// fs,createWriteStream(path, [options])
var file = fs.createReadStream('./file02.txt', {tart:2, end: 12, encoding:'utf8'})
var out = fs.createWriteStream('./file03.txt');
file.on('data', function(data){
	out.write(data, function(){
		console.log('data.toString()');
		console.log(data.toString());
	});
});

out.on('open', function(fd){
	console.log('the file has been opened');
})

file.on('end', function(){
	out.end('byebye', function(){
		console.log('the file has been written finished');
		console.log(`${out.bytesWritten}`)
	})
})


//观察writeStream对象的write方法的返回结果并监听drain事件

var out = fs.createWriteStream('./file01.txt');
for(var i=1;i<=100;i++){
	var flag = out.write(i.toString());
	console.log(flag);
}

out.on('drain', function(){
	console.log('操作系统缓存区中的数据已经被全部输出');
})

var out = fs.createWriteStream('./file02.txt');
for(var i =0;i<=10;i++){
	var flag = out.write(i.toString());
	console.log(flag);
}

out.on('drain', function(){
	console.log('操作系统缓存区中的数据已经被全部输出');
})

//使用ReadStream对象读取一个尺寸较大的MP3文件，并使用writeStream对象的write方法读取到的数据写到另外一个mp3,中,同时观察write方法的返回结果并监听writeStream对象的drain事件

//观察drain事件的触发时机

var readStream = fs.createReadStream('./music/music.mp3');
var out = fs.createWriteStream('./music/music2.mp3');
readStream.on('data', function(data){
	var flag = out.write(data);
	console.log(flag)
})

out.on('drain', function(){
	console.log('操作系统缓存区中的数据已经被全部输出')
})

out.on('error', function(er){
	console.log('err')
})

var out = fs.createWriteStream('./file02.txt');
out.on('error', function(err){
	console.log('文件写入操作发生错误');
})

out.write('写入一些测试数据');
out.end();
out.write('写入一些新的数据');// err


// 使用ReadStream对象的pipe方法执行文件的复制操作
// readStream.pipe(destination, [options])
// destination 为一个可用于写入流数据的对象，在写文件时为需要被写入文化的完整路径及文件名
// options {end: true} 当数据被全部读取完毕时，立即将操作系统缓存区中的剩余数据全部写入文件中并关闭文件，如果为false，那么就不关闭文件
// 复制file，粘贴为out
var file = fs.createReadStream('./file02.txt');
var out = fs.createWriteStream('./file04.txt');
file.pipe(out);

// 将end属性设置为false，以在目标文件中追加数据
// pipe完毕之后，将byebye也添加到out中
var file = fs.createReadStream('./file02.txt');
var out = fs.createWriteStream('./file04.txt');
file.pipe(out, {end: false});
file.on('end', function(){
	out.end('byebye')
})

// 取消文件的pipe操作
// readStream.unpipe([destination])
// 实际上是pipe了，如果out文件太大，则会在10毫秒之后取消pipe
var file = fs.createReadStream('./file02.txt');
var out = fs.createWriteStream('./file04.txt');
file.pipe(out, {end: false});
setTimeout(function(){
	file.unpipe(out);
	out.end();
}, 10)
