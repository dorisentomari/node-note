var fs = require('fs');

var mkdir = './mkdirOne'
//创建目录
fs.mkdir(mkdir, function (err) {
	if (err) {//如果有该目录,就创建失败
		console.log(`mkdir ${mkdir} file failed`);
	} else {
		console.log(`mkdir ${mkdir} file success`)
	}
})

fs.mkdir(mkdir + '/one', function (err) {
	if (err) {//如果有该目录,就创建失败
		console.log(`mkdir ${mkdir} /one file failed`);
	} else {
		console.log(`mkdir ${mkdir} /one file success`)
	}
})

fs.mkdir(mkdir + '/two', function (err) {
	if (err) {//如果有该目录,就创建失败
		console.log(`mkdir ${mkdir} /two file failed`);
	} else {
		console.log(`mkdir ${mkdir} /two file success`)
	}
})

var writeData = 'The engaged couple will appear\r\n for a photo outside Kensington Palace \r\non Monday afternoon, and will take part in a broadcast interview in the evening.'
fs.writeFile(mkdir + '/one' + '/one.txt', writeData, 'utf-8', function (err) {
	if (err) {
		console.log(`writeFile ${mkdir}/one/one.txt file failed`);
	} else {
		console.log(`writeFile ${mkdir}/one/one.txt file success`);
	}
})
//fs.mkdirSync(path, [mode])同步创建文件夹,方法一样

fs.readdir(mkdir, function (err, files) {
	if (err) {
		console.log(`readdir ${mkdir} file failed`);
	} else {
		console.log(`readdir ${mkdir} file success`);
		console.log(files);
	}
});

//fs.readdirSync()

//查看与修改文件或目录信息
//在fs模块中,可以使用stat方法或者lstat方法查看一个文件或一个目录。唯一区别在于当查看符号链接文件的信息时,必须使用lstat方法。
//fs.stat(path, callback(err, stats))
//fs.lstat(path, callback(err, stats))
//查看文件信息
fs.stat('./one', function (err, stats) {
	if (err) {
		console.log('fs.stat("./one") file failed');
	} else {
		console.log(stats);
		console.log('fs.stat("./one") file success');
	}
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

//检查文件或目录是否存在
fs.exists(mkdir, function (exists) {
	if (exists) {
		console.log(exists)
		console.log(`${mkdir} file exists`)
	} else {
		console.log(`${mkdir} file is not exists`)
	}
});

// 获取文件或目录的绝对路径
// resolvedPath  代表的是获取的文件或目录的绝对路径
// fs.realpath(path, [cache], callback(err, resolvedPath))

fs.realpath(mkdir, function (err, resolvedPath) {
	if (err) {
		console.log(`${mkdir} file or dir is not exists`)
	} else {
		console.log(`${mkdir} realpath is ${resolvedPath}`)
	}
})

//修改文件访问时间及修改时间
// fs.utimes(path, atime, mtime, callback(err))
// 修改文件访问时间及修改时间都为当前时间
fs.utimes(mkdir, new Date(), new Date(), function (err) {
	if (err) {
		console.log(`utimes ${mkdir} file failed`);
	} else {
		console.log(`utimes ${mkdir} file success`);
	}
})

fs.stat(mkdir, function (err, stats) {
	console.log(stats)
})

// fs.utimesSync(path, atime, mtime)

//使用open方法或者openSync方法打开文件并返回文件描述符后，可以使用fs模块中的futimes方法修改文件的访问时间或者修改时间

fs.open('./file02.txt', 'r', function (err, fd) {
	fs.futimes(fd, new Date(), new Date(), function (err) {
		if (err) {
			console.log(`futimes file02.txt file failed`);
		} else {
			console.log(`futimes file02.txt file success`);
		}
	})
})

fs.stat('./file02.txt', function (err, stats) {
	console.log(stats)
})


// 修改文件或目录的读写权限

// fs.chmod(path, mode, callback(err))
// mode代表的是权限的大小
// fs.chmod方法触发前的权限是`drwxr-xr-x.`
// fs.chmod方法触发后的权限是`drw-------.`
fs.chmod(mkdir, '0600', function (err) {
	if (err) {
		console.log(`fs.chmod ${mkdir} file failed`);
	} else {
		console.log(`fs.chmod ${mkdir} file success`);
	}
})

// fs.chmodSync(path, mode);

// 在使用open方法或openSync方法打开文件并返回文件描述符之后，可以使用fs模块中的fchmod方法修改文件的读写权限

// fs.fchmod方法触发前的权限是`-rw-r--r--.`
// fs.fchmod方法触发后的权限是`-rw-------.`
fs.open('./file02.txt', 'r', function (err, fd) {
	if (err) {
		console.log(`./file02.txt file open failed`);
	} else {
		fs.fchmod(fd, 0600, function (err) {
			if (err) {
				console.log(`fs.fchmod ./file02.txt file failed`);
			} else {
				console.log(`fs.fchmod ./file02.txt file success`);
			}
		})
	}
})


