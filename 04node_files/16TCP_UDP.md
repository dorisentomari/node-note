## 创建TCP服务器
`var server = net.createServer([options], [connectionListener]);`

options参数值为一个对象,可以在给兑现各种使用一个布尔类型的allowHalfOpen属性,当为false时,当TCP服务器接收到客户端发送的一个FIN包时将会回发一个FIN包.当为true时,TCP服务器接收到客户端发送的FIN包时不回发FIN包,这使得TCP服务器可以继续向客户端发送数据,但是不回继续接收客户端发送的数据,必须调用end方法来关闭该socket连接.

connectionListener参数用于指定客户端与服务器端建立起来你姐时所要调用的回调函数.

```
var net = require('net');
var server = net.createServer(false, function(socket){})
```
+ createServer方法返回被创建的TCP服务器

+ 当客户端与服务器建立连接时,触发connection事件,我们可以通过对connection事件进行监听,并且指定该事件的返回函数的方法来指定当客户端与服务器建立连接时所需要执行的处理

`server.on('connection', function(socket){})`
+ 回调函数中的参数为该TCP服务器监听的socktet端口对象

+ 在创建了TCP服务器之后,可以用listen方法通知服务器开始监听客户端连接,有三种指定的方法

#### 方法一:
`server.listen(port, [host], [backlog], [callback]);`
+ port为必须要指定的参数,为0时将为TCP分配一个随机端口号.
+ host为指定需要监听的IP地址或主机名,如果省略,服务器将锦亭来自任何IPv4地址的客户端连接
+ backlog为一个整数值,用于指定位于等待队列中的客户端连接的最大数量,一旦超过这个长度,TCP服务器将开始拒绝来自新的客户端的连接请求,参数值默认为511
当对TCP服务器制定了需要监听的地址和端口后,服务器将立即开始监听来自于该地址及端口的客户端连接,这时触发该服务器的listening事件,可使用listen方法的callback参数来指定listening事件触发时调用的回调函数,该回调函数中不使用任何参数

#### 方法二:
`server.listen(path, [callback]);`
+ 这种形式的listen方法用于通知一个使用unix端口的服务器开始监听来自于路径的客户端连接.
+ path为指定的需要监听的路径,当对使用unix端口的服务器指定了需要监听的路径后,服务器将立即开始监听来自于该路径的客户端连接.
+ 这时触发该服务器的listening事件,可以使用listen方法的callback参数来指定listening事件触发时调用的回调函数,该回调函数不需要使用任何参数.

####方法三:
`server.listen(handle, [callback]);`
+ 这种形式的listen方法用于通知一个TCP服务器开始监听一个指定socket句柄的客户端来接该方法使用两个参数
+ (该句柄可以为一个TCP服务器对象,也可以为一个文件描述符,在WINDOWS操作系统中不支持对文件描述符的监听)
+ 第一个参数用于执行需要监听的socket句柄.当对TCP服务器指定了需要监听的socket句柄后,服务器端将立即开始监听来自于该socket句柄的客户端连接,这时触发该服务器的listening事件
+ 可以使用listen方法的callback参数来指定listening事件触发时调用的回调函数,该回调函数不需要任何参数.

如果不在上述三种戏不是个会的listen方法中使用callback参数,可以通过监听TCP服务器对象的listening事件,并且指定该事件触发时调用的回调函数的方法来指定TCP服务器开始监听时所需要执行的处理
server.on('listening', function(){})

## error
对TCP服务器指定需要监听的地址及端口时,如果该地址及端口已经被占用,将产生一个错误代码为`EADDRINUSE`的错误(表示用于监听的地址和端口被占用),同是将触发TCP服务器一个error事件,可以通过对error事件设置回调函数的方法指定该错误产生时需要执行的处理.
```
server.on('error', function(e){
    if(e.code === 'EADDRINUSE'){
        console.log('该地址及端口被占用,请修正')
    }    
})
```

## address
创建了TCP服务器之后,可以是使用TCP服务器的address方法来查看该服务器所监听的地址信息
```
var address = server.address();
```
该方法返回一个对象,其中具有以下的属性
+ port:TCP服务器监听的socket端口号
+ address:TCP服务器监听的地址,如127.0.0.1
+ family:一个标识了TCP服务器所监听的地址的是IPv4地址还是IPv6地址的字符串,例如`IPv4`

使用TCP服务器的`getConnections`方法查看当前与TCP服务器建立连接的客户端连接数量`server.getConnections(callback(err, count))`

TCP服务器对象的`maxConnections`属性将TCP对象的最大连接数设置为2,同时在控制台中输出设置后的`maxConnections`属性值,当当前客户端与服务器连接数等于该值时,不再接受新的客户端连接请求.

## close

每当有客户端与服务器端建立连接后,第一个命令行窗口中都将显示当前存在的客户端与TCP服务器之间的连接数量.

在一个新的命令行窗口中建立与被创建的TCP服务器之间的连接,TCP服务器将不再接收该连接,第一个命令行窗口中不会有任何变化.

可以使用TCP服务器的close方法显式指定服务器拒绝所有新的客户端连接
```
server.close([callback()])
```

在使用close方法时,并不会断开所有现存的客户端连接.当这些客户端连接被关闭时,TCP服务器将会自动关闭,同时触发TCP服务器的close事件.close的回调函数是否有参数都可以.

