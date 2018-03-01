## 4. `HTTP`和`HTTPS`的区别
+ `HTTPS`服务器使用`HTTPS`协议,`HTTP`服务器使用`HTTP`协议.
+ `HTTPS`服务器需要向证书授权`(Certificate Authority)`中心申请证书,一般免费证书何绍需要交费.在少许读客户端有要求的情况下,也会要求客户端使用证书.
+ `HTTP`服务器于客户端之间传输的是明文数据,而`HTTPS`服务器于客户端之间传输的是经过`SSL`安全加密后的密文数据.
+ `HTTP`服务器通常使用`80`或`8080`端口,`HTTPS`服务器使用`443`端口.

## 5. 创建`HTTPS`服务器
### 5.1 前提条件——准备公钥私钥和证书
创建`HTTPS`服务器之间,服务器端首先需要创建公钥,私钥及证书
+ 创建公钥,可以使用`openssl`工具创建私钥`openssl genrsa -out privatekey.pem 1024`
+ 创建证书签名请求`(Certificate Signing Request)`文件`openssl req -new -key privatekey.pem -out certreques.csr`
+ 获取证书,证书应该是一个经过证书授权中心签名的文件,该证书文件内宝蓝了服务器端提供的公钥以及证书的颁发机构等信息`openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem`,`x509`代表该证书如何国际电信联盟制定的数字证书标准
在客户端与服务器端建立连接后,将首先确认证书的合法性,如果在服务器中使用学习或测试用证书,使用浏览器访问该服务器时,浏览器中将先显示一个警告信息,警告用户该证书不是一个经过证书授权中心签名的证书.
在具备了证书文件之后,可以使用该证书文件创建一个`pfx`文件,所谓的`pfx`文件,是指该文件内容必须符合公钥加密技术12号标准`(Public Key Cryptography Standards #12, PKCS#12)`为存储和传输用户或服务器私钥,公钥和证书而指定的格式.
+. 在`openssl`工具中,可以创建`pfx`文件`openssl pkcs12 -export -in certificate.pem -inkey privatekey.pem -out certificate.pfx`
在这些文件都具备了之后,可以使用`HTTPS`模块中的`createServer`方法创建一个`HTTPS`服务器`HTTPS.createServer(options, [requestListener(request, response)])`

### 5.2 开始创建`HTTPS`服务器
+ `HTTPS.createServer(options)`
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

## 6. 使用`HTTPS`向其他网站请求数据
+ 在`HTTPS`模块中,可以使用`request`方法向其他使用`HTTPS`协议的网站请求数据
`let req = https.request(options, callback(res){})`
+ `options`为一个对象或字符串,用于指定请求的目标的`URL`地址,如果该参数值为一个字符串,将自动使用`URL`模块中的`parse`方法转换为一个对象.在`options`参数值对象或使用`parse`方法转换后对象中,可以指定的属性及属性值如下所示
    * `host`: 用于指定域名或目标主机的`IP`地址,默认属性为`localhost`
    * `hostname`: 用于指定域名或目标主机的`IP`地址,默认属性为`localhost`, 如果`hostname`属性值与`host`属性值都被指定,优先使用hostname属性值
    * `port`: 指定目标服务器用于`HTTP`客户单连接的端口号,默认为`443`
    * `method`: 用于指定`HTTP`请求方式,默认为`GET`
    * `path`: 用于指定请求路径及查询字符串,默认为`/`
    * `headers`: 用于指定客户端请求头对象
    * `auth`: 用于指定认证信息部分,例如`user:password`
    * `agent: 用于指定用户代理
    
+ 当在`options`参数值对象中使用如下所示的属性及属性值时,不能使用全局`https.Agent`对象
    * `pfx`: 属性值为一个字符串或一个`Buffer`对象,用于指定从`pfx`文件读取出的私钥,公钥及证书,使用该属性值不需要指定`key`属性值,`cert`属性值以及`ca`属性值.
    * `key`: 属性值为一个字符串或一个`Buffer`对象,用于指定从后缀名为`pem`的私钥文件中读取出来的私钥,该属性值为必须指定属性值,除非指定了pfx属性值
    * `passphrase`: 属性值为一个字符串,用于为私钥文件或`pfx`文件指定密码
    * `cert`: 属性值为一个字符串或一个`Buffer`对象,用于指定从后缀名为`pem`的文件中读物出来的公钥,该属性值为必须指定属性值,除非指定了pfx属性值
    * `ca`: 属性值为一个字符串或一个`Buffer`对象数组,用于指定一组证书,默认属性值为几个著名的证书授权认证中心,比如`VerlSign`
    * `crl`: 属性值为一个字符串或一个`Buffer`对象数组,用于指定证书吊销列表
    * `ciphers`: 属性值为一个字符串值,用于描述需要使用或取消使用的密码.为了阻挡`BEAST`攻击,推荐奖`ciphers`属性与`honorCipherOrder`属性结合使用,以指定非`CBC(Cipher-block chaining,密码分组链接)`模式的密码优先级,默认属性值为`AES128-GCM-SHA256: RC4: HIGH: !MD5: !aNULL: !EDH`
    * `rejectUnauthorized`:属性值为一个布尔值,如果属性值为`true`,那么服务器在客户端建立连接后,返回响应前首先验证客户端提交的证书,如果验证失败,触发客户端请求对象的`error`事件.
    
## 7. 创建`HTTPS`客户端
```javascript
const https = require('https');
let options = {
    hostname: 'github.com',
    port: 443,
    path: '/',
    method: 'GET',
    agent: false
}
let req = https.get(options, (res) => {
    console.log('状态码：' + res.statusCode);
    console.log('响应头：' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log('响应内容：' + chunk);
    });
});

req.setTimeout(1000, (res) => {
    res.abort();
});

req.on('error',  (err) => {
    if (err.code === 'ECONNRESET') {
        console.log('socket端口超时');
    } else {
        console.log('在请求数据过程中发生错误，错误代码为：' + err.code)
    }
});
/**
* 状态码：200
* 响应头：{
          "date": "Sun, 25 Feb 2018 14:24:24 GMT",
          "content-type": "text/html; charset=utf-8",
          "transfer-encoding": "chunked",
          "connection": "close",
          "server": "GitHub.com",
          "status": "200 OK",
          "cache-control": "no-cache",
          "vary": "X-PJAX, Accept-Encoding",
          "x-ua-compatible": "IE=Edge,chrome=1",
          "set-cookie": ["logged_in=no; domain=.github.com; path=/; expires=Thu, 25 Feb 2038 14:24:24 -0000; secure; HttpOnly", "_gh_sess=eyJzZXNzaW9uX2lkIjoiMDY1YjM2ZmU4ZGM5MTFlZTliNjllMDI5ZDg0YzQ0ODUiLCJsYXN0X3JlYWRfZnJvbV9yZXBsaWNhcyI6MTUxOTU2ODY2NDUzMywiX2NzcmZfdG9rZW4iOiJ1ck5qWmZTMkpkeGpxMlN2ZzJhbklJM2pvaTJMVWEzWHcvSXEvTGtzVzBrPSJ9--8b5c0c203b3767a35f046b5ea4e375715e4d95be; path=/; secure; HttpOnly"],
          "x-request-id": "1faefb3e691e8adc7e1a7d727c07236f",
          "x-runtime": "0.050658",
          "expect-ct": "max-age=2592000, report-uri=\"https://api.github.com/_private/browser/errors\"",
          "content-security-policy": "default-src 'none'; base-uri 'self'; block-all-mixed-content; child-src render.githubusercontent.com; connect-src 'self' uploads.github.com status.github.com collector.githubapp.com api.github.com www.google-analytics.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com wss://live.github.com; font-src assets-cdn.github.com; form-action 'self' github.com gist.github.com; frame-ancestors 'none'; img-src 'self' data: assets-cdn.github.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com *.githubusercontent.com; manifest-src 'self'; media-src 'none'; script-src assets-cdn.github.com; style-src 'unsafe-inline' assets-cdn.github.com; worker-src 'self'",
          "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
          "x-content-type-options": "nosniff",
          "x-frame-options": "deny",
          "x-xss-protection": "1; mode=block",
          "x-runtime-rack": "0.058378",
          "x-github-request-id": "1B82:60FF:117094:18A2C0:5A92C717"
      }
* 
****/
```