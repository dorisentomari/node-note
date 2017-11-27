var fs = require('fs');
/*
//读取文件同步
var dataSync = fs.readFileSync('./file01.txt', 'utf-8');
console.log('dataSync');
console.log(dataSync);

//读取文件异步
fs.readFile('./file01.txt', 'utf-8', function(err, data){
	console.log('dataAsync');
	console.log(data);
})
//一般来讲，读取文件使用异步的方法，但是在读取例如系统配置文件时，应该使用同步的方法

//写入文件内容
//这个方法会自动创建一个文件
var writeData = 'The engaged couple will appear\r\n for a photo outside Kensington Palace \r\non Monday afternoon, and will take part in a broadcast interview in the evening.'
fs.writeFile('./file03write.txt', writeData, 'utf-8', function(err){
	if(err){
		console.log('there are some wrong happened~');
	}else{
		console.log('Writed successfullly~~')
	}
})

//使用writeFile方法复制图片文件
fs.readFile('./fileImage.jpg', 'base64', function(err, data){
	if(err){
		console.log('读取图片失败，请检查错误');
	}else{
		fs.writeFile('./fileImageCopy.jpg', data.toString(), 'base64', function(err){
			if(err){
				console.log('复制图片文件失败');
			}else{
				console.log('复制图片文件成功');
			}
		})
	}
})

//追加数据
var appendFileContent = 'this is appendFileContent box';
fs.appendFile('./file01.txt', appendFileContent, 'utf-8', function(err){
	if(err){
		console.log('追加文件操作失败');
	}else{
		fs.readFile('./file01.txt', 'utf-8', function(err, data){
			if(err){
				console.log('读取失败');
			}else{
				console.log('追加文件操作成功');
				console.log(data);
			}
		})
		
	}
})

// 从指定的位置开始读写文件
//fd代表打开文件时返回的文件描述符，在windows操作系统中，文件描述符也称为文件句柄
console.log('=====seperate line=====')
//异步打开文件
fs.open('./file02.txt', 'r', function(err, fd){
	console.log('open');
	console.log(fd);
})

//同步打开文件
fs.openSync('./file02.txt', 'r', function(err, fd){
	console.log('openSync');
	console.log(fd);
})

// read 同步读取
fs.read(fd, buffer, offset, length, position, callback)
fs.open('./file02.txt', 'r', function(err, fd){
	var buf = new Buffer(255).fill(0);//缓存区
	fs.read(fd, buf, 0, 9, 3, function(err, bytesRead, buffer){
		console.log(buffer.slice(0, bytesRead).toString());//喜欢编
	})
})

fs.open('./file02.txt', 'r', function(err, fd){
	var buf = new Buffer(255).fill(0);//缓存区
	fs.read(fd, buf, 0, 9, 3, function(err, bytesRead, buffer){
		console.log(buffer.slice(0, bytesRead).toString());//喜欢编
		fs.read(fd, buf, 0, 3, null, function(err, bytesRead, buffer){
			console.log(buffer.slice(0, bytesRead).toString());//我
		})
	})
})

// readSync 异步读取
//fs.readSync(fd, buffer, offset, length, position, callback)
fs.open('./file02.txt', 'r', function(err, fd){
	var buf = new Buffer(255).fill(0);
	var bytesRead = fs.readSync(fd, buf, 0, 9, 3);
	console.log(bytesRead);//9
	console.log(buf.slice(0, bytesRead).toString());//喜欢编
});

// write 同步写入
// fs.write(fd, buffer, offset, length, position, callback)
var buf = new Buffer('我喜欢编程');
fs.open('./file02.txt', 'w', function(err, fd){
	fs.write(fd, buf, 3, 9, 0, function(err, written, buffer){
		if(err){
			console.log('写文件操作失败');
		}else{
			console.log('写文件操作成功');
		}
	})
})
// writeSync 异步写入
// fs.writeSync(fd, buffer, offset, length, position)


// close 关闭文件
var buf = new Buffer('我喜欢编程');
fs.open('./file02.txt', 'wx', function(err, fd){
	fs.write(fd, buf, 0, 15, 0, function(err, written, buffer){
		if(err){
			console.log('写文件操作失败');
		}else{
			console.log('写文件操作成功');
		}
	})
	fs.close(fd);
	//fs.clodeSync(fd);
})

*/
//在使用write方法或者writeSync方法在文件中写入数据时,操作系统的做法是首先将该部分数据读取到内存中,再把数据写到文件中,当数据读取完毕时不代表数据已经写完,因为还有一步部分可能会留在内存缓冲区中.这时候如果调用close或者closeSync方法关闭文件,那么这部分数据就会丢失,这时候就可以采用fs模块中的fsync方法对文件进行同步操作,即将内存缓冲区中的剩余数据全部写入文件. 
var buf = new Buffer('我喜欢编程');
fs.open('./file02.txt', 'w', function(err, fd){
	if(err){
		console.log('文件打开失败')
	}else{
		fs.write(fd, buf, 0, 15, 0, function(err, weitten, buffer){
			if(err){
				console.log('写文件操作失败');
			}else{
				console.log('写文件操作成功');
			}
		})
	}
})




