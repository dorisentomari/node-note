var fs = require('fs');

var mkdir = './mkdirOne'
//读取目录
/*
fs.mkdir(mkdir, function(err){
	if(err){//如果有该目录,就创建失败
		console.log(`mkdir ${mkdir} file failed`);
	}else{
		console.log(`mkdir ${mkdir} file success`)
	}
})

fs.mkdir(mkdir + '/one', function(err){
	if(err){//如果有该目录,就创建失败
		console.log(`mkdir ${mkdir} /one file failed`);
	}else{
		console.log(`mkdir ${mkdir} /one file success`)
	}
})

fs.mkdir(mkdir + '/two', function(err){
	if(err){//如果有该目录,就创建失败
		console.log(`mkdir ${mkdir} /two file failed`);
	}else{
		console.log(`mkdir ${mkdir} /two file success`)
	}
})

var writeData = 'The engaged couple will appear\r\n for a photo outside Kensington Palace \r\non Monday afternoon, and will take part in a broadcast interview in the evening.'
fs.writeFile(mkdir + '/one'+ '/one.txt', writeData, 'utf-8', function(err){
	if(err){
		console.log(`writeFile ${mkdir}/one/one.txt file failed`);
	}else{
		console.log(`writeFile ${mkdir}/one/one.txt file success`);
	}
})
//fs.mkdirSync(path, [mode])同步创建文件夹,方法一样

fs.readdir(mkdir, function(err, files){
	if(err){
		console.log(`readdir ${mkdir} file failed`);
	}else{
		console.log(`readdir ${mkdir} file success`);
		console.log(files);
	}
})
*/
//fs.readdirSync()

//查看与修改文件或目录信息
//在fs模块中,可以使用stat方法或者lstat方法查看一个文件或一个目录。唯一区别在于当查看符号链接文件的信息时,必须使用lstat方法。
//fs.stat(path, callback(err, stats))
//fs.lstat(path, callback(err, stats))

fs.stat('./one', function(err, stats){
	console.log(stats);
})
/*
Stats {
  dev: 2050,文件或目录所在的设备ID,仅在UNIX有效
  mode: 16877,使用数值形式代表的文件或目录的权限标志
  nlink: 3,文件或目录的硬连接数量
  uid: 0,文件或目录的所有者的用户ID,仅在UNIX有效
  gid: 0,文件或目录的所有者的用户组ID,仅在UNIX有效
  rdev: 0,为字符设备文件或块设备文件所在设备ID,仅在UNIX有效
  blksize: 4096,
  ino: 4197533,文件或目录的索引编号,仅在UNIX有效
  size: 4096,文件尺寸,即文件中的字节数
  blocks: 8,
  atimeMs: 1511846425357.986,
  mtimeMs: 1511846425256.986,
  ctimeMs: 1511846425256.986,
  birthtimeMs: 1511846425256.986,
  atime: 2017-11-28T05:20:25.358Z,文件的访问时间
  mtime: 2017-11-28T05:20:25.257Z,文件的修改时间
  ctime: 2017-11-28T05:20:25.257Z,文件的创建时间
  birthtime: 2017-11-28T05:20:25.257Z 
}
*/

// 同步方法查看文件信息
// var stats = fs.statSync(path);
// var stats = fs.lstatSync(path);

//使用open方法或openSync方法打开文件并返回文件描述符时，可以使用fs模块中的fstat方法查询被打开的文件信息
// var stats = fs.fstatSync(fd) 
























