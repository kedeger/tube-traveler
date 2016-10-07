var express = require('express');
var bodyParser = require('body-parser');
var app = express()
var path = require('path');
var request = require('request');
var jsdom = require('jsdom');
var url = require('url');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })
var Scraper = require ('images-scraper')
  , google = new Scraper.Google();

mongoose.connect('mongodb://localhost/tubeTraveler');

app.use(express.static(__dirname + '/public'));

app.get('/scrape/:year', function(req, res) {

  request('http://playback.fm/year/' +req.params.year, function (error, response, data) {
    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(data);
      var youtubeId = $('.youtubeID')[0].attribs.value;
      var link = 'http://www.youtube.com/embed/'+ youtubeId;

      google.list({
        keyword: req.params.year,
        num: 25,
        detail: true,
        nightmare: {
            show: false
        }
      }).then(function (data) {
          var images = data;
          res.send({link: link, youtubeId: youtubeId, images: images});
      }).catch(function(err) {
        console.log('err', err);
      });

      
    }
  });
});


// app.get('/grab/:year', function(req, res) {
//  google.list({
//     keyword: req.params.year,
//     num: 10,
//     detail: true,
//     nightmare: {
//         show: false
//     }
// })
// .then(function (data) {
//   console.log(data);
// }).catch(function(err) {
//     console.log('err', err);
// });
// })

app.get('/*', function(req, res) {

//   var CommentSchema = new mongoose.Schema({
//   name: String,
//   completed: Boolean,
//   note: String,
//   updated_at: { type: Date, default: Date.now },
// });

// var Comment = mongoose.model('Comment', CommentSchema);

// // Create a comment in memory
// var comment = new Comment({name: 'this blows', completed: false, note: 'Getting there...soon'});
// // Save it to database
// comment.save( function(err){
//   if(err)
//     console.log(err);
//   else
//     console.log(comment);
// });

 res.sendFile(__dirname + '/index.html');
});


app.listen(3000);
