# `buffer`对象
## 1. 什么是`buffer`
> 在客户端`Javascript`脚本代码中，对于二进制数据没有提供一个很好的支持。然而，在处理TCP流或文件流时，必须要处理二进制数据。因此，在Node.js中，定义了一个Buffer类，该类用来创建一个专门存放二进制数据的缓存区。

简单来说，`Buffer`对象就是为了处理`TCP数据流`(暂且不表)和`文件`，比如读取一个`txt`文件，一张`jpeg`格式的图片，或者是一个`word`文档，都可以。

## 2. 创建`buffer`对象
+ 直接使用`new`关键字来创建该类的实例对象
```javascript
var buf = new Buffer()
```

## 3. `Buffer`类拥有三种形式的构造函数
### 3.1 将缓存区大小(以字节为单位)指定为构造函数的参数
#### 3.1.1 `Buffer`的`length`属性
+ 被创建的`Buffer`对象拥有一个`length`属性，这个属性值就是创建的`Buffer`对象的缓存区大小
```javascript
var buf = new Buffer(100);
console.log(buf);
console.log(buf.length);

// result
<Buffer c8 eb 75 9d 93 00 00 00 01 00 00 00 01 00 00 00 04 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 28 6e 3e 23 b3 01 00 00 00 00 00 00 00 00 00 00 f8 65 ... >
100
```
#### 3.1.2 初始化创建的`Buffer`对象
+ 此时创建的`buf`对象，没有被初始化，换句话说，就是每次`console.log(buf)`的结果都是不一样的，但是这个`buf`对象的`length`属性是固定的`100`
```javascript
<Buffer a8 ed 1d dc 45 00 00 00 01 00 00 00 01 00 00 00 04 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 98 53 67 75 90 01 00 00 00 00 00 00 00 00 00 00 68 4b ... >
// 再次console.log(buf)，输出的结果与上面的不一样
<Buffer 78 ec cf e7 62 00 00 00 01 00 00 00 01 00 00 00 04 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 f8 50 58 d9 fc 01 00 00 00 00 00 00 00 00 00 00 c8 48 ... >
```
+ 使用`Buffer`对象的`fill`方法来初始化缓存区中的内容
```javascript
buf.fill(val, [offset], [end])
```

+ 第一个参数为必填的`Buffer`对象的填充值，填充值均以`16进制`计算
    * 一般`val`参数的值为`0`
    * 如果`val`参数为数值，填充的结果就是参数`val`
    * 如果`val`参数为数组或对象，填充的结果全部为`0`
    * 如果`val`参数为`true`，填充的结果全部为`1`
    * 如果`val`参数为`false`，填充的结果全部为`0`
    * 如果`val`参数为字符串，填充的结果全部为，每个字符串中的字符所对应的`ascii`表中的值，并且每个字符依次在`length`值内循环
+ 第二个参数和第三个参数可选
    * `offset`表示为起始位置写入，默认为`0`
    * `end`表示将数值写入到第几个字节处，默认为`length`的值

### 3.2 直接使用一个数组来初始化缓存区
```javascript
var buf = new Buffer(['a', 'b', 'c']);
console.log(buf)
// result
<Buffer 00 00 00>
```

### 3.3 直接使用一个字符串来初始化缓存区
```javascript
var buf = new Buffer(str, [encoding])
```
+ 第一个参数`str`为初始化缓存区的字符串，第二个参数`encoding`用于指定文字编码格式的字符串，默认为`utf8`
+ 不同编码格式输出结果
```javascript
var ascii = new Buffer('aLittleTea一点点', 'ascii');
console.log('ascii  ', ascii);
// result
// ascii   <Buffer 61 4c 69 74 74 6c 65 54 65 61 00 b9 b9>

var utf8 = new Buffer('aLittleTea一点点', 'utf8');
console.log('utf8   ', utf8);
// result
// utf8    <Buffer 61 4c 69 74 74 6c 65 54 65 61 e4 b8 80 e7 82 b9 e7 82 b9>

var utf16le = new Buffer('aLittleTea一点点', 'utf16le');
console.log('utf16le', utf16le);
// result
// utf16le <Buffer 61 00 4c 00 69 00 74 00 74 00 6c 00 65 00 54 00 65 00 61 00 00 4e b9 70 b9 70>

var ucs2 = new Buffer('aLittleTea一点点', 'ucs2');
console.log('ucs2   ', ucs2);
// result
// ucs2    <Buffer 61 00 4c 00 69 00 74 00 74 00 6c 00 65 00 54 00 65 00 61 00 00 4e b9 70 b9 70>

var base64 = new Buffer('aLittleTea一点点', 'base64');
console.log('base64 ', base64);
// result
// base64  <Buffer 68 b8 ad b6 57 93 79 af>

var binary = new Buffer('aLittleTea一点点', 'binary');
console.log('binary ', binary);
// result
// binary  <Buffer 61 4c 69 74 74 6c 65 54 65 61 00 b9 b9>

var hex = new Buffer('aLittleTea', 'hex');
console.log('hex    ', hex);
// result
// hex     <Buffer >
```

## 4. 字符串的长度与缓存区的长度
> 在Node.js中，一个字符串的长度与根据该字符串所创建的缓存区的长度并不相同。因为在计算字符串的长度时，以位子作为一个单位，而在计算缓存区的长度时，以字节作为一个单位。
一个汉字字符串的长度为1，但是一个汉字在`Buffer`缓存区中字节的长度为3，换句话说，在Node.js的`Buffer`类中，一个汉字的字节长度为3

```javascript
var chinese = '一点点奶茶有点儿好喝';
var buf = new Buffer(chinese);
console.log(buf);
// result
// <Buffer e4 b8 80 e7 82 b9 e7 82 b9 e5 a5 b6 e8 8c b6 e6 9c 89 e7 82 b9 e5 84 bf e5 a5 bd e5 96 9d>

console.log(chinese.length);  // 10
console.log(buf.length);      // 30
console.log(chinese[4]);      // 茶
console.log(buf[4]);          // 130  注:在buf中编码为16进制，输出的结果是10进制  
// 修改chinese的某一个字符
chinese[4] = '昔';
// 字符串对象一旦被创建，就不可以被修改
console.log(chinese);         // 一点点奶茶有点儿好喝
// 修改buf的某一个字节
buf[0] = 'e4';
buf[1] = 'ba';
buf[2] = '8c';
console.log(buf)
// <Buffer 00 00 00 e7 82 b9 e7 82 b9 e5 a5 b6 e8 8c b6 e6 9c 89 e7 82 b9 e5 84 bf e5 a5 bd e5 96 9d>
// 被修改的前三个字节全都是00
```