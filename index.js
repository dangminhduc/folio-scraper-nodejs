var express = require("express");
var app = express();
const url_prefix = 'https://folio-sec.com/theme/';
const target_class = 'TextMainLink__textMainLink--38tbe Instruments__instrumentName--4jzC9 gtm-stock-detail'

app.param('theme', function(request, response, next, theme) {
    request.theme = theme;
    next();
});

app.get('/:theme', (req, res) => {
    url_to_parse = url_prefix + req.theme
    const request = require('request');
    const cheerio = require('cheerio');
    request(url_to_parse, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            let result_array = [];
            $('.TextMainLink__textMainLink--38tbe').each((i,ele) => {
                console.log($(ele).text());
                result_array.push($(ele).text());
            });
            res.json({result: result_array})
        }
    });
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
