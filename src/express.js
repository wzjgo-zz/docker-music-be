var express = require('express');
var bodyParser = require('body-parser');
var MusicData = require('./music-data');
const api = require("./api")

// Constants
var DEFAULT_PORT = 8081;
var PORT = process.env.PORT || DEFAULT_PORT;

var app = express();
app.use(bodyParser.json());



app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/api/initData', function (req, res) {
  res.send(MusicData);
})

app.post('/api/search', function (req, res) {
  let queryParams = req.body
  api
    .search(queryParams.keyword)
    .then(data => {
      res.send(data)
    })
})

app.get('/api/play', function (req, res) {
  let v = req
  api
    .play(req.query.id)
    .then(data => {
      res.send(data)
    })
})

app.get('/api/playlist', function (req, res) {
  api
    .playlist(req.query.id)
    .then(data => {
      res.send(data)
    })
})

app.get('/api/getArtistAlbums', function (req, res) {
  api
    .getArtistAlbums(req.query.id)
    .then(data => {
      res.send(data)
    })
})

app.get('/api/getAlbum', function (req, res) {
  api
    .getAlbum(req.query.id)
    .then(data => {
      res.send(data)
    })
})

var server = app.listen(PORT)

console.log(`应用实例，访问地址为http://localhost:${PORT}`)
