var util = require('util');
console.log(util.format('您输入了%d个参数，参数值分别为%s,%s,%s',3,'nice','excelent','holy'));//您输入了3个参数，参数值分别为nice,excelent,holy
console.log(util.format('一个JSON对象%j',{'name':'jack','age':25})) ;// 一个JSON对象{"name":"jack","age":25}
console.log(util.format('一个百分号%')) ;// 一个百分号%
console.log(util.format('%s:%s','one'));// one:%s
console.log(util.format('%s','one','two','three', {'name': 'jack'}))

function test(one, two){
    return one + two;
}

var parent = new Object();
parent.name = 'parent';
parent.func = test;

var child1 = new Object();
child1.name = 'child1';
parent.child1 = child1;

var child2 = new Object();
child2.name = 'child2';
child1.child = child2;

var child3 = new Object();
child3.name = 'child3';
child2.child = child3;

child2.inspect = function(depth){
    return util.inspect(this, {depth: depth-2, customInspect: false})
}
console.log(util.inspect(parent, {customInspect:true, depth:4}))