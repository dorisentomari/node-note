/*
## 使用os模块获取操作系统信息
+ os.tmpdir(),获取操作系统中默认的用于存放临时文件的目录
+ os.endianness(),获取CPU的字节序，返回的值可能是BE及LE
+ os.hostname(),获取计算机名
+ os.type(),获取操作系统类型
+ os.platform(),获取操作系统平台
+ os.arch(),获取CPU架构
+ os.release(),获取操作系统版本号
+ os.uptime(),获取系统当前的运行时间，单位为秒
+ os.loadavg(),返回一个数组，其中存放了1分钟，5分钟，15分钟的系统平均负载
+ os.totalmem(),返回系统的总内存量，单位为字节
+ os.freemem(),返回系统的空闲内存量
+ os.cpus(),返回一个数组，存放了CPU内核的各种信息，包括CPU规格，运行速度(单位是MHz)及运行时间信息
+ os.networkInterfaces(),返回一个数组，存放了系统中所有网络接口
+ os.EOL,定义一个EOL常量，常量值为操作系统中使用的换行符`\r\n`
*/
var os = require('os');
console.log(os.tmpdir());
console.log(os.endianness());
console.log(os.hostname());
console.log(os.type());
console.log(os.platform());
console.log(os.arch());
console.log(os.release());
console.log(os.uptime());
console.log(os.loadavg());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.cpus());
console.log(os.networkInterfaces());
console.log(os.EOL);