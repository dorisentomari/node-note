## 1. 使用`readline`模块逐行读取流数据

### 1.1. 创建`Interface`对象
在`readline`模块中，通过`Interface`对象的使用来实现逐行读取流数据的处理。因此首先要创建`Interface`对象，在`readline`模块中，可以通过`createInterface`方法来创建`Interface`对象.`readline.createInterface(options)`,`options`为一个对象，属性如下
+ `input`: 属性值为一个可用来读取流数据的对象，用于指定读入数据的来源。
+ `output`: 属性值为一个可用来写入流数据的对象，用于指定数据的输出目标。
+ `computer`: 属性值为一个函数，用于指定`Tab`补全处理。函数的参数值被自动设定为从该行中读入的`Tab`字符之前的数据，该函数应该返回一个由所有用于`Tab`补全时的匹配字符串组成的数组以及从该行中读入的`Tab`字符之前的数据。
+ `terminal`: 该属性为一个布尔类型的属性，当需要像一个终端那样实时地将输入数据流进行输出，且需要在输出数据中写入`ANSI/VT100`控制字符串时，需要将该属性值设置为`true`，默认属性值等于`output`属性值对象的`isTTY`属性值。
```javascript
// 输入 exit, quit,q这三个任意之一的时候，会退出
const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	completer: completer
});
rl.on('line', (line) => {
	if (line === 'exit' || line === 'quit' || line === 'q') {
		rl.close();
	} else {
		console.log('您输入了：', line);
	}
});

rl.on('close', () => {
	console.log('行数据读取操作被终止');
});

function completer(line) {
	const completions = '.help .error .exit .quit .q'.split(' ');
	let hits = completions.filter((c) => {
		return c.indexOf(line) === 0;
	});
	return [hits.length ? hits : completions, line]
}
```

### 1.2. 使用`Interface`对象逐行读取文件
+ 原`fs.js`文件的内容
```javascript
console.log('this is line 1');
console.log('this is line 2');
console.log('this is line 3');
console.log('this is line 4');
console.log('this is line 5');
```
+ 代码内容
```javascript
const readline = require('readline');
const fs = require('fs');
let file = fs.createReadStream('./fs.js');
let out = fs.createWriteStream('./anotherFs.js');
let index = 1;
out.write('/*line' + index.toString() + ": */");
let rl = readline.createInterface({
	input: file,
	output: out,
	terminal: true
});
rl.on('line', (line) => {
	if (line === '') {
		rl.close();
	} else {
		index++;
		out.write('/*line' + index.toString() + ': */');
	}
});
```
+ 生成的`anotherFs.js`文件的内容
```javascript
/*line1: */console.log('this is line 1');
/*line2: */console.log('this is line 2');
/*line3: */console.log('this is line 3');
/*line4: */console.log('this is line 4');
/*line5: */console.log('this is line 5');/*line6: */
```
## 2. 使用`util`模块中提供的一些方法

+`format`方法
类似于`C`语言中的`printf`方法,将第一个参数值作为一个格式化字符串,将其他参数值作为该格式化字符串中所使用的各中参数,返回一个经过格式化处理后的字符串.`util.format('您输入了%d个参数,参数值分别为%s,%s,%s',3,'nice','excelent','holy');`
格式化字符串中,可以使用的参数指定符号
    *`%s`:用于指定字符串参数
    *`%d`:用于指定数值参数,包括整数及浮点数
    *`%j`:用于指定一个`JSON`对象
    *`%%`:用于指定一个百分号
    *如果格式化字符串中使用的参数个数多于format方法中使用的除了`format`参数之外的其他参数,则格式化字符串中多于的参数将不被替换.`console.log(util.format('%s:%s','one'));`
    *如果格式化字符串中使用的参数个数少于`format`方法中使用的除了`format`参数之外的其他参数,则根据`format`方法中多于参数值的类型自动将其转换为字符串,中间使用一个空格进行分割.

+`inspect(object,[options])`返回一个字符串,该字符串包含了对象的信息,在调试应用程序的过程中非常有用.
    *`showHidden<boolean>`如果为`true`,则`object`的不可枚举的符号与属性也会被包括在格式化后的结果中.默认为`false.`
    *`depth<number>`指定格式化`object`时递归的次数.这对查看大型复杂对象很有用.默认为`2`.若要无限地递归则传入`null`.
    *`colors<boolean>`如果为`true`,则输出样式使用`ANSI`颜色代码.默认为`false`.颜色可自定义.
    *`customInspect<boolean>`如果为`false`,则`object`上自定义的`inspect(depth,opts)`函数不会被调用.默认为`true`.
    *`showProxy<boolean>`如果为`true`,则`Proxy`对象的对象和函数会展示它们的`target`和`handler`对象.默认为`false`.
    *`maxArrayLength<number>`指定格式化时数组和`TypedArray`元素能包含的最大数量.默认为`100`.设为`null`则显式全部数组元素.设为`0*`或负数则不显式数组元素.
    *`breakLength<number>`一个对象的键被拆分成多行的长度.设为`Infinity`则格式化一个对象为单行.默认为`60`.

+自定义`util.inspect`颜色
可以通过`util.inspect.styles`和`util.inspect.colors`属性全局地自定义`util.inspect`的颜色输出（如果已启用）

```javascript
const util = require('util');
console.log(util.format('您输入了%d个参数，参数值分别为%s,%s,%s', 3, 'nice', 'excelent', 'holy'));
//您输入了3个参数，参数值分别为nice,excelent,holy
console.log(util.format('一个JSON对象%j', {'name': 'jack', 'age': 25}));
// 一个JSON对象{"name":"jack","age":25}
console.log(util.format('一个百分号%'));// 一个百分号%
console.log(util.format('%s:%s', 'one'));// one:%s
console.log(util.format('%s', 'one', 'two', 'three', {'name': 'jack'}));

function test(one, two) {
	return one + two;
}

let parent = new Object();
parent.name = 'parent';
parent.func = test;

let child1 = new Object();
child1.name = 'child1';
parent.child1 = child1;

let child2 = new Object();
child2.name = 'child2';
child1.child = child2;

let child3 = new Object();
child3.name = 'child3';
child2.child = child3;

child2.inspect = function (depth) {
	return util.inspect(this, {depth: depth - 2, customInspect: false})
};
console.log(util.inspect(parent, {customInspect: true, depth: 4}));
/**
 * { name: 'parent',
 *   func: [Function: test],
 *   child1:
 *    { name: 'child1',
 *      child: { name: 'child2', child: [Object], inspect: [Function] } } }
 * **/
```

