var http = require('http');
var cheerio = require('cheerio');
var Promise = require('bluebird');
//var url = "http://www.imooc.com/video/11549";
var url = "http://news.baidu.com/";


function getPageAsync(url) {
    return new Promise(function (resolve, reject) {
        console.log('正在爬取' + url);
        var rawData = '';

        http.get(url, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                rawData += chunk;
            });

            res.on('end', function () {
                try {
                    //console.log(rawData);
                    var $ = cheerio.load(rawData);
                    var links = $('a');
                    var _links;
                    _links = links.map(function () {
                        var href = $(this).attr('href');
                        if (href && href !== '#' && href !== '' && href.indexOf('http://') !== -1) {
                            return href;
                        }
                    }).get();
                    console.log(_links);
                    resolve(_links);
                    //var parsedData = JSON.parse(rawData);
                    //console.log(parsedData);
                } catch (e) {
                    console.error(e.message);
                    reject(e.message);
                }
            });
        });
    });
}




function main(url){
    getPageAsync(url)
    .then(function (links) {
        links.forEach(function(ele,index) {
            main(ele);
        });       
    },function(err){console.log('ops '+err)})
}

main(url);
