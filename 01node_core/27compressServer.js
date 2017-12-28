
/*
// 使用Gzip对象压缩文件
var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs =require('fs');
var inp = fs.createReadStream('file01.txt');
var out = fs.createWriteStream('zlib.txt.gz');
inp.pipe(gzip).pipe(out);
*/
/*
//使用Gunzip对象解压缩文件
var zlib = require('zlib');
var gunzip = zlib.createGunzip();
var fs = require('fs');
var inp = fs.createReadStream('./zlib.txt.gz');
var out = fs.createWriteStream('zlib.txt');
inp.pipe(gunzip).pipe(out);
*/

// 返回压缩数据的HTTP服务器端
var zlib = require('zlib');
var http = require('http');
var fs = require('fs');
http.createServer(function(req, res){
    var raw = fs.createReadStream('./file01.txt');
    var acceptEncoding = req.headers['accept-encoding'];
    if(!acceptEncoding){
        acceptEncoding = '';
    }
    if(acceptEncoding.match(/\bdeflate\b/)){
        res.writeHead(200, {'content-encoding': 'deflate'});
        res.pipe(zlib.createDeflate()).pipe(res);
    }else if(acceptEncoding.match(/\bgzip\b/)){
        res.write(200, {'content-encoding': 'gzip'});
        raw.pipe(zlib.createGzip()).pipe(res);
    }else{
        res.writeHead(2, {});
        raw.pipe(res);
    }
}).listen(2576);

