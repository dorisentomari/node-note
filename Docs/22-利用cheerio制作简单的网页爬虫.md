## 利用`cheerio`制作简单的网页爬虫

## 1. 目标
+ 完成对网站的标题信息获取
+ 将获取到的信息输出在一个新文件
+ 工具: `cheerio`，使用`npm`下载`npm install cheerio`
+ `cheerio`的`API`使用方法和`jQuery`的使用方法基本一致
+ 如果熟练使用`jQuery`，那么`cheerio`将会很快上手

## 2. 代码部分
> 介绍: 获取[segment fault](https://segmentfault.com/)页面的列表标题，将获取到的标题列表编号，最终输出到`pageTitle.txt`文件里

```javascript
const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');
const url = 'https://segmentfault.com/';

https.get(url, (res) => {
    let html = '';
    res.on('data', (data) => {
        html += data;
    });
    res.on('end', () => {
        getPageTitle(html);
    });
}).on('error', () => {
    console.log('获取网页信息错误');
});

function getPageTitle(html) {
    const $ = cheerio.load(html);
    let chapters = $('.news__item-title');
    let data = [];
    let index = 0;
    let fileName = 'pageTitle.txt';
    for (let i = 0; i < chapters.length; i++) {
        let chapterTitle = $(chapters[i]).find('a').text().trim();
        index++;
        data.push(`\n${index}, ${chapterTitle}`);
    }
    fs.writeFile(fileName, data, 'utf8', (err) => {
        if (err) {
            console.log('fs文件系统创建新文件失败', err);
        }
        console.log(`已成功将获取到的标题放入新文件${fileName}文件中`)
    })
}
```