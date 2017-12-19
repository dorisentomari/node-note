# 2. request
> req对象表示 HTTP 请求, 并且具有请求查询字符串、参数、正文、http 标头等属性
```node
app.get('/user/:id', function (req, res) {
    res.send('user ' + req.params.id);
});
```
## 2.1 `req.app()`
+ app保存了很多对使用中间件的 express 应用程序实例的引用
```node
// one.js
module.exports = function (req, res) {
    res.send('The views directory is ' + req.app.get('views'))
}

// app.js
app.get('/one', require('./one.js'))
```

## 2.2 `req.baseUrl`
+ 挂载在路由实例上的URL路径
```node
let greet = express.Router();

greet.get('/one', function (req, res) {
    console.log(req.baseUrl);// /greet
    res.send('hello')
});

app.use('/greet', greet);
```

## 2.3 `req.body`和`req.cookies`
+ 包含在请求正文中提交的数据的键值对,默认情况下,它是未定义的,当您使用体解析中间件(如`body-parser`和`multer`)时,它将被填充
```node
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());// parsing application/json
app.use(bodyParser.urlencoded({extended: true}));// parsing application/x-www-form-urlencoded
app.use(cookieParser()); // parsing cookies
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
```
