# DNS

在Node.js中，提供DNS模块，以实现域名查找及域名解析的处理。

在DNS模块中，提供了三个主方法及一系列便捷方法。
+ resolve方法:用于将一个域名解析为一组DNS记录。
+ reverse方法: 用于将IP地址转换为一组域名。
+ lookup方法: 用于将一个域名转换成IP地址。
+ DNS模块中的其余便捷方法均为resolve方法的一种便捷形式。

### 使用resolve方法将域名解析为DNS记录
`dns.resolve(domain, [rrtype], callback(err, address){...})`
+ domain参数为一个字符串，用于指定需要被解析的域名，可以包括子域名。
+ rrtypr参数为一个字符串，用于指定需要获取的记录类型，可指定的记录类型如下。
    * A,该参数值为默认值，当记录类型为A时，该记录将一个IPv4地址映射为一个域名。
    * AAAA,当记录类型为AAAA时，该记录将一个IPv6地址映射为一个域名。
    * CNAME,当记录类型为CNAME时，表示该记录为一个域名的别名记录，例如，一个www.example.com域名记录也许为一个example.com域名记录额别名记录。
    * MX,MX记录指向一个使用SMTP的域中的邮件服务器，例如，当你想person@domain.com邮件地址发送电子邮件时，domain.com域的MX记录中保存了发送该邮件时的邮件服务器地址。
    * TXT,TXT记录是为该域名附加的描述记录。
    * SRV,SRV记录用于为一个特定域中所有可用服务提供信息。
    * PTR,PTR记录用于反向地址解析，该记录将一个域名映射为一个IPv4地址。
    * NS,NS(Name Server)记录是域名服务器记录，用来指定该域名由哪个DNS服务器进行解析。
+ 回调函数有两个参数，err是域名解析失败时触发的错误对象，addresses参数为一个数组，其中存放了所有获取到的DNS记录。

### 为resolve方法定制的各种便捷方法
+ dns.resolve4(domain, callback),获取IPv4地址
+ dns.resolve6(domain, callback)，获取IPv6地址
+ dns.resolveMx(domain, callback)，获取MX记录，邮件交换服务器记录
+ dns.resolveTxt(domain, callback)，获取TXT记录，域名附加的描述记录
+ dns.resolveSrv(domain, callback)，获取SRV记录，服务记录
+ dns.resolveNs(domain, callback)，获取NS记录，域名服务器记录
+ dns.resolveCname(domain, callback)，获取别名记录

### 使用lookup方法查询IP地址
当使用resolve4方法或者resolve6方法时，由于callback参数值回调函数中的addresses参数值数组中存放着所有获取到的IPv4地址或IPv6地址。因此DNS模块中提供了一个获取第一个被发现的IPv
4地址或者IPv6地址的lookup方法
`dns.lookup(domain, [family], callback(err, addresses, family){...})`
+ domain参数为一个字符串，用于指定需要解析的域名
+ family参数值为一个整数值，用于指定需要获取的IP地址类型，可指定的参数值为4或6，默认参数值为null,表示既可以获取IPv4，又可以获取IPv6
+ 回调函数err参数值为获取地址失败时触发的错误对象，当域名不存在或查询失败时该错误对象的code属性值为ENOENT
+ addresses参数值为一个字符串，为获取到的IP地址
+ family参数值为4时，表示为一个IPv4地址，为6时，表示为一个IPv6地址。

### 使用reverse方法反向解析IP地址
在DNS模块中，使用reverse方法将一个IP地址反向解析为一组与该IP地址绑定的域名
`dns.reverse(ip, callback(err, domains){...})`
+ ip参数值为一个字符串，用于指定需要解析的IP地址
+ 回调函数的err为反向解析地址失败后的错误对象
+ domains参数值为一个数组，存放了所有获取到的域名

### DNS模块中的各种错误代码
err参数值为执行各种解析或反向解析操作时触发的错误对象，可根据该错误对象的code属性值，即触发的错误代号判断出发了什么错误
+ ENODATA:DNS服务器返回一个没有数据的查询结果
+ EFORMERR:DNS服务器发现客户端请求查询时使用了格式错误的查询参数
+ ESERVFAIL:DNS服务器执行查询操作失败
+ ENOTFOUND:未发现任何域名
+ ENOTIMP:DNS服务器不能进行客户端所请求的查询操作
+ EREFUSED:DNS服务器拒绝进行查询操作
+ EBADQUERY:格式错误的DNS查询
+ EBADNAME:域名格式错误
+ EBADFAMILY:不支持的IP地址类型
+ EBADRESP:DNS答复的格式错误
+ ECONNREFUSED:不能建立与DNS服务器之间的连接
+ ETIMEOUT:与DNS服务器之间建立连接超时
+ EEOF:已到达文件底部
+ EFILE:读取文件失败
+ ENOMEM:没有足够的内存空间
+ EDESTRUCTION:通道已经被销毁
+ EBADSTR:字符串格式错误
+ EBADFLAGS:指定了错误的判断标志
+ ENONAME:指定的主机名不是数值格式的
+ EBADHINTS:指定的提示标志无效
+ ENOTINITIALIZED:c-ares类库初始化工作尚未完成
+ ELOADIPHLPAPI:加载iphlpapi.dll时触发了一个错误
+ EADDREGETNETWORKPARAMS:未发现GetNetworkParams函数
+ ECANCELLED:DNS查询操作被取消
