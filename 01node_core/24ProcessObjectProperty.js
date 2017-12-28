/*进程对象的属性*/
var process = require('process');

// execPath: 属性值为用来运行应用程序的可执行文件的绝对路径.
console.log(process.execPath);// /root/.nvm/versions/node/v8.9.0/bin/node

// version: 属性值为Node.js的版本号
console.log(process.version);// v8.9.0

// versions: 属性值为Node.js及其各依赖的版本号
console.log(process.versions);
/*
{ http_parser: '2.7.0',
  node: '8.9.0',
  v8: '6.1.534.46',
  uv: '1.15.0',
  zlib: '1.2.11',
  ares: '1.10.1-DEV',
  modules: '57',
  nghttp2: '1.25.0',
  openssl: '1.0.2l',
  icu: '59.1',
  unicode: '9.0',
  cldr: '31.0.1',
  tz: '2017b' }
*/

// platform: 属性值为当前运行Node.js的平台
console.log(process.platform);// linux

// stdin: 属性值为一个可用于读入标准输入流的对象，默认情况下，标准输入流处于暂停状态，必须使用process.stdin.resume()方法恢复读取标准输入流数据
// console.log(process.stdin);// 一个有很多属性的对象

// stdout: 属性值为一个可用于读入标准输出流的对象
// console.log(process.stdout);// 一个有很多属性的对象

// stderr: 属性值为一个可用于写入标准错误输出流的对象
// 与其他用于写入数据流的对象不同的是，process.stdout对象与process.stderr对象的写数据操作是一种阻塞型操作，只有当使用其他读物流数据的对象的pipe方法，并且将process.stdout对象或process.stderr对象作为目标对象的时候，process.stdout对象与process.stderr对象的写数据操作才是非阻塞型操作。

// argv: 属性值为一个数组，其中包含了运行了Node.js应用程序时的素有命令行参数。数组中的第一个元素为node,第二个元素为运行的脚本文件名,第三个元素开始为其他命令行参数,例如针对node app.js one two three four命令来说，argv数组中的内容应该是['node', 'app.js', 'one', 'two', 'three', 'four']
console.log(process.argv);
// 命令行 node ProcessObjectProperty.js
/*
[ '/root/.nvm/versions/node/v8.9.0/bin/node',
  '/root/Desktop/files/node/04node_files/24ProcessObjectProperty.js' ]

*/

// 命令行 node ProcessObjectProperty.js one two three four
/* 
[ '/root/.nvm/versions/node/v8.9.0/bin/node',
  '/root/Desktop/files/node/04node_files/24ProcessObjectProperty.js',
  'one',
  'two',
  'three',
  'four' ]
*/ 

// env: 属性值为一个对象，包含了运行Node.js应用程序的操作系统环境信息
// console.log(process.env);

// config: 属性值为一个对象，其中包含了用于编译当前Node应用程序的可执行文件的配置选项的JavaScript描述
// console.log(process.config);

// pid: 属性值为运行当前Node.js应用程序的进程的PID
console.log(process.pid);// 3155

// title: 属性值为运行Node.js应用程序的命令行窗口的标题
console.log(process.title);//node

// arch: 属性值为运行Node.js应用程序的处理器架构
console.log(process.arch);//x64


process.stdin.resume();
process.stdin.on('data', function(chunk){
    process.stdout.write('进程接收到数据:'+ chunk);
});

process.argv.forEach(function(val, index, array){
    console.log('index:', index, 'val:', val);
})
/*
index: 0 val: /root/.nvm/versions/node/v8.9.0/bin/node
index: 1 val: /root/Desktop/files/node/04node_files/24ProcessObjectProperty.
*/