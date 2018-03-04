# `Router([options])`
```javascript
let router = express.Router([options]);
```
+ `options`对象
+ `caseSensitive`,大小写敏感,默认不敏感
+ `mergeParams`,保留父路由器的必需参数值,如果父项和子项具有冲突的参数名称,则该子项的值将优先
+ `strict`,激活严格路由,默认禁用,禁用之后`/uu`正常访问,但是`/uu/`不可以访问

## 1. `router.all`
+ 全部调用
+ `router.all(path, [callback, ...] callback)`
```javascript
router.all('*', fn1, fn2...);
// 或者
router.all('*', fn1);
router.all('*', fn2);
// 或者
router.all('/user', fn3);
```

## 2. `router.METHOD`
+ `router.METHOD(path, [callback, ...] callback)`
+ 实际上就是`ajax`的各种请求方法
```javascript
router.get('/', (req, res, next) => {
	
})

router.post('/', (req, res, next) => {
	
})
```

### 3. `router.route(path)`
```javascript
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});

router.route('/users/:user_id')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  next();
})
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  // just an example of maybe updating the user
  req.user.name = req.params.name;
  // save user ... etc
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
})
```
## 4. `router.use`
### 4.1 使用路由
```javascript
var express = require('express');
var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function(req, res, next) {
  // ... maybe some additional /bar logging ...
  next();
});

// always invoked
router.use(function(req, res, next) {
  res.send('Hello World');
});

app.use('/foo', router);

app.listen(3000);
```
### 4.2 使用模块方法
```javascript
var logger = require('morgan');

router.use(logger());
router.use(express.static(__dirname + '/public'));
router.use(function(req, res){
  res.send('Hello');
});
```