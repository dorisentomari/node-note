/** 进程对象的方法与事件 */
var process = require('process');
var fs = require('fs');

// memoryUsage() 用于获取运行Node.js应用程序的进程的内存使用量
// 该方法不使用任何参数，返回一个对象，对象所拥有的属性如下
/*
rss: 属性值为一个整数，表示运行Node.js应用程序的进程的内存消耗量，单位为字节
headTotal: 属性值为一个整数，表示为V8所分配的内存量，单位为字节
headUsed: 属性值为一个整数，表示V8的内存消耗量，单位为字节
*/
console.log(process.memoryUsage());

// process.abort()方法 
// process.abort方法用于向运行Node.js应用程序的进程发出SIGABRT信号，使进程异常终止，同时产生一个核心文件，该方法中不使用任何参数

// process.chdir(directory) 用于修改Node.js应用程序中使用的当前工作目录
// 该方法使用一个参数，参数值为一个字符串，用于指定当前工作目录，该目录可以为一个相对路径，也可以为一个绝对路径，如果指定路径不存在，则抛出异常。

// process.cwd() 用于返回当前目录，不需要任何参数
/*
console.log('当前目录：' + process.cwd());
process.chdir('../');
console.log('上层目录：' + process.cwd());
*/
/*
当前目录：/root/Desktop/files/node/04node_files
上层目录：/root/Desktop/files/node
*/

// process.exit([code])用于退出Node.js应用程序的进程
// exit方法中使用一个整数值参数,该参数用于指定为操作系统提供退出代码,该代码为0时表示正常退出，默认参数为0

// process.getgid() 返回运行Node.js应用程序的进程的组ID，该方法只有在非windows操作系统下有效，不使用任何参数

// process.setgid(id) 用于设置运行Node.js应用程序的进程的组ID，该方法只有在非windows操作系统下有效，不使用任何参数
// setgid方法中使用一个参数，参数值可以为一个整数类型的组ID，也可以为一个字符串类型的组名，如果指定组名，该组名将自动解析为组ID

// process.getuid() 返回运行Node.js应用程序的进程的用户ID，该方法只有在非windows操作系统下有效，不使用任何参数

// process.setuid(id) 用于设置运行Node.js应用程序的进程的用户ID，该方法只有在非windows操作系统下有效

// process.kill(pid, [signal]) 用于向进程发送信号
// pid参数为必须指定参数，signal参数为可选参数，pid参数为一个整数，用于指定需要接收信号的进程ID，signal参数值为一个字符串，用于指定需要发送的信号，例如SIGINT或SIGUSR1,当不使用该参数时，默认参数值为SIGTERM，表示终止该进程 

// umask() 用于读取或修改运行Node.js应用程序的进程的文件权限掩码。子进程将继承父进程的文件权限掩码
// process.umask([mask])
// 使用一个可选参数，该参数值用于设定修改后的文件权限掩码，例如0644
// 如果不使用该参数，umask方法返回进程当前使用的文件权限掩码，如果使用该参数，umask方法返回修改前的文件权限掩码
/*
var oldMask, newMask = 0644;
oldMask = process.umask(newMask);
console.log('修改前的掩码：', oldMask.toString(8))
console.log('修改后的掩码：', newMask.toString(8))
*/
/*
修改前的掩码： 22
修改后的掩码： 644
*/

// process.uptime() 返回Node.js应用程序的当前运行时间，单位为秒，该方法不使用任何参数

// process.hrtime() 测试一个代码段的运行时间，时间精确度可以精确到毫秒
// 该方法返回一个数组，数组中有两个时间，第一个单位为秒，第二个单位是纳秒
var time = process.hrtime();
var data = fs.readFileSync('./file01.txt');
var diff = process.hrtime(time);
console.log('读取文件操作耗费%d纳秒', diff[0]*1e9 + diff[1]);
// 读取文件操作耗费106736纳秒


/** Node.js中的进程对象可能触发的事件 */
// exit()事件
// 当运行Node.js应用程序的进程退出时触发进程对象的exit事件。可以通过指定事件回调函数来指定进程退出时所需要执行的处理，在该回调函数中不使用任何参数
process.on('exit', function(){
    console.log('Node.js进程被退出');
})
process.exit();


// uncaughtException事件
// 当Node.js应用程序中抛出一个未被捕获的异常时触发进程对象的uncaughtException事件
// 可以通过对该事件指定回调函数的方法来指定对所有异常的默认处理，以比秒应用程序的异常退出，在该回调函数中使用一个参数，参数值为抛出的异常对象
// 未来可能会被删除，不建议使用，建议使用domain模块的异常处理机制
process.on('uncaughtException', function(err){
    console.log('捕获到一个未被处理的错误：'+ err);
})

// 各种信号事件
// 当运行Node.js应用程序的进程接收到各种事件时，会触发各种信号事件。
// 当其接收到一个SIGINT信号时，会触发一个SIGINT事件。
// 可以通过对这些事件进行监听并指定事件回调函数的方法来指定当接收到该信号时所需要执行的处理，在该事件回调函数中，不使用任何参数。

process.stdin.resume();
process.on('SIGINT', function(){
    console.log('接收到SIGIT信号')
})
