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

/*
//cipher对象加密数据
var pem = fs.readFileSync('./key.pem');// 读取公钥
var key = pem.toString('ascii');//将公钥转换成ascii格式
var cipher = crypto.createCipher('blowfish', key);//使用blowfish加密方法创建cipher对象，key为密码
var text = 'this is a text';
cipher.update(text, 'binary', 'hex');//指定需要被加密的数据text
var crypted = cipher.final('hex');//调用final方法后不能再向cipher对象追加加密数据，并且指定输出加密的编码格式
console.log(crypted);// a6f8e7b6bfd0b4c1
*/

/*
// 报错，有问题
// decipher对象解密数据
var pem = fs.readFileSync('./key.pem');// 读取公钥
var key = pem.toString('ascii');//将公钥转换成ascii格式
var decipher = crypto.createDecipher('blowfish', key);//使用blowfish加密方法创建cipher对象，key为密码
var dec = decipher.update('a6f8e7b6bfd0b4c1', 'hex', 'utf8');
dec += decipher.final('utf8');
console.log(dec);
*/

/*
// 对数据进行签名
var pem = fs.readFileSync('./key.pem');
var key = pem.toString('ascii');
var sign = crypto.createSign('RSA-SHA256');
sign.update('this is a test!');
var info = sign.sign(key, 'hex');
console.log(info);
console.log(info.length);// 256
*/


// 使用verify对象对签名进行验证
var privatePem = fs.readFileSync('./key.pem');//引入私钥
var publicPem = fs.readFileSync('./cert.pem');//引入公钥
var key = privatePem.toString();// 私钥字符串内容
var pubKey = publicPem.toString();// 公钥字符串内容
var data = 'this is a test!';// 签名内容
var sign = crypto.createSign('RSA-SHA256');// 创建签名sign对象
sign.update(data);//添加要签名的内容
var sig = sign.sign(key, 'hex');// 对添加后的内容进行签名
console.log('sig', sig);//输出一个256字节长度的签名内容
var verify = crypto.createVerify('RSA-SHA256');// 创建签名验证对象
verify.update(data);// 添加签名验证对象的内容
var info = verify.verify(pubKey, sig, 'hex');//进行签名验证，如果验证成功，info为true，否则为false
console.log('info', info);