var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
 res.sendFile(__dirname + '/index.html');
});

app.listen(3000);