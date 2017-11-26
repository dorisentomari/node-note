var buf = new Buffer([0x00, 0x10, 0x20, 0x30]);
console.log(buf);//<Buffer 00 10 20 30>
console.log(buf.readUInt8(0));//0
console.log(buf.readUInt8(1));//16
console.log(buf.readUInt8(2));//32
console.log(buf.readUInt8(3));//48
//console.log(buf.readUInt8(4));//RangeError
console.log(buf.readUInt8(4, true));//undefined

console.log('=====Buffer & JSON=====')
var road = new Buffer('字符串')
console.log(road);//<Buffer e5 ad 97 e7 ac a6 e4 b8 b2>
var json = JSON.stringify(road);
console.log(JSON.parse(json))
/**
{ 
	type: 'Buffer',
  	data: [ 229, 173, 151, 231, 172, 166, 228, 184, 178 ] 
}
*/

var copy = new Buffer(JSON.parse(json));
console.log(copy);//<Buffer e5 ad 97 e7 ac a6 e4 b8 b2>


console.log('=====copy cache data=====')
var bufOne = new Buffer('数据转换')
var bufTwo = new Buffer(128).fill(0);
bufOne.copy(bufTwo, 10)
console.log(bufTwo)
/**
<Buffer 00 00 00 00 00 00 00 00 00 00 e6 95 b0 e6 8d ae e8 bd ac e6 8d a2 00 00 00 00 00 00 00 00 00 00 ... >
