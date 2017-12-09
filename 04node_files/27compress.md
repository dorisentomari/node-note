## 压缩与解压缩处理
在Node.js中，可以使用zlib模块进行压缩及解压缩处理。

### 创建各种用于压缩及解压缩的对象
<table>
    <tr>
        <th>方法</th>
        <th>说明</th>
    </tr>
    <tr>
        <td>zlib.createGzip([options])</td>
        <td>该方法创建并返回一个Gzip对象,该对象使用Gzip算法对数据进行压缩处理</td>
    </tr>
    <tr>
        <td>zlib.createDeflate([options])</td>
        <td>该方法创建并返回一个Deflate对象,该对象使用Deflate算法对数据进行压缩处理</td>
    </tr>
    <tr>
        <td>zlib.createDeflateRaw([options])</td>
        <td>该方法创建并返回一个DeflateRaw对象,该对象使用DeflateRaw算法对数据进行压缩处理</td>
    </tr>
    <tr>
        <td>zlib.createGunzip([options])</td>
        <td>该方法创建并返回一个Gunzip对象,该对象使用Gunzip算法对数据进行压缩处理</td>
    </tr>
    <tr>
        <td>zlib.createInflate([options])</td>
        <td>该方法创建并返回一个Inflate对象,该对象使用Inflate算法对数据进行压缩处理</td>
    </tr>
    <tr>
        <td>zlib.createInflateRaw([options])</td>
        <td>该方法创建并返回一个InflateRaw对象,该对象使用InflateRaw算法对数据进行压缩处理</td>
    </tr>
    <tr>
        <td>zlib.createUnzip([options])</td>
        <td>该方法创建并返回一个Inflate对象,该对象使用Inflate算法对数据进行压缩处理,也可以对使用Deflate算法进行压缩的数据进行解压处理,根据压缩数据中的zlib头来判断该数据是使用哪一种算法进行压缩的数据.</td>
    </tr>
</table>
每个方法所创建的对象均为一个既可用于读取流数据的对象，又可以用于写入流数据的对象。
各个方法均采用一个可选的options参数，该参数为一个对象，用于指定压缩或者解压缩数据时所使用的选项。

+ flush: 用于设定或读取压缩方法及状态。 
    * zlib.Z_NO_FLUSH,flush的默认属性值，该模式运行在数据被输出之前，预先决定每次压缩多少数据，以实现最大化压缩。
    * zlib.Z_SYNC_FLUS,该属性值用于指定将压缩数据分为若干个压缩快，每次将一个压缩块中的数据写入输出缓存区，然后在数据块后面写入一个10位长度的空白数据块。当使用某些压缩算法时，这种模式可能会降低数据的压缩程序，因此只应该使用在必须使用的场合。
    * zlib.Z_FULL_FLUSH,与Z_SYNC_FLUSH相同，该属性值用于指定将压缩数据分为若干个压缩快，每次将一个压缩块中的数据写入输出缓存区，然后在数据块后面写入一个10位长度的空白数据块。但在数据块写完后复位压缩状态，因此，当压缩的数据流被管道输出时，解压缩该数据的另一端可以在前一次数据被破坏时要求重新压缩。
    * zlib.Z_PARTIAL_FLUSH, 该属性值用于指定在压缩数据时每次都将输出缓存区所能容纳的数据写入输出缓存区，不限制输出数据的字节数。
    * zlib.Z_FINISH,当属性值为zlib.Z_FINISH时，输出缓存区中的剩余数据将被全部输出。
+ chunkSize: 用于设定将数据分块时每个块的大小，单位为字节，默认属性值为16*1024
+ windowBits: 该属性值以2位底数所求出的压缩窗口的对数，用于设定压缩窗口的大小，属性值在8-15之间，默认为15，属性值越大，压缩效果越好，但是内存消耗越多，当使用deflate算法压缩数据且咋在压缩数据中不使用zlib头时，属性值也可以为-15~-8的数值。
+ level: 该属性值为整数值，用于指定压缩级别，属性值可以为-1或0-9的数值。当属性值为0时，不执行压缩处理，当属性值为1时，压缩速度最快，压缩程度最低。当属性值为-1时，表示使用默认压缩比，该属性值自动打压缩速度和压缩程度之间进行妥协(大多数场合中妥协的结果相当于将level属性值设定为6)
+ memLevel: 该属性值用于指定在进行压缩时为压缩程序分配多少内存，属性值为1-9之间的证书，当该属性值为1时，消耗最少的内存，但是压缩程度被降低，当属性值为9时，消耗最多的内存，但是压缩效果最好，默认属性值为8。
+ strategy: 该属性值用于调整压缩算法
    * zlib.Z_DEFAULT_STARTEGY,该属性值为默认属性值，用于进行标准压缩。
    * zlib.Z_HUFFMAN_ONLY,该属性值用于指定在压缩数据时使用霍夫曼编码(Huffman Coding)。霍夫曼编码是一种用于无损数据压缩的熵编码(又称为权编码)
    * zlib.Z_FILTERED,该属性值用于在压缩数据时对数据进行过滤，以达到更好的压缩效果
    * zlib.Z_RLE,该属性值用于指定在压缩时游程编码(Run-Length Encoding,RLE),游程编码又称行程长度编码，该编码对连读的黑白像素数(游程)以不同的码字进行编码，游程编码是一种简单的非破坏性资料压缩法，其好处是压缩和解压缩都非常快，其方法是计算连续出现的资料长度压缩，其缺点是对于不重复的资料反而加大容量，当对PNG图像进行压缩时，游程编码可以达到最佳的压缩效果。
    * zlib.Z_FIXED,该属性值用于指定在压缩过程中禁止使用霍夫曼编码，以达到在特殊的应用程序中简化解码过程的目的。
由于Gzip对象，Deflate对象与DeflateRaw对象既可以用于读取流数据，又可以用于写入流数据，因此，可以直接使用这些ReadStream对象的pipe方法将文件流数据输出到Gzip对象，Deflate对象与DeflateRaw对象中，再使用这些对象的pipe方法将使用这些对象进行压缩后的流数据输出到另一个压缩文件中。

```node
// 使用Gzip对象压缩文件
var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs =require('fs');
var inp = fs.createReadStream('file01.txt');
var out = fs.createWriteStream('zlib.txt.gz');
inp.pipe(gzip).pipe(out);
```

由于Gunzip对象，Inflate对象，InflateRaw对象与Unzip对象既可以读取流数据，又可以用于写入流数据，因此，可以直接使用这些ReadStream对象的pipe方法读取压缩文件中的数据并将其输出到Gunzip对象，Inflate对象，InflateRaw对象或Unzip对象中，再使用这些对象的pipe方法将使用这些对象进行解压缩后的流数据还原到一个文件中。

```node
//使用Gunzip对象解压缩文件
var zlib = require('zlib');
var gunzip = zlib.createGunzip();
var fs = require('fs');
var inp = fs.createReadStream('./file01.txt.gz');
var out = fs.createWriteStream('file01.txt');
inp.pipe(gunzip).pipe(out);
```

在HTTP服务器端与HTTP客户端之间传输压缩数据时，在客户端请求头中需要使用accept-encoding字段指定服务器端压缩数据时使用的压缩算法，在服务器端响应头中应使用content-encoding字段声明服务器端响应数据的压缩算法。
```node
// 返回压缩数据的HTTP服务器
var zlib = require('zlib');
var http = require('http');
var fs = require('fs');
http.createServer(function(req, res){
    
})
```


### zlib模块中的各种方法
在zlib模块中，除了各种用于创建对数据进行压缩及解压缩处理的方法之外，还提供了很多的方法，所有这些方法的第一个参数值均为一个字符串或一个Buffer对象，在防范内部对该字符串或Buffer对象所引用的缓存区中的数据进行压缩或解压缩。在这些方法中不使用options参数，所有这些方法的第二个参数值均为一个回调函数，用于指定压缩或解压缩数据结束时需要执行的处理，该回调函数中的第一个参数值为压缩或解压缩数据失败时触发的错误对象，该回调函数中的第二个参数值为一个Buffer对象，该Buffer对象为所引用的缓存区中存放了压缩或解压缩后的数据。
**各种用于压缩或解压缩数据的方法**
<table>
    <caption>各种用于压缩或解压缩数据的方法</caption>
    <thead>
        <tr>
            <th>方法</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>zlib.zgip(buf, callback(err, buf){..})</td>
            <td>使用Gzip算法压缩buf字符串或buf缓存区中的数据</td>
        </tr>
        <tr>
            <td>zlib.deflate(buf, callback(err, buf){..})</td>
            <td>使用Deflate算法压缩buf字符串或buf缓存区中的数据</td>
        </tr>
        <tr>
            <td>zlib.deflateRaw(buf, callback(err, buf){..})</td>
            <td>使用Deflate算法压缩buf字符串或buf缓存区中的数据,在压缩数据中不添加zlib头</td>
        </tr>
        <tr>
            <td>zlib.gunzip(buf, callback(err, buf){..})</td>
            <td>使用Gunzip算法压缩buf字符串或buf缓存区中的数据</td>
        </tr>
        <tr>
            <td>zlib.inflate(buf, callback(err, buf){..})</td>
            <td>使用Inflate算法压缩buf字符串或buf缓存区中的数据</td>
        </tr>
        <tr>
            <td>zlib.inflateRaw(buf, callback(err, buf){..})</td>
            <td>使用inflateRaw算法压缩buf字符串或buf缓存区中的数据,在压缩数据中不添加zlib头</td>
        </tr>
        <tr>
            <td>zlib.unzip(buf, callback(err, buf){..})</td>
            <td>该方法可使用Gunzip算法解压缩buf缓存区中的数据，又可使用Inflate算法解压缩buf缓存区中的数据，根据压缩数据中的zlib头来判断使用哪一种算法解压缩数据</td>
        </tr>
    </tbody>
</table>
