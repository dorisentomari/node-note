## 创建TCP客户端

```node
var net = require('net');
var socket = new net.Socket([options]);
```
options对象与TCP服务器的options参数属性一样

#### 方法一
`socket.connect(port, [host], [connectListener])`

#### 方法二
`socket.connect(path, [connectListener]);`
此时socket端口有下边的几个属性
+ remoteAddress:连接另一端所使用的远程地址
+ remotePort:连接另一端所使用的端口号
+ localAddress:本地用于建立连接的地址
+ localPort:本地用于建立连接的端口号
socket端口对象可以被用来写入向客户端或服务器端发送的流数据,当流数据被写入后将立即发送到客户端或服务器.当需要写入流数据时,使用socket端口对象的write方法
`socket.write(data, [encoding], [callback]);`
该回调函数不需要参数

在一个快速的网络中,当数据量较少的时候,nodejs总是将数据直接发送到操作系统专用于发送数据的TCP缓存区中,然后从该TCP缓存区中取出数据发送个对象.在一个慢速的网络中或者需要发送大量数据的时,TCP客户端或服务器所发送的数据并不一定会立即被对方所接收,在这种情况下,nodejs会将这些数据缓存在u缓存队列中,在对方可以接收数据的情况下降缓存队列中的数据通过TCP缓存区发送给对象.socket端口对象的write方法返回一个布尔类型值,饭改数据直接被发送到TCP缓存区中时,该返回值为true,当数据首先被发送到缓存队列时,该返回值为false.当返回值为false且TCP缓存区中的数据已全部发送出去时,触发drain事件.
