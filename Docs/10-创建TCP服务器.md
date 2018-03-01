## 1.创建TCP服务器
+ `let server = net.createServer([options], [connectionListener]);`
+ `createServer`方法返回被创建的TCP服务器
+ `options`参数
`options`参数值为一个对象,可以在给兑现各种使用一个布尔类型的`allowHalfOpen`属性,当为`false`时,当TCP服务器接收到客户端发送的一个`FIN`包时将会回发一个`FIN`包.当为`true`时,TCP服务器接收到客户端发送的`FIN`包时不回发`FIN`包,这使得TCP服务器可以继续向客户端发送数据,但是不会继续接收客户端发送的数据,必须调用`end`方法来关闭该`socket`连接.

+ `connectionListener`参数用于指定客户端与服务器端建立起来时所要调用的回调函数.

```javascript
const net = require('net');
let server = net.createServer(false, function (socket) {});
```

## 2. 建立连接

+ 当客户端与服务器建立连接时,触发`connection`事件,我们可以通过对`connection`事件进行监听,并且指定该事件的返回函数的方法来指定当客户端与服务器建立连接时所需要执行的处理

`server.on('connection', function(socket){})`
+ 回调函数中的参数为该TCP服务器监听的`socktet`端口对象

+ 在创建了TCP服务器之后,可以用`listen`方法通知服务器开始监听客户端连接,有三种指定的方法

### 2.1 `listen`方法一:
`server.listen(port, [host], [backlog], [callback]);`
+ `port`为必须要指定的参数,为`0`时将为TCP分配一个随机端口号.
+ `host`为指定需要监听的IP地址或主机名,如果省略,服务器将锦亭来自任何IPv4地址的客户端连接
+ `backlog`为一个整数值,用于指定位于等待队列中的客户端连接的最大数量,一旦超过这个长度,TCP服务器将开始拒绝来自新的客户端的连接请求,参数值默认为`511`
当对TCP服务器制定了需要监听的地址和端口后,服务器将立即开始监听来自于该地址及端口的客户端连接,这时触发该服务器的`listening`事件,可使用`listen`方法的`callback`参数来指定`listening`事件触发时调用的回调函数,该回调函数中不使用任何参数

### 2.2 `listen`方法二:
`server.listen(path, [callback]);`
+ 这种形式的`listen`方法用于通知一个使用`unix`端口的服务器开始监听来自于路径的客户端连接.
+ `path`为指定的需要监听的路径,当对使用`unix`端口的服务器指定了需要监听的路径后,服务器将立即开始监听来自于该路径的客户端连接.
+ 这时触发该服务器的`listening`事件,可以使用`listen`方法的`callback`参数来指定`listening`事件触发时调用的回调函数,该回调函数不需要使用任何参数.

### 2.3 `listen`方法三:
`server.listen(handle, [callback]);`
+ 这种形式的`listen`方法用于通知一个TCP服务器开始监听一个指定`socket`句柄的客户端来接该方法使用两个参数
+ (该句柄可以为一个TCP服务器对象,也可以为一个文件描述符,在WINDOWS操作系统中不支持对文件描述符的监听)
+ 第一个参数用于执行需要监听的`socket`句柄.当对TCP服务器指定了需要监听的`socket`句柄后,服务器端将立即开始监听来自于该`socket`句柄的客户端连接,这时触发该服务器的`listening`事件
+ 可以使用`listen`方法的`callback`参数来指定`listening`事件触发时调用的回调函数,该回调函数不需要任何参数.

如果不在上述三种形式的`listen`方法中使用`callback`参数,可以通过监听TCP服务器对象的`listening`事件,并且指定该事件触发时调用的回调函数的方法来指定TCP服务器开始监听时所需要执行的处理`server.on('listening', function(){})`

## 3. error
对TCP服务器指定需要监听的地址及端口时,如果该地址及端口已经被占用,将产生一个错误代码为`EADDRINUSE`的错误(表示用于监听的地址和端口被占用),同是将触发TCP服务器一个`error`事件,可以通过对`error`事件设置回调函数的方法指定该错误产生时需要执行的处理.
```javascript
const net = require('net');
let server = net.createServer(false, function (socket) {
	// 这里的socket参数就是一个socket对象
});
server.on('error', function (e) {
    if (e.code === 'EADDRINUSE') {
        console.log('该地址及端口被占用,请修正')
    }
});
```

## 4. address
+ 创建了TCP服务器之后,可以是使用TCP服务器的`address`方法来查看该服务器所监听的地址信息
```javascript
let address = server.address();
```
该方法返回一个对象,其中具有以下的属性
+ `port`:TCP服务器监听的`socket`端口号
+ `address`:TCP服务器监听的地址,如`127.0.0.1`
+ `family`:一个标识了TCP服务器所监听的地址的是`IPv4`地址还是`IPv6`地址的字符串,例如`IPv4`

使用TCP服务器的`getConnections`方法查看当前与TCP服务器建立连接的客户端连接数量`server.getConnections(callback(err, count))`

TCP服务器`server`对象的`maxConnections`属性将TCP对象的最大连接数设置为2,同时在控制台中输出设置后的`maxConnections`属性值,当当前客户端与服务器连接数等于该值时,不再接受新的客户端连接请求.

## 5. close
+ 每当有客户端与服务器端建立连接后,第一个命令行窗口中都将显示当前存在的客户端与TCP服务器之间的连接数量.
+ 在一个新的命令行窗口中建立与被创建的TCP服务器之间的连接,TCP服务器将不再接收该连接,第一个命令行窗口中不会有任何变化.
+ 可以使用TCP服务器的`close`方法显式指定服务器拒绝所有新的客户端连接
```javascript
server.close([callback()])
```
+ 在使用`close`方法时,并不会断开所有现存的客户端连接.当这些客户端连接被关闭时,TCP服务器将会自动关闭,同时触发TCP服务器的`close`事件，`close`的回调函数是否有参数都可以.

## 6. socket端口对象
+ 在Node.js中,使用`net.Socket`代表一个`socket`端口对象,在使用`createServer`方法的`connectionListener`参数所指定的回调函数(当客户端与服务器端建立连接时调用)的参数值,即为一个被自动创建的`net.Socket`对象(代表的服务器所监听的端口对象),在对TCP服务器所指定的`connection`事件回调函数的参数值同样为一个被自动创建的`net.Socket`对象(代表TCP服务器所监听的端口对象)
+ 与TCP服务器独享的`address`方法相类似,可以利用`socket`端口对象的`address`方法获取该`socket`端口对象相关的地址信息
```node
let address = socket.address();
```
该方法返回一个对象,其中具有以下的属性
+ `port`:TCP服务器监听的`socket`端口号
+ `address`:TCP服务器监听的地址,如`127.0.0.1`
+ `family`:一个标识了TCP服务器所监听的地址的是`IPv4`地址还是`IPv6`地址的字符串,例如`IPv4`
+ `socket`端口对象可被用来读取客户端发送的流数据,每次接收到客户端发送的流数据时触发`data`事件,可通过对该事件进行监听并且指定回调函数的方法来指定当服务器端监听的`socket`端口对象接收到客户端发送的数据时所需要执行的处理.

```javascript
socket.on('data', function (data) {});
```
在该回调函数中,使用给一个参数,参数值为一个`Buffer`对象(在未使用`socket`端口对象的`setEncoding`方法指定编码时)或者一个字符串对象(在使用`socket`端口对象的`setEncoding`方法指定编码方式后)
`data`获取到的是一个存放了服务到的数据的缓存区对象,如果我们在对`data`事件进行监听之后使用编码格式,将在控制台中以字符串形式输出读取到的数据.

### 6.1 方法一:
```javascript
const net = require('net');
let server = net.createServer(false, function (socket) {
	socket.setEncoding('utf8');
    socket.on('data', function (data) {
        console.log(data);
    });
});
```

### 6.2 方法二:
```javascript
const net = require('net');
let server = net.createServer(false, function (socket) {
	socket.on('data', function (data) {
        console.log(data.toString());
    });
});
```

## 7. pipe
+ 可以通过`socket`对象的`pipe`方法将客户端发送的流数据写到文件等其他目标对象中
+ `socket.pipe(destination, [options]);`
+ `destination`参数为必须输入参数,`options`参数为可选参数.`destination`参数值必须为一个可用于写入流数据的对象.`options`参数值为一个对象,可以在该对象中使用一个布尔类型的`end`属性,如果该属性值为`true`,则当数据全被读取完毕时立即结束写操作,如果该属性值为`false`,目标对象中可以被继续写入新的数据,该属性的默认值为true;
```javascript
const net = require('net');
let file = require('fs').createWriteStream('./message.txt');
let server = net.createServer();
server.on('connection', function (socket) {
    socket.pipe(file, {
        end: false
    });
    socket.on('end', function () {
        file.end('byebye');
    });
});
server.listen(9999, 'localhost');
```

+ 使用`unpipe`方法取消目标对象的写入操作
```javascript
socket.unpipe([destination]);
```

## 8. pause
可以使用`socket`端口对象的`pause`方法暂停`data`事件的触发,这时服务器端将把每一个客户端发送的数据暂存在一个单独的缓存区中.
`socket.pause();`
在使用了pause方法暂停data事件的触发后,可以使用socket端口对象的resume方法恢复data事件的触发,这时将读取被缓存的该客户端的数据.
`socket.resume();`

## 9. timeout
通过监听`socket`端口对象的`timeout`事件并且指定该事件回调函数的方法来指定当客户端连接超时时所需要执行的处理
```javascript
const net = require('net');
let server = net.createServer();
server.on('connection', function (socket) {
    socket.setTimeout(10 * 1000);
    socket.pause();
    socket.on('timeout', function () {
        socket.resume();
        socket.pipe(file);
    });
    socket.on('data', function (data) {
        socket.pause();
    });
});
```

## 10. 一个基本的TCP服务器
```javascript
const net = require('net');
let server = net.createServer(function (socket) {
	console.log(socket);
	let address = socket.address();
	console.log('socket端口对象的地址信息为%j', address);
	// socket端口对象的地址信息为{"address":"127.0.0.1","family":"IPv4","port":2596}
	socket.setEncoding('utf8');
	socket.on('data', function (data) {
		console.log(data);
		console.log('已接收到的字节数据长度', socket.bytesRead);
		/**
		 * GET / HTTP/1.1
		 * User-Agent: curl/7.29.0
		 * Host: localhost:2596
		 * Accept:      // 属性值为"星号斜线星号"，因为会与注释冲突，所以没写
		 *
		 *
		 * 已接收到的字节数据长度 78
		 * */
	});
	// 可以通过socket对象的pipe方法将客户端发送的流数据写到文件等其他目标对象中
	socket.pipe(file);
	socket.on('end', function () {
		console.log('客户端连接已关闭');
		// 当客户端连接关闭时，输出"客户端连接已关闭"
	})
});

server.getConnections(function (err, count) {
	console.log('当前存在' + count + '个客户端连接');
	server.maxConnections = 2;// 设置最大连接为2
	console.log('客户端与服务器端已建立连接');
});

server.close(function () {
	console.log('TCP服务器被关闭');
});

server.on('error', function (e) {
	if (e.code === 'EADDRINUSE') {
		console.log('该地址及端口被占用，请修正')
	}
});

let address = server.address();

server.listen(2596, 'localhost', 256, function () {
	console.log('服务器开始监听');
});
```