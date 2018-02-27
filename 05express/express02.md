## 2. request
> req对象表示HTTP请求,并且具有请求查询字符串,参数,正文,http标题头等属性
```javascript
app.get('/user/:id', function (req, res) {
    res.send('user ' + req.params.id);
});
```
## 2.1 `req.app()`
+ `app`保存了很多对使用中间件的`express`应用程序实例的引用
```javascript
// one.js
module.exports = function (req, res) {
    res.send('The views directory is ' + req.app.get('views'))
}

// app.js
app.get('/one', require('./one.js'))
```

## 2.2 `req.baseUrl`
+ 挂载在路由实例上的URL路径
```javascript
let greet = express.Router();

greet.get('/one', function (req, res) {
    console.log(req.baseUrl);// /greet
    res.send('hello')
});

app.use('/greet', greet);
```

## 2.3 `req.body`和`req.cookies`
+ 包含在请求正文中提交的数据的键值对,默认情况下,它是未定义的,当您使用体解析中间件(如`body-parser`和`multer`)时,它将被填充
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
let app = express();

app.use(bodyParser.json());// parsing application/json
app.use(bodyParser.urlencoded({extended: true}));// parsing application/x-www-form-urlencoded
app.use(cookieParser())
app.post('/', function (req, res) {
    console.log('Cookies: ', req.cookies);
    console.log('Signed Cookies: ', req.signedCookies);
    console.log('req.body', req.body);
    res.json(req.body);
});

app.post('/', function (req, res) {
    console.log(req.body);
    res.json(req.body);
});

app.listen(3000);
```

## 2.4 `fresh`,`hostname`,`ip`,`ips`,`protocol`
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
let app = express();

app.use(bodyParser.json());// parsing application/json
app.use(bodyParser.urlencoded({extended: true}));// parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.get('/files/download/:user', function (req, res) {
    console.log('req.fresh:', req.fresh);
    console.log('req.stale:', req.stale);
    console.log('req.hostname:', req.hostname);
    console.log('req.ip:', req.ip);
    console.log('req.ips:', req.ips);
    console.log('req.protocol:', req.protocol);
    console.log('req.url:', req.url);
    console.log('req.originalUrl:', req.originalUrl);
    console.log('req.xhr:', req.xhr);
    console.log('req.params:', req.params);
    console.log('req.path:', req.path);
    res.send(req.body);
});

app.listen(3000);
/***
request url: http://localhost:1111/files/download/mark
req.fresh: false
req.stale: true
req.hostname: localhost
req.ip: 127.0.0.1
req.ips: []
req.protocol: http
req.url: /files/download/mark// req.url是javascript的http模块的属性,不是Express的
req.originalUrl: /files/download/mark
req.subdomains: []
req.xhr: false
req.params: { user: 'mark' }
req.path: /files/download/mark
***/
```
## 2.5 `req.route`
```javascript
app.get('/user/:id?', function(req, res){
    console.log(req.route);
    res.send('send get message route')
});
/***
req.route: Route {
  path: '/files/download/:user',
  stack:
   [ Layer {
       handle: [Function],
       name: '<anonymous>',
       params: undefined,
       path: undefined,
       keys: [],
       regexp: /^\/?$/i,
       method: 'get' } ],
  methods: { get: true } }
```
