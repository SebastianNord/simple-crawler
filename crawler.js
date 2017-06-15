var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var fs = require('fs');

var pageToVisit = 'http://www.dmi.dk/vejr/sundhedsvejr/pollen/';
console.log('Visitiong page ' + pageToVisit);

request(pageToVisit, function(error,response, body) {
  if (error) {
    console.log('Error ' + error);
  }

  // Check status code (200 is HTTP OK)
  console.log('Status code: ' + response.statusCode);
  if (response.statusCode === 200) {
    // Parse the document
    var $ = cheerio.load(body);
    //console.log('Page title: ' + $('.tx-dmi-data-store').html(''));

    $('.tx-dmi-data-store > table > tbody > tr > td').each(function( index ) {
      var title = $(this).find('th').text();
      console.log(title);
      fs.appendFileSync('pollen.txt', '\n' + title + '\n');

      $(this).find('td[width="50%"]').each(function( index ) {
        var pollen = $(this).text();
        var score = $(this).next().text();
        console.log(pollen + ' ' + score);
        fs.appendFileSync('pollen.txt', pollen + ' ' + score + '\n' );
      });
    });
  }
});
