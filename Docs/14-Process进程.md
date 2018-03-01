## Process
> 在Node.js中，只支持单线程。但是在应用程序中，如果只使用单线程进行操作，从接收请求开始到返回响应为止的这段时间内可能存在很长的一段等待时间。在这种场合下，如果能够使用多进程，则可以为每个请求分配一个进程，从而可以更好地使用服务器端的CPU资源。为了实现多线程处理，Node.js中提供了`child_process`模块与`cluster`模块，其中的`child_process`模块用于实现在Node.js应用程序中开启多个子进程，并在各个子进程中运行各种不同的命令或执行Node.js模块文件，可执行文件的处理，`cluster`模块用于实现在Node.js应用程序中开启多个子进程，在每个子进程中运行一个Node.js应用程序副本的处理。

## 1. 进程
### 1.1 进程对象的属性
+ `process.execPath`: 用于运行应用程序的可执行文件的绝对路径
+ `version`: Node.js的版本号
+ `versions`: Node.js及其各依赖的版本号
+ `platform`: 当前运行Node.js的平台
+ `stdin`: 用于读入标准输入流的对象。默认情况下，标准输入流处于暂停状态，比如恢复读取标准输入流`process.stdin.resume()`
+ `stdout`: 用于写入标准输出流的对象
+ `stderr`: 用于写入标准错误输出流的对象
    * 与其他写入流数据的对象不同，`process.stdout`对象与`process.stderr`对象的写数据操作是一种阻塞型操作
    * 只有当使用其他读取流数据的对象的`pipe`方法，并且将`process.stdout`对象或`process.stderr`对象作为目标对象的时候，`process.stdout`对象与`process.stderr`对象的写数据操作才是非阻塞型操作。
+ `argv`: 属性值为一个数组，包含了运行Node.js应用程序时所有命令行参数。
+ `env`: 运行Node.js应用程序的操作系统的信息
+ `config`: 包含了用于编译当前Node.js应用程序的可执行文件的配置选项的JavaScript描述
+ `pid`: 运行当前Node.js应用程序的进程PID
+ `title`: 运行当前Node.js应用程序命令行窗口的标题
+ `arch`: 运行当前Node.js应用程序的处理器架构，arm，ia32，x64等

### 1.2 进程对象的方法
#### 1.2.1 内存使用量`memoryUsage()`
+ 该方法不使用任何参数，返回一个对象，对象所拥有的属性如下
+ `rss`: 属性值为一个整数，表示运行Node.js应用程序的进程的内存消耗量，单位为字节
+ `headTotal`: 属性值为一个整数，表示为V8所分配的内存量，单位为字节
+ `headUsed`: 属性值为一个整数，表示V8的内存消耗量，单位为字节

#### 1.2.2 `nextTick()`方法
+ `process.nextTick(callback)`参数为被推迟的函数
+ 用于将一个函数推迟到代码中所书写的下一个同步方法执行完毕时，或异步方法的事件回调函数开始执行时调用。
+ 作用与将`setTimeout`方法的事件参数值指定为`0`的作用相同
+ 但是`nextTick()`方法中指定的函数的调用速度比`setTimeout`方法中指定的函数的调用速度快很多
+ 在读取完毕文件后调用`nextTick()`
```javascript
const process = require('process');
const fs = require('fs');
var finish = function () {
    console.log('文件读取完毕');
}
process.nextTick(finish);
console.log(fs.readFileSync('./fs.js').toString());
```
+ 指定两个耗时操作同步进行
```javascript
const process = require('process');
const fs = require('fs');
function foo() {
    process.nextTick(Task);
}
function Task() {
    var file = fs.createReadStream('./fs.js');
    file.on('data', (data) => {
        console.log('Task函数中，读取到字节长度:', data.length);
    })
}
var file = fs.createReadStream('./fs.js');
file.on('data', (data) => {
    console.log('全局中，读取到字节长度:', data.length);
});
foo();
```
+ 在Node.js中，提供了一个`process.maxTickDepth`属性，默认的属性值为1000，当递归深度达到`process.maxTickDepth`属性值之后，允许递归函数之外的代码继续执行，但是会发出警告，提醒开发者改用`setImmediate`方法

#### 1.2.3 `process.abort()方法` 
+ 向运行Node.js应用程序的进程发出`SIGABRT`信号，使进程异常终止，同时产生一个核心文件，该方法中不使用任何参数

#### 1.2.4 改变文件目录`process.chdir()`
+ 修改Node.js应用程序中使用的当前工作目录
+ `process.chdir(directory)`
+ 参数可以为一个字符串，用于指定当前工作目录，该目录可以为一个相对路径，也可以为一个绝对路径。如果指定路径不存在，报错。

#### 1.2.5 返回当前目录`process.cwd()`
```javascript
const process = require('process');
console.log('当前目录：' + process.cwd());
process.chdir('../');
console.log('上层目录：' + process.cwd());
```
#### 1.2.6 退出程序`process.exit()`
+ 退出运行Node.js应用程序的进程
+ 使用一个整数值参数，指定为操作系统提供退出代码，代码为`0`表示正常退出，不使用该参数时的默认参数值为`0`

#### 1.2.7 设置或返回进程的组`ID`
+ `process.getgid()` 返回运行Node.js应用程序的进程的组`ID`，该方法只有在非windows操作系统下有效，不使用任何参数
+ `process.setgid(id)` 用于设置运行Node.js应用程序的进程的组`ID`，该方法只有在非windows操作系统下有效，不使用任何参数
+ `setgid`方法中使用一个参数，参数值可以为一个整数类型的组`ID`，也可以为一个字符串类型的组名，如果指定组名，该组名将自动解析为组`ID`

#### 1.2.8 设置或返回进程的用户`ID`
+ `process.getuid()` 返回运行Node.js应用程序的进程的用户ID，该方法只有在非windows操作系统下有效，不使用任何参数
+ `process.setuid(id)` 用于设置运行Node.js应用程序的进程的用户ID，该方法只有在非windows操作系统下有效

#### 1.2.9 向进程发送信号
+ `process.kill(pid, [signal])`用于向进程发送信号
+ `pid`参数为必须指定参数，`signal`参数为可选参数，`pid`参数为一个整数，用于指定需要接收信号的进程`ID`，`signal`参数值为一个字符串，用于指定需要发送的信号，例如`SIGINT`或`SIGUSR1`,当不使用该参数时，默认参数值为`SIGTERM`，表示终止该进程 

#### 1.2.9 读取或修改进程的文件权限掩码
+ `umask([mask])`用于读取或修改运行Node.js应用程序的进程的文件权限掩码。
+ 子进程将继承父进程的文件权限掩码
+ 参数用于设定修改后的文件权限掩码，如果不使用参数，返回进程当前使用的文件的权限掩码
```javascript
const process = require('process');
var oldmask, newmask = 0644;
oldmask = process.umask(newmask);
console.log('修改前的掩码：', oldmask.toString(8));
console.log('修改后的掩码：', newmask.toString(8));
/****
 * 修改前的掩码： 0
 * 修改后的掩码： 644
 */
```

#### 1.2.10 时间
+ 返回当前运行时间(秒)`process.uptime()`
+ 测试一个代码运行时间`process.hrtime()`
```javascript
const process = require('process');
let time = process.hrtime();
for (let i = 0; i < 1000; i++) { }
var endTime = process.hrtime(time);
console.log(endTime);
```

### 1.3 进程对象的事件
#### 1.3.1 退出事件`exit`
```javascript
const process = require('process');
process.on('exit', () => {
    console.log('Node.js程序退出');
});
process.exit();
```

#### 1.3.2 异常事件`uncaughtException`
```javascript
const process = require('process');
process.on('uncaughtException', (err) => {
    console.log('捕获到一个异常错误', err);
});
undefinedFunction();
```

#### 1.3.3 各种信号事件
+ 当运行Node.js应用程序的进程接收到各种事件是，会触发各种信号事件
+ 可以通过对这些事件进行监听并指定事件回调函数的方法对该信号进行处理，回调函数不需要任何参数。

### 1.4 创建多进程应用程序
#### 1.4.1 使用`spawn`方法开启子进程
+ `child_process.spawn(command, [args], [options])`
+ `command`参数值为一个字符串，指定需要运行的命令
+ `args`为一个数组，存放了所有运行该命令时所需要使用的参数，参数的指定顺序与数组中的元素顺序保持一致，默认为空
+ `option`参数值为一个对象，用于指定开启子进程时所使用的选项
    * `cwd`: 指定子进程当前的工作目录
    * `stdio`: 设置子进程的标准输入/输出
    * `customFds`: 数组，子进程的标准输入/输出指定文件描述符
    * `env`: 为子进程指定环境变量，不指定时，没有可以使用的环境变量
    * `detached`: 布尔值，该子进程为一个进程组中的领头进程
    * `uid`: 设置子进程的用户`ID`
    * `gid`: 设置子进程的组`ID`
```javascript
const process = require('process');
const cp = require('child_process');
let sp1 = cp.spawn('node', ['test1.js', 'one', 'two', 'three'], {cwd: './one'})
let sp2 = cp.spawn('node', ['test2.js'], {stdio: 'pipe'});
sp1.stdout.on('data', (data)=>{
    console.log('子进程 sp1 标注输出：', data);
    sp2.stdin.write(data);
});

sp1.on('exit', (code, signal)=>{
    console.log('子进程 sp1 退出，退出代码为', code);
    process.exit();
});

```