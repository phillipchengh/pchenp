var express = require('express');
var app = express();

var port = process.env.PORT || 1337;

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/static/index.html');
});

app.get('/resume', function(req, res) {
  res.sendFile(__dirname + '/assets/resume.pdf');
});

app.listen(port);
