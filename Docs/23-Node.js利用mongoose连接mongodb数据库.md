## Node.js利用`mongoose`连接`mongodb`数据库
> Node.js连接`mongodb`数据库有很多种方法，通过`mongoose`模块引入是其中的一个方法
+ 代码组织结构
```
|---|根目录
|---|---|connect.js(mongoose测试连接)
|---|---|user.js(定义user数据表)
|---|---|operate.js(定义mongodb的增删改查功能)
|---|---|login.js(Node后台调用operate.js文件的方法处理数据)
```

## 1. 引入`mongoose`测试连接
> 当前使用的`mongoose`版本为`4.13.7`
+ 该文件为`connect.js`
### 1.1 代码部分
```javascript
const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/infos";
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, { useMongoClient: true });
mongoose.connection.on("connected", () => {
    console.log("mongodb数据库连接成功")
});
mongoose.connection.on("error", (error) => {
    console.log("mongodb数据库连接失败", error)
});
module.exports = mongoose;
```
### 1.2 代码分析
#### 1.2.1 引入`mongoose`模块
+ `const mongoose = require("mongoose");`
#### 1.2.2 获取`mongodb`的本机地址
+ `const DB_URL = "mongodb://127.0.0.1:27017/infos";`
+ `127.0.0.1`是本地`IP`地址
+ `27017`是`mongodb`的服务启动端口
+ `infos`是`mongodb`的一个数据集合名字
    * `mongodb`可以有很多数据集合，每个集合中可以有很多数据表。
    * 类比一下：你有一个巨型停车场(`mongodb`)，里边分了不同的停车区(`集合`，这里的`infos`)，每个停车区可以停很多车((下文提到的`user`)，相当于每个数据集合里边可以有很多张数据表)。
+ 如果需要给`mongodb`加上用户及密码，可以这样
    * `const DB_URL = "mongodb://username:password@127.0.0.1:27017/infos";`
    * 其中`username`为用户名，中间英文`:`，`password`为密码，其余不变
#### 1.2.3 连接数据库成功
+  `mongoose.connection.on("connected", callback())`
+ 数据库连接成功后，会在控制台输出`mongodb数据库连接成功`
#### 1.2.4 连接数据库失败
+ `mongoose.connection.on("error", callback())`
+ 数据库连接成功后，会在控制台输出`mongodb数据库连接失败`和错误信息
#### 1.2.5 导出`mongoose`模块
+ `module.exports = mongoose;`

## 2. 定义每张数据表的字段
+ 该文件为`user.js`
### 2.1 代码介绍
```javascript
const mongoose = require('mongoose');
const db = require('./connect.js');
const userSchema = new mongoose.Schema({
    number: { type: Number},
	email: { type: String },
	password: { type: String },
	rePassword: { type: String },
	mobile: { type: String },
	question: { type: String },
	answer: { type: String },
});
let userModel = db.model('user', userSchema);
module.exports = userModel;
```
### 2.2 代码分析
#### 2.2.1 引入`mongoose`模块
+ `const mongoose = require("mongoose");`
#### 2.2.1 引入连接`mongodb`数据库的模块
+ `const db = require('./connect.js');`
#### 2.2.2 定义`Schema`
+ `const userSchema = new mongoose.Schema({})`
+ 通过`mongoose`对象的`Schema`属性创建一个`Schema`对象
> `Schema`原意为`架构`
> 在`mongodb`中，每一个数据字段都要有固定的数据类型，所以`Schema`在`mongoose`中的意思为，每一张数据表对应的字段的数据类型
+ `Schema`所能够拥有的数据类型有以下几个
    * `String`
    * `Number`
    * `Date`
    * `Buffer`
    * `Boolean`
    * `Mixed`
    * `ObjectId`
    * `Array`
+ 字段介绍，以`number`字段为例
    * `type`是该字段的数据类型
    * `default`是该字段的默认值
    * 还有很多其他的属性，以及可以自定义属性
#### 2.2.3 确认数据表和该数据表的字段
+ `let userModel = db.model('user', userSchema);`
+ 定义一个数据表`userModel`
+ 使用`db.model`方法，第一个参数是数据表的名字，第二个参数是该数据表使用的`Schema`
#### 2.2.4 最终导出定义的数据表
+ `module.exports = userModel;`
+ 导出之后，在`operate.js`中使用这个对象的`mongodb`的增删改查方法

## 3. 定义`mongodb`的增删改查功能
### 3.1 代码部分
+ 该文件为`operate.js`
```javascript
let userModel = require('./user.js');
module.exports = {
	save(data) {
		return new Promise((resolve, reject) => {
			userModel.create(data, (err, docs) => {
				if (err) {
					rejct(err);
				} else {
					resolve(docs);
				}
			})
		})
	},
	find(data = {}, fields = null, options = {}) {
		return new Promise((resolve, reject) => {
			//model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
			userModel.find(data, fields, options, (error, doc) => {
				if (error) {
					reject(error)
				} else {
					resolve(doc)
				}
			})
		})
	},
	findOne(data) {
		return new Promise((resolve, reject) => {
			//model.findOne(需要查找的对象,callback)
			userModel.findOne(data, (error, doc) => {
				if (error) {
					reject(error)
				} else {
					resolve(doc)
				}
			})
		})
	},
	findById(data) {
		return new Promise((resolve, reject) => {
			//model.findById(需要查找的id对象 ,callback)
			userModel.findById(data, (error, doc) => {
				if (error) {
					reject(error)
				} else {
					resolve(doc)
				}
			})
		})
	},
	update(conditions, update) {
		return new Promise((resolve, reject) => {
			//model.update(查询条件,更新对象,callback)
			userModel.update(conditions, update, (error, doc) => {
				if (error) {
					reject(error)
				} else {
					resolve(doc)
				}
			})
		})
	},
	remove(conditions) {
		return new Promise((resolve, reject) => {
			//model.update(查询条件,callback)
			userModel.remove(conditions, (error, doc) => {
				if (error) {
					reject(error)
				} else {
					resolve(doc)
				}
			})
		})
	}
};
```
### 3.2 代码分析
+ 引入`user`模块
+ `let userModel = require('../models/users');`
+ 引入该文件的目的是，让`userModel`这个数据表直接的调用`mongodb`的各种方法

## 4. 后台直接使用`operate`处理数据
+ 该文件为`login.js`
### 4.1 代码部分
```javascript
const express = require('express');
const router = express.Router();
let operate = require('./operate');
router.post('/', function (req, res, next) {
	let param = {};
	param.email = req.body.email;
	param.password = req.body.password;
	console.log(param);
	operate.save(param).then(result => {
		if (result) {
			res.json({
				data: result,
				success: true
			})
		} else {
			res.json({
				data: result,
				success: false
			})
		}
	});
});
module.exports = router;
```
### 4.2 代码分析
+ 需要熟练使用`Express`的`router`方法
+ 引入`Express`，定义一个`post`方法
+ `post`方法传递的对象数据挂在在`req.body`上
+ 直接调用`operate.save()`方法，传递`param`对象参数
+ 获取到返回结果`result`，对获取到的结果进行进一步处理