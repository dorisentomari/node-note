## 利用`node`做一个简单的命令行工具
操作系统需要为`Linux`
### 1. 目标
+ 在命令行输入自己写的命令，完成目标任务
+ 命令行要求全局有效
+ 命令行要求可以删除
+ 命令行作用，生成一个文件，显示当前的日期

### 2. 代码部分
+ 新建一个文件，命名为`sherryFile`
+ 文件`sherryFile`的内容
> 介绍: 生成一个文件，文件内容为当前日期和创建者

```c++
#! /usr/bin/env node
console.log('command start');
const fs = require('fs');
let date = new Date().toLocaleDateString();
let data = date + '\n\t' + '——create By karuru';
fs.writeFile('./date.txt', data, 'utf8', (err) => {
	if (err) {
		console.log('sherryFile command wrong', err);
		return false;
	}
	console.log('writeFile success!!!!');
	console.log('command end');
});
```
+ 给该文件赋予执行权限`chmod 755 sherryFile`
+ 在该文件所在的文件路径下输入`./sherryFile`
+ 如果输出以下内容，表示命令执行成功
```
command start
writeFile success!!!!
command end
```
+ 在该文件目录下，会有一个新的`date.txt`文件生成，内容如下
```
2/28/2018
	create By karuru
```
+ 将命令修改为全局有效
```
ln sherryFile /usr/local/bin/sherryFile
```
+ 删除命令
```
rm /usr/local/bin/sherryFile
```