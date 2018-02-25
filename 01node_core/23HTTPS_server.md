## `HTTP`和`HTTPS`的区别
1. `HTTPS`服务器使用`HTTPS`协议,`HTTP`服务器使用`HTTP`协议.
2. `HTTPS`服务器需要向证书授权`(Certificate Authority)`中心申请证书,一般免费证书何绍需要交费.在少许读客户端有要求的情况下,也会要求客户端使用证书.
3. `HTTP`服务器于客户端之间传输的是明文数据,而`HTTPS`服务器于客户端之间传输的是经过`SSL`安全加密后的密文数据.
4. `HTTP`服务器通常使用`80`或`8080`端口,`HTTPS`服务器使用`443`端口.

## 创建`HTTPS`服务器
创建`HTTPS`服务器之间,服务器端首先需要创建公钥,私钥及证书
1. 创建公钥,可以使用`openssl`工具创建私钥`openssl genrsa -out privatekey.pem 1024`
2. 创建证书签名请求`(Certificate Signing Request)`文件`openssl req -new -key privatekey.pem -out certreques.csr`
3. 获取证书,证书应该是一个经过证书授权中心签名的文件,该证书文件内宝蓝了服务器端提供的公钥以及证书的颁发机构等信息`openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem`,`x509`代表该证书如何国际电信联盟制定的数字证书标准

在客户端与服务器端建立连接后,将首先确认证书的合法性,如果在服务器中使用学习或测试用证书,使用浏览器访问该服务器时,浏览器中将先显示一个警告信息,警告用户该证书不是一个经过证书授权中心签名的证书.
在具备了证书文件之后,可以使用该证书文件创建一个`pfx`文件,所谓的`pfx`文件,是指该文件内容必须符合公钥加密技术12号标准`(Public Key Cryptography Standards #12, PKCS#12)`为存储和传输用户或服务器私钥,公钥和证书而指定的格式.

4. 在`openssl`工具中,可以创建`pfx`文件`openssl pkcs12 -export -in certificate.pem -inkey privatekey.pem -out certificate.pfx`

在这些文件都具备了之后,可以使用`HTTPS`模块中的`createServer`方法创建一个`HTTPS`服务器
`HTTPS.createServer(options, [requestListener(request, response)])`
## `HTTPS.createServer(options)`
+ `options`为一个对象,使用的属性及属性值如下所示
    * `pfx`: 属性值为一个字符串或一个`Buffer`对象,用于指定从`pfx`文件读取出的私钥,公钥及证书,使用该属性值不需要指定`key`属性值,`cert`属性值以及`ca`属性值.
    * `key`: 属性值为一个字符串或一个`Buffer`对象,用于指定从后缀名为`pem`的私钥文件中读取出来的私钥,该属性值为必须指定属性值,除非指定了`pfx`属性值
    * `passphrase`: 属性值为一个自飞船,用于为私钥文件或`pfx`文件指定密码
    * `cert`: 属性值为一个字符串或一个`Buffer`对象,用于指定从后缀名为`pem`的文件中读物出来的公钥,该属性值为必须指定属性值,除非指定了`pfx`属性值
    * `ca`: 属性值为一个字符串或一个`Buffer`对象数组,用于指定一组证书,默认属性值为几个著名的证书授权认证中心,比如`VerlSign`
    * `crl`: 属性值为一个字符串或一个`Buffer`对象数组,用于指定证书吊销列表
    * `ciphers`: 属性值为一个字符串值,用于描述需要使用或取消使用的密码.为了阻挡BEAST攻击,推荐奖`ciphers`属性与`honorCipherOrder`属性结合使用,以指定非`CBC(Cipher-block chaining,密码分组链接)`模式的密码优先级,默认属性值为`AES128-GCM-SHA256: RC4: HIGH: !MD5: !aNULL: !EDH`
    * `handshakeTimeout`: 属性值为一个整数,用于指定多少秒内如果没有完成客户端与服务器之间的握手,则放弃本次连接,默认属性值为`120s`.当在指定时间内没有完成握手时,将处罚`HTTPS`服务器的`clientError`事件.
    * `honorCipherOrder`: 属性值为一个布尔值,当属性值指定为`true`时,服务器将密码列表发送给客户端,有客户端选择密码,尽管该属性值默认为false,但是仍推荐奖该属性值设置为`true`,以阻止`BEAST`攻击
    * `requestCert`: 属性值为一个布尔值,当属性值指定为`true`时,服务器在确认连接时要求客户端提供证书,默认属性值为`false`
    * `rejectUnauthorized`:属性值为一个布尔值,如果属性值为`true`,那么服务器拒绝任何不能提供服务器端所要求的证书的客户端.只有当`requestCert`属性值指定为`true`时,该属性值才有效,默认属性值为`false`
    * `NPNProtocols`: 属性值为一个数组或一个`Buffer`对象,用于指定服务器端所需使用的`NPN`协议(这些协议应该按照其优先级排序).`NPN(Next Protocol Negotiation)`协议是一种用于指定服务器可以使用多种协议`(包括HTTP,SPDY协议等)`的协议
    * `sessionIdContext`: 属性值指定为true,那么默认属性值为一个MD5散列值,如果`requestCert`属性值指定为`false`,不提供默认属性值
