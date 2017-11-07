var http = require('http');
var cheerio = require('cheerio');
var url = "http://www.imooc.com/video/11549";


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
                if (href !== '#' || href !== '') { 
                    return href;
                }
            }).get();
            console.log(_links);
            //var parsedData = JSON.parse(rawData);
            //console.log(parsedData);
          } catch (e) {
            console.error(e.message);
          }
    });
});