console.log('=====console.dir()=====')
var user = {};
user.name = 'jack';
user.getName = function(){
	return this.name;
}
user.setName = function(name){
	this.name = name;
}
console.dir(user);



console.log('=====console.time()=====')
console.time('for 10^6 times')
for(var i=0;i<100000;i++){}//2.208ms
console.timeEnd('for 10^6 times')



console.log('=====console.trace()=====')
console.trace('trace')

console.log('=====console.assert()=====')
console.assert(1==true,'raise an exception')
//assert对一个表达式的执行结果进行评估，如果表达式的执行结果为false，则输出一个消息字符串并抛AssertionError异常
































