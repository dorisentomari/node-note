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

## socket端口对象

在node.js中,使用net.Socket代表一个socket端口对象,在使用createServer方法的connectionListener参数所指定的回调函数(当客户端与服务器端建立连接时调用)的参数值即为一个被自动创建的net.Socket对象(代表的服务器所监听的端口对象),在对TCP服务器所指定的connection事件回调函数的参数值同样为一个被自动创建的net.Socket对象(代表TCP服务器所监听的端口对象)

与TCP服务器独享的address方法相类似,可以利用socket端口对象的address方法获取该socket端口对象相关的地址信息
```
var address = socket.address();
```
该方法返回一个对象,其中具有以下的属性
+ port:TCP服务器监听的socket端口号
+ address:TCP服务器监听的地址,如127.0.0.1
+ family:一个标识了TCP服务器所监听的地址的是IPv4地址还是IPv6地址的字符串,例如`IPv4`

socket端口对象可被用来读取客户端发送的流数据,每次接收到客户端发送的流数据时触发data事件,可通过对该事件进行监听并且指定回调函数的方法来指定当服务器端监听的socket端口对象接收到客户端发送的数据时所需要执行的处理.

```
socket.on('data', function(data){})
```

在该回调函数中,使用给一个参数,参数值为一个Buffer对象(在未使用socket端口对象的setEncoding方法指定编码时)或者一个字符串对象(在使用socket端口对象的setEncoding方法指定编码方式后)

data获取到的是一个存放了服务到的数据的缓存区对象,如果我们在对data事件进行监听之后使用编码格式,将在控制台中以字符串形式输出读取到的数据.

方法一:
```
socket.setEncoding('utf8');
socket.on('data', function(data){
    console.log(data)
})
```

方法二:
```
socket.on('data', function(data){
    console.log(data.toString())    
})
```

#### pipe
可以通过socket对象的pipe方法将客户端发送的流数据写到文件等其他目标对象中
`socket.pipe(destination, [options]);`
pipe方法有两个参数,其中destination参数为必须输入参数,options参数为可选参数.destination参数值必须为一个可用于写入流数据的对象.options参数值为一个对象,可以在该对象中使用一个布尔类型的end属性,如果该属性值为true,则当数据全被读取完毕时立即结束写操作,如果该属性值为false,目标对象中可以被继续写入新的数据,该属性的默认值为true;
```
var net = require('net');
var file = require('fs').createWriteStream('./message.txt');
var server = net.createServer();
server.on('connection', function(socket){
    socket.pipe(file, {end: false});
    socket.on('end', function(){
        file.end('byebye');    
    })
});
server.listen(9999, 'localhost');
```

使用unpipe方法取消目标对象的写入操作
`socket.unpipe([destination])`

#### pause
可以使用socket端口对象的pause方法暂停data事件的触发,这时服务器端将把每一个客户端发送的数据暂存在一个单独的缓存区中.
`socket.pause();`
在使用了pause方法暂停data事件的触发后,可以使用socket端口对象的resume方法恢复data事件的触发,这时将读取被缓存的该客户端的数据.
`socket.resume();`

#### timeout
通过监听socket端口对象的tiemout事件并且指定该事件回调函数的方法来指定当客户端连接超时时所需要执行的处理
```
server.on('connection', function(socket){
    socket.setTimeout(10*1000);
    socket.pause();
    socket.on('timeout', function(){
        socket.resume();
        socket.pipe(file);    
    });    
    socket.on('data', function(data){
        socket.pause();    
    })
})
```
