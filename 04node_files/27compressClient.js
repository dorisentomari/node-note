/*
//接收并解压缩HTTP服务器返回的压缩数据的HTTP客户端
var zlib = require('zlib');
var http = require('http');
var fs = require('fs');
var request = http.get(
    {
        host: 'localhost',
        path: '/',
        port: 2576,
        headers:{'accept-encoding': 'gzip'}
    })
request.on('response', function(response){
    var output = fs.createWriteStream('./file01.txt');
    switch(response.headers['content-encoding']){
        case 'gzip':
            response.pipe(zlib.createGunzip()).pipe(output);
            break;
        case 'deflate':
            response.pipe(zlib.createInflate()).pipe(output);
            break;
        default:
            response.pipe(output);
            break;
    }
});
*/

// 使用gzip方法压缩数据及使用unzip方法解压缩被压缩的数据
var zlib = require('zlib');
var fs = require('fs');
var out = fs.createWriteStream('compress.log');
var input = 'this is a test file.';
zlib.gzip(input, function(err, buffer){
    if(!err){
        zlib.unzip(buffer, function(err, buffer){
            if(!err){
                console.log(buffer.toString());
                out.write(buffer.toString());
            }
        })
    }
})



