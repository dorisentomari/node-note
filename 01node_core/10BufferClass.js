// isBuffer()
let buf = new Buffer(10).fill(0);
console.log(Buffer.isBuffer(buf));//true

//byteLength
let strChinese = new Buffer('对象');
console.log(buf.byteLength);//10
console.log(strChinese.byteLength);//6
console.log(buf.toString().length);//10
console.log(strChinese.toString().length);//2

//concat
let strChineseA = new Buffer('汉字');
let strChineseB = new Buffer('华夏');
let strChineseC = new Buffer('美食佳肴');
let strChineseAll = Buffer.concat([strChineseA, strChineseB, strChineseC]);
console.log(strChineseAll);
//<Buffer e6 b1 89 e5 ad 97 e5 8d 8e e5 a4 8f e7 be 8e e9 a3 9f e4 bd b3 e8 82 b4>
console.log(strChineseAll.toString());//汉字华夏美食佳肴

//isEncoding 检测一个字符串是否为一个有效的编码格式字符串
let one = 'utf-8';
let two = 'utf-16';
console.log(Buffer.isEncoding(one));//true
console.log(Buffer.isEncoding(two));//false
