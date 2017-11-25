## Add scripts to PATH

+ `filename: sherryFile`
```
**sherryFile**
#! /usr/bin/env node
console.log('this is a simple file from sherryFile')
```
+ `chmod 755 sherryFile`
+ execute `./sherryFile`,you can get the scripts content;
+ **add command `sherryFile`** to env variable;
+ `ln sherryFile /usr/local/bin/sherryFile`
+ Then input `sherryFile` to Terminal, you also can get the scripts content;


## DELETE ENV PATH
+ rm `/usr/local/bin/sherryFile/`
