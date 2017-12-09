var crypto = require('crypto');
var fs = require('fs');

// console.log(crypto.getCiphers())

/*
// 散列算法
var shasum = crypto.createHash('sha1');// 创建hash对象，加密算法为sha1
var file = fs.ReadStream('./26crypto.js');//读取该文件，为s
file.on('data', function(d){
	console.log(d);//d是file文件的Buffer对象
	shasum.update(d);// 创建一个摘要
})

file.on('end', function(){
	var d = shasum.digest('hex');// 输出摘要
	console.log(d);
});

// 55fa1e5f6e4b5e5346b7c14cafd8a1ef3c810e09
*/

/*
// HMAC算法

var pem = fs.readFileSync('./key.pem');
var key = pem.toString('ascii');
var shasum = crypto.createHmac('sha1', key);
var file = fs.ReadStream('./26crypto.js');
file.on('data', function(data){
	console.log('data.toString()');
	console.log(data.toString());
	console.log('shasum.update(data)');
	console.log(shasum.update(data));
})

file.on('end', function(){
	console.log("shasum.digest('hex')");
	console.log(shasum.digest('hex'));
})
*/
/*
shasum.update(data)
Hmac {
  _handle: {},
  _options: undefined,
  writable: true,
  readable: true }
shasum.digest('hex')
dacf2c5a4ff87a8abf4d0736e5f4fa514dbb4c0d
*/

//cipher对象加密数据
var pem = fs.readFileSync('./key.pem');// 读取公钥
var key = pem.toString('ascii');//将公钥转换成ascii格式
var cipher = crypto.createCipher('blowfish', key);//使用blowfish加密方法创建cipher对象，key为密码
var text = 'test';
cipher.update(text, 'binary', 'hex');//指定需要被加密的数据text
var crypted = cipher.final('hex');//调用final方法后不能再向cipher对象追加加密数据，并且指定输出加密的编码格式
console.log(crypted);// 1b1273be14b07919


