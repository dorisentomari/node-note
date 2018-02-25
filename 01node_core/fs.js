const fs = require('fs');

let filePath = path.resolve('/root/files/order');
fileDisplay(filePath);

function fileDisplay(filePath) {
    fs.readdir(filePath, (err, files) => {
        // 这里的files是根目录下的直接子文件和子目录
        if (err) {
            console.error(err);
            return false;
        }
        files.forEach((filename) => {
            // 对根目录下的直接子文件和子目录进行遍历
            // 利用path的拼接路径方法
            // 找到该文件的路径
            let fileDir = path.join(filePath, filename);
            console.log(fileDir);
            fs.stat(fileDir, (err, stats) => {
                // 利用fs的stat方法判断遍历的对象是文件还是目录
                if (err) {
                    console.error('get file stats info failed');
                    return false;
                }
                let isFile = stats.isFile();
                let isDir = stats.isDirectory();
                if (isFile) {
                    if (fileDir.indexOf('user.js') > 0) {
                        fs.readFile(fileDir, (err, targetFileData) => {
                            if (targetFileData.indexOf("var id = '") > 0) {
                                console.log('the user.js has id');
                            } else {
                                console.log('the user.js has not id', fileDir);
                            }
                        })
                    }
                } else {
                    fileDisplay(fileDir);
                }
            })
        })
    })
}