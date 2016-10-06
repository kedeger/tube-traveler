var express = require('express');
var bodyParser = require('body-parser');
var app = express()
var path = require('path');
var request = require('request');
var jsdom = require('jsdom');
var url = require('url');
var cheerio = require('cheerio');

app.use(express.static(__dirname + '/public'));

app.get('/scrape/:year', function(req, res) {

     request('http://playback.fm/year/' +req.params.year, function (error, response, data) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(data);
    // var iframe = $('iframe');
    // console.log(iframe);
    // res.send({data: data});
    var youtubeId = $('.youtubeID')[0].attribs.value;

    var link = 'http://www.youtube.com/embed/'+youtubeId;
    res.send({link: link, youtubeId: youtubeId})

    // res.send({link: link})
    // .map(function(index, element) {
    // return {
    //   link: $(element).attr('src')
    // };
  // })

    // .get();

    // console.log(videoUrls);


  //   var links = $('iframe:first').contents()[0].links;

  // console.log(links);
  }
})
})

//https://www.google.com/search?q=1957&biw=1280&bih=721&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiw7beyisfPAhUQ7GMKHYMsCfYQ_AUIBigB#tbm=isch&q=2011+photos

app.get('/grab/:year', function(req, res) {
       request('https://www.google.com/search?q=1957&biw=1280&bih=721&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiw7beyisfPAhUQ7GMKHYMsCfYQ_AUIBigB#tbm=isch&q=' + req.params.year + '+photos', function (error, response, data) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(data);
    var youtubeId = $('.youtubeID')[0].attribs.value;

    var link = 'http://www.youtube.com/embed/'+youtubeId;
    res.send({link: link, youtubeId: youtubeId})
  }
})
})

app.get('/*', function(req, res) {
 res.sendFile(__dirname + '/index.html');
});



//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// app.get('/scrape/:year', function(req, res) {
//   url = 'http://playback.fm/year/'+req.params.year

//    request(url, function(error, response, data){
//         if(!error){
//             var $ = cheerio.load(data);

//             var videoUrls = $('iframe').map(function(index, element) {
//     return {
//       link: $(element).closest('a').attr('src')
//     };
//   }).get();

//   console.log(videoUrls);

//             // var videoUrl;
//             // var json = { videoUrl : ""};

//         }
//     })

// });

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// request('http://playback.fm/year/1910/', function (error, response, data) {
//   var $ = cheerio.load(data);

//   var videoUrls = $('iframe').map(function(index, element) {
//     return {
//       link: $(element).closest('a').attr('src')
//     };
//   }).get();

//   console.log(videoUrls);
// });




app.listen(3000);
