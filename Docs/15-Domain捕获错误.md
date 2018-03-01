## 1. 捕获错误
+ `try...catch`机制不能捕获异步方法抛出的错误
+ `uncaughtException`时间可以捕获任何未被处理的错误，但是可能会引起内存泄漏等情况

## 2. `domain`模块获取错误
使用domian模块中的`create`方法创建一个`domain`对象，`var domain = domain.create()`,`create`方法没有任何参数，该方法返回被创建的`Domain`对象。该对象是一个继承了`EventEmitter`类的实例对象，当该对象捕获到任何错误时，触发该对象的`error`事件。可以通过监听该对象的`error`事件并指定事件回调函数的方法来实现当捕捉到错误时的处理。`domain.on('error', function(err){})`

`domain`模块中，为`Domain`对象定义了一个name属性值，可以使用该属性值来设置或获取该`Domain`对象的名称。

在Domain对象被创建后，需要指定该对象所监听的代码，我们需要将这些代码书写在一个函数中，并且使用Domain对象的run方法指定Domain对象监听该函数中的代码。当这些代码触发任何错误时，将被`Domain`对象捕获。`Domain`对象的`run`方法的指定方法如下`domain.run(fn)`

在`Domain`对象的`run`方法中，使用一个参数，参数值为一个函数，当该函数中触发任何错误时，将被`Domain`对象捕获。

当`Domain`对象不再需要的时候，可以销毁`d.dispose();`

## 示例
```javascript
const http = require('http');
const domain = require('domain');
const process = require('process');
http.createServer(function (req, res) {
    var d = domain.create();
    d.name = 'domainOne';
    d.once('error', function (err) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<head><meta charset="utf-8"/></head>')
        res.write('服务器端接收客户端请求时发生以下错误:')
        res.end(err.message);
    })
    d.run(function () {
        if (req.url !== '/favicon.ico') {
            notexitsfunction(); //this is an error
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<head><meta charset="utf-8"/></head>')
            res.end('hello');
        }
        process.nextTick(() => {
            setTimeout(() => {
                fs.open('./notExistFile.txt', 'r', (err, fd) => {
                    if (err) {
                        throw err;
                    }
                })
            })
        })

    })

}).listen(2576, 'localhost')
```