/*
url模块，用来转换完整的URL
queryString模块，用来转换URL中的查询字符串
*/
var querystring = require('querystring');

/*
querystring.parse(str, [sep], [eq], [options]);
str用于指定被转换的查询字符串
sep用于指定该查询字符串中的分割字符，默认为&
eq用于指定该查询字符串中的分配字符，默认为=
options为一个对象，可以在该对象中使用一个整数值类型的maxKeys属性来指定转换后的对象中的属性个数，如果为0，效果等于不设置maxKeys属性值
*/
var info = querystring.parse('userName=jack&age=25&sex=male');
console.log(info);// { userName: 'jack', age: '25', sex: 'male' }

info = querystring.parse('userName=jack&age=25&sex=male', '$');
console.log(info);// { userName: 'jack&age=25&sex=male' }

var info = querystring.parse('userName=jack&age=25&sex=male', '&');
console.log(info);// { userName: 'jack', age: '25', sex: 'male' }

info = querystring.parse('userName=jack$age=25$sex=male', '$');
console.log(info);// { userName: 'jack', age: '25', sex: 'male' }

info = querystring.parse('userName=jack$age=25$sex=male', '$', ':');
console.log(info);// { 'userName=jack': '', 'age=25': '', 'sex=male': '' }

info = querystring.parse('userName=jack$age=25$sex=male', '$', '=');
console.log(info);// { userName: 'jack', age: '25', sex: 'male' }

var info = querystring.parse('userName=jack&age=25&sex=male', '&', '=', {maxKeys: 2});
console.log(info);// { userName: 'jack', age: '25' }

















