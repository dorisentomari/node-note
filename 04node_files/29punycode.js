var punycode = require('punycode');
/*
## punycode模块转换为punycode编码

punycode模块内部使用punycode.js类库,以将域名从地方语言所采用的各种编码转换为可用于DNS服务器的punycode编码,因为操作系统的核心都是英文,DNS服务器的解析也是由英文代码交换,所以DNS服务器并不支持直接的使用地方语言的域名解析,所有地方语言域名的解析都需要转成punycode编码,然后由DNS服务器解析punycode编码.

+ encode(string),将一个Unicode编码字符串转换为一个punycode编码字符串

+ decode(string),将一个punycode编码字符串转成一个Unicode编码字符串

+ toASCII(domain),用于将一个Unicode编码格式的域名转换为一个punycode编码格式的域名,该方法只能转换地方语言域名,不转换英文域名

+ toUnicode(domain),用于将一个punycode编码格式的域名转换为Unicode编码格式的域名,该方法只能转换地方语言域名,不转换英文域名

+ ucs2.encode(codePoints),用于将一个UCS-2编码数组转换成一个字符串

+ ucs2.decode(string),用于将一个字符串转换为一个UCS-2编码数组

+ punycode.version,显示punycode.js类库的版本号
*/

console.log(punycode.encode('你好'));// 6qq79v
console.log(punycode.decode('6qq79v'));// 你好
console.log(punycode.toASCII('www.你好.com'));// www.xn--6qq79v.com
console.log(punycode.toUnicode('www.xn--6qq79v.com'));// www.你好.com
console.log(punycode.ucs2.encode([97, 98, 99]));// abc
console.log(punycode.ucs2.encode([0x1D306]));// \uD834\uDF06
console.log(punycode.ucs2.decode('abc'));// [ 97, 98, 99 ]
console.log(punycode.ucs2.decode('\uD834\uDF06'));// [ 119558 ]

