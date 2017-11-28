/** 对文件或目录执行的其他操作 */
var fs = require('fs');
/*
// fs.rename(oldPath, newPath, callback(err))
// 使用rename方法移动文件或目录,当移动后的路径与原路经为同一路径,而移动后的文件名或目录名与原文件名或目录名不同时，则执行文件或目录的重命名操作
// 把one文件夹下的one.js移动到two文件夹下边

var files = fs.rename('./one/one.js', './two/one.js', function(err){
	if(err){
		console.log('fs.rename one/one.js to ./two/ failed');
	}else{
		console.log('fs.rename one/one.js to ./two/ success');
	}
})

// fs.renameSync(oldPath, newPath)

// 创建与删除文件的硬链接
// 创建文件的硬链接
// srcPath参数用于指定需要被创建硬链接的文件的完整路径及文件名
// dstPath参数用于指定被创建硬链接的完整路径及文件名，该硬连接与源文件必须位于同一卷中。
// fs.link(srcPath, dstPath, callback(err))
// failed 
var writeData = 'this is writeData file';
var writeFileName = './link.txt';
fs.writeFile(writeFileName, writeData, function(err){
	if(err){
		console.log('there are some wrong happened~');
	}else{
		fs.link(writeFileName, './link/linkTest.txt', function(err){
			if(err){
				console.log(`fs.link ${writeFileName} file failed`);
			}else{
				console.log(`fs.link ${writeFileName} file success`)
			}
		})
	}
})

// fs.linkSync(srcPath, dstPath)

// 删除文件的硬链接
// fs.unlink(path, callback(err))
// 把上边创建的硬链接删除
fs.unlink(writeFileName, function(err){
	if(err){
		console.log(`fs.unlink ${writeFileName} file failed`)
	}else{
		console.log(`fs.unlink ${writeFileName} file success`)
	}
})

// 创建与查看符号链接
// type--> file, dir(default), junction(only windows)
// fs.symlink(srcPath, dstPath, [type], callback(err))
fs.symlink('./one/one.js', './two/one.js', 'file', function(err){
	if(err){
		console.log('fs.symlink ./one/one.js to ./two/ file failed~');
	}else{
		fs.symlink(__dirname + '/one/one.js', __dirname + '/two/one.js', 'file', function(err){
			if(err){
				console.log(`fs.symlink ${__dirname}/one/one.js ${__dirname}/two/two.js file failed`);
			}else{
				console.log(`fs.symlink ${__dirname}/one/one.js ${__dirname}/two/two.js file success`);
			}
		});
	}
})
*/

// fs.symlinkSync(srcPath, dstPath, [type])

// 使用readlink读取符号链接

fs.symlink('./one/one.js', './two/one.js', 'file', function(err){
	if(err){
		console.log('create fs.symlink file failed');
	}else{
		fs.readlink('./two/one.js', function(err, linkString){
			if(err){
				console.log('fs.readlink file failed');
			}else{
				console.log(linkString); //./one/one.js
			}
		})
	}
})

// path指定符号链接的路径及文件名
// fs.readlinkSync(path)

// 截断文件
// 所谓对文件进行截断操作，是指一种首先清除文件内容，然后修改文件尺寸的操作
// 换句话说就是对文件内容进行修改
// fs.truncate(filename, length, callback(err))

fs.truncate('./one/one.js', 10, function(err){
	if(err){
		console.log('对文件进行截断操作失败');
	}else{
		fs.stat('./one/one.js', function(err, stats){
			if(err){
				console.log('fs.stat ./one/one.js file failed');
			}else{
				console.log('./one/one.js.size:', stats.size, 'bytes');//./one/one.js.size: 10 bytes
			}
		})
	}
})

// fs.truncateSync(filename, length)

