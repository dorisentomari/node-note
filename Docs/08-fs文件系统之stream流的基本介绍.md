## 9. `stream`流
+ fs模块中集中文件读写方法的区别

|用途 |使用异步方式|使用同步方式|
| -------- | ----- | ---- |
|将文件完整读入缓存区|readFile|readFileSync|
|将文件部分读入缓存区|read|readSync|
|将数据完整写入文件 |writeFile|writeFileSync|
|将缓存区中的部分内容写入文件|write|writeSync|

> 在使用`readFile`或者`readFileSync`读取文件内容时，Node.js首先将文件内容完整地读入缓存区，再从缓存区中读取文件内容。在使用`writeFile`或者`writeFileSync`方法写入文件内容时，Node.js首先将该文件内容读入缓存区，然后一次性将缓存区中内容写入到文件中。也就是说，在使用`readFile`或者readFileSync`读取文件内容或者使用`writeFile`或者`writeFileSync`写入文件内容时，Node.js会将该文件内容视为一个整体，为其分配缓存区并且一次性将文件内容读取到缓存区。在这期间，Node.js不再执行任何其他处理。

> 如果使用`read`或者`readSync`方法读取文件内容，Node.js将不断地将文件中一小块内容读入缓存区，最后从缓存区中读取文件内容，如果使用`write`或者`writeSync`写入文件内，Node.js将实行以下过程：1.将需要书写的数据书写到一个内容缓冲区；2. 待缓冲区写满后再讲该缓冲区中内容写入到文件中；3. 重复执行过程1和过程2，直到数据全部写入文件为止。也就是说，如果使用`read`或者`readSync`读取文件内容或者使用`write`或者`writeSync`写入文件，在读写文件过程中允许Node.js执行其他操作。

+ `流`的概念
> 在一个应用程序中，流是一组有序的，有起点和终点的字节数据的传输手段。在应用程序中各种对象之间交换与传输数据的时候，总是先将对象中所包含的数据转换为各种形式的流数据(字节数据)，再通过流的传输，到达目的对象后再将流数据转换为该对象中可以使用的数据。

> 在Node.js中，使用各种实现了`stream.Readable`接口的对象来讲对象数据读取为流数据，所有这些对象都是继承了`EventEmitter`类的实例对象，在读取数据的过程中，将可能触发各种事件。

> 在Node.js中，可以使用`flowing`模式与非`flowing`模式来读取数据，当使用`flowing`模式时，将使用操作系统的内部`I/O`机制来读取数据。这将允许你以最快的速度来读取数据。当使用非`flowing`模式时，必须显式调用对象的`read`方法来读取数据。

+ Node.js中各种用于读取数据的对象

|对象 |描述|
| -------- | ----- |
|fs.ReadStream|用于读取文件|
|http.IncomingMessage|代表客户端请求或服务器端响应|
|net.Socket |代表一个socket端口对象|
|child.stdout|用于创建子进程的标准输出流。如果子进程和父进程共享输入输出流，则子进程的标准输出流被废弃|
|child.stderr|用于创建子进程的标准错误输出流。如果子进程和父进程共享输入输出流，则子进程的标准错误输出流被废弃|
|process.stdin|用于创建进程的标准输入流|
|Gzip,Deflate,DeflatRaw| 用于实现数据压缩|

### 9.1 使用`ReadStream`对象读取文件
+ `fs.createReadStream(path, [options])`
+ `options`参数
	* `flags`: 'r',//default,
	* `encoding`: 'utf8', //base64, ascii, null(default),
	* `autoClose`: true(default), //false
	* `start`: 使用整数值来指定文件的开始读取位置		
	* `end`: 使用整数值来指定文件的结束读取位置
```javascript
const fs = require('fs');
let filename = './one.js'
let file = fs.createReadStream(filename, {
    start: 0,
    end: 100,
    encoding: 'utf8'
});

file.on('open', (fd) => {
    console.log('open file and start read this file stream..');
});

file.pause(); // 暂停读取文件流

file.on('data', (data) => {
    console.log(`读取到文件内容, ${data}`);
});

file.resume(); // 恢复读取文件流

file.on('end', () => {
    console.log('文件读取结束');
});

file.on('close', () => {
    console.log('文件关闭');
});

file.on('error', (err) => {
    console.log(`文件读取错误, ${err}`);
});
/***
 * open file and start read this file stream..
 * 读取到文件内容, hello
 * 文件读取结束
 * 文件关闭
 */
```

### 9.2 使用`WriteStream`对象写入文件
+ `fs.createWriteStream(path, [options])`
```javascript
const fs = require('fs');
let readFilename = './readFilename.js';
let writeFileName = './writeFileName.js';
let readFile = fs.createReadStream(readFilename, {
    start: 0,
    end: 100,
    encoding: 'utf8'
});
let writeFile = fs.createWriteStream(writeFileName);
readFile.on('data', (data) => {
    writeFile.write(data, () => {
        console.log('write writeFileName.js');
        console.log(data);
    })
});

readFile.on('open', (fd) => {
    console.log(`open readFilename.js`);
});

readFile.on('end', () => {
    writeFile.end('byebye', () => {
        console.log('writeFile.js end');
        console.log(`${writeFile.bytesWritten}`)
    });
});
/***
 * open readFilename.js
 * write writeFileName.js
 * console.log('this is readFilename.js');
 * writeFile.js end
 * 45 
 */
```