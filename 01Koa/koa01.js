var koa = require('koa');

var app = koa();
app.keys = ['Test message one'];
app.use(function*(){
	this.body={
		name: 'Jack'
	}
	this.cookies.set('age', 25, {
		signed: true
	})
})

app.listen(3333);
app.listen(8888);

console.log('the koa server is running at port 3333')