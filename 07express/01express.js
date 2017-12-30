var express = require('express');
var http = require('http');
var app = express();
app.get('/index.html', function(req, res){
	res.send('hello\n');
});

app.listen(2576, 'localhost', function(){
	console.log('the express server is running at localhost:2576')
})




