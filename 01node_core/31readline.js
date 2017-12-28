/**
## 使用readline模块逐行读取流数据

#### 创建Interface对象
在readline模块中，通过Interface对象的使用来实现逐行读取流数据的处理。因此首先要创建Interface对象，在readline模块中，可以通过createInterface方法来创建Interface对象.`readline.createInterface(options)`,options为一个对象，属性如下
+ input: 属性值为一个可用来读取流数据的对象，用于指定读入数据的来源。
+ output: 属性值为一个可用来写入流数据的对象，用于指定数据的输出目标。
+ computer: 属性值为一个函数，用于指定Tab补全处理。函数的参数值被自动设定为从该行中读入的Tab字符之前的数据，该函数应该返回一个由所有用于Tab补全时的匹配字符串组成的数组以及从该行中读入的Tab字符之前的数据。
```node
function completer(line){
    var completions = '.help .error .exit .quit .q'.split(' ');
    var hits = completions.fliter(function(c){
        return c.indexOf(line) == 0;    
    })
    return [hits.length? hits: completions, line]
}
```
+ terminal: 该属性为一个布尔类型的属性，当需要像一个终端那样实时地将输入数据流进行输出，且需要在输出数据中写入ANSI/VT100控制字符串时，需要将该属性值设置为true，默认属性值等于output属性值对象的isTTY属性值。

*/