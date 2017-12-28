## 进程对象的方法与事件 
```node
var process = require('process');
var fs = require('fs');
console.log(process.memoryUsage());
```
+ `memoryUsage()`` 用于获取运行Node.js应用程序的进程的内存使用量,该方法不使用任何参数,返回一个对象,对象所拥有的属性如下
    * rss: 属性值为一个整数,表示运行Node.js应用程序的进程的内存消耗量,单位为字节
    * headTotal: 属性值为一个整数,表示为V8所分配的内存量,单位为字节
    * headUsed: 属性值为一个整数,表示V8的内存消耗量,单位为字节

+ `nextTick()` 用于将一个函数推迟到代码中所书写的写一个同步方法执行完毕时或异步方法的事件回调函数开始执行时调用
    * process.nextTick(callback)
    * nextTick()方法的作用于将setTimeout方法的事件参数设置为0的作用相同
    * 但是nextTick方法中指定的函数的调用速度要比setTimeout方法中指定的函数的调用速度快很多
```node
//test One
function foo(){
    console.log('foo');
}
setTimeout(foo, 0);
console.log('bar');
// ================ //
/*
bar
foo
*/
```

```node
// test Two
function foo(){
    console.log('foo');
}
process.nextTick(foo);
console.log('bar');
// ================ //
/*
bar
foo
*/
```

+ nextTick方法的一些非常重要的使用场景
**指定一个函数在一个同步方法执行完毕时立即被调用**

```
//test Three
var finish = function(){
    console.log('文件读取完毕');
}
process.nextTick(finish);
console.log(fs.readFileSync('./requestCurl.log').toString());
// ================ //
/*
先输出同步读取的文件内容,在输出"文件读取完毕"
*/
```

```
//test Four
function foo(){
     function beginAnotherTask(){
        var file = fs.createReadStream('./music/music.mp3');
        file.on('data', function(data){
            console.log('读取到%d字节.', data.length);
        })
     }
     process.nextTick(beginAnotherTask);
}

var file = fs.createReadStream('./music/music.mp3');
file.on('data', function(data){
    console.log('从music.mp3文件中读取到%d字节.', data.length);
})
foo();
// ================ //
/*
// 两个读取mp3文件的操作同步进行,且未被指定在beginAnotherTask函数中的操作首先执行(因为两个操作读取的是同一个文件)
*/
```


+ 在Node.js v0.10版本之后,允许通过nextTick方法实现递归
```node
process.nextTick(function foo(){
    process.nextTick(foo);
})
```

如果递归代码写错误,则上述代码很容易产生一个死循环,为避免应用程序阻塞在该死循环中,在Node.js中,提供了一个process.maxTickDepth属性,默认的属性值为1000.在Node.js v0.10版中,当递归深度达到process.maxTickDepth属性值之后,允许递归函数之外的代码继续执行.当Node.js v0.11版开始,当递归深度达到process.maxTickDepth属性值之后,应用程序不断提出警告,提示开发者改为使用JavaScript中的setImmediate方法


