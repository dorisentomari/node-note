## 流的基本概念
**fs模块中集中文件读写方法的区别**

|用途 |使用异步方式|使用同步方式|
| -------- | -----: | :----: |
|将文件完整读入缓存区|readFile|readFileSync|
|将文件部分读入缓存区|read|readSync|
|将数据完整写入文件 |writeFile|writeFileSync|
|将缓存区中的部分内容写入文件|write|writeSync|

> 在使用`readFile`或者`readFileSync`读取文件内容时，Node.js首先将文件内容完整地读入缓存区，再从缓存区中读取文件内容。在使用`writeFile`或者`writeFileSync`方法写入文件内容时，Node.js首先将该文件内容读入缓存区，然后一次性将缓存区中内容写入到文件中。也就是说，在使用`readFile`或者readFileSync`读取文件内容或者使用`writeFile`或者`writeFileSync`写入文件内容时，Node.js会将该文件内容视为一个整体，为其分配缓存区并且一次性将文件内容读取到缓存区。在这期间，Node.js不再执行任何其他处理。

> 如果使用`read`或者`readSync`方法读取文件内容，Node.js将不断地将文件中一小块内容读入缓存区，最后从缓存区中读取文件内容，如果使用`write`或者`writeSync`写入文件内，Node.js将实行以下过程：1.将需要书写的数据书写到一个内容缓冲区；2. 待缓冲区写满后再讲该缓冲区中内容写入到文件中；3. 重复执行过程1和过程2，直到数据全部写入文件为止。也就是说，如果使用`read`或者`readSync`读取文件内容或者使用`write`或者`writeSync`写入文件，在读写文件过程中允许Node.js执行其他操作。







