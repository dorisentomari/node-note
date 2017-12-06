/*
url模块,用来转换完整的URL
queryString模块，用来转换URL中的查询字符串
*/
var querystring = require('querystring');
var url = require('url');
/*
将URL字符串转换为对象
querystring.parse(str, [sep], [eq], [options]);
str用于指定被转换的查询字符串
sep用于指定该查询字符串中的分割字符,默认为&
eq用于指定该查询字符串中的分配字符,默认为=
options为一个对象,可以在该对象中使用一个整数值类型的maxKeys属性来指定转换后的对象中的属性个数,如果为0,效果等于不设置maxKeys属性值
*/
/*
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
*/
/*
将对象转换为URL字符串
querystring.stringify(obj, [sep], [eq])
*/
/*
info = querystring.stringify({ userName: 'jack', age: '25', sex: 'male' });
console.log(info);// userName=jack&age=25&sex=male

info = querystring.stringify({ userName: 'jack', age: '25', sex: 'male' }, '$');
console.log(info);// userName=jack$age=25$sex=male

info = querystring.stringify({ userName: 'jack', age: '25', sex: 'male' }, '$', ':');
console.log(info);// userName:jack$age:25$sex:male

*/
/*
将url字符串转换为一个对象
url.parse(urlString, [parseQueryString]);
第二个参数为布尔值，如果为true，则解析查询字符串，如果为false，则不解析查询字符串，默认为false
*/
var urlString = 'https://cn.bing.com/search?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1';
var info= null;
/*
info = url.parse(urlString)
console.log(info);

/*
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'cn.bing.com',
  port: null,
  hostname: 'cn.bing.com',
  hash: null,
  search: '?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1',
  query: 'q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1',
  pathname: '/search',
  path: '/search?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1',
  href: 'https://cn.bing.com/search?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1' }
*/
/*
info = url.parse(urlString, true)
console.log(info);
*/
/*
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'cn.bing.com',
  port: null,
  hostname: 'cn.bing.com',
  hash: null,
  search: '?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1',
  query: 
   { q: 'jquery',
     qs: 'n',
     form: 'QBLH',
     sp: '-1',
     pq: 'jquery',
     sc: '8-6',
     sk: '',
     cvid: 'E847055DCE52400BAEC1B54EB7AAAE9C',
     ensearch: '1' },
  pathname: '/search',
  path: '/search?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1',
  href: 'https://cn.bing.com/search?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1' }


// 将url字符串经过转换后的对象还原为一个url字符串
// url.format(urlObj)
var urlObj = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'cn.bing.com',
  port: null,
  hostname: 'cn.bing.com',
  hash: null,
  search: '?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1',
  query: 
   { q: 'jquery',
     qs: 'n',
     form: 'QBLH',
     sp: '-1',
     pq: 'jquery',
     sc: '8-6',
     sk: '',
     cvid: 'E847055DCE52400BAEC1B54EB7AAAE9C',
     ensearch: '1' },
  pathname: '/search',
  path: '/search?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1',
  href: 'https://cn.bing.com/search?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1' }
info = url.format(urlObj)
console.log(info); // https://cn.bing.com/search?q=jquery&qs=n&form=QBLH&sp=-1&pq=jquery&sc=8-6&sk=&cvid=E847055DCE52400BAEC1B54EB7AAAE9C&ensearch=1
*/
// URL.resolve(from, to)
// 两个参数，为URL或 href 插入 或 替换原有的标签.

var a = url.resolve('/one/two/three', 'four') ,
b = url.resolve('http://example.com/', '/one'),
c = url.resolve('http://example.com/one', '/two');
console.log(a +"\n"+ b +"\n"+ c);
//输出结果：
///one/two/four
//http://example.com/one
//http://example.com/two
