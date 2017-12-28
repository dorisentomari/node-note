var dns = require('dns');
var url = 'www.qq.com';
/*
dns.resolve(url, 'A', function(err, addresses){
    console.log(addresses);// [ '103.7.30.123' ]
})

dns.resolve(url, 'AAAA', function(err, addresses){
    console.log(addresses);// [ '240e:e1:8100:28::2:16' ]
})
dns.resolveMx('qq.com', function(err, addresses){
    console.log(addresses);
    
    // [ { exchange: 'mx2.qq.com', priority: 20 },
    //   { exchange: 'mx1.qq.com', priority: 30 },
    //   { exchange: 'mx3.qq.com', priority: 10 } ]
  
});

dns.resolveTxt('qq.com', function(err, addresses){
    console.log('resolveTxt');
    console.log(addresses);
    // [ [ 'v=spf1 include:spf.mail.qq.com -all' ] ]
});

dns.resolveSrv('www.baidu.com', function(err, addresses){
    console.log('resolveSrv');
    console.log(addresses);
    // []
});

dns.resolveNs('www.github.com', function(err, addresses){
    console.log('resolveNs');
    console.log(addresses);
    // [ 'ns-421.awsdns-52.com',
    //  'ns-520.awsdns-01.net',
    //  'ns1.p16.dynect.net',
    //  'ns2.p16.dynect.net',
    //  'ns3.p16.dynect.net',
    //  'ns4.p16.dynect.net',
    //  'ns-1283.awsdns-32.org',
    //  'ns-1707.awsdns-21.co.uk' ]
});

dns.resolveCname('www.163.com', function(err, addresses){
    console.log(addresses);
    // [ 'www.163.com.lxdns.com' ]
});


var dns = require('dns');
dns.lookup('google.com', 4, function(err, address, family){
    console.log(address);// 172.217.27.142
    console.log(family);// 4
})

dns.lookup('google.com', 6, function(err, address, family){
    console.log(address);// 2404:6800:4008:803::200e
    console.log(family);// 6
})
*/

var dns = require('dns');
dns.reverse('203.188.200.67', function(err, domain){
    console.log(domain);// [ 'media-router-fp1.prod.media.vip.tp2.yahoo.com' ]
})



