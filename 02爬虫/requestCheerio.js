var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

var app = express();

app.get('/', function (req, res) {
	request('https://www.imooc.com/', function (error, response, body) {
		if (error) {
			return console.log(error);
		} else if (response.statusCode === 200) {
			var $ = cheerio.load(body);
			var $className = $('.course-card-content h3').text();
			res.json({
				'ClassName': $classNameArray
			})
			// console.log(body);
			res.end('hello world');
		}
	})
})

app.listen(3000);

console.log('the http server is running at localhost:3000')