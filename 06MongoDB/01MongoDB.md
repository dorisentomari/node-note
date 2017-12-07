## node连接mongo
在Node.js中，当需要连接MongoDB数据库时，先要创建一个代表MongoDB数据库所在的服务器的Server对象，用于指定需要连接的MongoDB数据库所在的服务器。
创建该Server对象的方法
`var server = new mongo.Server(host, port [options]);`
其中，options参数值为一个对象，用于指定该服务器需要使用的一些选项。

+ ssl: 属性值为一个布尔值，当属性值为true时，客户端与服务器端之间建立一个机遇ssl安全协议的连接，服务器端需要启用ssl安全协议，默认属性值为false
+ selValidate: 属性值的一个布尔值，用于指定服务器是否验证客户端所提交的整数。当该属性值为true时，服务器端需要使用ssl安全协议2.4版本以上，默认属性值为false
+ sslCA: 属性值为一个数组，数组中每一个元素值为一个Buffer对象或一个字符串，用于指定一组供服务器端验证时使用的证书(服务器端需要使用ssl安全协议2.4版本以上)，默认属性值为null。
+ sslCert: 属性值为一个Buffer对象或一个字符串，用于指定一个供服务器端验证时使用的证书(服务器端需要使用ssl安全协议2.4版本以上)，默认属性值为null。
+ sslKey: 属性值为一个Buffer对象或一个字符串，用于指定一个供服务器端验证时使用的私钥(服务器端需要使用ssl安全协议2.4版本以上)，默认属性值为null。
+ sslPass: 属性值为一个Buffer对象或一个字符串，用于指定一个供服务器端验证时使用的证书密码(服务器端需要使用ssl安全协议2.4版本以上)，默认属性值为null。
+ poolSize: 属性值为一个整数，用于指定连接池中的最大连接数量，默认属性值为5。
+ socketOptions: 属性值为一个对象，用于指定与服务器建立连接的端口使用的选项，默认属性值为null。属性值对象中可使用的属性如下:
    * keepAlive: 属性值为一个整数，单位为毫秒，用于指定客户端每隔多久向服务器端发送一次keepAlive探测包
    * connectTimeoutMS: 属性值为一个整数，单位为毫秒，用于指定客户端连接超时时间。
    * socketTimeoutMS: 单位为毫秒，用于指定客户端端口超时时间。
+ logger: 属性值为一个记录日志的独享，默认属性值为null.
+ auto_reconnect:属性值为一个布尔值,当属性值为true时，在客户端与服务器连接过程中发生错误时自动重建连接，默认属性值为false。
+ disableDriverBSONSizeCheck: 属性值为一个布尔值，当属性值为true时，在BSON对象尺寸过大时强迫服务器抛出一个错误，默认属性值为false。

**在MongoDB服务器对象创建成功后，需要创建一个代表MongoDB数据库的对象**
`var db = new mongo.db(databaseName, server, [options])`

在DB对象的构造函数中，使用三个参数，databaseName为数据库的名字，server为一个Server，用于指定该数据库所在的服务器。options参数值为一个对象，用于指定该数据库需要使用的一些选项。
+ w: 属性值为一个大于-1的整数或一个字符串。该属性值用于设置写数据操作时MongoDB数据库内部的write concern机制，MongoDB数据库内部使用write concern机制来报告一条数据的写入操作是否成功，当w属性值为小于1的整数值时，write concern机制不承认一条数据被写入,当w属性值为大于1的整数或字符串时，write concern机制承认一条数据被写入。
+ wtimeout: 属性值为一个整数值，用于指定写数据操作的超时时间，单位为毫秒
+ fsync: 属性值为一个布尔值，用于指定在写数据操作的方法返回前是否要等待MongoDB数据库内部使用的fsync操作(该操作将剩余的被挂起数据全部系诶如数据库)结束，默认属性值为false。
+ journal: 属性值为一个布尔值，用于指定在写数据操作的方法返回前是否要等待MongoDB数据库内部使用的journal操作(该操作在数据库中写入执行日志)结束，默认属性值为false。
+ native_parser: 属性值为一个布尔值，用于指定MongoDB数据库内部是否使用C++BSON解析器，默认属性值为false。
+ forceServerObjectId: 属性值为一个布尔值，用于指定是否在服务器端，而不是在客户端创建BSON对象ID，默认属性值为false。
+ pkFactory: 属性值为一个对象，该对象重载MongoDB数据库内部生成的对象ID主键。
+ serializeFunctions: 属性值为一个布尔值，用于指定是否在MongoDB数据库内部序列化JavaScript函数，默认属性值为false。

