const dns = require('dns');
let url = 'www.qq.com';

dns.resolve(url, 'A', (err, addresses) => {
	console.log(addresses);// IPv4地址 [ '103.7.30.123' ]
});

dns.resolve(url, 'AAAA', (err, addresses) => {
	console.log(addresses);// IPv6地址 [ '240e:e1:8100:28::2:16' ]
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



