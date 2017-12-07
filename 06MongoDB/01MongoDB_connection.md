## node连接mongo
在Node.js中,当需要连接MongoDB数据库时,先要创建一个代表MongoDB数据库所在的服务器的Server对象,用于指定需要连接的MongoDB数据库所在的服务器.
#### mongo.Server()
创建该Server对象的方法
`var server = new mongo.Server(host, port [options]);`
其中,options参数值为一个对象,用于指定该服务器需要使用的一些选项.

+ ssl: 属性值为一个布尔值,当属性值为true时,客户端与服务器端之间建立一个机遇ssl安全协议的连接,服务器端需要启用ssl安全协议,默认属性值为false
+ selValidate: 属性值的一个布尔值,用于指定服务器是否验证客户端所提交的整数.当该属性值为true时,服务器端需要使用ssl安全协议2.4版本以上,默认属性值为false
+ sslCA: 属性值为一个数组,数组中每一个元素值为一个Buffer对象或一个字符串,用于指定一组供服务器端验证时使用的证书(服务器端需要使用ssl安全协议2.4版本以上),默认属性值为null.
+ sslCert: 属性值为一个Buffer对象或一个字符串,用于指定一个供服务器端验证时使用的证书(服务器端需要使用ssl安全协议2.4版本以上),默认属性值为null.
+ sslKey: 属性值为一个Buffer对象或一个字符串,用于指定一个供服务器端验证时使用的私钥(服务器端需要使用ssl安全协议2.4版本以上),默认属性值为null.
+ sslPass: 属性值为一个Buffer对象或一个字符串,用于指定一个供服务器端验证时使用的证书密码(服务器端需要使用ssl安全协议2.4版本以上),默认属性值为null.
+ poolSize: 属性值为一个整数,用于指定连接池中的最大连接数量,默认属性值为5.
+ socketOptions: 属性值为一个对象,用于指定与服务器建立连接的端口使用的选项,默认属性值为null.属性值对象中可使用的属性如下:
    * keepAlive: 属性值为一个整数,单位为毫秒,用于指定客户端每隔多久向服务器端发送一次keepAlive探测包
    * connectTimeoutMS: 属性值为一个整数,单位为毫秒,用于指定客户端连接超时时间.
    * socketTimeoutMS: 单位为毫秒,用于指定客户端端口超时时间.
+ logger: 属性值为一个记录日志的独享,默认属性值为null.
+ auto_reconnect:属性值为一个布尔值,当属性值为true时,在客户端与服务器连接过程中发生错误时自动重建连接,默认属性值为false.
+ disableDriverBSONSizeCheck: 属性值为一个布尔值,当属性值为true时,在BSON对象尺寸过大时强迫服务器抛出一个错误,默认属性值为false.

#### new mongo.db()
**在MongoDB服务器对象创建成功后,需要创建一个代表MongoDB数据库的对象**
`var db = new mongo.db(databaseName, server, [options])`

在DB对象的构造函数中,使用三个参数,databaseName为数据库的名字,server为一个Server,用于指定该数据库所在的服务器.options参数值为一个对象,用于指定该数据库需要使用的一些选项.
+ w: 属性值为一个大于-1的整数或一个字符串.该属性值用于设置写数据操作时MongoDB数据库内部的write concern机制,MongoDB数据库内部使用write concern机制来报告一条数据的写入操作是否成功,当w属性值为小于1的整数值时,write concern机制不承认一条数据被写入,当w属性值为大于1的整数或字符串时,write concern机制承认一条数据被写入.
+ wtimeout: 属性值为一个整数值,用于指定写数据操作的超时时间,单位为毫秒
+ fsync: 属性值为一个布尔值,用于指定在写数据操作的方法返回前是否要等待MongoDB数据库内部使用的fsync操作(该操作将剩余的被挂起数据全部系诶如数据库)结束,默认属性值为false.
+ journal: 属性值为一个布尔值,用于指定在写数据操作的方法返回前是否要等待MongoDB数据库内部使用的journal操作(该操作在数据库中写入执行日志)结束,默认属性值为false.
+ native_parser: 属性值为一个布尔值,用于指定MongoDB数据库内部是否使用C++BSON解析器,默认属性值为false.
+ forceServerObjectId: 属性值为一个布尔值,用于指定是否在服务器端,而不是在客户端创建BSON对象ID,默认属性值为false.
+ pkFactory: 属性值为一个对象,该对象重载MongoDB数据库内部生成的对象ID主键.
+ serializeFunctions: 属性值为一个布尔值,用于指定是否在MongoDB数据库内部序列化JavaScript函数,默认属性值为false.
+ raw: 属性值为一个布尔值,用俄语指定是否在MongoDB数据库内部使用二进制BSON数据缓存区来执行数据的存取操作,默认属性值为false.
+ recordQueryStats: 属性值为一个布尔值,用于指定当查询数据时是否在MongoDB数据库内部执行查询统计,默认属性值为false.
+ retryMiliSeconds: 属性值为一个整数值,单位为毫秒,用于指定当连接数据库操作失败时每隔多长时间重新尝试连接数据库.默认属性值为5000.
+ numberOfRetries: 属性值为一个整数值,用于指定当连接数据库操作失败时重新尝试连接数据库的次数,默认属性值为0.
+ logger: 属性值为一个用于记录操作日志的对象,默认属性值为null.
+ slaveOk: 属性值为一个整数值,用于设置查询时在MongoDB数据库内部使用的SlaveOk值(只在需要显式指定连接到一个丛属服务器时有效),默认值为null.
+ safe: 属性值为一个布尔值,当属性值为true时,使用getLastError命令执行数据的存取操作,该命令返回存取操作的执行结果,默认属性值为false.

#### `db.open()`
db对象创建后，需要使用该对象的open方法执行数据库连接操作,`db.open(callback(err, db){})`,第一个参数为连接数据库失败时抛出的错误对象，第二个参数为一个db对象，代表连接成功的数据库，当连接数据库失败时，该参数为Null。

#### `db.close()`
当一个数据库不再需要使用时，可以使用该数据库对象的close方法关闭该数据库`db.close([forceClose], [callback(err){}])`,第一个参数为ture时表示要强制关闭数据库，关闭后可以使用open方法重新打开数据库。

当数据库是关闭时，触发数据库对象的close事件，通过监听数据库对象的close方法并指定回调函数的方法指定当关闭数据库操作执行结束时所需要执行的处理.`db.close(function(err,db){})`,当关闭成功时，db为成功关闭的对象，关闭失败时，db为null。

**与数据库之间建立连接及关闭数据库的代码示例**
```node
var mongo = require('mongodb');
var host = 'localhost';
var port = 27017;
var server = new mongo.Server(host, port, {auto_connection: true});
var db = new mongo.Db('person', server, {safe: true});
db.open(function(err, db){
    if(err){
        throw err;
    }else{
        console.log('成功建立数据库连接');
        db.close();
    }
});
db.on('close', function(err, db){
    if(err){
        throw err;
    }else{
        console.log('成功关闭数据库');
    }
});
```

