
var express = require('express');
var MusicData = require('./music-data');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/kirk';

var DB

var initData = function (db, callback) {
  //连接到表 site
  var collection = db.collection('music');
  //插入数据
  var data = MusicData;
  collection.insert(data, function (err, result) {
    if (err) {
      console.log('Error:' + err);
      return;
    }
    callback(result);
  });
}

var selectData = function (db, callback) {
  //连接到表
  var collection = db.collection('music');
  //查询数据
  //var whereStr = { "name": '菜鸟教程' };
  collection.find().toArray(function (err, result) {
    if (err) {
      console.log('Error:' + err);
      return;
    }
    callback(result);
  });
}

MongoClient.connect(DB_CONN_STR, function (err, db) {
  console.log("连接成功！");
  DB = db
  initData(db, function (result) {
    console.log(result);
  });
});

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
  selectData(DB, function (result) {
    res.send(result);
  });

})

var server = app.listen(PORT)

console.log(`应用实例，访问地址为http://localhost:${PORT}`)
