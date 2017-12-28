# express()
> 创建一个 Express 应用.express() 是一个由 express 模块导出的入口（top-level）函数.

```node
var express = require('express');
var app = express();
```
## 0.0`express.static(root, [options])`
+ express.static,是Express内置的唯一一个中间件.是基于serve-static开发的,负责托管Express应用内的静态资源.
+ root,参数指的是静态资源文件所在的根目录.
+ **options,对象是可选的,支持以下属性**
+ dotfiles,String,服务`dotfiles`的选项.可能的值是`allow`,`deny`,`ignore`,默认值为`ignore`
+ maxAge,Boolean,以毫秒为单位设置`Cache-Control`标题头的最大属性或 ms格式的字符串,默认为0
+ etag,Boolean,启用或禁用`etag`生成
+ extensions,Mixed,设置文件扩展
+ index,Boolean,发送目录索引,设置`false`为禁用
+ redirect,Boolean,当路径是一个目录时,重定向到尾随`/`,
+ setHeaders,Function,设置`HTTP`标头以供文件使用的函数

## 0.1 Etag
> ETag是HTTP1.1中才加入的一个属性,用来帮助服务器控制Web端的缓存验证.它的原理是这样的,当浏览器请求服务器的某项资源(A)时, 服务器根据A算出一个哈希值(3f80f-1b6-3e1cb03b)并通过 ETag 返回给浏览器,浏览器把"3f80f-1b6-3e1cb03b" 和 A 同时缓存在本地,当下次再次向服务器请求A时,会通过类似 `If-None-Match: "3f80f-1b6-3e1cb03b"`的请求头把ETag发送给服务器,服务器再次计算A的哈希值并和浏览器返回的值做比较,如果发现A发生了变化就把A返回给浏览器(200),如果发现A没有变化就给浏览器返回一个304未修改.这样通过控制浏览器端的缓存,可以节省服务器的带宽,因为服务器不需要每次都把全量数据返回给客户端.

> 注：HTTP中并没有指定如何生成ETag,哈希是比较理想的选择.
# Application
## 1.1 基本的服务器
```node
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
```
## 1.2 `app.locals`
+ app对象的locals属性
+ app.locals.title = 'my express title';
+ app.locals.email = 'express@express.com';

```node
{ settings: { 
    'x-powered-by': true,
     etag: 'weak',
     'etag fn': [Function: wetag],
     env: 'development',
     'query parser': 'extended',
     'query parser fn': [Function: parseExtendedQueryString],
     'subdomain offset': 2,
     'trust proxy': false,
     'trust proxy fn': [Function: trustNone],
     view: [Function: View],
     views: 'E:\\Self\\point\\views',
     'jsonp callback name': 'callback' 
    },
    title: 'my express title',
    email: 'express@express.com'
}
```

## 1.3 `app.mountpath`(有问题)
+ mountpath 属性是安装子应用程序的路径模式
```node
var express = require('express')
var admin = express();
var app = express();
admin.get('/', function (req, res) {
    console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
    res.send('Admin Homepage');
})

var secret = express();
secret.get('/', function (req, res) {
    console.log(secret.mountpath);
    res.send('Admin Secret');
});

admin.use('/secr*t', secret);
app.use(['/adm*n', '/manager'], admin);

app.listen(3000)
```
## 1.4 `app.all(path, callback(req, res, next){...})`
+ `app.all('*', fn, fn...)`

## 1.5 `app.delete(path, callback [, callback ...])`
+ 将 HTTP 删除请求路由到具有指定回调函数的指定路径
```node
app.delete('/', function (req, res) {
  res.send('DELETE request to homepage');
});
```

## 1.6 `app.disable(name)`,`app.disabled(name)`,`app.able(name)`,`app.abled(name)`
+ 禁用某个属性
```node
//**diable**
app.set('username', 'express server');
console.log(app.get('username'));//express server

app.set('username', 'express server');
app.disable('username');
console.log(app.get('username'));//false
```

## 1.7 模板引擎`app.engine(ext, callback)`
+ 根据不同的模板引擎的扩展名,使用不同的模板
```node
app.engine('jade', require('jade').__express);
app.engine('html', require('ejs').renderFile);
```

## 1.8 `app.get()`
```node
app.set('title','text');
console.log(app.get('title'));// text
```

## 1.9 `app.get(path, callback [, callback ...])`
+ 将 HTTP 获取请求路由到具有指定回调函数的指定路径
```node
app.get('/', function (req, res) {
  res.send('GET request to homepage');
});
```

## 1.10 `app.listen(port, [hostname], [backlog], [callback])`
+ 监听端口,主机,最大连接,回调函数
```node
let express = require('express');
let app = express();

app.get('/', function(req, res){
    res.send('home page');
});

app.listen(3333, 'localhost', 100, function(err){
    if(err){
        console.log('error');
    }else{
        console.log('the http server is running at localhost:3333');
    }
});

```

## 1.11 `app.param([name],callback(req, res, next, id){...})`
> 将回调触发器添加到路由参数, 其中名称是参数的名称或它们的数组, 函数是回调函数.回调函数的参数是请求对象、响应对象、下一个中间件以及该参数的值 (按该顺序).
  
> 如果 name 是一个数组, 则回调触发器按声明的顺序注册在其中声明的每个参数.此外, 对于每个已声明的参数, 除了最后一个外, 回调中的下一个调用将调用下一个声明的参数的回调.对于最后一个参数, 调用 next 将调用当前正在处理的路由的下一个中间件, 就像如果名称只是一个字符串一样.

+ 参数是一个字符串
```node
app.param('id', function(req, res, next, id){
    console.log('called only once');
    next();
});

app.get('/user/:id', function(req, res, next){
    console.log('although this matches');
    next();
});

app.get('/user/:id', function(req, res){
    console.log('this matches too');
    res.send('end user id');
});
/**
called only once
although this matches
this matches too
*/
```

+ 参数是一个数组
```node
app.param(['id', 'page'], function(req, res, next, id){
    console.log('called only once', id);
    next();
});

app.get('/user/:id/:page', function(req, res, next){
    console.log('although this matches');
    next();
});

app.get('/user/:id/:page', function(req, res){
    console.log('this matches too');
    res.send('end user id');
});
/**
called only once kkk
called only once 555
although this matches
this matches too
*/
```

## 1.12 `app.path()`
+ 返回应用程序的规范化路径
```node
let express = require('express');
let app = express();
let blog = express();
let blogAdmin = express();

app.use('/blog', blog);
blog.use('/admin', blogAdmin);

console.log(app.path());
console.log(blog.path());
console.log(blogAdmin.path());
```

## 1.14 `app.render(view, [locals], callback(err,html){...})`
+ 回调函数返回视图的呈现 HTML

## 1.15 `app.route(path)`
+ 返回单个路由的实例
```node
app.route('/one')
    .all(function(req, res, next){
        console.log('route all');
        next();
    })
    .get(function(req, res, next){
        res.json({
            code: 2589,
            msg: 'route get msg'
        });
    })
    .post(function(req, res, next){
        res.send('this is route post send msg');
    });
```

## 1.16 `app.use([path,] callback(req, res, next){...})`
+ 在路径上装载中间件函数.如果未指定路径, 则默认为 "/"
+ 路径可以是表示路径、路径模式、匹配路径的正则表达式或其组合数组的字符串
+ `app.use()`中间件可以使用正则匹配路径,可以有多个中间件函数
+ 可使用的地方
```node
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(logger());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
```
+ 中间件示例
```node
app.use('/user/person', function(req, res, next) {
    console.log(req.originalUrl);// /user/person
    console.log(req.baseUrl);// /user/person
    console.log(req.path);// /
    next();
});
```
+ 如果使用了`app.use(callback())`,就不会触发`app.get('/', callback())`
```node
// this middleware will not allow the request to go beyond it
app.use(function(req, res, next) {
  res.send('Hello World');
})

// requests will never reach this route
app.get('/', function (req, res) {
  res.send('Welcome');
})
```