const express = require('express');
const app = express();
const urlPrefix = 'https://folio-sec.com/theme/';

app.param('theme', function(request, response, next, theme) {
  request.theme = theme;
  next();
});

app.get('/:theme', (req, res) => {
  urlToParse = urlPrefix + req.theme;
  const request = require('request');
  const cheerio = require('cheerio');
  request(urlToParse, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      if (response.body.includes('お探しのページは見つかりませんでした')) {
        console.log('Theme not found!');
        res.status(404).json({result: 'Theme not found'});
      } else {
        const $ = cheerio.load(html);
        const resultArray = [];
        $('.TextMainLink__textMainLink--38tbe').each((i, ele) => {
          resultArray.push($(ele).text());
        });
        res.status(200).json({result: resultArray});
        console.log('Request succeed');
      }
    } else {
      res.status(500).json({result: 'Server Error'});
      console.log('Request error');
    }
  });
});

app.get('*', function(req, res) {
  res.status(404).json('You shall not pass!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
