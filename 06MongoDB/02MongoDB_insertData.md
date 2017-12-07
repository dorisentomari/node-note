##  在MongoDB数据库中插入数据
**使用数据库对象的collection方法访问一个集合**
`db.collection(collectionName, [options], [callback(err, collection)])`
#### options属性
`与 new mongo.Db.(databaseName, server, [options]);的options属性一样`

#### insert data
+ collection.insert(docs, [options], [callback(err, json){}])
+ docs为一个JSON对象或一个由JSON对象构成的数组，用于指定需要插入的数据文档
+ options用于指定插入数据时使用的选项
+ callback(err, json){}第一个参数为错误对象，第二个参数为JSON对象或一个由JSON对象构成的数组，代表被插入的数据文档，当插入数据操作失败时，该参数值为null.

**将user对象插入到MongoDB数据库中**
```node
var http = require('http');
var mongo = require('mongodb');
var host = 'localhost';
var port = 27017;
var server = new mongo.Server(host, port, {auto_connection: true});
http.createServer(function(req, res){
    var db = new mongo.Db('person', server, {safe: true});
    db.open(function(err, db){
        if(err){
            throw err;
        }else{
            console.log('成功建立数据库连接');
            db.collection('users', function(err, collection){
                collection.insert({username: 'Jack', age: 25}, function(err, docs){
                    if(err){
                        throw err;
                    }else{
                        console.log(docs);
                        console.log('已成功插入数据');
                        db.close(false);
                    }
                })    
            })
        }
    });
    db.once('close', function(err, db){
        if(err){
            throw err;
        }else{
            db.open(function(err, db){
                db.collection('users', function(err, collection){
                    collection.insert({username: 'Sherry', age: 24}, function(err, docs){
                        if(err){
                            throw err;
                        }else{
                            console.log(docs);
                            db.close(true);
                            console.log('成功关闭数据库');

                        }
                    })
                })    
            })
        }
    }); 
}).listen(8888, function(){
    console.log('the server is running at localhost:8888')
});
```








