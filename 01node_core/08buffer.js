let picBuffer = new Buffer(100).fill(0);
let strBuffer = new Buffer('this is a buffer Object', 'utf-8').toString();
let str = '绝对路径';
let buf = new Buffer(str);
console.log(picBuffer);
console.log(strBuffer);
console.log('str.length', str.length);//4
console.log('buf.length', buf.length);//12
let subBuf = buf.slice(2, 4);
console.log('buf', buf);
console.log('subBuf', subBuf);
console.log('=======buf.write()=====');
let road = new Buffer(100).fill(0);
road.write('路', 0, 3);
console.log(road);
console.log(road.toString());

// 可以使用StringDecoder对象将Buffer对象中的数据转换为字符串

const StringDecoder = require('string_decoder').StringDecoder;
let decoder = new StringDecoder('utf-8');
console.log(decoder.write(road));