var picBuffer = new Buffer(100).fill(0)
var strBuffer = new Buffer('this is a buffer Object', 'utf-8').toString()
var str = '绝对路径';
var buf = new Buffer(str);
console.log(picBuffer)
console.log(strBuffer)
console.log('str.length', str.length)//4
console.log('buf.length', buf.length)//12
var subBuf = buf.slice(2, 4);
console.log('buf', buf)
console.log('subBuf', subBuf)