
var express = require('express');
var MusicData = require('./music-data');

// Constants
var DEFAULT_PORT = 8081;
var PORT = process.env.PORT || DEFAULT_PORT;

var app = express();

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/api/musics', function (req, res) {
  res.send(MusicData);

})

var server = app.listen(PORT)

console.log(`应用实例，访问地址为http://localhost:${PORT}`)
