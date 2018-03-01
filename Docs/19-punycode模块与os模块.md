## 1. `punycode`
+ `punycode`模块转换为`punycode`编码

`punycode`模块内部使用`punycode.js`类库,以将域名从地方语言所采用的各种编码转换为可用于`DNS`服务器的`punycode`编码,因为操作系统的核心都是英文,`DNS`服务器的解析也是由英文代码交换,所以`DNS`服务器并不支持直接的使用地方语言的域名解析,所有地方语言域名的解析都需要转成`punycode`编码,然后由`DNS`服务器解析`punycode`编码.
+ `encode(string)`,将一个`Unicode`编码字符串转换为一个`punycode`编码字符串
+ `decode(string)`,将一个`punycode`编码字符串转成一个`Unicode`编码字符串
+ `toASCII(domain)`,用于将一个`Unicode`编码格式的域名转换为一个`punycode`编码格式的域名,该方法只能转换地方语言域名,不转换英文域名
+ `toUnicode(domain)`,用于将一个`punycode`编码格式的域名转换为`Unicode`编码格式的域名,该方法只能转换地方语言域名,不转换英文域名
+ `ucs2.encode(codePoints)`,用于将一个`UCS-2`编码数组转换成一个字符串
+ `ucs2.decode(string)`,用于将一个字符串转换为一个`UCS-2`编码数组
+ `punycode.version`,显示`punycode.js`类库的版本号
```javascript
const punycode = require('punycode');
console.log(punycode.encode('你好'));// 6qq79v
console.log(punycode.decode('6qq79v'));// 你好
console.log(punycode.toASCII('www.你好.com'));// www.xn--6qq79v.com
console.log(punycode.toUnicode('www.xn--6qq79v.com'));// www.你好.com
console.log(punycode.ucs2.encode([97, 98, 99])); // abc
console.log(punycode.ucs2.encode([0x1D306])); // \uD834\uDF06
console.log(punycode.ucs2.decode('abc')); // [ 97, 98, 99 ]
console.log(punycode.ucs2.decode('\uD834\uDF06')); // [ 119558 ]
```

## 2. `os`模块
使用`os`模块获取操作系统信息
+ `os.tmpdir()`,获取操作系统中默认的用于存放临时文件的目录
+ `os.endianness()`,获取`CPU`的字节序，返回的值可能是`BE`及`LE`
+ `os.hostname()`,获取计算机名
+ `os.type()`,获取操作系统类型
+ `os.platform()`,获取操作系统平台
+ `os.arch()`,获取`CPU`架构
+ `os.release()`,获取操作系统版本号
+ `os.uptime()`,获取系统当前的运行时间，单位为秒
+ `os.loadavg()`,返回一个数组，其中存放了`1`分钟，`5`分钟，`15`分钟的系统平均负载
+ `os.totalmem()`,返回系统的总内存量，单位为字节
+ `os.freemem()`,返回系统的空闲内存量
+ `os.cpus()`,返回一个数组，存放了`CPU`内核的各种信息，包括`CPU`规格，运行速度(单位是`MHz`)及运行时间信息
+ `os.networkInterfaces()`,返回一个数组，存放了系统中所有网络接口
+ `os.EOL`,定义一个`EOL`常量，常量值为操作系统中使用的换行符`\r\n`

```javascript
const os = require('os');
console.log(os.tmpdir());           // /tmp
console.log(os.endianness());       // LE
console.log(os.hostname());         // Homer
console.log(os.type());             // Linux
console.log(os.platform());         // linux
console.log(os.arch());             // x64
console.log(os.release());          // 3.10.0-693.17.1.el7.x86_64
console.log(os.uptime());           // 108
console.log(os.loadavg());          // [ 2.48583984375, 1.01318359375, 0.3740234375 ]
console.log(os.totalmem());         // 1910771712
console.log(os.freemem());          // 76935168
console.log(os.cpus());
/**
* [ { model: 'Intel(R) Core(TM) i5-4210U CPU @ 1.70GHz',
*       speed: 2401,
*       times: { user: 194900, nice: 21800, sys: 210000, idle: 477900, irq: 0 } },
*     { model: 'Intel(R) Core(TM) i5-4210U CPU @ 1.70GHz',
*       speed: 2401,
*       times: { user: 157300, nice: 19400, sys: 205400, idle: 543800, irq: 0 } },
*     { model: 'Intel(R) Core(TM) i5-4210U CPU @ 1.70GHz',
*       speed: 2401,
*       times: { user: 149700, nice: 4200, sys: 212600, idle: 548500, irq: 0 } },
*     { model: 'Intel(R) Core(TM) i5-4210U CPU @ 1.70GHz',
*       speed: 2401,
*       times: { user: 156200, nice: 2600, sys: 213100, idle: 501300, irq: 0 } } ]
* **/
console.log(os.networkInterfaces());
/**
* { lo: 
*      [ { address: '127.0.0.1',
*          netmask: '255.0.0.0',
*          family: 'IPv4',
*          mac: '00:00:00:00:00:00',
*          internal: true },
*        { address: '::1',
*          netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
*          family: 'IPv6',
*          mac: '00:00:00:00:00:00',
*          scopeid: 0,
*          internal: true } ],
*     ens33: 
*      [ { address: '192.168.71.147',
*          netmask: '255.255.255.0',
*          family: 'IPv4',
*          mac: '00:0c:29:e3:04:c1',
*          internal: false },
*        { address: 'fe80::20c:29ff:fee3:4c1',
*          netmask: 'ffff:ffff:ffff:ffff::',
*          family: 'IPv6',
*          mac: '00:0c:29:e3:04:c1',
*          scopeid: 2,
*          internal: false } ] }
***/
console.log(os.EOL);                // \r\n
```