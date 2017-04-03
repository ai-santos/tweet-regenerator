'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

var _database = require('../database/database.js');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var twitter = new _twitter2.default(_config2.default);

var params = {
  screen_name: 'asantos3026',
  q: 'asantos3026',
  lang: 'en',
  result_type: 'recent'
};

router.get('/', function (request, response) {
  twitter.get('search/tweets', params, function (error, tweets, twitterResponse) {
    for (var i = 0; i < tweets.statuses.length; i++) {
      _database2.default.addTweet(tweets.statuses[i].text);
    }
    response.render('home', { tweets: tweets });
  });
});

function reTweet() {
  var allTweets = [];
  _database2.default.getAllTweets().then(function (results) {
    for (var i = 0; i < results.length; i++) {
      allTweets.push(results[i].tweetext);
    }
    var arrayLength = allTweets.length;
    var index = Math.floor(Math.random() * arrayLength + 1);
    console.log('index: ', index); //console.log here is intentionally left in!
    var latestTweet = {
      status: allTweets[index]
    };

    twitter.post('statuses/update', latestTweet, function (error, tweets, twitterResponse) {
      if (error) {
        console.log('Post failed', error);
      } else {
        console.log('Success');
      }
    });
  });
}
//Retweet the latest tweet
setInterval(reTweet, 10000);

exports.default = router;