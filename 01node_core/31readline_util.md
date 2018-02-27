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