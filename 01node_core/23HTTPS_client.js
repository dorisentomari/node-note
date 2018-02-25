var https = require('https');
var options = {
	hostname: 'github.com',
	port: 443,
	path: '/',
	method: 'GET',
	agent: false
}
var req = https.get(options, function (res) {
	console.log('状态码：' + res.statusCode);
	console.log('响应头：' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log('响应内容：' + chunk);
	});
});

req.setTimeout(1000, function () {
	res.abort();
});

req.on('error', function (err) {
	if (err.code === 'ECONNRESET') {
		console.log('socket端口超时');
	} else {
		console.log('在请求数据过程中发生错误，错误代码为：' + err.code)
	}
});


/*
状态码：200
响应头：{"server":"GitHub.com","date":"Wed, 06 Dec 2017 15:05:12 GMT","content-type":"text/html; charset=utf-8","transfer-encoding":"chunked","connection":"close","status":"200 OK","cache-control":"no-cache","vary":"X-PJAX","x-ua-compatible":"IE=Edge,chrome=1","set-cookie":["logged_in=no; domain=.github.com; path=/; expires=Sun, 06 Dec 2037 15:05:12 -0000; secure; HttpOnly","_gh_sess=eyJzZXNzaW9uX2lkIjoiYmE0NDdmOWI2MGNiZjliYmVhMGMxMjhjMTc0ZmFlNWIiLCJsYXN0X3JlYWRfZnJvbV9yZXBsaWNhcyI6MTUxMjU3MjcxMjcyNSwiX2NzcmZfdG9rZW4iOiIvZE5Fckk4UmtGdlJuMnljRjB5d21YQ2F3RXc1OWZDdEV5MXBQem1IWFBNPSJ9--364c5ffc5422d3ca0573d3a1614040515d4f83b7; path=/; secure; HttpOnly"],"x-request-id":"92dbaefa969effac65a4a47d1bfdf48b","x-runtime":"0.066573","expect-ct":"max-age=2592000, report-uri=\"https://api.github.com/_private/browser/errors\"","content-security-policy":"default-src 'none'; base-uri 'self'; block-all-mixed-content; child-src render.githubusercontent.com; connect-src 'self' uploads.github.com status.github.com collector.githubapp.com api.github.com www.google-analytics.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com wss://live.github.com; font-src assets-cdn.github.com; form-action 'self' github.com gist.github.com; frame-ancestors 'none'; img-src 'self' data: assets-cdn.github.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com *.githubusercontent.com; media-src 'none'; script-src assets-cdn.github.com; style-src 'unsafe-inline' assets-cdn.github.com","strict-transport-security":"max-age=31536000; includeSubdomains; preload","public-key-pins":"max-age=0; pin-sha256=\"WoiWRyIOVNa9ihaBciRSC7XHjliYS9VwUGOIud4PB18=\"; pin-sha256=\"RRM1dGqnDFsCJXBTHky16vi1obOlCgFFn/yOhI/y+ho=\"; pin-sha256=\"k2v657xBsOVe1PQRwOsHsw3bsGT2VzIqz5K+59sNQws=\"; pin-sha256=\"K87oWBWM9UZfyddvDfoxL+8lpNyoUB2ptGtn0fv6G2Q=\"; pin-sha256=\"IQBnNBEiFuhj+8x6X8XLgh01V9Ic5/V3IRQLNFFc7v4=\"; pin-sha256=\"iie1VXtL7HzAMF+/PVPR9xzT80kQxdZeJ+zduCB3uj0=\"; pin-sha256=\"LvRiGEjRqfzurezaWuj8Wie2gyHMrW5Q06LspMnox7A=\"; includeSubDomains","x-content-type-options":"nosniff","x-frame-options":"deny","x-xss-protection":"1; mode=block","x-runtime-rack":"0.074114","x-github-request-id":"14AB:2B559:7D25D4:D06117:5A280727"}
响应内容：就是github.com主页面的html代码
*/