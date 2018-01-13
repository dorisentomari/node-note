// path
var path = require('path');
var fs = require('fs');
// normalize() 该方法将非标准路径字符串转换为标准路径字符串
// 01 解析路径字符串中的".."和"."字符串，返回解析后的标准路径
// 02 将多个斜杠字符串转换为一个斜杠字符串，例如将"\\"转换为"\"
// 03 将windows操作系统中的反斜杠字符串转换为正斜杠字符串
// 04 如果路径字符串以斜杠字符串结尾,则在转换后的完整路径字符串末尾保留该斜杠字符串
/*
console.log(path.normalize('../../a//b/./c'));//../../a/b/c

// join() 将多个参数值字符串结合为一个路径字符串
console.log(path.join(__dirname, 'kkk', 'ppp'));///root/Desktop/files/node/04node_files/kkk/ppp

// resolve() 以应用程序目录为起点，根据所有的参数值字符串解析出一个绝对路径

var myPath = path.resolve('a', 'b', 'c');
console.log('myPath', myPath)
var file = fs.createReadStream('./file01.txt');
file.on('data', function(data){
	console.log(data.toString());
})

// relative() 用于获取两个路径之间的相对关系
// path.relative(from, to);
*/
console.log(path.relative('/usr/local', '/usr/games'));//../games

// basename(p, [ext]) 获取一个路径中的文件名
// p 必须为一个文件的完整路径
// ext 用于在方法所返回的文件中名中去除该文件的扩展名

console.log(path.basename('./file01.txt', '.txt'));//file01

// extname() 获取一个路径中的文件的扩展名
// 没有指定扩展名时，返回一个空字符串
console.log(path.extname('./file01.txt'));//.txt

// path.sep属性 操作系统指定的文件分隔符
console.log(path.sep);
//   /   linux
//   \\  windows

// path.delimiter属性 操作系统指定的路径分隔符
console.log(path.delimiter);
//    :   linux
//    ;   windows

// 遍历文件夹里所有的文件和目录，并判断某一个文件里是否有某一些内容
let filePath = path.resolve('/root/files/order');
fileDisplay(filePath);
function fileDisplay(filePath){
    fs.readdir(filePath, (err, files) => {
        // 这里的files是根目录下的直接子文件和子目录
        if(err){
            console.warn(err);
        }else{
            files.forEach((filename) => {
                // 对根目录下的直接子文件和子目录进行遍历
                // 利用path的拼接路径方法
                // 找到该文件的路径
                let fileDir = path.join(filePath, filename);
                console.log(fileDir);
                fs.stat(fileDir, (err, stats) => {
                    // 利用fs的stat方法判断遍历的对象是文件还是目录
                    if(err){
                        console.warn('get file stats info failed');
                    }else{
                        let isFile = stats.isFile();
                        let isDir = stats.isDirectory();
                        if(isFile){
                            if(fileDir.indexOf('user.js') > 0 ){
                                fs.readFile(fileDir, (err, targetFileData)=>{
                                    if(targetFileData.indexOf("var id = '") > 0){
                                        console.log('the user.js has id');
                                    }else{
                                        console.log('the user.js has not id', fileDir);
                                    }
                                })
                            }
                        }else{
                            fileDisplay(fileDir);
                        }
                    }
                })
            })
        }
    })
}
