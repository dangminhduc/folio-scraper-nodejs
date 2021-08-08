var express = require("express");
var app = express();
const url_prefix = 'https://folio-sec.com/theme/';

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
            if(response.body.includes('お探しのページは見つかりませんでした')){
                console.log("Theme not found!")
                res.status(404).json({result: "Theme not found"})
            }
            else {
                const $ = cheerio.load(html);
                let result_array = [];
                $('.TextMainLink__textMainLink--38tbe').each((i,ele) => {
                result_array.push($(ele).text());
                });
                res.status(200).json({result: result_array})
                console.log("Request succeed")
            }
        }
        else {
            res.status(500).json({result: "Server Error"})
            console.log("Request error")
        }
    });
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
