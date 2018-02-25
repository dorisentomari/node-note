## Path
### 1. `normalize()`将非标准路径字符串转换为标准路径字符串
+ 解析路径字符串中的`..`和`.`字符串，返回解析后的标准路径
+ 将多个斜杠字符串转换为一个斜杠字符串，例如将`\\`转换为`\`
+ 将windows操作系统中的反斜杠字符串转换为正斜杠字符串
+ 如果路径字符串以斜杠字符串结尾,则在转换后的完整路径字符串末尾保留该斜杠字符串
```javascript
const path = require('path');
console.log(path.normalize('../../a//b/./c'));
/**
* windows: ..\..\a\b\c
* linux: ../../a/b/c
* **/
```

### 2. `join()`将多个参数值字符串结合为一个路径字符串
```javascript
const path = require('path');
console.log(path.join('user', 'name'));
console.log(path.join(__dirname, 'user', 'name'));
/**
* windows: 
* user\name
* Node.jsNotes\01node_core\user\name
* linux:
* user/name
* Node.jsNotes/01node_core/user/name
* **/
```

### 3. `path.resolve()`根据当前文件所在的目录解析出一个绝对路径
```javascript
const path = require('path');
console.log(path.resolve('user', 'name', 'mark'));
/**
* Node.jsNotes/01node_core/user/name/mark
* **/
```

### 4. `path.relative(from, to)`用于获取两个路径之间的相对关系
```javascript
const path = require('path');
console.log(path.relative('/usr/local', '/usr/games'));
/**
* ../games
* **/
```

### 5. `path.basename(path, [ext])`获取一个路径中的文件名
+ `path` 必须为一个文件的完整路径
+ `ext` 用于在方法所返回的文件中名中去除该文件的扩展名
```javascript
const path = require('path');
console.log(path.basename('./userinfo.txt', '.txt'));
/**
* userinfo
* **/
```

### 6. `path.extname()`获取一个路径中文件的扩展名
+ 没有扩展名时，返回一个空字符串
```javascript
const path = require('path');
console.log(path.extname('./filename.txt'));
/**
* .txt
* **/
```

### 7. `path.sep`操作系统指定的文件分隔符
```javascript
const path = require('path');
console.log(path.sep);
/**
* windows: \\
* linux: /
* **/
```

### 8. `path.delimiter`操作系统指定的路径分隔符
```javascript
const path = require('path');
console.log(path.delimiter);
/**
* windows: ;
* linux: :
* **/
```