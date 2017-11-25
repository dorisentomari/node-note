var koa = require('koa');

var app = koa();

app.use(function*(next){
	var start = new Date;
	yield next;
	var ms = new Date - start;
	this.set('x-Response-TIme',ms + 'ms')
})


app.use(function *(next){
	var start= new Date;
	yield next;
	var ms = new Date - start;
	console.log('%s %s - %s',this.method, this.url,ms);
})

// app.use(function*(){
// 	this.body={
// 		name: 'Jack'
// 	}
// })

app.listen(3333);

console.log('the koa server is running at port 3333')

