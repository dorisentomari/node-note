var http = require('http');
var url = 'http://www.imooc.com';
var cheerio = require('cheerio');


function filterChapters(html) {
	var $ = cheerio.load(html);
	var chapters = $('.video');
	/***
	 [{
		chapterTitie: '',
		videos: [
		title: '',
		id: ''
		]
	}]
	 */
	var courseData = [];
	chapters.each(function (item) {
		var chapter = $(this);
		var chapterTitie = chapter.find('strong').text();
		var videos = chapter.find('.video').children('li');
		var chapterData = {
			chapterTitie: chapterTitie,
			videos: []
		};
		
		videos.each(function (item) {
			var video = $(this).find('.studyvideo');
			var videoTitle = video.text();
			var id = video.attr('href').split('video/')[1];
			chapterData.videos.push({
				title: videoTitle,
				id: id
			})
		});
		courseData.push(chapterData);
	})
	return courseData;
}

function printCoueseInfo(courseData) {
	courseData.forEach(function (item) {
		var chapterTitie = item.chapterTitie;
		console.log(chapterTitie + '\n');
		item.videos.forEach(function (video) {
			console.log('  [' + video.id + ']  ' + video.title + '\n');
		})
	})
}

http.get(url, function (res) {
	var html = '';
	
	res.on('data', function (data) {
		html += data;
	})
	
	res.on('end', function () {
		var courseData = filterChapters(html);
		printCoueseInfo(courseData);
	})
	
}).on('error', function (err) {
	console.log('something wrong.......')
})




