## HTTP 和 HTTPS 的区别

1. HTTPS服务器使用HTTPS协议,HTTP服务器使用HTTP协议.
2. HTTPS服务器需要向证书授权(Certificate Authority)中心申请证书,一般免费证书何绍需要交费.在少许读客户端有要求的情况下,也会要求客户端使用证书.
3. HTTP服务器于客户端之间传输的是明文数据,而HTTPS服务器于客户端之间传输的是经过SSL安全加密后的密文数据.
4. HTTP服务器通常使用80或8080端口,HTTPS服务器使用443端口.


## 创建HTTPS服务器
创建HTTPS服务器之间,服务器端首先需要创建公钥,私钥及证书

1. 创建公钥,可以使用openssl工具创建私钥`openssl genrsa -out privatekey.pem 1024`
2. 创建证书签名请求(Certificate Signing Request)文件`openssl req -new -key privatekey.pem -out certreques.csr`
3. 获取证书,证书应该是一个经过证书授权中心签名的文件,该证书文件内宝蓝了服务器端提供的公钥以及证书的颁发机构等信息`openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem`
x509代表该证书如何国际电信联盟制定的数字证书标准

在客户端与服务器端建立连接后,将首先确认证书的合法性,如果在服务器中使用学习或测试用证书,使用浏览器访问该服务器时,浏览器中将先显示一个警告信息,警告用户该证书不是一个经过证书授权中心签名的证书.
在具备了证书文件之后,可以使用该证书文件创建一个pfx文件,所谓的pfx文件,是指该文件内容必须符合公钥加密技术12号标准(Public Key Cryptography Standards #12, PKCS#12)为存储和传输用户或服务器私钥,公钥和证书而指定的格式.

4. 在openssl工具中,可以创建pfx文件`openssl pkcs12 -export -in certificate.pem -inkey privatekey.pem -out certificate.pfx`

在这些文件都具备了之后,可以使用HTTPS模块中的createServer方法创建一个HTTPS服务器
https.createServer(options, [requestListener(request, response)])
## https.createServer(options)
+ options为一个对象,使用的属性及属性值如下所示
+ pfx: 属性值为一个字符串或一个Buffer对象,用于指定从pfx文件读取出的私钥,公钥及证书,使用该属性值不需要指定key属性值,cert属性值以及ca属性值.
+ key: 属性值为一个字符串或一个Buffer对象,用于指定从后缀名为pem的私钥文件中读取出来的私钥,该属性值为必须指定属性值,除非指定了pfx属性值
+ passphrase: 属性值为一个自飞船,用于为私钥文件或pfx文件指定密码
+ cert: 属性值为一个字符串或一个Buffer对象,用于指定从后缀名为pem的文件中读物出来的公钥,该属性值为必须指定属性值,除非指定了pfx属性值
+ ca: 属性值为一个字符串或一个Buffer对象数组,用于指定一组证书,默认属性值为几个著名的证书授权认证中心,比如VerlSign
+ crl: 属性值为一个字符串或一个Buffer对象数组,用于指定证书吊销列表
+ ciphers: 属性值为一个字符串值,用于描述需要使用或取消使用的密码.为了阻挡BEAST攻击,推荐奖ciphers属性与honorCipherOrder属性结合使用,以指定非CBC(Cipher-block chaining,密码分组链接)模式的密码优先级,默认属性值为`AES128-GCM-SHA256: RC4: HIGH: !MD5: !aNULL: !EDH`
+ handshakeTimeout: 属性值为一个整数,用于指定多少秒内如果没有完成客户端与服务器之间的握手,则放弃本次连接,默认属性值为120s.当在指定时间内没有完成握手时,将处罚HTTPS服务器的clientError事件.
+ honorCipherOrder: 属性值为一个布尔值,当属性值指定为true时,服务器将密码列表发送给客户端,有客户端选择密码,尽管该属性值默认为false,但是仍推荐奖该属性值设置为true,以阻止BEAST攻击
+ requestCert: 属性值为一个布尔值,当属性值指定为true时,服务器在确认连接时要求客户端提供证书,默认属性值为false
+ rejectUnauthorized:属性值为一个布尔值,如果属性值为true,那么服务器拒绝任何不能提供服务器端所要求的证书的客户端.只有当requestCert属性值指定为true时,该属性值才有效,默认属性值为false
+ NPNProtocols: 属性值为一个数组或一个Buffer对象,用于指定服务器端所需使用的NPN协议(这些协议应该按照其优先级排序).NPN(Next Protocol Negotiation)协议是一种用于指定服务器可以使用多种协议(包括HTTP,SPDY协议等)的协议
+ sessionIdContext: 属性值指定为true,那么默认属性值为一个MD5散列值,如果requestCert属性值指定为false,不提供默认属性值

## HTTPS服务器对象的创建示例
```node
var https = require('https');
var fs = require('fs');
var pk = fs.readFileSync('./privatekey.pem');
var pc = fs.readFileSync('./certificate.pem');
var options = {
    key: pk,
    cert: pc
};

var server = https.createServer(options, function(req, res){
    console.log(req.url);
    if(req.url !== '/favicon.ico'){
        res.setHeader('Content-Type', 'text/html');
        res.write('hello, this is a https server');
        res.write('thank you');
        res.end();
    }
})

server.on('error', function(err){
    if(err){
        console.log('服务器出错,已关闭');
        server.close();
    }
})

server.listen(443, 'localhost', function(){
    console.log('服务器开始监听');
})
```