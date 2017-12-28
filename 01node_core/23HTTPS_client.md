在HTTPS模块中,可以使用request方法向其他使用HTTPS协议的网站请求数据
```
var req = https.request(options, callback(res){})
```
options为一个对象或字符串,用于指定请求的目标的URL地址,如果该参数值为一个字符串,将自动使用url模块中的parse方法转换为一个对象.在options参数值对象或使用parse方法转换后对象中,可以指定的属性及属性值如下所示

+ host: 用于指定域名或目标主机的IP地址,默认属性为localhost
+ hostname: 用于指定域名或目标主机的IP地址,默认属性为localhost, 如果hostname属性值与host属性值都被指定,优先使用hostname属性值
+ port: 指定目标服务器用于HTTP客户单连接的端口号,默认为443
+ method: 用于指定HTTP请求方式,默认为`GET`
+ path: 用于指定请求路径及查询字符串,默认为`/`
+ headers: 用于指定客户端请求头对象
+ auth: 用于指定认证信息部分,例如`user:password`
+ agent: 用于指定用户代理
**当在options参数值对象中使用如下所示的属性及属性值时,不能使用全局https.Agent对象**
+ pfx: 属性值为一个字符串或一个Buffer对象,用于指定从pfx文件读取出的私钥,公钥及证书,使用该属性值不需要指定key属性值,cert属性值以及ca属性值.
+ key: 属性值为一个字符串或一个Buffer对象,用于指定从后缀名为pem的私钥文件中读取出来的私钥,该属性值为必须指定属性值,除非指定了pfx属性值
+ passphrase: 属性值为一个自飞船,用于为私钥文件或pfx文件指定密码
+ cert: 属性值为一个字符串或一个Buffer对象,用于指定从后缀名为pem的文件中读物出来的公钥,该属性值为必须指定属性值,除非指定了pfx属性值
+ ca: 属性值为一个字符串或一个Buffer对象数组,用于指定一组证书,默认属性值为几个著名的证书授权认证中心,比如VerlSign
+ crl: 属性值为一个字符串或一个Buffer对象数组,用于指定证书吊销列表
+ ciphers: 属性值为一个字符串值,用于描述需要使用或取消使用的密码.为了阻挡BEAST攻击,推荐奖ciphers属性与honorCipherOrder属性结合使用,以指定非CBC(Cipher-block chaining,密码分组链接)模式的密码优先级,默认属性值为`AES128-GCM-SHA256: RC4: HIGH: !MD5: !aNULL: !EDH`
+ rejectUnauthorized:属性值为一个布尔值,如果属性值为true,那么服务器在客户端建立连接后,返回响应前首先验证客户端提交的证书,如果验证失败,触发客户端请求对象的error事件.

```node
var https = require('https');
var options = {
    hostname: 'npmjs.org',
    port: 443,
    path: '/',
    method: 'GET',
    agent: false
}
var req = https.get(options, function(res){
    console.log('状态码：'+ res.statusCode);
    console.log('响应头：'+ JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        console.log('响应内容：' + chunk);
    })
})

req.setTimeout(1000, function(){
    res.abort();
})

req.on('error', function(err){
    if(err.code === 'ECONNRESET'){
        console.log('socket端口超时');
    }else{
        console.log('在请求数据过程中发生错误,错误代码为：'+ err.code)
    }
})
/*
状态码：200
响应头：{"server":"GitHub.com","date":"Wed, 06 Dec 2017 15:05:12 GMT","content-type":"text/html; charset=utf-8","transfer-encoding":"chunked","connection":"close","status":"200 OK","cache-control":"no-cache","vary":"X-PJAX","x-ua-compatible":"IE=Edge,chrome=1","set-cookie":["logged_in=no; domain=.github.com; path=/; expires=Sun, 06 Dec 2037 15:05:12 -0000; secure; HttpOnly","_gh_sess=eyJzZXNzaW9uX2lkIjoiYmE0NDdmOWI2MGNiZjliYmVhMGMxMjhjMTc0ZmFlNWIiLCJsYXN0X3JlYWRfZnJvbV9yZXBsaWNhcyI6MTUxMjU3MjcxMjcyNSwiX2NzcmZfdG9rZW4iOiIvZE5Fckk4UmtGdlJuMnljRjB5d21YQ2F3RXc1OWZDdEV5MXBQem1IWFBNPSJ9--364c5ffc5422d3ca0573d3a1614040515d4f83b7; path=/; secure; HttpOnly"],"x-request-id":"92dbaefa969effac65a4a47d1bfdf48b","x-runtime":"0.066573","expect-ct":"max-age=2592000, report-uri=\"https://api.github.com/_private/browser/errors\"","content-security-policy":"default-src 'none'; base-uri 'self'; block-all-mixed-content; child-src render.githubusercontent.com; connect-src 'self' uploads.github.com status.github.com collector.githubapp.com api.github.com www.google-analytics.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com wss://live.github.com; font-src assets-cdn.github.com; form-action 'self' github.com gist.github.com; frame-ancestors 'none'; img-src 'self' data: assets-cdn.github.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com *.githubusercontent.com; media-src 'none'; script-src assets-cdn.github.com; style-src 'unsafe-inline' assets-cdn.github.com","strict-transport-security":"max-age=31536000; includeSubdomains; preload","public-key-pins":"max-age=0; pin-sha256=\"WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18=\"; pin-sha256=\"RRM1dGqnDFsCJXBTHky16vi1obOlCgFFn/yOhI/y+ho=\"; pin-sha256=\"k2v657xBsOVe1PQRwOsHsw3bsGT2VzIqz5K+59sNQws=\"; pin-sha256=\"K87oWBWM9UZfyddvDfoxL+8lpNyoUB2ptGtn0fv6G2Q=\"; pin-sha256=\"IQBnNBEiFuhj+8x6X8XLgh01V9Ic5/V3IRQLNFFc7v4=\"; pin-sha256=\"iie1VXtL7HzAMF+/PVPR9xzT80kQxdZeJ+zduCB3uj0=\"; pin-sha256=\"LvRiGEjRqfzurezaWuj8Wie2gyHMrW5Q06LspMnox7A=\"; includeSubDomains","x-content-type-options":"nosniff","x-frame-options":"deny","x-xss-protection":"1; mode=block","x-runtime-rack":"0.074114","x-github-request-id":"14AB:2B559:7D25D4:D06117:5A280727"}
响应内容：就是github.com主页面的html代码

*/
```
