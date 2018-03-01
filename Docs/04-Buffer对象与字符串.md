# `Buffer`对象与字符串

### 1. `Buffer`对象的`toString()`方法
+ 将`Buffer`对象中保存的数据转换为字符串
+ `toString([encoding], [start], [end])`
+ 第一个参数用于指定`Buffer`对象中保存的文字编码格式，默认参数值为`utf8`
+ 第二个参数和第三个参数用于指定被转换数据的起始位置与结束位置，不包含结束位置
```javascript
var buf = new Buffer('BUFFER OBJECT');
console.log(buf);
console.log(buf.toString());
console.log(buf.toString('utf8', 2, 5));
// result
<Buffer 42 55 46 46 45 52 20 4f 42 4a 45 43 54>
BUFFER OBJECT
FFE
```

### 2. `Buffer`对象的`write()`方法
+ 向已经创建的`Buffer`对象中写入字符串
+ `buf.write(string, [offset], [length], [encoding])`
+ 第一个参数为指定需要写入的字符串
+ 第二个参数和第三个参数用于指定字符串转换为字节数据后的写入位置(包括起始值和结束值)
+ 第四个参数为编码格式，默认为`utf8`格式
```javascript
var chinese = '一点点奶茶有点儿好喝';
var buf = new Buffer(chinese);
buf.write('二', 0, 3, 'utf8'); 
console.log(buf.toString());
// 二点点奶茶有点儿好喝
```
> 在这个`0`到`3`区间内，实质上对应的是`chinese`字符串内的`一`这个字，如果把`3`改成`6`，得到的结果依然是`二点点奶茶有点儿好喝`，因为申请的空间大于所写入的空间，所以结果不变。
如果把`buf.write('二', 0, 3, 'utf8')`中的`二`改为`二二`,同样给`0`到`3`区间，结果依然是`二点点奶茶有点儿好喝`，但是如果区间为`0`到`6`，那么结果就是`二二点奶茶有点儿好喝`，
如果把`buf.write('二', 0, 3, 'utf8')`改成`buf.write('二二点奶茶不是可口可乐', 0, 30, 'utf8') `，那么结果是`二二点奶茶不是可口可`，得到的`buf`的长度依然是`30`

> 所以，也就是说，`buf`的`write`方法，只是把原`buf`的内容剪切掉，新内容如果刚好能放下，那么新内容将旧内容替换，如果不能刚好放下，那么从新内容的起始位置开始计算，能放多少就放多少，多余的部分舍去，不够的部分，将不替换旧内容。

> 说白了，就是`buf`字节长度所对应的内容的替换。

### 3. `StringDecoder`对象
> 使用`StringDecoder`对象将`Buffer`对象中的数据转换为字符串，该对象的作用与`Buffer`对象的`toString`方法的作用相同，但是对于`utf8`编码格式的字符串提供更好的支持
```javascript
var StringDecoder =  require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var buf = new Buffer('新垣結衣が主役の映画');
console.log(decoder.write(buf));
// result
// 新垣結衣が主役の映画
```

### 4. `Buffer`对象与`JSON`对象的互相转换
+ `JSON.stringify(buf)`将`Buffer`对象中保存的数据转换为一个字符串
```javascript
var buf = new Buffer('一点点奶茶有点儿好喝');
console.log(buf);
// <Buffer e4 b8 80 e7 82 b9 e7 82 b9 e5 a5 b6 e8 8c b6 e6 9c 89 e7 82 b9 e5 84 bf e5 a5 bd e5 96 9d>
var jsonBuffer = JSON.stringify(buf);
console.log(jsonBuffer);
{
    "type": "Buffer",
    "data": [228,184,128,231,130,185,231,130,185,229,165,182,232,140,182,230,156,137,231,130,185,229,132,191,229,165,189,229,150,157]
}
var data = [228,184,128,231,130,185,231,130,185,229,165,182,232,140,182,230,156,137,231,130,185,229,132,191,229,165,189,229,150,157];
var newData = []
data.forEach(function(elem){
    newData.push(elem.toString(16))
})
console.log(newData)
// ['e4','b8','80','e7','82','b9','e7','82','b9','e5','a5','b6','e8','8c','b6','e6','9c','89','e7','82','b9','e5','84','bf','e5','a5','bd','e5','96','9d']
```
+ 可以发现，对`Buffer`对象进行`JSON.stringify()`之后，得到的对象的`data`属性的属性值，转换成`16进制`之后，就是该`Buffer`对象的字节值

### 5. 复制缓存数据
+ `buf.copy(targetBuffer, [targetStart], [sourceStart], [sourceEnd])`
+ 第一个参数用于指定复制的目标`Buffer`对象
+ 第二个参数用于指定目标`Buffer`对象中从第几个字节开始写入数据，默认值是`0`
+ 第三个参数用于指定复制源`Buffer`对象中获取数据时的开始位置，默认值是`0`
+ 第四个参数用于指定从复制源`Buffer`对象中获取数据时的结束位置，默认值是复制源`Buffer`对象的长度
```javascript
var buf1 = new Buffer('新垣結衣が主役の映画「ミックス」が中国で公開へ');
console.log(buf1);
var buf2 = Buffer(256).fill(0);
console.log(buf2);
buf1.copy(buf2, 10, 12, 30);
console.log(buf2.toString());
/***
 * <Buffer e6 96 b0 e5 9e a3 e7 b5 90 e8 a1 a3 e3 81 8c e4 b8 bb e5 bd b9 e3 81 ae e6 98 a0 e7 94 bb e3 80 8c e3 83 9f e3 83 83 e3 82 af e3 82 b9 e3 80 8d e3 81 ... >
 * <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
 *           が主役の映画                                                                                                                                         
 ***/
```
`buf1`有值，`buf2`想要复制`buf1`的值，那么就是`buf1.copy(buf2, <buf2要被粘贴的起始位置>, <buf1要被复制的起始位置>, <buf1要被复制的结束位置>)`

### 6. `Buffer`类的类方法
##### 6.1 `isBuffer`方法
+ `Buffer.isBuffer(buf)`
+ 判断一个对象是否为一个`Buffer`对象，返回结果为`true`或者`false`

##### 6.2 `byteLength`方法
+ `Buffer.byteLength(string, [encoding])`
+ 在不同的编码格式下，同一个字符的字节长度是不一样的
```javascript
var japanese = '新垣結衣';
console.log(Buffer.byteLength(japanese, 'utf8'));   //12
console.log(Buffer.byteLength(japanese, 'utf16le'));//8
console.log(Buffer.byteLength(japanese, 'base64')); //3
console.log(Buffer.byteLength(japanese, 'hex'));    //2
console.log(Buffer.byteLength(japanese, 'ascii'));  //4
```

##### 6.3. `concat`方法，拼接`Buffer`对象的值
+ 与字符串和数组的`concat`方法使用相同
```javascript
var buf1 = new Buffer('新垣結衣が主役の映画');
var buf2 = new Buffer('「ミックス」');
var buf3 = new Buffer('が中国で公開へ');
console.log(Buffer.concat([buf1, buf2, buf3]).toString());
// result
// 新垣結衣が主役の映画「ミックス」が中国で公開へ
```

##### 6.4. `isEncoding`方法
+ `Buffer.isEncoding(encoding)`
+ 检测一个字符串是否为一个有效的编码格式字符串
```javascript
var code = 'utf8';
console.log(Buffer.isEncoding(code));
```