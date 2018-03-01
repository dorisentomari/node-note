## 1. `DNS`
在Node.js中，提供`DNS`模块，以实现域名查找及域名解析的处理。
+ 在`DNS`模块中，提供了三个主方法及一系列便捷方法。
+ `resolve`方法:用于将一个域名解析为一组`DNS`记录。
+ `reverse`方法: 用于将`IP`地址转换为一组域名。
+ `lookup`方法: 用于将一个域名转换成`IP`地址。
+ `DNS`模块中的其余便捷方法均为`resolve`方法的一种便捷形式。

## 2. 使用`resolve`方法将域名解析为`DNS`记录
``DNS`.resolve(domain, [rrtype], callback(err, address){...})`
+ `domain`参数为一个字符串，用于指定需要被解析的域名，可以包括子域名。
+ `rrtypr`参数为一个字符串，用于指定需要获取的记录类型，可指定的记录类型如下。
    * `A`,该参数值为默认值，当记录类型为`A`时，该记录将一个`IPv4`地址映射为一个域名。
    * `AAAA`,当记录类型为`AAAA`时，该记录将一个`IPv6`地址映射为一个域名。
    * `CNAME`,当记录类型为`CNAME`时，表示该记录为一个域名的别名记录，例如，一个`www.example.com`域名记录也许为一个`example.com`域名记录额别名记录。
    * `MX`,`MX`记录指向一个使用SMTP的域中的邮件服务器，例如，当你想`person@domain.com`邮件地址发送电子邮件时，`domain.com`域的`MX`记录中保存了发送该邮件时的邮件服务器地址。
    * `TXT`,`TXT`记录是为该域名附加的描述记录。
    * `SRV`,`SRV`记录用于为一个特定域中所有可用服务提供信息。
    * `PTR`,`PTR`记录用于反向地址解析，该记录将一个域名映射为一个`IPv4`地址。
    * `NS`,`NS(Name Server)`记录是域名服务器记录，用来指定该域名由哪个`DNS`服务器进行解析。
+ 回调函数有两个参数，`err`是域名解析失败时触发的错误对象，`addresses`参数为一个数组，其中存放了所有获取到的`DNS`记录。

## 3. 为`resolve`方法定制的各种便捷方法
+ `DNS.resolve4(domain, callback)`,获取`IPv4`地址
+ `DNS.resolve6(domain, callback)`，获取`IPv6`地址
+ `DNS.resolveMx(domain, callback)`，获取`MX`记录，邮件交换服务器记录
+ `DNS.resolveTxt(domain, callback)`，获取`TXT`记录，域名附加的描述记录
+ `DNS.resolveSrv(domain, callback)`，获取`SRV`记录，服务记录
+ `DNS.resolveNs(domain, callback)`，获取`NS`记录，域名服务器记录
+ `DNS.resolveCname(domain, callback)`，获取别名记录

## 4. 使用`lookup`方法查询`IP`地址
当使用`resolve4`方法或者`resolve6`方法时，由于`callback`参数值回调函数中的`addresses`参数值数组中存放着所有获取到的`IPv4`地址或`IPv6`地址。因此`DNS`模块中提供了一个获取第一个被发现的`IPv4`地址或者`IPv6`地址的`lookup`方法
``DNS`.lookup(domain, [family], callback(err, addresses, family){...})`
+ `domain`参数为一个字符串，用于指定需要解析的域名
+ `family`参数值为一个整数值，用于指定需要获取的`IP`地址类型，可指定的参数值为`4`或`6`，默认参数值为`null`,表示既可以获取`IPv4`，又可以获取`IPv6`
+ 回调函数`err`参数值为获取地址失败时触发的错误对象，当域名不存在或查询失败时该错误对象的`code`属性值为`ENOENT`
+ `addresses`参数值为一个字符串，为获取到的`IP`地址
+ `family`参数值为`4`时，表示为一个`IPv4`地址，为`6`时，表示为一个`IPv6`地址。

## 5. 使用`reverse`方法反向解析`IP`地址
在`DNS`模块中，使用`reverse`方法将一个`IP`地址反向解析为一组与该`IP`地址绑定的域名
``DNS`.reverse(ip, callback(err, domains){...})`
+ `ip`参数值为一个字符串，用于指定需要解析的IP地址
+ 回调函数的`err`为反向解析地址失败后的错误对象
+ `domains`参数值为一个数组，存放了所有获取到的域名

## 6. `DNS`模块中的各种错误代码
err参数值为执行各种解析或反向解析操作时触发的错误对象，可根据该错误对象的`code`属性值，即触发的错误代号判断出发了什么错误
+ `ENODATA`:`DNS`服务器返回一个没有数据的查询结果
+ `EFORMERR`:`DNS`服务器发现客户端请求查询时使用了格式错误的查询参数
+ `ESERVFAIL`:`DNS`服务器执行查询操作失败
+ `ENOTFOUND`:未发现任何域名
+ `ENOTIMP`:`DNS`服务器不能进行客户端所请求的查询操作
+ `EREFUSED`:`DNS`服务器拒绝进行查询操作
+ `EBADQUERY`:格式错误的`DNS`查询
+ `EBADNAME`:域名格式错误
+ `EBADFAMILY`:不支持的`IP`地址类型
+ `EBADRESP`:`DNS`答复的格式错误
+ `ECONNREFUSED`:不能建立与`DNS`服务器之间的连接
+ `ETIMEOUT`:与`DNS`服务器之间建立连接超时
+ `EEOF`:已到达文件底部
+ `EFILE`:读取文件失败
+ `ENOMEM`:没有足够的内存空间
+ `EDESTRUCTION`:通道已经被销毁
+ `EBADSTR`:字符串格式错误
+ `EBADFLAGS`:指定了错误的判断标志
+ `ENONAME`:指定的主机名不是数值格式的
+ `EBADHINTS`:指定的提示标志无效
+ `ENOTINITIALIZED`:`c-ares`类库初始化工作尚未完成
+ `ELOADIPHLPAPI`:加载`iphlpapi.dll`时触发了一个错误
+ `EADDREGETNETWORKPARAMS`:未发现`GetNetworkParams`函数
+ `ECANCELLED`:`DNS`查询操作被取消

## 7. `DNS`模块的基本使用
```javascript
const dns = require('dns');
let url = 'www.qq.com';

dns.resolve(url, 'A', (err, addresses) => {
	console.log(addresses);
	// IPv4地址 [ '103.7.30.123' ]
});

dns.resolve(url, 'AAAA', (err, addresses) => {
	console.log(addresses);
	// IPv6地址 [ '240e:e1:8100:28::2:16' ]
});
dns.resolveMx('qq.com', (err, addresses) => {
	console.log(addresses);
	// 邮件交换服务器记录
	// [ { exchange: 'mx2.qq.com', priority: 20 },
	//   { exchange: 'mx1.qq.com', priority: 30 },
	//   { exchange: 'mx3.qq.com', priority: 10 } ]
	
});

dns.resolveTxt('qq.com', (err, addresses) => {
	console.log(addresses);
	// 域名附加的描述记录
	// [ [ 'v=spf1 include:spf.mail.qq.com -all' ] ]
});

dns.resolveSrv('www.baidu.com', (err, addresses) => {
	console.log(addresses);
	// 服务记录
	// []
});

dns.resolveNs('www.github.com', (err, addresses) => {
	console.log(addresses);
	// 域名服务器记录
	// [ 'ns-421.awsdns-52.com',
	//  'ns-520.awsdns-01.net',
	//  'ns1.p16.dynect.net',
	//  'ns2.p16.dynect.net',
	//  'ns3.p16.dynect.net',
	//  'ns4.p16.dynect.net',
	//  'ns-1283.awsdns-32.org',
	//  'ns-1707.awsdns-21.co.uk' ]
});

dns.resolveCname('www.163.com', (err, addresses) => {
	console.log(addresses);
	// 获取别名记录
	// [ 'www.163.com.lxdns.com' ]
});


dns.lookup('google.com', 4, (err, address, family) => {
	// 查询IP地址
	// address，查询到的地址
	// family，IPv4或IPv6
	console.log(address);// 172.217.27.142
	console.log(family);// 4
});

dns.lookup('google.com', 6, (err, address, family) => {
	console.log(address);// 2404:6800:4008:803::200e
	console.log(family);// 6
});

dns.reverse('203.188.200.67', (err, domain) => {
	// 反向解析IP地址
	console.log(domain);
	// [ 'media-router-fp1.prod.media.vip.tp2.yahoo.com' ]
});
```